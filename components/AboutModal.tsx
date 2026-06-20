import React from 'react';
import { X, Calendar } from 'lucide-react';
import { t } from '../utils/i18n';
import { getAppVersion } from '../utils/version';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [appVersion, setAppVersion] = React.useState<string>('');

  React.useEffect(() => {
    setIsVisible(true);
    (async () => {
      const v = await getAppVersion();
      setAppVersion(v);
    })();
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
      style={{
        backgroundColor: isVisible ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
        opacity: isVisible ? 1 : 0
      }}
    >
      <div 
        className="bg-surface w-[420px] rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ease-out"
        style={{
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          opacity: isVisible ? 1 : 0
        }}
      >
        {/* Header */}
        <div className="bg-paper-dark px-5 py-4 border-b border-surface-border flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-surface-hover p-2 rounded-lg shadow-sm">
              <Calendar size={24} className="text-ink-black" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-ink-black">{t('appTitle')}</h2>
              <p className="text-xs text-text-secondary">{appVersion ? `v${appVersion}` : ''}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-text-secondary hover:text-ink-black transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-ink-black mb-2">{t('aboutApp')}</h3>
            <p className="text-sm text-ink-black leading-relaxed">
              {t('appDescription')}
            </p>
          </div>

          {/* Version Info */}
          <div className="bg-paper-dark rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">{t('version')}</span>
              <span className="font-mono text-ink-black">{appVersion || ''}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">{t('platform')}</span>
              <span className="font-mono text-ink-black">
                {window.electronAPI ? 'Electron' : 'Web'}
              </span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-text-secondary pt-2 border-t border-surface-border">
            <div>© 2026 Akiro · {t('allRightsReserved')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
