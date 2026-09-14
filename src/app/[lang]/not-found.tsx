import React from 'react';
import Link from 'next/link';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-md w-full p-8 rounded-2xl bg-slate-950/90 border border-cyan-500/40 shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-cyan-500/10 blur-2xl pointer-events-none" />

        <div className="w-14 h-14 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
          <Compass className="w-7 h-7 text-cyan-400 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            [SYS.404 // ROUTE NOT RESOLVED]
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Vector Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The requested resource, case study, or route does not exist in this deployment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
