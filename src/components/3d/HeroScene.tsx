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

    const initialWidth = container.clientWidth || window.innerWidth;
    const initialHeight = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(
      60,
      initialWidth / initialHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(getClampedPixelRatio());
    renderer.setClearColor(0x000000, 0); // 100% transparent canvas
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    // Silky smooth fade-in: start at 0 opacity and transition in
    renderer.domElement.style.opacity = '0';
    renderer.domElement.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
    renderer.domElement.style.willChange = 'opacity';
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

    // Mouse coordinates tracking with smooth damping
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

    // Scroll reaction - initialized to current scroll position to avoid jump
    let scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handling via both ResizeObserver and window resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
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

    // Accumulated rotation angles using delta-clamping to guarantee zero jump/stutter on initial load
    let rotAngleParticlesY = 0;
    let rotAngleParticlesX = 0;
    let rotAngleIcosaX = 0;
    let rotAngleIcosaY = 0;
    let rotAngleInnerX = 0;
    let rotAngleInnerY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Clamp delta to max 50ms so frame hitching or hydration delays never cause sudden jumps
      const delta = Math.min(clock.getDelta(), 0.05);

      rotAngleParticlesY += delta * 0.04;
      rotAngleParticlesX += delta * 0.02;
      rotAngleIcosaX += delta * 0.08;
      rotAngleIcosaY += delta * 0.12;
      rotAngleInnerX -= delta * 0.15;
      rotAngleInnerY -= delta * 0.1;

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      particles.rotation.y = rotAngleParticlesY + targetX * 0.002;
      particles.rotation.x = rotAngleParticlesX + targetY * 0.002;

      icosahedron.rotation.x = rotAngleIcosaX;
      icosahedron.rotation.y = rotAngleIcosaY;
      icosahedron.position.x = baseX + targetX * (isContact ? 0.06 : 0.1);
      icosahedron.position.y = baseY - targetY * (isContact ? 0.06 : 0.1) - (isContact ? 0 : scrollY * 0.02);

      innerMesh.rotation.x = rotAngleInnerX;
      innerMesh.rotation.y = rotAngleInnerY;
      innerMesh.position.x = icosahedron.position.x;
      innerMesh.position.y = icosahedron.position.y;

      camera.position.x = targetX * 0.05;
      camera.position.y = -targetY * 0.05;

      renderer.render(scene, camera);
    };

    // Render initial frame 0 cleanly
    renderer.render(scene, camera);

    // Fade canvas in seamlessly on the next animation frame
    requestAnimationFrame(() => {
      if (renderer.domElement) {
        renderer.domElement.style.opacity = '1';
      }
    });

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
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
  }, [scale, isContact]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Soft Ambient Radial Nebula Aura (Static, non-clashing, zero pop-in) */}
      <div className="absolute top-1/2 right-[5%] sm:right-[10%] lg:right-[16%] -translate-y-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] pointer-events-none select-none">
        <div className="absolute inset-0 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 blur-3xl animate-pulse-subtle" />
        <div className="absolute inset-8 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-2xl animate-pulse-subtle" />
      </div>

      {!hasWebGL && (
        <div className="absolute inset-0 bg-radial-gradient from-cyan-950/20 via-slate-950/80 to-transparent" />
      )}
    </div>
  );
}
