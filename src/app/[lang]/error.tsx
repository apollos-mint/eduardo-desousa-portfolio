'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Operational route exception caught by boundary:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-red-500/40 shadow-2xl space-y-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-red-500/10 blur-2xl pointer-events-none" />

        <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
            [SYS.ERR // INTERFACE EXCEPTION]
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Operational Recovery Required
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            An unhandled runtime error occurred during rendering. You can safely reset the interface state.
          </p>
        </div>

        {error.digest && (
          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
            Error Digest: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-500/20"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Component</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-all"
          >
            <Home className="w-3.5 h-3.5 text-cyan-400" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
