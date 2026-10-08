import React from 'react';
import { 
  Award, 
  Check, 
  Crown, 
  Gift, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

const RANKS = [
  {
    level: 1,
    name: 'Silver Ambassador',
    requiredVolume: '$5,000 Team Volume',
    bonus: '$250.00 Cash Bonus',
    perks: ['Standard Affiliate Rate', 'Weekly Payouts'],
    achieved: true,
    claimed: true
  },
  {
    level: 2,
    name: 'Gold Director',
    requiredVolume: '$25,000 Team Volume',
    bonus: '$1,250.00 Cash Bonus',
    perks: ['+2% Matching Commission', 'Forex VIP Signals Desk'],
    achieved: true,
    claimed: true
  },
  {
    level: 3,
    name: 'Platinum Leader',
    requiredVolume: '$75,000 Team Volume',
    bonus: '$4,500.00 Cash Bonus',
    perks: ['Dubai Logistics Summit Pass', 'Dedicated Manager'],
    achieved: true,
    claimed: true
  },
  {
    level: 4,
    name: 'Diamond Ambassador',
    requiredVolume: '$200,000 Team Volume',
    bonus: '$20,000.00 Luxury Bonus',
    perks: ['Container Freight Equity Share', 'Priority OTC Payouts'],
    achieved: true,
    claimed: true,
    current: true
  },
  {
    level: 5,
    name: 'Crown Elite',
    requiredVolume: '$500,000 Team Volume',
    bonus: '$50,000.00 Cash Reward',
    perks: ['2% Global Profit Pool Share', 'Board Advisor Seat'],
    achieved: false,
    claimed: false,
    progress: 84
  },
];

export default function RankRewardsPage({ onClaimReward }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2430]">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Leadership Ranks & Career Milestone Rewards
          </h2>
          <p className="text-xs text-slate-400">
            Progress through institutional affiliate ranks by expanding your global downline volume
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/50 flex items-center gap-1.5 font-semibold">
            <Award className="w-4 h-4" />
            Current: Diamond Ambassador
          </span>
        </div>
      </div>

      {/* Progress to Next Rank */}
      <div className="square-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Next Milestone: Crown Elite
            </div>
            <p className="text-xs text-slate-400">
              Qualify for $50,000.00 Cash Bonus and 2% Global Royalty Dividend Pool
            </p>
          </div>
          <div className="text-right">
            <span className="font-mono text-xl font-bold text-emerald-400">84%</span>
            <span className="text-xs text-slate-500 block">$421,500 / $500,000 Volume</span>
          </div>
        </div>

        <div className="w-full bg-[#0A0D14] h-2.5 border border-[#1E2430]">
          <div className="bg-emerald-500 h-full w-[84%]"></div>
        </div>
      </div>

      {/* Total Rewards Claimed summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="square-card p-4">
          <div className="text-xs text-slate-400">Total Rewards Paid</div>
          <div className="font-mono text-2xl font-bold text-white">$26,036.33</div>
          <div className="text-[11px] text-emerald-400">Cumulative bonuses earned</div>
        </div>

        <div className="square-card p-4">
          <div className="text-xs text-slate-400">Next Cash Payout</div>
          <div className="font-mono text-2xl font-bold text-amber-400">$50,000.00</div>
          <div className="text-[11px] text-slate-400">Upon reaching Crown rank</div>
        </div>

        <div className="square-card p-4">
          <div className="text-xs text-slate-400">Global Pool Share</div>
          <div className="font-mono text-2xl font-bold text-purple-400">2.0%</div>
          <div className="text-[11px] text-slate-400">Contractual revenue split</div>
        </div>
      </div>

      {/* Rank Ladder Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Career Hierarchy Ladder
        </h3>

        {RANKS.map((rank) => (
          <div
            key={rank.level}
            className={`square-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              rank.current ? 'border-amber-500/70 bg-[#161B24]' : ''
            }`}
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className={`w-9 h-9 flex items-center justify-center font-bold text-xs shrink-0 ${
                rank.achieved 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {rank.level}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{rank.name}</h4>
                  {rank.current && (
                    <span className="px-1.5 py-0.2 text-[9px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800">
                      CURRENT RANK
                    </span>
                  )}
                  {rank.achieved && !rank.current && (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                      <Check className="w-3 h-3" /> Unlocked
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Requirement: <span className="text-slate-200 font-mono">{rank.requiredVolume}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono">
              <div className="text-left sm:text-right">
                <div className="font-bold text-emerald-400">{rank.bonus}</div>
                <div className="text-[11px] text-slate-500">{rank.perks[0]}</div>
              </div>

              <div>
                {rank.achieved ? (
                  <span className="square-btn px-3 py-1.5 bg-[#0A0D14] border border-[#1E2430] text-slate-400 text-xs inline-block">
                    Claimed
                  </span>
                ) : (
                  <span className="square-btn px-3 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 text-xs inline-block">
                    In Progress ({rank.progress}%)
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
