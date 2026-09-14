'use client';

import React, { useEffect, useRef } from 'react';

// Word libraries requested by user: famous ports, carriers, tech stacks, standards, currencies
const FAMOUS_PORTS = [
  'ROTTERDAM',
  'SHANGHAI',
  'SINGAPORE',
  'NINGBO-ZHOUSHAN',
  'HAMBURG',
  'ANTWERP-BRUGES',
  'VALENCIA',
  'YANTIAN',
  'SANTOS',
  'JEBEL-ALI',
  'PIRAEUS',
  'BUSAN',
  'ALGECIRAS',
  'QINGDAO',
  'LONG-BEACH',
];

const CARRIERS = [
  'MAERSK-LINE',
  'HAPAG-LLOYD',
  'MSC-CARRIER',
  'CMA-CGM',
  'COSCO-SHIPPING',
  'ONE-NETWORK',
  'EVERGREEN-MARINE',
  'YANG-MING',
  'ZIM-LOGISTICS',
];

const TECH_STACKS = [
  'NEXT.JS-15',
  'TYPESCRIPT',
  'REACT-19',
  'THREE.JS',
  'WEBGL-3D',
  'PYTHON',
  'TAILWIND-CSS',
  'DOCKER',
  'KUBERNETES',
  'GRAPHQL',
  'POSTGRESQL',
  'LINUX-KERNEL',
  'CI/CD-PIPELINE',
];

const OPERATIONS_STANDARDS = [
  'ASML-CLEANROOM',
  'ISO-14644-1',
  'ISO-9001:2015',
  'SIX-SIGMA-BLACK-BELT',
  'DMAIC-FRAMEWORK',
  '8D-ROOT-CAUSE',
  'SPC-METROLOGY',
  'PPAP-LEVEL-3',
  'ERP-ISAH',
  'SAP-S4HANA',
  'CMMS-ULTIMO',
  'IPAAS-MAKE-ZAPIER',
];

const CURRENCIES = [
  'USD $',
  'EUR €',
  'GBP £',
  'JPY ¥',
  'CHF Fr',
  'CNY ¥',
  'SGD $',
];

// All legitimate industry words - zero gibberish
const ALL_CATEGORIES = [
  FAMOUS_PORTS,
  CARRIERS,
  TECH_STACKS,
  OPERATIONS_STANDARDS,
  CURRENCIES,
];

interface StreamChar {
  char: string;
  isWordHead: boolean;
  isWordEnd: boolean;
}

interface ColumnData {
  x: number;
  y: number; // Top Y coordinate of the stream
  speed: number; // pixels per frame (smooth downward velocity)
  stream: StreamChar[];
  totalHeight: number;
  colorTheme: 'cyan' | 'emerald' | 'amber';
}

