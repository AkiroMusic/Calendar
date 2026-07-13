
import React, { useState, useEffect } from 'react';
import { X, Folder, Download, Upload, HardDrive, Globe, Lock, KeyRound, Smartphone, Copy, Check, CalendarDays, Plus, Trash2, ChevronUp, ChevronDown, Pencil, Users } from 'lucide-react';
import { ScheduleConfig, Teacher, Course, TEACHER_COLORS } from '../types';
import { t, setLanguage, getCurrentLanguage, languageNames, type Language } from '../utils/i18n';
import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';
import { getAppVersion } from '../utils/version';

interface SettingsModalProps {
  onClose: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDisplaySettingsChange?: (mode: 'ellipsis' | 'scroll') => void;
  scheduleConfig: ScheduleConfig;
  onScheduleConfigChange: (config: ScheduleConfig) => void;
  filterTeacherId?: string | null;
  onFilterTeacherChange?: (teacherId: string | null) => void;
}

type TabType = 'general' | 'security' | 'schedule';

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onExport, onImport, onDisplaySettingsChange, scheduleConfig, onScheduleConfigChange, filterTeacherId, onFilterTeacherChange }) => {
  const [dataPath, setDataPath] = useState('LocalStorage (Browser)');
  const [isElectron, setIsElectron] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(getCurrentLanguage());
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('calendar-diary-font-size') || 'medium';
  });
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [appVersion, setAppVersion] = useState<string>('');
  
  
  // Security settings
  const [securityEnabled, setSecurityEnabled] = useState(false);
  const [securityType, setSecurityType] = useState<'pin' | 'totp'>('pin');
  const [pinCode, setPinCode] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [totpSecret, setTotpSecret] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [secretCopied, setSecretCopied] = useState(false);
  const [isTotpVerified, setIsTotpVerified] = useState(false);
  const [savedPin, setSavedPin] = useState(false);
  const [savedTotp, setSavedTotp] = useState(false);

  // Schedule settings
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherColor, setNewTeacherColor] = useState(TEACHER_COLORS[0]);
  const [newCourseName, setNewCourseName] = useState('');
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);
  const [editingTeacherName, setEditingTeacherName] = useState('');
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editingCourseName, setEditingCourseName] = useState('');

  const generateQRCode = async (secret: string) => {
    try {
      const totp = new OTPAuth.TOTP({
        issuer: 'Calendar Diary',
        label: 'User',
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret)
      });
      const url = await QRCode.toDataURL(totp.toString());
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  const generateTOTPSecret = () => {
    const secret = new OTPAuth.Secret({ size: 20 });
    const base32Secret = secret.base32;
    setTotpSecret(base32Secret);
    setIsTotpVerified(false);
    generateQRCode(base32Secret);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(totpSecret);
      setSecretCopied(true);
      setTimeout(() => setSecretCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const verifyTOTPCode = () => {
    try {
      const totp = new OTPAuth.TOTP({
        issuer: 'Calendar Diary',
        label: 'User',
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(totpSecret)
      });
      const isValid = totp.validate({ token: verifyCode, window: 1 }) !== null;
      if (isValid) {
        setPinError('');
        setIsTotpVerified(true);
        return true;
      } else {
        setPinError('验证码无效');
        return false;
      }
    } catch (error) {
      setPinError('验证失败');
      return false;
    }
  };

  useEffect(() => {
    setIsVisible(true);
    (async () => {
      const v = await getAppVersion();
      setAppVersion(v);
    })();
    const checkElectron = async () => {
      if (window.electronAPI) {
        setIsElectron(true);
        try {
          const path = await window.electronAPI.storage.getDataPath();
          setDataPath(path);
        } catch (error) {
          console.error('Failed to get data path:', error);
        }
      }
    };
    checkElectron();
    
    
    // 加载安全设置
    const savedSecurity = localStorage.getItem('calendar-diary-security');
    if (savedSecurity) {
      try {
        const security = JSON.parse(savedSecurity);
        console.log('Loaded security settings:', security);
        
        setSecurityEnabled(security.enabled || false);
        setSecurityType(security.preferredMethod || 'pin');
        
        if (security.pinCode) {
          setPinCode(security.pinCode);
          setConfirmPin(security.pinCode);
          setSavedPin(true);
        }
        
        if (security.totpSecret) {
          setTotpSecret(security.totpSecret);
          setIsTotpVerified(true);
          setSavedTotp(true);
          generateQRCode(security.totpSecret);
        }
      } catch (error) {
        console.error('Failed to load security settings:', error);
      }
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    setLanguage(lang);
    // Force re-render by closing and reopening
    window.location.reload();
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    localStorage.setItem('calendar-diary-font-size', size);
    document.documentElement.setAttribute('data-font-size', size);
  };

  const handleOpenFolder = async () => {
    if (window.electronAPI) {
      try {
        await window.electronAPI.storage.openDataFolder();
      } catch (error) {
        console.error('Failed to open folder:', error);
      }
    }
  };

  const handleAddTeacher = () => {
    const name = newTeacherName.trim();
    if (!name) return;
    const newTeacher: Teacher = {
      id: Date.now().toString(),
      name,
      color: newTeacherColor,
    };
    onScheduleConfigChange({
      ...scheduleConfig,
      teachers: [...scheduleConfig.teachers, newTeacher],
    });
    setNewTeacherName('');
  };

  const handleDeleteTeacher = (id: string) => {
    onScheduleConfigChange({
      ...scheduleConfig,
      teachers: scheduleConfig.teachers.filter(t => t.id !== id),
    });
  };

  const handleMoveTeacherUp = (index: number) => {
    if (index <= 0) return;
    const newTeachers = [...scheduleConfig.teachers];
    [newTeachers[index - 1], newTeachers[index]] = [newTeachers[index], newTeachers[index - 1]];
    onScheduleConfigChange({ ...scheduleConfig, teachers: newTeachers });
  };

  const handleMoveTeacherDown = (index: number) => {
    if (index >= scheduleConfig.teachers.length - 1) return;
    const newTeachers = [...scheduleConfig.teachers];
    [newTeachers[index], newTeachers[index + 1]] = [newTeachers[index + 1], newTeachers[index]];
    onScheduleConfigChange({ ...scheduleConfig, teachers: newTeachers });
  };

  const handleStartEditTeacher = (teacher: Teacher) => {
    setEditingTeacherId(teacher.id);
    setEditingTeacherName(teacher.name);
  };

  const handleSaveEditTeacher = () => {
    if (!editingTeacherId || !editingTeacherName.trim()) return;
    const newTeachers = scheduleConfig.teachers.map(t =>
      t.id === editingTeacherId ? { ...t, name: editingTeacherName.trim() } : t
    );
    onScheduleConfigChange({ ...scheduleConfig, teachers: newTeachers });
    setEditingTeacherId(null);
    setEditingTeacherName('');
  };

  const handleCancelEditTeacher = () => {
    setEditingTeacherId(null);
    setEditingTeacherName('');
  };

  const handleAddCourse = () => {
    const name = newCourseName.trim();
    if (!name) return;
    const newCourse: Course = {
      id: Date.now().toString(),
      name,
    };
    onScheduleConfigChange({
      ...scheduleConfig,
      courses: [...scheduleConfig.courses, newCourse],
    });
    setNewCourseName('');
  };

  const handleDeleteCourse = (id: string) => {
    onScheduleConfigChange({
      ...scheduleConfig,
      courses: scheduleConfig.courses.filter(c => c.id !== id),
    });
  };

  const handleMoveCourseUp = (index: number) => {
    if (index <= 0) return;
    const newCourses = [...scheduleConfig.courses];
    [newCourses[index - 1], newCourses[index]] = [newCourses[index], newCourses[index - 1]];
    onScheduleConfigChange({ ...scheduleConfig, courses: newCourses });
  };

  const handleMoveCourseDown = (index: number) => {
    if (index >= scheduleConfig.courses.length - 1) return;
    const newCourses = [...scheduleConfig.courses];
    [newCourses[index], newCourses[index + 1]] = [newCourses[index + 1], newCourses[index]];
    onScheduleConfigChange({ ...scheduleConfig, courses: newCourses });
  };

  const handleStartEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setEditingCourseName(course.name);
  };

  const handleSaveEditCourse = () => {
    if (!editingCourseId || !editingCourseName.trim()) return;
    const newCourses = scheduleConfig.courses.map(c =>
      c.id === editingCourseId ? { ...c, name: editingCourseName.trim() } : c
    );
    onScheduleConfigChange({ ...scheduleConfig, courses: newCourses });
    setEditingCourseId(null);
    setEditingCourseName('');
  };

  const handleCancelEditCourse = () => {
    setEditingCourseId(null);
    setEditingCourseName('');
  };

  const handleSaveSecurity = () => {
    // 当前选中的验证方式的验证
    if (securityEnabled && securityType === 'pin') {
      // 验证 PIN（如果正在编辑）
      if (!savedPin || (pinCode !== '' && confirmPin !== '')) {
        if (pinCode.length > 0 && pinCode.length < 4) {
          setPinError(t('pinTooShort'));
          return;
        }
        if (pinCode !== confirmPin) {
          setPinError(t('pinMismatch'));
          return;
        }
      }
    }
    
    if (securityEnabled && securityType === 'totp') {
      // 验证 TOTP（如果是新配置）
      if (totpSecret && !isTotpVerified) {
        setPinError(t('totpClickVerify'));
        return;
      }
      
      // 确保有 TOTP 配置（如果当前没有生成密钥，就不检查）
      if (!totpSecret) {
        setPinError(t('totpMissingSecret'));
        return;
      }
    }

    // 检查是否至少有一个有效配置
    if (securityEnabled) {
      const hasPin = (savedPin && pinCode) || (pinCode.length >= 4 && pinCode === confirmPin);
      const hasTotp = totpSecret && isTotpVerified;
      
      if (!hasPin && !hasTotp) {
        setPinError(t('securityAtLeastOne'));
        return;
      }
    }
    
    // 保存配置（保留已有的配置）
    const securitySettings = {
      enabled: securityEnabled,
      preferredMethod: securityType,
      pinCode: undefined as string | undefined,
      totpSecret: undefined as string | undefined
    };
    
    // 保存 PIN（如果已配置或新配置）
    if (savedPin && pinCode && pinCode === confirmPin) {
      securitySettings.pinCode = pinCode;
    } else if (pinCode.length >= 4 && pinCode === confirmPin) {
      securitySettings.pinCode = pinCode;
    }
    
    // 保存 TOTP（如果已验证）
    if (totpSecret && isTotpVerified) {
      securitySettings.totpSecret = totpSecret;
    }
    
    console.log('Saving security settings:', securitySettings);
    localStorage.setItem('calendar-diary-security', JSON.stringify(securitySettings));
    setPinError('');
    
    // 更新保存状态
    if (securitySettings.pinCode) {
      setSavedPin(true);
    }
    if (securitySettings.totpSecret) {
      setSavedTotp(true);
    }
    
    console.log('Security settings saved successfully');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
      style={{
        backgroundColor: isVisible ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
        opacity: isVisible ? 1 : 0
      }}
    >
      <div 
        className="bg-surface w-[500px] rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ease-out"
        style={{
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          opacity: isVisible ? 1 : 0
        }}
      >
        <div className="bg-paper-dark px-4 py-2 border-b border-surface-border flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-ink-black">{t('settings')}</span>
            <span className="text-[10px] text-text-secondary font-mono">{appVersion ? `v${appVersion}` : ''}</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-text-secondary hover:text-ink-black transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-surface-border bg-paper-dark">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all ${
              activeTab === 'general'
                ? 'text-ink-black border-b-2 border-ink-black bg-surface'
                : 'text-text-secondary hover:text-ink-black hover:bg-surface-hover'
            }`}
          >
            <Globe size={16} />
            {t('generalSettings')}
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all ${
              activeTab === 'schedule'
                ? 'text-ink-black border-b-2 border-ink-black bg-surface'
                : 'text-text-secondary hover:text-ink-black hover:bg-surface-hover'
            }`}
          >
            <CalendarDays size={16} />
            排课管理
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all ${
              activeTab === 'security'
                ? 'text-ink-black border-b-2 border-ink-black bg-surface'
                : 'text-text-secondary hover:text-ink-black hover:bg-surface-hover'
            }`}
          >
            <Lock size={16} />
            {t('securityPrivacy')}
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6 min-h-[300px] max-h-[500px] overflow-y-auto">
            {activeTab === 'general' && (
              <>
            {/* Data Section */}
            <section>
                <h3 className="text-sm font-bold text-ink-black mb-3 flex items-center gap-2">
                    <HardDrive size={16} /> {t('storageData')}
                </h3>
                <div className="bg-paper-dark p-4 rounded-md border border-surface-border space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1">{t('dataLocation')}</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={dataPath}
                                disabled 
                                title="Data location"
                                className="flex-1 bg-input-bg border border-surface-border rounded px-2 py-1.5 text-xs text-text-secondary font-mono select-none"
                            />
                            {isElectron && (
                                <button 
                                    onClick={handleOpenFolder}
                                    className="bg-input-bg border border-surface-border text-ink-black px-3 py-1 rounded hover:bg-surface-hover transition-colors"
                                    title="Open folder"
                                >
                                    <Folder size={14} />
                                </button>
                            )}
                        </div>
                        <p className="text-[10px] text-text-secondary mt-1">
                            {isElectron ? 'Files: calendar-diary_data.json, calendar-diary_plans.json' : 'Data stored in browser LocalStorage'}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                         <button 
                            onClick={onExport}
                            className="flex flex-col items-center justify-center gap-2 bg-paper-dark border border-surface-border p-3 rounded hover:border-text-secondary hover:bg-surface-hover transition-all"
                        >
                            <Download size={20} className="text-ink-black" />
                            <span className="text-xs font-medium text-ink-black">{t('exportBackup')}</span>
                         </button>
                         <label className="flex flex-col items-center justify-center gap-2 bg-paper-dark border border-surface-border p-3 rounded hover:border-text-secondary hover:bg-surface-hover transition-all cursor-pointer">
                            <Upload size={20} className="text-ink-black" />
                            <span className="text-xs font-medium text-ink-black">{t('importBackup')}</span>
                            <input type="file" onChange={onImport} className="hidden" accept=".json" />
                         </label>
                    </div>
                </div>
            </section>

            {/* Language Section */}
            <section>
                <h3 className="text-sm font-bold text-ink-black mb-3 flex items-center gap-2">
                    <Globe size={16} /> {t('language')}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(languageNames) as Language[]).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => handleLanguageChange(lang)}
                            className={`py-2 px-3 rounded text-sm transition-all ${
                                selectedLanguage === lang
                                    ? 'bg-ink-black text-paper font-medium'
                                    : 'bg-paper-dark text-ink-black hover:bg-surface-hover border border-surface-border'
                            }`}
                        >
                            {languageNames[lang]}
                        </button>
                    ))}
                </div>
            </section>

            {/* Font Size Section */}
            <section>
                <h3 className="text-sm font-bold text-ink-black mb-3 flex items-center gap-2">
                    <span className="text-base">Aa</span> 字体大小
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { key: 'small', label: '小' },
                        { key: 'medium', label: '中' },
                        { key: 'large', label: '大' },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => handleFontSizeChange(key)}
                            className={`py-2 px-3 rounded text-sm transition-all ${
                                fontSize === key
                                    ? 'bg-ink-black text-paper font-medium'
                                    : 'bg-paper-dark text-ink-black hover:bg-surface-hover border border-surface-border'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </section>

              </>
            )}

            {activeTab === 'security' && (
              <>
            {/* Security Section */}
            <section>
                <h3 className="text-sm font-bold text-ink-black mb-3 flex items-center gap-2">
                    <Lock size={16} /> {t('securityEnableTitle')}
                </h3>
                <div className="bg-paper-dark p-4 rounded-md border border-surface-border space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-ink-black">{t('securityEnableLabel')}</p>
                            <p className="text-xs text-text-secondary mt-0.5">{t('securityEnableDesc')}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={securityEnabled}
                                onChange={(e) => setSecurityEnabled(e.target.checked)}
                                className="sr-only peer"
                                aria-label={t('securityEnableLabel')}
                            />
                            <div className="w-11 h-6 bg-stone-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-stone-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ink-black"></div>
                        </label>
                    </div>

                    {securityEnabled && (
                        <>
                        <div className="pt-4 border-t border-surface-border space-y-3">
                            <p className="text-xs font-medium text-text-secondary">{t('securityMethodConfig')}</p>
                            <div className="grid grid-cols-2 gap-3">
<button
                                    onClick={() => {
                                        setSecurityType('totp');
                                        if (!totpSecret) {
                                            generateTOTPSecret();
                                        }
                                    }}
                                    className={`relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                                        securityType === 'totp'
                                            ? 'border-ink-black bg-surface-hover'
                                            : 'border-surface-border bg-paper-dark hover:border-text-secondary'
                                    }`}
                                >
                                    {savedTotp && (
                                        <div className="absolute top-2 right-2 text-green-500" title="已配置">
                                            <Check size={16} />
                                        </div>
                                    )}
                                    <Smartphone size={24} className={securityType === 'totp' ? 'text-ink-black' : 'text-text-secondary'} />
                                    <span className="text-sm font-medium text-ink-black">{t('totpMethod')}</span>
                                    <span className="text-xs text-text-secondary text-center">
                                        {savedTotp ? t('pinStatusSet') : t('pinStatusNotSet')}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {securityType === 'pin' && (
                            <div className="pt-4 border-t border-surface-border space-y-3">
                                {savedPin && pinCode && pinCode === confirmPin ? (
                                    <div className="bg-green-950 border border-green-800 rounded-md p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Check size={16} className="text-green-500" />
                                            <p className="text-sm font-medium text-green-400">{t('pinSetSuccess')}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setPinCode('');
                                                setConfirmPin('');
                                                setSavedPin(false);
                                            }}
                                            className="text-xs text-red-400 hover:text-red-300 underline"
                                        >
                                            {t('pinCancel')}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-xs font-medium text-text-secondary mb-1.5">{savedPin ? t('pinLabelEdit') : t('pinLabelSet')}</label>
                                            <input
                                                type="password"
                                                inputMode="numeric"
                                                maxLength={8}
                                                value={pinCode}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    setPinCode(value);
                                                    setPinError('');
                                                }}
                                                placeholder={t('pinPlaceholder')}
                                                className="w-full px-3 py-2 border border-surface-border bg-input-bg rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 text-ink-black placeholder-stone-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-text-secondary mb-1.5">{t('pinConfirmLabel')}</label>
                                            <input
                                                type="password"
                                                inputMode="numeric"
                                                maxLength={8}
                                                value={confirmPin}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    setConfirmPin(value);
                                                    setPinError('');
                                                }}
                                                placeholder={t('pinConfirmPlaceholder')}
                                                className="w-full px-3 py-2 border border-surface-border bg-input-bg rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 text-ink-black placeholder-stone-500"
                                            />
                                        </div>
                                    </>
                                )}
                                {pinError && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <span>⚠</span> {pinError}
                                    </p>
                                )}
                            </div>
                        )}

                        {securityType === 'totp' && (
                            <div className="pt-4 border-t border-surface-border space-y-3">
                                {savedTotp && isTotpVerified ? (
                                    <div className="bg-green-950 border border-green-800 rounded-md p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Check size={16} className="text-green-500" />
                                            <p className="text-sm font-medium text-green-400">{t('totpConfigured')}</p>
                                        </div>
                                        <p className="text-xs text-text-secondary mb-3">{t('totpConfiguredDesc')}</p>
                                        <button
                                            onClick={() => {
                                                setTotpSecret('');
                                                setQrCodeUrl('');
                                                setVerifyCode('');
                                                setIsTotpVerified(false);
                                                setSavedTotp(false);
                                            }}
                                            className="text-xs text-red-400 hover:text-red-300 underline"
                                        >
                                            {t('totpCancel')}
                                        </button>
                                    </div>
                                ) : !totpSecret ? (
                                    <>
<button
                                        onClick={generateTOTPSecret}
                                        className="w-full py-2 px-4 bg-ink-black text-paper rounded-md hover:bg-ink-black/80 transition-colors text-sm font-medium"
                                    >
                                            {t('totpGenerateSecret')}
                                        </button>
                                        {!savedPin && (
                                            <p className="text-xs text-amber-400 flex items-center gap-1 mt-2">
                                                <span>💡</span> {t('securityAtLeastOne')}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="text-center">
                                            <p className="text-xs font-medium text-text-secondary mb-2">{t('totpScanQr')}</p>
                                            {qrCodeUrl && (
                                                <div className="inline-block p-3 bg-paper-dark rounded-lg border-2 border-surface-border">
                                                    <img src={qrCodeUrl} alt="TOTP QR Code" className="w-48 h-48" />
                                                </div>
                                            )}
                                            <p className="text-xs text-text-secondary mt-2">{t('totpScanDesc')}</p>
                                        </div>

                                        <div className="bg-paper-dark p-3 rounded-md border border-surface-border">
                                            <p className="text-xs font-medium text-text-secondary mb-1">{t('totpManualInput')}</p>
                                            <div className="flex items-center gap-2">
                                                <code className="flex-1 text-xs bg-input-bg px-2 py-1.5 rounded border border-surface-border font-mono break-all text-ink-black">
                                                    {totpSecret}
                                                </code>
                                                <button
                                                    onClick={copyToClipboard}
                                                    className="p-1.5 hover:bg-surface-hover rounded transition-colors"
                                                    title={t('totpCopySecret')}
                                                >
                                                    {secretCopied ? (
                                                        <Check size={16} className="text-green-500" />
                                                    ) : (
                                                        <Copy size={16} className="text-ink-black" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-text-secondary mb-1.5">{t('totpEnterCodeConfirm')}</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={6}
                                                    value={verifyCode}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, '');
                                                        setVerifyCode(value);
                                                        setPinError('');
                                                    }}
                                                    placeholder={t('totpCodePlaceholder')}
                                                    className="flex-1 px-3 py-2 border border-surface-border bg-input-bg rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 text-center tracking-wider font-mono text-ink-black placeholder-stone-500"
                                                />
                                                <button
                                                    onClick={() => {
                                                        if (verifyTOTPCode()) {
                                                            // 验证成功后不显示错误
                                                        }
                                                    }}
                                                    disabled={verifyCode.length !== 6}
                                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                                        isTotpVerified
                                                            ? 'bg-green-700 text-white cursor-default'
                                                            : 'bg-ink-black hover:bg-ink-black/80 text-paper disabled:bg-stone-600 disabled:cursor-not-allowed'
                                                    }`}
                                                >
                                                    {isTotpVerified ? (
                                                        <Check size={16} />
                                                    ) : (
                                                        t('totpVerifyButton')
                                                    )}
                                                </button>
                                            </div>
                                            <p className="text-xs text-text-secondary mt-1">{t('totpGetCodeHint')}</p>
                                        </div>

                                        {pinError && (
<p className="text-xs text-red-400 flex items-center gap-1">
                                                <span>⚠</span> {pinError}
                                            </p>
                                        )}
                                        
                                        {isTotpVerified && !pinError && (
                                            <p className="text-xs text-green-500 flex items-center gap-1">
                                                <Check size={14} /> {t('totpVerifiedSaveReady')}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                        </>
                    )}
                </div>
            </section>
              </>
            )}

            {activeTab === 'schedule' && (
              <>
                {/* Teachers Section */}
                <section>
                  <h3 className="text-sm font-bold text-ink-black mb-3 flex items-center gap-2">
                    <CalendarDays size={16} /> 教师管理
                  </h3>
                  <div className="bg-paper-dark p-4 rounded-md border border-surface-border space-y-3">
                    {scheduleConfig.teachers.length === 0 && (
                      <p className="text-xs text-text-secondary text-center py-2">暂无教师，请在下方添加</p>
                    )}
                    {scheduleConfig.teachers.map((teacher, index) => (
                      <div key={teacher.id} className="flex items-center gap-2 bg-paper-dark border border-surface-border rounded px-3 py-2">
                        <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: teacher.color }} />
                        
                        <div className="flex flex-col gap-0.5 shrink-0">
                          <button
                            onClick={() => handleMoveTeacherUp(index)}
                            disabled={index === 0}
                            className="text-text-secondary hover:text-ink-black disabled:opacity-20 disabled:cursor-not-allowed transition-colors leading-none"
                            title="上移"
                          >
                            <ChevronUp size={12} />
                          </button>
                          <button
                            onClick={() => handleMoveTeacherDown(index)}
                            disabled={index === scheduleConfig.teachers.length - 1}
                            className="text-text-secondary hover:text-ink-black disabled:opacity-20 disabled:cursor-not-allowed transition-colors leading-none"
                            title="下移"
                          >
                            <ChevronDown size={12} />
                          </button>
                        </div>
                        
                        {editingTeacherId === teacher.id ? (
                          <input
                            type="text"
                            value={editingTeacherName}
                            onChange={e => setEditingTeacherName(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleSaveEditTeacher();
                              if (e.key === 'Escape') handleCancelEditTeacher();
                            }}
                            onBlur={handleSaveEditTeacher}
                            className="flex-1 px-2 py-0.5 border border-surface-border rounded text-sm bg-input-bg focus:outline-none focus:ring-1 focus:ring-stone-500 text-ink-black"
                            autoFocus
                          />
                        ) : (
                          <>
                            <span className="flex-1 text-sm text-ink-black">{teacher.name}</span>
                            <button
                              onClick={() => handleStartEditTeacher(teacher)}
                              className="text-text-secondary hover:text-ink-black transition-colors"
                              title="编辑"
                            >
                              <Pencil size={12} />
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="text-text-secondary hover:text-red-400 transition-colors"
                          title="删除教师"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-surface-border space-y-2">
                      <p className="text-xs font-medium text-text-secondary">添加教师</p>
                      <input
                        type="text"
                        value={newTeacherName}
                        onChange={e => setNewTeacherName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAddTeacher()}
                        placeholder="输入姓名，如：张老师"
                        className="w-full px-3 py-1.5 border border-surface-border rounded text-sm bg-input-bg focus:outline-none focus:ring-2 focus:ring-stone-500 text-ink-black placeholder-stone-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-secondary shrink-0">颜色：</span>
                        <div className="flex gap-1.5 flex-wrap">
                          {TEACHER_COLORS.map(color => (
                            <button
                              key={color}
                              onClick={() => setNewTeacherColor(color)}
                              className={`w-5 h-5 rounded-full transition-all ${newTeacherColor === color ? 'ring-2 ring-offset-1 ring-stone-500 scale-110' : 'hover:scale-110'}`}
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                        <button
                          onClick={handleAddTeacher}
                          disabled={!newTeacherName.trim()}
                          className="ml-auto flex items-center gap-1 px-3 py-1 bg-ink-black text-paper text-xs rounded hover:bg-ink-black/80 disabled:bg-stone-600 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus size={12} /> 添加
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Courses Section */}
                <section>
                  <h3 className="text-sm font-bold text-ink-black mb-3 flex items-center gap-2">
                    <HardDrive size={16} /> 课程管理
                  </h3>
                  <div className="bg-paper-dark p-4 rounded-md border border-surface-border space-y-3">
                    {scheduleConfig.courses.length === 0 && (
                      <p className="text-xs text-text-secondary text-center py-2">暂无课程，请在下方添加</p>
                    )}
                    {scheduleConfig.courses.map((course, index) => (
                      <div key={course.id} className="flex items-center gap-2 bg-paper-dark border border-surface-border rounded px-3 py-2">
                        <div className="flex flex-col gap-0.5 shrink-0">
                          <button
                            onClick={() => handleMoveCourseUp(index)}
                            disabled={index === 0}
                            className="text-text-secondary hover:text-ink-black disabled:opacity-20 disabled:cursor-not-allowed transition-colors leading-none"
                            title="上移"
                          >
                            <ChevronUp size={12} />
                          </button>
                          <button
                            onClick={() => handleMoveCourseDown(index)}
                            disabled={index === scheduleConfig.courses.length - 1}
                            className="text-text-secondary hover:text-ink-black disabled:opacity-20 disabled:cursor-not-allowed transition-colors leading-none"
                            title="下移"
                          >
                            <ChevronDown size={12} />
                          </button>
                        </div>
                        
                        {editingCourseId === course.id ? (
                          <input
                            type="text"
                            value={editingCourseName}
                            onChange={e => setEditingCourseName(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleSaveEditCourse();
                              if (e.key === 'Escape') handleCancelEditCourse();
                            }}
                            onBlur={handleSaveEditCourse}
                            className="flex-1 px-2 py-0.5 border border-surface-border rounded text-sm bg-input-bg focus:outline-none focus:ring-1 focus:ring-stone-500 text-ink-black"
                            autoFocus
                          />
                        ) : (
                          <>
                            <span className="flex-1 text-sm text-ink-black">{course.name}</span>
                            <button
                              onClick={() => handleStartEditCourse(course)}
                              className="text-text-secondary hover:text-ink-black transition-colors"
                              title="编辑"
                            >
                              <Pencil size={12} />
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-text-secondary hover:text-red-400 transition-colors"
                          title="删除课程"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-surface-border space-y-2">
                      <p className="text-xs font-medium text-text-secondary">添加课程</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCourseName}
                          onChange={e => setNewCourseName(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleAddCourse()}
                          placeholder="输入课程名，如：第3课 音阶练习"
                          className="flex-1 px-3 py-1.5 border border-surface-border rounded text-sm bg-input-bg focus:outline-none focus:ring-2 focus:ring-stone-500 text-ink-black placeholder-stone-500"
                        />
                        <button
                          onClick={handleAddCourse}
                          disabled={!newCourseName.trim()}
                          className="flex items-center gap-1 px-3 py-1.5 bg-ink-black text-paper text-xs rounded hover:bg-ink-black/80 disabled:bg-stone-600 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus size={12} /> 添加
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Teacher Filter Section */}
                <section>
                  <h3 className="text-sm font-bold text-ink-black mb-3 flex items-center gap-2">
                    <Users size={16} /> {t('filterTeacher')}
                  </h3>
                  <div className="bg-paper-dark p-4 rounded-md border border-surface-border space-y-1">
                    <button
                      onClick={() => onFilterTeacherChange?.(null)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-xs rounded transition-colors hover:bg-surface-hover ${
                        !filterTeacherId ? 'text-ink-black bg-surface font-medium' : 'text-text-secondary'
                      }`}
                    >
                      <span className="w-4 flex justify-center">
                        {!filterTeacherId && <Check size={14} />}
                      </span>
                      {t('allTeachers')}
                    </button>
                    {scheduleConfig.teachers.map(teacher => (
                      <button
                        key={teacher.id}
                        onClick={() => onFilterTeacherChange?.(teacher.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs rounded transition-colors hover:bg-surface-hover ${
                          filterTeacherId === teacher.id ? 'text-ink-black bg-surface font-medium' : 'text-text-secondary'
                        }`}
                      >
                        <span className="w-4 flex justify-center">
                          {filterTeacherId === teacher.id && <Check size={14} />}
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: teacher.color }} />
                        <span className="truncate">{teacher.name}</span>
                      </button>
                    ))}
                    {scheduleConfig.teachers.length === 0 && (
                      <p className="text-xs text-text-secondary text-center py-4">{t('noTeacher')}</p>
                    )}
                  </div>
                </section>
              </>
            )}
        </div>

        <div className="bg-paper-dark px-6 py-3 border-t border-surface-border flex justify-end gap-2">
           <button 
             onClick={onClose}
             className="bg-paper-dark border border-surface-border hover:bg-surface-hover text-ink-black px-6 py-1.5 rounded text-sm font-medium transition-colors"
           >
             {t('cancel')}
           </button>
            <button 
                onClick={() => {
                  if (activeTab === 'security') {
                    handleSaveSecurity();
                  } else {
                    onClose();
                  }
                }}
             className="bg-ink-black hover:bg-ink-black/80 text-paper px-6 py-1.5 rounded text-sm font-medium transition-colors shadow-sm"
           >
             {t('saveChanges')}
           </button>
        </div>
      </div>
    </div>
  );
};
