import React, { useState } from 'react';
import { Sparkles, Calendar, Shield, Heart, Users, ChevronRight, BookOpen } from 'lucide-react';
import { SEERAH_TIMELINE, MAJOR_BATTLES, CHARACTER_TRAITS } from '../../data/seerahData';

export const SeerahView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'timeline' | 'battles' | 'family' | 'character'>('timeline');

  const familyTree = [
    { role: 'Grandfather', name: 'Abdul Muttalib ibn Hashim' },
    { role: 'Father', name: 'Abdullah ibn Abdul Muttalib' },
    { role: 'Mother', name: 'Aminah bint Wahb' },
    { role: 'Beloved Wives (Mother of Believers)', name: 'Khadijah bint Khuwaylid, Aisha bint Abu Bakr, Hafsa bint Umar, Sawda, Um Salama, Zaynab...' },
    { role: 'Blessed Children', name: 'Qasim, Abdullah, Ibrahim, Zainab, Ruqayyah, Umm Kulthum, Fatimah al-Zahra' },
    { role: 'Beloved Grandchildren', name: 'Hasan ibn Ali, Husayn ibn Ali, Zainab, Umm Kulthum' }
  ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Seerah Nabawiyyah Portal (السيرة النبوية)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
          The Blessed Life of Prophet Muhammad ﷺ
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
          An interactive chronicle of the final Messenger of Allah ﷺ — from Makkah and Madinah to the major battles, noble character traits, and sacred lineage.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-emerald-200 dark:border-slate-800 pb-3">
        {[
          { id: 'timeline', label: '📅 Chronological Timeline', icon: <Calendar className="w-4 h-4" /> },
          { id: 'battles', label: '🛡️ Major Battles (Ghazawat)', icon: <Shield className="w-4 h-4" /> },
          { id: 'family', label: '🌳 Blessed Family Tree', icon: <Users className="w-4 h-4" /> },
          { id: 'character', label: '✨ Character & Manners', icon: <Heart className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
              activeSection === tab.id
                ? 'bg-amber-400 text-emerald-950 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-emerald-100 dark:border-slate-800 hover:border-amber-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: TIMELINE */}
      {activeSection === 'timeline' && (
        <div className="space-y-6">
          <div className="relative border-l-2 border-amber-400 pl-6 ml-3 space-y-8">
            {SEERAH_TIMELINE.map((event, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-amber-400 border-4 border-emerald-900 shadow-md" />
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-2 hover:border-amber-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold bg-emerald-950 text-amber-300 px-3 py-1 rounded-full">
                      {event.yearGregorian} CE ({event.yearHijri < 0 ? `${Math.abs(event.yearHijri)} BH` : `${event.yearHijri} AH`})
                    </span>
                    <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded">
                      {event.period} Period
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-serif text-emerald-950 dark:text-white">{event.title}</h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{event.description}</p>
                  <p className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-slate-800 p-2.5 rounded-lg">
                    <strong>Significance:</strong> {event.significance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: BATTLES */}
      {activeSection === 'battles' && (
        <div className="space-y-6">
          {MAJOR_BATTLES.map((battle) => (
            <div key={battle.id} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-emerald-100 dark:border-slate-800">
                <h3 className="text-xl font-bold font-serif text-emerald-950 dark:text-white">{battle.name}</h3>
                <span className="bg-amber-400 text-emerald-950 font-bold text-xs px-3 py-1 rounded-full">{battle.year}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 text-[10px] font-bold block">Muslim Forces</span>
                  <p className="font-bold text-emerald-800 dark:text-emerald-300 mt-0.5">{battle.muslimsCount}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 text-[10px] font-bold block">Opponents</span>
                  <p className="font-bold text-amber-700 dark:text-amber-400 mt-0.5">{battle.opponentsCount}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 text-[10px] font-bold block">Location</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{battle.location}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 text-[10px] font-bold block">Outcome</span>
                  <p className="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">{battle.outcome}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-emerald-900 dark:text-amber-300">Key Events & Divine Intervention:</p>
                <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  {battle.keyEvents.map((ke, idx) => (
                    <li key={idx}>{ke}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 dark:bg-slate-800 p-3 rounded-xl border border-emerald-100 dark:border-slate-700 text-xs">
                <strong className="text-emerald-900 dark:text-amber-300">Spiritual Lessons: </strong>
                <span className="text-slate-800 dark:text-slate-200">{battle.lessons.join(' ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 3: FAMILY TREE */}
      {activeSection === 'family' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-xl font-bold font-serif text-emerald-950 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            <span>The Blessed Family Tree (Ahl al-Bayt)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familyTree.map((item, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">{item.role}</span>
                <p className="font-bold text-sm text-emerald-950 dark:text-white">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: CHARACTER & MANNERS */}
      {activeSection === 'character' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHARACTER_TRAITS.map((ct, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-2">
              <h4 className="font-bold text-base font-serif text-emerald-900 dark:text-amber-300">{ct.trait}</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{ct.description}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
