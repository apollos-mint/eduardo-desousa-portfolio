'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  getClampedPixelRatio,
  createFpsThrottler,
  setupVisibilityAndIntersection,
  disposeThreeScene,
} from '@/lib/three-perf';

export default function SkillsMatrixScene() {
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
      scene.fog = new THREE.FogExp2(0x07090e, 0.0025);
    }

    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 80;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(getClampedPixelRatio());
      renderer.setClearColor(0x000000, 0); // Transparent canvas overlay
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
    // 1. NEURAL TOPOLOGICAL NODES (Octahedrons & Icosahedrons)
    // =========================================================================
    const nodeCount = 48;
    const nodeGeometries = [
      new THREE.OctahedronGeometry(2.2, 0),
      new THREE.IcosahedronGeometry(2.0, 0),
      new THREE.TetrahedronGeometry(2.0, 0),
    ];

    const cyanMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.7 : 0.65,
    });

    const emeraldMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x059669 : 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.7 : 0.6,
    });

    const indigoMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x4f46e5 : 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.7 : 0.6,
    });

    const materials = [cyanMat, emeraldMat, indigoMat];

    interface NodeData {
      mesh: THREE.Mesh;
      origin: THREE.Vector3;
      velocity: THREE.Vector3;
      rotSpeed: { x: number; y: number; z: number };
    }

    const nodes: NodeData[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const geo = nodeGeometries[i % nodeGeometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      // Distribute widely across the backdrop
      const x = (Math.random() - 0.5) * 180;
      const y = (Math.random() - 0.5) * 130;
      const z = (Math.random() - 0.5) * 60 - 5;

      mesh.position.set(x, y, z);
      masterGroup.add(mesh);

      nodes.push({
        mesh,
        origin: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.02
        ),
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.015,
        },
      });
    }

    // =========================================================================
    // 2. SYNAPTIC INTERCONNECTION LINES (Dynamic Proximity Mesh)
    // =========================================================================
    const maxConnections = 160;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.6 : 0.55,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    masterGroup.add(lineMesh);

    // =========================================================================
    // 3. BACKGROUND AMBIENT DATA PARTICLES
    // =========================================================================
    const particleCount = 550;
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const colA = new THREE.Color(isLight ? '#0284c7' : '#38bdf8');
    const colB = new THREE.Color(isLight ? '#059669' : '#10b981');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pPositions[i3] = (Math.random() - 0.5) * 230;
      pPositions[i3 + 1] = (Math.random() - 0.5) * 170;
      pPositions[i3 + 2] = (Math.random() - 0.5) * 80 - 10;

      const c = i % 2 === 0 ? colA : colB;
      pColors[i3] = c.r;
      pColors[i3 + 1] = c.g;
      pColors[i3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isLight ? 3.0 : 2.6,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.85 : 0.8,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // =========================================================================
    // 4. MOUSE PARALLAX TRACKING
    // =========================================================================
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = normX * 0.15;
      targetRotX = -normY * 0.12;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize Handler
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
    // 5. ANIMATION LOOP WITH THROTTLING & TAB VISIBILITY PAUSE
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

      // Smooth camera / group rotation lerping
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.05;

      // Continuous subtle ambient drift
      masterGroup.rotation.z = Math.sin(time * 0.0003) * 0.04;

      // Animate Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.mesh.rotation.x += n.rotSpeed.x;
        n.mesh.rotation.y += n.rotSpeed.y;
        n.mesh.rotation.z += n.rotSpeed.z;

        // Subtle oscillating float
        n.mesh.position.x = n.origin.x + Math.sin(time * 0.001 + i) * 2.2;
        n.mesh.position.y = n.origin.y + Math.cos(time * 0.0012 + i * 1.5) * 2.2;
      }

      // Update Interconnection Lines
      let connIdx = 0;
      const posAttr = lineGeo.attributes.position as THREE.BufferAttribute;
      const colAttr = lineGeo.attributes.color as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const colArray = colAttr.array as Float32Array;

      for (let i = 0; i < nodes.length && connIdx < maxConnections; i++) {
        for (let j = i + 1; j < nodes.length && connIdx < maxConnections; j++) {
          const dist = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
          if (dist < 32) {
            const idx6 = connIdx * 6;
            posArray[idx6] = nodes[i].mesh.position.x;
            posArray[idx6 + 1] = nodes[i].mesh.position.y;
            posArray[idx6 + 2] = nodes[i].mesh.position.z;

            posArray[idx6 + 3] = nodes[j].mesh.position.x;
            posArray[idx6 + 4] = nodes[j].mesh.position.y;
            posArray[idx6 + 5] = nodes[j].mesh.position.z;

            const alpha = 1.0 - dist / 32;
            colArray[idx6] = 0.22 * alpha;
            colArray[idx6 + 1] = 0.74 * alpha;
            colArray[idx6 + 2] = 0.97 * alpha;

            colArray[idx6 + 3] = 0.06 * alpha;
            colArray[idx6 + 4] = 0.72 * alpha;
            colArray[idx6 + 5] = 0.5 * alpha;

            connIdx++;
          }
        }
      }

      // Reset remaining line points to zero
      for (let k = connIdx * 6; k < maxConnections * 6; k++) {
        posArray[k] = 0;
        colArray[k] = 0;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Slowly rotate particle field
      particles.rotation.y = time * 0.00015;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // =========================================================================
    // CLEANUP ON UNMOUNT
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
