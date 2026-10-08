import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check
} from 'lucide-react';

export function DepositModal({ isOpen, onClose, onDepositSuccess }) {
  const [method, setMethod] = useState('USDT-TRC20');
  const [amount, setAmount] = useState('5000');
  const [copied, setCopied] = useState(false);
  const usdtAddress = "TX9vQrZ87FjK23nMLmZ94uPqA7sB91wVyx";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(usdtAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    onDepositSuccess(val);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="square-card bg-[#12161F] border border-[#1E2430] w-full max-w-md p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2430] mb-4">
          <h3 className="text-sm font-semibold text-white">
            Deposit Funds
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">
              Gateway
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['USDT-TRC20', 'USDT-BEP20', 'Bank Wire'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`square-btn py-1.5 border text-xs ${
                    method === m
                      ? 'bg-[#1E2430] text-white border-slate-500 font-medium'
                      : 'bg-[#0A0D14] text-slate-400 border-[#1E2430]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">
              Amount (USD)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white font-mono text-sm outline-none focus:border-slate-500"
              required
            />
            <div className="grid grid-cols-4 gap-1 mt-1.5">
              {['500', '1000', '5000', '10000'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className="square-btn py-1 bg-[#161B24] border border-[#1E2430] text-slate-300 hover:text-white text-[11px]"
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0A0D14] border border-[#1E2430] p-2.5 space-y-1.5">
            <div className="text-slate-400 text-[11px]">
              Transfer to address ({method})
            </div>
            <div className="flex items-center justify-between gap-2 bg-[#12161F] p-1.5 border border-[#1E2430]">
              <span className="text-slate-300 font-mono text-[11px] truncate">
                {usdtAddress}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="square-btn px-2 py-1 bg-slate-800 text-slate-200 border border-slate-700 text-[10px] shrink-0"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full square-btn py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs mt-2"
          >
            Confirm Deposit (+${amount})
          </button>
        </form>
      </div>
    </div>
  );
}

export function WithdrawModal({ isOpen, onClose, onWithdrawSuccess, walletBalance }) {
  const [amount, setAmount] = useState('1000');
  const [address, setAddress] = useState('TX9vQrZ87FjK23nMLmZ94uPqA7sB91wVyx');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    if (val > walletBalance) {
      alert("Amount exceeds wallet balance.");
      return;
    }
    onWithdrawSuccess(val);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="square-card bg-[#12161F] border border-[#1E2430] w-full max-w-md p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2430] mb-4">
          <h3 className="text-sm font-semibold text-white">
            Withdraw Funds
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="flex justify-between items-center bg-[#0A0D14] border border-[#1E2430] p-2">
            <span className="text-slate-400">Available:</span>
            <span className="font-mono font-medium text-white">
              ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">
              Amount (USD)
            </label>
            <input
              type="number"
              value={amount}
              max={walletBalance}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white font-mono text-sm outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">
              USDT TRC-20 Destination Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white font-mono outline-none focus:border-slate-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full square-btn py-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-medium text-xs"
          >
            Confirm Withdrawal (-${amount})
          </button>
        </form>
      </div>
    </div>
  );
}

export function AddMemberModal({ isOpen, onClose, onAddMember }) {
  const [name, setName] = useState('');
  const [pkg, setPkg] = useState('Platinum Logistics');
  const [investment, setInvestment] = useState('2500');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    const inv = parseFloat(investment) || 1000;
    const newMember = {
      id: `SZ-${Math.floor(1120 + Math.random() * 800)}`,
      name,
      date: new Date().toISOString().slice(0, 10),
      package: pkg,
      investment: inv,
      dailyRoi: inv * 0.015,
      levelBonus: inv * 0.15,
      sponsor: 'GAURAV_VIP',
      status: 'ACTIVE'
    };
    onAddMember(newMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="square-card bg-[#12161F] border border-[#1E2430] w-full max-w-md p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2430] mb-4">
          <h3 className="text-sm font-semibold text-white">
            Add Downline Member
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh Patel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">
              Package
            </label>
            <select
              value={pkg}
              onChange={(e) => {
                setPkg(e.target.value);
                if (e.target.value.includes('Titanium')) setInvestment('10000');
                else if (e.target.value.includes('Diamond')) setInvestment('5000');
                else if (e.target.value.includes('Platinum')) setInvestment('2500');
                else setInvestment('1000');
              }}
              className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white outline-none focus:border-slate-500"
            >
              <option value="Titanium Container Lot">Titanium Container Lot ($10,000)</option>
              <option value="Diamond Forex 5.0">Diamond Forex 5.0 ($5,000)</option>
              <option value="Platinum Logistics">Platinum Logistics ($2,500)</option>
              <option value="Gold Forex 2.0">Gold Forex 2.0 ($1,000)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">
              Capital ($)
            </label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full bg-[#0A0D14] border border-[#1E2430] px-3 py-2 text-white outline-none focus:border-slate-500 font-mono"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full square-btn py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs mt-2"
          >
            Add to Spreadsheet
          </button>
        </form>
      </div>
    </div>
  );
}
