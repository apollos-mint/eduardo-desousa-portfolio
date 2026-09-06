'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function VDLWidget({ title }: { title?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. WebGL Support Detection
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        setLoading(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      setLoading(false);
      return;
    }

    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 300;

    // 2. High-Performance PBR Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGLRenderer creation failed in VDLWidget:', e);
      setHasWebGL(false);
      setLoading(false);
      return;
    }

    // 3. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(20, 13, 26);

    // 4. Interactive OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Keep above turntable
    controls.minDistance = 15;
    controls.maxDistance = 42;
    controls.enablePan = false;
    controls.target.set(0, 2.8, 0);
    controls.update();

    // 5. Automotive Showroom Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const overheadLight = new THREE.DirectionalLight(0xffffff, 2.4);
    overheadLight.position.set(0, 32, 0);
    scene.add(overheadLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.6); // Cool Cyan Key
    keyLight.position.set(24, 24, 22);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x10b981, 1.7); // Emerald Fill
    fillLight.position.set(-24, 18, -18);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.0); // Violet Edge Rim
    rimLight.position.set(0, 14, -28);
    scene.add(rimLight);

    // Chassis Neon Underglow
    const underglow = new THREE.PointLight(0x38bdf8, 3.8, 22);
    underglow.position.set(0, 0.5, 0);
    scene.add(underglow);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 6. Theme Colors & Materials
    const isLight = document.documentElement.classList.contains('light');
    const colorBody = isLight ? 0x004d40 : 0x0284c7; // British Racing Green Metallic (Light) / Cyber Cyan Metallic (Dark)
    const colorGlow = isLight ? 0x0284c7 : 0x38bdf8;

    // 7. Turntable & Metrology Measurement Platform
    const turntableGeo = new THREE.CylinderGeometry(13.5, 13.5, 0.35, 64);
    const turntableMat = new THREE.MeshStandardMaterial({
      color: 0x060a12,
      metalness: 0.85,
      roughness: 0.25,
    });
    const turntable = new THREE.Mesh(turntableGeo, turntableMat);
    turntable.position.set(0, -0.18, 0);
    rootGroup.add(turntable);

    // Outer Blueprint Cyan Ring
    const ringGeo1 = new THREE.RingGeometry(12.8, 13.2, 64);
    ringGeo1.rotateX(-Math.PI / 2);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: colorGlow,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.position.y = 0.02;
    rootGroup.add(ring1);

    // Inner Emerald Precision Ring
    const ringGeo2 = new THREE.RingGeometry(10.2, 10.5, 48);
    ringGeo2.rotateX(-Math.PI / 2);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.position.y = 0.02;
    rootGroup.add(ring2);

    // Laser Crosshairs on Turntable
    const crosshairGeo = new THREE.PlaneGeometry(25, 0.08);
    crosshairGeo.rotateX(-Math.PI / 2);
    const crosshairMat = new THREE.MeshBasicMaterial({
      color: colorGlow,
      transparent: true,
      opacity: 0.3,
    });
    const crossX = new THREE.Mesh(crosshairGeo, crosshairMat);
    crossX.position.y = 0.02;
    const crossZ = new THREE.Mesh(crosshairGeo, crosshairMat);
    crossZ.rotation.y = Math.PI / 2;
    crossZ.position.y = 0.02;
    rootGroup.add(crossX);
    rootGroup.add(crossZ);

    // 8. Animated Metrology Laser Scan Line
    const laserBeamGeo = new THREE.BoxGeometry(9.6, 0.06, 0.06);
    const laserBeamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
    });
    const laserBeam = new THREE.Mesh(laserBeamGeo, laserBeamMat);
    laserBeam.position.set(0, 3.2, 0);
    rootGroup.add(laserBeam);

    const laserSheetGeo = new THREE.PlaneGeometry(9.6, 6.5);
    laserSheetGeo.rotateX(-Math.PI / 2);
    const laserSheetMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const laserSheet = new THREE.Mesh(laserSheetGeo, laserSheetMat);
    laserSheet.position.set(0, 3.2, 0);
    rootGroup.add(laserSheet);

    // 9. Load Authentic MINI Cooper Cabrio GLB Model
    const loader = new GLTFLoader();
    let carModel: THREE.Group | null = null;

    loader.load(
      '/models/mini_cooper_cabrio.glb',
      (gltf) => {
        carModel = gltf.scene;

        // Apply realistic automotive PBR materials
        carModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const name = mesh.name;

            if (name === 'body') {
              mesh.material = new THREE.MeshStandardMaterial({
                color: colorBody,
                metalness: 0.88,
                roughness: 0.16,
              });
            } else if (name === 'glass') {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0x0f172a,
                metalness: 0.95,
                roughness: 0.05,
                transparent: true,
                opacity: 0.55,
                depthWrite: false,
              });
            } else if (name === 'interior') {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0x18181b,
                metalness: 0.15,
                roughness: 0.82,
              });
            } else if (name === 'blackTrim') {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0x090d16,
                metalness: 0.1,
                roughness: 0.88,
              });
            } else if (name === 'chrome') {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0xf8fafc,
                metalness: 0.98,
                roughness: 0.08,
              });
            } else if (name === 'grille') {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0x050505,
                metalness: 0.25,
                roughness: 0.7,
              });
            } else if (name === 'lightsWhite') {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0xffffff,
                emissiveIntensity: 0.95,
                roughness: 0.05,
              });
            } else if (name === 'lightsRed') {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0xef4444,
                emissive: 0xef4444,
                emissiveIntensity: 0.75,
                roughness: 0.15,
              });
            } else if (name === 'tires') {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0x18181b,
                metalness: 0.05,
                roughness: 0.92,
              });
            } else if (name === 'wheelsAlloy') {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0xe2e8f0,
                metalness: 0.92,
                roughness: 0.18,
              });
            } else if (name === 'brakesRed') {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0xdc2626,
                metalness: 0.55,
                roughness: 0.28,
              });
            }
          }
        });

        rootGroup.add(carModel);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.warn('Failed to load /models/mini_cooper_cabrio.glb:', error);
        setLoading(false);
      }
    );

    // 10. Animation Loop & Metrology Physics
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Update OrbitControls
      controls.update();

      // Subtle suspension breathing when car is present
      if (carModel) {
        carModel.position.y = Math.sin(time * 2.5) * 0.03;
      }

      // Sweep Metrology Laser Line smoothly along car length (Z axis -8.2 to +8.2)
      const laserZ = Math.sin(time * 1.6) * 8.2;
      laserBeam.position.z = laserZ;
      laserSheet.position.z = laserZ;

      // Platform blueprint ring rotation
      ring1.rotation.z = time * 0.05;
      ring2.rotation.z = -time * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Responsive Resize Handler
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
      controls.dispose();
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="relative w-full h-80 md:h-[450px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/30 flex flex-col items-center justify-center bg-slate-950/60 p-6 text-center space-y-3">
        <div className="flex items-center space-x-2 bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>OEM QA // BMW GROUP · MINI COOPER CABRIO (VDL NEDCAR)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-mono">
          3D Metrology Telemetry: 110-120 vehicles/shift · 8D RCA Zero Defects · ±0.05 mm Laser Gap & Flush
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
    <div className="relative w-full h-80 md:h-[450px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 flex items-center justify-center bg-slate-950/50 group select-none">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm space-y-3 pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
          <div className="flex items-center space-x-2 text-[11px] font-mono text-cyan-300 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SYNCHRONIZING CAD TELEMETRY // MINI COOPER CABRIO...</span>
          </div>
        </div>
      )}

      {/* Top Left HUD: OEM Telemetry Badge */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center space-x-2 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>OEM QA // BMW GROUP · MINI COOPER CABRIO</span>
        </div>
      </div>

      {/* Top Right HUD: Metrology Laser Badge */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:flex">
        <div className="flex items-center space-x-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-800 text-[11px] font-mono text-slate-300 shadow-lg">
          <span className="text-cyan-400 font-semibold">±0.05 mm</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400">8D RCA ACTIVE</span>
        </div>
      </div>

      {/* Bottom Center: Interaction Controls Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-300">
        <div className="flex items-center space-x-2 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/25 text-[10px] font-mono text-cyan-300/80 shadow-md">
          <span>DRAG TO ROTATE</span>
          <span className="text-slate-600">·</span>
          <span>SCROLL TO ZOOM</span>
        </div>
      </div>

      {/* Bottom Right Title Badge */}
      {title && (
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden md:block">
          <span className="text-xs font-mono text-slate-400 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-md border border-slate-800">
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
