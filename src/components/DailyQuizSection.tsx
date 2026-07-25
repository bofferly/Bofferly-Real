import React, { useState, useEffect } from 'react';
import { Flame, Trophy, CheckCircle, XCircle, HelpCircle, Award, Sparkles, RotateCcw, Brain, ChevronRight, BookOpen } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

const DAILY_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Which Surah in the Holy Quran is known as the 'Heart of the Quran'?",
    options: ["Surah Al-Fatihah", "Surah Yaseen", "Surah Al-Baqarah", "Surah Ar-Rahman"],
    correctIndex: 1,
    explanation: "Surah Yaseen (36th chapter) is traditionally called the 'Heart of the Quran' due to its central themes of Tawhid, Risalah, and Akhirah.",
    topic: "Quran"
  },
  {
    id: 2,
    question: "How many major Hadith books constitute 'Kutub al-Sittah' (The Six Books)?",
    options: ["4", "5", "6", "7"],
    correctIndex: 2,
    explanation: "Kutub al-Sittah comprises Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawood, Jami' at-Tirmidhi, Sunan an-Nasa'i, and Sunan Ibn Majah.",
    topic: "Hadith"
  },
  {
    id: 3,
    question: "In which year of Hijrah was fasting in the month of Ramadan made obligatory?",
    options: ["1st Year", "2nd Year", "3rd Year", "5th Year"],
    correctIndex: 1,
    explanation: "Fasting during Ramadan was enjoined on Muslims in the 2nd year after Hijrah (624 CE) in Madinah.",
    topic: "Seerah & Fiqh"
  },
  {
    id: 4,
    question: "What is the primary topic discussed in Surah Al-Ikhlas?",
    options: ["Patience", "Absolute Monotheism (Tawhid)", "Day of Judgment", "Charity"],
    correctIndex: 1,
    explanation: "Surah Al-Ikhlas affirms the absolute oneness and uniqueness of Allah (Tawhid) and equals one-third of the Quran in reward.",
    topic: "Quranic Knowledge"
  },
  {
    id: 5,
    question: "Which Companion (Sahabi) was known as 'Saifullah' (The Sword of Allah)?",
    options: ["Ali ibn Abi Talib (RA)", "Khalid ibn al-Walid (RA)", "Umar ibn al-Khattab (RA)", "Hamza ibn Abdul-Muttalib (RA)"],
    correctIndex: 1,
    explanation: "The Prophet Muhammad ﷺ gave the honorable title 'Saifullah' (Sword of Allah) to Khalid ibn al-Walid (RA).",
    topic: "Islamic History"
  }
];

