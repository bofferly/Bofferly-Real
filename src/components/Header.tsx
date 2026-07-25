import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Moon, 
  Sun, 
  Bookmark, 
  Menu, 
  X, 
  Compass, 
  GraduationCap, 
  FileText, 
  HelpCircle, 
  Headphones, 
  MapPin, 
  Scroll, 
  Download, 
  ShoppingBag, 
  Clock,
  Sparkles,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { NavigationTab, EssentialPageType } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab, subType?: EssentialPageType) => void;
  savedCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  darkMode,
  onToggleDarkMode,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'quran', label: '📖 Quran', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'hadith', label: '📚 Hadith', icon: <Scroll className="w-4 h-4" /> },
    { id: 'ramadan', label: '🌙 Ramadan Hub', icon: <Moon className="w-4 h-4" />, badge: 'Special' },
    { id: 'admin', label: '🛡️ Admin Console', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Admin' },
    { id: 'tools', label: '🛠️ Tools', icon: <Compass className="w-4 h-4" /> },
    { id: 'seerah', label: '📜 Seerah', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'academy', label: '🎓 Academy', icon: <GraduationCap className="w-4 h-4" />, badge: 'Free' },
    { id: 'fatwa', label: '❓ Fatwa', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'blog', label: '✍️ Blog', icon: <FileText className="w-4 h-4" /> },
    { id: 'stories', label: '📖 Stories', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'media', label: '🎧 Audio & Media', icon: <Headphones className="w-4 h-4" /> },
    { id: 'mosques', label: '🕌 Mosques', icon: <MapPin className="w-4 h-4" /> },
    { id: 'downloads', label: '📥 Downloads', icon: <Download className="w-4 h-4" /> },
    { id: 'marketplace', label: '🛍️ Shop', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  const megaCategories = [
    {
      title: '📖 Holy Quran',
      links: [
        { label: 'Complete Arabic Text', tab: 'quran' as NavigationTab },
        { label: 'Audio Recitations & Reciters', tab: 'quran' as NavigationTab },
        { label: 'Word-by-Word Translation', tab: 'quran' as NavigationTab },
        { label: 'Tafsir Section', tab: 'quran' as NavigationTab },
        { label: 'Quran Bookmarks', tab: 'dashboard' as NavigationTab },
      ]
    },
    {
      title: '📚 Hadith Library',
      links: [
        { label: 'Sahih al-Bukhari', tab: 'hadith' as NavigationTab },
        { label: 'Sahih Muslim', tab: 'hadith' as NavigationTab },
        { label: 'Sunan Abu Dawood', tab: 'hadith' as NavigationTab },
        { label: 'Jami at-Tirmidhi', tab: 'hadith' as NavigationTab },
        { label: 'Hadith by Topic', tab: 'hadith' as NavigationTab },
      ]
    },
    {
      title: '🛠️ Islamic Tools',
      links: [
        { label: 'Prayer Times & Qibla Finder', tab: 'tools' as NavigationTab },
        { label: 'Zakat Calculator (Gold/Silver/Cash)', tab: 'tools' as NavigationTab },
        { label: 'Hajj & Umrah Packing Checklist', tab: 'tools' as NavigationTab },
        { label: 'Fortress of the Muslim (Duas)', tab: 'tools' as NavigationTab },
        { label: 'Hijri Date Converter', tab: 'tools' as NavigationTab },
      ]
    },
    {
      title: '📜 Portals & Academy',
      links: [
        { label: 'Interactive Seerah Portal', tab: 'seerah' as NavigationTab },
        { label: 'Prophet & Sahabah Stories', tab: 'stories' as NavigationTab },
        { label: 'AI Scholar & Fatwa Q&A', tab: 'fatwa' as NavigationTab },
        { label: 'Bofferly Learning Academy', tab: 'academy' as NavigationTab },
        { label: 'Global Mosque Directory', tab: 'mosques' as NavigationTab },
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#021812]/90 backdrop-blur-md text-white shadow-xl transition-colors border-b border-emerald-900/50">
      {/* Top Banner Bar */}
      <div className="bg-[#021812] text-xs py-1.5 px-4 text-emerald-200/80 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-900/40 px-3 py-1 rounded-full border border-emerald-700/30 flex items-center gap-2 text-xs text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"></span>
              <span>10 Dhul-Hijjah 1448 AH</span>
            </div>
            <span className="flex items-center space-x-1 font-medium text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400 inline" />
              <span>Dhuhr: <strong className="text-amber-400">12:20 PM</strong></span>
              <span className="text-emerald-500 mx-1">•</span>
              <span className="text-emerald-300">Next: Asr in 2h 45m</span>
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <button 
              onClick={() => onSelectTab('essential', 'donation')} 
              className="text-amber-400 hover:text-amber-300 font-medium underline flex items-center gap-1"
            >
              ❤️ Support Bofferly Dawah
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectTab('home')} 
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 border border-white/20 text-emerald-950 flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            ☪️
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-black tracking-tight text-emerald-400 font-sans">BOFFERLY<span className="text-amber-400">.</span></span>
            </div>
            <p className="text-[10px] text-emerald-300/70 font-light tracking-wide -mt-0.5">
              Complete Islamic Knowledge & Services
            </p>
          </div>
        </div>

        {/* Global Search Trigger */}
        <button 
          onClick={onOpenSearch} 
          className="hidden md:flex items-center space-x-2 bg-emerald-800/60 hover:bg-emerald-800/90 text-emerald-100 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 rounded-full border border-emerald-700 dark:border-slate-700 text-xs transition-all w-64 justify-between shadow-inner"
        >
          <span className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-emerald-200/80 dark:text-slate-400">Search Quran, Hadith, Fatwa...</span>
          </span>
          <kbd className="bg-emerald-950 dark:bg-slate-900 text-[10px] text-amber-300 px-1.5 py-0.5 rounded border border-emerald-700 font-mono">⌘K</kbd>
        </button>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Button for Mobile */}
          <button 
            onClick={onOpenSearch} 
            className="md:hidden p-2 rounded-lg bg-emerald-800 dark:bg-slate-800 text-emerald-100 hover:text-amber-300"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Admin Console Quick Button */}
          <button 
            onClick={() => onSelectTab('admin')} 
            className="p-2 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 hover:bg-amber-400 hover:text-emerald-950 transition-all font-bold text-xs flex items-center gap-1"
            title="Admin Console"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden lg:inline text-[11px]">Admin</span>
          </button>

          {/* User Saved Bookmarks */}
          <button 
            onClick={() => onSelectTab('dashboard')} 
            className="p-2 rounded-lg bg-emerald-800 dark:bg-slate-800 text-emerald-100 hover:text-amber-300 relative transition-colors"
            title="Saved Items & Bookmarks"
          >
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-emerald-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Theme Mode Toggle */}
          <button 
            onClick={onToggleDarkMode} 
            className="p-2 rounded-lg bg-emerald-800 dark:bg-slate-800 text-emerald-100 hover:text-amber-300 transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mega Menu Toggle */}
          <button 
            onClick={() => setMegaMenuOpen(!megaMenuOpen)} 
            className="hidden lg:flex items-center space-x-1 px-3 py-2 rounded-lg bg-amber-400 text-emerald-950 font-semibold text-xs hover:bg-amber-300 transition-colors shadow"
          >
            <span>Explore Hubs</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-lg bg-emerald-800 dark:bg-slate-800 text-emerald-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Tabs Bar */}
      <nav className="hidden lg:block bg-emerald-950/80 dark:bg-slate-950/90 border-t border-emerald-800/60 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 overflow-x-auto py-1 scrollbar-none text-xs">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMegaMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md font-medium whitespace-nowrap flex items-center space-x-1.5 transition-all ${
                  isActive 
                    ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm' 
                    : 'text-emerald-100/90 hover:text-amber-300 hover:bg-emerald-900/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] bg-emerald-800 text-amber-300 font-bold px-1 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mega Dropdown Menu */}
      {megaMenuOpen && (
        <div className="hidden lg:block absolute left-0 right-0 top-full bg-emerald-900/98 dark:bg-slate-900/98 backdrop-blur-md border-b border-emerald-700 dark:border-slate-800 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto p-6 grid grid-cols-4 gap-6">
            {megaCategories.map((cat, idx) => (
              <div key={idx} className="bg-emerald-950/50 dark:bg-slate-950/50 p-4 rounded-xl border border-emerald-800/50 dark:border-slate-800">
                <h4 className="font-bold text-amber-300 text-sm mb-3 font-serif pb-1 border-b border-emerald-800/60">
                  {cat.title}
                </h4>
                <ul className="space-y-2 text-xs">
                  {cat.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <button
                        onClick={() => {
                          onSelectTab(link.tab);
                          setMegaMenuOpen(false);
                        }}
                        className="text-emerald-100 hover:text-amber-300 transition-colors flex items-center space-x-2 group"
                      >
                        <span className="text-amber-400 group-hover:translate-x-1 transition-transform">›</span>
                        <span>{link.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950 dark:bg-slate-950 border-t border-emerald-800 px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-left text-xs font-semibold flex items-center space-x-2 ${
                  currentTab === item.id 
                    ? 'bg-amber-400 text-emerald-950' 
                    : 'bg-emerald-900/50 text-emerald-100 hover:bg-emerald-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
