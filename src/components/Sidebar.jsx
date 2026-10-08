import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Package,
  Users, 
  GitFork, 
  FileSpreadsheet, 
  Award, 
  Wallet, 
  FileText, 
  Settings, 
  LogOut, 
  LogIn, 
  X, 
  ShieldCheck 
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
  const navSections = [
    {
      category: 'Core Trading',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'trading', label: 'Trading Terminal', icon: TrendingUp, badge: 'Live' },
        { id: 'packages', label: 'Container Lots', icon: Package, badge: 'Yield' },
      ]
    },
    {
      category: 'Affiliate & Network',
      items: [
        { id: 'network', label: 'Affiliates (4 Tiers)', icon: Users, badge: '282' },
        { id: 'tree', label: 'Genealogy Tree', icon: GitFork, badge: null },
        { id: 'ledger', label: 'Excel Ledger', icon: FileSpreadsheet, badge: 'XLSX' },
        { id: 'rewards', label: 'Rank & Rewards', icon: Award, badge: 'Diamond' },
      ]
    },
    {
      category: 'Finances & Audit',
      items: [
        { id: 'wallet', label: 'Wallet & Payouts', icon: Wallet, badge: `$${(walletBalance / 1000).toFixed(0)}k` },
        { id: 'reports', label: 'Financial Statements', icon: FileText, badge: null },
      ]
    },
    {
      category: 'System',
      items: [
        { id: 'settings', label: 'Account Settings', icon: Settings, badge: null },
      ]
    }
  ];

  const handleNav = (id) => {
    setCurrentPage(id);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* FIXED Left Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0A0D14] border-r border-[#1E2430] flex flex-col justify-between transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Branding with Official Logo */}
        <div className="h-16 px-3 border-b border-[#1E2430] flex items-center justify-between shrink-0 bg-[#0E121A]">
          <div className="bg-white px-2 py-1 flex items-center justify-center border border-slate-300/30 h-10 w-full max-w-[200px]">
            <img 
              src="/shipzo-logo.png" 
              alt="SHIPZO Containers & Forex" 
              className="h-8 w-auto object-contain"
            />
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-white shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* User Status Card */}
          {isLoggedIn ? (
            <div className="p-2.5 bg-[#12161F] border border-[#1E2430]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-slate-700 text-slate-200 flex items-center justify-center text-xs font-semibold shrink-0">
                  G
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-white flex items-center gap-1 truncate">
                    Gaurav Sir
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-[10px] text-amber-400 font-mono">
                    Diamond VIP Tier
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2.5 bg-[#12161F] border border-[#1E2430] text-center">
              <div className="text-[11px] text-slate-300 mb-2">Guest Session</div>
              <button
                onClick={() => handleNav('login')}
                className="w-full square-btn py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Grouped Nav Items */}
          {navSections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-0.5">
                {sec.category}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs square-btn border ${
                      isActive
                        ? 'bg-[#181E29] text-white border-slate-600 font-medium'
                        : 'bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-[#12161F]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 border ${
                        item.badge === 'Live' 
                          ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50' 
                          : item.badge === 'Diamond'
                          ? 'text-amber-400 bg-amber-950/40 border-amber-800/50'
                          : 'text-slate-400 bg-slate-800 border-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-[#1E2430] bg-[#0E121A] shrink-0 space-y-1.5">
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentPage('login');
              }}
              className="w-full square-btn px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/40 flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => handleNav('login')}
              className="w-full square-btn px-2.5 py-1.5 text-xs text-emerald-400 hover:bg-emerald-950/20 border border-transparent hover:border-emerald-900/40 flex items-center gap-2"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Member Login</span>
            </button>
          )}

          <div className="text-[10px] text-slate-500 text-center font-mono">
            Shipzo Core v2.4
          </div>
        </div>
      </aside>
    </>
  );
}
