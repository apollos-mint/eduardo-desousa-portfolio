'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface LogisticsIntroProps {
  onComplete?: () => void;
  forcePlay?: boolean;
}

const TOTAL_DURATION = 7.5;

export default function LogisticsIntroSequence({ onComplete, forcePlay = false }: LogisticsIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('skipIntro') || searchParams.has('noIntro')) {
        return false;
      }
      try {
        if (!forcePlay && sessionStorage.getItem('eds-navigated-internally') === 'true' && !searchParams.has('playIntro') && !searchParams.has('replay')) {
          return false;
        }
      } catch {}
    }
    return true;
  });

  const [fadingOut, setFadingOut] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPauseIndicator, setShowPauseIndicator] = useState(false);
  const pauseIndicatorTimer = useRef<NodeJS.Timeout | null>(null);

  // Determine current Act text
  const getPhaseText = (t: number) => {
    if (t < 2.5) {
      return 'ACT I // OCEAN CONTAINER VESSEL BERTHING AT TERMINAL';
    } else if (t < 5.0) {
      return 'ACT II // QUAYSIDE GANTRY CRANES UNLOADING 3x 40HQ ONTO FLEET';
    } else {
      return 'ACT III // HIGH-SPEED LOGISTICS DISPATCH & PORTFOLIO LAUNCH';
    }
  };

  // Detect mobile screen for optimal video asset delivery
  useEffect(() => {
    const checkMobile = () => {
      const isNarrow = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsMobile(isNarrow || (isPortrait && window.innerWidth < 1024));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFinish = useCallback(() => {
    setFadingOut(true);
    try {
      sessionStorage.setItem('eds-navigated-internally', 'true');
    } catch {}
    setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('eds-intro-finished'));
      }
    }, 600);
  }, [onComplete]);

  // Handle Play / Pause Toggle
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPaused(false);
      triggerPauseBadge();
    } else {
      videoRef.current.pause();
      setIsPaused(true);
      triggerPauseBadge();
    }
  };

  const triggerPauseBadge = () => {
    setShowPauseIndicator(true);
    if (pauseIndicatorTimer.current) clearTimeout(pauseIndicatorTimer.current);
    pauseIndicatorTimer.current = setTimeout(() => {
      setShowPauseIndicator(false);
    }, 700);
  };

  // Seek to specific time (Go back / forth / scrubber)
  const seekTo = (targetSec: number) => {
    if (!videoRef.current) return;
    const clamped = Math.max(0, Math.min(targetSec, TOTAL_DURATION - 0.05));
    videoRef.current.currentTime = clamped;
    setCurrentTime(clamped);
    setProgress(clamped / TOTAL_DURATION);
  };

  const handleStepBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    seekTo(currentTime - 1.0);
  };

  const handleStepForward = (e: React.MouseEvent) => {
    e.stopPropagation();
    seekTo(currentTime + 1.0);
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(clickX / rect.width, 1));
    seekTo(ratio * TOTAL_DURATION);
  };

  // Video timeupdate fallback handler
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    setCurrentTime(t);
    setProgress(t / TOTAL_DURATION);
  };

  // High-precision 60fps RAF ticker for smooth HUD time & scrubber updates
  useEffect(() => {
    if (!visible) return;
    let animId: number;
    const syncFrame = () => {
      if (videoRef.current && !videoRef.current.paused) {
        const t = videoRef.current.currentTime;
        setCurrentTime(t);
        setProgress(t / TOTAL_DURATION);
      }
      animId = requestAnimationFrame(syncFrame);
    };
    animId = requestAnimationFrame(syncFrame);
    return () => cancelAnimationFrame(animId);
  }, [visible]);

  // Video ended handler
  const handleEnded = () => {
    handleFinish();
  };

  // Initial Playback and Replay Listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('skipIntro') || searchParams.has('noIntro')) {
      setVisible(false);
      window.dispatchEvent(new CustomEvent('eds-intro-finished'));
      if (onComplete) onComplete();
      return;
    }

    try {
      const navigatedInternally = sessionStorage.getItem('eds-navigated-internally');
      if (!forcePlay && navigatedInternally === 'true' && !searchParams.has('playIntro') && !searchParams.has('replay')) {
        setVisible(false);
        window.dispatchEvent(new CustomEvent('eds-intro-finished'));
        if (onComplete) onComplete();
        return;
      }
    } catch {}

    setVisible(true);
    setIsPaused(false);
    window.dispatchEvent(new CustomEvent('eds-intro-started'));

    // Replay handler
    const onReplay = () => {
      setFadingOut(false);
      setVisible(true);
      setIsPaused(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
      window.dispatchEvent(new CustomEvent('eds-intro-started'));
    };

    window.addEventListener('eds-play-intro', onReplay);
    return () => window.removeEventListener('eds-play-intro', onReplay);
  }, [forcePlay, onComplete]);

  // Ensure video autoplays immediately on mount and on user interaction fallback
  const startPlayback = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.defaultMuted = true;
    v.muted = true;
    v.playsInline = true;
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  useEffect(() => {
    if (visible) {
      startPlayback();
      const onUserInteraction = () => {
        if (videoRef.current && videoRef.current.paused && !isPaused) {
          startPlayback();
        }
      };
      window.addEventListener('pointerdown', onUserInteraction, { once: true, passive: true });
      window.addEventListener('touchstart', onUserInteraction, { once: true, passive: true });
      return () => {
        window.removeEventListener('pointerdown', onUserInteraction);
        window.removeEventListener('touchstart', onUserInteraction);
      };
    }
  }, [visible, startPlayback, isPaused]);

  if (!visible) return null;

  const currentPhase = getPhaseText(currentTime);

  return (
    <div
      id="logistics-intro-container"
      data-intro-active="true"
      onClick={togglePlayPause}
      className={`fixed inset-0 z-50 bg-[#01040a] flex items-center justify-center overflow-hidden transition-opacity duration-700 select-none ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity' }}
    >
      {/* 1. Instant Hardware-Accelerated Video Player (0ms Load, Zero Three.js Lag) */}
      <video
        ref={(el) => {
          videoRef.current = el;
          if (el) {
            el.defaultMuted = true;
            el.muted = true;
            el.playsInline = true;
            el.play().catch(() => {});
          }
        }}
        key={isMobile ? 'mobile-video' : 'desktop-video'}
        src={isMobile ? '/videos/intro_dock_mobile.mp4' : '/videos/intro_dock_desktop.mp4'}
        poster={isMobile ? '/videos/intro_dock_poster_mobile.jpg' : '/videos/intro_dock_poster.jpg'}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={startPlayback}
        onLoadedData={startPlayback}
        onLoadedMetadata={startPlayback}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        className="w-full h-full object-cover select-none cursor-pointer"
        title="Click anywhere to toggle Play/Pause"
      />

      {/* 2. Central Play/Pause Pulse Badge Indicator */}
      {showPauseIndicator && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/50 shadow-2xl animate-ping">
            <span className="text-3xl text-cyan-300 font-mono font-bold">
              {isPaused ? '⏸' : '▶'}
            </span>
          </div>
        </div>
      )}

      {/* 3. Top Navigation & Telemetry HUD */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-none">
        {/* Port Terminal Telemetry */}
        <div className="bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-xl text-left shadow-xl hidden sm:block">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-300">
              EDUARDO DE SOUSA // ROTTERDAM LOGISTICS NODE
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5 tracking-wider">
            IMO: 9840217 · 40HQ INTERMODAL AUTOMATION · LAT 51.9244° N · LON 4.4777° E
          </div>
        </div>

        {/* Skip Intro Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          className="pointer-events-auto ml-auto px-4 py-1.5 rounded-xl bg-slate-950/85 hover:bg-cyan-950/90 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono font-semibold tracking-wider text-cyan-300 hover:text-cyan-100 transition-all duration-200 shadow-xl active:scale-95 cursor-pointer flex items-center gap-1.5 group"
          title="Skip straight to Portfolio Hub"
        >
          <span>SKIP INTRO</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>

      {/* 4. Bottom Center: Comprehensive Playback Navigation & Timeline Scrubber */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-2xl flex flex-col items-center space-y-2.5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Phase Pill with Timestamp */}
        <div className="flex items-center justify-between w-full text-[11px] font-mono text-cyan-300 tracking-wider bg-slate-950/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan-500/40 shadow-xl">
          <div className="flex items-center space-x-2 truncate">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isPaused ? 'bg-amber-400' : 'bg-cyan-400 animate-pulse'}`} />
            <span className="font-semibold truncate">{currentPhase}</span>
          </div>
          <span className="text-emerald-400 font-bold ml-3 shrink-0">
            T+{currentTime.toFixed(1)}s / 0{TOTAL_DURATION.toFixed(1)}s
          </span>
        </div>

        {/* Interactive Scrubbable Timeline Track */}
        <div
          className="w-full relative py-2 cursor-pointer group"
          onClick={handleScrubberClick}
          title="Click to scrub anywhere in the 7.5s intro sequence"
        >
          <div className="w-full h-2.5 bg-slate-800/90 rounded-full overflow-hidden backdrop-blur-md border border-slate-700/80 shadow-inner group-hover:h-3.5 transition-all duration-150 relative">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-amber-400 rounded-full transition-all duration-75"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            />
          </div>
          {/* Act Transition Markers */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-[33.3%] w-0.5 h-3.5 bg-white/40 pointer-events-none"
            title="Act II (2.5s)"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 left-[66.6%] w-0.5 h-3.5 bg-white/40 pointer-events-none"
            title="Act III (5.0s)"
          />
        </div>

        {/* Playback Navigation Buttons: Pause, Go Back, Go Forth, Act Jumps */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-xs text-slate-300">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); seekTo(0); }}
            className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-cyan-300 transition-all active:scale-95 cursor-pointer text-[11px] sm:text-xs"
            title="Jump to Act I (0.0s)"
          >
            ⏮ Act I
          </button>
          <button
            type="button"
            onClick={handleStepBack}
            className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-slate-200 transition-all active:scale-95 cursor-pointer text-[11px] sm:text-xs"
            title="Step Back 1 Second"
          >
            ⏪ -1s
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
            className="px-4 py-1 rounded-lg bg-cyan-500/25 hover:bg-cyan-500/40 border border-cyan-400 text-cyan-200 font-bold transition-all active:scale-95 cursor-pointer text-[11px] sm:text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            title={isPaused ? 'Resume Video' : 'Pause Video'}
          >
            {isPaused ? '▶ PLAY' : '⏸ PAUSE'}
          </button>
          <button
            type="button"
            onClick={handleStepForward}
            className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-slate-200 transition-all active:scale-95 cursor-pointer text-[11px] sm:text-xs"
            title="Step Forward 1 Second"
          >
            +1s ⏩
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); seekTo(5.0); }}
            className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-emerald-300 transition-all active:scale-95 cursor-pointer text-[11px] sm:text-xs"
            title="Jump to Act III (5.0s)"
          >
            Act III ⏭
          </button>
        </div>
      </div>
    </div>
  );
}
