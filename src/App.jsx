import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MetricCards from './components/MetricCards';
import ForexTradingChart from './components/ForexTradingChart';
import MLMNetworkSection from './components/MLMNetworkSection';
import ExcelLedgerTable from './components/ExcelLedgerTable';
import PackagesPage from './components/PackagesPage';
import NetworkTreePage from './components/NetworkTreePage';
import RankRewardsPage from './components/RankRewardsPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';
import WalletPage from './components/WalletPage';
import LoginPage from './components/LoginPage';
import { DepositModal, WithdrawModal, AddMemberModal } from './components/Modals';
import { 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Toast, showConfirm, showSuccess } from './utils/swal';

export default function App() {
  const [walletBalance, setWalletBalance] = useState(111941.50);
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const savedPage = localStorage.getItem('shipzo_page');
      return savedPage && savedPage !== 'login' ? savedPage : 'dashboard';
    } catch (e) {
      return 'dashboard';
    }
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('shipzo_logged_in') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('shipzo_auth_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {}
    return {
      name: 'Gaurav Sir',
      role: 'Diamond VIP Tier',
      id: 'SZ-ADMIN-1001',
      email: 'admin@gmail.com'
    };
  });

  // Keep persistent state in localStorage across refreshes
  useEffect(() => {
    try {
      if (isLoggedIn) {
        localStorage.setItem('shipzo_logged_in', 'true');
        localStorage.setItem('shipzo_auth_user', JSON.stringify(currentUser));
        if (currentPage && currentPage !== 'login') {
          localStorage.setItem('shipzo_page', currentPage);
        }
      }
    } catch (e) {}
  }, [isLoggedIn, currentUser, currentPage]);

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

  // Toast notification powered by SweetAlert2
  const showToast = (msg, icon = 'success') => {
    Toast.fire({
      icon,
      title: msg
    });
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
    showSuccess('Deposit Successful!', `$${amount.toLocaleString()} has been credited to your live margin balance.`);
  };

  const handleWithdrawSuccess = (amount) => {
    setWalletBalance((prev) => prev - amount);
    setStats((prev) => ({
      ...prev,
      paidWithdrawal: prev.paidWithdrawal + amount,
    }));
    showSuccess('Withdrawal Submitted!', `$${amount.toLocaleString()} payout has been queued for blockchain transfer.`);
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
    showSuccess('Member Added!', `Partner ${member.name} (${member.id}) enrolled in ledger.`);
  };

  const handleBuyPackage = (pkg) => {
    setWalletBalance((prev) => prev - pkg.price);
    setStats((prev) => ({
      ...prev,
      totalSpend: prev.totalSpend + pkg.price,
      todaySpend: prev.todaySpend + pkg.price,
    }));
    showSuccess('Package Activated!', `Successfully acquired ${pkg.name} lot for $${pkg.price.toLocaleString()}!`);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('shipzo_logged_in', 'true');
      localStorage.setItem('shipzo_auth_user', JSON.stringify(user));
      localStorage.setItem('shipzo_page', 'dashboard');
    } catch (e) {}
    setCurrentPage('dashboard');
    showToast(`Welcome back, ${user.name}!`);
  };

  const handleLogout = async () => {
    const result = await showConfirm(
      'Sign Out of Terminal?', 
      'Aapka current active trading session close ho jayega.', 
      'Yes, Sign Out'
    );

    if (result.isConfirmed) {
      try {
        localStorage.removeItem('shipzo_logged_in');
        localStorage.removeItem('shipzo_auth_user');
        localStorage.removeItem('shipzo_page');
      } catch (e) {}
      setIsLoggedIn(false);
      setCurrentPage('dashboard');
      showToast('You have been signed out.', 'info');
    }
  };

  // 1. If NOT logged in, show the full 50/50 split Login Page first as requested!
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. Once logged in, show the full Platform Dashboard
  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex font-sans">

      {/* FIXED Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        currentUser={currentUser}
        walletBalance={walletBalance}
      />

      {/* Main Content Area (Offset by lg:pl-64 for fixed sidebar) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header with Official Logo */}
        <Header
          walletBalance={walletBalance}
          tickerData={tickerData}
          onOpenDeposit={() => setIsDepositOpen(true)}
          onOpenWithdraw={() => setIsWithdrawOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onNavigateSettings={() => setCurrentPage('settings')}
          onNavigateLogin={handleLogout}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
        />

        {/* Dynamic Route Pages */}
        <main className="flex-1 max-w-[1680px] w-full mx-auto p-3 sm:p-6">
          {/* 1. Dashboard: Full Functional Platform Restored */}
          {currentPage === 'dashboard' && (
            <div className="space-y-6">
              {/* 10 Core Metric Cards */}
              <MetricCards stats={stats} />

              {/* Full Interactive Candlestick Trading Terminal */}
              <ForexTradingChart
                walletBalance={walletBalance}
                onOrderPlaced={handleOrderPlaced}
              />

              {/* Full 4-Tier Affiliate & Referral Structure */}
              <MLMNetworkSection />

              {/* Full Excel Downline Member Spreadsheet with CSV Export */}
              <ExcelLedgerTable
                onAddMemberClick={() => setIsAddMemberOpen(true)}
              />
            </div>
          )}

          {/* 2. Trading Terminal Only */}
          {currentPage === 'trading' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#1E2430]">
                <h2 className="text-base font-bold text-white">Institutional Trading Terminal</h2>
                <p className="text-xs text-slate-400">Forex currency pairs & Container Freight SCFI Index orders</p>
              </div>
              <ForexTradingChart
                walletBalance={walletBalance}
                onOrderPlaced={handleOrderPlaced}
              />
            </div>
          )}

          {/* 3. Container Lots & Packages */}
          {currentPage === 'packages' && (
            <PackagesPage
              walletBalance={walletBalance}
              onBuyPackage={handleBuyPackage}
            />
          )}

          {/* 4. 4-Tier Affiliates */}
          {currentPage === 'network' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#1E2430]">
                <h2 className="text-base font-bold text-white">4-Tier Affiliate Commissions</h2>
                <p className="text-xs text-slate-400">Direct referrals, team volumes, and matching payout rates</p>
              </div>
              <MLMNetworkSection />
            </div>
          )}

          {/* 5. Visual Genealogy Tree */}
          {currentPage === 'tree' && (
            <NetworkTreePage />
          )}

          {/* 6. Excel Member Ledger */}
          {currentPage === 'ledger' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#1E2430]">
                <h2 className="text-base font-bold text-white">Excel Downline Database (.XLSX)</h2>
                <p className="text-xs text-slate-400">Filter, search, and export members spreadsheet with real-time CSV download</p>
              </div>
              <ExcelLedgerTable
                onAddMemberClick={() => setIsAddMemberOpen(true)}
              />
            </div>
          )}

          {/* 7. Leadership Ranks & Rewards */}
          {currentPage === 'rewards' && (
            <RankRewardsPage />
          )}

          {/* 8. Wallet & Payouts */}
          {currentPage === 'wallet' && (
            <WalletPage
              walletBalance={walletBalance}
              onOpenDeposit={() => setIsDepositOpen(true)}
              onOpenWithdraw={() => setIsWithdrawOpen(true)}
            />
          )}

          {/* 9. Financial Statements */}
          {currentPage === 'reports' && (
            <ReportsPage />
          )}

          {/* 10. Account Settings */}
          {currentPage === 'settings' && (
            <SettingsPage
              onSave={(msg) => showToast(msg)}
            />
          )}

          {/* 11. Member Login / Sign In */}
          {currentPage === 'login' && (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onCancel={() => setCurrentPage('dashboard')}
            />
          )}
        </main>

        {/* Corporate Footer with Official Logo */}
        <footer className="border-t border-[#1E2430] bg-[#0E121A] py-5 px-3 sm:px-6 text-xs text-slate-500 mt-8 sm:mt-12">
          <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div className="flex items-center gap-3">
              <img 
                src="/shipzo-logo.png" 
                alt="SHIPZO Logo" 
                className="h-7 w-auto object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.15)]"
              />
              <span className="text-slate-400 text-[11px]">
                Smart Logistics. Global Reach.
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>Shanghai Port Hub</span>
              <span>•</span>
              <span>Mumbai Logistics Center</span>
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
