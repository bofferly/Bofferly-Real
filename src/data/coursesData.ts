import { Course } from '../types';

export const ACADEMY_COURSES: Course[] = [
  {
    id: 'course-tajweed',
    title: 'Mastering Quranic Tajweed & Recitation',
    category: 'Tajweed',
    level: 'Beginner',
    instructor: 'Shaykh Ahmad Al-Azhari',
    durationHours: 12,
    modulesCount: 4,
    rating: 4.9,
    enrolledStudents: 1420,
    thumbnail: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80',
    description: 'Learn foundational Tajweed rules including Makharij (articulation points), Noon Sakinah rules, Madd extensions, and proper Quranic pronunciation.',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Introduction to Makharij (Articulation Points)',
        description: 'Discover the 5 major areas of speech articulation in Arabic.',
        videoDuration: '25 mins',
        readingContent: `In Tajweed, Makharij al-Huroof refers to the specific physical locations in the mouth, throat, tongue, lips, and nasal cavity from which Arabic letters originate.

The 5 main Makharij areas:
1. Al-Jawf (The Empty Space in the mouth and throat) - Letters of Madd (ا, و, ي).
2. Al-Halq (The Throat) - 6 letters: ء , هـ , ع , ح , غ , خ.
3. Al-Lisan (The Tongue) - 18 letters originating from various parts of the tongue.
4. Ash-Shafatain (The Lips) - 4 letters: ب , م , و , ف.
5. Al-Khaishoom (The Nasal Cavity) - Origin of Ghunnah (nasal sound for Noon and Meem).`,
        quiz: [
          {
            id: 'q1',
            question: 'How many main areas of Makharij exist in Arabic Tajweed?',
            options: ['3', '5', '7', '10'],
            correctIndex: 1,
            explanation: 'The 5 main areas are Al-Jawf, Al-Halq, Al-Lisan, Ash-Shafatain, and Al-Khaishoom.'
          },
          {
            id: 'q2',
            question: 'Which area is responsible for the Ghunnah (nasal resonance)?',
            options: ['Al-Jawf', 'Al-Lisan', 'Al-Khaishoom', 'Ash-Shafatain'],
            correctIndex: 2,
            explanation: 'Al-Khaishoom is the nasal passage producing the Ghunnah sound.'
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Rules of Noon Sakinah & Tanween',
        description: 'Master Izhar, Idgham, Iqlab, and Ikhfa.',
        videoDuration: '30 mins',
        readingContent: `Noon Sakinah (نْ) and Tanween (ً ٍ ٌ) follow 4 core rules when followed by Arabic letters:

1. Izhar (Clear Pronunciation): When followed by throat letters (ء , هـ , ع , ح , غ , خ).
2. Idgham (Merging): When followed by letters of (يَرْمَلُون).
3. Iqlab (Conversion to Meem): When followed by letter Baa (ب).
4. Ikhfa (Concealment/Hiding): When followed by the remaining 15 letters.`,
        quiz: [
          {
            id: 'q3',
            question: 'What rule applies when Noon Sakinah is followed by letter Baa (ب)?',
            options: ['Izhar', 'Idgham', 'Iqlab', 'Ikhfa'],
            correctIndex: 2,
            explanation: 'Iqlab converts the Noon sound into a soft Meem with Ghunnah.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-aqeedah',
    title: 'Foundations of Islamic Aqeedah (Tawhid 101)',
    category: 'Aqeedah',
    level: 'Beginner',
    instructor: 'Dr. Yasir Qadhi',
    durationHours: 8,
    modulesCount: 3,
    rating: 4.95,
    enrolledStudents: 2890,
    thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&q=80',
    description: 'Comprehensive study of the 6 Pillars of Eeman: Belief in Allah, Angels, Divine Books, Messengers, Day of Judgment, and Divine Decree (Qadar).',
    modules: [
      {
        id: 'm-aq-1',
        title: 'Module 1: The Three Categories of Tawhid',
        description: 'Tawhid ar-Rububiyyah, Uluhiyyah, and Asma wa-Sifat.',
        videoDuration: '35 mins',
        readingContent: `Islamic Monotheism (Tawhid) is traditionally understood through 3 complementary dimensions:

1. Tawhid ar-Rububiyyah (Oneness of Lordship): Believing Allah alone is Creator, Provider, and Sustainer.
2. Tawhid al-Uluhiyyah (Oneness of Worship): Directing all acts of worship (prayer, du'a, sacrifice) exclusively to Allah.
3. Tawhid al-Asma wa-Sifat (Oneness of Names & Attributes): Affirming Allah's perfect divine names without distortion or physical comparison.`,
        quiz: [
          {
            id: 'q-aq-1',
            question: 'Directing all acts of prayer and du\'a solely to Allah belongs to which category?',
            options: ['Rububiyyah', 'Uluhiyyah', 'Asma wa-Sifat', 'Fiqh'],
            correctIndex: 1,
            explanation: 'Tawhid al-Uluhiyyah covers the Oneness of Worship.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-fiqh',
    title: 'Fiqh of Daily Worship & Purification',
    category: 'Fiqh',
    level: 'Beginner',
    instructor: 'Shaykh Omar Suleiman',
    durationHours: 10,
    modulesCount: 4,
    rating: 4.88,
    enrolledStudents: 1950,
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    description: 'Practical, easy-to-understand guide to Wudu, Ghusl, Tayammum, and performing Salah according to authentic Sunnah.',
    modules: [
      {
        id: 'm-fq-1',
        title: 'Module 1: The Conditions & Obligatory Acts of Wudu',
        description: 'Step-by-step guidance on complete purification.',
        videoDuration: '20 mins',
        readingContent: `Wudu requires 4 primary fard (obligatory) elements mentioned in Quran 5:6:
1. Washing the face from forehead to chin and ear to ear.
2. Washing hands and arms up to the elbows.
3. Wiping over the head.
4. Washing feet up to the ankles.

Sunnah additions include saying Bismillah, washing hands thrice, rinsing mouth and nose (Madmadah & Istinshaq), and maintaining sequence (Tartib).`,
        quiz: [
          {
            id: 'q-fq-1',
            question: 'Which Quranic verse details the 4 obligatory acts of Wudu?',
            options: ['Surah Al-Baqarah 2:255', 'Surah Al-Ma\'idah 5:6', 'Surah An-Nisa 4:43', 'Surah Al-Fatihah 1:1'],
            correctIndex: 1,
            explanation: 'Surah Al-Ma\'idah verse 6 lays down the obligations for purification.'
          }
        ]
      }
    ]
  }
];
