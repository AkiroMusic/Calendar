import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { t } from '../utils/i18n';
import { format, parse } from '../utils/dateUtils';
import { DayData } from '../types';

interface SearchModalProps {
  onClose: () => void;
  data: Record<string, DayData>;
  onSelectDate: (date: Date) => void;
}

interface SearchResult {
  dateKey: string;
  date: Date;
  content: string;
  matchText: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, data, onSelectDate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsVisible(true);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    Object.entries(data).forEach(([dateKey, dayData]) => {
      const typedData = dayData as DayData;
      if (!typedData) return;
      const dayEvents = typedData.events || [];
      const dayNotes = typedData.quickNotes || [];
      if (dayEvents.length === 0 && dayNotes.length === 0) return;

      const notesText = dayNotes.join(' ');
      const allText = [...dayEvents.map(e => (e as any).notes || (e as any).rawText || ''), notesText].join(' ');
      
      if (allText.toLowerCase().includes(query)) {
        const date = parse(dateKey, 'yyyy-MM-dd', new Date());
        
        // 找到匹配的文本片段
        const matchIndex = allText.toLowerCase().indexOf(query);
        const start = Math.max(0, matchIndex - 20);
        const end = Math.min(allText.length, matchIndex + query.length + 20);
        let matchText = allText.substring(start, end);
        
        if (start > 0) matchText = '...' + matchText;
        if (end < allText.length) matchText = matchText + '...';

        searchResults.push({
          dateKey,
          date,
          content: allText,
          matchText
        });
      }
    });

    // 按日期降序排序（最新的在前）
    searchResults.sort((a, b) => b.date.getTime() - a.date.getTime());
    setResults(searchResults);
  }, [searchQuery, data]);

  const handleSelectResult = (result: SearchResult) => {
    onSelectDate(result.date);
    onClose();
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-600 text-yellow-100 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
      style={{
        backgroundColor: isVisible ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
        opacity: isVisible ? 1 : 0
      }}
      onClick={onClose}
    >
      <div 
        className="bg-surface w-[600px] max-h-[600px] rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ease-out"
        style={{
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          opacity: isVisible ? 1 : 0
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-paper-dark px-4 py-2 border-b border-surface-border flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <Search size={14} className="text-ink-black" />
            <span className="text-xs font-bold text-ink-black">{t('searchDiary')}</span>
            <span className="text-[10px] text-text-secondary">
              {navigator.platform.includes('Mac') ? '⌘F' : 'Ctrl+F'}
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-text-secondary hover:text-ink-black transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-surface-border">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 border border-surface-border bg-input-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 text-sm text-ink-black placeholder-stone-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {!searchQuery.trim() ? (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary">
              <Search size={48} className="mb-2 opacity-50" />
              <p className="text-sm">{t('searchStart')}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary">
              <p className="text-sm">{t('searchNoResults').replace('{query}', searchQuery)}</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-text-secondary mb-3">
                {t('searchResultsCount').replace('{count}', String(results.length))}
              </p>
              {results.map((result) => (
                <button
                  key={result.dateKey}
                  onClick={() => handleSelectResult(result)}
                  className="w-full text-left p-3 bg-paper-dark hover:bg-surface-hover rounded-lg border border-surface-border transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-ink-black group-hover:text-ink-black">
                      {format(result.date, 'yyyy年MM月dd日')}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {format(result.date, 'EEEE')}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {highlightMatch(result.matchText, searchQuery)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
