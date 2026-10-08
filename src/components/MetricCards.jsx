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
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      badge: '+18.4%',
      badgeType: 'pos',
      sub: 'All revenue streams'
    },
    {
      id: 'today-income',
      title: 'Today Income',
      value: `$${stats.todayIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Clock,
      iconBg: 'bg-slate-800 text-slate-300',
      badge: 'Today',
      badgeType: 'neutral',
      sub: 'Session in progress'
    },
    {
      id: 'total-spend',
      title: 'Total Spend',
      value: `$${stats.totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: CreditCard,
      iconBg: 'bg-blue-500/10 text-blue-400',
      badge: 'Invested',
      badgeType: 'neutral',
      sub: 'Active investments'
    },
    {
      id: 'today-spend',
      title: 'Today Spend',
      value: `$${stats.todaySpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: WalletCards,
      iconBg: 'bg-slate-800 text-slate-300',
      badge: '2 Lots',
      badgeType: 'neutral',
      sub: 'Container lots'
    },
    {
      id: 'total-member',
      title: 'Total Member',
      value: stats.totalMembers.toString(),
      icon: Users,
      iconBg: 'bg-slate-800 text-slate-300',
      badge: 'Network',
      badgeType: 'neutral',
      sub: 'Downline team'
    },
    {
      id: 'active-member',
      title: 'Total Active Member',
      value: stats.activeMembers.toString(),
      icon: UserCheck,
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      badge: 'Active',
      badgeType: 'pos',
      sub: 'Generating ROI'
    },
    {
      id: 'inactive-member',
      title: 'Total Inactive Member',
      value: stats.inactiveMembers.toString(),
      icon: UserX,
      iconBg: 'bg-slate-800 text-slate-400',
      badge: 'Pending',
      badgeType: 'neutral',
      sub: 'Unverified'
    },
    {
      id: 'block-member',
      title: 'Block Member',
      value: stats.blockMembers.toString(),
      icon: ShieldAlert,
      iconBg: 'bg-slate-800 text-slate-400',
      badge: 'Clear',
      badgeType: 'neutral',
      sub: 'Zero flagged'
    },
    {
      id: 'rank-rewards',
      title: 'My Rank and Rewards',
      value: `$${stats.rankRewards.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Award,
      iconBg: 'bg-amber-500/10 text-amber-400',
      badge: 'Diamond',
      badgeType: 'gold',
      sub: 'Tier 4 Leader'
    },
    {
      id: 'paid-withdrawal',
      title: 'Paid Withdrawal',
      value: `$${stats.paidWithdrawal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: CheckCircle2,
      iconBg: 'bg-slate-800 text-slate-300',
      badge: 'Settled',
      badgeType: 'neutral',
      sub: 'Wallet payouts'
    },
  ];

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Account Overview
        </h2>
        <span className="text-[11px] text-slate-500">Live Telemetry</span>
      </div>

      {/* Grid: 2 columns on mobile (just like the screenshot!), 3 on tablet, 5 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="square-card p-3 sm:p-3.5 flex flex-col justify-between hover:border-[#2D3748] transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-1.5 mb-1.5 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-400 leading-tight">
                    {card.title}
                  </span>
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex items-center justify-center ${card.iconBg}`}>
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>

                <div className="font-mono text-base sm:text-xl font-bold text-white tracking-tight mb-1 sm:mb-2 truncate">
                  {card.value}
                </div>
              </div>

              <div className="pt-1.5 sm:pt-2 border-t border-[#181E29] flex items-center justify-between text-[10px] sm:text-[11px] gap-1">
                <span className="text-slate-500 text-[10px] truncate max-w-[75px] sm:max-w-[110px] hidden xs:inline">
                  {card.sub}
                </span>
                <span className={`px-1.5 py-0.2 text-[9px] sm:text-[10px] font-medium ml-auto ${
                  card.badgeType === 'pos' 
                    ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/50' 
                    : card.badgeType === 'gold'
                    ? 'text-amber-400 bg-amber-950/40 border border-amber-800/50'
                    : 'text-slate-400 bg-slate-800/50 border border-slate-700/60'
                }`}>
                  {card.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
