import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MetricCards from './components/MetricCards';
import ForexTradingChart from './components/ForexTradingChart';
import MLMNetworkSection from './components/MLMNetworkSection';
import ExcelLedgerTable from './components/ExcelLedgerTable';
import SettingsPage from './components/SettingsPage';
import WalletPage from './components/WalletPage';
import LoginPage from './components/LoginPage';
import { DepositModal, WithdrawModal, AddMemberModal } from './components/Modals';
import { 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [walletBalance, setWalletBalance] = useState(111941.50);
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard', 'trading', 'network', 'ledger', 'wallet', 'settings', 'login'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
    showToast(`Welcome back, ${user.name}!`);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex font-sans overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 bg-[#161B24] border border-slate-700 text-white px-3.5 py-2.5 shadow-xl flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Drawer */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        walletBalance={walletBalance}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          walletBalance={walletBalance}
          tickerData={tickerData}
          onOpenDeposit={() => setIsDepositOpen(true)}
          onOpenWithdraw={() => setIsWithdrawOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onNavigateSettings={() => setCurrentPage('settings')}
          onNavigateLogin={() => setCurrentPage('login')}
          isLoggedIn={isLoggedIn}
        />

        {/* Dynamic Page Router */}
        <main className="flex-1 max-w-[1680px] w-full mx-auto p-3 sm:p-6">
          {/* 1. Full Dashboard Overview */}
          {currentPage === 'dashboard' && (
            <>
              <MetricCards stats={stats} />
              <ForexTradingChart
                walletBalance={walletBalance}
                onOrderPlaced={handleOrderPlaced}
              />
              <MLMNetworkSection />
              <ExcelLedgerTable
                onAddMemberClick={() => setIsAddMemberOpen(true)}
              />
            </>
          )}

          {/* 2. Trading Terminal Only */}
          {currentPage === 'trading' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2430]">
                <div>
                  <h2 className="text-base font-bold text-white">Forex & Freight Trading Terminal</h2>
                  <p className="text-xs text-slate-400">Institutional order execution and live chart analysis</p>
                </div>
              </div>
              <ForexTradingChart
                walletBalance={walletBalance}
                onOrderPlaced={handleOrderPlaced}
              />
            </div>
          )}

          {/* 3. My Network & MLM */}
          {currentPage === 'network' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2430]">
                <div>
                  <h2 className="text-base font-bold text-white">Downline Affiliate & MLM Hierarchy</h2>
                  <p className="text-xs text-slate-400">Manage 4-tier network volume, matching bonuses, and sponsor referral links</p>
                </div>
              </div>
              <MLMNetworkSection />
              <ExcelLedgerTable
                onAddMemberClick={() => setIsAddMemberOpen(true)}
              />
            </div>
          )}

          {/* 4. Excel Ledger Spreadsheet */}
          {currentPage === 'ledger' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2430]">
                <div>
                  <h2 className="text-base font-bold text-white">Excel Member Ledger (.XLSX)</h2>
                  <p className="text-xs text-slate-400">Exportable database of active, inactive, and blocked downline accounts</p>
                </div>
              </div>
              <ExcelLedgerTable
                onAddMemberClick={() => setIsAddMemberOpen(true)}
              />
            </div>
          )}

          {/* 5. Wallet & Payouts */}
          {currentPage === 'wallet' && (
            <WalletPage
              walletBalance={walletBalance}
              onOpenDeposit={() => setIsDepositOpen(true)}
              onOpenWithdraw={() => setIsWithdrawOpen(true)}
            />
          )}

          {/* 6. Settings Page */}
          {currentPage === 'settings' && (
            <SettingsPage
              onSave={(msg) => showToast(msg)}
            />
          )}

          {/* 7. Login / Register Page */}
          {currentPage === 'login' && (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onCancel={() => setCurrentPage('dashboard')}
            />
          )}
        </main>

        {/* Corporate Footer */}
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
      </div>

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
