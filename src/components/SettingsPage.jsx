import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Key, 
  CreditCard, 
  Bell, 
  Save, 
  CheckCircle2,
  Lock,
  Smartphone,
  Mail
} from 'lucide-react';

export default function SettingsPage({ onSave }) {
  const [profile, setProfile] = useState({
    name: 'Gaurav Sir',
    email: 'admin@gmail.com',
    phone: '+91 98765 43210',
    memberId: 'SZ-1001',
    rank: 'Diamond VIP Tier',
    country: 'India',
    usdtAddress: 'TX9vQrZ87FjK23nMLmZ94uPqA7sB91wVyx',
    twoFactor: true,
    emailAlerts: true,
    tradeNotifications: true,
  });

  const [activeSubTab, setActiveSubTab] = useState('profile'); // 'profile', 'security', 'payout', 'notifications'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave('Account settings updated successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#1E2430]">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Account & Security Settings
          </h2>
          <p className="text-xs text-slate-400">
            Manage your trader identity, security credentials, and payout destinations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            KYC Verified
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#1E2430] overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
        {[
          { id: 'profile', label: 'Trader Profile', icon: User },
          { id: 'security', label: 'Security & 2FA', icon: Lock },
          { id: 'payout', label: 'Payout Channels', icon: CreditCard },
          { id: 'notifications', label: 'Alert Preferences', icon: Bell },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id)}
              className={`square-btn px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs flex items-center gap-1.5 sm:gap-2 border-b-2 font-medium shrink-0 ${
                activeSubTab === t.id
                  ? 'border-white text-white bg-[#12161F]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {activeSubTab === 'profile' && (
          <div className="square-card p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Member ID</label>
                <input
                  type="text"
                  readOnly
                  value={profile.memberId}
                  className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-slate-400 font-mono outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white font-mono outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white font-mono outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Affiliate Rank</label>
                <input
                  type="text"
                  readOnly
                  value={profile.rank}
                  className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-amber-400 font-mono outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Country Hub</label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white outline-none focus:border-slate-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'security' && (
          <div className="square-card p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Security & Credentials
            </h3>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white outline-none focus:border-slate-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white outline-none focus:border-slate-500 font-mono"
                  />
                </div>
              </div>

              {/* 2FA Toggle */}
              <div className="p-3 bg-[#0A0D14] border border-[#1E2430] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    Two-Factor Authentication (Google Authenticator)
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Requires a 6-digit verification code when withdrawing or changing security info
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.twoFactor}
                    onChange={(e) => setProfile({ ...profile, twoFactor: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-none after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'payout' && (
          <div className="square-card p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Payout Destination Settings
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">
                  Default USDT (TRC-20) Payout Address
                </label>
                <input
                  type="text"
                  value={profile.usdtAddress}
                  onChange={(e) => setProfile({ ...profile, usdtAddress: e.target.value })}
                  className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white font-mono outline-none focus:border-slate-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Automated payout requests are dispatched to this wallet
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Bank Name / Beneficiary</label>
                  <input
                    type="text"
                    defaultValue="HDFC Bank Ltd. (Gaurav Sir)"
                    className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white outline-none focus:border-slate-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Account Number / IBAN</label>
                  <input
                    type="text"
                    defaultValue="50200039218201"
                    className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white font-mono outline-none focus:border-slate-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'notifications' && (
          <div className="square-card p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Notification Preferences
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 bg-[#0A0D14] border border-[#1E2430] cursor-pointer">
                <div>
                  <div className="font-medium text-white">Daily ROI & Trading P&L Summaries</div>
                  <div className="text-[11px] text-slate-500">Receive daily digest of Forex & Container trading revenue</div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.tradeNotifications}
                  onChange={(e) => setProfile({ ...profile, tradeNotifications: e.target.checked })}
                  className="accent-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-[#0A0D14] border border-[#1E2430] cursor-pointer">
                <div>
                  <div className="font-medium text-white">Downline Affiliate Commission Alerts</div>
                  <div className="text-[11px] text-slate-500">Get notified whenever a Level 1-4 member deposits or upgrades</div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.emailAlerts}
                  onChange={(e) => setProfile({ ...profile, emailAlerts: e.target.checked })}
                  className="accent-emerald-500"
                />
              </label>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="square-btn px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
