import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Zap, Shield, CheckCircle } from 'lucide-react';

export default function UploadZone({ onFilesSubmit, onDemoStart }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] }
  });

  return (
    <div className="min-h-screen bg-[#0a0c10] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Diligence<span className="text-indigo-500">.dev</span>
        </h1>
        <p className="text-xl text-slate-400">
          Autonomous Due Diligence Agent for Small Business Acquisitions
        </p>
      </div>

      <div className="max-w-3xl w-full space-y-8">
        <div 
          {...getRootProps()} 
          className={`
            border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer text-center
            ${isDragActive ? 'border-indigo-400 bg-indigo-500/10' : 'border-indigo-500/40 bg-slate-900/50'}
            ${!isDragActive && 'hover:border-indigo-400 hover:bg-slate-800/50'}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <p className="text-lg text-slate-200 mb-2">
            Drag & drop disorganized financial and legal PDFs
          </p>
          <p className="text-sm text-slate-500">
            Accepts Tax Returns, Bank Statements, Leases, and more
          </p>
        </div>

        {files.length > 0 && (
          <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-indigo-400 font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Uploaded Documents ({files.length})
            </h3>
            <ul className="space-y-2">
              {files.map((file, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button
            onClick={onDemoStart}
            className="w-full py-4 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 terminal-glow"
          >
            🚀 Load Sample Deal Data
          </button>
          <p className="text-center text-xs text-slate-500">
            Instant demo — no API key required
          </p>

          {files.length > 0 && (
            <button
              onClick={() => onFilesSubmit(files)}
              className="w-full py-4 px-8 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all"
            >
              Analyze Uploaded Files
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6 pt-12 border-t border-slate-800/50">
          <div className="text-center space-y-2">
            <Zap className="w-6 h-6 text-indigo-400 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-200">4 AI Agents</h4>
            <p className="text-xs text-slate-500 text-balance">Specialized analyst pipeline</p>
          </div>
          <div className="text-center space-y-2">
            <Shield className="w-6 h-6 text-indigo-400 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-200">Visual Risk</h4>
            <p className="text-xs text-slate-500 text-balance">Actionable deal intelligence</p>
          </div>
          <div className="text-center space-y-2">
            <FileText className="w-6 h-6 text-indigo-400 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-200">Live Pipeline</h4>
            <p className="text-xs text-slate-500 text-balance">Real-time status tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
}
