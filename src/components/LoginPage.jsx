import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp,
  Ship,
  CheckCircle2,
  Globe2,
  Zap
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
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
      role: roleName === 'Admin' ? 'Diamond VIP Tier' : roleName === 'Trader' ? 'Gold Forex Trader' : 'Platinum Affiliate',
      id: roleName === 'Admin' ? 'SZ-1001' : roleName === 'Trader' ? 'SZ-2044' : 'SZ-3081'
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#080C14] text-slate-100 selection:bg-emerald-500 selection:text-black">
      {/* LEFT 50%: Hero Branding & High-Impact Logistics Visual */}
      <div className="relative w-full lg:w-1/2 min-h-[380px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-b lg:border-b-0 lg:border-r border-[#1E2430]">
        {/* Background Image with Cinematic Dark Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/shipzo-login-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/75 to-[#080C14]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C14]/80 via-transparent to-[#080C14]/60" />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="bg-white px-2.5 py-1 border border-slate-300/40 shadow-md inline-flex items-center justify-center">
            <img 
              src="/shipzo-logo.png" 
              alt="SHIPZO Containers & Forex" 
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Terminal Gateway</span>
          </div>
        </div>

        {/* Center Punchy Headline & Value Propositions */}
        <div className="relative z-10 my-auto py-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 border border-[#2D3748] bg-[#0E1422]/90 px-3 py-1 mb-4 backdrop-blur-sm">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Smart Logistics. Global Forex Reach.</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
            Institutional Container Freight <br />
            <span className="text-emerald-400">& Algorithmic FX Desk</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mt-3 leading-relaxed">
            Trade SCFI container indexes, global currency pairs, and manage downline affiliate earnings backed by physical maritime cargo lots.
          </p>

          {/* 3 Metric Pills */}
          <div className="grid grid-cols-3 gap-2.5 mt-6 max-w-lg font-mono">
            <div className="bg-[#0E1422]/80 border border-[#1E2430] p-2.5 backdrop-blur-sm">
              <div className="text-[10px] text-slate-400 uppercase">Daily Vol</div>
              <div className="text-sm sm:text-base font-bold text-white">$245M+</div>
            </div>
            <div className="bg-[#0E1422]/80 border border-[#1E2430] p-2.5 backdrop-blur-sm">
              <div className="text-[10px] text-slate-400 uppercase">Affiliates</div>
              <div className="text-sm sm:text-base font-bold text-emerald-400">4 Tiers</div>
            </div>
            <div className="bg-[#0E1422]/80 border border-[#1E2430] p-2.5 backdrop-blur-sm">
              <div className="text-[10px] text-slate-400 uppercase">Security</div>
              <div className="text-sm sm:text-base font-bold text-amber-400">256-Bit</div>
            </div>
          </div>
        </div>

        {/* Bottom Status Strip */}
        <div className="relative z-10 pt-4 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Ship className="w-4 h-4 text-slate-400" />
            <span className="text-[11px]">Shanghai • Rotterdam • Mumbai • Singapore</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">v2.4 Core</span>
        </div>
      </div>

      {/* RIGHT 50%: Dedicated Member Sign In Form */}
      <div className="w-full lg:w-1/2 min-h-[500px] lg:min-h-screen flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-[#0B0E14]">
        <div className="w-full max-w-md space-y-6">
          {/* Header Title */}
          <div>
            <div className="lg:hidden mb-4">
              <div className="bg-white px-2 py-1 border border-slate-300/40 shadow-xs inline-block">
                <img 
                  src="/shipzo-logo.png" 
                  alt="SHIPZO Logo" 
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Member Sign In
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter your registered Member ID or email to access your trading workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Member Email / ID */}
            <div>
              <label className="text-slate-300 font-medium block mb-1.5 uppercase tracking-wider text-[11px]">
                Member Email / ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="member@shipzo.international"
                  className="w-full bg-[#121622] border border-[#1E2430] pl-9 pr-3 py-2.5 text-white outline-none focus:border-emerald-500 font-mono text-xs transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password (NO forgot password link as requested!) */}
            <div>
              <label className="text-slate-300 font-medium block mb-1.5 uppercase tracking-wider text-[11px]">
                Account Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#121622] border border-[#1E2430] pl-9 pr-3 py-2.5 text-white outline-none focus:border-emerald-500 font-mono text-xs transition-colors"
                  required
                />
              </div>
            </div>

            {/* Remember Session & SSL badge */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300 text-xs select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-emerald-500 w-3.5 h-3.5"
                />
                <span>Remember this terminal session</span>
              </label>

              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                256-Bit SSL
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full square-btn py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md mt-2"
            >
              <span>Sign In to Trading Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Fast Demo Login Buttons */}
          <div className="pt-5 border-t border-[#1E2430]">
            <div className="text-[11px] text-slate-400 text-center uppercase tracking-wider mb-2.5 font-mono">
              Fast Demo Instant Access
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Admin')}
                className="square-btn py-2 px-1 bg-[#121622] hover:bg-[#1A202E] border border-[#1E2430] hover:border-slate-500 text-slate-200 text-xs flex flex-col items-center justify-center transition-colors"
              >
                <span className="font-semibold text-white">Gaurav Sir</span>
                <span className="text-[10px] text-amber-400 font-mono">Diamond VIP</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Trader')}
                className="square-btn py-2 px-1 bg-[#121622] hover:bg-[#1A202E] border border-[#1E2430] hover:border-slate-500 text-slate-200 text-xs flex flex-col items-center justify-center transition-colors"
              >
                <span className="font-semibold text-white">Forex Pro</span>
                <span className="text-[10px] text-blue-400 font-mono">Gold Trader</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Affiliate')}
                className="square-btn py-2 px-1 bg-[#121622] hover:bg-[#1A202E] border border-[#1E2430] hover:border-slate-500 text-slate-200 text-xs flex flex-col items-center justify-center transition-colors"
              >
                <span className="font-semibold text-white">Affiliate</span>
                <span className="text-[10px] text-emerald-400 font-mono">Team Leader</span>
              </button>
            </div>
          </div>

          {/* Security & Copyright Footer */}
          <div className="pt-4 text-center text-[11px] text-slate-500 border-t border-[#181E29]">
            <span>© 2026 Shipzo Containers Co., Ltd. • Institutional Derivatives & Logistics Desk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
