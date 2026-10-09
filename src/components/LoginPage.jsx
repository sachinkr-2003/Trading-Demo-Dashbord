import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  Ship, 
  Globe2, 
  Eye, 
  EyeOff, 
  ShieldAlert,
  Headphones
} from 'lucide-react';

import { showSuccess, showError } from '../utils/swal';

export default function LoginPage({ onLoginSuccess }) {
  // Empty inputs by default - NO auto fill
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const inputEmail = (email || '').trim().toLowerCase();
    const inputPassword = (password || '').trim();

    // STRICT AUTHENTICATION: Only admin@gmail.com and admin123 allowed!
    if (inputEmail === 'admin@gmail.com' && inputPassword === 'admin123') {
      setIsLoading(true);

      const adminUser = {
        name: 'Gaurav Sir',
        email: 'admin@gmail.com',
        role: 'Diamond VIP Member (Admin)',
        id: 'SZ-ADMIN-1001'
      };

      try {
        localStorage.setItem('shipzo_logged_in', 'true');
        localStorage.setItem('shipzo_auth_user', JSON.stringify(adminUser));
        if (rememberMe) {
          localStorage.setItem('shipzo_saved_email', 'admin@gmail.com');
        } else {
          localStorage.removeItem('shipzo_saved_email');
        }
      } catch (err) {
        console.error('Storage error:', err);
      }

      showSuccess('Login Verified!', 'Welcome back to Shipzo Trading Terminal, Admin.', 1500);

      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(adminUser);
      }, 500);
    } else {
      setIsLoading(false);
      const msg = 'Galat Email ya Password! Sirf authorized admin (admin@gmail.com / admin123) hi login kar sakte hain.';
      setErrorMessage(msg);
      showError('Access Denied', msg);
    }
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
          <div className="inline-flex items-center justify-center">
            <img 
              src="/shipzo-logo.png" 
              alt="SHIPZO Containers & Forex" 
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.25)]"
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
              <div className="inline-block">
                <img 
                  src="/shipzo-logo.png" 
                  alt="SHIPZO Logo" 
                  className="h-9 w-auto object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Member Sign In
              </h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2 py-0.5">
                SECURE GATEWAY
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Enter your registered Member ID or Email to access your trading workspace.
            </p>
          </div>

          {/* Error Alert Banner */}
          {errorMessage && (
            <div className="p-3 bg-red-950/70 border border-red-700/80 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-red-300">Authentication Failed</div>
                <div className="text-[11px] text-red-300/90 mt-0.5 leading-snug">{errorMessage}</div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Member Email / ID */}
            <div>
              <label className="text-slate-300 font-medium uppercase tracking-wider text-[11px] block mb-1.5">
                Member Email / ID
              </label>
              <div className="relative">
                <Mail className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${errorMessage ? 'text-red-400' : 'text-slate-500'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Enter your email"
                  autoComplete="username"
                  className={`w-full bg-[#121622] border pl-9 pr-3 py-2.5 text-white outline-none font-mono text-xs transition-colors ${
                    errorMessage 
                      ? 'border-red-600 focus:border-red-500 bg-red-950/20' 
                      : 'border-[#1E2430] focus:border-emerald-500'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-300 font-medium uppercase tracking-wider text-[11px] block mb-1.5">
                Account Password
              </label>
              <div className="relative">
                <Lock className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${errorMessage ? 'text-red-400' : 'text-slate-500'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full bg-[#121622] border pl-9 pr-10 py-2.5 text-white outline-none font-mono text-xs transition-colors ${
                    errorMessage 
                      ? 'border-red-600 focus:border-red-500 bg-red-950/20' 
                      : 'border-[#1E2430] focus:border-emerald-500'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
              disabled={isLoading}
              className="w-full square-btn py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md mt-2 disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating Terminal Access...</span>
              ) : (
                <>
                  <span>Sign In to Trading Terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Professional Security & Institutional Notice (No Demo Buttons) */}
          <div className="pt-4 border-t border-[#1E2430] space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 bg-[#0E121A] border border-[#1E2430] p-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Authorized Institutional Access Only</span>
              </div>
              <span className="text-slate-500 font-mono text-[10px]">TLS 1.3</span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span className="flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5" />
                Support: <a href="mailto:support@shipzo.international" className="text-slate-400 hover:text-emerald-400 underline ml-0.5">support@shipzo.international</a>
              </span>
              <span>Encrypted Session</span>
            </div>
          </div>

          {/* Security & Copyright Footer */}
          <div className="pt-2 text-center text-[11px] text-slate-500 border-t border-[#181E29]">
            <span>© 2026 Shipzo Containers Co., Ltd. • Institutional Derivatives & Logistics Desk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
