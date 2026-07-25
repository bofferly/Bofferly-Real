import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Navigation, RefreshCw, Compass, Check, AlertCircle, Calendar } from 'lucide-react';

interface PrayerTimesSectionProps {
  onSelectTab?: (tab: any) => void;
  compact?: boolean;
}

interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunset?: string;
  Midnight?: string;
}

export const PrayerTimesSection: React.FC<PrayerTimesSectionProps> = ({ onSelectTab, compact = false }) => {
  const [timings, setTimings] = useState<PrayerTimings>({
    Fajr: '04:25',
    Sunrise: '05:50',
    Dhuhr: '12:20',
    Asr: '15:45',
    Maghrib: '19:05',
    Isha: '20:35'
  });
  
  const [locationName, setLocationName] = useState<string>('Detecting location...');
  const [hijriDate, setHijriDate] = useState<string>('Islamic Date');
  const [gregorianDate, setGregorianDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [usingGPS, setUsingGPS] = useState<boolean>(false);
  const [manualCity, setManualCity] = useState<string>('');
  const [isSearchingCity, setIsSearchingCity] = useState<boolean>(false);
  const [calcMethod, setCalcMethod] = useState<number>(2); // 2 = ISNA (Islamic Society of North America)

  // Next prayer tracking
  const [nextPrayerName, setNextPrayerName] = useState<string>('Dhuhr');
  const [nextPrayerTime, setNextPrayerTime] = useState<string>('12:20 PM');
  const [countdownText, setCountdownText] = useState<string>('');

  // Convert 24h string "15:45" to "03:45 PM"
  const format12Hour = (time24?: string) => {
    if (!time24) return '--:--';
    const clean = time24.split(' ')[0]; // remove (EST) if present
    const [hStr, mStr] = clean.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr ? mStr.padStart(2, '0') : '00';
    if (isNaN(h)) return time24;
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
  };

  // Fetch timings by Latitude / Longitude
  const fetchTimingsByCoords = async (lat: number, lng: number) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      // Fetch Prayer Times from Aladhan API
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${calcMethod}`);
      if (!res.ok) throw new Error('Could not fetch prayer timings');
      const data = await res.json();

      if (data && data.code === 200 && data.data) {
        setTimings(data.data.timings);
        
        // Date formatting
        if (data.data.date?.hijri) {
          const h = data.data.date.hijri;
          setHijriDate(`${h.day} ${h.month.en} (${h.month.ar}) ${h.year} AH`);
        }
        if (data.data.date?.readable) {
          setGregorianDate(data.data.date.readable);
        }

        // Try reverse geocoding
        try {
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            const city = geoData.address?.city || geoData.address?.town || geoData.address?.county || geoData.address?.state || 'Your Location';
            const country = geoData.address?.country || '';
            setLocationName(`${city}${country ? `, ${country}` : ''}`);
          } else {
            setLocationName(`${lat.toFixed(2)}°, ${lng.toFixed(2)}°`);
          }
        } catch {
          setLocationName(data.data.meta?.timezone || `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`);
        }

        setUsingGPS(true);
      } else {
        throw new Error('Invalid timing response');
      }
    } catch (err: any) {
      setErrorMsg('Failed to load live prayer times. Showing default calculations.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch timings by City / Address Name
  const fetchTimingsByAddress = async (address: string) => {
    if (!address.trim()) return;
    setIsSearchingCity(true);
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(address)}&method=${calcMethod}`);
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();

      if (data && data.code === 200 && data.data) {
        setTimings(data.data.timings);
        
        if (data.data.date?.hijri) {
          const h = data.data.date.hijri;
          setHijriDate(`${h.day} ${h.month.en} (${h.month.ar}) ${h.year} AH`);
        }
        if (data.data.date?.readable) {
          setGregorianDate(data.data.date.readable);
        }

        setLocationName(address.trim());
        setUsingGPS(false);
      } else {
        throw new Error('Location search failed');
      }
    } catch (err) {
      setErrorMsg(`Could not find prayer times for "${address}".`);
    } finally {
      setLoading(false);
      setIsSearchingCity(false);
    }
  };

  // Get User Browser Geolocation
  const requestLocation = () => {
    setLoading(true);
    setErrorMsg(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchTimingsByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.warn('Geolocation error or denied:', err.message);
          setErrorMsg('Location permission denied or unavailable. You can enter your city manually.');
          // Fallback to default city (Mecca / London)
          fetchTimingsByAddress('Mecca, Saudi Arabia');
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setErrorMsg('Browser geolocation not supported. Enter city manually.');
      fetchTimingsByAddress('Mecca, Saudi Arabia');
    }
  };

  // Initial load: try GPS first
  useEffect(() => {
    requestLocation();
  }, [calcMethod]);

  // Calculate Next Prayer and Countdown
  useEffect(() => {
    if (!timings) return;

    const calculateNextPrayer = () => {
      const now = new Date();
      const prayers = [
        { name: 'Fajr', time: timings.Fajr },
        { name: 'Sunrise', time: timings.Sunrise },
        { name: 'Dhuhr', time: timings.Dhuhr },
        { name: 'Asr', time: timings.Asr },
        { name: 'Maghrib', time: timings.Maghrib },
        { name: 'Isha', time: timings.Isha }
      ];

      let next = null;

      for (const p of prayers) {
        if (!p.time) continue;
        const [h, m] = p.time.split(' ')[0].split(':').map(Number);
        const pDate = new Date();
        pDate.setHours(h, m, 0, 0);

        if (pDate > now) {
          next = { ...p, date: pDate };
          break;
        }
      }

      // If all prayers today have passed, next prayer is Fajr tomorrow
      if (!next && prayers[0]?.time) {
        const [h, m] = prayers[0].time.split(' ')[0].split(':').map(Number);
        const pDate = new Date();
        pDate.setDate(pDate.getDate() + 1);
        pDate.setHours(h, m, 0, 0);
        next = { ...prayers[0], date: pDate };
      }

      if (next) {
        setNextPrayerName(next.name);
        setNextPrayerTime(format12Hour(next.time));

        const diffMs = next.date.getTime() - now.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

        setCountdownText(`${diffHrs}h ${diffMins}m ${diffSecs}s`);
      }
    };

    calculateNextPrayer();
    const interval = setInterval(calculateNextPrayer, 1000);
    return () => clearInterval(interval);
  }, [timings]);

  const prayerList = [
    { key: 'Fajr', name: 'Fajr', time: format12Hour(timings.Fajr), raw: timings.Fajr },
    { key: 'Sunrise', name: 'Sunrise', time: format12Hour(timings.Sunrise), raw: timings.Sunrise, isSunrise: true },
    { key: 'Dhuhr', name: 'Dhuhr', time: format12Hour(timings.Dhuhr), raw: timings.Dhuhr },
    { key: 'Asr', name: 'Asr', time: format12Hour(timings.Asr), raw: timings.Asr },
    { key: 'Maghrib', name: 'Maghrib', time: format12Hour(timings.Maghrib), raw: timings.Maghrib },
    { key: 'Isha', name: 'Isha', time: format12Hour(timings.Isha), raw: timings.Isha }
  ];

  return (
    <div className="bg-emerald-950/80 backdrop-blur-md text-white p-6 sm:p-8 rounded-3xl border border-emerald-800/40 shadow-2xl space-y-6">
      
      {/* Location & Controls Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-emerald-800/50 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-amber-400/10 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
            <MapPin className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{usingGPS ? '📍 Live GPS Location' : '🌍 Selected Location'}</span>
            {loading && <RefreshCw className="w-3 h-3 animate-spin text-amber-300 ml-1" />}
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <span>{locationName}</span>
          </h2>

          <p className="text-xs text-emerald-200/90 flex items-center gap-2 font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{hijriDate} • {gregorianDate}</span>
          </p>
        </div>

        {/* Location Detection & City Search Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Detect Location Button */}
          <button
            onClick={requestLocation}
            disabled={loading}
            className="px-3.5 py-2 bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 border border-emerald-700/60 rounded-2xl text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            title="Auto-detect using device GPS"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{loading ? 'Locating...' : 'Detect GPS Location'}</span>
          </button>

          {/* Manual City Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchTimingsByAddress(manualCity);
            }}
            className="flex items-center space-x-1.5 bg-black/30 border border-emerald-800/60 rounded-2xl p-1 focus-within:border-amber-400"
          >
            <input
              type="text"
              placeholder="Search city (e.g. London, Dubai)..."
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-emerald-400/60 pl-3 pr-1 py-1 focus:outline-none w-36 sm:w-48"
            />
            <button
              type="submit"
              disabled={isSearchingCity || !manualCity.trim()}
              className="px-3 py-1 bg-amber-400 text-emerald-950 font-bold rounded-xl text-xs hover:bg-amber-300 disabled:opacity-40 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Calculation Method Selector */}
          <select
            value={calcMethod}
            onChange={(e) => setCalcMethod(Number(e.target.value))}
            className="bg-black/30 text-emerald-200 border border-emerald-800/60 rounded-2xl px-2.5 py-2 text-xs font-medium focus:outline-none cursor-pointer"
          >
            <option value={2} className="bg-emerald-950 text-white">ISNA (North America)</option>
            <option value={3} className="bg-emerald-950 text-white">MWL (Muslim World League)</option>
            <option value={4} className="bg-emerald-950 text-white">Umm al-Qura (Makkah)</option>
            <option value={1} className="bg-emerald-950 text-white">Karachi (Hanafi)</option>
            <option value={5} className="bg-emerald-950 text-white">Egyptian General Authority</option>
          </select>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-2xl text-xs text-rose-200 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Next Prayer Banner */}
      <div className="bg-emerald-900/60 border border-emerald-700/50 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center shrink-0 shadow-md">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-extrabold tracking-widest text-amber-300">Next Upcoming Prayer</p>
            <p className="text-lg font-bold text-white font-sans">
              {nextPrayerName} <span className="text-amber-400">({nextPrayerTime})</span>
            </p>
          </div>
        </div>

        <div className="bg-black/30 px-4 py-2 rounded-xl border border-emerald-800 text-center">
          <p className="text-[10px] uppercase text-emerald-300/80 font-bold">Time Remaining</p>
          <p className="text-sm sm:text-base font-mono font-bold text-amber-300">{countdownText || 'Calculating...'}</p>
        </div>
      </div>

      {/* Grid of 6 Prayers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {prayerList.map((p) => {
          const isNext = p.name === nextPrayerName;
          return (
            <div
              key={p.key}
              className={`p-4 rounded-2xl border text-center transition-all ${
                isNext
                  ? 'bg-amber-400 text-emerald-950 font-bold border-amber-300 shadow-xl scale-[1.03] ring-2 ring-amber-400/50'
                  : p.isSunrise
                  ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300/80'
                  : 'bg-emerald-900/40 border-emerald-800/50 text-white hover:border-amber-400/40'
              }`}
            >
              <p className={`text-[10px] uppercase font-bold tracking-wider ${isNext ? 'text-emerald-950' : 'text-amber-400'}`}>
                {p.name} {p.isSunrise && '(Sunrise)'}
              </p>
              <p className="text-base sm:text-lg font-extrabold font-mono mt-1">
                {p.time}
              </p>
              {isNext && (
                <span className="inline-block text-[9px] bg-emerald-950 text-amber-300 font-extrabold px-2 py-0.5 rounded-full mt-1">
                  Next Prayer
                </span>
              )}
            </div>
          );
        })}
      </div>

      {onSelectTab && (
        <div className="flex justify-end pt-1">
          <button
            onClick={() => onSelectTab('tools')}
            className="text-xs text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1"
          >
            <span>Open Qibla Compass & Islamic Tools →</span>
          </button>
        </div>
      )}

    </div>
  );
};
