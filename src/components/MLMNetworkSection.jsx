import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Award, 
  Share2
} from 'lucide-react';

export default function MLMNetworkSection() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://shipzo.international/register?ref=GAURAV_VIP";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const levels = [
    { level: 'Level 1 (Direct)', rate: '15%', members: 142, active: 112, volume: '$124,500', earned: '$18,675.00' },
    { level: 'Level 2 (Team)', rate: '8%', members: 85, active: 58, volume: '$68,200', earned: '$5,456.00' },
    { level: 'Level 3 (Sub-team)', rate: '5%', members: 41, active: 25, volume: '$28,400', earned: '$1,420.00' },
    { level: 'Level 4 (Regional)', rate: '2%', members: 14, active: 6, volume: '$24,250', earned: '$485.33' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      {/* Referral Link & Rank Info */}
      <div className="square-card p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-[#1E2430] mb-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Affiliate Referral Link
            </span>
            <span className="text-[10px] text-amber-400 font-medium">
              Diamond Tier
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            Invite partners to Shipzo Containers & Forex to earn matching commissions across 4 downline tiers.
          </p>

          {/* Link box */}
          <div className="bg-[#0A0D14] border border-[#1E2430] p-1.5 flex items-center justify-between gap-2 mb-4">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="bg-transparent font-mono text-xs text-slate-200 outline-none w-full px-1.5 truncate"
            />
            <button
              onClick={handleCopy}
              className={`square-btn px-3 py-1.5 text-xs shrink-0 flex items-center gap-1 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Rank progress */}
        <div className="bg-[#0A0D14] border border-[#1E2430] p-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400">Current Rank:</span>
            <span className="text-slate-100 font-semibold flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Diamond Ambassador
            </span>
          </div>

          <div className="w-full bg-[#181E29] h-2 mb-2">
            <div className="bg-emerald-500 h-full w-[84%]"></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Next: Crown Tier ($50k pool)</span>
            <span className="text-slate-300">84%</span>
          </div>
        </div>
      </div>

      {/* 4 Levels Affiliate Breakdown */}
      <div className="square-card p-4 lg:col-span-2">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E2430] mb-3">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Downline Tier Structure (4 Levels)
          </span>
          <span className="text-xs font-mono text-slate-400">
            Network Volume: $245,350.00
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {levels.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0A0D14] border border-[#1E2430] p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-200">{item.level}</span>
                <span className="text-[11px] font-mono text-emerald-400 font-medium">
                  {item.rate}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#181E29] text-[11px] font-mono">
                <div>
                  <div className="text-slate-500 text-[10px]">Members</div>
                  <div className="text-slate-200 font-medium">{item.members}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Active</div>
                  <div className="text-emerald-400 font-medium">{item.active}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Volume</div>
                  <div className="text-slate-200">{item.volume}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-slate-400 text-[11px]">Commission:</span>
                <span className="font-mono text-emerald-400 font-semibold">{item.earned}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
