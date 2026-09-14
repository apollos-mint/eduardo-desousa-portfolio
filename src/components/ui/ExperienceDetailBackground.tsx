'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  getClampedPixelRatio,
  createFpsThrottler,
  disposeThreeScene,
} from '@/lib/three-perf';

interface ExperienceDetailBackgroundProps {
  slug: string;
}

interface DomainPalette {
  primary: number;
  secondary: number;
  accent: number;
  primaryLight: string;
  secondaryLight: string;
  accentLight: string;
}

function getDomainPalette(slug: string): DomainPalette {
  switch (slug) {
    case 'hq-pack':
      // ASML Cleanroom: Ultrapure Cyan, Precision Emerald, High-Tech Mint
      return {
        primary: 0x06b6d4,
        secondary: 0x10b981,
        accent: 0x38bdf8,
        primaryLight: '#0891b2',
        secondaryLight: '#059669',
        accentLight: '#0284c7',
      };
    case 'vdl-nedcar':
      // Automotive OEM Robotics: Electric Blue, Royal Indigo, Violet Laser
      return {
        primary: 0x38bdf8,
        secondary: 0x6366f1,
        accent: 0x818cf8,
        primaryLight: '#0284c7',
        secondaryLight: '#4f46e5',
        accentLight: '#6366f1',
      };
    case 'independent-consultant':
      // Global Strategic Sourcing: Deep Ocean Azure, Trade Amber, Navigational Cyan
      return {
        primary: 0x0284c7,
        secondary: 0xf59e0b,
        accent: 0x38bdf8,
        primaryLight: '#0369a1',
        secondaryLight: '#d97706',
        accentLight: '#0284c7',
      };
    case 'arkcohogar':
      // Automated High-Bay Logistics: Industrial Safety Amber, Quayside Cyan, Steel Blue
      return {
        primary: 0xf59e0b,
        secondary: 0x38bdf8,
        accent: 0x0284c7,
        primaryLight: '#d97706',
        secondaryLight: '#0284c7',
        accentLight: '#0369a1',
      };
    case 'eds-paixao':
      // High-Volume Culinary Operations: Warm Saffron, Culinary Coral, Radiant Gold
      return {
        primary: 0xf97316,
        secondary: 0xf43f5e,
        accent: 0xfbbf24,
        primaryLight: '#ea580c',
        secondaryLight: '#e11d48',
        accentLight: '#d97706',
      };
    case 'e-ceramic':
      // Technical Architectural Materials: Structural Teal, Clean Sky, Marine Cyan
      return {
        primary: 0x14b8a6,
        secondary: 0x38bdf8,
        accent: 0x0d9488,
        primaryLight: '#0d9488',
        secondaryLight: '#0284c7',
        accentLight: '#0f766e',
      };
    default:
      return {
        primary: 0x38bdf8,
        secondary: 0x10b981,
        accent: 0x6366f1,
        primaryLight: '#0284c7',
        secondaryLight: '#059669',
        accentLight: '#4f46e5',
      };
  }
}

