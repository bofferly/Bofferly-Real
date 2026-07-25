import React, { useState } from 'react';
import { NavigationTab, EssentialPageType } from '../types';
import { Mail, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: NavigationTab, subType?: EssentialPageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#021812] text-emerald-100 pt-12 pb-8 border-t border-emerald-900/50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Newsletter Signup Banner */}
        <div className="bg-emerald-950/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 mb-12 border border-emerald-800/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-amber-400 font-sans mb-2 flex items-center gap-2">
              <span>✉️ Subscribe to Bofferly Daily Inspiration</span>
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              Receive daily Quran verses, authentic Hadiths, prayer reminders, and newly published Islamic articles straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            {subscribed ? (
              <div className="flex items-center space-x-2 bg-amber-400 text-emerald-950 font-bold text-xs px-4 py-3 rounded-full shadow-lg">
                <CheckCircle2 className="w-4 h-4" />
                <span>JazakAllah Khair for subscribing!</span>
              </div>
            ) : (
              <>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 pr-4 py-2.5 bg-black/30 border border-emerald-800/60 text-white placeholder-emerald-400/60 text-xs rounded-full focus:outline-none focus:border-amber-400 w-full sm:w-64"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs px-6 py-2.5 rounded-full transition-colors shadow-lg active:scale-95"
                >
                  Join Newsletter
                </button>
              </>
            )}
          </form>
        </div>

        {/* Multi-column Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12 text-xs">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">☪️</span>
              <span className="text-2xl font-black text-white font-serif">Bofferly</span>
            </div>
            <p className="text-emerald-200/80 leading-relaxed text-xs">
              Bofferly is an authentic, all-in-one Islamic Knowledge Portal and Learning Academy. Designed to serve Muslims worldwide with verified Quranic texts, authentic Hadith collections, precise Prayer tools, and rich educational resources.
            </p>
            <div className="flex items-center space-x-2 text-amber-300 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authentic & Scholar-Reviewed Content</span>
            </div>
          </div>

          {/* Column 2: SEO Content Hubs */}
          <div>
            <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-3 font-serif">
              Content Hubs
            </h4>
            <ul className="space-y-2 text-emerald-200/90">
              <li><button onClick={() => onSelectTab('quran')} className="hover:text-amber-300 transition-colors">Quran Hub</button></li>
              <li><button onClick={() => onSelectTab('hadith')} className="hover:text-amber-300 transition-colors">Hadith Hub</button></li>
              <li><button onClick={() => onSelectTab('tools')} className="hover:text-amber-300 transition-colors">Ramadan Hub</button></li>
              <li><button onClick={() => onSelectTab('tools')} className="hover:text-amber-300 transition-colors">Hajj & Umrah Hub</button></li>
              <li><button onClick={() => onSelectTab('seerah')} className="hover:text-amber-300 transition-colors">Seerah Hub</button></li>
              <li><button onClick={() => onSelectTab('stories')} className="hover:text-amber-300 transition-colors">Islamic History Hub</button></li>
            </ul>
          </div>

          {/* Column 3: Core Features */}
          <div>
            <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-3 font-serif">
              Islamic Features
            </h4>
            <ul className="space-y-2 text-emerald-200/90">
              <li><button onClick={() => onSelectTab('tools')} className="hover:text-amber-300 transition-colors">Prayer Times & Qibla</button></li>
              <li><button onClick={() => onSelectTab('tools')} className="hover:text-amber-300 transition-colors">Zakat Calculators</button></li>
              <li><button onClick={() => onSelectTab('fatwa')} className="hover:text-amber-300 transition-colors">Ask AI Scholar & Fatwa</button></li>
              <li><button onClick={() => onSelectTab('academy')} className="hover:text-amber-300 transition-colors">Islamic Academy</button></li>
              <li><button onClick={() => onSelectTab('mosques')} className="hover:text-amber-300 transition-colors">Mosque Directory</button></li>
              <li><button onClick={() => onSelectTab('downloads')} className="hover:text-amber-300 transition-colors">Downloads Center</button></li>
            </ul>
          </div>

          {/* Column 4: Blog Categories */}
          <div>
            <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-3 font-serif">
              Blog Topics
            </h4>
            <ul className="space-y-2 text-emerald-200/90">
              <li><button onClick={() => onSelectTab('blog')} className="hover:text-amber-300 transition-colors">Aqeedah & Tawhid</button></li>
              <li><button onClick={() => onSelectTab('blog')} className="hover:text-amber-300 transition-colors">Fiqh & Rulings</button></li>
              <li><button onClick={() => onSelectTab('blog')} className="hover:text-amber-300 transition-colors">Family & Marriage</button></li>
              <li><button onClick={() => onSelectTab('blog')} className="hover:text-amber-300 transition-colors">Islamic Parenting</button></li>
              <li><button onClick={() => onSelectTab('blog')} className="hover:text-amber-300 transition-colors">Halal Business & Wealth</button></li>
              <li><button onClick={() => onSelectTab('blog')} className="hover:text-amber-300 transition-colors">Current Contemporary Issues</button></li>
            </ul>
          </div>

          {/* Column 5: Essential Pages */}
          <div>
            <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-3 font-serif">
              Essential Pages
            </h4>
            <ul className="space-y-2 text-emerald-200/90">
              <li><button onClick={() => onSelectTab('essential', 'about')} className="hover:text-amber-300 transition-colors">About Us</button></li>
              <li><button onClick={() => onSelectTab('essential', 'contact')} className="hover:text-amber-300 transition-colors">Contact Us</button></li>
              <li><button onClick={() => onSelectTab('essential', 'privacy')} className="hover:text-amber-300 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onSelectTab('essential', 'terms')} className="hover:text-amber-300 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => onSelectTab('essential', 'disclaimer')} className="hover:text-amber-300 transition-colors">Disclaimer</button></li>
              <li><button onClick={() => onSelectTab('essential', 'editorial')} className="hover:text-amber-300 transition-colors">Editorial Policy</button></li>
              <li><button onClick={() => onSelectTab('essential', 'sources')} className="hover:text-amber-300 transition-colors">Sources & References</button></li>
              <li><button onClick={() => onSelectTab('essential', 'donation')} className="hover:text-amber-300 font-bold text-amber-400 transition-colors">Donation Page</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-emerald-900 dark:border-slate-800 text-center text-[11px] text-emerald-300/70 space-y-2">
          <p className="flex items-center justify-center gap-1">
            <span>© 2026 Bofferly Islamic Portal. All Rights Reserved. Built with sincere love for Dawah.</span>
          </p>
          <p className="max-w-3xl mx-auto text-[10px] text-emerald-400/60 leading-relaxed">
            Disclaimer: Bofferly presents Quranic translations, Hadiths, and scholarly articles for educational and spiritual enlightenment. Personal complex religious rulings should always be confirmed with local qualified Islamic scholars and legal Muftis.
          </p>
        </div>

      </div>
    </footer>
  );
};
