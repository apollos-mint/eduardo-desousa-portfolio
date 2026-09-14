'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  getClampedPixelRatio,
  createFpsThrottler,
  setupVisibilityAndIntersection,
  disposeThreeScene,
} from '@/lib/three-perf';
import {
  MessageSquare,
  CheckCircle2,
  FileText,
  Building2,
  Briefcase,
  Award,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  User,
  ShieldCheck,
} from 'lucide-react';

interface SalesConsultationWidgetProps {
  title?: string;
  lang?: string;
}

interface DialogueTopic {
  id: string;
  title: string;
  clientQuery: string;
  clerkResponse: string;
  specDetail: string;
}

export default function SalesConsultationWidget({
  title = 'E-Ceramic // Commercial & Technical Consultation Hub',
  lang = 'en',
}: SalesConsultationWidgetProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Dialogue & Interactive Topic State
  const topics: DialogueTopic[] = [
    {
      id: 'spec',
      title: 'Technical Spec & Slip Resistance',
      clientQuery: 'We require high-traffic anti-slip tiles (R11 Class C) for a 12,000 m² resort project.',
      clerkResponse: 'Validated ISO 10545 spec: porcelain stoneware, water absorption < 0.1%, certified R11 rating for wet exterior walkways.',
      specDetail: 'ISO 10545-7 PEI V · R11 Slip Rating · Frost Resistant',
    },
    {
      id: 'quote',
      title: 'Direct Factory Quotation Modeling',
      clientQuery: 'What is the unit cost curve for 15 container loads shipped directly from Castellón / Valencia?',
      clerkResponse: 'Modeled tiered pricing: -22% factory disintermediation discount with FOB Valencia terms and verified pallet packing.',
      specDetail: 'FOB Valencia · Tier-3 Volume Discount · 15x 20ft FCL',
    },
    {
      id: 'logistics',
      title: 'Freight & Port Delivery Cadence',
      clientQuery: 'Can you guarantee weekly staggered dispatch to prevent job-site congestion?',
      clerkResponse: 'Yes, scheduled 3 containers per week via intermodal road/sea corridor with end-to-end bill-of-lading tracking.',
      specDetail: 'Staggered Cadence · EDI Advance Shipping Notice (ASN)',
    },
    {
      id: 'terms',
      title: 'B2B Commercial Warranty & Terms',
      clientQuery: 'What escrow or letter-of-credit payment conditions do you provide for large contracts?',
      clerkResponse: 'Standardized 4-gate escrow milestone structure: 20% deposit, 40% QC pass, 40% clean bill-of-lading confirmation.',
      specDetail: '100% Quality Escrow · 10-Year Commercial Warranty',
    },
  ];

  const [activeTopic, setActiveTopic] = useState<DialogueTopic>(topics[0]);

  const zoomInRef = useRef<(() => void) | null>(null);
  const zoomOutRef = useRef<(() => void) | null>(null);
  const resetZoomRef = useRef<(() => void) | null>(null);

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
    scene.fog = new THREE.FogExp2(0x07090e, 0.0028);

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 500);
    // Pulled back default vantage point so the illuminated sign, tile display wall, and both characters are 100% visible
    let targetCameraDist = 48;
    camera.position.set(0, 21, targetCameraDist);

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

    // =========================================================================
    // 1. LIGHTING (Architectural Showroom Warm Key + Cool Cyan Accent)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.8);
    keyLight.position.set(16, 36, 26);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x14b8a6, 1.8);
    cyanRim.position.set(-22, 18, -18);
    scene.add(cyanRim);

    // Sign backlight accent
    const signLight = new THREE.PointLight(0x38bdf8, 2.2, 28);
    signLight.position.set(0, 15, -10);
    scene.add(signLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // =========================================================================
    // 2. SHOWROOM ARCHITECTURE: FLOOR PLATFORM & TILE EXHIBITION WALL
    // =========================================================================
    // Polished Concrete Showroom Floor
    const floorGeo = new THREE.BoxGeometry(46, 0.6, 32);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x091122, roughness: 0.35, metalness: 0.3 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -0.3, 0);
    rootGroup.add(floor);

    // Architectural Ceramic Display Wall (Backdrop)
    const wallGeo = new THREE.BoxGeometry(44, 18, 0.8);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.65, metalness: 0.2 });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 9, -13);
    rootGroup.add(wall);

    // =========================================================================
    // 3. PROMINENT ILLUMINATED SHOWROOM SIGN (CLEARLY VISIBLE, UNOBSTRUCTED!)
    // =========================================================================
    // Sign Backing Panel (Brushed Dark Metal Frame)
    const signBackGeo = new THREE.BoxGeometry(32, 3.2, 0.3);
    const signBackMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
    const signBack = new THREE.Mesh(signBackGeo, signBackMat);
    signBack.position.set(0, 15.2, -12.4);
    rootGroup.add(signBack);

    // Sign Glowing Border Trim
    const signBorderGeo = new THREE.BoxGeometry(32.4, 3.4, 0.1);
    const signBorderMat = new THREE.MeshBasicMaterial({ color: 0x14b8a6 });
    const signBorder = new THREE.Mesh(signBorderGeo, signBorderMat);
    signBorder.position.set(0, 15.2, -12.5);
    rootGroup.add(signBorder);

    // Dynamic High-Res Signboard Canvas Texture
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 1024;
    signCanvas.height = 128;
    const ctx = signCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#091122';
      ctx.fillRect(0, 0, 1024, 128);

      // Top Title
      ctx.font = 'bold 44px monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('E-CERAMIC ARCHITECTURAL SURFACES', 512, 45);

      // Subtitle
      ctx.font = 'bold 22px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('VALENCIA · CASTELLÓN // B2B DIRECT FACTORY CONSULTATION HUB', 512, 90);
    }
    const signTexture = new THREE.CanvasTexture(signCanvas);
    signTexture.minFilter = THREE.LinearFilter;
    const signFrontMat = new THREE.MeshBasicMaterial({ map: signTexture });
    const signFront = new THREE.Mesh(new THREE.BoxGeometry(31.6, 2.8, 0.05), signFrontMat);
    signFront.position.set(0, 15.2, -12.2);
    rootGroup.add(signFront);

    // 8 Precision Architectural Ceramic Tile Samples Mounted on Display Standoffs
    const tilePalettes = [
      { name: 'Calacatta White', color: 0xf8fafc, roughness: 0.15, metalness: 0.1 },
      { name: 'Anthracite R11', color: 0x1e293b, roughness: 0.85, metalness: 0.2 },
      { name: 'Mediterranean Teal', color: 0x0f766e, roughness: 0.25, metalness: 0.3 },
      { name: 'Terracotta Rust', color: 0xb45309, roughness: 0.65, metalness: 0.1 },
      { name: 'Statuario Marble', color: 0xe2e8f0, roughness: 0.2, metalness: 0.1 },
      { name: 'Deep Azure Gloss', color: 0x0369a1, roughness: 0.1, metalness: 0.4 },
      { name: 'Basalt Charcoal', color: 0x334155, roughness: 0.7, metalness: 0.2 },
      { name: 'Sandstone Ivory', color: 0xd97706, roughness: 0.5, metalness: 0.1 },
    ];

    const tileGeo = new THREE.BoxGeometry(3.6, 4.4, 0.25);
    const standoffMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });

    tilePalettes.forEach((tp, idx) => {
      const colIdx = idx % 4;
      const rowIdx = Math.floor(idx / 4);
      const tx = -13.5 + colIdx * 9.0;
      const ty = 9.8 - rowIdx * 5.4;

      // Tile Mesh
      const tMesh = new THREE.Mesh(
        tileGeo,
        new THREE.MeshStandardMaterial({
          color: tp.color,
          roughness: tp.roughness,
          metalness: tp.metalness,
        })
      );
      tMesh.position.set(tx, ty, -12.2);
      rootGroup.add(tMesh);

      // Standoff Pins on 4 Corners
      const pinOffsets = [
        [-1.6, -2.0],
        [1.6, -2.0],
        [-1.6, 2.0],
        [1.6, 2.0],
      ];
      pinOffsets.forEach(([px, py]) => {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.4, 12).rotateX(Math.PI / 2), standoffMat);
        pin.position.set(tx + px, ty + py, -12.0);
        rootGroup.add(pin);
      });
    });

    // =========================================================================
    // 4. MODERN ARCHITECTURAL CONSULTATION DESK (CENTER)
    // =========================================================================
    // Slab Tabletop in Porcelain Stoneware Finish
    const deskTopGeo = new THREE.BoxGeometry(22, 0.6, 9.5);
    const deskTopMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3, metalness: 0.4 });
    const deskTop = new THREE.Mesh(deskTopGeo, deskTopMat);
    deskTop.position.set(0, 6.8, 0);
    rootGroup.add(deskTop);

    // Architectural Steel Trestle Legs
    const legGeo = new THREE.BoxGeometry(0.6, 6.8, 7.5);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.95, roughness: 0.2 });
    const legL = new THREE.Mesh(legGeo, legMat);
    legL.position.set(-9.5, 3.4, 0);
    const legR = new THREE.Mesh(legGeo, legMat);
    legR.position.set(9.5, 3.4, 0);
    rootGroup.add(legL);
    rootGroup.add(legR);

    // Objects on Desk:
    // Open Executive Laptop
    const laptopBase = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.12, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85 })
    );
    laptopBase.position.set(2.0, 7.15, -0.8);
    const laptopScreen = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 2.0, 0.12),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 }) // Glowing screen
    );
    laptopScreen.position.set(2.0, 8.15, -1.8);
    laptopScreen.rotation.x = 0.15;
    rootGroup.add(laptopBase);
    rootGroup.add(laptopScreen);

    // Architectural Sample Tile Swatches on Desk
    const swatch1 = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.15, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.2 })
    );
    swatch1.position.set(-3.5, 7.15, 0.8);
    rootGroup.add(swatch1);

    const swatch2 = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.15, 2.2),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 })
    );
    swatch2.position.set(-0.8, 7.15, 0.5);
    rootGroup.add(swatch2);

    // Project Specification Binder Folder
    const binder = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.2, 3.4),
      new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.5 })
    );
    binder.position.set(-6.5, 7.15, -0.4);
    binder.rotation.y = 0.12;
    rootGroup.add(binder);

    // =========================================================================
    // 5. SEATED HUMAN CHARACTERS & ERGONOMIC EXECUTIVE CHAIRS
    // =========================================================================
    // Helper to build an ergonomic executive swivel office chair
    const createExecutiveChair = (x: number, z: number, rotY: number) => {
      const chair = new THREE.Group();
      chair.position.set(x, 0, z);
      chair.rotation.y = rotY;

      // Chrome 5-star base & casters
      const baseHub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95 })
      );
      baseHub.position.y = 0.4;
      chair.add(baseHub);

      // Caster legs
      for (let c = 0; c < 5; c++) {
        const cAngle = (c / 5) * Math.PI * 2;
        const cLeg = new THREE.Mesh(
          new THREE.BoxGeometry(0.3, 0.2, 2.2),
          new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 })
        );
        cLeg.position.set(Math.sin(cAngle) * 1.1, 0.3, Math.cos(cAngle) * 1.1);
        cLeg.rotation.y = cAngle;
        chair.add(cLeg);
      }

      // Chrome gas lift cylinder
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 3.4, 16),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95 })
      );
      pole.position.y = 2.1;
      chair.add(pole);

      // Leather executive seat cushion
      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(3.6, 0.6, 3.6),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 })
      );
      seat.position.y = 4.0;
      chair.add(seat);

      // Contoured ergonomic backrest
      const backrest = new THREE.Mesh(
        new THREE.BoxGeometry(3.4, 4.4, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
      );
      backrest.position.set(0, 6.4, -1.6);
      chair.add(backrest);

      // Chrome armrests
      for (let s = -1; s <= 1; s += 2) {
        const arm = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.2, 2.4),
          new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 })
        );
        arm.position.set(s * 1.9, 5.2, 0);
        chair.add(arm);
      }

      return chair;
    };

    // Chair for Eduardo (behind desk, facing client)
    const chairEduardo = createExecutiveChair(2.0, -4.6, 0);
    rootGroup.add(chairEduardo);

    // Chair for Client (in front of desk, facing Eduardo)
    const chairClient = createExecutiveChair(-2.5, 4.6, Math.PI);
    rootGroup.add(chairClient);

    // Suit & Skin Materials
    const eduardoSuitMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 }); // Navy suit
    const clientSuitMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.75 }); // Slate charcoal
    const shirtWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
    const tieMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 }); // Silk cyan/blue tie
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfbcfe8, roughness: 0.5 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.3 });

    // SEATED CHARACTER: EDUARDO (Behind desk, Z = -4.2)
    const eduardoGroup = new THREE.Group();
    eduardoGroup.position.set(2.0, 0, -4.2);
    rootGroup.add(eduardoGroup);

    // Seated Legs (thighs forward to desk + calves down to floor shoes)
    const eShoeL = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 1.8), shoeMat);
    eShoeL.position.set(-0.65, 0.25, 1.8);
    eduardoGroup.add(eShoeL);
    const eShoeR = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 1.8), shoeMat);
    eShoeR.position.set(0.65, 0.25, 1.8);
    eduardoGroup.add(eShoeR);

    // Seated Thighs (horizontal forward from chair seat to desk)
    const eThighL = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.9, 2.8), eduardoSuitMat);
    eThighL.position.set(-0.65, 4.2, 1.2);
    eduardoGroup.add(eThighL);
    const eThighR = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.9, 2.8), eduardoSuitMat);
    eThighR.position.set(0.65, 4.2, 1.2);
    eduardoGroup.add(eThighR);

    // Torso (Upright on chair)
    const eTorso = new THREE.Mesh(new THREE.BoxGeometry(3.0, 4.4, 2.0), eduardoSuitMat);
    eTorso.position.set(0, 6.8, 0);
    eduardoGroup.add(eTorso);

    // Shirt & Tie
    const eShirt = new THREE.Mesh(new THREE.BoxGeometry(1.0, 3.2, 0.1), shirtWhiteMat);
    eShirt.position.set(0, 7.2, 1.05);
    eduardoGroup.add(eShirt);

    const eTie = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.4, 0.12), tieMat);
    eTie.position.set(0, 6.9, 1.1);
    eduardoGroup.add(eTie);

    // Neck & Head
    const eNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.8, 16), skinMat);
    eNeck.position.set(0, 9.4, 0);
    eduardoGroup.add(eNeck);

    const eHead = new THREE.Mesh(new THREE.SphereGeometry(1.2, 20, 20), skinMat);
    eHead.position.set(0, 10.6, 0);
    eduardoGroup.add(eHead);

    // Sculpted Hair
    const eHair = new THREE.Mesh(
      new THREE.SphereGeometry(1.25, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7),
      hairMat
    );
    eHair.position.set(0, 10.8, -0.1);
    eduardoGroup.add(eHair);

    // Trimmed Beard
    const eBeard = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.7, 0.7), hairMat);
    eBeard.position.set(0, 10.1, 0.65);
    eduardoGroup.add(eBeard);

    // Arms resting naturally forward toward laptop and samples on desk
    const eArmL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 3.2), eduardoSuitMat);
    eArmL.position.set(-1.8, 7.0, 1.4);
    eduardoGroup.add(eArmL);

    const eArmR = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 3.2), eduardoSuitMat);
    eArmR.position.set(1.8, 7.0, 1.4);
    eduardoGroup.add(eArmR);

    // Hands
    const eHandL = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 10), skinMat);
    eHandL.position.set(-1.8, 7.0, 3.0);
    eduardoGroup.add(eHandL);

    const eHandR = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 10), skinMat);
    eHandR.position.set(1.8, 7.0, 3.0);
    eduardoGroup.add(eHandR);

    // SEATED CHARACTER: PROSPECTIVE CLIENT (In front of desk, Z = 4.2, facing Eduardo)
    const clientGroup = new THREE.Group();
    clientGroup.position.set(-2.5, 0, 4.2);
    clientGroup.rotation.y = Math.PI;
    rootGroup.add(clientGroup);

    // Seated Thighs
    const cThighL = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.9, 2.8), clientSuitMat);
    cThighL.position.set(-0.65, 4.2, 1.2);
    clientGroup.add(cThighL);
    const cThighR = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.9, 2.8), clientSuitMat);
    cThighR.position.set(0.65, 4.2, 1.2);
    clientGroup.add(cThighR);

    // Torso
    const cTorso = new THREE.Mesh(new THREE.BoxGeometry(3.0, 4.4, 2.0), clientSuitMat);
    cTorso.position.set(0, 6.8, 0);
    clientGroup.add(cTorso);

    // Head
    const cHead = new THREE.Mesh(new THREE.SphereGeometry(1.2, 20, 20), skinMat);
    cHead.position.set(0, 10.6, 0);
    clientGroup.add(cHead);

    const cHair = new THREE.Mesh(
      new THREE.SphereGeometry(1.25, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7),
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 })
    );
    cHair.position.set(0, 10.8, -0.1);
    clientGroup.add(cHair);

    // Arms resting on desk
    const cArmL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 3.2), clientSuitMat);
    cArmL.position.set(-1.8, 7.0, 1.4);
    clientGroup.add(cArmL);

    const cArmR = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 3.2), clientSuitMat);
    cArmR.position.set(1.8, 7.0, 1.4);
    clientGroup.add(cArmR);

    // =========================================================================
    // 6. ZOOM & INTERACTIVE CONTROLS
    // =========================================================================
    const handleZoom = (delta: number) => {
      targetCameraDist = Math.max(26, Math.min(68, targetCameraDist + delta));
    };

    zoomInRef.current = () => handleZoom(-7);
    zoomOutRef.current = () => handleZoom(7);
    resetZoomRef.current = () => {
      targetCameraDist = 48;
      targetRotY = 0;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleZoom(e.deltaY * 0.035);
    };

    mount.addEventListener('wheel', handleWheel, { passive: false });

    // Mouse Drag Turntable Rotation
    let isDragging = false;
    let prevX = 0;
    let targetRotY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevX;
        targetRotY += dx * 0.01;
        prevX = e.clientX;
      }
    };
    const handleMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

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

      // Smooth Camera Zoom Interpolation
      camera.position.z += (targetCameraDist - camera.position.z) * 0.08;
      camera.position.y += ((targetCameraDist * 0.44) - camera.position.y) * 0.08;
      camera.lookAt(0, 7.5, 0);

      // Smooth damped rotation to mouse drag (no continuous auto-spinning)
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;

      // Subtle natural breathing gestures for both characters
      eHead.position.y = 10.6 + Math.sin(elapsed * 2.2) * 0.07;
      cHead.position.y = 10.6 + Math.cos(elapsed * 2.2) * 0.07;

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
      mount.removeEventListener('wheel', handleWheel);
      mount.removeEventListener('mousedown', handleMouseDown);
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

  return (
    <div className="w-full rounded-3xl bg-slate-900 border-2 border-teal-500/40 p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      {/* Corner HUD accents */}
      <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-teal-400 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-teal-400 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-teal-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-mono font-extrabold text-teal-300 uppercase tracking-wider">
            {title}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/50 shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>100% TECHNICAL ISSUE RESOLUTION</span>
        </div>
      </div>

      {/* Main Grid: 3D Showroom + Interactive Consultation Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* 3D Canvas (Clean, completely unobstructed sightlines to illuminated sign and both characters) */}
        <div className="lg:col-span-8 relative h-[380px] sm:h-[430px] rounded-2xl bg-[#050914] border border-slate-800 overflow-hidden shadow-inner cursor-grab active:cursor-grabbing">
          <div ref={mountRef} className="w-full h-full" />

          {/* Interactive Helper Overlay (Top-Left) */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 shadow-md">
            DRAG TO ROTATE · SCROLL TO ZOOM · CLIENT (FRONT) & EDUARDO (DESK)
          </div>

          {/* On-Screen HUD Zoom Controls (Top-Right) */}
          <div className="absolute top-3 right-3 z-20 flex items-center space-x-1.5 bg-slate-950/90 p-1 rounded-xl border border-slate-800 shadow-lg">
            <button
              type="button"
              onClick={() => zoomInRef.current?.()}
              title="Zoom In"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs cursor-pointer transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => zoomOutRef.current?.()}
              title="Zoom Out"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs cursor-pointer transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => resetZoomRef.current?.()}
              title="Reset View"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Live Spec Indicator Bar (Slim, docked at bottom edge - 100% unobstructed character & showroom view) */}
          <div className="absolute bottom-2.5 left-3 right-3 z-10 pointer-events-none bg-slate-950/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-teal-500/30 text-[10px] font-mono text-teal-300 flex items-center justify-between shadow-lg">
            <span className="truncate">{activeTopic.specDetail}</span>
            <span className="text-emerald-400 shrink-0 font-bold ml-2">VERIFIED COMPLIANCE</span>
          </div>
        </div>

        {/* Right Side: Consultation Hub & Live Dialogue Cards */}
        <div className="lg:col-span-4 space-y-3 font-mono">
          {/* Topic Selector */}
          <div className="space-y-1.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              SELECT CONSULTATION TOPIC
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {topics.map((t) => {
                const isActive = activeTopic.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTopic(t)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-teal-950 border-teal-400 text-white shadow-md shadow-teal-500/20 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{t.title}</span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 ml-1.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Consultation Transcript Console */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-teal-500/30 space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3 text-teal-400" />
                <span>ACTIVE DIALOGUE TRANSCRIPT</span>
              </span>
              <span className="text-[10px] text-teal-400 font-bold bg-teal-950 px-2 py-0.5 rounded-md border border-teal-500/30">
                LIVE CASE
              </span>
            </div>

            {/* Client Query Card */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-sky-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-sky-400 uppercase">
                <User className="w-3 h-3" />
                <span>B2B Client Query</span>
              </div>
              <p className="text-slate-200 font-sans text-xs leading-relaxed">
                &ldquo;{activeTopic.clientQuery}&rdquo;
              </p>
            </div>

            {/* Eduardo Solution Card */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-teal-500/40 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-teal-300 uppercase">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Eduardo // Technical Resolution</span>
              </div>
              <p className="text-slate-100 font-sans text-xs leading-relaxed">
                &ldquo;{activeTopic.clerkResponse}&rdquo;
              </p>
            </div>
          </div>

          {/* Commercial Track Record Metrics Card */}
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">EXPERIENCE:</span>
              <span className="text-teal-300 font-bold">5 YEARS B2B SPECIALIST</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">DISPUTE RESOLUTION:</span>
              <span className="text-emerald-400 font-bold">100% RESOLVED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">QUOTATION CADENCE:</span>
              <span className="text-white font-bold">&lt; 24H SLA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
