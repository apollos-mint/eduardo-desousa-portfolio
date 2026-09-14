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
    renderer.domElement.style.opacity = '1';
    container.appendChild(renderer.domElement);

    // Particles Constellation (600 Points)
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
      size: isLight ? 2.4 : 2.0,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.9 : 0.8,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    const baseX = isContact ? 14 : 24;
    const baseY = isContact ? -2 : 0;

    // 1. Dynamic 3D Spherical Wireframe Globe (Latitude & Longitude)
    const globeGeo = new THREE.SphereGeometry(24, 28, 18);
    const globeMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.35 : 0.28,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeMesh.scale.setScalar(scale);
    globeMesh.position.set(baseX, baseY, 0);
    scene.add(globeMesh);

    // 2. High-Tech Geodesic Inner Core
    const innerGeo = new THREE.IcosahedronGeometry(14, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x059669 : 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.5 : 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.scale.setScalar(scale);
    innerMesh.position.set(baseX, baseY, 0);
    scene.add(innerMesh);

    // 3. Orbiting 3D Torus Rings in Three.js space
    const ringGeo1 = new THREE.TorusGeometry(33, 0.4, 16, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      transparent: true,
      opacity: isLight ? 0.55 : 0.38,
    });
    const orbitalRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitalRing1.rotation.x = Math.PI / 2.6;
    orbitalRing1.position.set(baseX, baseY, 0);
    scene.add(orbitalRing1);

    const ringGeo2 = new THREE.TorusGeometry(39, 0.3, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x059669 : 0x10b981,
      transparent: true,
      opacity: isLight ? 0.45 : 0.28,
    });
    const orbitalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitalRing2.rotation.y = Math.PI / 3.4;
    orbitalRing2.position.set(baseX, baseY, 0);
    scene.add(orbitalRing2);

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

    // Scroll reaction
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
        globeMat.color.setHex(0x0284c7);
        globeMat.opacity = 0.35;
        innerMat.color.setHex(0x059669);
        innerMat.opacity = 0.5;
        ringMat1.color.setHex(0x0284c7);
        ringMat1.opacity = 0.55;
        ringMat2.color.setHex(0x059669);
        ringMat2.opacity = 0.45;
        particleMaterial.blending = THREE.NormalBlending;
        particleMaterial.opacity = 0.9;
      } else {
        scene.fog = new THREE.FogExp2(0x07090e, 0.0018);
        globeMat.color.setHex(0x38bdf8);
        globeMat.opacity = 0.28;
        innerMat.color.setHex(0x10b981);
        innerMat.opacity = 0.4;
        ringMat1.color.setHex(0x38bdf8);
        ringMat1.opacity = 0.38;
        ringMat2.color.setHex(0x10b981);
        ringMat2.opacity = 0.28;
        particleMaterial.blending = THREE.AdditiveBlending;
        particleMaterial.opacity = 0.8;
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    let rotAngleGlobeY = 0;
    let rotAngleGlobeX = 0;
    let rotAngleInnerY = 0;
    let rotAngleInnerX = 0;
    let rotAngleRing1 = 0;
    let rotAngleRing2 = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);

      rotAngleGlobeY += delta * 0.12;
      rotAngleGlobeX += delta * 0.04;
      rotAngleInnerY -= delta * 0.15;
      rotAngleInnerX -= delta * 0.08;
      rotAngleRing1 += delta * 0.09;
      rotAngleRing2 -= delta * 0.07;

      // Smooth mouse follow parallax
      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;

      particles.rotation.y = rotAngleGlobeY * 0.4 + targetX * 0.0015;
      particles.rotation.x = rotAngleGlobeX * 0.4 + targetY * 0.0015;

      globeMesh.rotation.y = rotAngleGlobeY;
      globeMesh.rotation.x = rotAngleGlobeX;
      globeMesh.position.x = baseX + targetX * (isContact ? 0.06 : 0.12);
      globeMesh.position.y = baseY - targetY * (isContact ? 0.06 : 0.12) - (isContact ? 0 : scrollY * 0.02);

      innerMesh.rotation.y = rotAngleInnerY;
      innerMesh.rotation.x = rotAngleInnerX;
      innerMesh.position.copy(globeMesh.position);

      orbitalRing1.rotation.z = rotAngleRing1;
      orbitalRing1.position.copy(globeMesh.position);

      orbitalRing2.rotation.z = rotAngleRing2;
      orbitalRing2.position.copy(globeMesh.position);

      camera.position.x = targetX * 0.06;
      camera.position.y = -targetY * 0.06;

      renderer.render(scene, camera);
    };

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
      globeGeo.dispose();
      globeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, [scale, isContact]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {!hasWebGL && (
        <div className="absolute inset-0 bg-radial-gradient from-cyan-950/20 via-slate-950/80 to-transparent" />
      )}
    </div>
  );
}
