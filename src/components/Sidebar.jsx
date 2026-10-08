import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  FileSpreadsheet, 
  Wallet, 
  Settings, 
  LogOut, 
  LogIn,
  Ship,
  X,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export default function Sidebar({ 
  currentPage, 
  setCurrentPage, 
  isOpen, 
  setIsOpen,
  isLoggedIn,
  setIsLoggedIn,
  walletBalance 
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'trading', label: 'Trading Terminal', icon: TrendingUp, badge: 'Live' },
    { id: 'network', label: 'My Network & MLM', icon: Users, badge: '282' },
    { id: 'ledger', label: 'Excel Member Ledger', icon: FileSpreadsheet, badge: 'XLSX' },
    { id: 'wallet', label: 'Wallet & Payouts', icon: Wallet, badge: `$${(walletBalance / 1000).toFixed(0)}k` },
    { id: 'settings', label: 'Account Settings', icon: Settings, badge: null },
  ];

  const handleNav = (id) => {
    setCurrentPage(id);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0A0D14] border-r border-[#1E2430] flex flex-col justify-between transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:static lg:z-auto
      `}>
        <div>
          {/* Top Branding / Logo */}
          <div className="h-16 px-4 border-b border-[#1E2430] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#8B1E2F] flex items-center justify-center text-white shrink-0">
                <Ship className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white block leading-tight">
                  SHIPZO
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  Containers & Forex
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Quick Info */}
          {isLoggedIn ? (
            <div className="p-3 mx-3 mt-3 bg-[#12161F] border border-[#1E2430]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-slate-700 text-slate-200 flex items-center justify-center text-xs font-semibold shrink-0">
                  G
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-white flex items-center gap-1 truncate">
                    Gaurav Sir
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-[10px] text-amber-400 font-mono">
                    Diamond VIP Tier
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 mx-3 mt-3 bg-[#12161F] border border-[#1E2430] text-center">
              <div className="text-xs text-slate-300 mb-2">Guest Session</div>
              <button
                onClick={() => handleNav('login')}
                className="w-full square-btn py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-1">
              Menu Navigation
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 text-xs square-btn border ${
                    isActive
                      ? 'bg-[#181E29] text-white border-slate-600 font-medium'
                      : 'bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-[#12161F]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 border ${
                      item.badge === 'Live' 
                        ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50' 
                        : 'text-slate-400 bg-slate-800 border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-[#1E2430] space-y-2">
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentPage('login');
              }}
              className="w-full square-btn px-2.5 py-2 text-xs text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/40 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => handleNav('login')}
              className="w-full square-btn px-2.5 py-2 text-xs text-emerald-400 hover:bg-emerald-950/20 border border-transparent hover:border-emerald-900/40 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Member Login</span>
            </button>
          )}

          <div className="text-[10px] text-slate-500 text-center font-mono pt-1">
            Shipzo Core v2.4 · 2026
          </div>
        </div>
      </aside>
    </>
  );
}
