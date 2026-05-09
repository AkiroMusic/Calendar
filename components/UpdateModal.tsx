import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { X, RefreshCw, ExternalLink, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { t } from '../utils/i18n';
import { getAppVersion } from '../utils/version';

interface UpdateModalProps {
  onClose: () => void;
}

type UpdateStatus = 'idle' | 'checking' | 'latest' | 'available' | 'error';

interface ReleaseInfo {
  version: string;
  name: string;
  body: string;
  html_url: string;
  published_at: string;
}

// 比较版本号（移到组件外部避免重复创建）
const compareVersions = (current: string, latest: string): number => {
  const cleanVersion = (v: string) => v.replace(/-.*$/, '');
  const c = cleanVersion(current).split('.').map(Number);
  const l = cleanVersion(latest).split('.').map(Number);
  
  for (let i = 0; i < Math.max(c.length, l.length); i++) {
    const cv = c[i] || 0;
    const lv = l[i] || 0;
    if (cv < lv) return -1;
    if (cv > lv) return 1;
  }
  return 0;
};

// 打开外部链接的通用函数
const openExternalUrl = (url: string) => {
  if (window.electronAPI?.shell?.openExternal) {
    window.electronAPI.shell.openExternal(url);
  } else {
    window.open(url, '_blank');
  }
};

export const UpdateModal: React.FC<UpdateModalProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<string>('');
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo | null>(null);
  const [status, setStatus] = useState<UpdateStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 入场动画 + 获取版本号（合并 useEffect）
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    getAppVersion().then(setCurrentVersion);
  }, []);

  // 关闭动画
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  // 检查更新
  const checkForUpdates = useCallback(async () => {
    setStatus('checking');
    setErrorMessage('');
    
    try {
      const response = await fetch('https://api.github.com/repos/trustdev-org/calendar-diary/releases/latest', {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const latestVer = data.tag_name?.replace(/^v/, '') || data.name;
      
      setLatestVersion(latestVer);
      setReleaseInfo({
        version: latestVer,
        name: data.name,
        body: data.body || '',
        html_url: data.html_url,
        published_at: data.published_at
      });
      
      setStatus(compareVersions(currentVersion, latestVer) < 0 ? 'available' : 'latest');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || t('updateCheckFailed'));
    }
  }, [currentVersion]);

  // 打开发布页
  const openReleasePage = useCallback(() => {
    openExternalUrl('https://diary.trustdev.org/');
  }, []);

  // 打开 GitHub Release 页面
  const openGitHubRelease = useCallback(() => {
    if (releaseInfo?.html_url) openExternalUrl(releaseInfo.html_url);
  }, [releaseInfo?.html_url]);

  // 背景点击处理
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  }, [handleClose]);

  // 动画样式
  const backdropStyle = useMemo(() => ({
    backgroundColor: isVisible ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
    opacity: isVisible ? 1 : 0
  }), [isVisible]);

  const modalStyle = useMemo(() => ({
    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    opacity: isVisible ? 1 : 0
  }), [isVisible]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
      style={backdropStyle}
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-surface w-[400px] rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ease-out"
        style={modalStyle}
      >
        {/* Header */}
        <div className="bg-paper-dark px-4 py-2 border-b border-surface-border flex justify-between items-center select-none">
          <span className="text-xs font-bold text-ink-black">{t('checkUpdate')}</span>
          <button 
            onClick={handleClose} 
            className="text-text-secondary hover:text-ink-black transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          {/* 版本信息 */}
          <div className="bg-paper-dark p-4 rounded-lg border border-surface-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">{t('currentVersion')}</span>
              <span className="text-sm font-mono font-medium text-ink-black">
                {currentVersion || '...'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">{t('latestVersion')}</span>
              <span className="text-sm font-mono font-medium text-ink-black">
                {latestVersion || t('unknown')}
              </span>
            </div>
          </div>

          {/* 状态显示 */}
          {status === 'checking' && (
            <div className="flex items-center justify-center gap-2 py-3 text-text-secondary">
              <RefreshCw size={16} className="animate-spin" />
              <span className="text-sm">{t('checkingUpdate')}</span>
            </div>
          )}

          {status === 'latest' && (
            <div className="flex items-center justify-center gap-2 py-3 text-green-400 bg-green-950 rounded-lg border border-green-800">
              <CheckCircle size={18} />
              <span className="text-sm font-medium">{t('alreadyLatest')}</span>
            </div>
          )}

          {status === 'available' && (
            <div className="flex flex-col gap-3 py-3 px-4 bg-blue-950 rounded-lg border border-blue-800">
              <div className="flex items-center gap-2 text-blue-400">
                <Info size={18} />
                <span className="text-sm font-medium">{t('newVersionAvailable')}</span>
              </div>
              {releaseInfo && (
                <div className="text-xs text-ink-black">
                  <p className="font-medium">{releaseInfo.name}</p>
                  {releaseInfo.published_at && (
                    <p className="text-text-secondary mt-1">
                      {t('publishedAt')}: {new Date(releaseInfo.published_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}
              <button
                onClick={openGitHubRelease}
                className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-colors"
              >
                <ExternalLink size={14} />
                {t('viewRelease')}
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center justify-center gap-2 py-3 text-red-400 bg-red-950 rounded-lg border border-red-800">
              <AlertCircle size={18} />
              <span className="text-sm">{t('updateCheckFailed')}: {errorMessage}</span>
            </div>
          )}

          {/* 检查更新按钮 */}
          <button
            onClick={checkForUpdates}
            disabled={status === 'checking'}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-ink-black hover:bg-ink-black/80 disabled:bg-stone-600 text-paper rounded-md text-sm font-medium transition-colors"
          >
            <RefreshCw size={14} className={status === 'checking' ? 'animate-spin' : ''} />
            {t('checkLatestVersion')}
          </button>

          {/* 分隔线 */}
          <div className="border-t border-surface-border"></div>

          {/* 发布页链接 */}
          <button
            onClick={openReleasePage}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-paper-dark hover:bg-surface-hover border border-surface-border text-ink-black rounded-md text-sm font-medium transition-colors"
          >
            <ExternalLink size={14} />
            {t('openReleasePage')}
          </button>
        </div>
      </div>
    </div>
  );
};