export default function MatrixDigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Intersection observer to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let width = 0;
    let height = 0;
    let columns: ColumnData[] = [];
    const fontSize = 12.5;
    const rowHeight = 16.5;
    const colSpacing = 38;

    // Build a stream of 8-12 diverse words with 3 blank row separators between them
    const buildColumnStream = (): { stream: StreamChar[]; totalHeight: number } => {
      const stream: StreamChar[] = [];
      const numWords = 8 + Math.floor(Math.random() * 5);

      for (let w = 0; w < numWords; w++) {
        const category = ALL_CATEGORIES[Math.floor(Math.random() * ALL_CATEGORIES.length)];
        const word = category[Math.floor(Math.random() * category.length)];

        for (let i = 0; i < word.length; i++) {
          stream.push({
            char: word[i],
            isWordHead: i === 0,
            isWordEnd: i === word.length - 1,
          });
        }

        // 3 blank row spacers between words for clear visual separation
        stream.push({ char: ' ', isWordHead: false, isWordEnd: false });
        stream.push({ char: ' ', isWordHead: false, isWordEnd: false });
        stream.push({ char: ' ', isWordHead: false, isWordEnd: false });
      }

      return {
        stream,
        totalHeight: stream.length * rowHeight,
      };
    };

    const initCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);

      const numCols = Math.floor(width / colSpacing);
      columns = [];

      for (let i = 0; i < numCols; i++) {
        const { stream, totalHeight } = buildColumnStream();
        const rand = Math.random();
        const colorTheme: ColumnData['colorTheme'] =
          rand < 0.6 ? 'cyan' : rand < 0.88 ? 'emerald' : 'amber';

        // Slow, readable downward speed (~0.4 to 0.75 px/frame -> 12-23 px/sec at 30fps)
        const speed = 0.42 + Math.random() * 0.35;

        // Random starting position staggered throughout and above viewport
        const y = -Math.random() * (totalHeight * 0.75) + (Math.random() - 0.5) * height;

        columns.push({
          x: i * colSpacing + 16,
          y,
          speed,
          stream,
          totalHeight,
          colorTheme,
        });
      }
    };

    initCanvas();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initCanvas();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // Frame-rate throttle to ~30 FPS for gentle, buttery smooth motion and low CPU usage
    let lastTimestamp = 0;
    const interval = 1000 / 30;

    const render = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      const elapsed = timestamp - lastTimestamp;
      if (elapsed < interval) return;
      lastTimestamp = timestamp - (elapsed % interval);

      // Clear with dark cyber obsidian background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Subtle blueprint grid lines inside matrix background
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      ctx.font = `600 ${fontSize}px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

      columns.forEach((col) => {
        // Continuous smooth downward glide
        col.y += col.speed;

        // Render characters
        for (let j = 0; j < col.stream.length; j++) {
          const item = col.stream[j];
          if (!item.char || item.char === ' ') continue;

          const charY = col.y + j * rowHeight;

          // Culling: only draw characters visible within canvas (+ small margin)
          if (charY < -15 || charY > height + 15) continue;

          // Fade at extreme top and bottom edges of the section
          let edgeAlpha = 1;
          if (charY < 60) {
            edgeAlpha = Math.max(0.1, charY / 60);
          } else if (charY > height - 60) {
            edgeAlpha = Math.max(0.1, (height - charY) / 60);
          }

          if (item.isWordEnd) {
            // Glowing bottom head of the falling word
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = col.colorTheme === 'emerald' ? '#34d399' : '#38bdf8';
            ctx.shadowBlur = 6;
          } else if (item.isWordHead) {
            // Subtle highlight on first letter of word
            ctx.shadowBlur = 0;
            if (col.colorTheme === 'cyan') {
              ctx.fillStyle = `rgba(165, 243, 252, ${0.95 * edgeAlpha})`;
            } else if (col.colorTheme === 'emerald') {
              ctx.fillStyle = `rgba(167, 243, 208, ${0.95 * edgeAlpha})`;
            } else {
              ctx.fillStyle = `rgba(254, 240, 138, ${0.95 * edgeAlpha})`;
            }
          } else {
            // High-contrast neon letters
            ctx.shadowBlur = 0;
            if (col.colorTheme === 'cyan') {
              ctx.fillStyle = `rgba(34, 211, 238, ${0.82 * edgeAlpha})`;
            } else if (col.colorTheme === 'emerald') {
              ctx.fillStyle = `rgba(52, 211, 153, ${0.82 * edgeAlpha})`;
            } else {
              ctx.fillStyle = `rgba(251, 191, 36, ${0.78 * edgeAlpha})`;
            }
          }

          ctx.fillText(item.char, col.x, charY);
        }

        // When the entire word stream has slid off the bottom of the screen,
        // recycle and restart above top with new fresh words
        if (col.y > height) {
          const { stream, totalHeight } = buildColumnStream();
          col.stream = stream;
          col.totalHeight = totalHeight;
          col.y = -totalHeight - Math.random() * 80;
          col.speed = 0.42 + Math.random() * 0.35;
        }
      });
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Top & Bottom seamless gradient transitions */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />
    </div>
  );
}
