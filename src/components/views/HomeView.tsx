import React from 'react';
import { 
  BookOpen, 
  Scroll, 
  Clock, 
  Compass, 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  ArrowRight, 
  Volume2, 
  Bookmark, 
  CheckCircle2, 
  Heart,
  Share2,
  Moon
} from 'lucide-react';
import { NavigationTab, Surah, HadithItem, BlogPost, EssentialPageType } from '../../types';
import { SAMPLE_HADITHS } from '../../data/hadithData';
import { BLOG_POSTS } from '../../data/blogData';
import { ACADEMY_COURSES } from '../../data/coursesData';
import { PROPHET_STORIES } from '../../data/storiesData';
import { PrayerTimesSection } from '../PrayerTimesSection';
import { DailyQuizSection } from '../DailyQuizSection';

interface HomeViewProps {
  onSelectTab: (tab: NavigationTab, subType?: EssentialPageType) => void;
  onBookmarkAyah: (surahNumber: number, surahName: string, ayahNumber: number, arabic: string, english: string) => void;
  onSaveHadith: (hadith: HadithItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTab, onBookmarkAyah, onSaveHadith }) => {
  const todayVerse = {
    surahNumber: 1,
    surahName: 'Al-Fatihah',
    ayahNumber: 5,
    arabicText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    transliteration: 'Iyyaaka na\'budu wa iyyaaka nasta\'een',
    englishTranslation: 'It is You we worship and You we ask for help.',
    tafsirSnippet: 'The core covenant of Tawhid: worshiping none but Allah and seeking ultimate assistance from Him alone.'
  };

  const dailyHadith = SAMPLE_HADITHS[0];
  const featuredPost = BLOG_POSTS[0];
  const featuredCourse = ACADEMY_COURSES[0];
  const featuredStory = PROPHET_STORIES[0];

  return (
    <div className="space-y-12 pb-12 font-sans">
      
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-emerald-950/60 backdrop-blur-md text-white p-8 sm:p-12 border border-emerald-800/40 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-900/60 text-amber-300 border border-emerald-700/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"></span>
            <span>Welcome to Bofferly — Complete Islamic Knowledge Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans text-white tracking-tight leading-tight">
            Illuminate Your Journey with <span className="text-amber-400">Authentic Islamic Wisdom</span>
          </h1>

          <p className="text-emerald-200/90 text-sm sm:text-base leading-relaxed">
            Read the complete Quran with word-by-word translation, explore 6 major Hadith collections, calculate precise prayer times, ask AI Scholar questions, and enroll in Bofferly Academy courses.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button 
              onClick={() => onSelectTab('ramadan')}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center space-x-2"
            >
              <Moon className="w-4 h-4 fill-emerald-950" />
              <span>Ramadan Hub 🌙</span>
            </button>

            <button 
              onClick={() => onSelectTab('quran')}
              className="bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-100 border border-emerald-700/50 font-semibold px-6 py-3 rounded-full text-xs sm:text-sm transition-all flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Quran</span>
            </button>

            <button 
              onClick={() => onSelectTab('tools')}
              className="bg-emerald-900/60 hover:bg-emerald-800/80 text-amber-300 border border-emerald-700/50 font-semibold px-6 py-3 rounded-full text-xs sm:text-sm transition-all flex items-center space-x-2"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Prayer Times & Qibla</span>
            </button>

            <button 
              onClick={() => onSelectTab('fatwa')}
              className="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-100 border border-emerald-800/60 font-semibold px-6 py-3 rounded-full text-xs sm:text-sm transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ask AI Scholar</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Today's Quran Verse & Daily Hadith Side-by-Side */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Quran Verse */}
        <div className="bg-emerald-950/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/30 shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-400/5 blur-3xl rounded-full"></div>
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
            <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-widest text-amber-400">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Verse of the Day</span>
            </div>
            <span className="text-[11px] bg-emerald-900/60 text-emerald-200 border border-emerald-700/40 font-semibold px-2.5 py-0.5 rounded-full">
              Surah {todayVerse.surahName} ({todayVerse.surahNumber}:{todayVerse.ayahNumber})
            </span>
          </div>

          <div className="text-right py-3">
            <p className="font-serif text-2xl sm:text-3xl text-emerald-100 leading-loose">
              {todayVerse.arabicText}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-amber-300/90 font-medium italic">{todayVerse.transliteration}</p>
            <p className="text-sm font-medium text-emerald-50 leading-relaxed">
              "{todayVerse.englishTranslation}"
            </p>
          </div>

          <p className="text-xs text-emerald-200/80 bg-black/20 p-3 rounded-2xl border border-emerald-900/40">
            <strong className="text-amber-400">Tafsir Insight:</strong> {todayVerse.tafsirSnippet}
          </p>

          <div className="flex items-center justify-between pt-2">
            <button 
              onClick={() => onBookmarkAyah(todayVerse.surahNumber, todayVerse.surahName, todayVerse.ayahNumber, todayVerse.arabicText, todayVerse.englishTranslation)}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmark Verse</span>
            </button>
            <button 
              onClick={() => onSelectTab('quran')}
              className="px-3 py-1 bg-emerald-800/40 border border-emerald-700/40 rounded-full text-[10px] text-amber-300 hover:bg-emerald-700/60 font-bold flex items-center space-x-1 transition-all"
            >
              <span>Read Full Surah</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Daily Hadith */}
        <div className="bg-emerald-950/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/30 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
            <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-widest text-emerald-400">
              <Scroll className="w-4 h-4 text-emerald-400" />
              <span>Today's Hadith</span>
            </div>
            <span className="text-[11px] bg-amber-400/10 border border-amber-400/30 text-amber-300 font-semibold px-2.5 py-0.5 rounded-full">
              {dailyHadith.collectionName}
            </span>
          </div>

          <div className="text-right py-2">
            <p className="font-serif text-xl sm:text-2xl text-emerald-950 dark:text-emerald-200 leading-relaxed">
              {dailyHadith.arabicText}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">Narrated by: {dailyHadith.narrator}</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              "{dailyHadith.englishText}"
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button 
              onClick={() => onSaveHadith(dailyHadith)}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 font-semibold flex items-center space-x-1"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Save Hadith</span>
            </button>
            <button 
              onClick={() => onSelectTab('hadith')}
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-bold flex items-center space-x-1"
            >
              <span>Explore Hadith Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Live Location-based Prayer Times */}
      <section>
        <PrayerTimesSection onSelectTab={onSelectTab} />
      </section>

      {/* 4. Daily Islamic Knowledge Quiz & Streak Tracker */}
      <section>
        <DailyQuizSection />
      </section>

      {/* 4. Quick Islamic Tools Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500" />
            <span>Essential Islamic Tools</span>
          </h2>
          <button onClick={() => onSelectTab('tools')} className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline">
            View All Tools →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: 'Qibla Finder', desc: 'Interactive compass & directional map', icon: '🧭', tab: 'tools' as NavigationTab },
            { title: 'Zakat Calculator', desc: 'Accurate Gold, Silver & Cash Zakat', icon: '💰', tab: 'tools' as NavigationTab },
            { title: 'Fortress of Muslim', desc: 'Authentic daily Duas & Adhkar', icon: '🤲', tab: 'tools' as NavigationTab },
            { title: 'Hajj & Umrah Guide', desc: 'Step-by-step rites & packing list', icon: '🕋', tab: 'tools' as NavigationTab },
          ].map((tool, idx) => (
            <div 
              key={idx}
              onClick={() => onSelectTab(tool.tab)}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-emerald-100 dark:border-slate-800 hover:border-amber-400 transition-all cursor-pointer shadow-sm group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{tool.icon}</div>
              <h3 className="font-bold text-sm text-emerald-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">{tool.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Seerah & Prophet Stories */}
      <section className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-8 rounded-3xl border border-emerald-800 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30 inline-block">
            📜 Seerah Portal Spotlight
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            The Noble Character & Life of Prophet Muhammad ﷺ
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Explore our interactive Seerah timeline spanning the Makkah Period, the Migration to Madinah, the major battles, family tree, and noble manners.
          </p>
          <button 
            onClick={() => onSelectTab('seerah')}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors inline-flex items-center space-x-2"
          >
            <span>Explore Seerah Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-emerald-900/80 p-6 rounded-2xl border border-emerald-700/60 space-y-3">
          <h3 className="text-lg font-bold text-amber-300 font-serif">Featured Prophet Story</h3>
          <p className="font-bold text-white">{featuredStory.prophetName} — {featuredStory.title}</p>
          <p className="text-xs text-emerald-100 leading-relaxed line-clamp-3">{featuredStory.summary}</p>
          <button 
            onClick={() => onSelectTab('stories')}
            className="text-xs text-amber-300 font-bold hover:underline inline-flex items-center space-x-1"
          >
            <span>Read Story of {featuredStory.prophetName}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 6. Learning Academy Spotlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-500" />
              <span>Bofferly Learning Academy</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Structured courses with quizzes & certificates</p>
          </div>
          <button onClick={() => onSelectTab('academy')} className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline">
            View All Courses →
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center">
          <img 
            src={featuredCourse.thumbnail} 
            alt={featuredCourse.title} 
            className="w-full md:w-64 h-40 object-cover rounded-xl shadow"
          />
          <div className="space-y-3 flex-1">
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] px-2 py-0.5 rounded">
                {featuredCourse.category}
              </span>
              <span className="text-xs text-amber-500 font-bold">★ {featuredCourse.rating} ({featuredCourse.enrolledStudents} students)</span>
            </div>
            <h3 className="text-lg font-bold text-emerald-950 dark:text-white font-serif">{featuredCourse.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{featuredCourse.description}</p>
            <div className="flex items-center space-x-4 pt-2">
              <button 
                onClick={() => onSelectTab('academy')}
                className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs"
              >
                Enroll Free & Start Learning
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Latest Articles Blog */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-white">Latest Islamic Blog Articles</h2>
          <button onClick={() => onSelectTab('blog')} className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline">
            Visit Blog Hub →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <div 
              key={post.id}
              onClick={() => onSelectTab('blog')}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden shadow-sm hover:border-amber-400 transition-all cursor-pointer group"
            >
              <img src={post.coverImage} alt={post.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <h3 className="font-bold text-emerald-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 font-serif">{post.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>
                <p className="text-[11px] text-slate-400 pt-1">By {post.author} • {post.readTimeMinutes} min read</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
