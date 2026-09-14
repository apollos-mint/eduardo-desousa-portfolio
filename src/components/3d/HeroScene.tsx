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
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
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
      scene.fog = new THREE.FogExp2(0x07090e, 0.0016);
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

    // =========================================================================
    // 1. Soft Circular Particle Glow Texture
    // =========================================================================
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.85)');
      grad.addColorStop(0.7, 'rgba(16, 185, 129, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    const particleTexture = createGlowTexture();

    // =========================================================================
    // 2. Constellation Particle Cloud (600 Points)
    // =========================================================================
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(isLight ? '#0284c7' : '#38bdf8'); // Cyan
    const color2 = new THREE.Color(isLight ? '#059669' : '#10b981'); // Emerald
    const color3 = new THREE.Color(isLight ? '#4f46e5' : '#6366f1'); // Indigo

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 220;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 160;

      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isLight ? 2.0 : 1.8,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.9 : 0.85,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particles);

    // =========================================================================
    // 3. Responsive Base Position Calculation
    // =========================================================================
    let baseX = 42;
    let baseY = 0;

    const updateBaseCoords = () => {
      if (isContact) {
        baseX = 14;
        baseY = -2;
        return;
      }
      const w = window.innerWidth;
      if (w >= 1280) {
        baseX = 42;
        baseY = 0;
      } else if (w >= 1024) {
        baseX = 34;
        baseY = 0;
      } else {
        baseX = 0;
        baseY = -8;
      }
    };
    updateBaseCoords();

    // =========================================================================
    // 4. Dynamic Cybernetic Globe & Orbital Ring System
    // =========================================================================
    const globeGroup = new THREE.Group();
    globeGroup.scale.setScalar(scale);
    globeGroup.position.set(baseX, baseY, 0);
    scene.add(globeGroup);

    // 4.1 Outer Spherical Wireframe (Latitude & Longitude Grid)
    const globeGeo = new THREE.SphereGeometry(24, 32, 20);
    const globeMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.45 : 0.38,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // 4.2 Geodesic High-Tech Inner Core Matrix
    const innerGeo = new THREE.IcosahedronGeometry(14, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x059669 : 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.6 : 0.5,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerMesh);

    // 4.3 Central Glowing Nucleus
    const nucleusGeo = new THREE.SphereGeometry(3.5, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      transparent: true,
      opacity: isLight ? 0.65 : 0.55,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    globeGroup.add(nucleusMesh);

    // 4.4 Orbital Ring 1 (Tilted Equatorial Cyan Ring with Orbiting Node)
    const ringGroup1 = new THREE.Group();
    ringGroup1.rotation.x = Math.PI / 2.6;
    ringGroup1.rotation.y = 0.2;
    globeGroup.add(ringGroup1);

    const ringGeo1 = new THREE.TorusGeometry(36, 0.45, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      transparent: true,
      opacity: isLight ? 0.65 : 0.55,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringGroup1.add(ringMesh1);

    const nodeGeo1 = new THREE.SphereGeometry(1.5, 16, 16);
    const nodeMat1 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x059669 : 0x10b981,
    });
    const node1 = new THREE.Mesh(nodeGeo1, nodeMat1);
    node1.position.set(36, 0, 0);
    ringGroup1.add(node1);

    // 4.5 Orbital Ring 2 (Tilted Polar Emerald Ring with Orbiting Node)
    const ringGroup2 = new THREE.Group();
    ringGroup2.rotation.x = -Math.PI / 3.0;
    ringGroup2.rotation.y = -0.3;
    globeGroup.add(ringGroup2);

    const ringGeo2 = new THREE.TorusGeometry(44, 0.35, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x059669 : 0x10b981,
      transparent: true,
      opacity: isLight ? 0.55 : 0.45,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringGroup2.add(ringMesh2);

    const nodeGeo2 = new THREE.SphereGeometry(1.3, 16, 16);
    const nodeMat2 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
    });
    const node2 = new THREE.Mesh(nodeGeo2, nodeMat2);
    node2.position.set(44, 0, 0);
    ringGroup2.add(node2);

    // 4.6 Orbital Ring 3 (Wide Horizon Ring with Orbiting Node)
    const ringGroup3 = new THREE.Group();
    ringGroup3.rotation.x = Math.PI / 5.5;
    ringGroup3.rotation.z = Math.PI / 6;
    globeGroup.add(ringGroup3);

    const ringGeo3 = new THREE.TorusGeometry(52, 0.25, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x4f46e5 : 0x818cf8,
      transparent: true,
      opacity: isLight ? 0.45 : 0.35,
    });
    const ringMesh3 = new THREE.Mesh(ringGeo3, ringMat3);
    ringGroup3.add(ringMesh3);

    const nodeGeo3 = new THREE.SphereGeometry(1.1, 16, 16);
    const nodeMat3 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const node3 = new THREE.Mesh(nodeGeo3, nodeMat3);
    node3.position.set(52, 0, 0);
    ringGroup3.add(node3);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // =========================================================================
    // 5. Active Cursor Tracking & Parallax
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.045;
      mouseY = (event.clientY - windowHalfY) * 0.045;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        mouseX = (event.touches[0].clientX - windowHalfX) * 0.045;
        mouseY = (event.touches[0].clientY - windowHalfY) * 0.045;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Scroll reaction
    let scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handling
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateBaseCoords();
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
        globeMat.opacity = 0.45;
        innerMat.color.setHex(0x059669);
        innerMat.opacity = 0.6;
        nucleusMat.color.setHex(0x0284c7);
        ringMat1.color.setHex(0x0284c7);
        ringMat1.opacity = 0.65;
        nodeMat1.color.setHex(0x059669);
        ringMat2.color.setHex(0x059669);
        ringMat2.opacity = 0.55;
        nodeMat2.color.setHex(0x0284c7);
        ringMat3.color.setHex(0x4f46e5);
        ringMat3.opacity = 0.45;
        particleMaterial.blending = THREE.NormalBlending;
        particleMaterial.opacity = 0.9;
      } else {
        scene.fog = new THREE.FogExp2(0x07090e, 0.0016);
        globeMat.color.setHex(0x38bdf8);
        globeMat.opacity = 0.38;
        innerMat.color.setHex(0x10b981);
        innerMat.opacity = 0.5;
        nucleusMat.color.setHex(0x38bdf8);
        ringMat1.color.setHex(0x38bdf8);
        ringMat1.opacity = 0.55;
        nodeMat1.color.setHex(0x10b981);
        ringMat2.color.setHex(0x10b981);
        ringMat2.opacity = 0.45;
        nodeMat2.color.setHex(0x38bdf8);
        ringMat3.color.setHex(0x818cf8);
        ringMat3.opacity = 0.35;
        particleMaterial.blending = THREE.AdditiveBlending;
        particleMaterial.opacity = 0.85;
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // =========================================================================
    // 6. Animation Loop with Organic Parallax & Smooth Rotation
    // =========================================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    let rotGlobeY = 0;
    let rotGlobeX = 0;
    let rotInnerY = 0;
    let rotInnerX = 0;
    let rotRing1 = 0;
    let rotRing2 = 0;
    let rotRing3 = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      // Subtle organic breathing motion even when idle
      const idleX = Math.sin(elapsed * 0.7) * 2.5;
      const idleY = Math.cos(elapsed * 0.5) * 2.0;

      // Smooth mouse follow parallax
      targetX += (mouseX + idleX - targetX) * 0.045;
      targetY += (mouseY + idleY - targetY) * 0.045;

      // Rotation accumulations
      rotGlobeY += delta * 0.15;
      rotGlobeX += delta * 0.05;
      rotInnerY -= delta * 0.2;
      rotInnerX -= delta * 0.1;
      rotRing1 += delta * 0.14;
      rotRing2 -= delta * 0.11;
      rotRing3 += delta * 0.08;

      // 1. Globe & Inner Matrix Rotation
      globeMesh.rotation.y = rotGlobeY;
      globeMesh.rotation.x = rotGlobeX;
      innerMesh.rotation.y = rotInnerY;
      innerMesh.rotation.x = rotInnerX;

      // 2. Orbiting Satellite Nodes on Rings
      node1.position.set(36 * Math.cos(rotRing1), 36 * Math.sin(rotRing1), 0);
      node2.position.set(44 * Math.cos(rotRing2), 44 * Math.sin(rotRing2), 0);
      node3.position.set(52 * Math.cos(rotRing3), 52 * Math.sin(rotRing3), 0);

      // 3. Ring Rotations
      ringMesh1.rotation.z = rotRing1 * 0.4;
      ringMesh2.rotation.z = rotRing2 * 0.4;
      ringMesh3.rotation.z = rotRing3 * 0.4;

      // 4. Parallax Group Positioning & Dynamic Gyroscopic Tilt
      globeGroup.position.x = baseX + targetX * (isContact ? 0.06 : 0.12);
      globeGroup.position.y = baseY - targetY * (isContact ? 0.06 : 0.12) - (isContact ? 0 : scrollY * 0.02);
      globeGroup.rotation.y = targetX * 0.003;
      globeGroup.rotation.x = targetY * 0.003;

      // 5. Constellation Parallax
      particles.rotation.y = rotGlobeY * 0.25 + targetX * 0.0012;
      particles.rotation.x = rotGlobeX * 0.25 + targetY * 0.0012;

      // 6. Dynamic Camera Parallax & Subtle Depth
      camera.position.x = targetX * 0.06;
      camera.position.y = -targetY * 0.06;
      camera.lookAt(targetX * 0.015, -targetY * 0.015, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMaterial.dispose();
      if (particleTexture) particleTexture.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      nodeGeo1.dispose();
      nodeMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo2.dispose();
      nodeMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      nodeGeo3.dispose();
      nodeMat3.dispose();
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

