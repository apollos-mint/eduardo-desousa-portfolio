'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getClampedPixelRatio } from '@/lib/three-perf';

interface HeroSceneProps {
  scale?: number;
  isContact?: boolean;
}

export default function HeroScene({ scale = 1.0, isContact = false }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const isLight = document.documentElement.classList.contains('light');

    const scene = new THREE.Scene();
    if (!isLight) {
      scene.fog = new THREE.FogExp2(0x07090e, 0.0018);
    }

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(getClampedPixelRatio());
    renderer.setClearColor(0x000000, 0); // 100% transparent canvas
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.opacity = '1';
    container.appendChild(renderer.domElement);

    // Particles Constellation
    const particleCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(isLight ? '#0284c7' : '#38bdf8'); // Cyan
    const color2 = new THREE.Color(isLight ? '#059669' : '#10b981'); // Emerald
    const color3 = new THREE.Color(isLight ? '#4f46e5' : '#6366f1'); // Indigo

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 160;

      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isLight ? 2.2 : 1.8,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.85 : 0.75,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // High-Tech Wireframe Node (Icosahedron & Octahedron Core)
    const sphereGeo = new THREE.IcosahedronGeometry(22, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.25 : 0.15,
    });
    const baseX = isContact ? 14 : 24;
    const baseY = isContact ? -2 : 0;

    const icosahedron = new THREE.Mesh(sphereGeo, wireframeMat);
    icosahedron.scale.setScalar(scale);
    icosahedron.position.set(baseX, baseY, 0);
    scene.add(icosahedron);

    const innerGeo = new THREE.OctahedronGeometry(12, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x059669 : 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.45 : 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.scale.setScalar(scale);
    innerMesh.position.set(baseX, baseY, 0);
    scene.add(innerMesh);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Mouse coordinates tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.05;
      mouseY = (event.clientY - windowHalfY) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll reaction
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Theme Change Observer
    const observer = new MutationObserver(() => {
      const currentIsLight = document.documentElement.classList.contains('light');
      if (currentIsLight) {
        scene.fog = null;
        wireframeMat.color.setHex(0x0284c7);
        wireframeMat.opacity = 0.25;
        innerMat.color.setHex(0x059669);
        innerMat.opacity = 0.45;
        particleMaterial.blending = THREE.NormalBlending;
        particleMaterial.opacity = 0.85;
      } else {
        scene.fog = new THREE.FogExp2(0x07090e, 0.0018);
        wireframeMat.color.setHex(0x38bdf8);
        wireframeMat.opacity = 0.15;
        innerMat.color.setHex(0x10b981);
        innerMat.opacity = 0.35;
        particleMaterial.blending = THREE.AdditiveBlending;
        particleMaterial.opacity = 0.75;
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particles.rotation.y = elapsedTime * 0.04 + targetX * 0.002;
      particles.rotation.x = elapsedTime * 0.02 + targetY * 0.002;

      icosahedron.rotation.x = elapsedTime * 0.08;
      icosahedron.rotation.y = elapsedTime * 0.12;
      icosahedron.position.x = baseX + targetX * (isContact ? 0.06 : 0.1);
      icosahedron.position.y = baseY - targetY * (isContact ? 0.06 : 0.1) - (isContact ? 0 : scrollY * 0.02);

      innerMesh.rotation.x = -elapsedTime * 0.15;
      innerMesh.rotation.y = -elapsedTime * 0.1;
      innerMesh.position.x = icosahedron.position.x;
      innerMesh.position.y = icosahedron.position.y;

      camera.position.x = targetX * 0.05;
      camera.position.y = -targetY * 0.05;

      renderer.render(scene, camera);
    };

    // Render immediate frame 0 synchronously so the canvas is drawn right away
    renderer.render(scene, camera);
    setCanvasReady(true);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      sphereGeo.dispose();
      wireframeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* 1. Instant Static/SSR Cybernetic Globe & Constellation Aura (Zero Loading Delay - 0ms Paint) */}
      <div
        className={`absolute top-1/2 right-[5%] sm:right-[10%] lg:right-[16%] -translate-y-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] pointer-events-none select-none transition-opacity duration-200 ease-out ${
          canvasReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Soft Ambient Radial Nebula Aura */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 blur-3xl animate-pulse-subtle" />
        <div className="absolute inset-8 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-2xl animate-pulse-subtle" />

        {/* Outer Orbital Geo Rings */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/35 dark:border-cyan-400/40 shadow-[0_0_15px_rgba(56,189,248,0.15)] animate-[spin_24s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/25 dark:border-cyan-400/30 animate-[spin_32s_linear_infinite_reverse]" />
        <div className="absolute inset-10 rounded-full border border-emerald-400/30 dark:border-emerald-400/35 [transform:rotateX(65deg)] animate-[spin_18s_linear_infinite]" />
        <div className="absolute inset-16 rounded-full border border-indigo-400/30 dark:border-indigo-400/35 [transform:rotateY(65deg)] animate-[spin_26s_linear_infinite_reverse]" />

        {/* Central Geometric Core */}
        <div className="absolute inset-[32%] rounded-full border-2 border-cyan-300/45 dark:border-cyan-300/60 bg-cyan-500/10 shadow-[0_0_20px_rgba(56,189,248,0.3)] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-ping" />

        {/* Constellation Nodes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8]" />
      </div>

      {!hasWebGL && (
        <div className="absolute inset-0 bg-radial-gradient from-cyan-950/20 via-slate-950/80 to-transparent" />
      )}
    </div>
  );
}
