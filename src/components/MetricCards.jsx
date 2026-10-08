import React from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Users, 
  Wallet, 
  Award, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export default function MetricCards({ stats }) {
  const metrics = [
    {
      title: 'Total Income',
      value: `$${stats.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sub: 'Today: $0.00',
      badge: '+18.4%',
      isPositive: true
    },
    {
      title: 'Total Spend',
      value: `$${stats.totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sub: `Today: $${stats.todaySpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      badge: 'Invested',
      isPositive: null
    },
    {
      title: 'Total Members',
      value: stats.totalMembers.toString(),
      sub: `Active: ${stats.activeMembers} | Inactive: ${stats.inactiveMembers}`,
      badge: `${((stats.activeMembers / stats.totalMembers) * 100).toFixed(0)}% Active`,
      isPositive: true
    },
    {
      title: 'Rank & Rewards',
      value: `$${stats.rankRewards.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sub: 'Diamond Ambassador Tier',
      badge: 'VIP Tier 4',
      isPositive: null
    },
    {
      title: 'Paid Withdrawals',
      value: `$${stats.paidWithdrawal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sub: '100% Settled to USDT',
      badge: 'Completed',
      isPositive: true
    },
  ];

  const secondaryStats = [
    { label: 'Today Income', val: `$${stats.todayIncome.toFixed(2)}` },
    { label: 'Today Spend', val: `$${stats.todaySpend.toFixed(2)}` },
    { label: 'Active Members', val: stats.activeMembers.toString() },
    { label: 'Inactive Members', val: stats.inactiveMembers.toString() },
    { label: 'Blocked Members', val: stats.blockMembers.toString() },
  ];

  return (
    <section className="mb-6 space-y-3">
      {/* 5 Primary Clean Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="bg-[#11151F] border border-[#1C2333] p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">
                  {m.title}
                </span>
                {m.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 font-mono ${
                    m.isPositive
                      ? 'text-emerald-400 bg-emerald-950/30'
                      : 'text-slate-400 bg-slate-800/40'
                  }`}>
                    {m.badge}
                  </span>
                )}
              </div>

              <div className="font-mono text-xl xl:text-2xl font-semibold text-white tracking-tight mb-2">
                {m.value}
              </div>
            </div>

            <div className="pt-2 border-t border-[#181F2E] text-[11px] text-slate-500 font-mono truncate">
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Quick Strip (Clean, unobtrusive data row) */}
      <div className="bg-[#0D111A] border border-[#181F2E] px-4 py-2.5 hidden md:flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
          Session Sub-Metrics:
        </span>
        {secondaryStats.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-slate-500">{s.label}:</span>
            <span className="text-slate-200 font-medium">{s.val}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
