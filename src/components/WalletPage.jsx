import React, { useState } from 'react';
import { 
  Wallet, 
  Plus, 
  ArrowDownLeft, 
  CheckCircle2, 
  Search 
} from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  { id: 'TX-9841', date: '2026-10-08 21:14', type: 'TRADING_PROFIT', desc: 'SCFI Container Freight Lot Close', amount: +716.00, status: 'COMPLETED' },
  { id: 'TX-9832', date: '2026-10-08 19:40', type: 'AFFILIATE_BONUS', desc: 'Level 1 Commission from SZ-1049', amount: +1500.00, status: 'COMPLETED' },
  { id: 'TX-9790', date: '2026-10-07 14:15', type: 'WITHDRAWAL', desc: 'Payout to USDT TRC-20 Address', amount: -5000.00, status: 'COMPLETED' },
  { id: 'TX-9742', date: '2026-10-06 09:30', type: 'DEPOSIT', desc: 'Wire Transfer Credit', amount: +10000.00, status: 'COMPLETED' },
  { id: 'TX-9689', date: '2026-10-05 18:22', type: 'AFFILIATE_BONUS', desc: 'Level 2 Team Commission', amount: +680.00, status: 'COMPLETED' },
  { id: 'TX-9611', date: '2026-10-04 12:00', type: 'DAILY_ROI', desc: 'Titanium Container Dividend Yield', amount: +150.00, status: 'COMPLETED' },
  { id: 'TX-9540', date: '2026-10-03 16:45', type: 'WITHDRAWAL', desc: 'Payout to Bank Beneficiary', amount: -4500.00, status: 'COMPLETED' },
];

export default function WalletPage({ walletBalance, onOpenDeposit, onOpenWithdraw }) {
  const [filterType, setFilterType] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredTx = INITIAL_TRANSACTIONS.filter((tx) => {
    const matchesFilter = filterType === 'ALL' || tx.type === filterType;
    const matchesSearch = tx.desc.toLowerCase().includes(search.toLowerCase()) || tx.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#1E2430]">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Wallet & Financial Ledger
          </h2>
          <p className="text-xs text-slate-400">
            Real-time liquid capital, Forex trading margin, and withdrawal history
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDeposit}
            className="square-btn px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Deposit</span>
          </button>
          <button
            onClick={onOpenWithdraw}
            className="square-btn px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5"
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {/* 3 Wallet Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
        <div className="bg-[#0E121A] border border-[#1E2430] p-3.5 sm:p-4">
          <div className="text-xs text-slate-400 font-medium mb-1">Available Liquid Wallet</div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-white mb-1.5">
            ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 shrink-0" />
            <span>Instant trading or withdrawal</span>
          </div>
        </div>

        <div className="bg-[#0E121A] border border-[#1E2430] p-3.5 sm:p-4">
          <div className="text-xs text-slate-400 font-medium mb-1">Allocated Trading Margin</div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-slate-200 mb-1.5">
            $24,500.00
          </div>
          <div className="text-[11px] text-slate-400">
            Active in Forex & Container lots
          </div>
        </div>

        <div className="bg-[#0E121A] border border-[#1E2430] p-3.5 sm:p-4">
          <div className="text-xs text-slate-400 font-medium mb-1">Total Payouts Settled</div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-slate-200 mb-1.5">
            $24,734.50
          </div>
          <div className="text-[11px] text-slate-400">
            100% processed without delays
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-[#0E121A] border border-[#1E2430] p-3.5 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#1E2430] mb-3">
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Transaction Activity Log
          </h3>

          <div className="relative w-full sm:w-auto">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-48 bg-[#0A0D14] border border-[#1E2430] pl-8 pr-3 py-1.5 text-xs text-white outline-none font-mono focus:border-slate-500"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 border-b border-[#1E2430] mb-3 text-xs overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
          {['ALL', 'DEPOSIT', 'WITHDRAWAL', 'TRADING_PROFIT', 'AFFILIATE_BONUS'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs border-b-2 font-medium shrink-0 ${
                filterType === t ? 'text-white border-white' : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#1E2430]">
          <table className="excel-table text-left min-w-[580px]">
            <thead>
              <tr>
                <th>Tx ID</th>
                <th>Date & Time</th>
                <th>Description</th>
                <th>Category</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTx.map((tx) => (
                <tr key={tx.id}>
                  <td className="font-mono text-slate-200 font-medium text-xs">{tx.id}</td>
                  <td className="font-mono text-[11px] text-slate-400">{tx.date}</td>
                  <td className="text-slate-200 text-xs">{tx.desc}</td>
                  <td>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {tx.type}
                    </span>
                  </td>
                  <td className={`text-right font-mono font-semibold text-xs ${tx.amount > 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                  </td>
                  <td className="text-center">
                    <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
