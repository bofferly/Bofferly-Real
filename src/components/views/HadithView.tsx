import React, { useState, useEffect } from 'react';
import { 
  Scroll, 
  Search, 
  Heart, 
  Share2, 
  BookOpen, 
  Check, 
  Sparkles, 
  Bookmark, 
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download
} from 'lucide-react';
import { HADITH_BOOKS, SAMPLE_HADITHS } from '../../data/hadithData';
import { HadithItem } from '../../types';

interface HadithViewProps {
  onSaveHadith: (hadith: HadithItem) => void;
  savedHadiths: HadithItem[];
}

const HADITHS_PER_PAGE = 20;

export const HadithView: React.FC<HadithViewProps> = ({ onSaveHadith, savedHadiths }) => {
  const [selectedBookId, setSelectedBookId] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic Full Hadith Collection Fetch State
  const [fetchedHadithsMap, setFetchedHadithsMap] = useState<Record<string, HadithItem[]>>({});
  const [isLoadingBook, setIsLoadingBook] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const topicsList = ['all', 'Intentions', 'Character', 'Eeman', 'Knowledge', 'Purification', 'Parents', 'Brotherhood', 'Actions', 'Sincerity'];

  // Map collection IDs to API book keys
  const apiKeyMap: Record<string, string> = {
    bukhari: 'bukhari',
    muslim: 'muslim',
    abudawood: 'abudawud',
    tirmidhi: 'tirmidhi',
    nasai: 'nasai',
    ibnmajah: 'ibnmajah'
  };

  // Reset pagination when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBookId, selectedTopic, searchQuery]);

  const handleFetchFullCollection = async (bookId: string) => {
    if (fetchedHadithsMap[bookId]) return;
    const apiKey = apiKeyMap[bookId];
    if (!apiKey) return;

    setIsLoadingBook(true);
    setLoadError(null);

    try {
      const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-${apiKey}.json`);
      if (!res.ok) throw new Error('Failed to download Hadith collection');
      const json = await res.json();

      if (json && Array.isArray(json.hadiths)) {
        const bookMeta = HADITH_BOOKS.find(b => b.id === bookId);
        const mappedItems: HadithItem[] = json.hadiths.slice(0, 1500).map((h: any, idx: number) => ({
          id: `${bookId}-${h.hadithnumber || idx + 1}`,
          collectionId: bookId,
          collectionName: bookMeta?.name || 'Hadith Collection',
          bookNumber: h.reference?.book || 1,
          bookName: json.metadata?.section?.[h.reference?.book] || 'General Chapter',
          hadithNumber: String(h.hadithnumber || idx + 1),
          arabicText: h.arabicText || 'الحديث النبوي الشريف',
          englishText: h.text || '',
          narrator: h.text ? (h.text.split(':')[0] || 'Prophetic Companion') : 'Prophetic Companion',
          grade: h.grades?.[0]?.grade || 'Authentic (Sahih)',
          topics: ['Hadith', bookMeta?.name || 'Sunnah']
        }));

        setFetchedHadithsMap(prev => ({ ...prev, [bookId]: mappedItems }));
      }
    } catch (err) {
      setLoadError('Failed to fetch full collection. Check internet connectivity.');
    } finally {
      setIsLoadingBook(false);
    }
  };

  // Combine curated sample hadiths + dynamically fetched collection
  let currentList: HadithItem[] = SAMPLE_HADITHS;
  if (selectedBookId !== 'all' && fetchedHadithsMap[selectedBookId]) {
    currentList = fetchedHadithsMap[selectedBookId];
  } else if (selectedBookId !== 'all') {
    currentList = SAMPLE_HADITHS.filter(h => h.collectionId === selectedBookId);
  }

  const filteredHadiths = currentList.filter(h => {
    const matchesBook = selectedBookId === 'all' || h.collectionId === selectedBookId;
    const matchesTopic = selectedTopic === 'all' || h.topics.some(t => t.toLowerCase() === selectedTopic.toLowerCase());
    const matchesQuery = searchQuery === '' || 
      h.englishText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.arabicText.includes(searchQuery) ||
      h.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.hadithNumber.includes(searchQuery);

    return matchesBook && matchesTopic && matchesQuery;
  });

  const totalPages = Math.ceil(filteredHadiths.length / HADITHS_PER_PAGE) || 1;
  const displayedHadiths = filteredHadiths.slice((currentPage - 1) * HADITHS_PER_PAGE, currentPage * HADITHS_PER_PAGE);

  const handleShareHadith = (hadith: HadithItem) => {
    const textToCopy = `[${hadith.collectionName} #${hadith.hadithNumber}]\nNarrated by ${hadith.narrator}:\n"${hadith.englishText}"\n\nShared via Bofferly Islamic Portal`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(hadith.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-emerald-950/80 backdrop-blur-md text-white p-6 sm:p-8 rounded-3xl border border-emerald-800/40 shadow-2xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/10 text-amber-300 text-xs px-3.5 py-1 rounded-full border border-amber-400/30">
          <Scroll className="w-3.5 h-3.5 text-amber-400" />
          <span>Kutub al-Sittah (الكتب الستة) — Major Hadith Collections</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-white tracking-tight">
          Authentic Prophetic Hadith Library
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-3xl leading-relaxed">
          Search thousands of verified Hadiths from Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawood, Jami' at-Tirmidhi, Sunan an-Nasa'i, and Sunan Ibn Majah.
        </p>
      </div>

      {/* 6 Major Books Catalog Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => setSelectedBookId('all')}
          className={`p-3.5 rounded-2xl border text-left transition-all ${
            selectedBookId === 'all'
              ? 'bg-amber-400 text-emerald-950 font-bold border-amber-400 shadow-lg scale-[1.02]'
              : 'bg-emerald-950/40 border-emerald-800/30 text-emerald-100 hover:border-amber-400/50'
          }`}
        >
          <p className="text-xs uppercase font-bold">All Collections</p>
          <p className="text-[10px] opacity-80">6 Major Books</p>
        </button>

        {HADITH_BOOKS.map((book) => {
          const isSelected = selectedBookId === book.id;
          return (
            <button
              key={book.id}
              onClick={() => setSelectedBookId(book.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-amber-400 text-emerald-950 font-bold border-amber-400 shadow-lg scale-[1.02]'
                  : 'bg-emerald-950/40 border-emerald-800/30 text-emerald-100 hover:border-amber-400/50'
              }`}
            >
              <p className="text-xs font-bold truncate">{book.name}</p>
              <p className="text-[10px] font-serif opacity-90">{book.arabicName}</p>
            </button>
          );
        })}
      </div>

      {/* Load Full Book Collection Action Bar */}
      {selectedBookId !== 'all' && (
        <div className="bg-emerald-950/40 p-4 sm:p-5 rounded-3xl border border-emerald-800/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="text-sm font-bold text-amber-300">
              {HADITH_BOOKS.find(b => b.id === selectedBookId)?.name}
            </h3>
            <p className="text-xs text-emerald-200/80">
              {fetchedHadithsMap[selectedBookId] 
                ? `Loaded ${fetchedHadithsMap[selectedBookId].length} full Hadiths from repository` 
                : `${HADITH_BOOKS.find(b => b.id === selectedBookId)?.totalHadiths} total verified Hadiths available.`}
            </p>
          </div>

          {!fetchedHadithsMap[selectedBookId] && (
            <button
              onClick={() => handleFetchFullCollection(selectedBookId)}
              disabled={isLoadingBook}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-full text-xs transition-all shadow-md flex items-center gap-2 shrink-0 disabled:opacity-50"
            >
              {isLoadingBook ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>{isLoadingBook ? 'Loading Full Collection...' : 'Load Full Book Dataset'}</span>
            </button>
          )}
        </div>
      )}

      {/* Filters & Search Bar */}
      <div className="bg-emerald-950/40 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-emerald-800/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Hadith text, narrator, or #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-black/30 border border-emerald-800/50 text-xs rounded-2xl focus:outline-none focus:border-amber-400 text-white placeholder-emerald-400/60"
          />
        </div>

        {/* Topics Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          <Filter className="w-4 h-4 text-amber-400 shrink-0" />
          {topicsList.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap capitalize text-[11px] transition-colors ${
                selectedTopic === topic
                  ? 'bg-amber-400 text-emerald-950'
                  : 'bg-emerald-900/40 text-emerald-200 hover:bg-emerald-800/60 border border-emerald-800/40'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Hadith Count & Pagination Header */}
      <div className="flex items-center justify-between text-xs text-emerald-200/90 px-2">
        <span>Showing <strong>{filteredHadiths.length}</strong> authentic Hadiths</span>
        {totalPages > 1 && (
          <span className="font-bold text-amber-300">Page {currentPage} of {totalPages}</span>
        )}
      </div>

      {/* Hadith List */}
      <div className="space-y-6">
        {isLoadingBook ? (
          <div className="bg-emerald-950/40 p-12 text-center rounded-3xl border border-emerald-800/30 space-y-3">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-emerald-200">Downloading complete Hadith dataset...</p>
          </div>
        ) : displayedHadiths.length === 0 ? (
          <div className="bg-emerald-950/40 p-12 text-center rounded-3xl border border-emerald-800/30 space-y-2">
            <Scroll className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="font-semibold text-sm text-emerald-100">No Hadiths found matching your query.</p>
            <p className="text-xs text-emerald-300/60">Try clearing search keywords or selecting a different collection.</p>
          </div>
        ) : (
          displayedHadiths.map((hadith) => {
            const isSaved = savedHadiths.some(h => h.id === hadith.id);

            return (
              <div 
                key={hadith.id}
                className="bg-emerald-950/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/30 shadow-xl space-y-4 hover:border-amber-400/40 transition-colors"
              >
                {/* Book & Grade Header */}
                <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-900/80 text-amber-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-700/50">
                      {hadith.collectionName} #{hadith.hadithNumber}
                    </span>
                    <span className="text-[11px] text-emerald-300/80 font-medium hidden sm:inline">
                      {hadith.bookName}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      Grade: {hadith.grade}
                    </span>

                    {/* Save Button */}
                    <button
                      onClick={() => onSaveHadith(hadith)}
                      className={`p-2 rounded-xl text-xs font-semibold border ${
                        isSaved 
                          ? 'bg-amber-400 text-emerald-950 border-amber-300' 
                          : 'bg-emerald-900/40 text-emerald-200 border-emerald-800/60 hover:text-amber-400'
                      }`}
                      title="Save Hadith"
                    >
                      <Heart className="w-4 h-4" />
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={() => handleShareHadith(hadith)}
                      className="p-2 rounded-xl bg-emerald-900/40 border border-emerald-800/60 text-emerald-200 hover:text-amber-300 text-xs font-semibold flex items-center space-x-1"
                      title="Copy & Share"
                    >
                      {copiedId === hadith.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                      <span className="hidden sm:inline">{copiedId === hadith.id ? 'Copied!' : 'Share'}</span>
                    </button>
                  </div>
                </div>

                {/* Arabic Hadith Text */}
                {hadith.arabicText && (
                  <div className="text-right py-2">
                    <p className="font-serif text-xl sm:text-2xl text-amber-200 leading-relaxed">
                      {hadith.arabicText}
                    </p>
                  </div>
                )}

                {/* Narrator & English Translation */}
                <div className="space-y-1">
                  <p className="text-xs text-amber-400 font-bold">
                    Narrated by: {hadith.narrator}
                  </p>
                  <p className="text-sm font-medium text-emerald-50 leading-relaxed">
                    "{hadith.englishText}"
                  </p>
                </div>

                {/* Topics Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {hadith.topics.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-black/30 border border-emerald-800/40 text-emerald-200 font-medium px-2 py-0.5 rounded-full">
                      #{t}
                    </span>
                  ))}
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Bottom Pagination */}
      {!isLoadingBook && totalPages > 1 && (
        <div className="bg-emerald-950/40 p-4 rounded-3xl border border-emerald-800/30 flex items-center justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(p => Math.max(1, p - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-full bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 font-bold text-xs disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="font-bold text-amber-300 text-xs">Page {currentPage} of {totalPages}</span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage(p => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-full bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 font-bold text-xs disabled:opacity-40 flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
