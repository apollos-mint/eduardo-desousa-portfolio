'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'dark'; // default to high-tech dark luxury
      setTheme(initial);
      applyTheme(initial);
    }
  }, []);

  const applyTheme = (t: 'dark' | 'light') => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('portfolio-theme', next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-lg bg-slate-900/50 border border-slate-800 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-all duration-200 shadow-md group flex items-center justify-center"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-500 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
