'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  getClampedPixelRatio,
  createFpsThrottler,
  setupVisibilityAndIntersection,
  disposeThreeScene,
} from '@/lib/three-perf';

export default function CertificationsScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
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

    // Scene & Fog
    const scene = new THREE.Scene();
    if (!isLight) {
      scene.fog = new THREE.FogExp2(0x07090e, 0.0022);
    }

    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 95;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(getClampedPixelRatio());
      renderer.setClearColor(0x000000, 0); // Transparent background
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.pointerEvents = 'none';
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // =========================================================================
    // 1. CENTRAL GYROSCOPIC CREDENTIAL SEAL (Gimbal Rings & Core)
    // =========================================================================
    const sealGroup = new THREE.Group();
    // Position elegantly to the right behind cards
    sealGroup.position.set(24, 8, -10);
    masterGroup.add(sealGroup);

    // Outer Gyro Ring (Emerald / Verification)
    const ring1Geo = new THREE.TorusGeometry(32, 0.4, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x059669 : 0x10b981,
      transparent: true,
      opacity: isLight ? 0.75 : 0.65,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    sealGroup.add(ring1);

    // Mid Gyro Ring (Gold / Amber - Black Belt & Academic Quality)
    const ring2Geo = new THREE.TorusGeometry(24, 0.35, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: isLight ? 0xd97706 : 0xf59e0b,
      transparent: true,
      opacity: isLight ? 0.7 : 0.6,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    sealGroup.add(ring2);

    // Inner Gyro Ring (Cyan / Quantum Audit Assurance)
    const ring3Geo = new THREE.TorusGeometry(17, 0.3, 16, 60);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      transparent: true,
      opacity: isLight ? 0.75 : 0.65,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    sealGroup.add(ring3);

    // Inner Faceted Polyhedron Core (ISO Certification Standard Core)
    const coreGeo = new THREE.DodecahedronGeometry(8.5, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.6 : 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sealGroup.add(coreMesh);

    // Central Radiant Anchor Node
    const anchorGeo = new THREE.SphereGeometry(2.5, 16, 16);
    const anchorMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x10b981 : 0x34d399,
      transparent: true,
      opacity: 0.9,
    });
    const anchor = new THREE.Mesh(anchorGeo, anchorMat);
    sealGroup.add(anchor);

    // =========================================================================
    // 2. DRIFTING HEXAGONAL ACCREDITATION SHIELDS & AUDIT FACETS
    // =========================================================================
    const shieldCount = 24;
    const shieldGeo = new THREE.CircleGeometry(3.6, 6); // 6-sided hexagon

    const shieldMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.5 : 0.4,
      side: THREE.DoubleSide,
    });

    interface ShieldData {
      mesh: THREE.Mesh;
      origin: THREE.Vector3;
      speed: number;
      rotAxis: THREE.Vector3;
    }

    const shields: ShieldData[] = [];

    for (let i = 0; i < shieldCount; i++) {
      const mesh = new THREE.Mesh(shieldGeo, shieldMat);
      const x = (Math.random() - 0.5) * 180;
      const y = (Math.random() - 0.5) * 130;
      const z = (Math.random() - 0.5) * 60 - 5;

      mesh.position.set(x, y, z);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      masterGroup.add(mesh);

      shields.push({
        mesh,
        origin: new THREE.Vector3(x, y, z),
        speed: 0.001 + Math.random() * 0.002,
        rotAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
      });
    }

    // =========================================================================
    // 3. AMBIENT VERIFICATION GLYPH PARTICLES (Gold / Emerald / Cyan)
    // =========================================================================
    const particleCount = 600;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pCol = new Float32Array(particleCount * 3);

    const colGold = new THREE.Color(isLight ? '#d97706' : '#fbbf24');
    const colEmerald = new THREE.Color(isLight ? '#059669' : '#10b981');
    const colCyan = new THREE.Color(isLight ? '#0284c7' : '#38bdf8');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pPos[i3] = (Math.random() - 0.5) * 220;
      pPos[i3 + 1] = (Math.random() - 0.5) * 160;
      pPos[i3 + 2] = (Math.random() - 0.5) * 80 - 5;

      const pick = i % 3;
      const c = pick === 0 ? colEmerald : pick === 1 ? colGold : colCyan;
      pCol[i3] = c.r;
      pCol[i3 + 1] = c.g;
      pCol[i3 + 2] = c.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

    const pMat = new THREE.PointsMaterial({
      size: isLight ? 3.0 : 2.6,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.85 : 0.8,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(pGeo, pMat);
    masterGroup.add(particles);

    // =========================================================================
    // 4. MOUSE PARALLAX & RESIZE
    // =========================================================================
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = normX * 0.14;
      targetRotX = -normY * 0.1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 5. ANIMATION LOOP
    // =========================================================================
    let isTabVisible = true;
    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const throttler = createFpsThrottler(45);
    let animId: number;

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      if (!isTabVisible || !throttler(time)) return;

      // Group Lerping for Mouse Parallax
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.045;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.045;

      // Gyroscopic Differential Rotations
      ring1.rotation.x += 0.003;
      ring1.rotation.y += 0.004;

      ring2.rotation.y += 0.005;
      ring2.rotation.z += 0.002;

      ring3.rotation.x += 0.004;
      ring3.rotation.z += 0.005;

      coreMesh.rotation.x += 0.002;
      coreMesh.rotation.y -= 0.003;

      // Subtle pulse on core anchor
      const scale = 1.0 + Math.sin(time * 0.002) * 0.15;
      anchor.scale.set(scale, scale, scale);

      // Animate drifting hexagonal accreditation shields
      for (let i = 0; i < shields.length; i++) {
        const s = shields[i];
        s.mesh.rotateOnAxis(s.rotAxis, s.speed);
        s.mesh.position.y = s.origin.y + Math.sin(time * 0.0008 + i) * 3;
        s.mesh.position.x = s.origin.x + Math.cos(time * 0.0006 + i * 1.3) * 2;
      }

      // Particles ambient drift
      particles.rotation.y = time * 0.00012;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // =========================================================================
    // CLEANUP
    // =========================================================================
    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      disposeThreeScene(scene, renderer);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!hasWebGL) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    />
  );
}