export const DailyQuizSection: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(DAILY_QUESTIONS.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Streak State
  const [streak, setStreak] = useState(0);
  const [completedToday, setCompletedToday] = useState(false);

  // Load Streak from localStorage
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const savedLastDate = localStorage.getItem('bofferly_quiz_last_date');
    const savedStreak = parseInt(localStorage.getItem('bofferly_quiz_streak') || '0', 10);

    if (savedLastDate === todayStr) {
      setCompletedToday(true);
      setStreak(savedStreak);
    } else if (savedLastDate) {
      const lastDate = new Date(savedLastDate);
      const todayDate = new Date(todayStr);
      const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        setStreak(savedStreak);
      } else if (diffDays > 1) {
        setStreak(0); // streak broken
      }
    } else {
      setStreak(0);
    }
  }, []);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing after selection
    setSelectedOption(index);

    const updated = [...userAnswers];
    updated[currentQuestionIndex] = index;
    setUserAnswers(updated);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < DAILY_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(userAnswers[currentQuestionIndex + 1]);
    } else {
      // Finish Quiz
      let calculatedScore = 0;
      DAILY_QUESTIONS.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctIndex) {
          calculatedScore += 1;
        }
      });
      setScore(calculatedScore);
      setIsSubmitted(true);

      // Update streak
      const todayStr = new Date().toISOString().split('T')[0];
      const savedLastDate = localStorage.getItem('bofferly_quiz_last_date');
      let newStreak = streak;

      if (savedLastDate !== todayStr) {
        newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('bofferly_quiz_streak', newStreak.toString());
        localStorage.setItem('bofferly_quiz_last_date', todayStr);
        setCompletedToday(true);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setUserAnswers(Array(DAILY_QUESTIONS.length).fill(null));
    setIsSubmitted(false);
    setScore(0);
  };

  const currentQ = DAILY_QUESTIONS[currentQuestionIndex];
  const isAnswered = selectedOption !== null;

  return (
    <div className="bg-emerald-950/80 backdrop-blur-md text-white p-6 sm:p-8 rounded-3xl border border-emerald-800/40 shadow-2xl space-y-6">
      
      {/* Quiz Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/50 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-amber-400/10 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            <span>Daily Islamic Knowledge Challenge</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-sans">
            Test Your Knowledge & Earn Rewards
          </h2>
        </div>

        {/* Streak Counter Badge */}
        <div className="flex items-center space-x-3 bg-black/40 px-4 py-2 rounded-2xl border border-emerald-800/80 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-amber-300">Daily Streak</p>
            <p className="text-sm font-extrabold text-white">{streak} {streak === 1 ? 'Day' : 'Days'} 🔥</p>
          </div>
        </div>
      </div>

      {/* QUIZ COMPLETED SUMMARY VIEW */}
      {isSubmitted ? (
        <div className="py-6 text-center space-y-6 animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-amber-400/20 border-2 border-amber-400/50 text-amber-300 rounded-full flex items-center justify-center mx-auto shadow-xl">
            <Trophy className="w-10 h-10 text-amber-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white">
              Mashallah! Quiz Completed
            </h3>
            <p className="text-sm text-emerald-200">
              You scored <span className="font-extrabold text-amber-300 text-lg">{score}</span> out of <span className="font-bold text-white">{DAILY_QUESTIONS.length}</span> questions correctly!
            </p>
            {completedToday && (
              <p className="text-xs text-amber-400 font-bold bg-amber-400/10 inline-block px-3 py-1 rounded-full border border-amber-400/30">
                🎉 Your daily streak is now {streak} {streak === 1 ? 'day' : 'days'}!
              </p>
            )}
          </div>

          {/* Breakdown Review of Answers */}
          <div className="bg-black/30 p-4 sm:p-6 rounded-2xl border border-emerald-800/60 text-left space-y-4 max-h-80 overflow-y-auto scrollbar-thin">
            <h4 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">Answer Review</h4>
            {DAILY_QUESTIONS.map((q, idx) => {
              const uAns = userAnswers[idx];
              const isCorrect = uAns === q.correctIndex;
              return (
                <div key={q.id} className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/40 space-y-1.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-white">{idx + 1}. {q.question}</p>
                    {isCorrect ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold flex items-center gap-1 shrink-0">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                  <p className="text-emerald-200/90">
                    <strong className="text-amber-300">Answer:</strong> {q.options[q.correctIndex]}
                  </p>
                  <p className="text-[11px] text-emerald-300/70 italic">{q.explanation}</p>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-full text-xs transition-all shadow-md inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      ) : (
        /* ACTIVE QUESTION VIEW */
        <div className="space-y-6">
          
          {/* Progress Bar & Question Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-200">
              <span>Question <strong>{currentQuestionIndex + 1}</strong> of <strong>{DAILY_QUESTIONS.length}</strong></span>
              <span className="bg-emerald-900/80 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-700/50 text-[10px]">
                Topic: {currentQ.topic}
              </span>
            </div>
            
            <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-emerald-800/60">
              <div 
                className="bg-amber-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / DAILY_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/50">
            <h3 className="text-base sm:text-lg font-bold text-white font-sans leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Answer Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === currentQ.correctIndex;

              let btnClass = "bg-emerald-900/40 border-emerald-800/60 text-white hover:bg-emerald-800/60 hover:border-amber-400/50";
              if (isAnswered) {
                if (isCorrect) {
                  btnClass = "bg-emerald-600 text-white border-emerald-400 font-bold ring-2 ring-emerald-400/50";
                } else if (isSelected) {
                  btnClass = "bg-rose-900/80 text-rose-100 border-rose-500 font-bold";
                } else {
                  btnClass = "bg-emerald-950/40 border-emerald-900 text-emerald-400/50 opacity-50";
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 shadow-sm ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-200 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-300 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Visible after choosing option) */}
          {isAnswered && (
            <div className="bg-black/30 p-4 rounded-2xl border border-emerald-800/60 text-xs space-y-1 animate-in fade-in duration-200">
              <p className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Knowledge Insight:</span>
              </p>
              <p className="text-emerald-100/90 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold rounded-full text-xs shadow-lg flex items-center space-x-2 transition-all active:scale-95"
              >
                <span>{currentQuestionIndex < DAILY_QUESTIONS.length - 1 ? 'Next Question' : 'View Quiz Results'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
