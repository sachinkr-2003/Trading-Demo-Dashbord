import React from 'react';
import { 
  DollarSign, 
  Clock, 
  CreditCard, 
  WalletCards, 
  Users, 
  UserCheck, 
  UserX, 
  ShieldAlert, 
  Award, 
  CheckCircle2 
} from 'lucide-react';

export default function MetricCards({ stats }) {
  const cards = [
    {
      id: 'total-income',
      title: 'Total Income',
      value: `$${stats.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      sub: 'All revenue streams',
      trend: '+18.4%',
      isPositive: true
    },
    {
      id: 'today-income',
      title: 'Today Income',
      value: `$${stats.todayIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Clock,
      sub: 'Session in progress',
      trend: '$0.00',
      isNeutral: true
    },
    {
      id: 'total-spend',
      title: 'Total Spend',
      value: `$${stats.totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: CreditCard,
      sub: 'Allocated lots',
      trend: 'Capital',
      isNeutral: true
    },
    {
      id: 'today-spend',
      title: 'Today Spend',
      value: `$${stats.todaySpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: WalletCards,
      sub: '2 active lots',
      trend: 'Today',
      isNeutral: true
    },
    {
      id: 'total-member',
      title: 'Total Members',
      value: stats.totalMembers.toString(),
      icon: Users,
      sub: 'All generations',
      trend: 'Network',
      isNeutral: true
    },
    {
      id: 'active-member',
      title: 'Active Members',
      value: stats.activeMembers.toString(),
      icon: UserCheck,
      sub: 'Earning daily ROI',
      trend: '71.2%',
      isPositive: true
    },
    {
      id: 'inactive-member',
      title: 'Inactive Members',
      value: stats.inactiveMembers.toString(),
      icon: UserX,
      sub: 'Pending KYC/Lot',
      trend: '81 pending',
      isNeutral: true
    },
    {
      id: 'block-member',
      title: 'Blocked Members',
      value: stats.blockMembers.toString(),
      icon: ShieldAlert,
      sub: 'Compliance clear',
      trend: '0 issues',
      isNeutral: true
    },
    {
      id: 'rank-rewards',
      title: 'Rank & Rewards',
      value: `$${stats.rankRewards.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Award,
      sub: 'Diamond Ambassador',
      trend: 'Tier 4',
      isSpecial: true
    },
    {
      id: 'paid-withdrawal',
      title: 'Paid Withdrawals',
      value: `$${stats.paidWithdrawal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: CheckCircle2,
      sub: '100% Settled to wallet',
      trend: 'Settled',
      isPositive: true
    },
  ];

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Executive Summary
        </h2>
        <span className="text-[11px] text-slate-500 font-mono">10 Key Performance Indicators</span>
      </div>

      {/* Clean, minimalist 5-col desktop / 2-col mobile cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-[#0E121A] border border-[#1E2430] p-3.5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-medium text-slate-300 truncate">
                    {card.title}
                  </span>
                  <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>

                <div className="font-mono text-lg sm:text-xl font-bold text-white tracking-tight mb-2 truncate">
                  {card.value}
                </div>
              </div>

              <div className="pt-2 border-t border-[#181E29] flex items-center justify-between text-[11px]">
                <span className="text-slate-500 text-[10px] truncate max-w-[85px] sm:max-w-[110px]">
                  {card.sub}
                </span>
                <span className={`text-[10px] font-mono font-medium ${
                  card.isPositive 
                    ? 'text-emerald-400' 
                    : card.isSpecial
                    ? 'text-amber-400'
                    : 'text-slate-400'
                }`}>
                  {card.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
