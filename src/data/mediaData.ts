import { NasheedTrack, Scholar, Lecture, PodcastEpisode } from '../types';

export const SCHOLARS: Scholar[] = [
  {
    id: 's-1',
    name: 'Mufti Ismail Menk',
    title: 'Grand Mufti of Zimbabwe & Renowned Speaker',
    bio: 'Global Islamic scholar recognized for motivational lectures on character, mental well-being, and family harmony.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    location: 'Zimbabwe / Global'
  },
  {
    id: 's-2',
    name: 'Dr. Yasir Qadhi',
    title: 'Resident Scholar & Dean of Islamic Studies',
    bio: 'Renowned authority in Seerah, Aqeedah, and contemporary Islamic thought with degrees from Medina University and Yale.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    location: 'Texas, USA'
  },
  {
    id: 's-3',
    name: 'Nouman Ali Khan',
    title: 'Founder of Bayyinah Institute',
    bio: 'Specialist in Quranic Arabic linguistics, providing accessible, deep thematic insights into Quranic surahs.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    location: 'Texas, USA'
  },
  {
    id: 's-4',
    name: 'Dr. Omar Suleiman',
    title: 'Founder & President of Yaqeen Institute',
    bio: 'Scholar, activist, and adjunct professor of Islamic Studies advocating social justice and faith inspiration.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    location: 'Texas, USA'
  }
];

export const NASHEEDS: NasheedTrack[] = [
  {
    id: 'n-1',
    title: 'Tala\'a al-Badru \'Alayna',
    artist: 'Traditional / Various Artists',
    language: 'Arabic',
    duration: '03:45',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverArt: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=400&q=80',
    lyrics: `طلع البدر علينا ... من ثنيات الوداع
وجب الشكر علينا ... ما دعا لله داع
أيها المبعوث فينا ... جئت بالأمر المطاع

The full moon has risen upon us from the valley of Wada!
Gratitude is obligatory upon us as long as a caller calls unto Allah!
O you sent among us, you have brought a command to be obeyed!`,
    downloadable: true
  },
  {
    id: 'n-2',
    title: 'Hasbi Rabbi Jallallah',
    artist: 'Sami Yusuf',
    language: 'English',
    duration: '04:12',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverArt: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=400&q=80',
    lyrics: `Hasbi Rabbi jallallah, Ma fi qalbi ghayrullah,
Noor Muhammad sallallah, La ilaha illallah.

My Lord is enough for me, Glorious is Allah!
There is nothing in my heart except Allah!`,
    downloadable: true
  },
  {
    id: 'n-3',
    title: 'Mawlaya Salli wa Sallim',
    artist: 'Maher Zain',
    language: 'Arabic',
    duration: '04:50',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverArt: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    lyrics: `مولاي صلي وسلم دائماً أبداً
على حبيبك خير الخلق كلهم

My Master, send peace and blessings continuously forever upon Your Beloved, the best of all creation!`,
    downloadable: true
  }
];

export const LECTURES: Lecture[] = [
  {
    id: 'l-1',
    title: 'Finding Inner Peace in Times of Anxiety',
    scholarName: 'Mufti Ismail Menk',
    scholarId: 's-1',
    topic: 'Mental Wellbeing & Sabr',
    duration: '35:20',
    type: 'audio',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    date: '2026-06-15'
  },
  {
    id: 'l-2',
    title: 'Detailed Seerah: Lessons from the Migration (Hijrah)',
    scholarName: 'Dr. Yasir Qadhi',
    scholarId: 's-2',
    topic: 'Seerah Studies',
    duration: '52:10',
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    date: '2026-05-20'
  },
  {
    id: 'l-3',
    title: 'The Literary Miracle of Surah Al-Kahf',
    scholarName: 'Nouman Ali Khan',
    scholarId: 's-3',
    topic: 'Tafsir & Arabic',
    duration: '45:00',
    type: 'audio',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    date: '2026-07-01'
  }
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'p-1',
    seriesTitle: 'The Bofferly Seerah Podcast',
    episodeNumber: 1,
    title: 'The World Before the Prophet ﷺ',
    duration: '28:15',
    description: 'An exploration of the socio-political climate in Arabia, Persia, and Rome prior to the dawn of Islam.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    publishedDate: '2026-07-10'
  },
  {
    id: 'p-2',
    seriesTitle: 'Islamic History Rediscovered',
    episodeNumber: 14,
    title: 'Golden Age of Islamic Medicine & Ibn Sina',
    duration: '34:40',
    description: 'How classical Muslim polymaths established hospitals, surgical tools, and medical encyclopedias.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    publishedDate: '2026-07-18'
  }
];
