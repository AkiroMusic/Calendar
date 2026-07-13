import React, { useEffect, useState } from 'react';
import { format } from '../utils/dateUtils';
import { DayData, ScheduleConfig } from '../types';
import { X } from 'lucide-react';
import { t } from '../utils/i18n';

interface DayPreviewProps {
  date: Date;
  data?: DayData;
  onClose: () => void;
  scheduleConfig?: ScheduleConfig;
  filterTeacherId?: string | null;
}

export const DayPreview: React.FC<DayPreviewProps> = ({ date, data, onClose, scheduleConfig, filterTeacherId }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 如果设置了教师筛选，只显示该教师的课程
  const events = (data?.events || []).filter(e =>
    !filterTeacherId || e.teacherId === filterTeacherId
  );
  const stickers = data?.stickers || [];
  const quickNotes = data?.quickNotes || [];

  const maxHeight = Math.floor(window.innerHeight * 0.7);

  return (
    <div
      className="bg-surface w-[700px] max-w-[90vw] rounded-xl shadow-xl overflow-hidden flex flex-col transition-all duration-200 ease-out"
      style={{
        maxHeight,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="bg-paper-dark px-4 py-2 border-b border-surface-border flex justify-between items-center select-none">
        <div>
          <h3 className="font-serif font-bold text-lg text-ink-black">{format(date, 'yyyy/MM/dd')}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-ink-black transition-colors"
          aria-label="关闭预览"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-4 overflow-y-auto overflow-x-hidden flex-1">
        <div className="space-y-3">
          {events.length === 0 ? (
            <p className="text-xs text-text-secondary">暂无内容</p>
          ) : (
            events.map((event, index) => {
              const teacher = scheduleConfig?.teachers.find(t => t.id === event.teacherId);
              const course = scheduleConfig?.courses.find(c => c.id === event.courseId);
              const teacherName = teacher?.name || event.teacherId || '';
              const courseName = course?.name || event.courseId || '';
              const label = [teacherName, courseName].filter(Boolean).join(' · ');
              const color = teacher?.color || '#a8a29e';
              return (
                <div key={event.id} className="flex items-start gap-2 text-sm leading-relaxed text-ink-black min-w-0">
                  <span className="text-text-secondary font-mono text-xs shrink-0 pt-0.5">{index + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {label && (
                        <span className="font-medium truncate" style={{ color }}>{label}</span>
                      )}
                      {event.lessonNumber && (
                        <span className="text-text-secondary text-xs shrink-0">{event.lessonNumber}</span>
                      )}
                      {event.timeSlot && (
                        <span className="text-text-secondary text-xs shrink-0">{event.timeSlot}</span>
                      )}
                    </div>
                    {event.notes && (
                      <p className="text-text-secondary text-xs mt-0.5">{event.notes}</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {quickNotes.length > 0 && (
          <div className="mt-4 pt-3 border-t border-surface-border">
            <div className="text-xs font-bold text-text-secondary uppercase mb-2">{t('quickNotes')}</div>
            <div className="space-y-1">
              {quickNotes.map((note, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-stone-400">
                  <span className="text-[10px] shrink-0 mt-0.5">📝</span>
                  <span className="text-ink-black">{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {stickers.length > 0 && (
          <div className="mt-3">
            <div className="text-[10px] font-bold text-text-secondary uppercase mb-1">贴纸</div>
            <div className="flex flex-wrap gap-1">
              {stickers.map((s, i) => (
                <span key={i} className="text-xl">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
