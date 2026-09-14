'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Critical global error caught:', error);
  }, [error]);

  return (
    <html lang="en" className="dark bg-[#07090e] text-slate-100">
      <body className="min-h-screen flex items-center justify-center p-4 bg-[#07090e]">
        <div className="max-w-md w-full p-8 rounded-2xl bg-slate-950 border border-red-500/50 text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-red-950 border border-red-500/40 flex items-center justify-center mx-auto text-red-400 font-mono text-xl font-bold">
            !
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Application Context Critical
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              A root application fault occurred. The environment can be re-initialized.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Re-Initialize Application
          </button>
        </div>
      </body>
    </html>
  );
}
