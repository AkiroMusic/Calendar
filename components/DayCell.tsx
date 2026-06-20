
import React, { useState, useRef, useLayoutEffect, memo, useCallback } from 'react';
import { format, getDate, isSameMonth, isSameDay, getLunarDate, getHoliday } from '../utils/dateUtils';
import { DayData, ScheduleConfig } from '../types';

import { StickerPicker } from './StickerPicker';
import { getCurrentLanguage, t } from '../utils/i18n';

interface DayCellProps {
  day: Date;
  currentDate: Date;
  data?: DayData;
  onClick: () => void;
  highlight?: boolean;
  onContextMenu?: (day: Date) => void;
  scheduleConfig?: ScheduleConfig;
}

const DayCellComponent: React.FC<DayCellProps> = ({ day, currentDate, data, onClick, highlight, onContextMenu, scheduleConfig }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [maxEllipsisCount, setMaxEllipsisCount] = useState(3);
  const eventsListRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);

  const isCurrentMonth = isSameMonth(day, currentDate);
  const isToday = isSameDay(day, new Date());
  const isWeekend = day.getDay() === 0 || day.getDay() === 6;
  const lunar = getLunarDate(day);
  const holiday = getHoliday(day, getCurrentLanguage());
  const stickers = data?.stickers || [];
  const events = data?.events || [];
  const quickNotes = data?.quickNotes || [];

  // 动态测量首条日记项高度
  useLayoutEffect(() => {
    const el = eventsListRef.current;
    if (!el) return;
    let itemHeight = 22; // 行高提升到24px+2px间距
    if (firstItemRef.current) {
      itemHeight = firstItemRef.current.getBoundingClientRect().height ; // 额外加2-4px缓冲
    }
    const resize = () => {
      const available = el.clientHeight;
      const count = Math.max(1, Math.floor(available / itemHeight));
      setMaxEllipsisCount(count);
    };
    resize();
    // 监听尺寸变化
    const ro = new window.ResizeObserver(resize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [events.length, quickNotes.length]);

  // 优化事件处理
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback(() => {
    if (isCurrentMonth) onClick();
  }, [isCurrentMonth, onClick]);
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (!isCurrentMonth) return;
    e.preventDefault();
    onContextMenu?.(day);
  }, [isCurrentMonth, onContextMenu, day]);

  return (
    <div 
      className={`
        relative flex flex-col border-r border-b border-surface-border select-none
        ${!isCurrentMonth ? 'bg-paper text-stone-600 cursor-default' : 'bg-surface text-ink-black cursor-pointer hover:bg-surface-hover'}
        ${isToday ? 'ring-2 ring-inset ring-yellow-600 bg-yellow-900/20' : ''}
        ${highlight ? 'ring-4 ring-blue-600 bg-blue-900/20 animate-pulse' : ''}
        transition-all duration-200 group overflow-hidden h-full min-h-0
      `}
      style={{
        animation: highlight ? 'pulse 0.5s ease-in-out 2' : undefined
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {/* Date Header */}
      <div className="flex justify-between items-start p-1.5 shrink-0 relative">
        <div className="flex flex-col leading-none flex-1 min-w-0">
            <span className={`
            text-base font-sans font-bold 
            ${isWeekend && isCurrentMonth ? 'text-ink-red' : ''}
            ${!isCurrentMonth ? 'text-stone-600' : ''}
            `}>
            {getDate(day)}
            </span>
            <div className="flex items-center gap-1 mt-0.5 w-full overflow-hidden">
              <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
                <span className="text-[8px] text-text-secondary font-serif transform scale-90 origin-left truncate">{lunar}</span>
                {holiday && (
                  <span className="text-[8px] text-ink-red font-medium truncate">{holiday}</span>
                )}
              </div>
              {events.length > maxEllipsisCount && (
                <span className="text-[8px] text-text-secondary whitespace-nowrap shrink-0">
                  {t('entriesCount').replace('{count}', String(events.length))}
                </span>
              )}
            </div>
        </div>
        {/* Decorative Stickers (Top Right) */}
        {stickers.length > 0 && (
          <div className="absolute top-1 right-1 flex flex-wrap justify-end gap-0 max-w-[45%] shrink-0 pointer-events-none">
            {stickers.slice(0, 3).map((s, i) => (
              <span key={i} className="text-xl leading-none">{s}</span>
            ))}
          </div>
        )}
      </div>
      {/* Events List */}
      <div
        ref={eventsListRef}
        className="flex-1 min-h-0 h-full px-1.5 pb-1 flex flex-col gap-0.5 overflow-hidden"
      >
        {events.slice(0, maxEllipsisCount).map((event, index) => {
          const teacher = scheduleConfig?.teachers.find(t => t.id === event.teacherId);
          const course = scheduleConfig?.courses.find(c => c.id === event.courseId);
          const label = [teacher?.name, course?.name].filter(Boolean).join(' · ') || '未配置';
          const color = teacher?.color || '#a8a29e';
          return (
            <div
              key={event.id}
              ref={index === 0 ? firstItemRef : undefined}
              className="flex items-center text-[9px] leading-[1.4] truncate rounded-sm overflow-hidden"
              style={{
                borderLeft: `2.5px solid ${color}`,
                paddingLeft: '3px',
                backgroundColor: `${color}18`,
              }}
            >
              <span
                className="truncate font-medium shrink-0"
                style={{ color }}
              >
                {label}
              </span>
              <span className="ml-0.5 text-text-secondary truncate text-[8px]">
                {[event.lessonNumber, event.timeSlot].filter(Boolean).join(' ')}
                {event.notes && ` ${event.notes}`}
              </span>
            </div>
          );
        })}
        {/* Quick Notes */}
        {quickNotes.length > 0 && events.length <= maxEllipsisCount && (
          <>
            {quickNotes.slice(0, Math.max(1, maxEllipsisCount - events.length)).map((note, index) => (
              <div
                key={`qn-${index}`}
                className="flex items-center text-[9px] leading-[1.4] truncate border-l-2 border-dashed border-stone-500 pl-[5px] text-stone-400"
              >
                <span className="text-[8px] shrink-0 mr-1">📝</span>
                <span className="truncate">{note}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

// 使用 React.memo 包装，深比较 data 对象
export const DayCell = memo(DayCellComponent, (prevProps, nextProps) => {
  return (
    prevProps.day.getTime() === nextProps.day.getTime() &&
    prevProps.currentDate.getTime() === nextProps.currentDate.getTime() &&
    prevProps.highlight === nextProps.highlight &&
    prevProps.data?.events?.length === nextProps.data?.events?.length &&
    prevProps.data?.stickers?.length === nextProps.data?.stickers?.length &&
    prevProps.data?.quickNotes?.length === nextProps.data?.quickNotes?.length &&
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    JSON.stringify(prevProps.scheduleConfig) === JSON.stringify(nextProps.scheduleConfig)
  );
});