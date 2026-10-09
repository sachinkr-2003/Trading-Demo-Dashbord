import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  ArrowDownLeft, 
  CheckCircle2,
  Menu
} from 'lucide-react';

export default function Header({ 
  onOpenDeposit, 
  onOpenWithdraw, 
  walletBalance, 
  tickerData,
  onToggleSidebar,
  currentUser,
  onNavigateSettings,
  onNavigateLogin,
  isLoggedIn
}) {
  const userName = currentUser?.name || 'Gaurav Sir';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1E2430] bg-[#0E121A]/95 backdrop-blur-md shadow-md">
      {/* Live Market Ticker Strip (Smooth Horizontal Scroll on Mobile) */}
      <div className="bg-[#0A0D14] border-b border-[#181E29] px-2.5 sm:px-4 py-1 flex items-center justify-between text-[11px] text-slate-400 overflow-x-auto whitespace-nowrap gap-3 sm:gap-6 font-mono scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-300 font-semibold text-[10px] sm:text-[11px]">LIVE</span>
        </div>
        
        <div className="flex items-center gap-3.5 sm:gap-6 overflow-x-auto py-0.5 scrollbar-none">
          {tickerData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1 shrink-0">
              <span className="text-slate-400 text-[10px] sm:text-[11px]">{item.pair}</span>
              <span className="text-slate-200 text-[10px] sm:text-[11px] font-medium">{item.price}</span>
              <span className={`flex items-center text-[9px] sm:text-[10px] ${item.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.up ? <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <ArrowDownRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                {item.chg}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 text-slate-400 shrink-0 text-[10px]">
          <span>UTC 22:58</span>
          <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-1.5 py-0.2 font-sans font-medium">
            Active
          </span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-[1680px] mx-auto px-2.5 sm:px-4 lg:px-6 py-2 flex items-center justify-between gap-2">
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1A202C] square-btn border border-[#1E2430] shrink-0"
            title="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Official Shipzo Logo (Theme Matching) */}
          <div className="flex items-center justify-center h-9 sm:h-10 px-1">
            <img 
              src="/shipzo-logo.png" 
              alt="SHIPZO Containers & Forex" 
              className="h-8 sm:h-9 md:h-9.5 w-auto max-w-[190px] sm:max-w-[210px] object-contain drop-shadow-[0_0_12px_rgba(6,182,212,0.18)] hover:brightness-110 transition-all cursor-pointer"
            />
          </div>

          {/* Terminal tag on larger displays */}
          <div className="hidden xl:flex items-center gap-2 pl-2.5 border-l border-[#1E2430]">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Trading Terminal
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-1.5 py-0.2">
              SCFI & Forex
            </span>
          </div>
        </div>

        {/* Right Section: Balance & Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Balance Pill */}
          <div className="flex items-center gap-1.5 bg-[#12161F] border border-[#1E2430] px-2 sm:px-2.5 py-1">
            <Wallet className="w-3 h-3 text-slate-400 shrink-0" />
            <div>
              <div className="text-[9px] text-slate-400 uppercase tracking-wider hidden sm:block">Balance</div>
              <div className="font-mono text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          {/* Deposit Button */}
          <button 
            onClick={onOpenDeposit}
            className="square-btn bg-emerald-600 hover:bg-emerald-500 text-white px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Deposit</span>
          </button>

          {/* Withdraw Button */}
          <button 
            onClick={onOpenWithdraw}
            className="square-btn bg-[#1A202C] hover:bg-[#222A3A] text-slate-200 border border-[#2D3748] px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs flex items-center gap-1 shrink-0"
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Withdraw</span>
          </button>

          {/* User profile avatar */}
          <div className="flex items-center gap-1 pl-1 sm:pl-2 border-l border-[#1E2430]">
            {isLoggedIn ? (
              <button
                onClick={onNavigateSettings}
                className="flex items-center gap-1.5 text-left hover:opacity-80"
                title="Account Settings"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-700 text-slate-200 flex items-center justify-center text-[10px] sm:text-xs font-semibold shrink-0">
                  {userInitial}
                </div>
                <div className="hidden md:block">
                  <div className="text-xs font-medium text-slate-200 flex items-center gap-1">
                    {userName}
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="text-[10px] text-slate-400">Settings</div>
                </div>
              </button>
            ) : (
              <button
                onClick={onNavigateLogin}
                className="square-btn px-2 py-1 bg-emerald-600 text-white text-xs"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
