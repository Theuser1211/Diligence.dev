import React from 'react';
import { Gavel, MapPin, Calendar, Clock, RotateCcw, ShieldCheck, AlertCircle, Zap } from 'lucide-react';

export default function LegalRiskGrid({ agentThree }) {
  const getRiskColor = (level) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-500 border-red-500 shadow-[0_0_12px_rgba(248,81,73,0.5)]';
      case 'HIGH': return 'text-red-500 border-red-500/50';
      case 'MEDIUM': return 'text-amber-500 border-amber-500/50';
      case 'LOW': return 'text-emerald-500 border-emerald-500/50';
      default: return 'text-slate-500 border-slate-800';
    }
  };

  const getVerdictColor = (v) => {
    if (v === 'RISKY') return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
    if (v === 'DANGER') return 'text-red-500 bg-red-500/10 border-red-500/30';
    return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
  };

  const { leaseAnalysis } = agentThree;

  return (
    <div className="space-y-8 py-12 border-t border-slate-800/50">
      <div className="flex items-center gap-3">
        <Gavel className="w-6 h-6 text-indigo-400" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Legal Hawk — Lease Risk Analysis</h2>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="lg:col-span-2 space-y-1">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">Property</span>
          </div>
          <div className="text-white font-bold">{leaseAnalysis.property}</div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">Expiry</span>
          </div>
          <div className="text-white font-bold font-mono">{leaseAnalysis.leaseExpiry}</div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">Remaining</span>
          </div>
          <div className="text-white font-bold">{leaseAnalysis.remainingTerm}</div>
        </div>
        <div className="lg:col-span-1 space-y-1">
          <div className="flex items-center gap-2 text-slate-500">
            <RotateCcw className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">Options</span>
          </div>
          <div className="text-white font-bold text-xs">{leaseAnalysis.renewalOptions}</div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">Transfer</span>
          </div>
          <div className={`text-[10px] px-2 py-0.5 rounded font-black border w-fit ${getVerdictColor(leaseAnalysis.transferabilityVerdict)}`}>
            {leaseAnalysis.transferabilityVerdict}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agentThree.flaggedClauses.map((clause, i) => (
          <div key={i} className={`bg-slate-900/50 border rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden transition-all hover:bg-slate-900 ${getRiskColor(clause.riskLevel)}`}>
            <div className="flex justify-between items-start relative z-10">
              <h3 className="font-bold text-white text-lg pr-12">{clause.clauseType}</h3>
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white/5 rounded">
                {clause.riskLevel}
              </span>
            </div>

            <div className="relative pl-4 border-l-2 border-current/30 py-1">
              <p className="text-xs font-mono italic text-slate-400 line-clamp-3">"{clause.excerpt}"</p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed flex-1">
              {clause.analysis}
            </p>

            <div className="pt-4 mt-auto border-t border-white/5 text-sm font-semibold text-white flex gap-2">
              <Zap className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>{clause.recommendation}</span>
            </div>

            {clause.riskLevel === 'CRITICAL' && (
              <AlertCircle className="absolute top-2 right-2 w-24 h-24 text-red-500/5 -mr-8 -mt-8 rotate-12" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
