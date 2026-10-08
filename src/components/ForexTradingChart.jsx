import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  X
} from 'lucide-react';

const PAIRS = [
  { id: 'EUR/USD', name: 'EUR / USD', base: 1.08542, pip: 0.0001, spread: 0.6, chg: '+0.42%', sentiment: 78, type: 'Forex' },
  { id: 'GBP/USD', name: 'GBP / USD', base: 1.26543, pip: 0.0001, spread: 0.9, chg: '+0.32%', sentiment: 71, type: 'Forex' },
  { id: 'USD/JPY', name: 'USD / JPY', base: 156.843, pip: 0.01, spread: 0.8, chg: '-0.21%', sentiment: 44, type: 'Forex' },
  { id: 'AUD/USD', name: 'AUD / USD', base: 0.67642, pip: 0.0001, spread: 0.8, chg: '+0.28%', sentiment: 63, type: 'Forex' },
  { id: 'SCFI-200', name: 'SCFI CONTAINER INDEX', base: 2145.80, pip: 0.1, spread: 2.5, chg: '+1.85%', sentiment: 82, type: 'Freight' },
];

const TIMEFRAMES = ['15m', '1H', '4H', '1D', '1W'];

export default function ForexTradingChart({ onOrderPlaced, walletBalance }) {
  const [selectedPair, setSelectedPair] = useState(PAIRS[0]);
  const [selectedTf, setSelectedTf] = useState('1H');
  const [currentPrice, setCurrentPrice] = useState(selectedPair.base);
  const [chartType, setChartType] = useState('candles');
  const [lotSize, setLotSize] = useState('1.0');
  const [leverage, setLeverage] = useState('1:100');
  const [openPositions, setOpenPositions] = useState([
    { id: 'ORD-9821', pair: 'EUR/USD', type: 'BUY', lot: 1.0, entry: 1.08420, current: 1.08542, pnl: 122.00, time: '14:22:10' },
    { id: 'ORD-9740', pair: 'SCFI-200', type: 'BUY', lot: 2.0, entry: 2110.00, current: 2145.80, pnl: 716.00, time: '11:05:44' },
  ]);
  const [hoveredCandle, setHoveredCandle] = useState(null);
  const [candles, setCandles] = useState([]);

  useEffect(() => {
    let base = selectedPair.base;
    let seed = 42;
    const count = 40;
    const generated = [];
    let prevClose = base;

    for (let i = 0; i < count; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      const rnd = (seed / 233280) - 0.48;
      const step = selectedPair.id === 'SCFI-200' ? 8 : (selectedPair.base > 10 ? 0.35 : 0.0011);
      
      const open = prevClose;
      const close = open + rnd * step;
      const high = Math.max(open, close) + Math.abs(rnd) * (step * 0.6);
      const low = Math.min(open, close) - Math.abs(rnd) * (step * 0.6);
      
      generated.push({
        idx: i,
        time: `${10 + Math.floor(i / 4)}:${(i % 4) * 15 || '00'}`,
        open,
        close,
        high,
        low,
        isUp: close >= open
      });
      prevClose = close;
    }

    setCandles(generated);
    setCurrentPrice(prevClose);
  }, [selectedPair, selectedTf]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPrice((prev) => {
        const delta = (Math.random() - 0.49) * (selectedPair.id === 'SCFI-200' ? 0.35 : selectedPair.pip * 0.7);
        return Number((prev + delta).toFixed(selectedPair.base > 10 ? 2 : 5));
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [selectedPair]);

  const handleExecuteOrder = (orderType) => {
    const numLot = parseFloat(lotSize) || 1.0;
    const marginReq = numLot * 500;
    
    if (marginReq > walletBalance) {
      alert("Insufficient wallet balance for this margin requirement.");
      return;
    }

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      pair: selectedPair.id,
      type: orderType,
      lot: numLot,
      entry: currentPrice,
      current: currentPrice,
      pnl: 0.00,
      time: new Date().toLocaleTimeString()
    };

    setOpenPositions([newOrder, ...openPositions]);
    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }
  };

  const handleClosePosition = (id) => {
    setOpenPositions(openPositions.filter(p => p.id !== id));
  };

  const width = 800;
  const height = 280;
  const padding = 20;

  const minVal = candles.length ? Math.min(...candles.map(c => c.low)) : 1;
  const maxVal = candles.length ? Math.max(...candles.map(c => c.high)) : 2;
  const range = maxVal - minVal || 1;

  const getY = (val) => height - padding - ((val - minVal) / range) * (height - padding * 2);

  return (
    <div className="square-card p-4 mb-6">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E2430] pb-3 mb-4">
        {/* Pair tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {PAIRS.map((pair) => (
            <button
              key={pair.id}
              onClick={() => setSelectedPair(pair)}
              className={`square-btn px-2.5 py-1 text-xs border ${
                selectedPair.id === pair.id
                  ? 'bg-[#1E2430] text-white border-slate-600 font-semibold'
                  : 'bg-[#0E121A] text-slate-400 border-[#1E2430] hover:text-white'
              }`}
            >
              <span>{pair.id}</span>
              <span className={`text-[10px] ml-1.5 ${pair.chg.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {pair.chg}
              </span>
            </button>
          ))}
        </div>

        {/* Timeframes and Chart Type */}
        <div className="flex items-center gap-2">
          <div className="flex border border-[#1E2430] bg-[#0E121A]">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTf(tf)}
                className={`square-btn px-2.5 py-1 text-[11px] ${
                  selectedTf === tf ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex border border-[#1E2430] bg-[#0E121A]">
            <button
              onClick={() => setChartType('candles')}
              className={`square-btn px-2.5 py-1 text-[11px] ${chartType === 'candles' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400'}`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`square-btn px-2.5 py-1 text-[11px] ${chartType === 'area' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400'}`}
            >
              Area
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Chart Canvas (Left) + Order Entry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Chart View */}
        <div className="lg:col-span-3 bg-[#0A0D14] border border-[#181E29] p-3 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2 pb-2 border-b border-[#141A24]">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm text-white">{selectedPair.name}</span>
              <span className="text-[11px] text-slate-400">Spread: {selectedPair.spread} pip</span>
              <span className="font-mono text-lg font-bold text-emerald-400">
                {currentPrice}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="text-emerald-400">{selectedPair.sentiment}% Buy</span>
              <div className="w-20 h-1.5 bg-slate-800 flex">
                <div style={{ width: `${selectedPair.sentiment}%` }} className="bg-emerald-500 h-full"></div>
              </div>
              <span className="text-rose-400">{100 - selectedPair.sentiment}% Sell</span>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full h-[270px] bg-[#0A0D14] overflow-hidden">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
              {/* Candlesticks */}
              {chartType === 'candles' && candles.map((c, i) => {
                const candleWidth = (width - padding * 2) / candles.length;
                const x = padding + i * candleWidth;
                const bodyTop = getY(Math.max(c.open, c.close));
                const bodyBottom = getY(Math.min(c.open, c.close));
                const bodyHeight = Math.max(2, bodyBottom - bodyTop);
                const highY = getY(c.high);
                const lowY = getY(c.low);
                const color = c.isUp ? '#26A69A' : '#EF5350';

                return (
                  <g 
                    key={i} 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredCandle(c)}
                    onMouseLeave={() => setHoveredCandle(null)}
                  >
                    <line
                      x1={x + candleWidth / 2}
                      y1={highY}
                      x2={x + candleWidth / 2}
                      y2={lowY}
                      stroke={color}
                      strokeWidth="1"
                    />
                    <rect
                      x={x + 1}
                      y={bodyTop}
                      width={Math.max(2, candleWidth - 2)}
                      height={bodyHeight}
                      fill={color}
                    />
                  </g>
                );
              })}

              {/* Area view */}
              {chartType === 'area' && candles.length > 0 && (
                <>
                  <defs>
                    <linearGradient id="areaGradientSimple" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#26A69A" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#26A69A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M ${padding} ${height - padding} ` + 
                      candles.map((c, i) => `L ${padding + (i * (width - padding * 2)) / candles.length} ${getY(c.close)}`).join(' ') + 
                      ` L ${width - padding} ${height - padding} Z`}
                    fill="url(#areaGradientSimple)"
                  />
                  <path
                    d={candles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${padding + (i * (width - padding * 2)) / candles.length} ${getY(c.close)}`).join(' ')}
                    fill="none"
                    stroke="#26A69A"
                    strokeWidth="1.5"
                  />
                </>
              )}

              {/* Price Line */}
              <line
                x1={0}
                y1={getY(currentPrice)}
                x2={width}
                y2={getY(currentPrice)}
                stroke="#26A69A"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.6"
              />
            </svg>

            {hoveredCandle && (
              <div className="absolute top-2 left-2 bg-[#12161F] border border-[#1E2430] px-2 py-1 text-[11px] font-mono text-slate-300 pointer-events-none flex items-center gap-3">
                <span>O: {hoveredCandle.open.toFixed(4)}</span>
                <span>H: {hoveredCandle.high.toFixed(4)}</span>
                <span>L: {hoveredCandle.low.toFixed(4)}</span>
                <span>C: {hoveredCandle.close.toFixed(4)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Order Terminal (Right) */}
        <div className="bg-[#0A0D14] border border-[#181E29] p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#141A24] mb-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Order Placement
              </span>
              <span className="text-[10px] text-slate-500">Market Execution</span>
            </div>

            {/* Lot size */}
            <div className="mb-3">
              <label className="text-[11px] text-slate-400 block mb-1">
                Lot Size
              </label>
              <div className="grid grid-cols-4 gap-1">
                {['0.1', '0.5', '1.0', '5.0'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLotSize(l)}
                    className={`square-btn py-1 text-xs border ${
                      lotSize === l ? 'bg-[#1E2430] text-white border-slate-500 font-semibold' : 'bg-[#0E121A] text-slate-400 border-[#1E2430]'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Leverage */}
            <div className="mb-3">
              <label className="text-[11px] text-slate-400 block mb-1">
                Leverage
              </label>
              <div className="grid grid-cols-4 gap-1">
                {['1:50', '1:100', '1:200', '1:500'].map((lev) => (
                  <button
                    key={lev}
                    onClick={() => setLeverage(lev)}
                    className={`square-btn py-1 text-xs border ${
                      leverage === lev ? 'bg-[#1E2430] text-white border-slate-500 font-semibold' : 'bg-[#0E121A] text-slate-400 border-[#1E2430]'
                    }`}
                  >
                    {lev}
                  </button>
                ))}
              </div>
            </div>

            {/* Margin Info */}
            <div className="bg-[#10141C] border border-[#181E29] p-2.5 mb-3 text-[11px] font-mono space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Margin Required:</span>
                <span className="text-white font-medium">${(parseFloat(lotSize) * 500).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Pip Value:</span>
                <span className="text-slate-300">${(parseFloat(lotSize) * 10).toFixed(2)} / pip</span>
              </div>
            </div>
          </div>

          {/* Clean Buy / Sell Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#141A24]">
            <button
              onClick={() => handleExecuteOrder('SELL')}
              className="square-btn py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs flex flex-col items-center justify-center"
            >
              <span>Sell</span>
              <span className="text-[10px] opacity-80 font-mono">{currentPrice}</span>
            </button>

            <button
              onClick={() => handleExecuteOrder('BUY')}
              className="square-btn py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex flex-col items-center justify-center"
            >
              <span>Buy</span>
              <span className="text-[10px] opacity-80 font-mono">
                {(Number(currentPrice) + selectedPair.spread * selectedPair.pip).toFixed(selectedPair.base > 10 ? 2 : 5)}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Open Positions List */}
      {openPositions.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[#1E2430]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Open Positions ({openPositions.length})
            </span>
            <span className="text-xs font-mono text-emerald-400">
              Unrealized P&L: +${openPositions.reduce((acc, p) => acc + p.pnl, 0).toFixed(2)}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="excel-table text-left border-collapse">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Pair</th>
                  <th>Type</th>
                  <th>Lot</th>
                  <th>Entry</th>
                  <th>Current</th>
                  <th>P&L</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {openPositions.map((pos) => (
                  <tr key={pos.id}>
                    <td className="font-medium text-slate-200">{pos.id}</td>
                    <td>{pos.pair}</td>
                    <td>
                      <span className={`px-1.5 py-0.5 text-[10px] font-medium border ${
                        pos.type === 'BUY' ? 'text-emerald-400 bg-emerald-950/30 border-emerald-800/40' : 'text-rose-400 bg-rose-950/30 border-rose-800/40'
                      }`}>
                        {pos.type}
                      </span>
                    </td>
                    <td>{pos.lot}</td>
                    <td>{pos.entry}</td>
                    <td>{pos.current}</td>
                    <td className={`font-semibold ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {pos.pnl >= 0 ? `+$${pos.pnl.toFixed(2)}` : `-$${Math.abs(pos.pnl).toFixed(2)}`}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleClosePosition(pos.id)}
                        className="square-btn px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 text-[11px]"
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
