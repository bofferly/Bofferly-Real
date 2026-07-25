import React, { useState } from 'react';
import { GraduationCap, Award, PlayCircle, CheckCircle2, Clock, Star, Sparkles, BookOpen } from 'lucide-react';
import { ACADEMY_COURSES } from '../../data/coursesData';
import { CourseItem } from '../../types';

export const AcademyView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [activeQuizQuestionIdx, setActiveQuizQuestionIdx] = useState(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Certificate Generator State
  const [studentName, setStudentName] = useState('');
  const [generatedCert, setGeneratedCert] = useState(false);

  const handleOptionSelect = (optionIdx: number) => {
    setSelectedOption(optionIdx);
  };

  const handleNextQuiz = () => {
    if (!selectedCourse) return;
    const currentQ = selectedCourse.quiz[activeQuizQuestionIdx];
    let newScore = quizScore || 0;
    if (selectedOption === currentQ.correctIndex) {
      newScore += 1;
    }
    setQuizScore(newScore);

    if (activeQuizQuestionIdx < selectedCourse.quiz.length - 1) {
      setActiveQuizQuestionIdx(activeQuizQuestionIdx + 1);
      setSelectedOption(null);
    } else {
      // Quiz complete
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Free Shariah & Tajweed Learning Platform</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
          Bofferly Islamic Academy
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
          Structured courses in Tajweed, Classical Arabic, Fiqh of Worship, Seerah, and Aqeedah with interactive quizzes and verifiable certificates.
        </p>
      </div>

      {/* Courses Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ACADEMY_COURSES.map((course) => (
          <div 
            key={course.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between"
          >
            <div className="relative">
              <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
              <span className="absolute top-3 right-3 bg-amber-400 text-emerald-950 font-bold text-[10px] px-2.5 py-1 rounded-full shadow">
                {course.level}
              </span>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">{course.instructor}</span>
                  <span className="text-amber-500 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{course.rating} ({course.enrolledStudents})</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold font-serif text-emerald-950 dark:text-white">{course.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{course.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.durationHours} Hours</span>
                </span>

                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setActiveQuizQuestionIdx(0);
                    setQuizScore(null);
                    setSelectedOption(null);
                    setGeneratedCert(false);
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Start Course & Take Quiz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Modal with Modules, Quiz & Certificate */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white max-w-3xl w-full rounded-2xl p-6 border border-emerald-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b pb-3 border-emerald-100 dark:border-slate-800">
              <h3 className="font-bold text-xl font-serif text-emerald-900 dark:text-amber-300">
                🎓 {selectedCourse.title}
              </h3>
              <button onClick={() => setSelectedCourse(null)} className="text-sm font-bold text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {/* Course Modules */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-emerald-950 dark:text-white font-serif">Curriculum Modules</h4>
              <div className="space-y-2">
                {selectedCourse.modules.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <PlayCircle className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{m.title}</span>
                    </div>
                    <span className="text-slate-400">{m.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Quiz Section */}
            <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-800 space-y-4">
              <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Knowledge Check Quiz</span>
              </h4>

              {quizScore !== null && activeQuizQuestionIdx >= selectedCourse.quiz.length - 1 ? (
                <div className="text-center py-4 space-y-3">
                  <Award className="w-12 h-12 text-amber-400 mx-auto" />
                  <p className="text-lg font-bold text-white">Quiz Completed!</p>
                  <p className="text-xs text-emerald-200">You scored {quizScore} out of {selectedCourse.quiz.length}</p>

                  {/* Certificate Form */}
                  <div className="bg-emerald-900 p-4 rounded-xl border border-emerald-700 max-w-md mx-auto space-y-2">
                    <p className="text-xs font-bold text-amber-300">Get Your Course Completion Certificate</p>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-2 bg-emerald-950 border border-emerald-700 text-xs rounded-lg text-white"
                    />
                    <button
                      onClick={() => setGeneratedCert(true)}
                      disabled={!studentName.trim()}
                      className="w-full bg-amber-400 text-emerald-950 font-bold py-2 rounded-lg text-xs"
                    >
                      Generate Printable Certificate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-emerald-100">
                    Question {activeQuizQuestionIdx + 1} of {selectedCourse.quiz.length}: {selectedCourse.quiz[activeQuizQuestionIdx].question}
                  </p>

                  <div className="space-y-2">
                    {selectedCourse.quiz[activeQuizQuestionIdx].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleOptionSelect(oIdx)}
                        className={`w-full p-3 rounded-xl text-left border transition-all ${
                          selectedOption === oIdx
                            ? 'bg-amber-400 text-emerald-950 font-bold border-amber-300'
                            : 'bg-emerald-900/80 border-emerald-800 text-emerald-100 hover:bg-emerald-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNextQuiz}
                    disabled={selectedOption === null}
                    className="w-full bg-amber-400 text-emerald-950 font-bold py-2.5 rounded-xl text-xs disabled:opacity-50"
                  >
                    Submit Answer & Continue
                  </button>
                </div>
              )}
            </div>

            {/* Generated Printable Certificate Preview */}
            {generatedCert && (
              <div className="bg-amber-50 dark:bg-slate-950 p-8 rounded-2xl border-4 border-amber-400 text-center space-y-4 text-emerald-950 dark:text-amber-100 shadow-2xl">
                <span className="text-4xl">☪️</span>
                <h2 className="text-2xl font-bold font-serif uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Certificate of Completion
                </h2>
                <p className="text-xs">This is proudly presented to</p>
                <p className="text-2xl font-black font-serif underline decoration-amber-400">{studentName}</p>
                <p className="text-xs max-w-md mx-auto">
                  For successfully passing all modules and examinations for <strong>{selectedCourse.title}</strong> at Bofferly Islamic Academy.
                </p>
                <div className="pt-4 flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 border-t border-amber-200 dark:border-slate-800">
                  <span>Issued by: Bofferly Academy Board</span>
                  <span>Verification Hash: #BOF-2026-CERT</span>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
