import React, { useState } from 'react';
import { Headphones, Play, Pause, Mic, Radio } from 'lucide-react';
import { NASHEEDS, LECTURES, PODCAST_EPISODES } from '../../data/mediaData';

export const MediaView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nasheeds' | 'lectures' | 'podcasts'>('nasheeds');
  const [activeAudioUrl, setActiveAudioUrl] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>('');
  const [activeArtist, setActiveArtist] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  const handlePlayMedia = (url: string, title: string, artist: string) => {
    if (audioObj) {
      audioObj.pause();
    }

    if (activeAudioUrl === url && isPlaying) {
      setIsPlaying(false);
      return;
    }

    const newAudio = new Audio(url);
    newAudio.play();
    setAudioObj(newAudio);
    setActiveAudioUrl(url);
    setActiveTitle(title);
    setActiveArtist(artist);
    setIsPlaying(true);

    newAudio.onended = () => {
      setIsPlaying(false);
    };
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
          <Headphones className="w-3.5 h-3.5" />
          <span>Halal Vocals & Islamic Knowledge Audios</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
          Islamic Audio & Media Library
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
          Vocals-only Nasheeds, scholarly lectures, Friday Khutbahs, and inspiring Islamic podcasts.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-emerald-200 dark:border-slate-800 pb-3">
        {[
          { id: 'nasheeds', label: '🎵 Vocals-Only Nasheeds', icon: <Headphones className="w-4 h-4" /> },
          { id: 'lectures', label: '🎙️ Scholarly Lectures', icon: <Mic className="w-4 h-4" /> },
          { id: 'podcasts', label: '📻 Islamic Podcasts', icon: <Radio className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
              activeTab === tab.id
                ? 'bg-amber-400 text-emerald-950 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-emerald-100 dark:border-slate-800 hover:border-amber-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Media Player Sticky Bar */}
      {activeAudioUrl && (
        <div className="sticky top-20 z-30 bg-emerald-950 text-white p-4 rounded-2xl border border-amber-400/40 shadow-2xl flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 font-bold flex items-center justify-center">
              🎵
            </div>
            <div>
              <p className="font-bold text-xs text-white truncate">{activeTitle}</p>
              <p className="text-[10px] text-amber-300">{activeArtist}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handlePlayMedia(activeAudioUrl, activeTitle, activeArtist)}
              className="p-3 rounded-full bg-amber-400 text-emerald-950 font-bold shadow hover:bg-amber-300"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Media Grid */}
      {activeTab === 'nasheeds' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NASHEEDS.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="bg-emerald-100 text-emerald-900 dark:bg-slate-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
                    {item.language}
                  </span>
                  <span className="text-slate-400 font-semibold">{item.duration}</span>
                </div>
                <h3 className="font-bold text-base font-serif text-emerald-950 dark:text-white">{item.title}</h3>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold">{item.artist}</p>
              </div>

              <button
                onClick={() => handlePlayMedia(item.audioUrl, item.title, item.artist)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors ${
                  activeAudioUrl === item.audioUrl && isPlaying
                    ? 'bg-amber-400 text-emerald-950'
                    : 'bg-emerald-900 text-amber-300 hover:bg-emerald-800'
                }`}
              >
                {activeAudioUrl === item.audioUrl && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{activeAudioUrl === item.audioUrl && isPlaying ? 'Pause Audio' : 'Listen Nasheed'}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'lectures' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LECTURES.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold px-2 py-0.5 rounded">
                    {item.topic}
                  </span>
                  <span className="text-slate-400 font-semibold">{item.duration}</span>
                </div>
                <h3 className="font-bold text-base font-serif text-emerald-950 dark:text-white">{item.title}</h3>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold">{item.scholarName}</p>
              </div>

              <button
                onClick={() => handlePlayMedia(item.mediaUrl, item.title, item.scholarName)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors ${
                  activeAudioUrl === item.mediaUrl && isPlaying
                    ? 'bg-amber-400 text-emerald-950'
                    : 'bg-emerald-900 text-amber-300 hover:bg-emerald-800'
                }`}
              >
                {activeAudioUrl === item.mediaUrl && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{activeAudioUrl === item.mediaUrl && isPlaying ? 'Pause Lecture' : 'Listen Lecture'}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'podcasts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PODCAST_EPISODES.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="bg-emerald-950 text-amber-300 font-bold px-2 py-0.5 rounded">
                    {item.seriesTitle} Ep #{item.episodeNumber}
                  </span>
                  <span className="text-slate-400 font-semibold">{item.duration}</span>
                </div>
                <h3 className="font-bold text-lg font-serif text-emerald-950 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <button
                onClick={() => handlePlayMedia(item.audioUrl, item.title, item.seriesTitle)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors ${
                  activeAudioUrl === item.audioUrl && isPlaying
                    ? 'bg-amber-400 text-emerald-950'
                    : 'bg-emerald-900 text-amber-300 hover:bg-emerald-800'
                }`}
              >
                {activeAudioUrl === item.audioUrl && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{activeAudioUrl === item.audioUrl && isPlaying ? 'Pause Episode' : 'Listen Episode'}</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
