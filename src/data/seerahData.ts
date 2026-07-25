import { SeerahEvent, SeerahBattle } from '../types';

export const SEERAH_TIMELINE: SeerahEvent[] = [
  {
    yearHijri: -53,
    yearGregorian: 570,
    period: 'Makkah',
    title: 'Birth of Prophet Muhammad ﷺ (Year of the Elephant)',
    description: 'Born in Makkah to Aminah and Abdullah (who passed away before his birth). Raised by his grandfather Abdul Muttalib and later uncle Abu Talib.',
    significance: 'The dawn of the final guidance for all mankind.'
  },
  {
    yearHijri: -13,
    yearGregorian: 610,
    period: 'Makkah',
    title: 'First Divine Revelation in Cave Hira',
    description: 'Angel Jibreel descended with the first verses of Surah Al-Alaq ("Read in the name of your Lord who created"). Khadijah (RA) comforted the Prophet ﷺ.',
    significance: 'Beginning of Prophethood and the revelation of the Holy Quran.'
  },
  {
    yearHijri: -10,
    yearGregorian: 613,
    period: 'Makkah',
    title: 'Public Call to Islam at Mount Safa',
    description: 'The Prophet ﷺ gathered the Quraish clan at Mount Safa and openly invited them to worship Allah alone.',
    significance: 'Transition from secret dawah to open public call.'
  },
  {
    yearHijri: -3,
    yearGregorian: 620,
    period: 'Makkah',
    title: 'Year of Sorrow & Al-Isra wal-Mi\'raj',
    description: 'Passing of Khadijah (RA) and Abu Talib. Allah granted the miraculous Night Journey from Makkah to Jerusalem and Ascension to the Heavens, where 5 daily prayers were prescribed.',
    significance: 'Obligation of the 5 daily prayers.'
  },
  {
    yearHijri: 1,
    yearGregorian: 622,
    period: 'Madinah',
    title: 'The Great Migration (Hijrah) to Madinah',
    description: 'Prophet ﷺ and Abu Bakr (RA) migrated to Yathrib (Madinah). Established brotherhood between Muhajirun and Ansar and built Masjid an-Nabawi.',
    significance: 'Beginning of the Islamic Hijri Calendar and the first Islamic state.'
  },
  {
    yearHijri: 2,
    yearGregorian: 624,
    period: 'Madinah',
    title: 'Battle of Badr & Obligation of Fasting in Ramadan',
    description: '313 Muslims defeated 1,000 well-equipped Quraish warriors through divine aid.',
    significance: 'Decisive victory establishing Muslims as a formidable force.'
  },
  {
    yearHijri: 8,
    yearGregorian: 630,
    period: 'Madinah',
    title: 'Conquest of Makkah (Fath Makkah)',
    description: 'Muslims entered Makkah peacefully without bloodshed. Idols around the Kaaba were destroyed, and general amnesty was granted.',
    significance: 'Purification of the Kaaba and triumph of Monotheism.'
  },
  {
    yearHijri: 10,
    yearGregorian: 632,
    period: 'Madinah',
    title: 'Farewell Pilgrimage (Hajjat al-Wada\') & Passing',
    description: 'Prophet ﷺ delivered the Farewell Sermon emphasizing human equality, women\'s rights, and unity. Passed away at age 63 in Madinah.',
    significance: 'Completion of the religion of Islam.'
  }
];

export const MAJOR_BATTLES: SeerahBattle[] = [
  {
    id: 'badr',
    name: 'Battle of Badr (Ghazwat Badr)',
    year: '2 AH (624 CE)',
    location: 'Badr (130 km southwest of Madinah)',
    muslimsCount: '313 men, 2 horses',
    opponentsCount: '1,000 fully equipped warriors',
    keyEvents: ['Divine rain refreshed believers', 'Du\'a of the Prophet ﷺ in his tent', 'Angels sent down to assist'],
    outcome: 'Decisive Muslim Victory',
    lessons: ['Victories depend on faith and obedience, not sheer numbers.']
  },
  {
    id: 'uhud',
    name: 'Battle of Uhud',
    year: '3 AH (625 CE)',
    location: 'Mount Uhud (North of Madinah)',
    muslimsCount: '700 warriors',
    opponentsCount: '3,000 Meccan troops',
    keyEvents: ['Archers left their assigned post on Rumat hill', 'Martyrdom of Hamzah ibn Abdul-Muttalib (RA)', 'Prophet ﷺ wounded'],
    outcome: 'Tactical Test & Valuable Lessons',
    lessons: ['Strict adherence to leadership instructions is essential for success.']
  },
  {
    id: 'khandaq',
    name: 'Battle of the Trench (Ahzab)',
    year: '5 AH (627 CE)',
    location: 'Northern border of Madinah',
    muslimsCount: '3,000 Muslims',
    opponentsCount: '10,000 Confederates',
    keyEvents: ['Salman al-Farsi (RA) proposed digging a trench', 'Severe siege and bitter cold', 'Miraculous wind destroyed enemy camps'],
    outcome: 'Strategic Muslim Victory',
    lessons: ['Creative strategy combined with firm faith overcomes impossible odds.']
  }
];

export const CHARACTER_TRAITS = [
  { trait: 'Al-Ameen (The Trustworthy)', description: 'Known even before Prophethood for unmatched honesty and reliability among all tribes of Makkah.' },
  { trait: 'Mercy to All Creation', description: 'Showed gentleness to children, women, captives, animals, and even enemies.' },
  { trait: 'Extreme Humility', description: 'Mended his own shoes, milked goats, ate simple food, and sat among companions without artificial distinction.' },
  { trait: 'Unwavering Generosity', description: 'Gave away whatever came to his hands, never refusing a person in genuine need.' },
  { trait: 'Patience & Forgiveness', description: 'Forgave the people of Taif who stoned him, and granted general amnesty to the Quraish at Fath Makkah.' }
];
