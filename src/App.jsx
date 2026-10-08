import React, { useState } from 'react';
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
  ExternalLink,
  ArrowRight,
  Copy,
  Check,
  Award,
  Users,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

export default function App() {
  const [walletBalance, setWalletBalance] = useState(111941.50);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://shipzo.international/register?ref=GAURAV_VIP");
    setLinkCopied(true);
    showToast("Referral link copied to clipboard!");
    setTimeout(() => setLinkCopied(false), 2000);
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

  const handleBuyPackage = (pkg) => {
    setWalletBalance((prev) => prev - pkg.price);
    setStats((prev) => ({
      ...prev,
      totalSpend: prev.totalSpend + pkg.price,
      todaySpend: prev.todaySpend + pkg.price,
    }));
    showToast(`Purchased ${pkg.name} for $${pkg.price.toLocaleString()}!`);
  };

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
    showToast(`Welcome back, ${user.name}!`);
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex font-sans overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 bg-[#161B24] border border-slate-700 text-white px-3.5 py-2.5 shadow-xl flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* FIXED Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        walletBalance={walletBalance}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
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

        {/* Dynamic Route Pages */}
        <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 space-y-6">
          {/* 1. SIMPLE & PROFESSIONAL DASHBOARD OVERVIEW */}
          {currentPage === 'dashboard' && (
            <div className="space-y-6">
              {/* Clean Welcome Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1C2333]">
                <div>
                  <h1 className="text-lg font-semibold text-white tracking-tight">
                    Executive Dashboard
                  </h1>
                  <p className="text-xs text-slate-400">
                    Welcome back, Gaurav Sir · Shipzo Global Freight & Forex Terminal
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDepositOpen(true)}
                    className="square-btn px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs"
                  >
                    Quick Deposit
                  </button>
                  <button
                    onClick={() => setIsWithdrawOpen(true)}
                    className="square-btn px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs"
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              {/* 5 Clean Primary Metric Cards */}
              <MetricCards stats={stats} />

              {/* 2-Column Section: Chart (Left) + Quick Actions & Downline Summary (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left (2 Columns): Trading Terminal */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Market Performance & Execution
                    </h2>
                    <button
                      onClick={() => setCurrentPage('trading')}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                    >
                      <span>Full Terminal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <ForexTradingChart
                    walletBalance={walletBalance}
                    onOrderPlaced={handleOrderPlaced}
                  />
                </div>

                {/* Right (1 Column): Clean Referral & Rank Card */}
                <div className="space-y-4">
                  {/* Referral Link Card */}
                  <div className="bg-[#11151F] border border-[#1C2333] p-4">
                    <div className="text-xs font-semibold text-white mb-1">
                      Affiliate Referral Link
                    </div>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                      Share with downline partners to earn up to 15% instant commission across 4 tiers.
                    </p>

                    <div className="bg-[#0A0D14] border border-[#1E2430] p-1.5 flex items-center justify-between gap-1.5 mb-3">
                      <span className="font-mono text-xs text-slate-300 px-1 truncate">
                        https://shipzo.international/ref=GAURAV_VIP
                      </span>
                      <button
                        onClick={handleCopyLink}
                        className={`square-btn px-2.5 py-1 text-xs shrink-0 flex items-center gap-1 ${
                          linkCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {linkCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{linkCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setCurrentPage('network')}
                      className="w-full square-btn py-1.5 bg-[#181E29] hover:bg-[#202838] text-slate-200 text-xs border border-slate-700 flex items-center justify-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      <span>View 4-Tier Network (282 Members)</span>
                    </button>
                  </div>

                  {/* Diamond Rank & Progress */}
                  <div className="bg-[#11151F] border border-[#1C2333] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-white">Career Milestone</span>
                      <span className="text-[10px] font-mono text-amber-400 font-medium">Diamond Tier</span>
                    </div>

                    <div className="text-xs text-slate-400 mb-2">
                      Progress to Crown Elite ($50,000 Reward):
                    </div>

                    <div className="w-full bg-[#0A0D14] h-2 border border-[#1E2430] mb-2">
                      <div className="bg-emerald-500 h-full w-[84%]"></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>$421,500 / $500,000 Volume</span>
                      <span className="text-white font-bold">84%</span>
                    </div>

                    <button
                      onClick={() => setCurrentPage('rewards')}
                      className="w-full square-btn py-1.5 bg-[#181E29] hover:bg-[#202838] text-slate-200 text-xs border border-slate-700 mt-3 flex items-center justify-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Rewards Ladder ($26k Claimed)</span>
                    </button>
                  </div>

                  {/* Investment Lots Shortcut */}
                  <div className="bg-[#11151F] border border-[#1C2333] p-4">
                    <div className="text-xs font-semibold text-white mb-1">
                      Container Freight Dividends
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      Generate 1.2% - 2.0% daily contract yields with international cargo shipping lots.
                    </p>
                    <button
                      onClick={() => setCurrentPage('packages')}
                      className="w-full square-btn py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium"
                    >
                      Explore Investment Lots
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Excel Member Ledger Snapshot */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      Recent Downline Members & Activity
                    </h2>
                  </div>
                  <button
                    onClick={() => setCurrentPage('ledger')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                  >
                    <span>Open Full Excel Spreadsheet →</span>
                  </button>
                </div>

                <ExcelLedgerTable
                  onAddMemberClick={() => setIsAddMemberOpen(true)}
                />
              </div>
            </div>
          )}

          {/* 2. DEDICATED TRADING TERMINAL */}
          {currentPage === 'trading' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#1C2333]">
                <h1 className="text-base font-bold text-white">Forex & Freight Trading Terminal</h1>
                <p className="text-xs text-slate-400">Institutional order execution and live chart analysis</p>
              </div>
              <ForexTradingChart
                walletBalance={walletBalance}
                onOrderPlaced={handleOrderPlaced}
              />
            </div>
          )}

          {/* 3. CONTAINER LOTS & PACKAGES */}
          {currentPage === 'packages' && (
            <PackagesPage
              walletBalance={walletBalance}
              onBuyPackage={handleBuyPackage}
            />
          )}

          {/* 4. 4-TIER AFFILIATES OVERVIEW */}
          {currentPage === 'network' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#1C2333]">
                <h1 className="text-base font-bold text-white">4-Tier Affiliate Commissions</h1>
                <p className="text-xs text-slate-400">Direct referrals, team volumes, and matching payout rates</p>
              </div>
              <MLMNetworkSection />
            </div>
          )}

          {/* 5. GENEALOGY TREE */}
          {currentPage === 'tree' && (
            <NetworkTreePage />
          )}

          {/* 6. EXCEL MEMBER LEDGER */}
          {currentPage === 'ledger' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#1C2333]">
                <h1 className="text-base font-bold text-white">Excel Downline Database (.XLSX)</h1>
                <p className="text-xs text-slate-400">Filter, search, and export members spreadsheet with CSV download</p>
              </div>
              <ExcelLedgerTable
                onAddMemberClick={() => setIsAddMemberOpen(true)}
              />
            </div>
          )}

          {/* 7. LEADERSHIP RANKS & REWARDS */}
          {currentPage === 'rewards' && (
            <RankRewardsPage />
          )}

          {/* 8. WALLET & PAYOUTS */}
          {currentPage === 'wallet' && (
            <WalletPage
              walletBalance={walletBalance}
              onOpenDeposit={() => setIsDepositOpen(true)}
              onOpenWithdraw={() => setIsWithdrawOpen(true)}
            />
          )}

          {/* 9. FINANCIAL STATEMENTS */}
          {currentPage === 'reports' && (
            <ReportsPage />
          )}

          {/* 10. ACCOUNT SETTINGS */}
          {currentPage === 'settings' && (
            <SettingsPage
              onSave={(msg) => showToast(msg)}
            />
          )}

          {/* 11. LOGIN / SIGN IN */}
          {currentPage === 'login' && (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onCancel={() => setCurrentPage('dashboard')}
            />
          )}
        </main>

        {/* Corporate Footer */}
        <footer className="border-t border-[#1C2333] bg-[#0E121A] py-5 px-4 sm:px-6 text-xs text-slate-500 mt-8 sm:mt-12">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-medium">SHIPZO CONTAINERS & FOREX</span>
              <span>· Global Logistics & Financial Market Access</span>
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
