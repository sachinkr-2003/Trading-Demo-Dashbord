import React, { useState } from 'react';
import MetricCards from './MetricCards';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Copy, 
  Check, 
  Award, 
  Users, 
  Plus, 
  ArrowDownLeft, 
  FileSpreadsheet, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function DashboardOverview({ 
  stats, 
  walletBalance, 
  onOpenDeposit, 
  onOpenWithdraw, 
  onNavigate 
}) {
  const [copied, setCopied] = useState(false);
  const [activeChartPair, setActiveChartPair] = useState('EUR/USD');
  const referralLink = "https://shipzo.international/register?ref=GAURAV_VIP";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Recent transactions preview
  const recentActivities = [
    { id: 'ORD-9821', title: 'EUR/USD Long Order', type: 'TRADE', amount: '+$122.00', status: 'Active', time: '14:22' },
    { id: 'ORD-9740', title: 'SCFI Freight Lot #204', type: 'DIVIDEND', amount: '+$716.00', status: 'Settled', time: '11:05' },
    { id: 'SZ-1049', title: 'Vikram Mehta (Direct)', type: 'AFFILIATE', amount: '+$1,500.00', status: 'Credited', time: '09:30' },
    { id: 'TX-9790', title: 'USDT TRC-20 Payout', type: 'PAYOUT', amount: '-$5,000.00', status: 'Processed', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. The 10 Core Metric Cards */}
      <MetricCards stats={stats} />

      {/* 2. Balanced 2-Column Professional Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (2/3): Market Overview & Activity */}
        <div className="lg:col-span-2 space-y-5">
          {/* Clean Performance Overview Card */}
          <div className="bg-[#0E121A] border border-[#1E2430] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#181E29] mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Live Market Telemetry
                </span>
                <div className="flex items-center gap-1 bg-[#0A0D14] border border-[#1E2430] p-0.5 text-xs font-mono">
                  {['EUR/USD', 'SCFI FREIGHT', 'GBP/USD'].map((pair) => (
                    <button
                      key={pair}
                      onClick={() => setActiveChartPair(pair)}
                      className={`px-2 py-0.5 ${
                        activeChartPair === pair ? 'bg-[#1E2430] text-white font-medium' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {pair}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('trading')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
                >
                  <span>Open Full Terminal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Price Headline */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-2xl font-bold text-white">
                {activeChartPair === 'EUR/USD' ? '1.08542' : activeChartPair === 'GBP/USD' ? '1.26543' : '2,145.80'}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +0.42% Today
              </span>
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                Spread: 0.6 pip · 24h High: 1.08810 · Low: 1.08240
              </span>
            </div>

            {/* Clean SVG Area Trend Chart */}
            <div className="h-44 w-full bg-[#0A0D14] border border-[#181E29] p-2 relative overflow-hidden">
              <svg viewBox="0 0 600 160" className="w-full h-full">
                <defs>
                  <linearGradient id="overviewArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 120 Q 80 130 140 90 T 260 75 T 380 40 T 480 55 T 590 25 L 590 150 L 10 150 Z"
                  fill="url(#overviewArea)"
                />
                <path
                  d="M 10 120 Q 80 130 140 90 T 260 75 T 380 40 T 480 55 T 590 25"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute bottom-2 right-3 text-[10px] text-slate-500 font-mono">
                Real-time Quote Stream
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-[#0E121A] border border-[#1E2430] p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#181E29] mb-3">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Recent Revenue & Order Activity
              </h3>
              <button
                onClick={() => onNavigate('wallet')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <span>View All History</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="excel-table text-left">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Activity</th>
                    <th>Type</th>
                    <th className="text-right">Net Amount</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((row) => (
                    <tr key={row.id}>
                      <td className="font-mono text-slate-400 text-xs">{row.id}</td>
                      <td className="font-medium text-slate-200 text-xs">{row.title}</td>
                      <td>
                        <span className="text-[10px] font-mono text-slate-400">
                          {row.type}
                        </span>
                      </td>
                      <td className={`text-right font-mono font-semibold text-xs ${
                        row.amount.startsWith('+') ? 'text-emerald-400' : 'text-slate-300'
                      }`}>
                        {row.amount}
                      </td>
                      <td className="text-center">
                        <span className="inline-block px-1.5 py-0.5 text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 font-medium">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Referral Widget & Network Health */}
        <div className="space-y-5">
          {/* Quick Actions Card */}
          <div className="bg-[#0E121A] border border-[#1E2430] p-4 sm:p-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Quick Management
            </h3>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={onOpenDeposit}
                className="square-btn py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center justify-center gap-1.5 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Deposit Funds</span>
              </button>
              <button
                onClick={onOpenWithdraw}
                className="square-btn py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center justify-center gap-1.5 font-medium"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>Request Payout</span>
              </button>
            </div>

            <button
              onClick={() => onNavigate('packages')}
              className="w-full square-btn py-2 bg-[#12161F] hover:bg-[#181E29] text-slate-200 border border-[#1E2430] text-xs flex items-center justify-center gap-1.5"
            >
              <span>Explore Container Lots & Dividends</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Referral Partner Box */}
          <div className="bg-[#0E121A] border border-[#1E2430] p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Affiliate Referral Link
              </h3>
              <span className="text-[10px] font-mono text-amber-400">15% Direct</span>
            </div>

            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Earn 4 tiers of matching volume commissions on all downline container investments.
            </p>

            <div className="bg-[#0A0D14] border border-[#1E2430] p-1.5 flex items-center justify-between gap-2 mb-3">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="bg-transparent font-mono text-xs text-slate-300 outline-none w-full px-1 truncate"
              />
              <button
                onClick={handleCopy}
                className={`square-btn px-2.5 py-1 text-xs shrink-0 flex items-center gap-1 ${
                  copied ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-[#181E29] flex items-center justify-between text-xs text-slate-400">
              <span>Direct Downlines: <strong className="text-white font-mono">142</strong></span>
              <button
                onClick={() => onNavigate('network')}
                className="text-emerald-400 hover:underline flex items-center gap-0.5"
              >
                <span>View Network</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Rank & Milestone Snapshot */}
          <div className="bg-[#0E121A] border border-[#1E2430] p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Career Milestone
              </div>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                Diamond VIP
              </span>
            </div>

            <div className="text-xs text-slate-400 mb-2">
              Progress to Crown Elite ($50,000 Reward)
            </div>

            <div className="w-full bg-[#0A0D14] h-2 border border-[#1E2430] mb-2">
              <div className="bg-emerald-500 h-full w-[84%]"></div>
            </div>

            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>$421.5k / $500k Volume</span>
              <span className="text-slate-300">84%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
