import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Heart, 
  BookOpen, 
  Award, 
  MapPin, 
  RefreshCw, 
  ChevronRight, 
  Utensils, 
  Volume2, 
  Info,
  CheckSquare,
  Square,
  TrendingUp,
  Share2
} from 'lucide-react';

interface CityPrayerPreset {
  name: string;
  country: string;
  suhoor: string; // Fajr
  iftar: string;  // Maghrib
  timezoneOffset: number; // hours relative to UTC
}

const CITY_PRESETS: CityPrayerPreset[] = [
  { name: 'Makkah Al-Mukarramah', country: 'Saudi Arabia', suhoor: '04:48 AM', iftar: '06:42 PM', timezoneOffset: 3 },
  { name: 'Madinah Al-Munawwarah', country: 'Saudi Arabia', suhoor: '04:45 AM', iftar: '06:44 PM', timezoneOffset: 3 },
  { name: 'London', country: 'United Kingdom', suhoor: '03:45 AM', iftar: '08:25 PM', timezoneOffset: 1 },
  { name: 'New York', country: 'United States', suhoor: '04:20 AM', iftar: '07:55 PM', timezoneOffset: -4 },
  { name: 'Dubai', country: 'United Arab Emirates', suhoor: '04:30 AM', iftar: '06:40 PM', timezoneOffset: 4 },
  { name: 'Istanbul', country: 'Turkey', suhoor: '04:15 AM', iftar: '07:35 PM', timezoneOffset: 3 },
  { name: 'Kuala Lumpur', country: 'Malaysia', suhoor: '05:35 AM', iftar: '07:22 PM', timezoneOffset: 8 },
  { name: 'Toronto', country: 'Canada', suhoor: '04:15 AM', iftar: '08:10 PM', timezoneOffset: -4 },
  { name: 'Cairo', country: 'Egypt', suhoor: '04:05 AM', iftar: '06:45 PM', timezoneOffset: 3 },
  { name: 'Karachi', country: 'Pakistan', suhoor: '04:35 AM', iftar: '07:15 PM', timezoneOffset: 5 },
];

export interface FastingDayRecord {
  dayNumber: number;
  status: 'completed' | 'missed' | 'pending';
  prayersCompleted: boolean;
  taraweehCompleted: boolean;
  quranJuzRead: boolean;
  charityGiven: boolean;
  notes?: string;
}

