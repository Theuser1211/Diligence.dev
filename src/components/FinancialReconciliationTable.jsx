import React from 'react';
import { DollarSign, AlertCircle, Info, TrendingUp, TrendingDown } from 'lucide-react';

export default function FinancialReconciliationTable({ agentTwo }) {
  const getRiskBadge = (level) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/20';
      case 'HIGH': return 'bg-red-500/20 text-red-500 border border-red-500/50';
      case 'MEDIUM': return 'bg-amber-500/20 text-amber-500 border border-amber-500/50';
      case 'LOW': return 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/50';
      default: return 'bg-slate-500/20 text-slate-500';
    }
  };

  const getVarianceColor = (percent) => {
    if (percent < -10) return 'text-red-500';
    if (percent < -5) return 'text-amber-500';
    return 'text-emerald-500';
  };

  return (
    <div className="space-y-6 py-8">
      <div className="flex items-center gap-3">
        <DollarSign className="w-6 h-6 text-emerald-400" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Forensic Financial Reconciliation</h2>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/30">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-800">
              <th className="p-4 font-bold text-slate-300">Period</th>
              <th className="p-4 font-bold text-slate-300">Tax Reported</th>
              <th className="p-4 font-bold text-slate-300">Bank Deposits</th>
              <th className="p-4 font-bold text-slate-300">Variance ($)</th>
              <th className="p-4 font-bold text-slate-300">Variance (%)</th>
              <th className="p-4 font-bold text-slate-300">Risk Level</th>
              <th className="p-4 font-bold text-slate-300">Analyst Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {agentTwo.revenueReconciliation.map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white">{row.period}</td>
                <td className="p-4 text-slate-300 font-mono">${row.taxReportedRevenue.toLocaleString()}</td>
                <td className="p-4 text-slate-300 font-mono">${row.bankDepositTotal.toLocaleString()}</td>
                <td className={`p-4 font-mono font-bold ${getVarianceColor(row.variancePercent)}`}>
                  {row.variance > 0 ? '+' : ''}{row.variance.toLocaleString()}
                </td>
                <td className={`p-4 font-mono font-bold ${getVarianceColor(row.variancePercent)}`}>
                  {row.variancePercent}%
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${getRiskBadge(row.riskLevel)}`}>
                    {row.riskLevel}
                  </span>
                </td>
                <td className="p-4 text-xs text-slate-400 max-w-xs">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Claimed EBITDA</div>
            <div className="text-3xl font-bold text-white mb-2">${agentTwo.claimedEBITDA.toLocaleString()}</div>
          </div>
          <div className="text-xs text-slate-500 italic">Self-reported by seller</div>
        </div>

        <div className="p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/20 flex flex-col justify-between relative overflow-hidden">
          <TrendingUp className="absolute top-2 right-2 w-12 h-12 text-indigo-500/10" />
          <div>
            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Adjusted EBITDA</div>
            <div className="text-3xl font-bold text-indigo-400 mb-2">${agentTwo.adjustedEBITDA.toLocaleString()}</div>
          </div>
          <div className="text-xs text-slate-400 leading-snug">
            {agentTwo.ebitdaAdjustmentNote}
          </div>
        </div>

        <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Earnings Multiples</div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Claimed Multiple</span>
              <span className="text-lg font-bold text-white">{agentTwo.impliedMultiple}x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Adjusted Multiple</span>
              <span className="text-lg font-bold text-indigo-400">{agentTwo.adjustedMultiple}x</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-xl border flex gap-4 items-start ${agentTwo.forensicVerdict.includes('INFLATED') ? 'bg-red-500/10 border-red-500/50' : 'bg-emerald-500/10 border-emerald-500/50'}`}>
        <AlertCircle className={`w-5 h-5 flex-shrink-0 ${agentTwo.forensicVerdict.includes('INFLATED') ? 'text-red-500' : 'text-emerald-500'}`} />
        <div>
          <div className="text-xs font-black uppercase tracking-widest mb-1 opacity-60">Forensic Verdict</div>
          <div className={`text-sm font-bold ${agentTwo.forensicVerdict.includes('INFLATED') ? 'text-red-500' : 'text-emerald-500'}`}>
            {agentTwo.forensicVerdict}
          </div>
        </div>
      </div>
    </div>
  );
}
