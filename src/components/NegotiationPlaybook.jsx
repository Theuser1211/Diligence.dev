import React from 'react';
import { Target, CheckCircle, ArrowRight } from 'lucide-react';

export default function NegotiationPlaybook({ agentFour }) {
  const sortedPlaybook = [...agentFour.negotiationPlaybook].sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-8 py-12 border-t border-slate-800/50">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-indigo-500" />
          <h2 className="text-2xl font-bold text-white tracking-tight">Negotiation Playbook</h2>
        </div>
        <p className="text-slate-400 ml-9">Execute these levers in priority order to restructure this deal.</p>
      </div>

      <div className="relative pl-4 space-y-12">
        <div className="absolute left-6 top-2 bottom-2 w-px bg-slate-800" />
        
        {sortedPlaybook.map((item, i) => (
          <div key={i} className="relative pl-12 group">
            <div className="absolute left-[-21px] top-0 w-10 h-10 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 font-black z-10 group-hover:scale-110 transition-transform">
              {item.priority}
            </div>
            
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-all">
              <h3 className="text-xl font-bold text-white mb-3">{item.lever}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.tactic}</p>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-500/5 border border-emerald-500/20 w-fit px-3 py-1.5 rounded-lg">
                <CheckCircle className="w-3 h-3" />
                Potential Impact: {item.potentialImpact}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-indigo-600/10 border-2 border-indigo-500/20 rounded-3xl flex flex-col items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
        <div className="text-center">
          <div className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Estimated Fair Value Range</div>
          <div className="text-5xl font-black text-white flex items-center gap-4">
            ${agentFour.estimatedFairValue.low.toLocaleString()}
            <ArrowRight className="w-8 h-8 text-slate-700" />
            ${agentFour.estimatedFairValue.high.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
