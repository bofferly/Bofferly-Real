import React, { useState, useEffect } from 'react';
import { MapPin, Search, Star, Phone, Globe, Clock, CheckCircle2, Navigation, ExternalLink, RefreshCw, Compass, Layers, Info, Award } from 'lucide-react';
import { MOSQUE_DIRECTORY } from '../../data/mosqueData';
import { Mosque } from '../../types';

// Haversine distance formula in kilometers
const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const MosqueDirectoryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'distance'>('rating');

  // User Geolocation State
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>({ lat: 21.4225, lng: 39.8262 }); // Default Makkah
  const [userLocationName, setUserLocationName] = useState('Default (Makkah)');
  const [isLocating, setIsLocating] = useState(false);
  const [usingGPS, setUsingGPS] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Map state
  const [activeMosqueId, setActiveMosqueId] = useState<string | null>('mosque-1');
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'split'>('split');

  // Detect GPS Location
  const handleDetectLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserCoords({ lat, lng });
          setUserLocationName(`Your GPS Location (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`);
          setUsingGPS(true);
          setSortBy('distance');
          setIsLocating(false);
        },
        (err) => {
          setLocationError('GPS permission denied or unavailable. Showing global mosques.');
          setIsLocating(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setLocationError('Browser geolocation is not supported.');
      setIsLocating(false);
    }
  };

  // Filter & process mosques with distance calculation
  const mosquesWithDistance = MOSQUE_DIRECTORY.map(m => {
    const dist = userCoords ? calculateDistanceKm(userCoords.lat, userCoords.lng, m.lat, m.lng) : 0;
    return { ...m, distanceKm: dist };
  });

  const filteredMosques = mosquesWithDistance.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.country.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFacility = true;
    if (selectedFacility === 'womenArea') matchesFacility = m.facilities.womenArea;
    if (selectedFacility === 'parking') matchesFacility = m.facilities.parking;
    if (selectedFacility === 'wheelchair') matchesFacility = m.facilities.wheelchair;
    if (selectedFacility === 'library') matchesFacility = m.facilities.library;

    return matchesSearch && matchesFacility;
  }).sort((a, b) => {
    if (sortBy === 'distance') {
      return (a.distanceKm || 0) - (b.distanceKm || 0);
    }
    return b.rating - a.rating;
  });

  const activeMosque = mosquesWithDistance.find(m => m.id === activeMosqueId) || filteredMosques[0];

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-emerald-950/80 backdrop-blur-md text-white p-6 sm:p-8 rounded-3xl border border-emerald-800/40 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-400/10 text-amber-300 text-xs px-3.5 py-1 rounded-full border border-amber-400/30">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Mosque Locator & GPS Navigator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-white">
              Mosque Directory & Nearby Map
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl leading-relaxed">
              Find local Mosques, Jummah prayer times, women prayer areas, parking, and get direct GPS navigation directions.
            </p>
          </div>

          {/* GPS Detection Button */}
          <button
            onClick={handleDetectLocation}
            disabled={isLocating}
            className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-2xl text-xs sm:text-sm flex items-center space-x-2 shadow-lg transition-all shrink-0 active:scale-95 disabled:opacity-50"
          >
            {isLocating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
            <span>{isLocating ? 'Detecting Location...' : usingGPS ? 'GPS Location Active' : 'Detect My Location'}</span>
          </button>
        </div>

        {locationError && (
          <p className="text-xs text-rose-300 bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/30">{locationError}</p>
        )}
      </div>

      {/* Search, Filter & View Controls */}
      <div className="bg-emerald-950/40 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-emerald-800/40 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Mosque by name, city, country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-emerald-800/60 text-xs rounded-2xl focus:outline-none focus:border-amber-400 text-white placeholder-emerald-400/60"
          />
        </div>

        {/* Facility & Sorting Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="bg-black/40 text-emerald-200 border border-emerald-800/60 rounded-2xl px-3 py-2 text-xs font-medium focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-emerald-950 text-white">All Facilities</option>
            <option value="womenArea" className="bg-emerald-950 text-white">Women Section</option>
            <option value="parking" className="bg-emerald-950 text-white">Parking Available</option>
            <option value="wheelchair" className="bg-emerald-950 text-white">Wheelchair Accessible</option>
            <option value="library" className="bg-emerald-950 text-white">Islamic Library</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-black/40 text-amber-300 border border-emerald-800/60 rounded-2xl px-3 py-2 text-xs font-bold focus:outline-none cursor-pointer"
          >
            <option value="rating" className="bg-emerald-950 text-white">Sort: Highest Rated</option>
            <option value="distance" className="bg-emerald-950 text-white">Sort: Nearest to Me</option>
          </select>

          {/* View Mode Toggle */}
          <div className="bg-black/40 p-1 border border-emerald-800/60 rounded-2xl text-xs flex items-center space-x-1">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                viewMode === 'split' ? 'bg-amber-400 text-emerald-950' : 'text-emerald-200 hover:text-white'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                viewMode === 'map' ? 'bg-amber-400 text-emerald-950' : 'text-emerald-200 hover:text-white'
              }`}
            >
              Map Canvas
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                viewMode === 'list' ? 'bg-amber-400 text-emerald-950' : 'text-emerald-200 hover:text-white'
              }`}
            >
              Grid List
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Layout */}
      <div className={`grid grid-cols-1 ${viewMode === 'split' ? 'lg:grid-cols-12' : ''} gap-6`}>
        
        {/* INTERACTIVE MAP VISUAL CANVAS */}
        {(viewMode === 'map' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7' : 'w-full'} bg-emerald-950/80 backdrop-blur-md p-6 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-4 relative overflow-hidden min-h-[480px] flex flex-col justify-between`}>
            
            {/* Map Top Header */}
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3 z-10">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
                <h3 className="font-extrabold text-white text-sm">Interactive GPS Map Canvas</h3>
              </div>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30">
                {usingGPS ? '📍 Live GPS Center' : '🌍 Global Coordinates'}
              </span>
            </div>

            {/* Simulated Map Visual Surface */}
            <div className="relative w-full flex-1 bg-[#021c15] rounded-2xl border border-emerald-800/60 overflow-hidden my-2 p-6 flex flex-col items-center justify-center min-h-[360px]">
              
              {/* Grid Background Patterns */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Map Pins Grid Display */}
              <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                
                {/* User Geolocation Pulse Beacon */}
                {userCoords && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-75" />
                      <div className="w-5 h-5 bg-amber-400 rounded-full border-2 border-emerald-950 shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-emerald-950 rounded-full" />
                      </div>
                    </div>
                    <span className="text-[9px] bg-amber-400 text-emerald-950 font-black px-2 py-0.5 rounded-full mt-1 shadow-md">
                      YOU ARE HERE
                    </span>
                  </div>
                )}

                {/* Mosque Pins relative layout */}
                {filteredMosques.map((m, index) => {
                  const isSelected = activeMosque?.id === m.id;
                  // Calculate dynamic positions around center for map visual simulation
                  const angles = [0, 60, 120, 180, 240, 300];
                  const angle = (angles[index % angles.length] * Math.PI) / 180;
                  const radius = 100 + (index * 25);
                  const posX = Math.cos(angle) * radius;
                  const posY = Math.sin(angle) * radius;

                  return (
                    <div
                      key={m.id}
                      onClick={() => setActiveMosqueId(m.id)}
                      style={{ transform: `translate(${posX}px, ${posY}px)` }}
                      className={`absolute cursor-pointer transition-all duration-300 z-10 flex flex-col items-center group ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                      }`}
                    >
                      <div className={`p-2 rounded-2xl shadow-xl border flex items-center space-x-1 ${
                        isSelected
                          ? 'bg-amber-400 text-emerald-950 border-white ring-4 ring-amber-400/40'
                          : 'bg-emerald-900 text-white border-emerald-700 hover:bg-emerald-800'
                      }`}>
                        <MapPin className="w-4 h-4 fill-current" />
                        <span className="text-[10px] font-extrabold max-w-[100px] truncate">{m.name.split(' ')[0]}</span>
                      </div>

                      {/* Distance pill */}
                      {m.distanceKm !== undefined && (
                        <span className="text-[9px] bg-black/80 text-amber-300 px-1.5 py-0.5 rounded-full mt-0.5 border border-emerald-800">
                          {m.distanceKm > 1000 ? `${(m.distanceKm/1000).toFixed(1)}k km` : `${m.distanceKm.toFixed(0)} km`}
                        </span>
                      )}
                    </div>
                  );
                })}

              </div>

              {/* Selected Mosque Floating Preview Card on Map */}
              {activeMosque && (
                <div className="absolute bottom-3 left-3 right-3 bg-emerald-950/90 backdrop-blur-md p-4 rounded-2xl border border-amber-400/50 shadow-2xl flex items-center justify-between gap-3 z-40 animate-in fade-in slide-in-from-bottom-2">
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider">Selected Mosque Pin</span>
                    <h4 className="font-extrabold text-xs sm:text-sm text-white truncate">{activeMosque.name}</h4>
                    <p className="text-[11px] text-emerald-200/90 truncate">{activeMosque.address}, {activeMosque.city}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-amber-300">
                      <span>⭐ {activeMosque.rating}</span>
                      <span>• Jummah: {activeMosque.jumuahTime}</span>
                      {activeMosque.distanceKm !== undefined && (
                        <span className="bg-emerald-900 px-2 py-0.5 rounded-md border border-emerald-700">
                          📍 {activeMosque.distanceKm.toFixed(1)} km away
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${activeMosque.lat},${activeMosque.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs flex items-center space-x-1 shadow-md shrink-0 transition-transform active:scale-95"
                  >
                    <span>Navigate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

            </div>

            {/* Map Controls Footer */}
            <div className="flex items-center justify-between text-xs text-emerald-200/80 pt-1">
              <span>Showing <strong>{filteredMosques.length}</strong> Mosques pinned</span>
              <span className="text-amber-300 text-[11px]">Click any pin to inspect & view navigation</span>
            </div>

          </div>
        )}

        {/* MOSQUE LIST GRID */}
        {(viewMode === 'list' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : 'w-full'} space-y-4`}>
            
            <div className="flex items-center justify-between text-xs text-emerald-200 font-bold px-1">
              <span>Mosques Directory ({filteredMosques.length})</span>
              <span>Sorted by {sortBy === 'distance' ? 'Distance' : 'Rating'}</span>
            </div>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredMosques.map((mosque) => {
                const isSelected = activeMosque?.id === mosque.id;

                return (
                  <div
                    key={mosque.id}
                    onClick={() => setActiveMosqueId(mosque.id)}
                    className={`bg-emerald-950/40 backdrop-blur-md p-5 rounded-3xl border transition-all cursor-pointer shadow-lg space-y-3.5 ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-400/30 bg-emerald-900/50'
                        : 'border-emerald-800/40 hover:border-amber-400/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <h3 className="text-base font-bold text-white font-sans leading-snug">{mosque.name}</h3>
                        <p className="text-xs text-emerald-200/90 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{mosque.address}, {mosque.city}</span>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 justify-end">
                          <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                          <span>{mosque.rating}</span>
                        </span>
                        {mosque.distanceKm !== undefined && (
                          <p className="text-[10px] text-amber-300 font-mono font-bold mt-1">
                            {mosque.distanceKm.toFixed(1)} km
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-black/30 p-2.5 rounded-xl text-xs space-y-1 border border-emerald-800/50">
                      <p className="text-emerald-100 font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Jummah Prayer: <strong>{mosque.jumuahTime}</strong></span>
                      </p>
                    </div>

                    {/* Facilities Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {mosque.facilities.wudu && (
                        <span className="text-[10px] bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Wudu
                        </span>
                      )}
                      {mosque.facilities.womenArea && (
                        <span className="text-[10px] bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Women Area
                        </span>
                      )}
                      {mosque.facilities.parking && (
                        <span className="text-[10px] bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Parking
                        </span>
                      )}
                      {mosque.facilities.wheelchair && (
                        <span className="text-[10px] bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Wheelchair
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-emerald-800/40 flex items-center justify-between text-xs text-emerald-300">
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-amber-400" /> {mosque.phone}</span>
                      
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${mosque.lat},${mosque.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

