import React from 'react';
import { Download, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { DOWNLOADS_CENTER } from '../../data/downloadsData';

export const DownloadsView: React.FC = () => {
  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
          <Download className="w-3.5 h-3.5" />
          <span>Printable PDFs, Planners & Wallpapers</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
          Bofferly Free Downloads Center
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
          High-quality printable Dua booklets, Ramadan habit trackers, kids Islamic activity sheets, and HD wallpapers.
        </p>
      </div>

      {/* Downloads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DOWNLOADS_CENTER.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800 p-6 shadow-sm space-y-4 hover:border-amber-400 transition-all flex flex-col justify-between">
            <div className="flex gap-4">
              <img src={item.thumbnail} alt={item.title} className="w-24 h-28 object-cover rounded-xl shadow" />
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold px-2 py-0.5 rounded">
                  {item.type} • {item.fileSize}
                </span>
                <h3 className="font-bold text-base font-serif text-emerald-950 dark:text-white leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{item.description}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Downloads: {item.downloadsCount.toLocaleString()}</span>
              <a
                href={item.downloadUrl}
                download
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Starting download for ${item.title}`);
                }}
                className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
