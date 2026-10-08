import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  ArrowDownLeft, 
  Ship,
  CheckCircle2
} from 'lucide-react';

export default function Header({ onOpenDeposit, onOpenWithdraw, walletBalance, tickerData }) {
  return (
    <header className="border-b border-[#1E2430] bg-[#0E121A] sticky top-0 z-40">
      {/* Subtle Live Forex / Freight Ticker */}
      <div className="bg-[#0A0D14] border-b border-[#181E29] px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-400 overflow-x-auto whitespace-nowrap gap-6 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-300 font-medium">MARKET DATA</span>
        </div>
        
        <div className="flex items-center gap-6 overflow-x-auto py-0.5">
          {tickerData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="text-slate-300">{item.pair}</span>
              <span className="text-slate-100">{item.price}</span>
              <span className={`flex items-center text-[10px] ${item.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {item.chg}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 text-slate-400">
          <span>UTC 22:58</span>
          <span className="text-emerald-400 text-[10px] bg-emerald-950/40 border border-emerald-800/60 px-1.5 py-0.5 font-sans font-medium">
            Active
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#8B1E2F] flex items-center justify-center text-white">
            <Ship className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">SHIPZO</span>
              <span className="text-[11px] text-slate-400 font-normal">Containers & Forex</span>
            </div>
            <p className="text-[10px] text-slate-500">Trading & Member Portal</p>
          </div>
        </div>

        {/* Right Section: Balance & Actions */}
        <div className="flex items-center gap-3">
          {/* Balance */}
          <div className="hidden sm:flex items-center gap-2.5 bg-[#12161F] border border-[#1E2430] px-3 py-1.5">
            <Wallet className="w-3.5 h-3.5 text-slate-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Balance</div>
              <div className="font-mono text-sm font-semibold text-white">
                ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Simple Square Buttons */}
          <button 
            onClick={onOpenDeposit}
            className="square-btn bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Deposit</span>
          </button>

          <button 
            onClick={onOpenWithdraw}
            className="square-btn bg-[#1A202C] hover:bg-[#222A3A] text-slate-200 border border-[#2D3748] px-3 py-1.5 text-xs flex items-center gap-1.5"
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Withdraw</span>
          </button>

          {/* User profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#1E2430]">
            <div className="w-7 h-7 bg-slate-700 text-slate-200 flex items-center justify-center text-xs font-semibold">
              G
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-medium text-slate-200 flex items-center gap-1">
                Gaurav Sir
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="text-[10px] text-slate-400">Diamond Member</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