export default function ExperienceDetailBackground({ slug }: ExperienceDetailBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

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

    let isLight = document.documentElement.classList.contains('light');
    const palette = getDomainPalette(slug);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    if (!isLight) {
      scene.fog = new THREE.FogExp2(0x020617, 0.002);
    }

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 90;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(getClampedPixelRatio());
      renderer.setClearColor(0x000000, 0); // 100% transparent overlay over page
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.pointerEvents = 'none';
      mount.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    const backgroundGroup = new THREE.Group();
    scene.add(backgroundGroup);

    // =========================================================================
    // 1. DYNAMIC PARTICLE CONSTELLATION (Airflow / Intermodal Stream)
    // =========================================================================
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(isLight ? palette.primaryLight : palette.primary);
    const c2 = new THREE.Color(isLight ? palette.secondaryLight : palette.secondary);
    const c3 = new THREE.Color(isLight ? palette.accentLight : palette.accent);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 240;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 140;

      // Subtle directional velocities
      velocities[i3] = (Math.random() - 0.5) * 0.08;
      velocities[i3 + 1] = 0.05 + Math.random() * 0.08;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.06;

      const pick = i % 3;
      const col = pick === 0 ? c1 : pick === 1 ? c2 : c3;
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isLight ? 2.4 : 2.0,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.75 : 0.65,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    backgroundGroup.add(particles);

    // =========================================================================
    // 2. BESPOKE 3D DOMAIN-TAILORED GEOMETRIC SIGNATURES
    // =========================================================================
    const domainGroup = new THREE.Group();
    // Position comfortably to the right/center behind cards
    domainGroup.position.set(30, 4, -15);
    backgroundGroup.add(domainGroup);

    const wireMat1 = new THREE.MeshBasicMaterial({
      color: isLight ? new THREE.Color(palette.primaryLight) : palette.primary,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.35 : 0.22,
    });

    const wireMat2 = new THREE.MeshBasicMaterial({
      color: isLight ? new THREE.Color(palette.secondaryLight) : palette.secondary,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.40 : 0.28,
    });

    const lineMat = new THREE.LineBasicMaterial({
      color: isLight ? new THREE.Color(palette.accentLight) : palette.accent,
      transparent: true,
      opacity: isLight ? 0.45 : 0.30,
    });

    if (slug === 'independent-consultant') {
      // GLOBAL SOURCING & MARITIME NAVIGATION: Concentric Trade Latitude Rings & Gimbal
      const ringGeo1 = new THREE.RingGeometry(24, 25, 48);
      const ringMesh1 = new THREE.Mesh(ringGeo1, wireMat1);
      ringMesh1.rotation.x = Math.PI / 3;
      domainGroup.add(ringMesh1);

      const ringGeo2 = new THREE.RingGeometry(18, 19, 36);
      const ringMesh2 = new THREE.Mesh(ringGeo2, wireMat2);
      ringMesh2.rotation.y = Math.PI / 4;
      domainGroup.add(ringMesh2);

      // Navigational coordinate sphere
      const navGeo = new THREE.SphereGeometry(12, 16, 12);
      const navMesh = new THREE.Mesh(navGeo, wireMat1);
      domainGroup.add(navMesh);

    } else if (slug === 'hq-pack') {
      // SEMICONDUCTOR CLEANROOM: Sub-Micron Hexagonal Wafer Lattice & Alignment Cross
      for (let h = 0; h < 3; h++) {
        const hexGeo = new THREE.RingGeometry(14 + h * 9, 15 + h * 9, 6);
        const hexMesh = new THREE.Mesh(hexGeo, h % 2 === 0 ? wireMat1 : wireMat2);
        hexMesh.position.z = (h - 1) * 6;
        domainGroup.add(hexMesh);
      }

      // Wafer alignment target crosshairs
      const pts = [
        new THREE.Vector3(-32, 0, 0), new THREE.Vector3(32, 0, 0),
        new THREE.Vector3(0, -32, 0), new THREE.Vector3(0, 32, 0),
      ];
      const crossGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const crossLines = new THREE.LineSegments(crossGeo, lineMat);
      domainGroup.add(crossLines);

    } else if (slug === 'vdl-nedcar') {
      // AUTOMOTIVE OEM ENGINEERING: Aerodynamic Wind Tunnel Streamlines & Assembly Tooling CAD
      // 1. Aerodynamic Streamline Flow Splines
      for (let i = -3; i <= 3; i++) {
        const points: THREE.Vector3[] = [];
        const lateralX = i * 7.0;
        for (let z = -36; z <= 36; z += 3) {
          const distZ = Math.abs(z);
          // Curved aerodynamic roofline profile
          const yElevation = Math.max(0, 11 - distZ * 0.32) * (1 - Math.abs(i) * 0.16) + (i % 2 === 0 ? 1.5 : -1.5);
          points.push(new THREE.Vector3(lateralX, yElevation, z));
        }
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const streamline = new THREE.Line(lineGeo, i % 2 === 0 ? lineMat : wireMat1);
        domainGroup.add(streamline);
      }

      // 2. Automotive Plant Tooling Datum Grid Floor
      const datumGrid = new THREE.GridHelper(80, 16, palette.primary, isLight ? 0x94a3b8 : 0x1e293b);
      datumGrid.position.y = -14;
      domainGroup.add(datumGrid);

      // 3. Robotic Line Calibration Rings with Quadrant Alignment Ticks
      [-16, 16].forEach((zPos) => {
        const stationRingGeo = new THREE.RingGeometry(11, 11.4, 48);
        const stationRing = new THREE.Mesh(stationRingGeo, wireMat2);
        stationRing.position.set(0, 2, zPos);
        domainGroup.add(stationRing);

        const tickPts = [
          new THREE.Vector3(-14, 2, zPos), new THREE.Vector3(14, 2, zPos),
          new THREE.Vector3(0, -12, zPos), new THREE.Vector3(0, 16, zPos),
        ];
        const tickGeo = new THREE.BufferGeometry().setFromPoints(tickPts);
        domainGroup.add(new THREE.LineSegments(tickGeo, lineMat));
      });

    } else if (slug === 'arkcohogar') {
      // HIGH-BAY WAREHOUSE: 3D Storage Matrix Rack Cells & AGV Floor Grids
      const rackGrid = new THREE.GridHelper(90, 15, palette.primary, isLight ? 0x94a3b8 : 0x1e293b);
      rackGrid.position.y = -22;
      domainGroup.add(rackGrid);

      // Multi-tier storage cube cells
      for (let bx = -1; bx <= 1; bx++) {
        for (let by = 0; by <= 1; by++) {
          const cGeo = new THREE.BoxGeometry(8, 7, 10);
          const cMesh = new THREE.Mesh(cGeo, (bx + by) % 2 === 0 ? wireMat1 : wireMat2);
          cMesh.position.set(bx * 14, by * 10 - 10, (bx - by) * 5);
          domainGroup.add(cMesh);
        }
      }

    } else if (slug === 'eds-paixao') {
      // CULINARY OPERATIONS: Swirling Thermodynamic Convection Rings & Spiral Vortex
      const torusGeo = new THREE.TorusGeometry(22, 0.8, 16, 50);
      const torusMesh = new THREE.Mesh(torusGeo, wireMat1);
      torusMesh.rotation.x = Math.PI / 2.8;
      domainGroup.add(torusMesh);

      const innerTorusGeo = new THREE.TorusGeometry(14, 0.6, 16, 40);
      const innerTorus = new THREE.Mesh(innerTorusGeo, wireMat2);
      innerTorus.rotation.y = Math.PI / 3;
      domainGroup.add(innerTorus);

      const sphereCore = new THREE.DodecahedronGeometry(8, 1);
      const coreMesh = new THREE.Mesh(sphereCore, wireMat1);
      domainGroup.add(coreMesh);

    } else {
      // ARCHITECTURAL GEOMETRICS: Tessellated Polyhedral Isometric Frame
      const polyGeo = new THREE.IcosahedronGeometry(22, 1);
      const polyMesh = new THREE.Mesh(polyGeo, wireMat1);
      domainGroup.add(polyMesh);

      const octaGeo = new THREE.OctahedronGeometry(13, 0);
      const octaMesh = new THREE.Mesh(octaGeo, wireMat2);
      domainGroup.add(octaMesh);
    }

    // =========================================================================
    // 3. INTERACTIVE CURSOR & SCROLL TRACKING
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      // Normalized offset from screen center
      mouseX = (e.clientX - halfW) * 0.06;
      mouseY = (e.clientY - halfH) * 0.06;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // =========================================================================
    // 4. ANIMATION LOOP WITH FPS THROTTLING
    // =========================================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const throttler = createFpsThrottler(50);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      if (!throttler(now)) return;

      const elapsed = clock.getElapsedTime();

      // Fluid cursor inertia
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // Camera parallax
      camera.position.x += (targetX * 0.08 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 0.08 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Domain geometric rotation & tilt
      domainGroup.rotation.y = elapsed * 0.12 + targetX * 0.008;
      domainGroup.rotation.x = Math.sin(elapsed * 0.08) * 0.15 + targetY * 0.008;
      domainGroup.position.y = 4 - (scrollY % 1000) * 0.015;

      // Particle circulation & vertical drift
      particles.rotation.y = elapsed * 0.02 + targetX * 0.002;
      particles.rotation.x = elapsed * 0.01 + targetY * 0.002;

      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const pArr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pArr[i3 + 1] += velocities[i3 + 1];
        if (pArr[i3 + 1] > 100) {
          pArr[i3 + 1] = -100;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 5. THEME SWITCH OBSERVER (Dark / Light adaptation)
    // =========================================================================
    const observer = new MutationObserver(() => {
      const nextIsLight = document.documentElement.classList.contains('light');
      if (nextIsLight !== isLight) {
        isLight = nextIsLight;
        if (isLight) {
          scene.fog = null;
          particleMat.blending = THREE.NormalBlending;
          particleMat.opacity = 0.75;
          wireMat1.color.set(palette.primaryLight);
          wireMat1.opacity = 0.35;
          wireMat2.color.set(palette.secondaryLight);
          wireMat2.opacity = 0.40;
          lineMat.color.set(palette.accentLight);
          lineMat.opacity = 0.45;
        } else {
          scene.fog = new THREE.FogExp2(0x020617, 0.002);
          particleMat.blending = THREE.AdditiveBlending;
          particleMat.opacity = 0.65;
          wireMat1.color.setHex(palette.primary);
          wireMat1.opacity = 0.22;
          wireMat2.color.setHex(palette.secondary);
          wireMat2.opacity = 0.28;
          lineMat.color.setHex(palette.accent);
          lineMat.opacity = 0.30;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      disposeThreeScene(scene, renderer);
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [slug]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* High-tech cyber ambient vignette backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/60 dark:from-slate-950/40 dark:via-transparent dark:to-slate-950/80 pointer-events-none" />
      {!hasWebGL && (
        <div className="absolute inset-0 bg-radial-gradient from-cyan-950/20 via-slate-950/80 to-transparent" />
      )}
    </div>
  );
}

