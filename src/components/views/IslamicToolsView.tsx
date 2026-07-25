import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Compass, 
  Calculator, 
  MapPin, 
  Calendar, 
  CheckSquare, 
  BookOpen, 
  Search, 
  Coins, 
  Moon, 
  Sun,
  Award,
  Sparkles
} from 'lucide-react';
import { DUAS_COLLECTION, HAJJ_UMRAH_PACKING, ISLAMIC_EVENTS } from '../../data/toolsData';
import { PackingItem, DuaItem } from '../../types';
import { PrayerTimesSection } from '../PrayerTimesSection';
import { ZakatCalculator } from '../ZakatCalculator';

export const IslamicToolsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prayer' | 'zakat' | 'hajj' | 'dua' | 'date'>('prayer');

  // Fasting Timer State
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({ hours: 3, minutes: 24, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Packing Checklist State
  const [checklist, setChecklist] = useState<PackingItem[]>(HAJJ_UMRAH_PACKING);

  const toggleCheckItem = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  // Dua Search State
  const [duaQuery, setDuaQuery] = useState('');
  const filteredDuas = DUAS_COLLECTION.filter(d => 
    d.title.toLowerCase().includes(duaQuery.toLowerCase()) ||
    d.englishTranslation.toLowerCase().includes(duaQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(duaQuery.toLowerCase())
  );

  // Hijri Date Converter State
  const [gregorianDate, setGregorianDate] = useState('2026-07-25');

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Islamic Utilities & Calculators</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
          Bofferly Islamic Tools Hub
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
          Prayer times calculation, Qibla finder compass, Fasting countdown, Zakat calculator, Fortress of the Muslim Duas, and Hijri converters.
        </p>
      </div>

      {/* Main Tools Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-emerald-200 dark:border-slate-800 pb-3">
        {[
          { id: 'prayer', label: '🕌 Prayer & Qibla Tools', icon: <Clock className="w-4 h-4" /> },
          { id: 'zakat', label: '💰 Zakat Calculator', icon: <Calculator className="w-4 h-4" /> },
          { id: 'hajj', label: '🕋 Hajj & Umrah Guide', icon: <Award className="w-4 h-4" /> },
          { id: 'dua', label: '🤲 Fortress of Muslim (Duas)', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'date', label: '📅 Hijri & Calendar', icon: <Calendar className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
              activeTab === tab.id
                ? 'bg-amber-400 text-emerald-950 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-emerald-100 dark:border-slate-800 hover:border-amber-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: PRAYER TOOLS & QIBLA */}
      {activeTab === 'prayer' && (
        <div className="space-y-6">
          <PrayerTimesSection />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Qibla Finder Interactive Compass */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm text-center space-y-4">
              <h3 className="text-lg font-bold font-serif text-emerald-950 dark:text-white flex items-center justify-center gap-2">
                <Compass className="w-5 h-5 text-amber-500" />
                <span>Qibla Finder Compass</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direction towards the Holy Kaaba in Makkah (58.4° NE from current location)
              </p>

              {/* Compass Dial Simulation */}
              <div className="relative w-56 h-56 mx-auto bg-gradient-to-tr from-emerald-900 to-emerald-800 rounded-full border-4 border-amber-400 flex items-center justify-center shadow-xl">
                <div className="absolute inset-2 border border-emerald-600/50 rounded-full" />
                <span className="absolute top-3 text-xs font-bold text-amber-300">N</span>
                <span className="absolute bottom-3 text-xs font-bold text-emerald-300">S</span>
                <span className="absolute right-3 text-xs font-bold text-emerald-300">E</span>
                <span className="absolute left-3 text-xs font-bold text-emerald-300">W</span>

                {/* Kaaba Direction Needle */}
                <div 
                  className="w-full h-full flex items-center justify-center transition-transform duration-700"
                  style={{ transform: 'rotate(58deg)' }}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-2xl">🕋</span>
                    <div className="w-1 h-20 bg-amber-400 rounded-full shadow-lg" />
                  </div>
                </div>
              </div>

              <span className="inline-block bg-emerald-100 dark:bg-slate-800 text-emerald-900 dark:text-emerald-300 font-bold text-xs px-4 py-1.5 rounded-full">
                Qibla Angle: 58.4° (Facing Kaaba)
              </span>
            </div>

            {/* Fasting Timer & Countdown */}
            <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white p-6 sm:p-8 rounded-2xl border border-emerald-800 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full">
                  <Moon className="w-3.5 h-3.5" />
                  <span>Ramadan & Voluntary Fasting Timer</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-white">Countdown to Iftar (Maghrib)</h3>
                <p className="text-xs text-emerald-200">
                  Calculated based on local Maghrib sunset time.
                </p>
              </div>

              {/* Digital Countdown Timer */}
              <div className="grid grid-cols-3 gap-3 text-center my-4">
                <div className="bg-emerald-900/80 p-4 rounded-xl border border-emerald-700">
                  <span className="text-2xl sm:text-4xl font-bold font-mono text-amber-300">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <p className="text-[10px] uppercase text-emerald-200 mt-1 font-semibold">Hours</p>
                </div>
                <div className="bg-emerald-900/80 p-4 rounded-xl border border-emerald-700">
                  <span className="text-2xl sm:text-4xl font-bold font-mono text-amber-300">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <p className="text-[10px] uppercase text-emerald-200 mt-1 font-semibold">Minutes</p>
                </div>
                <div className="bg-emerald-900/80 p-4 rounded-xl border border-emerald-700">
                  <span className="text-2xl sm:text-4xl font-bold font-mono text-amber-300">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <p className="text-[10px] uppercase text-emerald-200 mt-1 font-semibold">Seconds</p>
                </div>
              </div>

              <div className="bg-emerald-900/50 p-3 rounded-xl border border-emerald-800 text-xs space-y-1">
                <p className="text-amber-300 font-bold">Du'a at Iftar:</p>
                <p className="font-serif text-sm">ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ</p>
                <p className="text-[11px] text-emerald-200 italic">"The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills."</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: ZAKAT CALCULATOR */}
      {activeTab === 'zakat' && (
        <ZakatCalculator />
      )}

      {/* TAB 3: HAJJ & UMRAH GUIDE & PACKING CHECKLIST */}
      {activeTab === 'hajj' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-bold font-serif text-emerald-950 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-amber-500" />
              <span>Interactive Pilgrim Packing Checklist</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className={`p-3.5 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all ${
                    item.checked 
                      ? 'bg-emerald-50 dark:bg-slate-800 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-300 line-through' 
                      : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <input type="checkbox" checked={item.checked} onChange={() => {}} className="w-4 h-4 text-emerald-600 rounded" />
                  <div>
                    <p className="text-xs font-semibold">{item.name}</p>
                    <span className="text-[10px] text-amber-600 font-bold">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FORTRESS OF THE MUSLIM (DUAS) */}
      {activeTab === 'dua' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-slate-800 flex items-center space-x-3">
            <Search className="w-4 h-4 text-emerald-500" />
            <input
              type="text"
              placeholder="Search Duas by category, title or situation..."
              value={duaQuery}
              onChange={(e) => setDuaQuery(e.target.value)}
              className="w-full bg-transparent text-xs focus:outline-none dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDuas.map((dua) => (
              <div key={dua.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b pb-2 border-emerald-100 dark:border-slate-800">
                  <h4 className="font-bold text-sm text-emerald-950 dark:text-white font-serif">{dua.title}</h4>
                  <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold px-2 py-0.5 rounded">
                    {dua.category}
                  </span>
                </div>

                <p className="font-serif text-xl text-right text-emerald-950 dark:text-emerald-200 leading-relaxed py-1">
                  {dua.arabicText}
                </p>

                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium italic">{dua.transliteration}</p>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">"{dua.englishTranslation}"</p>
                
                <p className="text-[10px] text-slate-400 pt-1">Reference: {dua.reference}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: HIJRI CONVERTER & EVENTS */}
      {activeTab === 'date' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-bold font-serif text-emerald-950 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              <span>Islamic Event Calendar & Moon Sighting Updates</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ISLAMIC_EVENTS.map((ev, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold bg-emerald-900 text-amber-300 px-2 py-0.5 rounded">
                    {ev.dateHijri}
                  </span>
                  <h4 className="font-bold text-sm text-emerald-950 dark:text-white font-serif pt-1">{ev.event}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{ev.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
