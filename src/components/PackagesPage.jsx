import React, { useState } from 'react';
import { 
  Package, 
  Ship, 
  TrendingUp, 
  Check, 
  DollarSign, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Clock
} from 'lucide-react';

const PACKAGES = [
  {
    id: 'PKG-SILVER',
    name: 'Silver Starter Lot',
    price: 500,
    dailyRoi: '1.2% / day',
    dailyAmount: 6.00,
    monthlyReturn: '$180.00 / mo',
    term: '12 Months',
    directBonus: '10% Direct Bonus',
    features: ['1 Container Share', 'Standard Forex Execution', 'Weekly Payouts', 'Community Support'],
    popular: false,
    badge: 'Starter'
  },
  {
    id: 'PKG-GOLD',
    name: 'Gold Forex & Cargo',
    price: 1000,
    dailyRoi: '1.5% / day',
    dailyAmount: 15.00,
    monthlyReturn: '$450.00 / mo',
    term: '12 Months',
    directBonus: '12% Direct Bonus',
    features: ['2 Container Shares', 'Forex Signals Access', 'Bi-weekly Payouts', 'Level 1-2 Commissions'],
    popular: false,
    badge: 'Popular'
  },
  {
    id: 'PKG-PLATINUM',
    name: 'Platinum Logistics',
    price: 2500,
    dailyRoi: '1.5% / day',
    dailyAmount: 37.50,
    monthlyReturn: '$1,125.00 / mo',
    term: '12 Months',
    directBonus: '15% Direct Bonus',
    features: ['5 Container Freight Shares', 'Zero-Spread Forex Access', 'Daily Auto-Payouts', 'Level 1-3 Commissions'],
    popular: true,
    badge: 'Best Value'
  },
  {
    id: 'PKG-DIAMOND',
    name: 'Diamond Forex 5.0',
    price: 5000,
    dailyRoi: '1.8% / day',
    dailyAmount: 90.00,
    monthlyReturn: '$2,700.00 / mo',
    term: '12 Months',
    directBonus: '15% Direct Bonus',
    features: ['10 Container Lots', 'Dedicated Account Manager', 'Instant USDT Payouts', 'Level 1-4 Full Matching'],
    popular: false,
    badge: 'High Yield'
  },
  {
    id: 'PKG-TITANIUM',
    name: 'Titanium Global Container',
    price: 10000,
    dailyRoi: '2.0% / day',
    dailyAmount: 200.00,
    monthlyReturn: '$6,000.00 / mo',
    term: '12 Months',
    directBonus: '15% Direct Bonus + 2% Pool',
    features: ['25 International Freight Lots', 'VIP Global Pool Dividend', 'Priority OTC Liquidity', 'All 4 Levels + Crown Bonus'],
    popular: false,
    badge: 'Institutional'
  },
];

export default function PackagesPage({ walletBalance, onBuyPackage }) {
  const [activePlan, setActivePlan] = useState('PKG-PLATINUM');
  const [calculatorDays, setCalculatorDays] = useState(30);

  const selectedPkg = PACKAGES.find(p => p.id === activePlan) || PACKAGES[2];
  const projectedEarnings = (selectedPkg.dailyAmount * calculatorDays).toFixed(2);

  const handleBuy = (pkg) => {
    if (pkg.price > walletBalance) {
      alert("Insufficient wallet balance. Please deposit funds first.");
      return;
    }
    if (onBuyPackage) {
      onBuyPackage(pkg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2430]">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Container Logistics & Forex Investment Packages
          </h2>
          <p className="text-xs text-slate-400">
            Purchase container freight equity lots to generate contractually backed daily dividend returns
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1">
            Wallet Balance: ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {PACKAGES.map((pkg) => {
          const isSelected = activePlan === pkg.id;
          return (
            <div
              key={pkg.id}
              className={`square-card p-4 flex flex-col justify-between transition-all ${
                pkg.popular
                  ? 'border-emerald-600/70 bg-[#141A26]'
                  : isSelected
                  ? 'border-slate-500 bg-[#12161F]'
                  : 'hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {pkg.badge}
                  </span>
                  {pkg.popular && (
                    <span className="px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800">
                      RECOMMENDED
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-white mb-1">{pkg.name}</h3>
                
                <div className="font-mono text-2xl font-bold text-white mb-2">
                  ${pkg.price.toLocaleString()}
                </div>

                <div className="p-2 bg-[#0A0D14] border border-[#181E29] mb-3 text-xs font-mono space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Daily Return:</span>
                    <span className="text-emerald-400 font-bold">{pkg.dailyRoi}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Est. Daily:</span>
                    <span className="text-white">+${pkg.dailyAmount.toFixed(2)}/d</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Contract Term:</span>
                    <span className="text-slate-300">{pkg.term}</span>
                  </div>
                </div>

                <ul className="space-y-1.5 text-[11px] text-slate-300 mb-4">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={() => handleBuy(pkg)}
                  className={`w-full square-btn py-2 text-xs font-semibold ${
                    pkg.popular
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  Purchase Lot
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ROI Profit Estimator Calculator */}
      <div className="square-card p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2430] mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Contract ROI Yield Calculator
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Deterministic Payout Projection</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Selected Package</label>
            <select
              value={activePlan}
              onChange={(e) => setActivePlan(e.target.value)}
              className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-xs text-white outline-none focus:border-slate-500 font-mono"
            >
              {PACKAGES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (${p.price.toLocaleString()}) — {p.dailyRoi}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Projection Horizon ({calculatorDays} Days)</label>
            <input
              type="range"
              min="1"
              max="365"
              value={calculatorDays}
              onChange={(e) => setCalculatorDays(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>30 Days</span>
              <span>90 Days</span>
              <span>180 Days</span>
              <span>365 Days</span>
            </div>
          </div>

          <div className="bg-[#0A0D14] border border-[#1E2430] p-3 flex flex-col justify-between">
            <div className="text-xs text-slate-400">Total Projected Yield:</div>
            <div className="font-mono text-2xl font-bold text-emerald-400">
              +${projectedEarnings}
            </div>
            <div className="text-[10px] text-slate-500">
              Total Capital + Yield: ${(parseFloat(selectedPkg.price) + parseFloat(projectedEarnings)).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
