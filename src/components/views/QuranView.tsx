import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Volume2, 
  Bookmark, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Play, 
  Pause, 
  Layers, 
  FileText, 
  Globe,
  Loader2,
  RefreshCw,
  X,
  Maximize2,
  Filter,
  ArrowRight
} from 'lucide-react';
import { ALL_SURAHS_CATALOG, DETAILED_SURAHS, RECITERS } from '../../data/quranData';
import { Surah, Ayah, AudioReciter } from '../../types';

interface QuranViewProps {
  onBookmarkAyah: (surahNumber: number, surahName: string, ayahNumber: number, arabic: string, english: string) => void;
  savedBookmarks: any[];
}

const ITEMS_PER_PAGE = 25;

export const QuranView: React.FC<QuranViewProps> = ({ onBookmarkAyah, savedBookmarks }) => {
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [revelationFilter, setRevelationFilter] = useState<'all' | 'Meccan' | 'Medinan'>('all');
  
  // Translation & Audio controls
  const [translationLanguage, setTranslationLanguage] = useState<'english' | 'urdu' | 'both'>('english');
  const [showWordByWord, setShowWordByWord] = useState(true);
  const [activeReciter, setActiveReciter] = useState<AudioReciter>(RECITERS[0]);
  const [playingAyahUrl, setPlayingAyahUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  // Surah Cache & Dynamic Loading
  const [surahsCache, setSurahsCache] = useState<Record<number, Surah>>(DETAILED_SURAHS);
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Pagination for long Surahs inside popup
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAllVerses, setShowAllVerses] = useState<boolean>(false);

  // Tafsir Modal State
  const [selectedAyahTafsir, setSelectedAyahTafsir] = useState<Ayah | null>(null);
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const [tafsirText, setTafsirText] = useState<string>('');

  const catalogMeta = ALL_SURAHS_CATALOG.find(s => s.number === selectedSurahNumber) || ALL_SURAHS_CATALOG[0];

  // Keyboard shortcut listener to close popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPopupOpen) {
        setIsPopupOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPopupOpen]);

  // Fetch full Surah if not in cache
  useEffect(() => {
    setCurrentPage(1);
    setLoadError(null);

    if (surahsCache[selectedSurahNumber] && surahsCache[selectedSurahNumber].ayahs?.length) {
      return;
    }

    let isMounted = true;
    const fetchSurahData = async () => {
      setIsLoadingSurah(true);
      try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurahNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry`);
        if (!res.ok) throw new Error('Failed to load Surah data');
        const json = await res.json();

        if (json.code === 200 && json.data && json.data.length >= 3) {
          const arabicData = json.data[0];
          const englishData = json.data[1];
          const urduData = json.data[2];

          const ayahs: Ayah[] = arabicData.ayahs.map((a: any, idx: number) => {
            const surahPadded = String(selectedSurahNumber).padStart(3, '0');
            const ayahPadded = String(a.numberInSurah).padStart(3, '0');
            const reciterCode = activeReciter.id || 'ar.alafasy';

            return {
              number: a.number,
              numberInSurah: a.numberInSurah,
              juz: a.juz,
              arabicText: a.text,
              transliteration: `Ayah ${a.numberInSurah}`,
              englishTranslation: englishData?.ayahs[idx]?.text || '',
              urduTranslation: urduData?.ayahs[idx]?.text || '',
              audioUrl: `https://cdn.islamicfinder.org/quran/audio/128/${reciterCode}/${surahPadded}${ayahPadded}.mp3`,
              words: a.text.split(' ').map((w: string) => ({
                arabic: w,
                transliteration: '',
                translation: ''
              }))
            };
          });

          const loadedSurah: Surah = {
            number: catalogMeta.number,
            nameArabic: catalogMeta.nameArabic,
            nameTransliterated: catalogMeta.nameTransliterated,
            nameEnglish: catalogMeta.nameEnglish,
            versesCount: catalogMeta.versesCount,
            revelationType: catalogMeta.revelationType,
            juzStart: catalogMeta.juzStart,
            ayahs
          };

          if (isMounted) {
            setSurahsCache(prev => ({ ...prev, [selectedSurahNumber]: loadedSurah }));
          }
        } else {
          throw new Error('Invalid Quran API response');
        }
      } catch (err: any) {
        if (isMounted) {
          setLoadError('Unable to load verses right now. Please check internet connection.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingSurah(false);
        }
      }
    };

    fetchSurahData();

    return () => {
      isMounted = false;
    };
  }, [selectedSurahNumber]);

  const currentSurah: Surah = surahsCache[selectedSurahNumber] || {
    ...catalogMeta,
    ayahs: []
  };

  const totalVerses = currentSurah.ayahs?.length || 0;
  const totalPages = Math.ceil(totalVerses / ITEMS_PER_PAGE) || 1;

  const displayedAyahs = showAllVerses
    ? currentSurah.ayahs || []
    : (currentSurah.ayahs || []).slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const filteredSurahs = ALL_SURAHS_CATALOG.filter(s => {
    const matchesSearch = 
      s.nameTransliterated.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString() === searchQuery.trim();

    const matchesRevelation = 
      revelationFilter === 'all' || s.revelationType === revelationFilter;

    return matchesSearch && matchesRevelation;
  });

  const handleOpenSurahPopup = (surahNumber: number) => {
    setSelectedSurahNumber(surahNumber);
    setIsPopupOpen(true);
  };

  const handlePlayAudio = (url?: string) => {
    if (!url) return;
    if (audioObj) {
      audioObj.pause();
    }

    if (playingAyahUrl === url && isPlaying) {
      setIsPlaying(false);
      setPlayingAyahUrl(null);
      return;
    }

    const newAudio = new Audio(url);
    newAudio.play();
    setAudioObj(newAudio);
    setPlayingAyahUrl(url);
    setIsPlaying(true);

    newAudio.onended = () => {
      setIsPlaying(false);
      setPlayingAyahUrl(null);
    };
  };

  const handleFetchTafsir = async (ayah: Ayah) => {
    setSelectedAyahTafsir(ayah);
    setTafsirLoading(true);
    setTafsirText('');

    try {
      const res = await fetch('/api/quran/tafsir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surahName: currentSurah.nameTransliterated,
          surahNumber: currentSurah.number,
          ayahNumber: ayah.numberInSurah,
          ayahText: ayah.arabicText
        })
      });
      const data = await res.json();
      setTafsirText(data.tafsir || ayah.tafsirSummary || "Tafsir unavailable.");
    } catch (err) {
      setTafsirText(ayah.tafsirSummary || "Tafsir unavailable.");
    } finally {
      setTafsirLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Quran Main Hero Header */}
      <div className="bg-emerald-950/80 backdrop-blur-md text-white p-6 sm:p-8 rounded-3xl border border-emerald-800/40 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-400/10 text-amber-300 text-xs px-3.5 py-1 rounded-full border border-amber-400/30">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Al-Quran Al-Kareem (القرآن الكريم) — Complete 114 Surahs</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-white tracking-tight">
              Interactive Quran Index & Popup Reader
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl leading-relaxed">
              Click on any Surah name to open the complete Surah in a popup window with Uthmani script, audio recitations, English & Urdu translations, word breakdown, and AI Tafsir.
            </p>
          </div>

          <button
            onClick={() => handleOpenSurahPopup(selectedSurahNumber)}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-2xl text-xs sm:text-sm flex items-center space-x-2 shadow-lg transition-all shrink-0 active:scale-95"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Open Current Surah ({catalogMeta.nameTransliterated}) in Popup</span>
          </button>
        </div>

        {/* Search & Revelation Filter Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Surah by name or number (1-114)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-emerald-800/60 text-xs rounded-2xl focus:outline-none focus:border-amber-400 text-white placeholder-emerald-400/60"
            />
          </div>

          <div className="flex items-center space-x-1.5 bg-black/40 p-1 border border-emerald-800/60 rounded-2xl text-xs shrink-0">
            <Filter className="w-3.5 h-3.5 text-amber-400 ml-2" />
            {(['all', 'Meccan', 'Medinan'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setRevelationFilter(type)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold capitalize transition-all ${
                  revelationFilter === type
                    ? 'bg-amber-400 text-emerald-950 shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog Grid of All 114 Surahs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-emerald-200/90 px-2">
          <span>Showing <strong>{filteredSurahs.length}</strong> Surahs</span>
          <span className="text-amber-400 font-semibold">Click any Surah name to open in Popup mode</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSurahs.map((surah) => (
            <div
              key={surah.number}
              onClick={() => handleOpenSurahPopup(surah.number)}
              className="bg-emerald-950/40 backdrop-blur-md p-4 rounded-3xl border border-emerald-800/30 hover:border-amber-400/70 hover:bg-emerald-900/40 transition-all cursor-pointer shadow-lg group flex items-center justify-between gap-3"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-emerald-900/80 text-amber-300 font-extrabold text-xs flex items-center justify-center shrink-0 border border-emerald-700/50 group-hover:bg-amber-400 group-hover:text-emerald-950 transition-colors">
                  {surah.number}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors truncate">
                    {surah.nameTransliterated}
                  </h3>
                  <p className="text-[11px] text-emerald-300/80 truncate">{surah.nameEnglish}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-700/40">
                      {surah.versesCount} Ayahs
                    </span>
                    <span className="text-[9px] bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                      {surah.revelationType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 flex flex-col items-end justify-between space-y-2">
                <span className="font-serif text-lg text-amber-300 leading-none">{surah.nameArabic}</span>
                <span className="text-[10px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  <span>Popup</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* QURAN SURAH POPUP MODAL */}
      {/* ========================================================================= */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
          
          {/* Main Popup Window */}
          <div className="bg-[#021812] text-white w-full max-w-5xl h-[94vh] rounded-3xl border border-emerald-700/60 shadow-2xl flex flex-col overflow-hidden relative">
            
            {/* 1. Sticky Popup Header */}
            <div className="bg-emerald-950 p-4 sm:p-5 border-b border-emerald-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
              
              {/* Left: Surah Title & Switcher */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  disabled={selectedSurahNumber <= 1}
                  onClick={() => setSelectedSurahNumber(prev => Math.max(1, prev - 1))}
                  className="p-2 rounded-xl bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800 disabled:opacity-40 border border-emerald-700/50"
                  title="Previous Surah"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-400 text-emerald-950 text-xs font-black px-2.5 py-0.5 rounded-full">
                      Surah {catalogMeta.number}
                    </span>
                    <h2 className="font-bold text-sm sm:text-lg font-sans text-white truncate">
                      {catalogMeta.nameTransliterated} <span className="font-serif text-amber-300">({catalogMeta.nameArabic})</span>
                    </h2>
                  </div>
                  <p className="text-[10px] sm:text-xs text-emerald-200/80 truncate">
                    {catalogMeta.nameEnglish} • {catalogMeta.versesCount} Verses • {catalogMeta.revelationType} • Juz {catalogMeta.juzStart}
                  </p>
                </div>

                <button
                  disabled={selectedSurahNumber >= 114}
                  onClick={() => setSelectedSurahNumber(prev => Math.min(114, prev + 1))}
                  className="p-2 rounded-xl bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800 disabled:opacity-40 border border-emerald-700/50"
                  title="Next Surah"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right: Controls & Close Popup Button */}
              <div className="flex items-center flex-wrap gap-2">
                
                {/* Quick Surah Selector Dropdown */}
                <select
                  value={selectedSurahNumber}
                  onChange={(e) => setSelectedSurahNumber(Number(e.target.value))}
                  className="bg-black/40 text-xs text-emerald-200 border border-emerald-800/80 rounded-xl px-2.5 py-1.5 font-medium focus:outline-none cursor-pointer max-w-[130px] sm:max-w-none"
                >
                  {ALL_SURAHS_CATALOG.map(s => (
                    <option key={s.number} value={s.number} className="bg-emerald-950 text-white">
                      {s.number}. {s.nameTransliterated} ({s.nameArabic})
                    </option>
                  ))}
                </select>

                {/* Reciter Selector */}
                <div className="bg-black/40 p-1.5 rounded-xl border border-emerald-800/80 text-xs hidden sm:flex items-center space-x-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <select
                    value={activeReciter.id}
                    onChange={(e) => setActiveReciter(RECITERS.find(r => r.id === e.target.value) || RECITERS[0])}
                    className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer"
                  >
                    {RECITERS.map(r => (
                      <option key={r.id} value={r.id} className="bg-emerald-950 text-white">
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Translation Language Toggle */}
                <div className="bg-black/40 p-1 rounded-xl border border-emerald-800/80 text-xs flex items-center space-x-1">
                  {(['english', 'urdu', 'both'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setTranslationLanguage(lang)}
                      className={`px-2 py-1 rounded-lg uppercase font-bold text-[9px] sm:text-[10px] transition-colors ${
                        translationLanguage === lang ? 'bg-amber-400 text-emerald-950' : 'text-emerald-200 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Close Popup Button */}
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="p-2 bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white rounded-xl border border-rose-500/30 transition-colors ml-1"
                  title="Close Popup (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* 2. Scrollable Body inside Popup */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 scrollbar-thin">
              
              {/* Bismillah Banner */}
              {catalogMeta.number !== 9 && catalogMeta.number !== 1 && (
                <div className="bg-emerald-950/60 p-6 rounded-3xl border border-emerald-800/40 text-center shadow-lg">
                  <p className="font-serif text-2xl sm:text-4xl text-amber-300 leading-relaxed">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                  </p>
                </div>
              )}

              {/* Loading Spinner */}
              {isLoadingSurah && (
                <div className="py-20 text-center space-y-3">
                  <Loader2 className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
                  <p className="text-sm font-semibold text-emerald-200">Loading verses for Surah {catalogMeta.nameTransliterated}...</p>
                  <p className="text-xs text-emerald-400/80">Fetching authentic Uthmani script and translations</p>
                </div>
              )}

              {/* Error Message */}
              {loadError && (
                <div className="p-8 text-center bg-rose-950/40 border border-rose-500/30 rounded-3xl space-y-3">
                  <p className="text-sm font-semibold text-rose-300">{loadError}</p>
                  <button 
                    onClick={() => setSelectedSurahNumber(selectedSurahNumber)} 
                    className="px-4 py-2 bg-amber-400 text-emerald-950 font-bold rounded-full text-xs hover:bg-amber-300 inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Loading</span>
                  </button>
                </div>
              )}

              {/* Pagination Bar */}
              {!isLoadingSurah && totalVerses > 0 && (
                <div className="bg-emerald-950/60 p-3.5 rounded-2xl border border-emerald-800/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-emerald-200">Showing <strong>{displayedAyahs.length}</strong> of <strong>{totalVerses}</strong> ayahs</span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowWordByWord(!showWordByWord)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-semibold border transition-all ${
                        showWordByWord ? 'bg-amber-400 text-emerald-950 border-amber-300' : 'bg-black/30 text-emerald-200 border-emerald-800/60'
                      }`}
                    >
                      Word Breakdown
                    </button>

                    <button
                      onClick={() => setShowAllVerses(!showAllVerses)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-semibold border transition-all ${
                        showAllVerses ? 'bg-amber-400 text-emerald-950 border-amber-300' : 'bg-emerald-900/60 text-emerald-200 border-emerald-700/50'
                      }`}
                    >
                      {showAllVerses ? 'Paginate' : 'View All'}
                    </button>

                    {!showAllVerses && totalPages > 1 && (
                      <div className="flex items-center space-x-1">
                        <button
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          className="p-1 rounded-lg bg-emerald-900/80 text-emerald-200 disabled:opacity-40 border border-emerald-700/50"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-amber-300 px-1 text-[11px]">{currentPage}/{totalPages}</span>
                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className="p-1 rounded-lg bg-emerald-900/80 text-emerald-200 disabled:opacity-40 border border-emerald-700/50"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Verses List */}
              {!isLoadingSurah && (
                <div className="space-y-6">
                  {displayedAyahs.map((ayah) => {
                    const isBookmarked = savedBookmarks.some(b => b.surahNumber === catalogMeta.number && b.ayahNumber === ayah.numberInSurah);

                    return (
                      <div 
                        key={ayah.numberInSurah}
                        className="bg-emerald-950/40 backdrop-blur-md p-5 sm:p-7 rounded-3xl border border-emerald-800/40 shadow-xl space-y-5 hover:border-amber-400/40 transition-colors"
                      >
                        {/* Action Header */}
                        <div className="flex items-center justify-between border-b border-emerald-800/50 pb-3">
                          <span className="bg-emerald-900/90 text-amber-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-700/50">
                            Ayah {catalogMeta.number}:{ayah.numberInSurah}
                          </span>

                          <div className="flex items-center space-x-2">
                            {/* Play Audio Button */}
                            <button
                              onClick={() => handlePlayAudio(ayah.audioUrl)}
                              className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-1 ${
                                playingAyahUrl === ayah.audioUrl && isPlaying
                                  ? 'bg-amber-400 text-emerald-950'
                                  : 'bg-emerald-900/70 text-emerald-200 hover:bg-emerald-800 border border-emerald-700/50'
                              }`}
                              title="Recite Audio"
                            >
                              {playingAyahUrl === ayah.audioUrl && isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                              <span className="hidden sm:inline">Recite</span>
                            </button>

                            {/* Tafsir */}
                            <button
                              onClick={() => handleFetchTafsir(ayah)}
                              className="p-2 rounded-xl bg-emerald-900/70 text-amber-300 text-xs font-semibold flex items-center space-x-1 hover:bg-emerald-800 border border-emerald-700/50"
                              title="Tafsir & Exegesis"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Tafsir</span>
                            </button>

                            {/* Bookmark */}
                            <button
                              onClick={() => onBookmarkAyah(catalogMeta.number, catalogMeta.nameTransliterated, ayah.numberInSurah, ayah.arabicText, ayah.englishTranslation)}
                              className={`p-2 rounded-xl text-xs font-semibold border ${
                                isBookmarked 
                                  ? 'bg-amber-400 text-emerald-950 border-amber-300' 
                                  : 'bg-emerald-900/40 text-emerald-300 border-emerald-800/60 hover:text-amber-400'
                              }`}
                              title="Bookmark Ayah"
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Arabic Text */}
                        <div className="text-right py-2">
                          <p className="font-serif text-2xl sm:text-4xl text-emerald-50 leading-loose">
                            {ayah.arabicText}
                          </p>
                        </div>

                        {/* Word-by-Word Analysis */}
                        {showWordByWord && ayah.words && ayah.words.length > 0 && (
                          <div className="bg-black/40 p-3.5 rounded-2xl border border-emerald-800/50">
                            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-2">Word Breakdown</p>
                            <div className="flex flex-wrap flex-row-reverse gap-2">
                              {ayah.words.map((w, wIdx) => (
                                <div key={wIdx} className="bg-emerald-900/40 px-3 py-1.5 rounded-xl border border-emerald-700/40 text-center">
                                  <p className="font-serif text-lg text-emerald-100">{w.arabic}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Translations */}
                        <div className="space-y-3 pt-1">
                          {(translationLanguage === 'english' || translationLanguage === 'both') && (
                            <p className="text-sm font-medium text-emerald-100 leading-relaxed">
                              <strong className="text-amber-400 mr-2">[Sahih International]</strong>
                              "{ayah.englishTranslation}"
                            </p>
                          )}

                          {(translationLanguage === 'urdu' || translationLanguage === 'both') && ayah.urduTranslation && (
                            <p className="text-base text-emerald-200 font-serif leading-relaxed text-right pt-2 border-t border-emerald-800/30">
                              <strong className="text-amber-400 ml-2">[اردو]</strong>
                              {ayah.urduTranslation}
                            </p>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* Tafsir Modal */}
      {selectedAyahTafsir && (
        <div className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-emerald-950 text-white max-w-2xl w-full rounded-3xl p-6 border border-emerald-800 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 border-emerald-800/60">
              <h3 className="font-bold text-lg font-sans text-amber-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Tafsir — Surah {catalogMeta.nameTransliterated}:{selectedAyahTafsir.numberInSurah}</span>
              </h3>
              <button onClick={() => setSelectedAyahTafsir(null)} className="text-sm font-bold text-emerald-400 hover:text-white">✕</button>
            </div>

            <div className="bg-black/40 p-4 rounded-2xl border border-emerald-800/50 text-right">
              <p className="font-serif text-2xl text-amber-200">{selectedAyahTafsir.arabicText}</p>
            </div>

            {tafsirLoading ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-emerald-300">Generating Tafsir Insights...</p>
              </div>
            ) : (
              <div className="text-xs sm:text-sm leading-relaxed text-emerald-100 space-y-3 whitespace-pre-line">
                {tafsirText}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
