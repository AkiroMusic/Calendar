
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { format, getLunarFullDate } from '../utils/dateUtils';
import { DayData, ScheduleEntry, ScheduleConfig, STICKERS } from '../types';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { t } from '../utils/i18n';

interface DayEditorProps {
  date: Date;
  initialData?: DayData;
  onClose: () => void;
  onSave: (date: string, events: ScheduleEntry[], stickers: string[], quickNotes: string[]) => void;
  scheduleConfig: ScheduleConfig;
}

export const DayEditor: React.FC<DayEditorProps> = ({ date, initialData, onClose, onSave, scheduleConfig }) => {
  const [entries, setEntries] = useState<ScheduleEntry[]>(() => initialData?.events || []);
  const [stickers, setStickers] = useState<string[]>(() => initialData?.stickers || []);
  const [quickNotesText, setQuickNotesText] = useState<string>(() => (initialData?.quickNotes || []).join('\n'));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleAddEntry = useCallback(() => {
    const newEntry: ScheduleEntry = {
      id: Date.now().toString(),
      teacherId: scheduleConfig.teachers[0]?.id || '',
      courseId: scheduleConfig.courses[0]?.id || '',
      lessonNumber: '',
      timeSlot: '',
      notes: '',
    };
    setEntries(prev => [...prev, newEntry]);
  }, [scheduleConfig]);

  const handleEntryChange = useCallback((id: string, field: keyof ScheduleEntry, value: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  }, []);

  const handleDeleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  const handleSave = useCallback(() => {
    const validEntries = entries.filter(e => e.teacherId !== '' || e.courseId !== '' || e.notes.trim() !== '');
    const quickNotes = quickNotesText.split('\n').filter(n => n.trim() !== '');
    onSave(format(date, 'yyyy-MM-dd'), validEntries, stickers, quickNotes);
    onClose();
  }, [entries, stickers, quickNotesText, date, onSave, onClose]);

  const toggleSticker = useCallback((emoji: string) => {
    setStickers(prev =>
      prev.includes(emoji) ? prev.filter(s => s !== emoji) : [...prev, emoji]
    );
  }, []);

  const dateFormatted = useMemo(() => format(date, 'yyyy/MM/dd'), [date]);
  const lunarDate = useMemo(() => getLunarFullDate(date), [date]);

  const backdropStyle = useMemo(() => ({
    backgroundColor: isVisible ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0)',
    opacity: isVisible ? 1 : 0,
  }), [isVisible]);

  const modalStyle = useMemo(() => ({
    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    opacity: isVisible ? 1 : 0,
  }), [isVisible]);

  const hasNoConfig = scheduleConfig.teachers.length === 0 || scheduleConfig.courses.length === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
      style={backdropStyle}
    >
      <div
        className="bg-surface w-[640px] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all duration-200 ease-out"
        style={modalStyle}
      >
        {/* Header */}
        <div className="bg-paper-dark px-4 py-3 border-b border-surface-border flex justify-between items-center">
          <div>
            <h2 className="font-serif font-bold text-xl text-ink-black">{dateFormatted}</h2>
            <p className="text-xs text-text-secondary uppercase tracking-wide">{lunarDate}</p>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-ink-black transition-colors" title="Close">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* Schedule Entries Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-text-secondary uppercase">{t('scheduleEntries')}</label>
            </div>

            {hasNoConfig && (
              <div className="bg-amber-900/30 border border-amber-700/50 rounded p-3 mb-3">
                <p className="text-xs text-amber-300">
                  {t('scheduleConfigHint')}
                </p>
              </div>
            )}

            <div className="space-y-2">
              {entries.map((entry, index) => {
                const teacher = scheduleConfig.teachers.find(t => t.id === entry.teacherId);
                return (
                  <div key={entry.id} className="flex items-center gap-1.5 group flex-wrap">
                    <span className="text-text-secondary font-mono text-xs w-4 shrink-0">{index + 1}.</span>

                    {/* Teacher selector */}
                    <div className="relative flex items-center">
                      {teacher && (
                        <span
                          className="absolute left-2 w-2.5 h-2.5 rounded-full pointer-events-none"
                          style={{ backgroundColor: teacher.color }}
                        />
                      )}
                      <select
                        value={entry.teacherId}
                        onChange={e => handleEntryChange(entry.id, 'teacherId', e.target.value)}
                        className="pl-6 pr-2 py-1.5 border border-surface-border rounded text-sm bg-input-bg focus:outline-none focus:ring-1 focus:ring-stone-500 focus:bg-input-bg text-ink-black appearance-none min-w-[90px]"
                      >
                        <option value="">{t('selectTeacher')}</option>
                        {scheduleConfig.teachers.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Course selector */}
                    <select
                      value={entry.courseId}
                      onChange={e => handleEntryChange(entry.id, 'courseId', e.target.value)}
                      className="flex-1 min-w-[100px] px-2 py-1.5 border border-surface-border rounded text-sm bg-input-bg focus:outline-none focus:ring-1 focus:ring-stone-500 focus:bg-input-bg text-ink-black"
                    >
                      <option value="">{t('selectCourse')}</option>
                      {scheduleConfig.courses.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>

                    {/* Lesson number */}
                    <input
                      type="text"
                      value={entry.lessonNumber}
                      onChange={e => handleEntryChange(entry.id, 'lessonNumber', e.target.value)}
                      placeholder={t('lessonNumber')}
                      className="w-16 px-1.5 py-1.5 border border-surface-border rounded text-sm bg-input-bg focus:outline-none focus:ring-1 focus:ring-stone-500 focus:bg-input-bg text-ink-black placeholder-text-secondary text-center"
                    />

                    {/* Time slot */}
                    <input
                      type="text"
                      value={entry.timeSlot}
                      onChange={e => handleEntryChange(entry.id, 'timeSlot', e.target.value)}
                      placeholder="时间"
                      className="w-20 px-1.5 py-1.5 border border-surface-border rounded text-sm bg-input-bg focus:outline-none focus:ring-1 focus:ring-stone-500 focus:bg-input-bg text-ink-black placeholder-text-secondary text-center"
                    />

                    {/* Notes */}
                    <input
                      type="text"
                      value={entry.notes}
                      onChange={e => handleEntryChange(entry.id, 'notes', e.target.value)}
                      placeholder="备注"
                      className="w-20 px-1.5 py-1.5 border border-surface-border rounded text-sm bg-input-bg focus:outline-none focus:ring-1 focus:ring-stone-500 focus:bg-input-bg text-ink-black placeholder-text-secondary"
                    />

                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="opacity-0 group-hover:opacity-100 text-text-secondary hover:text-red-400 transition-opacity shrink-0"
                      title="删除"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleAddEntry}
              disabled={hasNoConfig}
              className="mt-3 flex items-center gap-1 text-text-secondary hover:text-ink-black text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={14} /> {t('addScheduleEntry')}
            </button>
          </div>

          {/* Quick Notes Section */}
          <div className="mb-6">
            <label className="text-xs font-bold text-text-secondary uppercase mb-2 block">{t('quickNotes')}</label>
            <textarea
              value={quickNotesText}
              onChange={e => setQuickNotesText(e.target.value)}
              placeholder={t('quickNotes') + '...'}
              rows={4}
              className="w-full px-3 py-2 border border-surface-border rounded text-sm bg-input-bg focus:outline-none focus:ring-1 focus:ring-stone-500 focus:bg-input-bg text-ink-black placeholder-text-secondary resize-none"
            />
            <p className="text-[10px] text-text-secondary mt-1">{t('notesPerLine')}</p>
          </div>

          {/* Stickers Section */}
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase mb-2 block">{t('moodStickers')}</label>
            <div className="flex flex-wrap gap-2 bg-paper-dark p-3 rounded-lg border border-surface-border">
              {STICKERS.map(s => (
                <button
                  key={s.id}
                  onClick={() => toggleSticker(s.emoji)}
                  className={`
                    text-2xl p-1.5 rounded transition-all hover:scale-110
                    ${stickers.includes(s.emoji) ? 'bg-surface shadow-sm ring-1 ring-surface-border' : 'opacity-60 hover:opacity-100'}
                  `}
                  title={s.label}
                >
                  {s.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-paper-dark px-4 py-3 border-t border-surface-border flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded text-sm font-medium text-text-secondary hover:bg-surface-hover transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium bg-ink-black text-paper hover:bg-ink-black/80 transition-colors shadow-sm"
          >
            <Save size={14} /> {t('saveChanges')}
          </button>
        </div>
      </div>
    </div>
  );
};
