import { DownloadItem, ProductItem } from '../types';

export const DOWNLOADS_CENTER: DownloadItem[] = [
  {
    id: 'dl-1',
    title: 'Complete Fortress of the Muslim (Hisn al-Muslim) PDF',
    type: 'Dua Booklet',
    fileSize: '4.2 MB',
    downloadUrl: '#download-hisn',
    thumbnail: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=400&q=80',
    description: 'Pocket-friendly PDF compilation of authentic daily morning, evening, prayer, and protection Duas.',
    downloadsCount: 14200
  },
  {
    id: 'dl-2',
    title: 'Ultimate Ramadan Planner & Habit Tracker 1448',
    type: 'Planner',
    fileSize: '8.5 MB',
    downloadUrl: '#download-ramadan-planner',
    thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=400&q=80',
    description: 'Printable 30-day Ramadan planner featuring daily Quran goals, meal logs, Laylat al-Qadr checklists, and Dua lists.',
    downloadsCount: 28900
  },
  {
    id: 'dl-3',
    title: 'Kids Islamic Activity & Prophet Stories Worksheet Set',
    type: 'Kids Worksheet',
    fileSize: '12.1 MB',
    downloadUrl: '#download-kids-worksheets',
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    description: 'Fun, illustrated coloring pages, Arabic alphabet mazes, and Prophet story quizzes designed for ages 5-12.',
    downloadsCount: 9400
  },
  {
    id: 'dl-4',
    title: 'HD Islamic Calligraphy Desktop & Phone Wallpapers Pack',
    type: 'Wallpaper',
    fileSize: '25.0 MB',
    downloadUrl: '#download-wallpapers',
    thumbnail: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=400&q=80',
    description: 'Set of 12 ultra-high resolution minimalist wallpapers featuring Ayatul Kursi, Bismillah, and Kaaba artwork.',
    downloadsCount: 18700
  }
];

export const MARKETPLACE_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'The Clear Quran (English Translation) Hardcover',
    authorOrVendor: 'Dr. Mustafa Khattab / Bofferly Press',
    price: 24.99,
    originalPrice: 29.99,
    type: 'Book',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=400&q=80',
    description: 'The thematic, crystal-clear English translation of the Holy Quran praised worldwide for legibility and accuracy.'
  },
  {
    id: 'prod-2',
    title: 'Orthopedic Extra-Padded Memory Foam Prayer Mat',
    authorOrVendor: 'Safa Comforts',
    price: 39.99,
    originalPrice: 49.99,
    type: 'Prayer Mat',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=400&q=80',
    description: 'Joint-friendly thick memory foam Sajadah designed to reduce knee and back pressure during long Qiyam prayers.'
  },
  {
    id: 'prod-3',
    title: 'Seerah Boxset: The Sealed Nectar (Ar-Raheeq Al-Makhtum)',
    authorOrVendor: 'Safiur Rahman Mubarakpuri',
    price: 32.00,
    originalPrice: 38.00,
    type: 'Book',
    rating: 4.95,
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    description: 'Award-winning complete biography of Prophet Muhammad ﷺ in deluxe hardcover binding.'
  },
  {
    id: 'prod-4',
    title: 'Organic Pure Taif Rose & Black Musk Attar (12ml)',
    authorOrVendor: 'Bofferly Fragrances',
    price: 18.50,
    originalPrice: 22.00,
    type: 'Attar/Perfume',
    rating: 4.85,
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=400&q=80',
    description: '100% alcohol-free concentrated oil perfume handcrafted with pure Taif roses and natural musk notes.'
  }
];
