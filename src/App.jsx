import React, { useState } from 'react';
import UploadZone from './components/UploadZone';
import AgentWarzone from './components/AgentWarzone';
import Dashboard from './components/Dashboard';
import { analyzeDocuments, analyzeDemoDocuments } from './lib/api';

export default function App() {
  const [state, setState] = useState({
    screen: 'upload', // 'upload' | 'warzone' | 'dashboard'
    agentEvents: [],
    pipelineResult: null,
    isLoading: false,
    error: null
  });

  const handleEvent = (event) => {
    setState(prev => {
      const newEvents = [...prev.agentEvents, event];
      
      if (event.type === 'pipeline_complete') {
        return {
          ...prev,
          agentEvents: newEvents,
          pipelineResult: event.payload,
          screen: 'dashboard',
          isLoading: false
        };
      }
      
      return {
        ...prev,
        agentEvents: newEvents
      };
    });
  };

  const handleFilesSubmit = async (files) => {
    setState(prev => ({ ...prev, screen: 'warzone', agentEvents: [], isLoading: true }));
    try {
      await analyzeDocuments(files, handleEvent);
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message, isLoading: false }));
    }
  };

  const handleDemoStart = async () => {
    setState(prev => ({ ...prev, screen: 'warzone', agentEvents: [], isLoading: true }));
    try {
      await analyzeDemoDocuments(handleEvent);
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message, isLoading: false }));
    }
  };

  const reset = () => {
    setState({
      screen: 'upload',
      agentEvents: [],
      pipelineResult: null,
      isLoading: false,
      error: null
    });
  };

  return (
    <div className="min-h-screen">
      {state.screen === 'upload' && (
        <UploadZone 
          onFilesSubmit={handleFilesSubmit} 
          onDemoStart={handleDemoStart} 
        />
      )}
      
      {state.screen === 'warzone' && (
        <AgentWarzone agentEvents={state.agentEvents} />
      )}
      
      {state.screen === 'dashboard' && (
        <Dashboard 
          pipelineResult={state.pipelineResult} 
          onReset={reset} 
        />
      )}

      {state.error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-xl shadow-2xl z-[100] animate-in slide-in-from-right">
          <p className="font-bold">Error encountered</p>
          <p className="text-sm opacity-90">{state.error}</p>
          <button onClick={() => setState(s => ({...s, error: null}))} className="mt-2 text-xs underline">Dismiss</button>
        </div>
      )}
    </div>
  );
}
