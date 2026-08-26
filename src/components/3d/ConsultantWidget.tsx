'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ConsultantWidget({ title }: { title?: string }) {
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
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const isLight = document.documentElement.classList.contains('light');
    const colorPrimary = isLight ? 0x0284c7 : 0x38bdf8; // Cyan
    const colorSecondary = isLight ? 0x059669 : 0x10b981; // Emerald

    // 1. Build Globe
    const globeGeo = new THREE.SphereGeometry(15, 32, 32);
    const globeMat = new THREE.MeshBasicMaterial({
      color: colorPrimary,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    group.add(globe);

    // 2. Add Locations
    // Lat/Lon to Vector3 conversion
    const latLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = (radius * Math.sin(phi) * Math.sin(theta));
      const y = (radius * Math.cos(phi));
      return new THREE.Vector3(x, y, z);
    };

    const locations = [
      { name: "China (Guangdong)", lat: 23.1, lon: 113.2 },
      { name: "India (Delhi)", lat: 28.6, lon: 77.2 },
      { name: "España (Valencia)", lat: 39.4, lon: -0.3 },
      { name: "Holanda (Eindhoven)", lat: 51.4, lon: 5.4 },
    ];

    const pointMeshes: THREE.Mesh[] = [];
    const labelElements: HTMLDivElement[] = [];

    const pointGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const pointMat = new THREE.MeshBasicMaterial({ color: colorSecondary });
    const activePointMat = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White on hover

    locations.forEach((loc) => {
      const mesh = new THREE.Mesh(pointGeo, pointMat);
      mesh.position.copy(latLonToVector3(loc.lat, loc.lon, 15.2));
      mesh.userData = { name: loc.name };
      group.add(mesh);
      pointMeshes.push(mesh);

      // Create DOM element for label
      const el = document.createElement('div');
      el.className = 'absolute text-[11px] font-mono whitespace-nowrap px-2 py-1 bg-slate-900/90 text-emerald-300 border border-emerald-500/50 rounded shadow-[0_0_15px_rgba(16,185,129,0.4)] pointer-events-none transition-opacity duration-200';
      el.innerHTML = `<span class="font-bold">${loc.name}</span>`;
      el.style.transform = 'translate(-50%, -150%)'; // offset above the point
      el.style.opacity = '0';
      labelsContainer.appendChild(el);
      labelElements.push(el);
    });

    // 3. Raycaster for Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000); // Default offscreen
    let hoveredIndex = -1;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;
    };
    mount.addEventListener('mousemove', onMouseMove);

    // Initial rotation to show Eurasia clearly
    group.rotation.x = 0.3;
    group.rotation.y = -Math.PI / 4;

    // 4. Animation Loop
    let animationFrameId: number;
    const tempV = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-rotate slowly
      if (hoveredIndex === -1) {
        group.rotation.y += 0.002;
      }

      // Raycasting
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pointMeshes);

      // Reset styles
      pointMeshes.forEach(m => (m.material = pointMat));
      let currentHover = -1;

      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        const hit = intersects[0].object as THREE.Mesh;
        hit.material = activePointMat;
        currentHover = pointMeshes.indexOf(hit);
      } else {
        document.body.style.cursor = 'default';
      }
      
      hoveredIndex = currentHover;

      // Update Labels
      const halfWidth = mount.clientWidth / 2;
      const halfHeight = mount.clientHeight / 2;

      pointMeshes.forEach((mesh, i) => {
        tempV.copy(mesh.position);
        tempV.applyMatrix4(group.matrixWorld);
        tempV.project(camera);
        
        const x = (tempV.x * halfWidth) + halfWidth;
        const y = -(tempV.y * halfHeight) + halfHeight;
        
        const el = labelElements[i];
        
        // Show if hovered AND it's on the front side of the globe (tempV.z < 1)
        if (i === hoveredIndex && tempV.z < 1) {
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
      document.body.style.cursor = 'default';
    };
  }, []);

  if (!hasWebGL) return <div className="h-72 w-full bg-slate-900/50 rounded-2xl" />;

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 flex items-center justify-center bg-slate-950/40">
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />
      <div ref={labelsContainerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden" />
      
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center space-x-2 bg-slate-950/80 px-3 py-1.5 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>GLOBAL SUPPLY CHAIN // AUDITS</span>
        </div>
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-80">
        <span className="text-[10px] font-mono text-emerald-400 bg-slate-950/80 px-2 py-1 rounded border border-emerald-500/30">
          [ EXPLORE HUBS ]
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
