'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HQPackWidget({ title }: { title?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelsContainerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    const labelsContainer = labelsContainerRef.current;
    if (!mount || !labelsContainer) return;

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

    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 50;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGLRenderer failed in HQPackWidget:', e);
      setHasWebGL(false);
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // 1. Core Structure
    const isLight = document.documentElement.classList.contains('light');
    const colorPrimary = isLight ? 0x0284c7 : 0x38bdf8; // Cyan
    const colorSecondary = isLight ? 0x059669 : 0x10b981; // Emerald

    const coreGeo = new THREE.IcosahedronGeometry(8, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: colorSecondary,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const ringGeo = new THREE.TorusGeometry(18, 0.2, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colorPrimary,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    group.add(ring);
    
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(14, 0.1, 16, 50), ringMat);
    ring2.rotation.x = Math.PI / 2;
    group.add(ring2);

    // 2. Data Points & Labels
    const labelData = [
      { text: "Gas Leakage", pos: new THREE.Vector3(12, 10, 5) },
      { text: "Corrosion Cleaning", pos: new THREE.Vector3(-15, 8, -5) },
      { text: "Tolerance Adjustment", pos: new THREE.Vector3(-10, -12, 8) },
      { text: "TÜV Certification", pos: new THREE.Vector3(14, -10, -4) },
    ];

    const labelElements: HTMLDivElement[] = [];
    const pointMeshes: THREE.Mesh[] = [];

    const pointGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const pointMat = new THREE.MeshBasicMaterial({ color: colorSecondary });

    labelData.forEach((data, index) => {
      const mesh = new THREE.Mesh(pointGeo, pointMat);
      mesh.position.copy(data.pos);
      group.add(mesh);
      pointMeshes.push(mesh);

      // Create DOM element for label
      const el = document.createElement('div');
      el.className = 'absolute text-[10px] font-mono whitespace-nowrap px-2 py-1 bg-slate-900/80 text-cyan-300 border border-cyan-500/30 rounded backdrop-blur-sm shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-opacity duration-200';
      el.innerHTML = `<span class="w-1.5 h-1.5 inline-block rounded-full bg-emerald-400 mr-1.5"></span>${data.text}`;
      el.style.transform = 'translate(-50%, -50%)';
      el.style.opacity = '0'; // Initially hide until positioned
      labelsContainer.appendChild(el);
      labelElements.push(el);
    });

    // 3. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = ((x / rect.width) * 2 - 1) * 2;
      mouseY = (-(y / rect.height) * 2 + 1) * 2;
    };
    mount.addEventListener('mousemove', onMouseMove);

    // 4. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const tempV = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Mouse damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      group.rotation.x = targetY * 0.5 + Math.sin(time * 0.2) * 0.2;
      group.rotation.y = targetX * 0.5 + time * 0.15;
      core.rotation.z = time * 0.1;
      core.rotation.x = time * 0.15;

      // Project 3D positions to 2D screen coordinates
      const halfWidth = mount.clientWidth / 2;
      const halfHeight = mount.clientHeight / 2;

      pointMeshes.forEach((mesh, i) => {
        // Get absolute position of the point in world space
        tempV.copy(mesh.position);
        tempV.applyMatrix4(group.matrixWorld);
        
        // Project to screen space
        tempV.project(camera);
        
        const x = (tempV.x * halfWidth) + halfWidth;
        const y = -(tempV.y * halfHeight) + halfHeight;
        
        // Update DOM element position
        const el = labelElements[i];
        if (tempV.z < 1 && x > 0 && x < mount.clientWidth && y > 0 && y < mount.clientHeight) {
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
          el.style.opacity = '1';
        } else {
          el.style.opacity = '0';
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('mousemove', onMouseMove);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      labelsContainer.innerHTML = '';
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden glass-panel border border-cyan-500/30 flex flex-col items-center justify-center bg-slate-950/60 p-6 text-center space-y-3">
        <div className="flex items-center space-x-2 bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ASML CLEANROOM // DIAGNOSTICS</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-mono">
          High-Tech ISO Class 5 Cleanroom · ASML Litography EUV/DUV Interface · ERP ISAH Traceability
        </p>
        {title && (
          <span className="text-xs font-mono text-cyan-400 bg-slate-900/80 px-3 py-1 rounded-md border border-cyan-500/20">
            {title}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 flex items-center justify-center bg-slate-950/40">
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-crosshair z-0" />
      <div ref={labelsContainerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden" />
      
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center space-x-2 bg-slate-950/80 px-3 py-1.5 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>ASML CLEANROOM // DIAGNOSTICS</span>
        </div>
      </div>
      
      {title && (
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
          <span className="text-xs font-mono text-slate-400 bg-slate-950/80 px-3 py-1 rounded-md border border-slate-800">
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
