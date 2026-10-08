import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Search, 
  Plus
} from 'lucide-react';

const INITIAL_MEMBERS = [
  { id: 'SZ-1049', name: 'Vikram Mehta', date: '2026-09-14', package: 'Titanium Container Lot', investment: 10000, dailyRoi: 150.00, levelBonus: 1500.00, sponsor: 'GAURAV_VIP', status: 'ACTIVE' },
  { id: 'SZ-1052', name: 'Ananya Sharma', date: '2026-09-18', package: 'Diamond Forex 5.0', investment: 5000, dailyRoi: 75.00, levelBonus: 750.00, sponsor: 'GAURAV_VIP', status: 'ACTIVE' },
  { id: 'SZ-1061', name: 'Rahul Deshmukh', date: '2026-09-22', package: 'Platinum Logistics', investment: 2500, dailyRoi: 37.50, levelBonus: 375.00, sponsor: 'SZ-1049', status: 'ACTIVE' },
  { id: 'SZ-1077', name: 'Pooja Verma', date: '2026-09-25', package: 'Gold Forex 2.0', investment: 1000, dailyRoi: 15.00, levelBonus: 150.00, sponsor: 'SZ-1052', status: 'ACTIVE' },
  { id: 'SZ-1085', name: 'Kunal Singhania', date: '2026-09-28', package: 'Titanium Container Lot', investment: 10000, dailyRoi: 150.00, levelBonus: 1500.00, sponsor: 'GAURAV_VIP', status: 'ACTIVE' },
  { id: 'SZ-1090', name: 'Aakash Patel', date: '2026-10-01', package: 'Silver Starter Lot', investment: 500, dailyRoi: 0.00, levelBonus: 0.00, sponsor: 'SZ-1061', status: 'INACTIVE' },
  { id: 'SZ-1094', name: 'Neha Chawla', date: '2026-10-02', package: 'Diamond Forex 5.0', investment: 5000, dailyRoi: 75.00, levelBonus: 750.00, sponsor: 'SZ-1049', status: 'ACTIVE' },
  { id: 'SZ-1102', name: 'Suresh Kumar', date: '2026-10-04', package: 'Platinum Logistics', investment: 2500, dailyRoi: 37.50, levelBonus: 375.00, sponsor: 'SZ-1085', status: 'ACTIVE' },
  { id: 'SZ-1109', name: 'Deepak Joshi', date: '2026-10-05', package: 'Pending Verification', investment: 0, dailyRoi: 0.00, levelBonus: 0.00, sponsor: 'GAURAV_VIP', status: 'INACTIVE' },
  { id: 'SZ-1115', name: 'Ritu Kapoor', date: '2026-10-07', package: 'Gold Forex 2.0', investment: 1000, dailyRoi: 15.00, levelBonus: 150.00, sponsor: 'SZ-1052', status: 'ACTIVE' },
];

export default function ExcelLedgerTable({ onAddMemberClick }) {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = members.filter((m) => {
    const matchesFilter = filterStatus === 'ALL' || m.status === filterStatus;
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sponsor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.package.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ["Row,Member ID,Full Name,Joined Date,Package,Investment ($),Daily ROI ($),Level Bonus ($),Sponsor,Status"];
    const rows = filteredData.map((m, idx) => 
      `${idx + 1},${m.id},"${m.name}",${m.date},"${m.package}",${m.investment},${m.dailyRoi},${m.levelBonus},${m.sponsor},${m.status}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Shipzo_Members_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleStatus = (id) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        return { ...m, status: m.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' };
      }
      return m;
    }));
  };

  const totalInv = filteredData.reduce((sum, item) => sum + item.investment, 0);
  const totalRoi = filteredData.reduce((sum, item) => sum + item.dailyRoi, 0);
  const totalBon = filteredData.reduce((sum, item) => sum + item.levelBonus, 0);

  return (
    <div className="square-card p-4 mb-6">
      {/* Spreadsheet Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E2430] mb-3">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Member Downline & Earnings Spreadsheet
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            (282 total)
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search member, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0A0D14] border border-[#1E2430] pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none w-52 focus:border-slate-500 font-mono"
            />
          </div>

          {/* Export to CSV */}
          <button
            onClick={handleExportCSV}
            className="square-btn px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {/* Add member button */}
          <button
            onClick={onAddMemberClick}
            className="square-btn px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-[#1E2430] mb-3 text-xs">
        {[
          { key: 'ALL', label: 'All Members (282)' },
          { key: 'ACTIVE', label: 'Active (201)' },
          { key: 'INACTIVE', label: 'Inactive (81)' },
          { key: 'BLOCKED', label: 'Blocked (0)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={`px-3 py-1.5 text-xs border-b-2 font-medium ${
              filterStatus === tab.key
                ? 'text-white border-white'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Spreadsheet Table */}
      <div className="overflow-x-auto border border-[#1E2430]">
        <table className="excel-table text-left">
          <thead>
            <tr>
              <th className="w-10 text-center">#</th>
              <th>Member ID</th>
              <th>Full Name</th>
              <th>Date</th>
              <th>Package</th>
              <th className="text-right">Investment</th>
              <th className="text-right">Daily ROI</th>
              <th className="text-right">Bonus</th>
              <th>Sponsor</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-6 text-slate-500">
                  No matching records found.
                </td>
              </tr>
            ) : (
              filteredData.map((m, idx) => (
                <tr key={m.id}>
                  <td className="text-center text-slate-500 font-mono">{idx + 1}</td>
                  <td className="font-mono text-slate-200 font-medium">{m.id}</td>
                  <td className="text-slate-200">{m.name}</td>
                  <td className="text-slate-400 font-mono text-[11px]">{m.date}</td>
                  <td className="text-slate-300 text-[11px]">{m.package}</td>
                  <td className="text-right font-mono font-medium text-white">
                    ${m.investment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="text-right font-mono text-emerald-400 font-medium">
                    +${m.dailyRoi.toFixed(2)}
                  </td>
                  <td className="text-right font-mono text-slate-200">
                    ${m.levelBonus.toFixed(2)}
                  </td>
                  <td className="font-mono text-slate-400 text-[11px]">{m.sponsor}</td>
                  <td className="text-center">
                    <span
                      className={`inline-block px-1.5 py-0.5 text-[10px] font-medium border ${
                        m.status === 'ACTIVE'
                          ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/40'
                          : 'bg-slate-800/40 text-slate-400 border-slate-700/50'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleToggleStatus(m.id)}
                      className="square-btn px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[10px]"
                    >
                      Switch
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

          {/* Table Totals Row */}
          <tfoot>
            <tr className="bg-[#0E121A] font-semibold text-xs font-mono">
              <td colSpan="5" className="text-right text-slate-400 uppercase">
                Totals:
              </td>
              <td className="text-right text-white">
                ${totalInv.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </td>
              <td className="text-right text-emerald-400">
                +${totalRoi.toFixed(2)}
              </td>
              <td className="text-right text-slate-200">
                ${totalBon.toFixed(2)}
              </td>
              <td colSpan="3" className="text-center text-slate-500 text-[11px]">
                {filteredData.length} records
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
