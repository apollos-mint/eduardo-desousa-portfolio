'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function VDLWidget({ title }: { title?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 40;
    camera.position.y = 10;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const isLight = document.documentElement.classList.contains('light');
    const colorPrimary = isLight ? 0x0284c7 : 0x38bdf8; // Cyan
    const colorSecondary = isLight ? 0x4f46e5 : 0x6366f1; // Indigo
    const colorAccent = isLight ? 0x059669 : 0x10b981; // Emerald

    const wireMat = new THREE.MeshBasicMaterial({
      color: colorPrimary,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const solidMat = new THREE.MeshBasicMaterial({
      color: colorSecondary,
      transparent: true,
      opacity: 0.2,
    });

    // 1. Build Stylized Car (Mini Cooper proportions)
    const carGroup = new THREE.Group();
    
    // Lower Body
    const bodyGeo = new THREE.BoxGeometry(10, 3, 20);
    const bodyWire = new THREE.Mesh(bodyGeo, wireMat);
    const bodySolid = new THREE.Mesh(bodyGeo, solidMat);
    bodyWire.position.y = 2.5;
    bodySolid.position.y = 2.5;
    carGroup.add(bodyWire);
    carGroup.add(bodySolid);

    // Cabin
    const cabinGeo = new THREE.BoxGeometry(8, 3.5, 10);
    const cabinWire = new THREE.Mesh(cabinGeo, wireMat);
    cabinWire.position.set(0, 5.75, -1);
    carGroup.add(cabinWire);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(1.8, 1.8, 1, 16);
    const wheelMat = new THREE.MeshBasicMaterial({ color: colorAccent, wireframe: true, opacity: 0.8, transparent: true });
    
    const wheelPositions = [
      [-5.5, 1.8, 6], // Front Left
      [5.5, 1.8, 6],  // Front Right
      [-5.5, 1.8, -6], // Rear Left
      [5.5, 1.8, -6],  // Rear Right
    ];

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      carGroup.add(wheel);
    });

    // Headlights
    const lightGeo = new THREE.CircleGeometry(1, 12);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
    const headlightL = new THREE.Mesh(lightGeo, lightMat);
    headlightL.position.set(-3, 3, 10.1);
    const headlightR = new THREE.Mesh(lightGeo, lightMat);
    headlightR.position.set(3, 3, 10.1);
    carGroup.add(headlightL);
    carGroup.add(headlightR);

    // Tail lights
    const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
    const taillightL = new THREE.Mesh(lightGeo, tailMat);
    taillightL.position.set(-3.5, 3, -10.1);
    taillightL.rotation.y = Math.PI;
    const taillightR = new THREE.Mesh(lightGeo, tailMat);
    taillightR.position.set(3.5, 3, -10.1);
    taillightR.rotation.y = Math.PI;
    carGroup.add(taillightL);
    carGroup.add(taillightR);

    // Add Grid under car
    const gridGeo = new THREE.PlaneGeometry(60, 60, 20, 20);
    const gridMat = new THREE.MeshBasicMaterial({ color: colorSecondary, wireframe: true, transparent: true, opacity: 0.2 });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2;
    group.add(grid);

    group.add(carGroup);

    // 2. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovered = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = ((x / rect.width) * 2 - 1);
      mouseY = (-(y / rect.height) * 2 + 1);
    };
    
    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mouseenter', () => isHovered = true);
    mount.addEventListener('mouseleave', () => isHovered = false);

    // 3. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Mouse damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Base rotation
      if (!isHovered) {
        group.rotation.y = time * 0.2;
      } else {
        group.rotation.y += (targetX * Math.PI - group.rotation.y) * 0.05;
        group.rotation.x += (targetY * 0.2 - group.rotation.x) * 0.05;
      }

      // Simulate engine idle
      carGroup.position.y = Math.sin(time * 20) * 0.05;

      // Rotate wheels if moving
      if (!isHovered) {
        carGroup.children.forEach(child => {
          if (child instanceof THREE.Mesh && child.geometry instanceof THREE.CylinderGeometry) {
            child.rotation.x += 0.05;
          }
        });
        // Bob grid to simulate movement
        grid.position.z = (time * 10) % 3;
      }

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
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) return <div className="h-72 w-full bg-slate-900/50 rounded-2xl" />;

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 flex items-center justify-center bg-slate-950/40 group">
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-ew-resize z-0" />
      
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center space-x-2 bg-slate-950/80 px-3 py-1.5 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>OEM QA // MULTI-PLATFORM CHASSIS</span>
        </div>
      </div>
      
      {/* Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono text-cyan-400 bg-slate-950/80 px-2 py-1 rounded border border-cyan-500/30">
          [ INTERACT ]
        </span>
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
