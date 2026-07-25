import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SEOJsonLd } from './components/SEOJsonLd';

import { HomeView } from './components/views/HomeView';
import { QuranView } from './components/views/QuranView';
import { HadithView } from './components/views/HadithView';
import { RamadanView } from './components/views/RamadanView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { IslamicToolsView } from './components/views/IslamicToolsView';
import { SeerahView } from './components/views/SeerahView';
import { StoriesView } from './components/views/StoriesView';
import { FatwaView } from './components/views/FatwaView';
import { AcademyView } from './components/views/AcademyView';
import { MediaView } from './components/views/MediaView';
import { MosqueDirectoryView } from './components/views/MosqueDirectoryView';
import { BlogView } from './components/views/BlogView';
import { DownloadsView } from './components/views/DownloadsView';
import { MarketplaceView } from './components/views/MarketplaceView';
import { UserDashboardView } from './components/views/UserDashboardView';
import { EssentialPagesView } from './components/views/EssentialPagesView';

import { NavigationTab, EssentialPageType, HadithItem } from './types';
import { syncUserDataToCloud, fetchCloudBackupData } from './services/cloudSyncService';
import { Cloud, CheckCircle2, RefreshCw, ShieldCheck } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [essentialPageType, setEssentialPageType] = useState<EssentialPageType>('about');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Sync Service State
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);

  // Saved Bookmarks & Hadiths local state (initialized with cloud/local cache fallback)
  const [savedBookmarks, setSavedBookmarks] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('bofferly_quran_bookmarks');
      if (stored) return JSON.parse(stored);
      const backup = fetchCloudBackupData();
      return backup?.bookmarks || [];
    } catch {
      return [];
    }
  });

  const [savedHadiths, setSavedHadiths] = useState<HadithItem[]>(() => {
    try {
      const stored = localStorage.getItem('bofferly_saved_hadiths');
      if (stored) return JSON.parse(stored);
      const backup = fetchCloudBackupData();
      return backup?.hadiths || [];
    } catch {
      return [];
    }
  });

  // Perform Sync Service Execution
  const triggerSyncService = async (bookmarksData = savedBookmarks, hadithsData = savedHadiths) => {
    setSyncStatus('syncing');
    const result = await syncUserDataToCloud(bookmarksData, hadithsData);
    if (result.success) {
      setSyncStatus('synced');
      setLastSyncedTime(result.timestamp);
    } else {
      setSyncStatus('error');
    }
  };

  // Periodic Auto-Sync Service (Every 30 seconds)
  useEffect(() => {
    // Initial sync on mount
    triggerSyncService(savedBookmarks, savedHadiths);

    const intervalId = setInterval(() => {
      triggerSyncService(savedBookmarks, savedHadiths);
    }, 30000); // 30 seconds periodic sync

    return () => clearInterval(intervalId);
  }, []);

  // Trigger sync whenever bookmarks or hadiths change
  useEffect(() => {
    triggerSyncService(savedBookmarks, savedHadiths);
  }, [savedBookmarks.length, savedHadiths.length]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectTab = (tab: NavigationTab, subType?: EssentialPageType) => {
    setCurrentTab(tab);
    if (subType) {
      setEssentialPageType(subType);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookmarkAyah = (surahNumber: number, surahName: string, ayahNumber: number, arabic: string, english: string) => {
    const exists = savedBookmarks.some(b => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
    let updated;
    if (exists) {
      updated = savedBookmarks.filter(b => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber));
    } else {
      updated = [{ surahNumber, surahName, ayahNumber, arabic, english }, ...savedBookmarks];
    }
    setSavedBookmarks(updated);
    localStorage.setItem('bofferly_quran_bookmarks', JSON.stringify(updated));
  };

  const handleSaveHadith = (hadith: HadithItem) => {
    const exists = savedHadiths.some(h => h.id === hadith.id);
    let updated;
    if (exists) {
      updated = savedHadiths.filter(h => h.id !== hadith.id);
    } else {
      updated = [hadith, ...savedHadiths];
    }
    setSavedHadiths(updated);
    localStorage.setItem('bofferly_saved_hadiths', JSON.stringify(updated));
  };

  const handleRemoveBookmark = (surahNumber: number, ayahNumber: number) => {
    const updated = savedBookmarks.filter(b => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber));
    setSavedBookmarks(updated);
    localStorage.setItem('bofferly_quran_bookmarks', JSON.stringify(updated));
  };

  const handleRemoveHadith = (id: string) => {
    const updated = savedHadiths.filter(h => h.id !== id);
    setSavedHadiths(updated);
    localStorage.setItem('bofferly_saved_hadiths', JSON.stringify(updated));
  };

  return (
    <div className={`min-h-screen bg-[#021812] dark:bg-[#021812] text-emerald-50 flex flex-col font-sans transition-colors duration-200`}>
      <SEOJsonLd type="Organization" />

      {/* Global Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        savedCount={savedBookmarks.length + savedHadiths.length}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Cloud Sync Status Bar */}
      <div className="bg-emerald-950/90 border-b border-emerald-800/40 text-[11px] text-emerald-200 py-1.5 px-4">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cloud className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-emerald-100">
              {syncStatus === 'syncing' && 'Cloud Persistence Syncing...'}
              {syncStatus === 'synced' && 'Cloud Backup Active (Auto-Syncing every 30s)'}
              {syncStatus === 'error' && 'Sync Warning (Using Local Cache)'}
              {syncStatus === 'idle' && 'Cloud Sync Idle'}
            </span>
            {lastSyncedTime && (
              <span className="text-[10px] text-emerald-400/80 hidden sm:inline">
                • Last synced at {lastSyncedTime}
              </span>
            )}
          </div>

          <button
            onClick={() => triggerSyncService(savedBookmarks, savedHadiths)}
            disabled={syncStatus === 'syncing'}
            className="flex items-center space-x-1 bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 px-2.5 py-0.5 rounded-lg border border-emerald-700/50 text-[10px] font-bold transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${syncStatus === 'syncing' ? 'animate-spin text-amber-400' : ''}`} />
            <span>{syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={handleSelectTab}
            onBookmarkAyah={handleBookmarkAyah}
            onSaveHadith={handleSaveHadith}
          />
        )}

        {currentTab === 'quran' && (
          <QuranView
            onBookmarkAyah={handleBookmarkAyah}
            savedBookmarks={savedBookmarks}
          />
        )}

        {currentTab === 'hadith' && (
          <HadithView
            onSaveHadith={handleSaveHadith}
            savedHadiths={savedHadiths}
          />
        )}

        {currentTab === 'ramadan' && <RamadanView />}

        {currentTab === 'admin' && <AdminDashboardView />}

        {currentTab === 'tools' && <IslamicToolsView />}

        {currentTab === 'seerah' && <SeerahView />}

        {currentTab === 'stories' && <StoriesView />}

        {currentTab === 'fatwa' && <FatwaView />}

        {currentTab === 'academy' && <AcademyView />}

        {currentTab === 'media' && <MediaView />}

        {currentTab === 'mosques' && <MosqueDirectoryView />}

        {currentTab === 'blog' && <BlogView />}

        {currentTab === 'downloads' && <DownloadsView />}

        {currentTab === 'marketplace' && <MarketplaceView />}

        {currentTab === 'dashboard' && (
          <UserDashboardView
            savedBookmarks={savedBookmarks}
            savedHadiths={savedHadiths}
            onRemoveBookmark={handleRemoveBookmark}
            onRemoveHadith={handleRemoveHadith}
            onSelectTab={handleSelectTab}
          />
        )}

        {currentTab === 'essential' && (
          <EssentialPagesView pageType={essentialPageType} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onSelectTab={handleSelectTab} />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTab={handleSelectTab}
      />
    </div>
  );
}

export default App;
