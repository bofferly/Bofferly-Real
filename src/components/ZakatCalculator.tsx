import React, { useState } from 'react';
import { Calculator, Coins, DollarSign, Scale, Info, RefreshCw, CheckCircle2, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface ZakatCalculatorProps {
  compact?: boolean;
}

export const ZakatCalculator: React.FC<ZakatCalculatorProps> = ({ compact = false }) => {
  // Asset Inputs
  const [cashSavings, setCashSavings] = useState<number>(5000);
  const [goldGrams, setGoldGrams] = useState<number>(50);
  const [silverGrams, setSilverGrams] = useState<number>(100);
  const [investments, setInvestments] = useState<number>(2000);
  const [businessInventory, setBusinessInventory] = useState<number>(1000);
  const [debtsLiabilities, setDebtsLiabilities] = useState<number>(500);

  // Market Price Settings
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(75); // ~$75 USD/gram
  const [silverPricePerGram, setSilverPricePerGram] = useState<number>(0.95); // ~$0.95 USD/gram
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');
  const [nisabStandard, setNisabStandard] = useState<'gold' | 'silver'>('gold');

  // Calculations
  const goldValue = (goldGrams || 0) * (goldPricePerGram || 0);
  const silverValue = (silverGrams || 0) * (silverPricePerGram || 0);
  const totalGrossWealth = (cashSavings || 0) + goldValue + silverValue + (investments || 0) + (businessInventory || 0);
  const totalNetWealth = Math.max(0, totalGrossWealth - (debtsLiabilities || 0));

  // Nisab Calculations
  const nisabGoldThreshold = 85 * (goldPricePerGram || 0); // 85 grams of gold
  const nisabSilverThreshold = 595 * (silverPricePerGram || 0); // 595 grams of silver
  const activeNisabThreshold = nisabStandard === 'gold' ? nisabGoldThreshold : nisabSilverThreshold;

  const isNisabMet = totalNetWealth >= activeNisabThreshold;
  const zakatRate = 0.025; // 2.5%
  const totalZakatDue = isNisabMet ? totalNetWealth * zakatRate : 0;

  // Asset breakdowns for Zakat
  const cashZakat = isNisabMet ? (cashSavings || 0) * zakatRate : 0;
  const goldZakat = isNisabMet ? goldValue * zakatRate : 0;
  const silverZakat = isNisabMet ? silverValue * zakatRate : 0;
  const investmentZakat = isNisabMet ? ((investments || 0) + (businessInventory || 0)) * zakatRate : 0;

  const handleReset = () => {
    setCashSavings(0);
    setGoldGrams(0);
    setSilverGrams(0);
    setInvestments(0);
    setBusinessInventory(0);
    setDebtsLiabilities(0);
  };

  const handleLoadSample = () => {
    setCashSavings(10000);
    setGoldGrams(85);
    setSilverGrams(200);
    setInvestments(3000);
    setBusinessInventory(1500);
    setDebtsLiabilities(1000);
  };

  return (
    <div className="bg-emerald-950/80 backdrop-blur-md text-white p-6 sm:p-8 rounded-3xl border border-emerald-800/40 shadow-2xl space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/50 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-amber-400/10 text-amber-300 text-xs px-3.5 py-1 rounded-full border border-amber-400/30">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Shariah Compliant 2.5% Calculation</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white font-sans">
            Instant Zakat Calculator
          </h2>
          <p className="text-xs text-emerald-200/90">
            Enter your cash, gold, silver, and investments to instantly view your calculated Zakat requirement.
          </p>
        </div>

        {/* Currency & Preset Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <select
            value={currencySymbol}
            onChange={(e) => setCurrencySymbol(e.target.value)}
            className="bg-black/40 text-xs text-amber-300 font-bold border border-emerald-800/80 rounded-2xl px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="$" className="bg-emerald-950 text-white">$ USD</option>
            <option value="£" className="bg-emerald-950 text-white">£ GBP</option>
            <option value="€" className="bg-emerald-950 text-white">€ EUR</option>
            <option value="SAR " className="bg-emerald-950 text-white">SAR (ريال)</option>
            <option value="AED " className="bg-emerald-950 text-white">AED (د.إ)</option>
            <option value="PKR " className="bg-emerald-950 text-white">PKR (Rs)</option>
            <option value="INR " className="bg-emerald-950 text-white">INR (₹)</option>
            <option value="RM " className="bg-emerald-950 text-white">MYR (RM)</option>
          </select>

          <button
            onClick={handleLoadSample}
            className="px-3.5 py-2 bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 text-xs font-semibold rounded-2xl border border-emerald-700/60 transition-all"
          >
            Sample Data
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white rounded-2xl border border-rose-500/30 transition-all"
            title="Reset All Inputs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Asset Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Cash & Bank Savings */}
            <div className="bg-black/30 p-4 rounded-2xl border border-emerald-800/60 space-y-2">
              <label className="text-xs font-extrabold text-amber-300 flex items-center justify-between">
                <span>Cash & Bank Savings ({currencySymbol})</span>
                <DollarSign className="w-4 h-4 text-amber-400" />
              </label>
              <input
                type="number"
                min="0"
                value={cashSavings || ''}
                onChange={(e) => setCashSavings(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="0"
                className="w-full p-2.5 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-amber-400"
              />
              <p className="text-[10px] text-emerald-300/70">In-hand cash, bank accounts, foreign currency.</p>
            </div>

            {/* 2. Gold Holdings */}
            <div className="bg-black/30 p-4 rounded-2xl border border-emerald-800/60 space-y-2">
              <label className="text-xs font-extrabold text-amber-300 flex items-center justify-between">
                <span>Gold Owned (Grams)</span>
                <Coins className="w-4 h-4 text-amber-400" />
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  value={goldGrams || ''}
                  onChange={(e) => setGoldGrams(Math.max(0, parseFloat(e.target.value) || 0))}
                  placeholder="0"
                  className="w-full p-2.5 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <p className="text-[10px] text-emerald-300/70">
                Total Value: <strong>{currencySymbol}{goldValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong> (@ {currencySymbol}{goldPricePerGram}/g)
              </p>
            </div>

            {/* 3. Silver Holdings */}
            <div className="bg-black/30 p-4 rounded-2xl border border-emerald-800/60 space-y-2">
              <label className="text-xs font-extrabold text-amber-300 flex items-center justify-between">
                <span>Silver Owned (Grams)</span>
                <Coins className="w-4 h-4 text-slate-300" />
              </label>
              <input
                type="number"
                min="0"
                value={silverGrams || ''}
                onChange={(e) => setSilverGrams(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="0"
                className="w-full p-2.5 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-amber-400"
              />
              <p className="text-[10px] text-emerald-300/70">
                Total Value: <strong>{currencySymbol}{silverValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong> (@ {currencySymbol}{silverPricePerGram}/g)
              </p>
            </div>

            {/* 4. Stocks & Investments */}
            <div className="bg-black/30 p-4 rounded-2xl border border-emerald-800/60 space-y-2">
              <label className="text-xs font-extrabold text-amber-300 flex items-center justify-between">
                <span>Stocks & Crypto ({currencySymbol})</span>
                <Scale className="w-4 h-4 text-amber-400" />
              </label>
              <input
                type="number"
                min="0"
                value={investments || ''}
                onChange={(e) => setInvestments(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="0"
                className="w-full p-2.5 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-amber-400"
              />
              <p className="text-[10px] text-emerald-300/70">Mutual funds, stocks, crypto, retirement accounts.</p>
            </div>

            {/* 5. Business Inventory */}
            <div className="bg-black/30 p-4 rounded-2xl border border-emerald-800/60 space-y-2">
              <label className="text-xs font-extrabold text-amber-300 flex items-center justify-between">
                <span>Trade Goods & Inventory ({currencySymbol})</span>
                <Calculator className="w-4 h-4 text-amber-400" />
              </label>
              <input
                type="number"
                min="0"
                value={businessInventory || ''}
                onChange={(e) => setBusinessInventory(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="0"
                className="w-full p-2.5 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-amber-400"
              />
              <p className="text-[10px] text-emerald-300/70">Wholesale goods meant for trade or resale.</p>
            </div>

            {/* 6. Immediate Debts / Deductions */}
            <div className="bg-black/30 p-4 rounded-2xl border border-rose-900/60 space-y-2">
              <label className="text-xs font-extrabold text-rose-300 flex items-center justify-between">
                <span>Deductible Immediate Debts ({currencySymbol})</span>
                <AlertCircle className="w-4 h-4 text-rose-400" />
              </label>
              <input
                type="number"
                min="0"
                value={debtsLiabilities || ''}
                onChange={(e) => setDebtsLiabilities(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="0"
                className="w-full p-2.5 bg-emerald-950/80 border border-rose-700/50 rounded-xl text-sm font-bold text-rose-100 focus:outline-none focus:border-rose-400"
              />
              <p className="text-[10px] text-rose-300/70">Unpaid bills, immediate debts due this month.</p>
            </div>

          </div>

          {/* Market Price Customization Drawer */}
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/50 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-emerald-200">Custom Metal Rates:</span>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-1">
                <span className="text-emerald-300 font-semibold">Gold/g:</span>
                <input
                  type="number"
                  value={goldPricePerGram}
                  onChange={(e) => setGoldPricePerGram(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-16 p-1 bg-black/40 border border-emerald-700 rounded text-center font-bold text-amber-300"
                />
              </label>

              <label className="flex items-center space-x-1">
                <span className="text-emerald-300 font-semibold">Silver/g:</span>
                <input
                  type="number"
                  step="0.05"
                  value={silverPricePerGram}
                  onChange={(e) => setSilverPricePerGram(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-16 p-1 bg-black/40 border border-emerald-700 rounded text-center font-bold text-slate-200"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Calculated Output Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-emerald-900 to-emerald-950 p-6 sm:p-7 rounded-3xl border border-amber-400/30 shadow-xl space-y-6">
          
          <div className="space-y-4">
            
            {/* Header Result */}
            <div className="border-b border-emerald-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300">Zakat Calculation Result</span>
                
                {/* Nisab Standard Toggle */}
                <div className="bg-black/40 p-1 rounded-xl border border-emerald-800 text-[10px] flex items-center space-x-1">
                  <button
                    onClick={() => setNisabStandard('gold')}
                    className={`px-2 py-0.5 rounded-lg font-bold transition-colors ${
                      nisabStandard === 'gold' ? 'bg-amber-400 text-emerald-950' : 'text-emerald-200'
                    }`}
                  >
                    Gold Nisab (85g)
                  </button>
                  <button
                    onClick={() => setNisabStandard('silver')}
                    className={`px-2 py-0.5 rounded-lg font-bold transition-colors ${
                      nisabStandard === 'silver' ? 'bg-amber-400 text-emerald-950' : 'text-emerald-200'
                    }`}
                  >
                    Silver Nisab (595g)
                  </button>
                </div>
              </div>
            </div>

            {/* TOTAL ZAKAT DUE HIGHLIGHT BOX */}
            <div className="bg-black/40 p-6 rounded-2xl border-2 border-amber-400/60 text-center space-y-2 shadow-inner">
              <p className="text-xs uppercase font-extrabold text-emerald-300 tracking-widest">Total Payable Zakat (2.5%)</p>
              <p className="text-4xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight">
                {currencySymbol}{totalZakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>

              {/* Status Badge */}
              <div className="pt-2">
                {isNisabMet ? (
                  <span className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3.5 py-1 rounded-full font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Nisab Met — Zakat Obligation Due</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3.5 py-1 rounded-full font-bold">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Wealth is Below Nisab Threshold</span>
                  </span>
                )}
              </div>
            </div>

            {/* Financial Summary Items */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-emerald-950/60 rounded-xl border border-emerald-800/40">
                <span className="text-emerald-200">Total Gross Wealth:</span>
                <span className="font-bold text-white">{currencySymbol}{totalGrossWealth.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-emerald-950/60 rounded-xl border border-emerald-800/40">
                <span className="text-rose-300">Deductible Liabilities:</span>
                <span className="font-bold text-rose-300">-{currencySymbol}{(debtsLiabilities || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-emerald-900/60 rounded-xl border border-emerald-700/60">
                <span className="text-emerald-100 font-bold">Net Eligible Wealth:</span>
                <span className="font-black text-amber-300 text-sm">{currencySymbol}{totalNetWealth.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-emerald-950/60 rounded-xl border border-emerald-800/40">
                <span className="text-emerald-200">Nisab Cutoff ({nisabStandard === 'gold' ? '85g Gold' : '595g Silver'}):</span>
                <span className="font-semibold text-amber-400">{currencySymbol}{activeNisabThreshold.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Breakdown per Asset Class */}
            {isNisabMet && (
              <div className="bg-black/20 p-3.5 rounded-2xl border border-emerald-800/50 space-y-2">
                <p className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Zakat Breakdown</p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>Cash: <strong className="text-white">{currencySymbol}{cashZakat.toFixed(2)}</strong></div>
                  <div>Gold: <strong className="text-white">{currencySymbol}{goldZakat.toFixed(2)}</strong></div>
                  <div>Silver: <strong className="text-white">{currencySymbol}{silverZakat.toFixed(2)}</strong></div>
                  <div>Trade & Stocks: <strong className="text-white">{currencySymbol}{investmentZakat.toFixed(2)}</strong></div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Note */}
          <div className="pt-2 text-[11px] text-emerald-200/80 leading-relaxed border-t border-emerald-800/60 space-y-1">
            <p className="flex items-center gap-1 text-amber-300 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Shariah Guidance:</span>
            </p>
            <p>
              Zakat is due once wealth equals or exceeds Nisab and has been held for one full lunar year (Hawl).
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