export const RamadanView: React.FC = () => {
  // Selected City for Iftar/Suhoor
  const [selectedCity, setSelectedCity] = useState<CityPrayerPreset>(CITY_PRESETS[0]);
  
  // Ramadan Target Date Countdown (Next Ramadan approx Feb 8, 2027)
  const targetRamadanDate = new Date('2027-02-08T00:00:00');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Active Fasting Progress State
  const [activeTab, setActiveTab] = useState<'countdown' | 'tracker' | 'duas' | 'khatam'>('countdown');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  // 30 Days Fasting Tracker State
  const [fastingLogs, setFastingLogs] = useState<FastingDayRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bofferly_ramadan_fasting_tracker');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial 30 days
    return Array.from({ length: 30 }, (_, i) => ({
      dayNumber: i + 1,
      status: i < 5 ? 'completed' : 'pending',
      prayersCompleted: i < 5,
      taraweehCompleted: i < 4,
      quranJuzRead: i < 5,
      charityGiven: i < 3,
    }));
  });

  // Save Fasting Logs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bofferly_ramadan_fasting_tracker', JSON.stringify(fastingLogs));
    } catch (e) {
      console.error(e);
    }
  }, [fastingLogs]);

  // Real-time Countdown Timer Effect
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetRamadanDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handler to update day records in tracker
  const handleToggleGoal = (dayIdx: number, field: keyof FastingDayRecord) => {
    const updated = [...fastingLogs];
    const day = { ...updated[dayIdx] };

    if (field === 'status') {
      const nextStatusMap: Record<'completed' | 'missed' | 'pending', 'completed' | 'missed' | 'pending'> = {
        pending: 'completed',
        completed: 'missed',
        missed: 'pending',
      };
      day.status = nextStatusMap[day.status];
    } else if (typeof day[field] === 'boolean') {
      (day[field] as boolean) = !(day[field] as boolean);
    }

    updated[dayIdx] = day;
    setFastingLogs(updated);
  };

  // Derived Statistics
  const totalFastedDays = fastingLogs.filter(d => d.status === 'completed').length;
  const totalMissedDays = fastingLogs.filter(d => d.status === 'missed').length;
  const totalTaraweehCount = fastingLogs.filter(d => d.taraweehCompleted).length;
  const totalJuzReadCount = fastingLogs.filter(d => d.quranJuzRead).length;
  const completionPercentage = Math.round((totalFastedDays / 30) * 100);

  return (
    <div className="space-y-8 font-sans">
      
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-10 rounded-3xl border border-amber-400/30 shadow-2xl space-y-4">
        
        {/* Background Crescent Glow Decorative Motif */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3.5 py-1.5 rounded-full border border-amber-400/40 font-bold">
              <Moon className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Ramadan Hub • Hijri 1448 AH Sanctuary</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
              The Blessed Month Portal
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              Track your daily fasting, view live Suhoor & Iftar timings, log your Quran Khatam progress, and count down to the arrival of Ramadan.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-emerald-800/80 flex items-center space-x-4 shrink-0">
            <div className="w-12 h-12 bg-amber-400/20 rounded-2xl border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Fast Completion</p>
              <p className="text-xl font-black text-amber-300 font-mono">{totalFastedDays} / 30 Days ({completionPercentage}%)</p>
            </div>
          </div>
        </div>

        {/* Tab Selector Bar */}
        <div className="pt-4 border-t border-emerald-800/60 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('countdown')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'countdown'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-black/30 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Countdown & Timings</span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'tracker'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-black/30 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>30-Day Fasting Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('duas')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'duas'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-black/30 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Suhoor & Iftar Duas</span>
          </button>

          <button
            onClick={() => setActiveTab('khatam')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'khatam'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-black/30 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Quran Khatam Planner</span>
          </button>
        </div>

      </div>

      {/* SECTION 1: COUNTDOWN TIMER & DYNAMIC IFTAR/SUHOOR TIMES */}
      {activeTab === 'countdown' && (
        <div className="space-y-8">
          
          {/* 1. Ramadan Countdown Clock Display */}
          <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-6">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                Countdown to Next Ramadan
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Preparing Hearts for Ramadan 1448 AH
              </h2>
              <p className="text-xs text-emerald-200/80">
                "O Allah, allow us to reach Ramadan in good health and faith." (Allaahumma ballighnaa Ramadaan)
              </p>
            </div>

            {/* Live Clock Digits */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
              <div className="bg-black/40 p-5 rounded-3xl border-2 border-amber-400/40 space-y-1 shadow-lg">
                <p className="text-4xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight">{timeLeft.days}</p>
                <p className="text-xs uppercase font-extrabold text-emerald-300">Days</p>
              </div>

              <div className="bg-black/40 p-5 rounded-3xl border-2 border-amber-400/40 space-y-1 shadow-lg">
                <p className="text-4xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight">{timeLeft.hours}</p>
                <p className="text-xs uppercase font-extrabold text-emerald-300">Hours</p>
              </div>

              <div className="bg-black/40 p-5 rounded-3xl border-2 border-amber-400/40 space-y-1 shadow-lg">
                <p className="text-4xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight">{timeLeft.minutes}</p>
                <p className="text-xs uppercase font-extrabold text-emerald-300">Minutes</p>
              </div>

              <div className="bg-black/40 p-5 rounded-3xl border-2 border-amber-400/40 space-y-1 shadow-lg">
                <p className="text-4xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight">{timeLeft.seconds}</p>
                <p className="text-xs uppercase font-extrabold text-emerald-300">Seconds</p>
              </div>
            </div>
          </div>

          {/* 2. Dynamic Suhoor & Iftar Times Display */}
          <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Utensils className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-extrabold text-white">Daily Suhoor & Iftar Schedule</h3>
                </div>
                <p className="text-xs text-emerald-200/80">
                  Select your city to view exact Suhoor (Fajr) and Iftar (Maghrib) timing predictions.
                </p>
              </div>

              {/* City Preset Selector */}
              <div className="flex items-center space-x-2 shrink-0">
                <MapPin className="w-4 h-4 text-amber-400" />
                <select
                  value={selectedCity.name}
                  onChange={(e) => {
                    const preset = CITY_PRESETS.find(c => c.name === e.target.value);
                    if (preset) setSelectedCity(preset);
                  }}
                  className="bg-black/50 text-amber-300 border border-emerald-800/80 font-bold rounded-2xl text-xs px-3.5 py-2 focus:outline-none cursor-pointer"
                >
                  {CITY_PRESETS.map((city, idx) => (
                    <option key={idx} value={city.name} className="bg-emerald-950 text-white">
                      {city.name} ({city.country})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Two Side-by-Side Timing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Suhoor (Fajr) Card */}
              <div className="bg-gradient-to-br from-indigo-950 to-emerald-950 p-6 rounded-3xl border border-indigo-800/50 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold text-indigo-300 tracking-wider flex items-center gap-1.5">
                    <Moon className="w-4 h-4 text-indigo-400" /> Suhoor End (Fajr)
                  </span>
                  <span className="text-[10px] bg-indigo-900/60 text-indigo-200 px-2.5 py-0.5 rounded-full border border-indigo-700">
                    Pre-Dawn Fast Begins
                  </span>
                </div>

                <div className="text-center py-4 bg-black/40 rounded-2xl border border-indigo-900/60">
                  <p className="text-4xl sm:text-5xl font-black text-indigo-200 font-mono tracking-tight">
                    {selectedCity.suhoor}
                  </p>
                  <p className="text-xs text-indigo-300/80 mt-1">Stop eating & make Intention before this time</p>
                </div>

                <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-800/40 text-xs text-indigo-200 space-y-1">
                  <p className="font-bold text-indigo-300">Suhoor Niyyah (Intention):</p>
                  <p className="italic text-[11px] text-indigo-100">
                    "Wa bisawmi ghadinn nawaitu min shahri ramadan"
                  </p>
                  <p className="text-[10px] text-indigo-300/70">
                    (I intend to keep the fast tomorrow for the month of Ramadan)
                  </p>
                </div>
              </div>

              {/* Iftar (Maghrib) Card */}
              <div className="bg-gradient-to-br from-amber-950 to-emerald-950 p-6 rounded-3xl border border-amber-500/40 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-amber-400" /> Iftar Time (Maghrib)
                  </span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    Sunset Fast Breaks
                  </span>
                </div>

                <div className="text-center py-4 bg-black/40 rounded-2xl border border-amber-500/40">
                  <p className="text-4xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight">
                    {selectedCity.iftar}
                  </p>
                  <p className="text-xs text-amber-200/80 mt-1">Hasten Iftar upon hearing the Maghrib Adhan</p>
                </div>

                <div className="bg-amber-950/60 p-3 rounded-xl border border-amber-500/30 text-xs text-amber-200 space-y-1">
                  <p className="font-bold text-amber-300">Prophetic Iftar Supplication:</p>
                  <p className="italic text-[11px] text-amber-100">
                    "Dhahaba al-dhama'u wa ibtallat al-'urooq wa thabata al-ajru in sha' Allah"
                  </p>
                  <p className="text-[10px] text-amber-300/70">
                    (The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills)
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* SECTION 2: 30-DAY FASTING TRACKER */}
      {activeTab === 'tracker' && (
        <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-extrabold text-white">30-Day Fasting & Worship Tracker</h2>
              </div>
              <p className="text-xs text-emerald-200/80">
                Log your daily fasts, 5 prayers, Taraweeh, Quran recitation, and charity for each day of Ramadan.
              </p>
            </div>

            {/* Tracker Summary Badges */}
            <div className="flex items-center space-x-2 text-xs font-bold shrink-0">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full">
                {totalFastedDays} Fasted
              </span>
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full">
                {totalMissedDays} Missed
              </span>
            </div>
          </div>

          {/* 30-Day Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-6 gap-3">
            {fastingLogs.map((log, idx) => {
              const isSelected = selectedDayIndex === idx;

              let statusColor = 'bg-black/30 border-emerald-800/60 text-emerald-300';
              if (log.status === 'completed') {
                statusColor = 'bg-emerald-900/60 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/40';
              } else if (log.status === 'missed') {
                statusColor = 'bg-rose-950/60 border-rose-600 text-rose-200';
              }

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${statusColor} ${
                    isSelected ? 'ring-2 ring-amber-400 border-amber-400 bg-emerald-900/80' : 'hover:border-amber-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-amber-300">Day {log.dayNumber}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleGoal(idx, 'status');
                      }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-black/40 hover:bg-black/60 transition-colors"
                    >
                      {log.status === 'completed' ? '✅ Fasted' : log.status === 'missed' ? '❌ Missed' : '⏳ Pending'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1 text-[10px] text-emerald-200/80 pt-1 border-t border-emerald-800/40">
                    <span className={log.prayersCompleted ? 'text-amber-300 font-bold' : 'opacity-40'}>🕌 5 Prayers</span>
                    <span className={log.taraweehCompleted ? 'text-amber-300 font-bold' : 'opacity-40'}>🌙 Taraweeh</span>
                    <span className={log.quranJuzRead ? 'text-amber-300 font-bold' : 'opacity-40'}>📖 Quran</span>
                    <span className={log.charityGiven ? 'text-amber-300 font-bold' : 'opacity-40'}>🤲 Charity</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Day Inspector Panel */}
          {fastingLogs[selectedDayIndex] && (
            <div className="bg-black/40 p-5 sm:p-6 rounded-3xl border-2 border-amber-400/50 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-amber-400" />
                  <span>Day {fastingLogs[selectedDayIndex].dayNumber} Worship Details</span>
                </h3>

                <button
                  onClick={() => handleToggleGoal(selectedDayIndex, 'status')}
                  className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs transition-all"
                >
                  Toggle Fasting Status: {fastingLogs[selectedDayIndex].status.toUpperCase()}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                
                <button
                  onClick={() => handleToggleGoal(selectedDayIndex, 'prayersCompleted')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                    fastingLogs[selectedDayIndex].prayersCompleted
                      ? 'bg-emerald-900/80 border-emerald-400 text-white font-bold'
                      : 'bg-black/30 border-emerald-800 text-emerald-300 opacity-60'
                  }`}
                >
                  <span>5 Daily Prayers</span>
                  {fastingLogs[selectedDayIndex].prayersCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleToggleGoal(selectedDayIndex, 'taraweehCompleted')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                    fastingLogs[selectedDayIndex].taraweehCompleted
                      ? 'bg-emerald-900/80 border-emerald-400 text-white font-bold'
                      : 'bg-black/30 border-emerald-800 text-emerald-300 opacity-60'
                  }`}
                >
                  <span>Taraweeh Prayer</span>
                  {fastingLogs[selectedDayIndex].taraweehCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleToggleGoal(selectedDayIndex, 'quranJuzRead')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                    fastingLogs[selectedDayIndex].quranJuzRead
                      ? 'bg-emerald-900/80 border-emerald-400 text-white font-bold'
                      : 'bg-black/30 border-emerald-800 text-emerald-300 opacity-60'
                  }`}
                >
                  <span>Daily Quran Juz</span>
                  {fastingLogs[selectedDayIndex].quranJuzRead ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleToggleGoal(selectedDayIndex, 'charityGiven')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                    fastingLogs[selectedDayIndex].charityGiven
                      ? 'bg-emerald-900/80 border-emerald-400 text-white font-bold'
                      : 'bg-black/30 border-emerald-800 text-emerald-300 opacity-60'
                  }`}
                >
                  <span>Sadqah / Charity</span>
                  {fastingLogs[selectedDayIndex].charityGiven ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
                </button>

              </div>
            </div>
          )}

        </div>
      )}

      {/* SECTION 3: RAMADAN DUAS & VIRTUES */}
      {activeTab === 'duas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-emerald-950/80 backdrop-blur-md p-6 rounded-3xl border border-emerald-800/50 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 border-b border-emerald-800/60 pb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-extrabold text-white text-base">Dua for Breaking Fast (Iftar)</h3>
            </div>

            <div className="space-y-3 bg-black/30 p-4 rounded-2xl border border-emerald-800/40">
              <p className="font-serif text-xl text-right text-emerald-100 leading-loose">
                ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ
              </p>
              <p className="text-xs text-amber-300 font-semibold italic">
                Dhahaba al-dhama'u wa ibtallat al-'urooq wa thabata al-ajru in sha' Allah
              </p>
              <p className="text-xs text-emerald-200/90">
                "The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills." [Abu Dawood]
              </p>
            </div>
          </div>

          <div className="bg-emerald-950/80 backdrop-blur-md p-6 rounded-3xl border border-emerald-800/50 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 border-b border-emerald-800/60 pb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-extrabold text-white text-base">Dua for Laylat al-Qadr (Night of Power)</h3>
            </div>

            <div className="space-y-3 bg-black/30 p-4 rounded-2xl border border-emerald-800/40">
              <p className="font-serif text-xl text-right text-emerald-100 leading-loose">
                اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي
              </p>
              <p className="text-xs text-amber-300 font-semibold italic">
                Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni
              </p>
              <p className="text-xs text-emerald-200/90">
                "O Allah, You are Most Forgiving, and You love forgiveness, so forgive me." [Tirmidhi]
              </p>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 4: QURAN KHATAM PLANNER */}
      {activeTab === 'khatam' && (
        <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-6">
          <div className="border-b border-emerald-800/60 pb-4 space-y-1">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-extrabold text-white">30-Day Quran Khatam Schedule</h2>
            </div>
            <p className="text-xs text-emerald-200/80">
              The Quran has 604 pages (~20 pages per Juz). Read 4 pages after each of the 5 daily prayers to finish 1 complete Quran in Ramadan!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
            {['Fajr Prayer', 'Dhuhr Prayer', 'Asr Prayer', 'Maghrib Prayer', 'Isha Prayer'].map((prayer, i) => (
              <div key={i} className="bg-black/30 p-4 rounded-2xl border border-emerald-800/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-300">Step {i + 1}</span>
                <p className="font-bold text-white text-xs">{prayer}</p>
                <p className="text-2xl font-black text-amber-300 font-mono">4 Pages</p>
                <p className="text-[10px] text-emerald-300/70">~8 Minutes</p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/50 flex items-center justify-between text-xs text-emerald-200">
            <span>Result: <strong>20 Pages / Day = 1 Complete Juz / Day = Complete Khatam in 30 Days!</strong></span>
            <span className="text-amber-300 font-bold">Total Juz Read in Ramadan: {totalJuzReadCount} / 30</span>
          </div>
        </div>
      )}

    </div>
  );
};
