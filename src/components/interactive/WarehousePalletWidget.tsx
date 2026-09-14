'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  getClampedPixelRatio,
  createFpsThrottler,
  setupVisibilityAndIntersection,
  disposeThreeScene,
} from '@/lib/three-perf';
import { Layers, Package, CheckCircle2, RotateCcw, ArrowDownToLine, ArrowUpFromLine, Activity } from 'lucide-react';

interface WarehousePalletWidgetProps {
  title?: string;
  lang?: string;
}

interface RackSlot {
  id: string;
  tier: number;
  bay: number;
  x: number;
  y: number;
  z: number;
  occupied: boolean;
  sku: string;
  palletGroup?: THREE.Group;
}

export default function WarehousePalletWidget({
  title = 'Arkcohogar // Warehouse Pallet & Inventory Matrix',
  lang = 'en',
}: WarehousePalletWidgetProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Interaction & Inventory Telemetry State
  const [selectedSlotId, setSelectedSlotId] = useState<string>('BAY-B2');
  const [occupiedCount, setOccupiedCount] = useState(7);
  const [statusMessage, setStatusMessage] = useState('SYSTEM READY // ALL BAYS VERIFIED');
  const [isMoving, setIsMoving] = useState(false);
  const [activeSku, setActiveSku] = useState('SKU-AR-9021 (Ceramic Inventory)');

  // Refs for 3D interactions
  const slotsRef = useRef<RackSlot[]>([]);
  const moveTriggerRef = useRef<((slotId: string, action: 'store' | 'retrieve') => void) | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

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

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.0035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
    camera.position.set(28, 22, 38);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(getClampedPixelRatio());
      mount.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 2.5);
    dirLight.position.set(25, 45, 30);
    scene.add(dirLight);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 2.0);
    cyanRim.position.set(-30, 20, -25);
    scene.add(cyanRim);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Warehouse Floor Grid Platform
    const floorGeo = new THREE.BoxGeometry(48, 0.6, 36);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x09101f, roughness: 0.6, metalness: 0.3 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -0.3, 0);
    rootGroup.add(floor);

    // Floor Marking Lines (Safety Yellow & Cyan)
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.7 });
    const lineL = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 30).rotateX(-Math.PI / 2), lineMat);
    lineL.position.set(-18, 0.02, 0);
    rootGroup.add(lineL);

    const lineR = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 30).rotateX(-Math.PI / 2), lineMat);
    lineR.position.set(18, 0.02, 0);
    rootGroup.add(lineR);

    // 2. Multi-Tier Warehouse Pallet Rack Structure
    const rackGroup = new THREE.Group();
    rackGroup.position.set(0, 0, -4);
    rootGroup.add(rackGroup);

    const uprightMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.7, roughness: 0.3 }); // Blue Uprights
    const beamMat = new THREE.MeshStandardMaterial({ color: 0xf97316, metalness: 0.6, roughness: 0.35 }); // Orange Beams

    const uprightGeo = new THREE.BoxGeometry(0.6, 19, 0.8);
    const beamGeo = new THREE.BoxGeometry(11, 0.5, 0.5);
    const crossGeo = new THREE.BoxGeometry(0.2, 0.3, 4.4);

    // 4 Upright Frames at X = -16.5, -5.5, 5.5, 16.5
    const bayXs = [-11, 0, 11];
    const frameXs = [-16.5, -5.5, 5.5, 16.5];
    const tierHeights = [1.2, 6.8, 12.4];

    frameXs.forEach((fx) => {
      [-2, 2].forEach((fz) => {
        const upright = new THREE.Mesh(uprightGeo, uprightMat);
        upright.position.set(fx, 9.5, fz);
        rackGroup.add(upright);
      });

      // Frame Bracing
      for (let y = 3; y <= 16; y += 4) {
        const brace = new THREE.Mesh(crossGeo, uprightMat);
        brace.position.set(fx, y, 0);
        rackGroup.add(brace);
      }
    });

    // Horizontal Orange Crossbeams for each bay and tier
    bayXs.forEach((bx) => {
      tierHeights.forEach((ty) => {
        [-2, 2].forEach((bz) => {
          const beam = new THREE.Mesh(beamGeo, beamMat);
          beam.position.set(bx, ty, bz);
          rackGroup.add(beam);
        });
      });
    });

    // 3. Wooden Euro-Pallet Geometry & Materials
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.85, metalness: 0.1 });
    const boxColors = [0xd97706, 0x0284c7, 0x10b981, 0x475569, 0x6366f1];

    const createPalletWithCartons = (colorHex: number, label: string): THREE.Group => {
      const pGroup = new THREE.Group();

      // Top Deckboards (5 planks)
      for (let p = -1.6; p <= 1.6; p += 0.8) {
        const plank = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.12, 0.6), woodMat);
        plank.position.set(0, 0.72, p);
        pGroup.add(plank);
      }
      // Stringer Blocks (9 blocks)
      for (const sx of [-1.8, 0, 1.8]) {
        for (const sz of [-1.5, 0, 1.5]) {
          const block = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.6), woodMat);
          block.position.set(sx, 0.42, sz);
          pGroup.add(block);
        }
      }
      // Bottom deckboards
      for (const sz of [-1.5, 0, 1.5]) {
        const bPlank = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.1, 0.6), woodMat);
        bPlank.position.set(0, 0.12, sz);
        pGroup.add(bPlank);
      }

      // Stacked Cargo Boxes on Pallet
      const boxMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.55, metalness: 0.2 });
      const cGeo = new THREE.BoxGeometry(1.9, 1.4, 1.8);
      for (let bx = -0.95; bx <= 0.95; bx += 1.9) {
        for (let bz = -0.85; bz <= 0.85; bz += 1.7) {
          for (let by = 1.5; by <= 2.9; by += 1.4) {
            const carton = new THREE.Mesh(cGeo, boxMat);
            carton.position.set(bx, by, bz);
            pGroup.add(carton);
          }
        }
      }

      // Shrink-wrap translucent overlay
      const wrapGeo = new THREE.BoxGeometry(4.1, 3.2, 3.7);
      const wrapMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.22,
        roughness: 0.2,
      });
      const wrap = new THREE.Mesh(wrapGeo, wrapMat);
      wrap.position.set(0, 2.3, 0);
      pGroup.add(wrap);

      pGroup.userData = { label };
      return pGroup;
    };

    // 4. Initialize 9 Rack Slots (3 Bays x 3 Tiers)
    const initialSlots: RackSlot[] = [];
    const tierLabels = ['A', 'B', 'C'];

    let countOccupied = 0;
    bayXs.forEach((bx, bIdx) => {
      tierHeights.forEach((ty, tIdx) => {
        const slotId = `BAY-${tierLabels[tIdx]}${bIdx + 1}`;
        const isOcc = !(bIdx === 1 && tIdx === 1) && !(bIdx === 2 && tIdx === 2); // 7 occupied, 2 vacant
        const sku = `SKU-AR-${1000 + bIdx * 10 + tIdx}`;

        // Top surface of the orange beam is at ty + 0.25; pallets center at z = 0 inside rackGroup
        const palletY = ty + 0.25;
        const slot: RackSlot = {
          id: slotId,
          bay: bIdx + 1,
          tier: tIdx + 1,
          x: bx,
          y: palletY,
          z: 0,
          occupied: isOcc,
          sku,
        };

        if (isOcc) {
          countOccupied++;
          const col = boxColors[(bIdx + tIdx) % boxColors.length];
          const pMesh = createPalletWithCartons(col, sku);
          // Position firmly seated on rack crossbeams at z = 0
          pMesh.position.set(slot.x, slot.y, slot.z);
          rackGroup.add(pMesh);
          slot.palletGroup = pMesh;
        }

        initialSlots.push(slot);
      });
    });

    slotsRef.current = initialSlots;
    setOccupiedCount(countOccupied);

    // 5. Automated Guided Vehicle / Staging Pallet
    const agvGroup = new THREE.Group();
    agvGroup.position.set(0, 0, 11);
    rootGroup.add(agvGroup);

    const agvChassis = new THREE.Mesh(
      new THREE.BoxGeometry(6, 1.2, 7.5),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 })
    );
    agvChassis.position.y = 0.6;
    agvGroup.add(agvChassis);

    // AGV Warning Strobe
    const agvStrobe = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    );
    agvStrobe.position.set(0, 1.4, -3.2);
    agvGroup.add(agvStrobe);

    // AGV Vertical Fork Mast (lifts up and down along warehouse rack tiers)
    const forkMast = new THREE.Group();
    agvGroup.add(forkMast);

    const forkMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.2 });
    const f1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.15, 4.5), forkMat);
    f1.position.set(-1.2, 0.45, -4.5);
    const f2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.15, 4.5), forkMat);
    f2.position.set(1.2, 0.45, -4.5);
    forkMast.add(f1);
    forkMast.add(f2);

    // 6. Smooth AGV Pallet Transfer Animation Function
    let activeAnimation: (() => boolean) | null = null;

    moveTriggerRef.current = (slotId: string, action: 'store' | 'retrieve') => {
      const slot = slotsRef.current.find((s) => s.id === slotId);
      if (!slot) return;
      setIsMoving(true);

      const homeX = 0;
      const homeZ = 11;
      const targetBayX = slot.x;
      const approachZ = 5.2;

      if (action === 'store') {
        if (slot.occupied) {
          setStatusMessage(`BAY ${slotId} ALREADY OCCUPIED // SELECT EMPTY SLOT`);
          setIsMoving(false);
          return;
        }

        const newPallet = createPalletWithCartons(0x0284c7, slot.sku);
        newPallet.position.set(0, 0.55, -4.5);
        forkMast.add(newPallet);

        let progress = 0;
        setStatusMessage(`DISPATCHING AGV // STORING ${slot.sku} INTO ${slotId}`);

        activeAnimation = () => {
          progress += 0.018;
          const t = Math.min(progress, 1);

          if (t < 0.35) {
            // Stage 1: AGV drives across floor to target bay
            const phase = t / 0.35;
            const ease = 0.5 - 0.5 * Math.cos(phase * Math.PI);
            agvGroup.position.x = THREE.MathUtils.lerp(homeX, targetBayX, ease);
            agvGroup.position.z = THREE.MathUtils.lerp(homeZ, approachZ, ease);
            forkMast.position.y = 0;
          } else if (t < 0.7) {
            // Stage 2: Fork mast lifts pallet to slot shelf height
            agvGroup.position.x = targetBayX;
            agvGroup.position.z = approachZ;
            const phase = (t - 0.35) / 0.35;
            const ease = 0.5 - 0.5 * Math.cos(phase * Math.PI);
            forkMast.position.y = THREE.MathUtils.lerp(0, slot.y - 0.3, ease);
          } else if (t < 0.88) {
            // Stage 3: AGV inserts pallet into shelf slot
            const phase = (t - 0.7) / 0.18;
            const ease = 0.5 - 0.5 * Math.cos(phase * Math.PI);
            agvGroup.position.z = THREE.MathUtils.lerp(approachZ, 4.5, ease);
          } else {
            // Stage 4: Transfer pallet to rackGroup and AGV returns home
            if (newPallet.parent === forkMast) {
              forkMast.remove(newPallet);
              newPallet.position.set(slot.x, slot.y, slot.z);
              rackGroup.add(newPallet);
              slot.occupied = true;
              slot.palletGroup = newPallet;
              setOccupiedCount((c) => c + 1);
            }
            const phase = (t - 0.88) / 0.12;
            const ease = 0.5 - 0.5 * Math.cos(phase * Math.PI);
            agvGroup.position.x = THREE.MathUtils.lerp(targetBayX, homeX, ease);
            agvGroup.position.z = THREE.MathUtils.lerp(4.5, homeZ, ease);
            forkMast.position.y = THREE.MathUtils.lerp(slot.y - 0.3, 0, ease);
          }

          if (t >= 1) {
            agvGroup.position.set(homeX, 0, homeZ);
            forkMast.position.y = 0;
            setStatusMessage(`SUCCESS // PALLET STORED AT ${slotId} · 99.5% ACCURACY`);
            setIsMoving(false);
            return true;
          }
          return false;
        };
      } else {
        if (!slot.occupied || !slot.palletGroup) {
          setStatusMessage(`BAY ${slotId} IS VACANT // NO PALLET TO RETRIEVE`);
          setIsMoving(false);
          return;
        }

        const palletToMove = slot.palletGroup;
        let progress = 0;
        setStatusMessage(`RETRIEVING PALLET FROM ${slotId} // AGV PICKUP`);

        activeAnimation = () => {
          progress += 0.018;
          const t = Math.min(progress, 1);

          if (t < 0.35) {
            // Stage 1: AGV drives to target bay
            const phase = t / 0.35;
            const ease = 0.5 - 0.5 * Math.cos(phase * Math.PI);
            agvGroup.position.x = THREE.MathUtils.lerp(homeX, targetBayX, ease);
            agvGroup.position.z = THREE.MathUtils.lerp(homeZ, 4.5, ease);
            forkMast.position.y = THREE.MathUtils.lerp(0, slot.y - 0.3, ease);
          } else if (t < 0.55) {
            // Stage 2: Pallet picked onto AGV forks
            if (palletToMove.parent === rackGroup) {
              rackGroup.remove(palletToMove);
              palletToMove.position.set(0, 0.55, -4.5);
              forkMast.add(palletToMove);
            }
            const phase = (t - 0.35) / 0.2;
            const ease = 0.5 - 0.5 * Math.cos(phase * Math.PI);
            agvGroup.position.z = THREE.MathUtils.lerp(4.5, approachZ, ease);
          } else if (t < 0.8) {
            // Stage 3: Lower fork mast to transport height
            const phase = (t - 0.55) / 0.25;
            const ease = 0.5 - 0.5 * Math.cos(phase * Math.PI);
            forkMast.position.y = THREE.MathUtils.lerp(slot.y - 0.3, 0, ease);
            agvGroup.position.z = THREE.MathUtils.lerp(approachZ, approachZ + 2, ease);
          } else {
            // Stage 4: Drive back home
            const phase = (t - 0.8) / 0.2;
            const ease = 0.5 - 0.5 * Math.cos(phase * Math.PI);
            agvGroup.position.x = THREE.MathUtils.lerp(targetBayX, homeX, ease);
            agvGroup.position.z = THREE.MathUtils.lerp(approachZ + 2, homeZ, ease);
          }

          if (t >= 1) {
            slot.occupied = false;
            if (palletToMove.parent === forkMast) {
              forkMast.remove(palletToMove);
            }
            slot.palletGroup = undefined;
            agvGroup.position.set(homeX, 0, homeZ);
            forkMast.position.y = 0;
            setOccupiedCount((c) => c - 1);
            setStatusMessage(`RETRIEVAL COMPLETE // DISPATCH READY`);
            setIsMoving(false);
            return true;
          }
          return false;
        };
      }
    };

    // 7. Mouse Orbiting and Interactive Selection (Fixed isometric parked angle, no continuous spin)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = -0.55;
    rootGroup.rotation.y = -0.55;
    let isDragging = false;
    let prevX = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const delta = e.clientX - prevX;
        targetRotY += delta * 0.01;
        prevX = e.clientX;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Click Raycasting to Select Rack Slot
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(rackGroup.children, true);

      if (intersects.length > 0) {
        // Find closest slot
        let closestSlot = slotsRef.current[0];
        let minDist = Infinity;
        const hitPoint = intersects[0].point;

        slotsRef.current.forEach((slot) => {
          const worldPos = new THREE.Vector3(slot.x, slot.y, slot.z);
          const d = hitPoint.distanceTo(worldPos);
          if (d < minDist) {
            minDist = d;
            closestSlot = slot;
          }
        });

        setSelectedSlotId(closestSlot.id);
        setActiveSku(closestSlot.sku);
        setStatusMessage(`SELECTED ${closestSlot.id} // ${closestSlot.occupied ? 'OCCUPIED' : 'VACANT'}`);
      }
    };

    mount.addEventListener('click', handleClick);

    // Animation Loop
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

      const elapsed = clock.getElapsedTime();

      // Smooth damped rotation to target angle with mouse drag (no continuous auto-spinning)
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;

      // AGV strobe flash
      agvStrobe.scale.setScalar(1.0 + Math.sin(elapsed * 12) * 0.3);

      // Run active pallet animation if in progress
      if (activeAnimation) {
        const done = activeAnimation();
        if (done) activeAnimation = null;
      }

      camera.lookAt(0, 6, 0);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || 600;
      const h = mount.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      mount.removeEventListener('mousedown', handleMouseDown);
      mount.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      cleanupVisibility();
      disposeThreeScene(scene, renderer);
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleStore = () => {
    if (moveTriggerRef.current) {
      moveTriggerRef.current(selectedSlotId, 'store');
    }
  };

  const handleRetrieve = () => {
    if (moveTriggerRef.current) {
      moveTriggerRef.current(selectedSlotId, 'retrieve');
    }
  };

  const selectedSlot = slotsRef.current.find((s) => s.id === selectedSlotId);

  return (
    <div className="w-full rounded-3xl bg-[#080d1a]/95 border-2 border-cyan-500/40 p-4 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* High-tech corner HUD accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs sm:text-sm font-mono font-extrabold text-cyan-300 uppercase tracking-wider">
            {title}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>WMS 99.5% ACCURACY</span>
        </div>
      </div>

      {/* Main Grid: 3D Canvas + Interactive Command Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* 3D Canvas Container */}
        <div className="lg:col-span-8 relative h-[380px] sm:h-[440px] rounded-2xl bg-[#050914] border border-slate-800/90 overflow-hidden shadow-inner cursor-grab active:cursor-grabbing">
          <div ref={mountRef} className="w-full h-full" />

          {/* Interactive Overlay Helper */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300">
            DRAG TO ROTATE · CLICK PALLETS TO INSPECT
          </div>

          {/* Live Status Ticker */}
          <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center justify-between shadow-lg">
            <span className="truncate">{statusMessage}</span>
            <span className="text-amber-400 shrink-0 font-bold ml-2">
              OCCUPIED: {occupiedCount} / 9
            </span>
          </div>
        </div>

        {/* Right Side: Slot Inspection & Pallet Transfer Controls */}
        <div className="lg:col-span-4 space-y-4 font-mono">
          {/* Selected Bay Detail Card */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-2.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              ACTIVE RACK SELECTION
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-white">{selectedSlotId}</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-md font-bold ${
                  selectedSlot?.occupied
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {selectedSlot?.occupied ? 'SLOT OCCUPIED' : 'BAY VACANT'}
              </span>
            </div>
            <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">TRACKED SKU:</span>
                <span className="text-cyan-300 font-bold">{activeSku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">TIER ELEVATION:</span>
                <span className="text-slate-200">
                  {selectedSlotId.includes('A') ? 'LOWER (Y=1.2m)' : selectedSlotId.includes('B') ? 'MID (Y=6.8m)' : 'HIGH (Y=12.4m)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SLOT UTILIZATION:</span>
                <span className="text-emerald-400 font-bold">{((occupiedCount / 9) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Transfer Action Buttons */}
          <div className="space-y-2">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
              PALLET OPERATIONS
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleStore}
                disabled={isMoving || selectedSlot?.occupied}
                className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:hover:bg-cyan-600 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>STORE PALLET</span>
              </button>
              <button
                type="button"
                onClick={handleRetrieve}
                disabled={isMoving || !selectedSlot?.occupied}
                className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-cyan-300 text-xs font-bold border border-cyan-500/40 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <ArrowUpFromLine className="w-3.5 h-3.5" />
                <span>RETRIEVE</span>
              </button>
            </div>
          </div>

          {/* Bay Selector Grid */}
          <div className="space-y-1.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
              QUICK BAY SELECTOR
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {['BAY-C1', 'BAY-C2', 'BAY-C3', 'BAY-B1', 'BAY-B2', 'BAY-B3', 'BAY-A1', 'BAY-A2', 'BAY-A3'].map((bId) => {
                const s = slotsRef.current.find((slot) => slot.id === bId);
                const isSel = selectedSlotId === bId;
                return (
                  <button
                    key={bId}
                    type="button"
                    onClick={() => {
                      setSelectedSlotId(bId);
                      if (s) setActiveSku(s.sku);
                    }}
                    className={`p-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                      isSel
                        ? 'bg-cyan-500/30 border-cyan-400 text-white shadow-sm'
                        : s?.occupied
                        ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                        : 'bg-slate-950/80 border-dashed border-amber-500/40 text-amber-300 hover:border-amber-400'
                    }`}
                  >
                    {bId.replace('BAY-', '')} {s?.occupied ? '●' : '○'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
