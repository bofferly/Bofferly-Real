import React, { useState } from 'react';
import { Search, X, BookOpen, Scroll, HelpCircle, GraduationCap, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { NavigationTab } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavigationTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectTab }) => {
  const [query, setQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiSearchResult, setAiSearchResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsAiSearching(true);
    setAiSearchResult(null);

    try {
      const res = await fetch('/api/quran/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      setAiSearchResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiSearching(false);
    }
  };

  const quickLinks: { label: string; tab: NavigationTab; category: string }[] = [
    { label: 'Surah Al-Fatihah', tab: 'quran', category: 'Quran' },
    { label: 'Sahih al-Bukhari #1 (Intentions)', tab: 'hadith', category: 'Hadith' },
    { label: 'Qibla Finder & Prayer Times', tab: 'tools', category: 'Tools' },
    { label: 'Battle of Badr Seerah', tab: 'seerah', category: 'Seerah' },
    { label: 'Ask AI Scholar / Fatwa', tab: 'fatwa', category: 'Fatwa' },
    { label: 'Mastering Tajweed Course', tab: 'academy', category: 'Academy' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-16 px-4 animate-in fade-in">
      <div className="bg-emerald-900 dark:bg-slate-900 text-white w-full max-w-2xl rounded-2xl border border-emerald-700 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="p-4 border-b border-emerald-800 dark:border-slate-800 flex items-center justify-between gap-3">
          <form onSubmit={handleAiSearch} className="flex-1 flex items-center space-x-3 bg-emerald-950/90 dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-emerald-700/80 dark:border-slate-800">
            <Search className="w-5 h-5 text-amber-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search Quran, Hadith, Fatwa, Seerah..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none text-white text-sm focus:outline-none w-full placeholder-emerald-300/60"
            />
            {query && (
              <button type="submit" className="text-xs bg-amber-400 text-emerald-950 font-bold px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Search</span>
              </button>
            )}
          </form>
          <button onClick={onClose} className="p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* AI Search Loading State */}
          {isAiSearching && (
            <div className="py-12 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-amber-300 font-semibold text-sm">Querying Bofferly AI Scholar Knowledge Base...</p>
              <p className="text-emerald-200/80">Searching relevant Quranic verses and authentic Hadiths for "{query}"</p>
            </div>
          )}

          {/* AI Search Results */}
          {aiSearchResult && !isAiSearching && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-emerald-950/80 p-4 rounded-xl border border-amber-400/30 space-y-2">
                <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI Search Summary</span>
                </h4>
                <p className="text-emerald-100 leading-relaxed">{aiSearchResult.explanation}</p>
              </div>

              {aiSearchResult.suggestedVerses && aiSearchResult.suggestedVerses.length > 0 && (
                <div>
                  <h5 className="font-bold text-amber-300 mb-2 flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Relevant Quranic Verses</span>
                  </h5>
                  <div className="space-y-2">
                    {aiSearchResult.suggestedVerses.map((v: any, idx: number) => (
                      <div key={idx} className="bg-emerald-950 p-3 rounded-lg border border-emerald-800">
                        <p className="font-serif text-lg text-right text-amber-200 mb-1">{v.arabicText}</p>
                        <p className="text-emerald-100 italic mb-1">"{v.englishTranslation || v.text}"</p>
                        <span className="text-[10px] bg-emerald-800 text-amber-300 font-bold px-2 py-0.5 rounded">
                          Surah {v.surahName || v.surah}:{v.ayahNumber || v.ayah}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  onSelectTab('quran');
                  onClose();
                }}
                className="w-full bg-amber-400 text-emerald-950 font-bold py-2 rounded-xl text-center hover:bg-amber-300"
              >
                Open Complete Quran Section
              </button>
            </div>
          )}

          {/* Default Quick Search Suggestions */}
          {!aiSearchResult && !isAiSearching && (
            <div>
              <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-3">Popular Searches & Quick Links</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickLinks.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectTab(item.tab);
                      onClose();
                    }}
                    className="p-3 bg-emerald-950/60 hover:bg-emerald-800 rounded-xl border border-emerald-800 flex items-center justify-between text-left transition-colors group"
                  >
                    <div>
                      <p className="font-semibold text-emerald-100 group-hover:text-amber-300">{item.label}</p>
                      <span className="text-[10px] text-emerald-300/70">{item.category}</span>
                    </div>
                    <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
