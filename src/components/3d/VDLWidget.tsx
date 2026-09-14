'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getClampedPixelRatio, createFpsThrottler, setupVisibilityAndIntersection, disposeThreeScene } from '@/lib/three-perf';

export default function VDLWidget({ title, lang = 'en' }: { title?: string; lang?: string }) {
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
      renderer.setPixelRatio(getClampedPixelRatio());
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
    camera.position.set(16, 11, -22);

    // 4. Interactive OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 14;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.target.set(0, 1.5, -2);

    // 5. Studio Automotive Environment Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(15, 25, 20);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    fillLight.position.set(-15, 12, -15);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.4);
    rimLight.position.set(0, -10, 18);
    scene.add(rimLight);

    // 6. Root Transform Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 6. Theme Colors & Materials
    const isLight = document.documentElement.classList.contains('light');
    const colorBody = isLight ? 0x004d40 : 0x0284c7; // British Racing Green Metallic (Light) / Cyber Cyan Metallic (Dark)
    const colorGlow = isLight ? 0x0284c7 : 0x38bdf8;

    // 7. Turntable & Metrology Measurement Platform (High-contrast obsidian showroom finish)
    const turntableGeo = new THREE.CylinderGeometry(13.5, 13.5, 0.35, 64);
    const turntableMat = new THREE.MeshStandardMaterial({
      color: 0x080f1d,
      metalness: 0.35,
      roughness: 0.50,
    });
    const turntable = new THREE.Mesh(turntableGeo, turntableMat);
    turntable.position.set(0, -0.18, 0);
    rootGroup.add(turntable);

    // Platform Metallic Chamfer Edge Ring
    const rimGeo = new THREE.CylinderGeometry(13.65, 13.65, 0.08, 64);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, roughness: 0.25 });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.set(0, -0.04, 0);
    rootGroup.add(rimMesh);

    // Deep Ambient Vehicle Shadow
    const shadowGeo = new THREE.PlaneGeometry(9.0, 15.0);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.65,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, 0.01, 0);
    rootGroup.add(shadowMesh);

    // Outer Blueprint Cyan Ring
    const ringGeo1 = new THREE.RingGeometry(12.8, 13.2, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: colorGlow,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = -Math.PI / 2;
    ring1.position.y = 0.02;
    rootGroup.add(ring1);

    // Inner Precision Ring (Around Vehicle Perimeter)
    const ringGeo2 = new THREE.RingGeometry(10.5, 10.8, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = 0.02;
    rootGroup.add(ring2);

    // Metrology Reticle Tick Marks along perimeter (Cleanly outside vehicle body)
    const tickGeo = new THREE.PlaneGeometry(2.4, 0.12);
    tickGeo.rotateX(-Math.PI / 2);
    const tickMat = new THREE.MeshBasicMaterial({
      color: colorGlow,
      transparent: true,
      opacity: 0.65,
    });
    [
      { x: 11.5, z: 0, rot: 0 },
      { x: -11.5, z: 0, rot: 0 },
      { x: 0, z: 11.5, rot: Math.PI / 2 },
      { x: 0, z: -11.5, rot: Math.PI / 2 },
    ].forEach((t) => {
      const tick = new THREE.Mesh(tickGeo, tickMat);
      tick.position.set(t.x, 0.02, t.z);
      tick.rotation.y = t.rot;
      rootGroup.add(tick);
    });

    // 8. Animated Metrology Laser Scan Line
    const laserBeamGeo = new THREE.BoxGeometry(9.6, 0.06, 0.06);
    const laserBeamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
      polygonOffset: true,
      polygonOffsetFactor: -1.0,
      polygonOffsetUnits: -1.0,
    });
    const laserBeam = new THREE.Mesh(laserBeamGeo, laserBeamMat);
    laserBeam.position.set(0, 3.2, 0);
    rootGroup.add(laserBeam);

    // 9. Load Authentic MINI Cooper Cabrio GLB Model
    const loader = new GLTFLoader();
    let carModel: THREE.Group | null = null;

    loader.load(
      '/models/mini_cooper_cabrio.glb',
      (gltf) => {
        carModel = gltf.scene;

        // Save references to meshes needed for surface projection
        let bodyMesh: THREE.Mesh | null = null;
        let blackTrimMesh: THREE.Mesh | null = null;
        let brakesRedMesh: THREE.Mesh | null = null;

        // Apply realistic automotive multi-coat clearcoat PBR materials
        carModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const name = mesh.parent?.name || mesh.name || '';

            if (name === 'body') {
              bodyMesh = mesh;
              mesh.material = new THREE.MeshPhysicalMaterial({
                color: colorBody,
                metalness: 0.25,
                roughness: 0.35,
                clearcoat: 0.85,
                clearcoatRoughness: 0.15,
                reflectivity: 0.6,
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
              blackTrimMesh = mesh;
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
              brakesRedMesh = mesh;
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0xdc2626,
                metalness: 0.55,
                roughness: 0.28,
              });
            }
          }
        });

        // Precision Hood Racing Stripes Surface Projection
        // Eliminates jagged mesh clipping, tears, and Z-fighting by projecting
        // the hood stripes to follow the exact 3D curvature of the car body hood.
        if (bodyMesh && blackTrimMesh) {
          const trimMesh = blackTrimMesh as THREE.Mesh;
          const bMesh = bodyMesh as THREE.Mesh;
          const pos3 = trimMesh.geometry.attributes.position;
          const index3 = trimMesh.geometry.index;

          if (pos3 && index3) {
            carModel.updateMatrixWorld(true);
            const rayMesh0 = new THREE.Mesh(bMesh.geometry, new THREE.MeshBasicMaterial());
            rayMesh0.matrixWorld.copy(bMesh.matrixWorld);
            const raycaster = new THREE.Raycaster();

            const stripeTriIndices: number[] = [];
            const nonStripeIndices3: number[] = [];
            const stripeVerts = new Set<number>();
            const vA = new THREE.Vector3();
            const vB = new THREE.Vector3();
            const vC = new THREE.Vector3();

            for (let t = 0; t < index3.count / 3; t++) {
              const i0 = index3.getX(t * 3);
              const i1 = index3.getX(t * 3 + 1);
              const i2 = index3.getX(t * 3 + 2);
              vA.fromBufferAttribute(pos3, i0).applyMatrix4(trimMesh.matrixWorld);
              vB.fromBufferAttribute(pos3, i1).applyMatrix4(trimMesh.matrixWorld);
              vC.fromBufferAttribute(pos3, i2).applyMatrix4(trimMesh.matrixWorld);
              const c = new THREE.Vector3().add(vA).add(vB).add(vC).divideScalar(3);

              // Precise bounding box for Mini Cooper hood stripes
              if (c.y > 2.8 && c.z > -8.2 && c.z < -3.8 && Math.abs(c.x) > 1.1 && Math.abs(c.x) < 2.4) {
                stripeTriIndices.push(i0, i1, i2);
                stripeVerts.add(i0);
                stripeVerts.add(i1);
                stripeVerts.add(i2);
              } else {
                nonStripeIndices3.push(i0, i1, i2);
              }
            }

            // Remove old submerged stripe faces from blackTrim
            trimMesh.geometry.setIndex(nonStripeIndices3);

            // Also remove any duplicate stripe fragments from brakesRed
            if (brakesRedMesh) {
              const redMesh = brakesRedMesh as THREE.Mesh;
              const pos10 = redMesh.geometry.attributes.position;
              const index10 = redMesh.geometry.index;
              if (pos10 && index10) {
                const nonStripeIndices10: number[] = [];
                for (let t = 0; t < index10.count / 3; t++) {
                  const i0 = index10.getX(t * 3);
                  const i1 = index10.getX(t * 3 + 1);
                  const i2 = index10.getX(t * 3 + 2);
                  vA.fromBufferAttribute(pos10, i0).applyMatrix4(redMesh.matrixWorld);
                  vB.fromBufferAttribute(pos10, i1).applyMatrix4(redMesh.matrixWorld);
                  vC.fromBufferAttribute(pos10, i2).applyMatrix4(redMesh.matrixWorld);
                  const c = new THREE.Vector3().add(vA).add(vB).add(vC).divideScalar(3);
                  if (!(c.y > 2.8 && c.z > -8.2 && c.z < -3.8 && Math.abs(c.x) > 1.1 && Math.abs(c.x) < 2.4)) {
                    nonStripeIndices10.push(i0, i1, i2);
                  }
                }
                redMesh.geometry.setIndex(nonStripeIndices10);
              }
            }

            // Project each stripe vertex onto the car body sheet metal
            const projectedMap = new Map<number, THREE.Vector3>();
            const worldPos = new THREE.Vector3();
            const directions = [
              new THREE.Vector3(0, -1, 0),
              new THREE.Vector3(0, -1, 0.35).normalize(),
              new THREE.Vector3(0, -1, -0.35).normalize(),
              new THREE.Vector3(0.25, -1, 0).normalize(),
              new THREE.Vector3(-0.25, -1, 0).normalize(),
              new THREE.Vector3(0, 1, 0),
            ];

            for (const vi of stripeVerts) {
              worldPos.fromBufferAttribute(pos3, vi).applyMatrix4(trimMesh.matrixWorld);
              let hitFound = false;
              for (const dir of directions) {
                const origin = worldPos.clone().addScaledVector(dir, -2.0);
                raycaster.set(origin, dir);
                const hits = raycaster.intersectObject(rayMesh0);
                if (hits.length > 0) {
                  const normal = hits[0].face
                    ? hits[0].face.normal.clone().transformDirection(bMesh.matrixWorld)
                    : new THREE.Vector3(0, 1, 0);
                  const pt = hits[0].point.clone().addScaledVector(normal, 0.018);
                  projectedMap.set(vi, pt);
                  hitFound = true;
                  break;
                }
              }
              if (!hitFound) {
                projectedMap.set(vi, worldPos.clone().add(new THREE.Vector3(0, 0.02, 0)));
              }
            }

            // Build dedicated Float32 BufferGeometry for the hood stripes
            const positions: number[] = [];
            for (let i = 0; i < stripeTriIndices.length; i++) {
              const idx = stripeTriIndices[i];
              const pt = projectedMap.get(idx) || worldPos;
              positions.push(pt.x, pt.y, pt.z);
            }

            const stripeGeo = new THREE.BufferGeometry();
            stripeGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            stripeGeo.computeVertexNormals();

            const stripeMat = new THREE.MeshStandardMaterial({
              color: 0x090d16, // Authentic Gloss Black OEM Mini Cooper Bonnet Stripes
              metalness: 0.2,
              roughness: 0.32,
              polygonOffset: true,
              polygonOffsetFactor: -2.0,
              polygonOffsetUnits: -3.0,
            });

            const stripeMesh = new THREE.Mesh(stripeGeo, stripeMat);
            carModel.add(stripeMesh);
          }
        }

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
    let isVisibleInView = true;

    const cleanupVisibility = setupVisibilityAndIntersection(mount, (vis) => {
      isVisibleInView = vis;
    });

    const throttler = createFpsThrottler(45);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisibleInView) return;
      const now = performance.now();
      if (!throttler(now)) return;

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
      cleanupVisibility();
      controls.dispose();
      disposeThreeScene(scene, renderer);
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const isEs = lang === 'es';
  const isPt = lang === 'pt';

  const loadingText = isEs
    ? 'SINCRONIZANDO TELEMETRÍA CAD // MINI COOPER CABRIO...'
    : isPt
    ? 'A SINCRONIZAR TELEMETRIA CAD // MINI COOPER CABRIO...'
    : 'SYNCHRONIZING CAD TELEMETRY // MINI COOPER CABRIO...';

  const oemBadge = isEs
    ? 'CONTROL DE CALIDAD OEM // GRUPO BMW · MINI COOPER CABRIO'
    : isPt
    ? 'CONTROLO DE QUALIDADE OEM // GRUPO BMW · MINI COOPER CABRIO'
    : 'OEM QA // BMW GROUP · MINI COOPER CABRIO';

  const rcaBadge = isEs
    ? '8D RCA ACTIVO'
    : isPt
    ? '8D RCA ATIVO'
    : '8D RCA ACTIVE';

  const dragHint = isEs
    ? 'ARRASTRA PARA ROTAR'
    : isPt
    ? 'ARRASTA PARA RODAR'
    : 'DRAG TO ROTATE';

  const zoomHint = isEs
    ? 'SCROLL PARA ZOOM'
    : isPt
    ? 'SCROLL PARA ZOOM'
    : 'SCROLL TO ZOOM';

  if (!hasWebGL) {
    return (
      <div className="relative w-full h-80 md:h-[450px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-950/80">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
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
            <span>{loadingText}</span>
          </div>
        </div>
      )}

      {/* Top Left HUD: OEM Telemetry Badge */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 pointer-events-none">
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-mono text-cyan-400 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-bold tracking-wide">{oemBadge}</span>
        </div>
      </div>

      {/* Top Right HUD: Metrology Laser Badge */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 pointer-events-none hidden sm:flex">
        <div className="flex items-center space-x-2.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-200 shadow-xl">
          <span className="text-cyan-400 font-bold">LASER: ±0.05 mm</span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-emerald-400 font-bold">{rcaBadge}</span>
        </div>
      </div>

      {/* Bottom Left: Interaction Controls Hint */}
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20 pointer-events-none transition-opacity duration-300">
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-mono text-cyan-300 shadow-md">
          <span>{dragHint}</span>
          <span className="text-slate-600">·</span>
          <span>{zoomHint}</span>
        </div>
      </div>

      {/* Bottom Right Title Badge */}
      {title && (
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20 pointer-events-none hidden md:block">
          <span className="text-[11px] font-mono font-bold text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl shadow-md">
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
