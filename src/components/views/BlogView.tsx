import React, { useState } from 'react';
import { FileText, User, Calendar, Clock, Share2, Tag, Bookmark, Check } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogData';
import { BlogPost } from '../../types';
import { SEOJsonLd } from '../SEOJsonLd';

export const BlogView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = [
    'All',
    'Aqeedah',
    'Quran',
    'Hadith',
    'Fiqh',
    'Islamic History',
    'Seerah',
    'Islamic News',
    'Family & Marriage',
    'Parenting',
    'Ramadan',
    'Hajj & Umrah',
    'Business & Finance',
    'Current Issues'
  ];

  const filteredPosts = BLOG_POSTS.filter(p => selectedCategory === 'All' || p.category === selectedCategory);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
          <FileText className="w-3.5 h-3.5" />
          <span>Verified Islamic Knowledge & Contemporary Insights</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
          Bofferly Islamic Editorial Blog
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
          Deep dives into Aqeedah, Fiqh rulings, family life, Islamic finance, parenting guidance, and contemporary Muslim issues.
        </p>
      </div>

      {/* 13 Blog Categories Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-400 text-emerald-950 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-emerald-100 dark:border-slate-800 hover:border-amber-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article 
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden shadow-sm hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative overflow-hidden h-48">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 left-3 bg-amber-400 text-emerald-950 font-bold text-[10px] px-2.5 py-1 rounded-full shadow">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTimeMinutes} min</span>
                </div>

                <h3 className="font-bold text-lg font-serif text-emerald-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex flex-wrap gap-1">
              {post.tags.map((t, idx) => (
                <span key={idx} className="text-[10px] bg-emerald-50 dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">
                  #{t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <SEOJsonLd 
            type="Article" 
            title={activeArticle.title} 
            description={activeArticle.excerpt} 
            author={activeArticle.author} 
            datePublished={activeArticle.publishedDate} 
          />

          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white max-w-3xl w-full rounded-2xl p-6 sm:p-8 border border-emerald-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b pb-3 border-emerald-100 dark:border-slate-800">
              <span className="bg-amber-400 text-emerald-950 font-bold text-xs px-3 py-1 rounded-full">
                {activeArticle.category}
              </span>
              <button onClick={() => setActiveArticle(null)} className="text-sm font-bold text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-emerald-950 dark:text-amber-300 leading-snug">
                {activeArticle.title}
              </h2>

              <div className="flex items-center space-x-4 text-xs text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span>By <strong>{activeArticle.author}</strong></span>
                <span>•</span>
                <span>Published {activeArticle.publishedDate}</span>
                <span>•</span>
                <span>{activeArticle.readTimeMinutes} min read</span>
              </div>
            </div>

            <img src={activeArticle.coverImage} alt={activeArticle.title} className="w-full h-64 object-cover rounded-2xl shadow" />

            <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-4 whitespace-pre-line font-serif">
              {activeArticle.content}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyLink}
                  className="bg-emerald-900 text-amber-300 text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
