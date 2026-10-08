import React, { useState } from 'react';
import { 
  Users, 
  GitFork, 
  UserCheck, 
  UserX, 
  Award, 
  Search, 
  ChevronDown, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function NetworkTreePage() {
  const [selectedNode, setSelectedNode] = useState(null);

  const treeData = {
    id: 'SZ-1001',
    name: 'Gaurav Sir (You)',
    rank: 'Diamond VIP',
    package: 'Titanium Container Lot',
    volume: '$245,350',
    directs: 142,
    children: [
      {
        id: 'SZ-1049',
        name: 'Vikram Mehta (Left Team)',
        rank: 'Platinum Leader',
        package: 'Titanium Container Lot',
        volume: '$142,500',
        directs: 48,
        children: [
          {
            id: 'SZ-1061',
            name: 'Rahul Deshmukh',
            rank: 'Gold Leader',
            package: 'Platinum Logistics',
            volume: '$42,000',
            directs: 18,
            children: []
          },
          {
            id: 'SZ-1094',
            name: 'Neha Chawla',
            rank: 'Silver Leader',
            package: 'Diamond Forex 5.0',
            volume: '$31,500',
            directs: 12,
            children: []
          }
        ]
      },
      {
        id: 'SZ-1052',
        name: 'Ananya Sharma (Right Team)',
        rank: 'Platinum Leader',
        package: 'Diamond Forex 5.0',
        volume: '$102,850',
        directs: 36,
        children: [
          {
            id: 'SZ-1077',
            name: 'Pooja Verma',
            rank: 'Gold Leader',
            package: 'Gold Forex 2.0',
            volume: '$28,400',
            directs: 14,
            children: []
          },
          {
            id: 'SZ-1115',
            name: 'Ritu Kapoor',
            rank: 'Silver Leader',
            package: 'Gold Forex 2.0',
            volume: '$19,200',
            directs: 8,
            children: []
          }
        ]
      }
    ]
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#1E2430]">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Affiliate Genealogy & Downline Network Tree
          </h2>
          <p className="text-xs text-slate-400">
            Interactive binary and multi-tier organizational tree structure
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[11px] sm:text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50">
            Left: $142.5k | Right: $102.8k
          </span>
        </div>
      </div>

      {/* Network Health Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-[#0E121A] border border-[#1E2430] p-3">
          <div className="text-[11px] text-slate-400">Total Downline</div>
          <div className="font-mono text-lg sm:text-xl font-bold text-white">282</div>
          <div className="text-[10px] text-slate-500">4 generations</div>
        </div>

        <div className="bg-[#0E121A] border border-[#1E2430] p-3">
          <div className="text-[11px] text-slate-400">Active Nodes</div>
          <div className="font-mono text-lg sm:text-xl font-bold text-emerald-400">201</div>
          <div className="text-[10px] text-emerald-500">71.2% Active</div>
        </div>

        <div className="bg-[#0E121A] border border-[#1E2430] p-3">
          <div className="text-[11px] text-slate-400">Binary Match</div>
          <div className="font-mono text-lg sm:text-xl font-bold text-blue-400">$10,285</div>
          <div className="text-[10px] text-slate-500">10% Weaker leg</div>
        </div>

        <div className="bg-[#0E121A] border border-[#1E2430] p-3">
          <div className="text-[11px] text-slate-400">Direct Referrals</div>
          <div className="font-mono text-lg sm:text-xl font-bold text-amber-400">142</div>
          <div className="text-[10px] text-slate-500">Tier 1 Sponsored</div>
        </div>
      </div>

      {/* Visual Tree Canvas with mobile horizontal scroll container */}
      <div className="bg-[#0E121A] border border-[#1E2430] p-4 sm:p-6 overflow-x-auto text-center">
        <div className="text-[11px] text-slate-500 mb-2 sm:hidden font-mono">
          ← Swipe horizontally to explore tree nodes →
        </div>

        <div className="min-w-[640px] mx-auto py-3">
          {/* Root Node */}
          <div className="inline-block">
            <div 
              onClick={() => setSelectedNode(treeData)}
              className="bg-[#182030] border-2 border-emerald-500 p-2.5 sm:p-3 w-52 sm:w-56 mx-auto cursor-pointer shadow-md hover:bg-[#1E293B]"
            >
              <div className="text-xs font-bold text-white flex items-center justify-center gap-1">
                {treeData.name}
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
              <div className="text-[10px] font-mono text-amber-400">{treeData.rank}</div>
              <div className="text-[10px] font-mono text-slate-300 mt-0.5">Vol: {treeData.volume}</div>
              <div className="text-[9px] text-slate-500">{treeData.id}</div>
            </div>

            {/* Connecting lines */}
            <div className="w-0.5 h-5 bg-slate-600 mx-auto"></div>
            <div className="w-80 sm:w-96 h-0.5 bg-slate-600 mx-auto relative">
              <div className="absolute left-0 w-0.5 h-5 bg-slate-600"></div>
              <div className="absolute right-0 w-0.5 h-5 bg-slate-600"></div>
            </div>

            {/* Level 1 Nodes (Left & Right) */}
            <div className="flex justify-between w-[460px] sm:w-[520px] mx-auto mt-5">
              {treeData.children.map((child, idx) => (
                <div key={idx} className="w-52">
                  <div 
                    onClick={() => setSelectedNode(child)}
                    className="bg-[#12161F] border border-slate-600 p-2 sm:p-2.5 cursor-pointer hover:border-slate-400"
                  >
                    <div className="text-xs font-bold text-white">{child.name}</div>
                    <div className="text-[10px] font-mono text-blue-400">{child.rank}</div>
                    <div className="text-[10px] font-mono text-slate-300 mt-0.5">Vol: {child.volume}</div>
                    <div className="text-[9px] text-slate-500">{child.id}</div>
                  </div>

                  {/* Level 2 Sub-nodes */}
                  <div className="w-0.5 h-4 bg-slate-600 mx-auto"></div>
                  <div className="w-36 h-0.5 bg-slate-600 mx-auto relative">
                    <div className="absolute left-0 w-0.5 h-4 bg-slate-600"></div>
                    <div className="absolute right-0 w-0.5 h-4 bg-slate-600"></div>
                  </div>

                  <div className="flex justify-between w-44 mx-auto mt-4 gap-1.5">
                    {child.children.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        onClick={() => setSelectedNode(sub)}
                        className="bg-[#0A0D14] border border-[#1E2430] p-1.5 w-20 sm:w-24 text-[10px] cursor-pointer hover:border-slate-500"
                      >
                        <div className="font-semibold text-slate-200 truncate">{sub.name}</div>
                        <div className="text-emerald-400 font-mono text-[9px]">{sub.volume}</div>
                        <div className="text-slate-500 text-[8px]">{sub.id}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedNode && (
          <div className="mt-5 p-3 bg-[#0A0D14] border border-[#1E2430] max-w-md mx-auto text-left text-xs font-mono">
            <div className="text-slate-300 font-bold mb-1">Selected Member Node:</div>
            <div className="text-slate-400">ID: <span className="text-white">{selectedNode.id}</span></div>
            <div className="text-slate-400">Name: <span className="text-white">{selectedNode.name}</span></div>
            <div className="text-slate-400">Package: <span className="text-emerald-400">{selectedNode.package}</span></div>
            <div className="text-slate-400">Volume: <span className="text-white">{selectedNode.volume}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
