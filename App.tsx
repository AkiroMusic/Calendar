import React, { useState, useEffect, Suspense, useCallback, useMemo } from 'react';
import { format, addMonths, subMonths, getCalendarDays } from './utils/dateUtils';
import { CalendarHeader } from './components/CalendarHeader';
import { DayCell } from './components/DayCell';
import { DayEditor } from './components/DayEditor';
import { DayPreview } from './components/DayPreview';
const SettingsModal = React.lazy(() => import('./components/SettingsModal').then(m => ({ default: m.SettingsModal })));
const AboutModal = React.lazy(() => import('./components/AboutModal').then(m => ({ default: m.AboutModal })));
const AuthModal = React.lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const SearchModal = React.lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));
import { DayData, WEEK_DAYS, ScheduleEntry, ScheduleConfig } from './types';
import { StorageService } from './services/storageService';
import { Settings, Minus, Square, X, Search, Info, Sun, Moon } from 'lucide-react';
import { t, getWeekDay } from './utils/i18n';

const App: React.FC = () => {
  // --- State ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState<Record<string, DayData>>({});
  const [monthlyPlans, setMonthlyPlans] = useState<Record<string, string[]>>({});
  const [scheduleConfig, setScheduleConfig] = useState<ScheduleConfig>({ teachers: [], courses: [] });
  
  // UI State
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  });
  const [settingsDefaultTab, setSettingsDefaultTab] = useState<'general' | 'security'>('general');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [highlightDate, setHighlightDate] = useState<string | null>(null);
  const [previewWindows, setPreviewWindows] = useState<{ id: string; date: Date }[]>([]);

  // --- Lifecycle ---
  useEffect(() => {
    // 检查是否需要验证
    const securitySettings = localStorage.getItem('calendar-diary-security');
    if (securitySettings) {
      const security = JSON.parse(securitySettings);
      if (security.enabled) {
        setNeedsAuth(true);
        return;
      }
    }
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const loadData = async () => {
      const savedData = await StorageService.getData();
      const savedPlans = await StorageService.getPlans();
      const savedConfig = await StorageService.getScheduleConfig();
      
      if (savedData) setData(savedData);
      if (savedPlans) setMonthlyPlans(savedPlans);
      if (savedConfig) setScheduleConfig(savedConfig);
    };
    
    loadData();
    
  }, [isAuthenticated]);

  // 主题初始化（确保 data-theme 与状态同步）
  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, [darkMode]);

  // 快捷键监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+F (Windows/Linux) 或 Cmd+F (macOS)
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowSearch(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- Handlers ---
  const saveData = useCallback(async (newData: Record<string, DayData>) => {
    setData(newData);
    await StorageService.setData(newData);
    // 更新数据修改时间戳，用于云同步比较
    localStorage.setItem('calendar-diary-data-updated-at', new Date().toISOString());
  }, []);

  const savePlans = useCallback(async (newPlans: Record<string, string[]>) => {
    setMonthlyPlans(newPlans);
    await StorageService.setPlans(newPlans);
    // 更新数据修改时间戳，用于云同步比较
    localStorage.setItem('calendar-diary-data-updated-at', new Date().toISOString());
  }, []);

  const handleDaySave = useCallback((dateKey: string, events: ScheduleEntry[], stickers: string[]) => {
    setData(prevData => {
      const newData = {
        ...prevData,
        [dateKey]: { date: dateKey, events, stickers }
      };
      StorageService.setData(newData);
      localStorage.setItem('calendar-diary-data-updated-at', new Date().toISOString());
      return newData;
    });
  }, []);

  const handleScheduleConfigUpdate = useCallback(async (config: ScheduleConfig) => {
    setScheduleConfig(config);
    await StorageService.setScheduleConfig(config);
  }, []);

  const handlePlanUpdate = useCallback((index: number, value: string) => {
    const monthKey = format(currentDate, 'yyyy-MM');
    setMonthlyPlans(prevPlans => {
      const currentMonthPlan = prevPlans[monthKey] || ['', '', ''];
      const newPlan = [...currentMonthPlan];
      newPlan[index] = value;
      const newPlans = {
        ...prevPlans,
        [monthKey]: newPlan
      };
      StorageService.setPlans(newPlans);
      localStorage.setItem('calendar-diary-data-updated-at', new Date().toISOString());
      return newPlans;
    });
  }, [currentDate]);

  const openPreview = useCallback((day: Date) => {
    const id = format(day, 'yyyy-MM-dd');
    setPreviewWindows((prev) => {
      const exists = prev.some(p => p.id === id);
      if (exists) return prev;
      return [...prev, { id, date: day }];
    });
  }, []);

  const closePreview = useCallback((id: string) => {
    setPreviewWindows(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleExport = () => {
    const exportData = {
      version: 3,
      data,
      monthlyPlans,
      scheduleConfig
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schedule_backup_${format(new Date(), 'yyyy-MM-dd')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.data) saveData(parsed.data);
        if (parsed.monthlyPlans) savePlans(parsed.monthlyPlans);
        if (parsed.scheduleConfig) {
          setScheduleConfig(parsed.scheduleConfig);
          StorageService.setScheduleConfig(parsed.scheduleConfig);
        }
        alert(t('importSuccess'));
        setShowSettings(false);
      } catch (err) {
        alert(t('importError'));
      }
    };
    reader.readAsText(file);
  };

  // --- Render Data (useMemo 优化) ---
  const days = useMemo(() => getCalendarDays(currentDate), [currentDate]);
  const monthKey = useMemo(() => format(currentDate, 'yyyy-MM'), [currentDate]);
  const currentPlan = useMemo(() => monthlyPlans[monthKey] || ['', '', ''], [monthlyPlans, monthKey]);
  
  // Determine if we need 6 rows
  const isSixWeeks = days.length > 35;

  // 获取安全设置
  const getSecuritySettings = useCallback(() => {
    const securitySettings = localStorage.getItem('calendar-diary-security');
    if (securitySettings) {
      return JSON.parse(securitySettings);
    }
    return null;
  }, []);

  // 导航回调
  const handlePrevMonth = useCallback(() => setCurrentDate(d => subMonths(d, 1)), []);
  const handleNextMonth = useCallback(() => setCurrentDate(d => addMonths(d, 1)), []);
  const handleDateSelect = useCallback((date: Date) => setCurrentDate(date), []);

  return (
    <div className="w-full h-full min-h-0 bg-paper flex flex-col overflow-hidden relative">
      
      {/* Authentication Modal */}
      {needsAuth && !isAuthenticated && (() => {
        const security = getSecuritySettings();
        return security ? (
          <Suspense fallback={null}>
            <AuthModal
            onSuccess={() => {
              setIsAuthenticated(true);
              setNeedsAuth(false);
            }}
            onClose={() => {
              if (window.electronAPI?.window?.close) {
                window.electronAPI.window.close();
              } else {
                window.close();
              }
            }}
            defaultMethod={security.preferredMethod || security.type}
            storedPin={security.pinCode}
            totpSecret={security.totpSecret}
            />
          </Suspense>
        ) : null;
      })()}
      
      {/* Custom Title Bar */}
      <div className="h-10 bg-surface flex justify-between items-center px-4 border-b border-surface-border select-none shrink-0 draggable">
        <div className="flex items-center gap-3 text-sm font-semibold text-ink-black">
          <span className="w-3 h-3 rounded-full bg-ink-red shadow-sm"></span>
          <span>{t('appTitle')}</span>
        </div>
        <div className="flex items-center gap-2 non-draggable">
            <button 
              onClick={() => {
                const next = !darkMode;
                const theme = next ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('calendar-diary-theme', theme);
                setDarkMode(next);
              }} 
              className="p-1.5 text-text-secondary hover:bg-surface-hover hover:text-ink-black rounded-md transition-all"
              title={darkMode ? t('lightMode') : t('darkMode')}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button 
              onClick={() => setShowSearch(true)} 
              className="p-1.5 text-text-secondary hover:bg-surface-hover hover:text-ink-black rounded-md transition-all"
              title={`${t('searchDiary')} (${navigator.platform.includes('Mac') ? '⌘F' : 'Ctrl+F'})`}
            >
              <Search size={16} />
            </button>
            <button 
              onClick={() => setShowAbout(true)} 
              className="p-1.5 text-text-secondary hover:bg-surface-hover hover:text-ink-black rounded-md transition-all"
              title={t('about')}
            >
              <Info size={16} />
            </button>
            <button 
              onClick={() => {
                setSettingsDefaultTab('general');
                setShowSettings(true);
              }} 
              className="p-1.5 text-text-secondary hover:bg-surface-hover hover:text-ink-black rounded-md transition-all"
              title={t('settings')}
            >
              <Settings size={16} />
            </button>
            <div className="flex gap-1 ml-2">
              <button 
                onClick={() => window.electronAPI?.window.minimize()} 
                className="p-1.5 text-text-secondary hover:bg-surface-hover hover:text-yellow-500 rounded-md transition-all"
                title={t('minimize')}
              >
                <Minus size={16} />
              </button>
              <button 
                onClick={() => window.electronAPI?.window.maximize()} 
                className="p-1.5 text-text-secondary hover:bg-surface-hover hover:text-green-500 rounded-md transition-all"
                title={t('maximize')}
              >
                <Square size={14} />
              </button>
              <button 
                onClick={() => window.electronAPI?.window.close()} 
                className="p-1.5 text-text-secondary hover:bg-surface-hover hover:text-red-500 rounded-md transition-all"
                title={t('close')}
              >
                <X size={16} />
              </button>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 flex flex-col bg-paper-dark relative">
        
        <div className="relative z-10 flex flex-col h-full min-h-0">
            <CalendarHeader 
                currentDate={currentDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onDateSelect={handleDateSelect}
                monthlyPlan={currentPlan}
                onUpdatePlan={handlePlanUpdate}
            />

            <div className="flex-1 min-h-0 flex flex-col p-4 pt-0 overflow-hidden">
                 {/* Week Header */}
                <div className="grid grid-cols-7 border-b border-stone-300 mb-1 shrink-0">
                    {WEEK_DAYS.map((day, index) => (
                        <div key={index} className={`py-1 text-center text-xs font-bold tracking-wider uppercase ${day.color} text-white rounded-t-sm mx-[1px]`}>
                        {getWeekDay(index)}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className={`grid grid-cols-7 gap-1 min-h-0 h-full flex-1 ${isSixWeeks ? 'grid-rows-6' : 'grid-rows-5'}`}>
                    {days.map((day) => {
                        const dateKey = format(day, 'yyyy-MM-dd');
                        const shouldHighlight = highlightDate === dateKey;
                        
                        return (
                            <DayCell 
                              key={day.toISOString()} 
                              day={day} 
                              currentDate={currentDate}
                              data={data[dateKey]}
                              onClick={() => setSelectedDay(day)}
                              highlight={shouldHighlight}
                              onContextMenu={openPreview}
                              scheduleConfig={scheduleConfig}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
      </div>

      {/* Modals */}
      {selectedDay && (
        <DayEditor 
          date={selectedDay}
          initialData={data[format(selectedDay, 'yyyy-MM-dd')]}
          onClose={() => setSelectedDay(null)}
          onSave={handleDaySave}
          scheduleConfig={scheduleConfig}
        />
      )}

      {showSettings && (
        <Suspense fallback={null}>
          <SettingsModal 
              onClose={() => setShowSettings(false)} 
              onExport={handleExport}
              onImport={handleImport}
              defaultTab={settingsDefaultTab}
              scheduleConfig={scheduleConfig}
              onScheduleConfigChange={handleScheduleConfigUpdate}
          />
        </Suspense>
      )}

      {showAbout && (
        <Suspense fallback={null}>
          <AboutModal onClose={() => setShowAbout(false)} />
        </Suspense>
      )}

      {showSearch && (
        <Suspense fallback={null}>
          <SearchModal 
            onClose={() => setShowSearch(false)}
            data={data}
            onSelectDate={(date) => {
              const dateKey = format(date, 'yyyy-MM-dd');
              setCurrentDate(date);
              setHighlightDate(dateKey);
              
              // 闪动两次后移除高亮
              setTimeout(() => {
                setHighlightDate(null);
              }, 1000);
            }}
          />
        </Suspense>
      )}

      {/* Preview Overlay */}
      {previewWindows.length > 0 && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          onClick={(e) => {
            // 点击遮罩层关闭所有预览窗口
            if (e.target === e.currentTarget) {
              setPreviewWindows([]);
            }
          }}
        >
          <div 
            className="max-h-[85vh] overflow-y-auto overflow-x-hidden p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap gap-6 justify-center">
              {previewWindows.map((p) => (
                <DayPreview
                  key={p.id}
                  date={p.date}
                  data={data[format(p.date, 'yyyy-MM-dd')]}
                  onClose={() => closePreview(p.id)}
                  scheduleConfig={scheduleConfig}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
