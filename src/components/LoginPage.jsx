import React, { useState } from 'react';
import { 
  Ship, 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  User, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onCancel }) {
  const [tab, setTab] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('gaurav@shipzo.international');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: 'Gaurav Sir',
      email: email || 'gaurav@shipzo.international',
      role: 'Diamond VIP Member',
      id: 'SZ-1001'
    });
  };

  const handleQuickDemoLogin = (roleName) => {
    onLoginSuccess({
      name: roleName === 'Admin' ? 'Gaurav Sir' : roleName === 'Trader' ? 'Alex Trader' : 'Rajesh Affiliate',
      email: `${roleName.toLowerCase()}@shipzo.international`,
      role: roleName === 'Admin' ? 'Diamond VIP' : 'Gold Trader',
      id: roleName === 'Admin' ? 'SZ-1001' : 'SZ-2044'
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#12161F] border border-[#1E2430] p-6 sm:p-8">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 bg-[#8B1E2F] flex items-center justify-center text-white mb-3 shadow-sm">
            <Ship className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            SHIPZO CONTAINERS & FOREX
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Global Trade & Downline Affiliate Terminal
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 bg-[#0A0D14] p-1 border border-[#1E2430] mb-5 text-xs">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`square-btn py-1.5 ${
              tab === 'login' ? 'bg-[#1E2430] text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Member Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`square-btn py-1.5 ${
              tab === 'register' ? 'bg-[#1E2430] text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {tab === 'register' && (
            <div>
              <label className="text-slate-400 block mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Gaurav Sharma"
                  className="w-full bg-[#0A0D14] border border-[#1E2430] pl-8 pr-3 py-2 text-white outline-none focus:border-slate-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-400 block mb-1">
              Member Email / ID
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="member@shipzo.international"
                className="w-full bg-[#0A0D14] border border-[#1E2430] pl-8 pr-3 py-2 text-white outline-none focus:border-slate-500 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-400">Password</label>
              <a href="#forgot" className="text-[11px] text-slate-400 hover:text-slate-200">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0A0D14] border border-[#1E2430] pl-8 pr-3 py-2 text-white outline-none focus:border-slate-500 font-mono"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-emerald-500"
              />
              <span>Remember session</span>
            </label>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              256-bit SSL
            </span>
          </div>

          <button
            type="submit"
            className="w-full square-btn py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-2 mt-2"
          >
            <span>{tab === 'login' ? 'Sign In to Workspace' : 'Register New Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="mt-6 pt-5 border-t border-[#1E2430]">
          <div className="text-[11px] text-slate-500 text-center uppercase tracking-wider mb-2 font-mono">
            Demo Instant Access
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleQuickDemoLogin('Admin')}
              className="square-btn py-1.5 bg-[#0A0D14] hover:bg-[#1A202C] border border-[#1E2430] text-slate-300 text-[11px]"
            >
              Gaurav Sir
            </button>
            <button
              onClick={() => handleQuickDemoLogin('Trader')}
              className="square-btn py-1.5 bg-[#0A0D14] hover:bg-[#1A202C] border border-[#1E2430] text-slate-300 text-[11px]"
            >
              Forex Pro
            </button>
            <button
              onClick={() => handleQuickDemoLogin('Affiliate')}
              className="square-btn py-1.5 bg-[#0A0D14] hover:bg-[#1A202C] border border-[#1E2430] text-slate-300 text-[11px]"
            >
              Affiliate
            </button>
          </div>
        </div>

        {onCancel && (
          <div className="text-center mt-4">
            <button
              onClick={onCancel}
              className="text-slate-500 hover:text-slate-300 text-xs"
            >
              ← Back to Overview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
