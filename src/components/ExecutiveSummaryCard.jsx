import React from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';

export default function ExecutiveSummaryCard({ deal, agentFour }) {
  const getVerdictStyles = (verdict) => {
    switch (verdict) {
      case 'GO': return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/50';
      case 'CONDITIONAL NO-GO': return 'bg-amber-500/20 text-amber-500 border-amber-500/50';
      case 'NO-GO': return 'bg-red-500/20 text-red-500 border-red-500/50';
      default: return 'bg-slate-500/20 text-slate-500 border-slate-500/50';
    }
  };

  const score = agentFour.valuationScore;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getGaugeColor = (s) => {
    if (s > 66) return '#10b981';
    if (s > 33) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950/20 rounded-2xl border border-indigo-500/20 p-8 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
        <div className="flex-1 space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-white">{deal.businessName}</h2>
            <p className="text-slate-400 font-medium">{deal.industry} • {deal.yearsInOperation} Years in Operation</p>
          </div>

          <div className="flex items-center gap-4">
            <span className={`px-6 py-2 rounded-full border text-lg font-bold tracking-tight ${getVerdictStyles(agentFour.verdict)}`}>
              {agentFour.verdict}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-xs font-bold text-slate-500 uppercase mb-1">Asking Price</div>
              <div className="text-xl font-bold text-white">${deal.askingPrice.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-xs font-bold text-slate-500 uppercase mb-1">Est. Fair Value (Mid)</div>
              <div className="text-xl font-bold text-indigo-400">${agentFour.estimatedFairValue.mid.toLocaleString()}</div>
            </div>
          </div>
          <p className="text-sm font-semibold text-red-400 flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            {agentFour.askingPriceVerdict}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96" cy="96" r={radius}
                stroke="#1e293b" strokeWidth="12" fill="transparent"
                strokeDasharray={circumference}
              />
              <circle
                cx="96" cy="96" r={radius}
                stroke={getGaugeColor(score)} strokeWidth="12" fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{score}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Score</span>
            </div>
          </div>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Valuation Strength</div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(agentFour.riskMatrix).map(([key, level]) => (
          <div 
            key={key} 
            className={`
              p-4 rounded-xl border flex flex-col items-center gap-2 transition-all
              ${level === 'CRITICAL' ? 'border-red-500 bg-red-500/10 animate-pulse-red' : 
                level === 'HIGH' ? 'border-red-500/50 bg-red-500/5' : 
                level === 'MEDIUM' ? 'border-amber-500/50 bg-amber-500/5' : 
                'border-emerald-500/50 bg-emerald-500/5'}
            `}
          >
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{key}</div>
            <div className={`text-sm font-bold ${level === 'CRITICAL' || level === 'HIGH' ? 'text-red-500' : level === 'MEDIUM' ? 'text-amber-500' : 'text-emerald-500'}`}>
              {level}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-slate-900/50 rounded-xl border border-white/5">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-400" />
          Executive Analysis
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          {agentFour.dealSummary}
        </p>
      </div>
    </div>
  );
}
