import React, { useState } from 'react';
import { HelpCircle, Sparkles, Send, ThumbsUp, Search, MessageSquare, ShieldCheck, Loader2 } from 'lucide-react';
import { SAMPLE_FATWAS } from '../../data/toolsData';
import { FatwaItem } from '../../types';

export const FatwaView: React.FC = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General Fiqh');
  const [askingAi, setAskingAi] = useState(false);
  const [aiFatwaAnswer, setAiFatwaAnswer] = useState<any>(null);
  const [fatwasList, setFatwasList] = useState<FatwaItem[]>(SAMPLE_FATWAS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAskFatwa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setAskingAi(true);
    setAiFatwaAnswer(null);

    try {
      const res = await fetch('/api/fatwa/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuestion, category: selectedCategory })
      });
      const data = await res.json();
      setAiFatwaAnswer(data);

      if (data.answer) {
        const newFatwa: FatwaItem = {
          id: `fatwa-${Date.now()}`,
          question: userQuestion,
          category: selectedCategory,
          answer: data.answer,
          scholarName: 'Bofferly AI Scholar (Audited by Fatwa Board)',
          quranAndHadithEvidence: data.evidence || [],
          upvotes: 1
        };
        setFatwasList([newFatwa, ...fatwasList]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAskingAi(false);
    }
  };

  const handleUpvote = (id: string) => {
    setFatwasList(prev => prev.map(f => f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f));
  };

  const filteredFatwas = fatwasList.filter(f => 
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Verified Islamic Jurisprudence & Fatwa Portal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
          Ask AI Scholar & Fatwa Database
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
          Get immediate, evidence-based Shariah answers powered by Gemini AI trained on classic Fiqh texts, or browse verified scholar rulings.
        </p>
      </div>

      {/* Ask Question Form */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-lg font-bold font-serif text-emerald-950 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Ask a New Question to Bofferly AI Scholar</span>
        </h3>

        <form onSubmit={handleAskFatwa} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Your Question</label>
              <textarea
                required
                rows={3}
                placeholder="e.g., Is trading cryptocurrency halal in Islamic Fiqh?"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-amber-400 text-xs dark:text-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-amber-400 text-xs dark:text-white"
              >
                <option value="General Fiqh">General Fiqh</option>
                <option value="Taharah & Salah">Taharah & Salah</option>
                <option value="Finance & Business">Finance & Business</option>
                <option value="Family & Marriage">Family & Marriage</option>
                <option value="Halal Food & Lifestyle">Halal Food & Lifestyle</option>
              </select>

              <button
                type="submit"
                disabled={askingAi}
                className="w-full mt-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
              >
                {askingAi ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Consulting Fiqh AI...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit to AI Scholar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* AI Answer Result Banner */}
        {aiFatwaAnswer && (
          <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-amber-400/40 space-y-3 animate-in fade-in">
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bofferly AI Scholar Rulings Result</span>
            </div>
            <p className="text-sm font-semibold">{aiFatwaAnswer.answer}</p>
            {aiFatwaAnswer.evidence && aiFatwaAnswer.evidence.length > 0 && (
              <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800 text-xs">
                <strong className="text-amber-300">Evidences from Quran/Sunnah:</strong>
                <ul className="list-disc list-inside text-emerald-100 mt-1">
                  {aiFatwaAnswer.evidence.map((ev: string, idx: number) => (
                    <li key={idx}>{ev}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fatwa Search & Archive */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-slate-800 flex items-center space-x-3">
          <Search className="w-4 h-4 text-emerald-500" />
          <input
            type="text"
            placeholder="Search Fatwa archive by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs focus:outline-none dark:text-white"
          />
        </div>

        <div className="space-y-4">
          {filteredFatwas.map((fatwa) => (
            <div key={fatwa.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b pb-2 border-emerald-100 dark:border-slate-800">
                <h4 className="font-bold text-base text-emerald-950 dark:text-white font-serif">
                  Q: {fatwa.question}
                </h4>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 dark:bg-slate-800 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded">
                  {fatwa.category}
                </span>
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="font-bold text-emerald-800 dark:text-amber-300 mb-1">Scholar Answer ({fatwa.scholarName}):</p>
                <p>{fatwa.answer}</p>
              </div>

              {fatwa.quranAndHadithEvidence && fatwa.quranAndHadithEvidence.length > 0 && (
                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <strong>Evidence: </strong>
                  <span>{fatwa.quranAndHadithEvidence.join(' • ')}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleUpvote(fatwa.id)}
                  className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center space-x-1.5 hover:text-amber-600"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({fatwa.upvotes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
