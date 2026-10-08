import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  TrendingUp, 
  DollarSign,
  PieChart,
  ArrowUpRight
} from 'lucide-react';

const STATEMENTS = [
  { id: 'ST-501', date: '2026-10-08', source: 'Container Dividend', ref: 'Titanium Lot #884', gross: 200.00, fee: 0.00, net: 200.00 },
  { id: 'ST-502', date: '2026-10-08', source: 'Forex Execution', ref: 'SCFI-200 Long', gross: 716.00, fee: 14.32, net: 701.68 },
  { id: 'ST-503', date: '2026-10-08', source: 'Level 1 Matching', ref: 'Sponsor Bonus SZ-1049', gross: 1500.00, fee: 0.00, net: 1500.00 },
  { id: 'ST-504', date: '2026-10-07', source: 'Level 2 Commission', ref: 'Downline Lot SZ-1061', gross: 375.00, fee: 0.00, net: 375.00 },
  { id: 'ST-505', date: '2026-10-07', source: 'Container Dividend', ref: 'Titanium Lot #884', gross: 200.00, fee: 0.00, net: 200.00 },
  { id: 'ST-506', date: '2026-10-06', source: 'Forex Execution', ref: 'EUR/USD Buy', gross: 122.00, fee: 2.44, net: 119.56 },
  { id: 'ST-507', date: '2026-10-06', source: 'Rank Reward Milestone', ref: 'Diamond Tier Bonus', gross: 20000.00, fee: 0.00, net: 20000.00 },
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState('ALL');

  const filteredStatements = STATEMENTS.filter(s => {
    if (reportType === 'ALL') return true;
    if (reportType === 'DIVIDEND') return s.source.includes('Dividend');
    if (reportType === 'AFFILIATE') return s.source.includes('Level') || s.source.includes('Reward');
    if (reportType === 'TRADING') return s.source.includes('Forex');
    return true;
  });

  const handleDownloadReport = () => {
    alert("Exporting financial ledger report (.CSV) to your downloads folder.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#1E2430]">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Financial Statements & Accounting Reports
          </h2>
          <p className="text-xs text-slate-400">
            Audit-ready earning ledgers, dividend vouchers, and tax summaries
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          className="square-btn px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5 shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Statement (.CSV)</span>
        </button>
      </div>

      {/* Revenue Stream Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-[#0E121A] border border-[#1E2430] p-3 sm:p-4">
          <div className="text-[11px] sm:text-xs text-slate-400">Affiliate Matching</div>
          <div className="font-mono text-base xs:text-lg sm:text-xl font-bold text-white">$48,200.00</div>
          <div className="text-[9px] sm:text-[10px] text-emerald-400">26.4% Total</div>
        </div>

        <div className="bg-[#0E121A] border border-[#1E2430] p-3 sm:p-4">
          <div className="text-[11px] sm:text-xs text-slate-400">Container Dividends</div>
          <div className="font-mono text-base xs:text-lg sm:text-xl font-bold text-white">$64,800.00</div>
          <div className="text-[9px] sm:text-[10px] text-emerald-400">35.5% Total</div>
        </div>

        <div className="bg-[#0E121A] border border-[#1E2430] p-3 sm:p-4">
          <div className="text-[11px] sm:text-xs text-slate-400">Forex Trading P&L</div>
          <div className="font-mono text-base xs:text-lg sm:text-xl font-bold text-white">$43,443.67</div>
          <div className="text-[9px] sm:text-[10px] text-emerald-400">23.8% Total</div>
        </div>

        <div className="bg-[#0E121A] border border-[#1E2430] p-3 sm:p-4">
          <div className="text-[11px] sm:text-xs text-slate-400">Rank Rewards</div>
          <div className="font-mono text-base xs:text-lg sm:text-xl font-bold text-amber-400">$26,036.33</div>
          <div className="text-[9px] sm:text-[10px] text-slate-400">14.3% Total</div>
        </div>
      </div>

      {/* Detailed Statements Table */}
      <div className="bg-[#0E121A] border border-[#1E2430] p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#1E2430] mb-3">
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Ledger Audit Log
          </h3>

          {/* Filter options */}
          <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
            {[
              { id: 'ALL', label: 'All Streams' },
              { id: 'DIVIDEND', label: 'Dividends' },
              { id: 'AFFILIATE', label: 'Affiliates' },
              { id: 'TRADING', label: 'Trading' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setReportType(f.id)}
                className={`square-btn px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs border shrink-0 ${
                  reportType === f.id
                    ? 'bg-[#1E2430] text-white border-slate-500 font-medium'
                    : 'bg-[#0A0D14] text-slate-400 border-[#1E2430] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="text-[10px] text-slate-500 mb-1.5 sm:hidden font-mono flex items-center justify-between">
          <span>← Swipe horizontally to view statements →</span>
          <span>{filteredStatements.length} vouchers</span>
        </div>

        <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0 border-y sm:border border-[#1E2430]">
          <table className="excel-table text-left min-w-[620px]">
            <thead>
              <tr>
                <th>Voucher #</th>
                <th>Posting Date</th>
                <th>Stream / Source</th>
                <th>Reference Description</th>
                <th className="text-right">Gross</th>
                <th className="text-right">Fee</th>
                <th className="text-right">Net Credit</th>
              </tr>
            </thead>
            <tbody>
              {filteredStatements.map((item) => (
                <tr key={item.id}>
                  <td className="font-mono text-slate-200 font-medium">{item.id}</td>
                  <td className="font-mono text-slate-400 text-[11px]">{item.date}</td>
                  <td className="text-slate-200">{item.source}</td>
                  <td className="text-slate-400 text-[11px]">{item.ref}</td>
                  <td className="text-right font-mono text-slate-200">
                    ${item.gross.toFixed(2)}
                  </td>
                  <td className="text-right font-mono text-slate-500 text-[11px]">
                    ${item.fee.toFixed(2)}
                  </td>
                  <td className="text-right font-mono font-bold text-emerald-400">
                    +${item.net.toFixed(2)}
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
