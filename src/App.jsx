import React, { useState } from 'react';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import ForexTradingChart from './components/ForexTradingChart';
import MLMNetworkSection from './components/MLMNetworkSection';
import ExcelLedgerTable from './components/ExcelLedgerTable';
import { DepositModal, WithdrawModal, AddMemberModal } from './components/Modals';
import { 
  Layers, 
  TrendingUp, 
  Users, 
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [walletBalance, setWalletBalance] = useState(111941.50);
  const [stats, setStats] = useState({
    totalIncome: 182480.00,
    todayIncome: 0.00,
    totalSpend: 45804.00,
    todaySpend: 4576.34,
    totalMembers: 282,
    activeMembers: 201,
    inactiveMembers: 81,
    blockMembers: 0,
    rankRewards: 26036.33,
    paidWithdrawal: 24734.50,
  });

  const [activeTab, setActiveTab] = useState('ALL');

  // Modals state
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const tickerData = [
    { pair: 'EUR/USD', price: '1.08542', chg: '+0.42%', up: true },
    { pair: 'GBP/USD', price: '1.26543', chg: '+0.32%', up: true },
    { pair: 'USD/JPY', price: '156.843', chg: '-0.21%', up: false },
    { pair: 'AUD/USD', price: '0.67642', chg: '+0.28%', up: true },
    { pair: 'SCFI FREIGHT', price: '2,145.80', chg: '+1.85%', up: true },
    { pair: 'GOLD/USD', price: '2,654.10', chg: '+0.65%', up: true },
  ];

  const handleDepositSuccess = (amount) => {
    setWalletBalance((prev) => prev + amount);
    setStats((prev) => ({
      ...prev,
      totalSpend: prev.totalSpend + amount,
      todaySpend: prev.todaySpend + amount,
    }));
    showToast(`Deposit of $${amount.toLocaleString()} credited.`);
  };

  const handleWithdrawSuccess = (amount) => {
    setWalletBalance((prev) => prev - amount);
    setStats((prev) => ({
      ...prev,
      paidWithdrawal: prev.paidWithdrawal + amount,
    }));
    showToast(`Withdrawal of $${amount.toLocaleString()} submitted.`);
  };

  const handleOrderPlaced = (order) => {
    showToast(`${order.type} Order executed for ${order.pair} at ${order.entry}`);
  };

  const handleAddMember = (member) => {
    setStats((prev) => ({
      ...prev,
      totalMembers: prev.totalMembers + 1,
      activeMembers: prev.activeMembers + 1,
      totalIncome: prev.totalIncome + member.levelBonus,
    }));
    showToast(`Member ${member.name} (${member.id}) added to ledger.`);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col font-sans overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 bg-[#161B24] border border-slate-700 text-white px-3.5 py-2.5 shadow-xl flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        walletBalance={walletBalance}
        tickerData={tickerData}
        onOpenDeposit={() => setIsDepositOpen(true)}
        onOpenWithdraw={() => setIsWithdrawOpen(true)}
      />

      {/* Sub Navigation Bar (Mobile Swipeable Tabs) */}
      <div className="border-b border-[#1E2430] bg-[#0E121A]">
        <div className="max-w-[1680px] mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5 w-full sm:w-auto">
            {[
              { id: 'ALL', label: 'Overview', icon: Layers },
              { id: 'TRADING', label: 'Trading Chart', icon: TrendingUp },
              { id: 'MLM', label: 'Affiliates', icon: Users },
              { id: 'EXCEL', label: 'Member Ledger', icon: FileSpreadsheet },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`square-btn px-2.5 sm:px-3 py-1.5 text-xs flex items-center gap-1.5 border shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#1E2430] text-white border-slate-600 font-medium'
                      : 'bg-transparent text-slate-400 border-transparent hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick info desktop */}
          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-400 font-mono shrink-0">
            <span>282 Members</span>
            <span>•</span>
            <span className="text-emerald-400">$182,480.00 Volume</span>
            <span>•</span>
            <span className="text-amber-400">Diamond Tier</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-[1680px] w-full mx-auto p-3 sm:p-6">
        {(activeTab === 'ALL' || activeTab === 'MLM') && (
          <MetricCards stats={stats} />
        )}

        {(activeTab === 'ALL' || activeTab === 'TRADING') && (
          <ForexTradingChart
            walletBalance={walletBalance}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {(activeTab === 'ALL' || activeTab === 'MLM') && (
          <MLMNetworkSection />
        )}

        {(activeTab === 'ALL' || activeTab === 'EXCEL') && (
          <ExcelLedgerTable
            onAddMemberClick={() => setIsAddMemberOpen(true)}
          />
        )}
      </main>

      {/* Clean Corporate Footer */}
      <footer className="border-t border-[#1E2430] bg-[#0E121A] py-5 px-3 sm:px-6 text-xs text-slate-500 mt-8 sm:mt-12">
        <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-medium">SHIPZO CONTAINERS & FOREX</span>
            <span>· Global Trade Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Shanghai & Mumbai Port Hubs</span>
            <span>•</span>
            <a 
              href="https://shipzo.netlify.app/" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1"
            >
              shipzo.netlify.app <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-[11px]">
            © 2026 Shipzo Containers Co., Ltd.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onDepositSuccess={handleDepositSuccess}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onWithdrawSuccess={handleWithdrawSuccess}
        walletBalance={walletBalance}
      />

      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={handleAddMember}
      />
    </div>
  );
}
