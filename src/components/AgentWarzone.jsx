import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Database, Shield, Gavel, Target, CheckCircle2 } from 'lucide-react';

const AGENTS = [
  { name: 'File Marshal', icon: Database },
  { name: 'Forensic Accountant', icon: Shield },
  { name: 'Legal Hawk', icon: Gavel },
  { name: 'Deal Critic', icon: Target },
];

export default function AgentWarzone({ agentEvents }) {
  const terminalRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [agentEvents]);

  const getAgentStatus = (index) => {
    const isComplete = agentEvents.some(e => e.type === 'agent_complete' && e.payload.agentIndex === index);
    const isThinking = agentEvents.some(e => e.type === 'agent_update' && e.payload.agentIndex === index) && !isComplete;
    
    if (isComplete) return 'COMPLETE';
    if (isThinking) return 'THINKING';
    return 'IDLE';
  };

  const getLogColor = (event) => {
    if (event.type === 'error') return 'text-red-500';
    if (event.type === 'agent_complete') return 'text-emerald-400 font-bold';
    if (event.payload?.message?.includes('WARNING') || event.payload?.message?.includes('CRITICAL')) return 'text-amber-400';
    if (event.type === 'agent_update') return 'text-blue-300';
    return 'text-slate-200';
  };

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour12: false });
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col font-sans">
      <header className="border-b border-slate-800 p-4 flex items-center justify-between bg-[#0a0c10]/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">Agent Warzone</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-emerald-500 font-bold tracking-widest uppercase">Pipeline Active</span>
        </div>
      </header>

      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#0a0c10]/30">
        {AGENTS.map((agent, i) => {
          const status = getAgentStatus(i);
          return (
            <div 
              key={i} 
              className={`
                p-4 rounded-xl border transition-all duration-500 flex flex-col items-center gap-3
                ${status === 'COMPLETE' ? 'border-emerald-500/50 bg-emerald-500/5' : 
                  status === 'THINKING' ? 'border-amber-500/50 bg-amber-500/5 animate-pulse' : 
                  'border-slate-800 bg-slate-900/30'}
              `}
            >
              <agent.icon className={`w-6 h-6 ${status === 'COMPLETE' ? 'text-emerald-400' : status === 'THINKING' ? 'text-amber-400' : 'text-slate-500'}`} />
              <div className="text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">{agent.name}</div>
                <div className={`text-[10px] font-mono flex items-center justify-center gap-1 font-bold ${status === 'COMPLETE' ? 'text-emerald-500' : status === 'THINKING' ? 'text-amber-500' : 'text-slate-600'}`}>
                  {status === 'COMPLETE' && <CheckCircle2 className="w-3 h-3" />}
                  {status}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <main className="flex-1 p-6 overflow-hidden">
        <div className="h-full bg-[#010409] rounded-xl border border-slate-800 shadow-2xl terminal-glow overflow-y-auto p-4 font-mono text-sm">
          {agentEvents.map((event, i) => (
            <div key={i} className={`mb-1 ${getLogColor(event)}`}>
              <span className="text-slate-600 mr-2">[{formatTime()}]</span>
              {event.type === 'agent_complete' ? (
                `[SYSTEM] Agent ${event.payload.result.agentName} has finalized analysis.`
              ) : (
                event.payload.message
              )}
            </div>
          ))}
          <div ref={terminalRef} className="inline-block w-2 h-4 bg-indigo-500 ml-1" style={{ opacity: cursorVisible ? 1 : 0 }} />
        </div>
      </main>
    </div>
  );
}
