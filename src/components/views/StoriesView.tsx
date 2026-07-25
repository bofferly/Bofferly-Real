import React, { useState } from 'react';
import { BookOpen, Sparkles, UserCheck, ArrowRight, X } from 'lucide-react';
import { PROPHET_STORIES, SAHABAH_STORIES } from '../../data/storiesData';
import { ProphetStory } from '../../types';

export const StoriesView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'prophets' | 'sahabah' | 'children'>('prophets');
  const [selectedStory, setSelectedStory] = useState<ProphetStory | null>(null);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Qasas al-Anbiya & Sahabah Chronicles</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
          Islamic Stories & Historical Chronicles
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
          Inspiring, authentic Quranic stories of the Prophets of Allah, the noble Sahabah, classical heroes, and educational kids stories.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-emerald-200 dark:border-slate-800 pb-3">
        {[
          { id: 'prophets', label: '📖 Stories of Prophets (Anbiya)', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'sahabah', label: '✨ Sahabah Companions', icon: <UserCheck className="w-4 h-4" /> },
          { id: 'children', label: '🎨 Children & Kids Stories', icon: <Sparkles className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
              activeCategory === tab.id
                ? 'bg-amber-400 text-emerald-950 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-emerald-100 dark:border-slate-800 hover:border-amber-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PROPHETS STORIES GRID */}
      {activeCategory === 'prophets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROPHET_STORIES.map((story) => (
            <div 
              key={story.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between p-6 space-y-4"
            >
              <div className="space-y-2">
                <span className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {story.prophetName}
                </span>
                <h3 className="text-xl font-bold font-serif text-emerald-950 dark:text-white">{story.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{story.summary}</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-amber-600">Key Takeaway Lessons:</p>
                  <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                    {story.keyLessons.slice(0, 2).map((kl, idx) => (
                      <li key={idx} className="truncate">{kl}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedStory(story)}
                  className="w-full bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1"
                >
                  <span>Read Complete Chronicle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SAHABAH STORIES */}
      {activeCategory === 'sahabah' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAHABAH_STORIES.map((sahaba) => (
            <div key={sahaba.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b pb-2 border-emerald-100 dark:border-slate-800">
                <h3 className="font-bold text-lg font-serif text-emerald-950 dark:text-white">{sahaba.name}</h3>
                <span className="font-serif text-base text-amber-600">{sahaba.titleArabic}</span>
              </div>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">{sahaba.title}</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{sahaba.fullStory}</p>
            </div>
          ))}
        </div>
      )}

      {/* Full Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white max-w-2xl w-full rounded-2xl p-6 border border-emerald-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 border-emerald-100 dark:border-slate-800">
              <h3 className="font-bold text-xl font-serif text-emerald-900 dark:text-amber-300">
                {selectedStory.prophetName} — {selectedStory.title}
              </h3>
              <button onClick={() => setSelectedStory(null)} className="text-sm font-bold text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-3 whitespace-pre-line">
              {selectedStory.fullStory}
            </div>

            <div className="bg-emerald-50 dark:bg-slate-800 p-4 rounded-xl space-y-2 text-xs border border-emerald-100 dark:border-slate-700">
              <p className="font-bold text-emerald-900 dark:text-amber-300">Quranic Citations:</p>
              <p className="text-slate-700 dark:text-slate-200">{selectedStory.quranicVerses.join(' • ')}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
