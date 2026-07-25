import React, { useState } from 'react';
import { Bookmark, Heart, GraduationCap, Clock, Trash2, ArrowRight, Award, BookOpen, TrendingUp, CheckCircle2, Flame, BarChart2, PieChart as PieChartIcon, Calendar } from 'lucide-react';
import { HadithItem, NavigationTab } from '../../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  CartesianGrid,
  Legend
} from 'recharts';

interface UserDashboardViewProps {
  savedBookmarks: any[];
  savedHadiths: HadithItem[];
  onRemoveBookmark: (surahNumber: number, ayahNumber: number) => void;
  onRemoveHadith: (id: string) => void;
  onSelectTab: (tab: NavigationTab) => void;
}

// Academy Course Progress Data
const ACADEMY_PROGRESS_DATA = [
  { course: 'Tajweed & Recitation', progress: 85, modulesCompleted: 4, totalModules: 5, quizScore: 92, category: 'Quran' },
  { course: 'Tawhid Aqeedah', progress: 100, modulesCompleted: 3, totalModules: 3, quizScore: 98, category: 'Aqeedah' },
  { course: 'Fiqh of Worship', progress: 60, modulesCompleted: 3, totalModules: 5, quizScore: 85, category: 'Fiqh' },
  { course: 'Seerah Studies', progress: 40, modulesCompleted: 2, totalModules: 5, quizScore: 88, category: 'History' },
  { course: 'Hadith Sciences', progress: 25, modulesCompleted: 1, totalModules: 4, quizScore: 80, category: 'Hadith' },
];

// Quran Daily Reading History (Past 7 Days)
const READING_HISTORY_WEEKLY = [
  { day: 'Mon', ayahsRead: 45, minutesSpent: 25 },
  { day: 'Tue', ayahsRead: 60, minutesSpent: 35 },
  { day: 'Wed', ayahsRead: 30, minutesSpent: 20 },
  { day: 'Thu', ayahsRead: 90, minutesSpent: 50 },
  { day: 'Fri', ayahsRead: 120, minutesSpent: 65 },
  { day: 'Sat', ayahsRead: 75, minutesSpent: 40 },
  { day: 'Sun', ayahsRead: 85, minutesSpent: 45 },
];

// Quran Juz Completion Distribution (30 Juz total)
const JUZ_COMPLETION_DATA = [
  { name: 'Completed Juz', value: 12, color: '#f59e0b' }, // Amber
  { name: 'In Progress', value: 8, color: '#10b981' },   // Emerald
  { name: 'Unread Juz', value: 10, color: '#334155' },   // Slate
];

