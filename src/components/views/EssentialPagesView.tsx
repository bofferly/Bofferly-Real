import React, { useState } from 'react';
import { EssentialPageType } from '../../types';
import { ShieldCheck, Heart, Mail, CheckCircle2, FileText, Lock, Globe } from 'lucide-react';

interface EssentialPagesViewProps {
  pageType?: EssentialPageType;
}

export const EssentialPagesView: React.FC<EssentialPagesViewProps> = ({ pageType = 'about' }) => {
  const [activePage, setActivePage] = useState<EssentialPageType>(pageType);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-3">
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white capitalize">
          {activePage.replace('-', ' ')}
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
          Bofferly is dedicated to editorial integrity, Islamic authenticity, data privacy, and global Dawah outreach.
        </p>
      </div>

      {/* Pages Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-emerald-200 dark:border-slate-800 pb-3 text-xs font-bold">
        {[
          { id: 'about', label: 'About Us' },
          { id: 'contact', label: 'Contact Us' },
          { id: 'privacy', label: 'Privacy Policy' },
          { id: 'terms', label: 'Terms of Service' },
          { id: 'disclaimer', label: 'Disclaimer' },
          { id: 'editorial', label: 'Editorial Policy' },
          { id: 'sources', label: 'Sources & References' },
          { id: 'donation', label: '❤️ Support Dawah (Donation)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePage(tab.id as EssentialPageType)}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activePage === tab.id
                ? 'bg-amber-400 text-emerald-950 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-emerald-100 dark:border-slate-800 hover:border-amber-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PAGE 1: ABOUT US */}
      {activePage === 'about' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-bold font-serif text-emerald-950 dark:text-white">About Bofferly Islamic Portal</h2>
          <p>
            Bofferly was founded with the noble objective of providing Muslims and non-Muslims worldwide with a modern, elegant, accurate, and completely free digital Islamic portal.
          </p>
          <p>
            Our core team comprises Shariah researchers, Tajweed instructors, software engineers, and Islamic scholars working in tandem to verify every verse, Hadith narrator chain, and article published on our platform.
          </p>
        </div>
      )}

      {/* PAGE 2: CONTACT US */}
      {activePage === 'contact' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold font-serif text-emerald-950 dark:text-white">Get in Touch with Bofferly Editorial Team</h2>
          {contactSubmitted ? (
            <div className="bg-emerald-100 dark:bg-slate-800 p-6 rounded-xl text-center space-y-2 text-emerald-900 dark:text-emerald-300">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600" />
              <p className="font-bold">JazakAllah Khair! Your message has been received.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs max-w-lg">
              <div>
                <label className="font-bold block mb-1">Your Name</label>
                <input required type="text" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl dark:text-white" />
              </div>
              <div>
                <label className="font-bold block mb-1">Email Address</label>
                <input required type="email" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl dark:text-white" />
              </div>
              <div>
                <label className="font-bold block mb-1">Message / Scholar Inquiry</label>
                <textarea required rows={4} className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl dark:text-white" />
              </div>
              <button type="submit" className="bg-amber-400 text-emerald-950 font-bold px-5 py-2.5 rounded-xl">
                Send Message
              </button>
            </form>
          )}
        </div>
      )}

      {/* PAGE 3: PRIVACY POLICY */}
      {activePage === 'privacy' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-3 text-xs text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-bold font-serif text-emerald-950 dark:text-white">Privacy Policy</h2>
          <p>Bofferly respects user privacy. We do not sell user data to third parties. Bookmarks and prayer preferences are preserved locally on your client device.</p>
        </div>
      )}

      {/* PAGE 4: TERMS OF SERVICE */}
      {activePage === 'terms' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-3 text-xs text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-bold font-serif text-emerald-950 dark:text-white">Terms of Service</h2>
          <p>All Quranic texts and Hadiths on Bofferly are protected under public domain and open scholarly licenses. Commercial redistribution of curated assets requires written attribution to Bofferly Press.</p>
        </div>
      )}

      {/* PAGE 5: DISCLAIMER */}
      {activePage === 'disclaimer' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-3 text-xs text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-bold font-serif text-emerald-950 dark:text-white">Religious & Legal Disclaimer</h2>
          <p>Articles and AI Scholar outputs serve strictly as educational references and must not replace personal consultation with local certified Islamic Muftis for personal legal rulings.</p>
        </div>
      )}

      {/* PAGE 6: EDITORIAL POLICY */}
      {activePage === 'editorial' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-3 text-xs text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-bold font-serif text-emerald-950 dark:text-white">Editorial Policy & Peer Review</h2>
          <p>Every article published on Bofferly undergoes two-tier editorial review by Shariah graduates to ensure accuracy in Hadith grading and Arabic translation fidelity.</p>
        </div>
      )}

      {/* PAGE 7: SOURCES & REFERENCES */}
      {activePage === 'sources' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm space-y-3 text-xs text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-bold font-serif text-emerald-950 dark:text-white">Sources & Scholarly References</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Quranic Text & Word-by-Word: King Fahd Glorious Quran Printing Complex & Tanzil API</li>
            <li>Hadith Texts: Kutub al-Sittah classical manuscripts audited by Shaykh al-Albani / Darussalam</li>
            <li>Seerah & History: Ar-Raheeq Al-Makhtum (The Sealed Nectar) & Ibn Hisham</li>
          </ul>
        </div>
      )}

      {/* PAGE 8: DONATION PAGE */}
      {activePage === 'donation' && (
        <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="bg-amber-400 text-emerald-950 font-bold text-xs px-3 py-1 rounded-full">
              Sadaqah Jariyah (Ongoing Charity)
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">Support Bofferly Global Dawah Platform</h2>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              Your donations help us keep Bofferly 100% ad-free, host high-bandwidth Quranic recitations, publish free Islamic ebooks, and support Islamic educators.
            </p>
          </div>

          {donationSuccess ? (
            <div className="bg-emerald-900 p-6 rounded-2xl border border-amber-400 text-center space-y-2">
              <p className="text-amber-300 font-bold text-lg">May Allah reward you immensely in this life and the Next!</p>
              <p className="text-xs text-emerald-100">"When a man dies, his deeds come to an end except for three: Sadaqah Jariyah..." [Sahih Muslim]</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[10, 25, 50, 100, 250].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setDonationSuccess(true)}
                  className="bg-emerald-900/80 hover:bg-amber-400 hover:text-emerald-950 border border-emerald-700 font-bold py-4 rounded-2xl text-center transition-all shadow"
                >
                  <p className="text-2xl font-mono">${amt}</p>
                  <p className="text-[10px] opacity-80 uppercase">One-Time Contribution</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
