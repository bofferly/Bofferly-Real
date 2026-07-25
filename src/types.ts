export type NavigationTab = 
  | 'home'
  | 'quran'
  | 'hadith'
  | 'ramadan'
  | 'admin'
  | 'tools'
  | 'media'
  | 'mosques'
  | 'stories'
  | 'seerah'
  | 'fatwa'
  | 'academy'
  | 'blog'
  | 'downloads'
  | 'marketplace'
  | 'dashboard'
  | 'essential';

export type EssentialPageType = 
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'editorial'
  | 'sources'
  | 'donation';

export type BlogCategory = 
  | 'Aqeedah'
  | 'Quran'
  | 'Hadith'
  | 'Fiqh'
  | 'Islamic History'
  | 'Seerah'
  | 'Islamic News'
  | 'Family & Marriage'
  | 'Parenting'
  | 'Ramadan'
  | 'Hajj & Umrah'
  | 'Business & Finance'
  | 'Current Issues';

// Quran Types
export interface WordTranslation {
  arabic: string;
  transliteration: string;
  translation: string;
}

export interface Ayah {
  number: number; // overall or in surah
  numberInSurah: number;
  juz: number;
  arabicText: string;
  transliteration: string;
  englishTranslation: string;
  urduTranslation: string;
  words?: WordTranslation[];
  tafsirSummary?: string;
  audioUrl?: string;
}

export interface Surah {
  number: number;
  nameArabic: string;
  nameTransliterated: string;
  nameEnglish: string;
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
  juzStart: number;
  ayahs?: Ayah[];
}

export interface AudioReciter {
  id: string;
  name: string;
  arabicName: string;
  bitrate: string;
  style: string;
}

export interface QuranBookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  arabicSnippet: string;
  translationSnippet: string;
  timestamp: string;
  note?: string;
}

// Hadith Types
export interface HadithItem {
  id: string;
  collectionId: 'bukhari' | 'muslim' | 'abudawood' | 'tirmidhi' | 'nasai' | 'ibnmajah';
  collectionName: string;
  bookNumber: number;
  bookName: string;
  hadithNumber: string;
  arabicText: string;
  englishText: string;
  narrator: string;
  grade: 'Sahih' | 'Hasan' | 'Da\'if';
  topics: string[];
}

export interface HadithBook {
  id: string;
  name: string;
  arabicName: string;
  totalHadiths: number;
  author: string;
  description: string;
}

// Blog Article Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  author: string;
  date: string;
  readTimeMinutes: number;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  featured?: boolean;
}

// Prayer & Tools
export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  qiyam?: string;
  location: string;
  dateHijri: string;
  dateGregorian: string;
}

export interface MosqueFacility {
  wudu: boolean;
  womenArea: boolean;
  parking: boolean;
  wheelchair: boolean;
  library: boolean;
  classes: boolean;
}

export interface Mosque {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  facilities: MosqueFacility;
  jumuahTime: string;
  dailyPrayerTimes: Partial<PrayerTimes>;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  imageUrl: string;
  lat: number;
  lng: number;
}

export interface DuaItem {
  id: string;
  title: string;
  category: string;
  arabicText: string;
  transliteration: string;
  englishTranslation: string;
  reference: string;
  audioUrl?: string;
  benefit?: string;
}

export interface PackingItem {
  id: string;
  category: 'Documents' | 'Clothing' | 'Hygiene' | 'Medication' | 'Spiritual' | 'Miscellaneous';
  name: string;
  checked: boolean;
}

// Media Types
export interface NasheedTrack {
  id: string;
  title: string;
  artist: string;
  language: 'Arabic' | 'English' | 'Urdu' | 'Turkish' | 'Malay';
  duration: string;
  audioUrl: string;
  coverArt: string;
  lyrics?: string;
  downloadable: boolean;
}

export interface Scholar {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
}

export interface Lecture {
  id: string;
  title: string;
  scholarName: string;
  scholarId: string;
  topic: string;
  duration: string;
  type: 'audio' | 'video';
  mediaUrl: string;
  youtubeId?: string;
  date: string;
}

export interface PodcastEpisode {
  id: string;
  seriesTitle: string; // e.g. "Seerah Series" | "Weekly Wisdom"
  episodeNumber: number;
  title: string;
  duration: string;
  description: string;
  audioUrl: string;
  publishedDate: string;
}

// Stories & Seerah Types
export interface ProphetStory {
  id: string;
  prophetName: string;
  title: string;
  summary: string;
  fullStory: string;
  quranicVerses: string[];
  keyLessons: string[];
  coverImage: string;
}

export interface SahabahStory {
  id: string;
  name: string;
  title: string;
  titleArabic: string;
  summary: string;
  fullStory: string;
  virtues: string[];
  coverImage: string;
}

export interface SeerahEvent {
  yearHijri: number;
  yearGregorian: number;
  period: 'Makkah' | 'Madinah';
  title: string;
  description: string;
  significance: string;
}

export interface SeerahBattle {
  id: string;
  name: string;
  year: string;
  location: string;
  muslimsCount: string;
  opponentsCount: string;
  keyEvents: string[];
  outcome: string;
  lessons: string[];
}

// Fatwa & Q&A
export interface FatwaQuestion {
  id: string;
  question: string;
  userCategory?: string;
  category?: string;
  askedBy?: string;
  date?: string;
  answer: string;
  scholarName: string;
  citations?: string[];
  quranAndHadithEvidence?: string[];
  upvotes: number;
  status?: 'answered' | 'pending';
}
export type FatwaItem = FatwaQuestion;

// Academy & Courses
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  videoDuration: string;
  videoUrl?: string;
  readingContent: string;
  quiz?: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  category: 'Quran' | 'Tajweed' | 'Aqeedah' | 'Fiqh' | 'Arabic' | 'Seerah' | 'Hadith';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  durationHours: number;
  modulesCount: number;
  rating: number;
  enrolledStudents: number;
  thumbnail: string;
  description: string;
  modules: CourseModule[];
}
export type CourseItem = Course;

export interface DownloadItem {
  id: string;
  title: string;
  type: 'PDF Book' | 'Planner' | 'Wallpaper' | 'Kids Worksheet' | 'Dua Booklet';
  fileSize: string;
  downloadUrl: string;
  thumbnail: string;
  description: string;
  downloadsCount: number;
}

export interface ProductItem {
  id: string;
  title: string;
  authorOrVendor: string;
  price: number;
  originalPrice?: number;
  type: 'Book' | 'Digital Course' | 'Islamic Art' | 'Attar/Perfume' | 'Prayer Mat';
  rating: number;
  imageUrl: string;
  description: string;
}

export interface UserSavedData {
  bookmarks: QuranBookmark[];
  savedHadiths: HadithItem[];
  savedArticles: BlogPost[];
  completedCourseModuleIds: string[];
  readingHistory: { title: string; type: string; date: string }[];
}
