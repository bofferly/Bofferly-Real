import { DuaItem, PackingItem } from '../types';

export const DUAS_COLLECTION: DuaItem[] = [
  {
    id: 'dua-1',
    title: 'Morning Supplication (When Waking Up)',
    category: 'Daily Life',
    arabicText: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdu lillahil-lathee ahyana ba\'da ma amatana wa ilaihin-nusoor',
    englishTranslation: 'All praise is for Allah who gave us life after having taken it away from us and unto Him is the resurrection.',
    reference: 'Sahih al-Bukhari 6312',
    benefit: 'Expresses gratitude for a new day of life and remembers the Akhirah.'
  },
  {
    id: 'dua-2',
    title: 'Supplication for Guidance & Taqwa',
    category: 'Spiritual',
    arabicText: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    transliteration: 'Allāhumma innī as\'alukal-hudā wat-tuqā wal-\'afāfa wal-ghinā',
    englishTranslation: 'O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.',
    reference: 'Sahih Muslim 2721',
    benefit: 'Comprehensive Prayer encompassing spiritual purity and independence.'
  },
  {
    id: 'dua-3',
    title: 'Dua for Anxiety & Distress (Ayat Karima)',
    category: 'Distress',
    arabicText: 'لاَ إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa anta subhanaka inni kuntu minaz-zalimin',
    englishTranslation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    reference: 'Quran 21:87 (Dua of Prophet Yunus AS)',
    benefit: 'Removes hardship and anxiety when recited sincerely.'
  },
  {
    id: 'dua-4',
    title: 'Dua Before Eating',
    category: 'Food & Drink',
    arabicText: 'بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ',
    transliteration: 'Bismillah',
    englishTranslation: 'In the Name of Allah.',
    reference: 'Sunan Abu Dawood 3767',
    benefit: 'Brings barakah (blessings) to food and prevents Shaytan from sharing.'
  },
  {
    id: 'dua-5',
    title: 'Dua for Parents',
    category: 'Family',
    arabicText: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbir-hamhuma kama rabbayani sagheera',
    englishTranslation: 'My Lord, have mercy upon them both as they brought me up when I was small.',
    reference: 'Quran 17:24',
    benefit: 'Quranic supplication for parents\' wellbeing and forgiveness.'
  }
];

export const HAJJ_UMRAH_PACKING: PackingItem[] = [
  { id: 'p1', category: 'Spiritual', name: 'Ihram Garments (2 Unsewn White Sheets for Men)', checked: false },
  { id: 'p2', category: 'Documents', name: 'Passport, Visa & Flight Tickets Copy', checked: false },
  { id: 'p3', category: 'Spiritual', name: 'Pocket Quran & Hisn al-Muslim Dua Book', checked: false },
  { id: 'p4', category: 'Clothing', name: 'Comfortable Walking Shoes & Flip-flops for Wudu', checked: false },
  { id: 'p5', category: 'Hygiene', name: 'Unscented Soap, Shampoo & Sunscreen (for Ihram)', checked: false },
  { id: 'p6', category: 'Medication', name: 'First Aid Kit, Painkillers & Personal Prescription Meds', checked: false },
  { id: 'p7', category: 'Miscellaneous', name: 'Unbreakable Water Bottle & Power Bank', checked: false }
];

export const ISLAMIC_EVENTS = [
  { dateHijri: '1 Muharram 1448', event: 'Islamic New Year', description: 'Beginning of the Hijri year.' },
  { dateHijri: '10 Muharram 1448', event: 'Day of Ashura', description: 'Fasting recommended; day Musa (AS) was saved from Pharaoh.' },
  { dateHijri: '12 Rabi\' al-Awwal', event: 'Seerah Commemoration', description: 'Reflecting on the birth and legacy of Prophet Muhammad ﷺ.' },
  { dateHijri: '27 Rajab', event: 'Isra & Mi\'raj', description: 'Commemorating the miraculous Night Journey.' },
  { dateHijri: '1 Ramadan', event: 'First Day of Fasting', description: 'Beginning of the holy month of Ramadan.' },
  { dateHijri: '27 Ramadan', event: 'Laylat al-Qadr (Night of Power)', description: 'Better than a thousand months.' },
  { dateHijri: '1 Shawwal', event: 'Eid al-Fitr', description: 'Festival of Breaking the Fast.' },
  { dateHijri: '9 Dhul-Hijjah', event: 'Day of Arafah', description: 'Pinnacle of Hajj; fasting recommended for non-pilgrims.' },
  { dateHijri: '10 Dhul-Hijjah', event: 'Eid al-Adha', description: 'Feast of Sacrifice.' }
];

export const SAMPLE_FATWAS = [
  {
    id: 'fatwa-1',
    question: 'What is the ruling on stock market investments and ETF trading in Islamic Fiqh?',
    category: 'Finance & Business',
    answer: 'Investing in stocks is permissible (Halal) provided three conditions are met: 1) The core business activity must be Shariah-compliant (no interest-banking, alcohol, gambling, or pork), 2) Total interest-bearing debt must not exceed 33% of market cap, and 3) Any non-compliant income (<5%) must be purified and donated to charity.',
    scholarName: 'International Islamic Fiqh Academy',
    quranAndHadithEvidence: [
      'Surah Al-Baqarah 2:275: "Allah has permitted trade and forbidden interest."',
      'Sahih al-Bukhari #2054: "A time will come when people will not care how they earn wealth, whether lawfully or unlawfully."'
    ],
    upvotes: 342
  },
  {
    id: 'fatwa-2',
    question: 'Is it permissible to combine Dhuhr and Asr prayers while traveling long distances?',
    category: 'Taharah & Salah',
    answer: 'Yes, Jam\' (combining prayers) between Dhuhr and Asr, or Maghrib and Isha, as well as Qasr (shortening 4-rak\'ah prayers to 2 rak\'ahs) is an established Sunnah of Prophet Muhammad ﷺ for travelers traveling beyond 48 miles (80 km).',
    scholarName: 'Shaykh Ibn Uthaymeen & Permanent Committee',
    quranAndHadithEvidence: [
      'Surah An-Nisa 4:101: "And when you travel through the land, there is no blame upon you for shortening the prayer..."',
      'Sahih Muslim #705: "The Messenger of Allah ﷺ combined Dhuhr and Asr when traveling."'
    ],
    upvotes: 218
  },
  {
    id: 'fatwa-3',
    question: 'What constitutes valid Mahr (dowry) in Islamic Marriage (Nikah)?',
    category: 'Family & Marriage',
    answer: 'Mahr is an obligatory gift given by the groom to the bride as a symbol of commitment. It can be money, gold, real estate, or even teaching verses of the Quran. There is no minimum or maximum fixed by Shariah, but moderation and ease are highly praised in the Sunnah.',
    scholarName: 'Dar al-Ifta & Classical Fiqh Consensus',
    quranAndHadithEvidence: [
      'Surah An-Nisa 4:4: "And give the women [upon marriage] their marriage gifts graciously."',
      'Sunan Abu Dawood #2117: "The best dowry is that which is most easy to fulfill."'
    ],
    upvotes: 189
  }
];