// Recent Quran Reading Log
const RECENT_READING_LOGS = [
  { surahName: 'Al-Baqarah', surahNumber: 2, lastAyah: 255, progressPct: 88, lastRead: '2 hours ago' },
  { surahName: 'Yasin', surahNumber: 36, lastAyah: 83, progressPct: 100, lastRead: 'Yesterday' },
  { surahName: 'Al-Kahf', surahNumber: 18, lastAyah: 110, progressPct: 100, lastRead: '3 days ago' },
  { surahName: 'Ar-Rahman', surahNumber: 55, lastAyah: 45, progressPct: 58, lastRead: '4 days ago' },
];

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  savedBookmarks,
  savedHadiths,
  onRemoveBookmark,
  onRemoveHadith,
  onSelectTab
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'weekly' | 'monthly'>('weekly');

  const totalCourseProgress = Math.round(
    ACADEMY_PROGRESS_DATA.reduce((acc, c) => acc + c.progress, 0) / ACADEMY_PROGRESS_DATA.length
  );

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-emerald-950/80 backdrop-blur-md text-white p-6 sm:p-8 rounded-3xl border border-emerald-800/40 shadow-2xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3.5 py-1 rounded-full border border-amber-400/30">
          <Bookmark className="w-3.5 h-3.5 text-amber-400" />
          <span>My Personal Bofferly Knowledge Sanctuary</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          User Analytics & Learning Progress
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl leading-relaxed">
          Track your Academy course completions, Quran reading history analytics, saved bookmarks, and daily learning momentum in real-time.
        </p>
      </div>

      {/* KPI Stats Overview Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-emerald-950/40 backdrop-blur-md p-5 rounded-3xl border border-emerald-800/40 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">Academy Completion</span>
            <GraduationCap className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-amber-300 font-mono">{totalCourseProgress}%</p>
          <p className="text-[11px] text-emerald-200/70">5 Enrolled Courses Active</p>
        </div>

        <div className="bg-emerald-950/40 backdrop-blur-md p-5 rounded-3xl border border-emerald-800/40 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">Quran Study</span>
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-amber-300 font-mono">12 / 30</p>
          <p className="text-[11px] text-emerald-200/70">Juz Completed (40%)</p>
        </div>

        <div className="bg-emerald-950/40 backdrop-blur-md p-5 rounded-3xl border border-emerald-800/40 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">Weekly Ayahs</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-amber-300 font-mono">505</p>
          <p className="text-[11px] text-emerald-200/70">Verses Read This Week</p>
        </div>

        <div className="bg-emerald-950/40 backdrop-blur-md p-5 rounded-3xl border border-emerald-800/40 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">Active Streak</span>
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400/20" />
          </div>
          <p className="text-3xl font-black text-amber-300 font-mono">14 Days</p>
          <p className="text-[11px] text-emerald-200/70">Daily Study Streak</p>
        </div>

      </div>

      {/* SECTION 1: ACADEMY COURSE PROGRESS VISUALIZATION (RECHARTS BAR CHART) */}
      <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Academy Course Progress Analytics</h2>
            </div>
            <p className="text-xs text-emerald-200/80">
              Interactive completion percentages across enrolled Islamic courses.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('academy')}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-2xl text-xs flex items-center space-x-1.5 shadow-md transition-all shrink-0"
          >
            <span>Explore All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Recharts Bar Chart Container (7 cols) */}
          <div className="lg:col-span-7 bg-black/40 p-4 sm:p-6 rounded-2xl border border-emerald-800/60 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ACADEMY_PROGRESS_DATA} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#065f46" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#6ee7b7" tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="course" type="category" stroke="#fde68a" width={110} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#022c22', borderColor: '#fbbf24', borderRadius: '12px', color: '#fff' }}
                  formatter={(value: any) => [`${value}% Complete`, 'Progress']}
                />
                <Bar dataKey="progress" radius={[0, 8, 8, 0]}>
                  {ACADEMY_PROGRESS_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.progress === 100 ? '#f59e0b' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrolled Courses Detail Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">Enrolled Course Breakdown</span>
            
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
              {ACADEMY_PROGRESS_DATA.map((course, idx) => (
                <div key={idx} className="bg-black/30 p-3.5 rounded-2xl border border-emerald-800/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{course.course}</span>
                    <span className="font-black text-amber-300 font-mono">{course.progress}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-emerald-950 h-2 rounded-full overflow-hidden border border-emerald-800/60">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.progress === 100 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-emerald-200/70 pt-0.5">
                    <span>Modules: {course.modulesCompleted}/{course.totalModules}</span>
                    <span>Quiz Avg: <strong className="text-amber-300">{course.quizScore}%</strong></span>
                    {course.progress === 100 && (
                      <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-400/30 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-400" /> Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* SECTION 2: QURAN READING HISTORY & JUZ PROGRESS (RECHARTS AREA & PIE CHARTS) */}
      <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Quran Reading History & Juz Progress</h2>
            </div>
            <p className="text-xs text-emerald-200/80">
              Daily reading activity analytics and 30 Juz completion distribution.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('quran')}
            className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold rounded-2xl text-xs border border-emerald-700/60 flex items-center space-x-1.5 transition-all shrink-0"
          >
            <span>Open Quran Reader</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Daily Reading Volume Area Chart (7 cols) */}
          <div className="lg:col-span-7 bg-black/40 p-5 rounded-2xl border border-emerald-800/60 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-amber-400" />
                <span>Daily Quran Recitation Activity (Verses vs Minutes)</span>
              </span>
              <span className="text-[10px] bg-emerald-900/80 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-700">
                Past 7 Days
              </span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={READING_HISTORY_WEEKLY} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAyahs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMins" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#6ee7b7" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#fde68a" tick={{ fontSize: 11 }} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#022c22', borderColor: '#fbbf24', borderRadius: '12px', color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="ayahsRead" name="Ayahs Read" stroke="#f59e0b" fillOpacity={1} fill="url(#colorAyahs)" />
                  <Area type="monotone" dataKey="minutesSpent" name="Minutes Spent" stroke="#10b981" fillOpacity={1} fill="url(#colorMins)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 30 Juz Completion Pie Chart (5 cols) */}
          <div className="lg:col-span-5 bg-black/40 p-5 rounded-2xl border border-emerald-800/60 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                <PieChartIcon className="w-4 h-4 text-amber-400" />
                <span>30 Juz Completion Breakdown</span>
              </span>
            </div>

            <div className="h-48 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={JUZ_COMPLETION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {JUZ_COMPLETION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#022c22', borderColor: '#fbbf24', borderRadius: '12px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Centered Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-lg font-black text-amber-300 font-mono">12 / 30</span>
                <span className="text-[9px] uppercase font-bold text-emerald-300">Juz Completed</span>
              </div>
            </div>

            {/* Legend Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-emerald-800/60 text-center">
              {JUZ_COMPLETION_DATA.map((item, idx) => (
                <div key={idx} className="bg-emerald-950/60 p-2 rounded-xl border border-emerald-800/40 space-y-0.5">
                  <div className="w-2.5 h-2.5 rounded-full mx-auto" style={{ backgroundColor: item.color }} />
                  <p className="text-[10px] text-emerald-200 truncate">{item.name}</p>
                  <p className="font-black text-amber-300">{item.value} Juz</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Recent Reading Log */}
        <div className="space-y-3 pt-2">
          <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">Recent Quran Study Logs</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {RECENT_READING_LOGS.map((log, idx) => (
              <div key={idx} className="bg-black/30 p-4 rounded-2xl border border-emerald-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">Surah {log.surahName}</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md font-bold">
                    #{log.surahNumber}
                  </span>
                </div>
                <p className="text-xs text-emerald-200/80">Stopped at Ayah <strong>{log.lastAyah}</strong></p>
                <div className="flex items-center justify-between text-[10px] text-emerald-300/70 pt-1 border-t border-emerald-800/40">
                  <span>{log.lastRead}</span>
                  <span className="font-bold text-amber-400">{log.progressPct}% Read</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 3: SAVED BOOKMARKS & SAVED HADITHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Saved Quran Bookmarks */}
        <div className="bg-emerald-950/80 backdrop-blur-md p-6 rounded-3xl border border-emerald-800/50 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-400" />
              <span>Saved Quran Bookmarks ({savedBookmarks.length})</span>
            </h3>
            <button onClick={() => onSelectTab('quran')} className="text-xs text-amber-300 font-bold hover:underline flex items-center gap-1">
              <span>Open Quran</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {savedBookmarks.length === 0 ? (
            <div className="text-center py-8 bg-black/20 rounded-2xl border border-emerald-800/30 space-y-2">
              <Bookmark className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-xs text-emerald-300/80">No Quran Ayahs bookmarked yet. Browse the Quran tab to save verses.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
              {savedBookmarks.map((b, idx) => (
                <div key={idx} className="bg-black/30 p-4 rounded-2xl border border-emerald-800/50 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-amber-300">Surah {b.surahName} ({b.surahNumber}:{b.ayahNumber})</span>
                    <button 
                      onClick={() => onRemoveBookmark(b.surahNumber, b.ayahNumber)}
                      className="text-rose-400 hover:text-rose-300 p-1 transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-serif text-lg text-right text-emerald-100 leading-loose">{b.arabic}</p>
                  <p className="text-xs text-emerald-200/90 italic">"{b.english}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Hadiths */}
        <div className="bg-emerald-950/80 backdrop-blur-md p-6 rounded-3xl border border-emerald-800/50 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-400" />
              <span>Saved Hadiths ({savedHadiths.length})</span>
            </h3>
            <button onClick={() => onSelectTab('hadith')} className="text-xs text-amber-300 font-bold hover:underline flex items-center gap-1">
              <span>Open Hadiths</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {savedHadiths.length === 0 ? (
            <div className="text-center py-8 bg-black/20 rounded-2xl border border-emerald-800/30 space-y-2">
              <Heart className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-xs text-emerald-300/80">No Hadiths saved yet. Explore the Hadith library to bookmark your favorite narrations.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
              {savedHadiths.map((h) => (
                <div key={h.id} className="bg-black/30 p-4 rounded-2xl border border-emerald-800/50 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-amber-300">{h.collectionName} #{h.hadithNumber}</span>
                    <button 
                      onClick={() => onRemoveHadith(h.id)}
                      className="text-rose-400 hover:text-rose-300 p-1 transition-colors"
                      title="Remove Hadith"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-emerald-200/90">"{h.englishText}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

