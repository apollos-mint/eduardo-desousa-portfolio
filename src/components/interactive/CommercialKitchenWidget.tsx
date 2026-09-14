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
  Flame,
  CheckCircle2,
  Utensils,
  Users,
  Sparkles,
  Thermometer,
  Clock,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';

interface CommercialKitchenWidgetProps {
  title?: string;
  lang?: string;
}

export default function CommercialKitchenWidget({
  title = "Ed's Paixao Pela Comida // Shift Operations & Culinary Quality",
  lang = 'en',
}: CommercialKitchenWidgetProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Interactive Kitchen Telemetry State
  const [flameLevel, setFlameLevel] = useState<'low' | 'med' | 'high' | 'flambe'>('med');
  const [haccpTemp, setHaccpTemp] = useState(74.2);
  const [shiftPace, setShiftPace] = useState('PEAK DINNER CADENCE (180 COVERS)');
  const [isSizzling, setIsSizzling] = useState(false);
  const [orderQueue, setOrderQueue] = useState(8);

  const flameIntensityRef = useRef(1.0);
  const triggerSizzleRef = useRef<(() => void) | null>(null);
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
    scene.fog = new THREE.FogExp2(0x07090e, 0.0025);

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 500);
    // Pulled back default vantage point so the entire line, both chefs, and all equipment are fully appreciated
    let targetCameraDist = 54;
    camera.position.set(0, 22, targetCameraDist);

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
    // 1. LIGHTING (Commercial Kitchen Ambient + Focused Warm Station Glows)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xfff6ea, 2.8);
    mainKeyLight.position.set(16, 38, 28);
    scene.add(mainKeyLight);

    const softFillLight = new THREE.DirectionalLight(0x38bdf8, 1.3);
    softFillLight.position.set(-24, 22, -10);
    scene.add(softFillLight);

    // Range Burner Flame Dynamic Light
    const flameLight = new THREE.PointLight(0xf97316, 3.8, 24);
    flameLight.position.set(0, 8.5, 0);
    scene.add(flameLight);

    // Pass Station Heat Lamp Warm Light
    const heatLampLight = new THREE.PointLight(0xf59e0b, 2.8, 20);
    heatLampLight.position.set(14, 13, 0);
    scene.add(heatLampLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // =========================================================================
    // 2. KITCHEN PLATFORM & STAINLESS BACKSPLASH
    // =========================================================================
    // Quarry Tile Kitchen Floor
    const floorGeo = new THREE.BoxGeometry(48, 0.6, 34);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0c1324, roughness: 0.45, metalness: 0.3 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -0.3, 0);
    rootGroup.add(floor);

    // Stainless Steel Backsplash Wall
    const backGeo = new THREE.BoxGeometry(48, 18, 0.8);
    const ssMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.22 });
    const backWall = new THREE.Mesh(backGeo, ssMat);
    backWall.position.set(0, 9, -15);
    rootGroup.add(backWall);

    // Overhead Stainless Steel Ventilation Canopy
    const hoodGeo = new THREE.BoxGeometry(44, 3.2, 8.5);
    const hoodMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, roughness: 0.28 });
    const hood = new THREE.Mesh(hoodGeo, hoodMat);
    hood.position.set(0, 17.5, -9.5);
    rootGroup.add(hood);

    // =========================================================================
    // 3. HEAVY-DUTY COMMERCIAL RANGE COOKTOP (CENTER ISLAND)
    // =========================================================================
    const stoveGeo = new THREE.BoxGeometry(16, 7.2, 12);
    const stoveMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.25 });
    const stove = new THREE.Mesh(stoveGeo, stoveMat);
    stove.position.set(0, 3.6, 0);
    rootGroup.add(stove);

    // Cast Iron Heavy Burner Grate
    const grateMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7, metalness: 0.5 });
    const grateGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.3, 24);
    const grate = new THREE.Mesh(grateGeo, grateMat);
    grate.position.set(0, 7.35, 0);
    rootGroup.add(grate);

    // Solid Brass Burner Knobs on Stove Front
    const knobMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
    for (let k = -5; k <= 5; k += 2.5) {
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16).rotateX(Math.PI / 2), knobMat);
      knob.position.set(k, 6.0, 6.1);
      rootGroup.add(knob);
    }

    // Dynamic Gas Burner Flames
    const flameCount = 18;
    const flameGeo = new THREE.ConeGeometry(0.35, 1.4, 8);
    flameGeo.rotateX(Math.PI);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 }); // Inner blue flame
    const flameOuterMat = new THREE.MeshBasicMaterial({ color: 0xf97316 }); // Outer orange flame

    const flameMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < flameCount; i++) {
      const angle = (i / flameCount) * Math.PI * 2;
      const fMesh = new THREE.Mesh(flameGeo, i % 2 === 0 ? flameOuterMat : flameMat);
      fMesh.position.set(Math.cos(angle) * 2.6, 8.1, Math.sin(angle) * 2.6);
      rootGroup.add(fMesh);
      flameMeshes.push(fMesh);
    }

    // Commercial Chef Cooking Pan (Skillet / Sauté Pan)
    const panGroup = new THREE.Group();
    panGroup.position.set(0, 7.9, 0);
    rootGroup.add(panGroup);

    const panBodyGeo = new THREE.CylinderGeometry(3.8, 3.4, 1.2, 32);
    const panMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.96, roughness: 0.12 });
    const panBody = new THREE.Mesh(panBodyGeo, panMat);
    panGroup.add(panBody);

    // Pan Long Handle
    const handleGeo = new THREE.BoxGeometry(0.5, 0.4, 6.5);
    const handle = new THREE.Mesh(handleGeo, panMat);
    handle.position.set(0, 0.4, 5.8);
    panGroup.add(handle);

    // Searing Food Cuts Inside Pan
    const steakMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.65 });
    const s1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 2.2), steakMat);
    s1.position.set(-0.8, 0.4, -0.4);
    panGroup.add(s1);
    const s2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 2.2), steakMat);
    s2.position.set(0.8, 0.4, 0.4);
    panGroup.add(s2);

    // Steam & Sizzle Particles System
    const steamCount = 65;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 4.0;
      steamPositions[i * 3 + 1] = 8.5 + Math.random() * 8.5;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 1.8,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    rootGroup.add(steamParticles);

    // =========================================================================
    // 4. DETAILED HUMAN CHEF CHARACTERS (FULL LEGS, SHOES, APRON, FACES & GEAR)
    // =========================================================================
    const chefUniformMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 }); // Black chef trousers
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.35 }); // Non-slip chef clogs
    const apronMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xedc4a8, roughness: 0.55 }); // Warm natural skin tone
    const hatMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 });
    const buttonMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3 });

    const createChef = (name: string, isEduardo = false) => {
      const chef = new THREE.Group();

      // 1. FEET: Black Non-Slip Professional Kitchen Clogs resting squarely on floor (Y = 0)
      const shoeGeo = new THREE.BoxGeometry(1.0, 0.65, 2.0);
      const shoeL = new THREE.Mesh(shoeGeo, shoeMat);
      shoeL.position.set(-0.7, 0.32, 0.2);
      chef.add(shoeL);

      const shoeR = new THREE.Mesh(shoeGeo, shoeMat);
      shoeR.position.set(0.7, 0.32, 0.2);
      chef.add(shoeR);

      // 2. LEGS: Two Full Chef Trousers (standing firmly on floor!)
      const legGeo = new THREE.BoxGeometry(1.05, 4.8, 1.15);
      const legL = new THREE.Mesh(legGeo, pantsMat);
      legL.position.set(-0.7, 2.9, 0);
      chef.add(legL);

      const legR = new THREE.Mesh(legGeo, pantsMat);
      legR.position.set(0.7, 2.9, 0);
      chef.add(legR);

      // Pelvis / Waist Belt
      const waist = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.6, 1.5), pantsMat);
      waist.position.set(0, 5.4, 0);
      chef.add(waist);

      // 3. TORSO: Double-Breasted Executive Chef Jacket
      const body = new THREE.Mesh(new THREE.BoxGeometry(3.0, 5.0, 2.0), chefUniformMat);
      body.position.set(0, 8.2, 0);
      chef.add(body);

      // Double-breasted button studs (2 columns of 4 buttons on jacket chest)
      for (let bi = 0; bi < 4; bi++) {
        const by = 6.6 + bi * 0.9;
        const bL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), buttonMat);
        bL.position.set(-0.55, by, 1.05);
        chef.add(bL);

        const bR = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), buttonMat);
        bR.position.set(0.55, by, 1.05);
        chef.add(bR);
      }

      // 4. PROFESSIONAL BISTRO APRON (Bib + Long Lower Skirt covering thighs + tie knot)
      const apronBib = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.8, 0.1), apronMat);
      apronBib.position.set(0, 7.8, 1.05);
      chef.add(apronBib);

      const apronSkirt = new THREE.Mesh(new THREE.BoxGeometry(2.7, 3.4, 0.1), apronMat);
      apronSkirt.position.set(0, 4.6, 0.85);
      chef.add(apronSkirt);

      // Utility front pocket on apron
      const apronPocket = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.4, 0.08), pantsMat);
      apronPocket.position.set(0, 5.0, 0.92);
      chef.add(apronPocket);

      // Neckerchief / Cravat Collar
      const neckCol = isEduardo ? 0x0369a1 : 0xdc2626; // Navy for Shift Lead Eduardo, Crimson for Line Cook
      const cravat = new THREE.Mesh(
        new THREE.TorusGeometry(0.8, 0.22, 8, 16),
        new THREE.MeshStandardMaterial({ color: neckCol, roughness: 0.6 })
      );
      cravat.rotation.x = Math.PI / 2;
      cravat.position.set(0, 10.6, 0.25);
      chef.add(cravat);

      // 5. NECK & HEAD
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.8, 16), skinMat);
      neck.position.set(0, 10.9, 0);
      chef.add(neck);

      const head = new THREE.Mesh(new THREE.SphereGeometry(1.2, 20, 20), skinMat);
      head.position.set(0, 12.1, 0);
      chef.add(head);

      // Sculpted Hair
      const hairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
      const hair = new THREE.Mesh(
        new THREE.SphereGeometry(1.25, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.65),
        hairMat
      );
      hair.position.set(0, 12.2, -0.1);
      chef.add(hair);

      if (isEduardo) {
        // Eduardo: Neat Trimmed Stubble/Beard
        const beard = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.7, 0.7), hairMat);
        beard.position.set(0, 11.5, 0.65);
        chef.add(beard);

        // Golden/Cyan Shift Supervisor Badge Pin on Left Lapel
        const badge = new THREE.Mesh(
          new THREE.BoxGeometry(0.7, 0.35, 0.06),
          new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 })
        );
        badge.position.set(0.85, 9.4, 1.05);
        chef.add(badge);
      }

      // 6. AUTHENTIC PLEATED CHEF TOQUE (HAT)
      const toqueBand = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.5, 24), hatMat);
      toqueBand.position.set(0, 13.2, 0);
      chef.add(toqueBand);

      const toqueCrown = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.25, 2.2, 24), hatMat);
      toqueCrown.position.set(0, 14.5, 0);
      chef.add(toqueCrown);

      const toqueDome = new THREE.Mesh(
        new THREE.SphereGeometry(1.65, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.5),
        hatMat
      );
      toqueDome.position.set(0, 15.6, 0);
      chef.add(toqueDome);

      // 7. ARMS & HANDS HOLDING CULINARY TOOLS
      const armGeo = new THREE.BoxGeometry(0.8, 3.8, 0.8);
      const armL = new THREE.Mesh(armGeo, chefUniformMat);
      armL.position.set(-1.9, 8.4, 0.3);
      chef.add(armL);

      const armR = new THREE.Mesh(armGeo, chefUniformMat);
      armR.position.set(1.9, 8.4, 0.3);
      chef.add(armR);

      // Skin Tone Hands
      const handL = new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 10), skinMat);
      handL.position.set(-1.9, 6.3, 0.4);
      chef.add(handL);

      const handR = new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 10), skinMat);
      handR.position.set(1.9, 6.3, 0.4);
      chef.add(handR);

      if (!isEduardo) {
        // Line Cook Holding Stainless Steel Chef Knife
        const knifeBlade = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 1.4, 0.4),
          new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.15 })
        );
        knifeBlade.position.set(-1.9, 5.5, 0.6);
        chef.add(knifeBlade);
      } else {
        // Eduardo Holding Expediting Order Clipboard
        const clipboard = new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 1.8, 0.1),
          new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 })
        );
        clipboard.position.set(1.9, 6.8, 0.8);
        clipboard.rotation.x = -0.3;
        chef.add(clipboard);

        // White paper order ticket on clipboard
        const ticketPaper = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 1.4, 0.02),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        ticketPaper.position.set(1.9, 6.82, 0.86);
        ticketPaper.rotation.x = -0.3;
        chef.add(ticketPaper);
      }

      return { chef, armL, armR, handL, handR };
    };

    // =========================================================================
    // 5. STAINLESS STEEL WORKBENCH STATIONS (AUTHENTIC NSF-GRADE WITH LEGS)
    // =========================================================================
    const createWorkTable = (x: number, z: number) => {
      const tableGroup = new THREE.Group();
      tableGroup.position.set(x, 0, z);

      // Polished Tabletop with rolled bullnose edges
      const topMesh = new THREE.Mesh(
        new THREE.BoxGeometry(8.5, 0.35, 5.5),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 })
      );
      topMesh.position.set(0, 7.2, 0);
      tableGroup.add(topMesh);

      // Lower Wire/Sheet Undershelf
      const underShelf = new THREE.Mesh(
        new THREE.BoxGeometry(8.0, 0.15, 5.0),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, roughness: 0.3 })
      );
      underShelf.position.set(0, 1.8, 0);
      tableGroup.add(underShelf);

      // 4 Tubular Stainless Steel Legs with adjustable bullet feet
      const legGeo = new THREE.CylinderGeometry(0.18, 0.18, 7.0, 16);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.25 });
      const offsets = [
        [-3.9, -2.4],
        [3.9, -2.4],
        [-3.9, 2.4],
        [3.9, 2.4],
      ];
      offsets.forEach(([lx, lz]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(lx, 3.5, lz);
        tableGroup.add(leg);

        // Bullet foot
        const foot = new THREE.Mesh(
          new THREE.CylinderGeometry(0.24, 0.2, 0.4, 16),
          new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 })
        );
        foot.position.set(lx, 0.2, lz);
        tableGroup.add(foot);
      });

      return tableGroup;
    };

    // PREP STATION TABLE (Left, situated at X = -14.5, Z = 0)
    const prepTable = createWorkTable(-14.5, 0);
    rootGroup.add(prepTable);

    // Items on Prep Table
    const cuttingBoard = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 0.25, 2.6),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 })
    );
    cuttingBoard.position.set(-14.5, 7.45, 0);
    rootGroup.add(cuttingBoard);

    // Sliced Red Tomatoes & Green Herbs on Board
    const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
    for (let t = 0; t < 3; t++) {
      const tom = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.15, 12), tomatoMat);
      tom.position.set(-15.1 + t * 0.6, 7.65, -0.2);
      rootGroup.add(tom);
    }
    const herbMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.7 });
    const herb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3, 0), herbMat);
    herb.position.set(-13.9, 7.65, 0.4);
    rootGroup.add(herb);

    // Stainless Steel 1/6 Gastronorm Food Inserts
    const gnGeo = new THREE.BoxGeometry(1.6, 0.8, 2.2);
    const gnMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, roughness: 0.25 });
    for (let g = 0; g < 2; g++) {
      const gn = new THREE.Mesh(gnGeo, gnMat);
      gn.position.set(-17.0 + g * 1.8, 7.7, -1.2);
      rootGroup.add(gn);
    }

    // EXPEDITING PASS STATION TABLE (Right, situated at X = 14.5, Z = 0)
    const passTable = createWorkTable(14.5, 0);
    rootGroup.add(passTable);

    // Plated Gourmet Dish & Showcased Floating 3D Burger
    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 1.8, 0.25, 32),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
    );
    plate.position.set(14.5, 7.45, -0.2);
    rootGroup.add(plate);

    // Floating Gourmet Burger Model
    const burgerGroup = new THREE.Group();
    burgerGroup.position.set(14.5, 9.4, -0.2);
    rootGroup.add(burgerGroup);

    // Bottom brioche bun
    const bunBottom = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.15, 0.45, 24),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.55 })
    );
    bunBottom.position.y = 0.22;
    burgerGroup.add(bunBottom);

    // Grilled beef patty
    const beefPatty = new THREE.Mesh(
      new THREE.CylinderGeometry(1.35, 1.35, 0.35, 24),
      new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85 })
    );
    beefPatty.position.y = 0.62;
    burgerGroup.add(beefPatty);

    // Melted cheddar cheese slice
    const cheese = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 0.08, 1.7),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.35 })
    );
    cheese.rotation.y = Math.PI / 4;
    cheese.position.y = 0.84;
    burgerGroup.add(cheese);

    // Crisp garden lettuce
    const lettuce = new THREE.Mesh(
      new THREE.DodecahedronGeometry(1.4, 1),
      new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.7 })
    );
    lettuce.scale.set(1.05, 0.12, 1.05);
    lettuce.position.y = 0.94;
    burgerGroup.add(lettuce);

    // Sliced tomatoes
    const tomMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.35 });
    const tom1 = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.1, 16), tomMat);
    tom1.position.set(-0.45, 1.05, -0.2);
    burgerGroup.add(tom1);
    const tom2 = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.1, 16), tomMat);
    tom2.position.set(0.45, 1.05, 0.2);
    burgerGroup.add(tom2);

    // Top toasted brioche bun dome
    const bunTop = new THREE.Mesh(
      new THREE.SphereGeometry(1.35, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.55 })
    );
    bunTop.position.y = 1.1;
    burgerGroup.add(bunTop);

    // Sesame seeds on top bun
    const sesameMat = new THREE.MeshStandardMaterial({ color: 0xfffbeb, roughness: 0.5 });
    const sesameGeo = new THREE.SphereGeometry(0.05, 6, 6);
    sesameGeo.scale(1, 0.5, 2);
    for (let s = 0; s < 22; s++) {
      const theta = (s / 22) * Math.PI * 2 + (s * 0.3);
      const r = 0.3 + (s % 3) * 0.35;
      const seed = new THREE.Mesh(sesameGeo, sesameMat);
      const sy = Math.sqrt(Math.max(0, 1.35 * 1.35 - r * r));
      seed.position.set(Math.cos(theta) * r, 1.1 + sy * 0.98, Math.sin(theta) * r);
      seed.rotation.y = theta;
      burgerGroup.add(seed);
    }

    // Overhead Stainless Gantry with Warm Heat Lamps
    const gantryLegMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.25 });
    const gantryGeo = new THREE.BoxGeometry(8.5, 0.3, 0.3);
    const gantry = new THREE.Mesh(gantryGeo, gantryLegMat);
    gantry.position.set(14.5, 13.5, 0);
    rootGroup.add(gantry);

    const gantryPostL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 6.0, 12), gantryLegMat);
    gantryPostL.position.set(10.5, 10.5, 0);
    rootGroup.add(gantryPostL);

    const gantryPostR = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 6.0, 12), gantryLegMat);
    gantryPostR.position.set(18.5, 10.5, 0);
    rootGroup.add(gantryPostR);

    // Two Brass Conical Heat Lamps
    for (let h = -1.8; h <= 1.8; h += 3.6) {
      const lampCone = new THREE.Mesh(
        new THREE.ConeGeometry(1.2, 1.4, 16),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 })
      );
      lampCone.position.set(14.5 + h, 12.8, 0);
      rootGroup.add(lampCone);
    }

    // Ticket Rail with White Service Slips
    for (let ti = 0; ti < 3; ti++) {
      const slip = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 1.1, 0.02),
        new THREE.MeshBasicMaterial({ color: 0xf8fafc })
      );
      slip.position.set(12.7 + ti * 1.6, 12.8, 0.2);
      rootGroup.add(slip);
    }

    // =========================================================================
    // 6. POSITION CHEF CHARACTERS (PROMINENT FULL VISIBILITY WITH LEGS & SHOES)
    // =========================================================================
    // Line Cook: positioned at X = -10.5, Z = 2.4, angled facing table and stove.
    // Full body, trousers, non-slip clogs, and apron are completely visible with zero obstruction!
    const prepChef = createChef('Prep Station Cook', false);
    prepChef.chef.position.set(-10.5, 0, 2.4);
    prepChef.chef.rotation.y = -0.45;
    rootGroup.add(prepChef.chef);

    // Shift Supervisor Eduardo: positioned at X = 10.5, Z = 2.4, angled facing line and pass.
    // Full executive posture, legs, shoes, apron, coat, cravat, badge, glasses, and beard 100% visible!
    const leadChef = createChef('Shift Supervisor Eduardo', true);
    leadChef.chef.position.set(10.5, 0, 2.4);
    leadChef.chef.rotation.y = 0.45;
    rootGroup.add(leadChef.chef);

    // =========================================================================
    // 7. ZOOM & INTERACTIVE CONTROLS
    // =========================================================================
    const handleZoom = (delta: number) => {
      targetCameraDist = Math.max(26, Math.min(68, targetCameraDist + delta));
    };

    zoomInRef.current = () => handleZoom(-7);
    zoomOutRef.current = () => handleZoom(7);
    resetZoomRef.current = () => {
      targetCameraDist = 54;
      targetRotY = 0;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleZoom(e.deltaY * 0.035);
    };

    mount.addEventListener('wheel', handleWheel, { passive: false });

    // Interactive Sizzle Action Trigger
    triggerSizzleRef.current = () => {
      setIsSizzling(true);
      panGroup.rotation.z = -0.18;
      flameLight.intensity = 7.5;
      setTimeout(() => {
        panGroup.rotation.z = 0;
        flameLight.intensity = 3.8 * flameIntensityRef.current;
        setIsSizzling(false);
      }, 500);
    };

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

    // Touch Support for Mobile / Trackpad Pinch
    let touchStartDist = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevX = e.touches[0].clientX;
      } else if (e.touches.length === 2) {
        isDragging = false;
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const dx = e.touches[0].clientX - prevX;
        targetRotY += dx * 0.01;
        prevX = e.touches[0].clientX;
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = touchStartDist - dist;
        handleZoom(diff * 0.05);
        touchStartDist = dist;
      }
    };
    const handleTouchEnd = () => {
      isDragging = false;
    };

    mount.addEventListener('touchstart', handleTouchStart, { passive: true });
    mount.addEventListener('touchmove', handleTouchMove, { passive: true });
    mount.addEventListener('touchend', handleTouchEnd, { passive: true });

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
      camera.position.y += ((targetCameraDist * 0.42) - camera.position.y) * 0.08;
      camera.lookAt(0, 6.5, 0);

      // Bounded subtle sway + drag damping (no continuous auto-spinning)
      rootGroup.rotation.y += (targetRotY + Math.sin(elapsed * 0.4) * 0.02 - rootGroup.rotation.y) * 0.08;

      // Floating gourmet burger hovering gently above pass station
      burgerGroup.rotation.y = elapsed * 0.45;
      burgerGroup.position.y = 9.4 + Math.sin(elapsed * 2.0) * 0.18;

      // Dynamic Flame Flicker
      const mult = flameIntensityRef.current;
      flameMeshes.forEach((fMesh, idx) => {
        const wave = Math.sin(elapsed * 16 + idx * 0.7) * 0.35 + 0.95;
        fMesh.scale.set(1.0 * mult, wave * mult, 1.0 * mult);
      });
      flameLight.intensity = (3.5 + Math.sin(elapsed * 20) * 0.8) * mult;

      // Steam Particle Updraft
      const pArr = (steamGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        pArr[i * 3 + 1] += 0.12 * mult;
        if (pArr[i * 3 + 1] > 18.0) {
          pArr[i * 3 + 1] = 8.5;
          pArr[i * 3] = (Math.random() - 0.5) * 3.5;
          pArr[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      // Dynamic Chef Gestures: Chopping & Expediting
      prepChef.armL.rotation.x = Math.sin(elapsed * 10) * 0.25;
      prepChef.armR.rotation.x = -Math.sin(elapsed * 10) * 0.15;

      leadChef.armR.rotation.z = Math.sin(elapsed * 2) * 0.18 + 0.3;
      leadChef.armR.rotation.x = Math.sin(elapsed * 1.5) * 0.15;

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
      mount.removeEventListener('touchstart', handleTouchStart);
      mount.removeEventListener('touchmove', handleTouchMove);
      mount.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      cleanupVisibility();
      disposeThreeScene(scene, renderer);
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleFlameChange = (lvl: 'low' | 'med' | 'high' | 'flambe') => {
    setFlameLevel(lvl);
    if (lvl === 'low') {
      flameIntensityRef.current = 0.5;
      setHaccpTemp(68.4);
    } else if (lvl === 'med') {
      flameIntensityRef.current = 1.0;
      setHaccpTemp(74.5);
    } else if (lvl === 'high') {
      flameIntensityRef.current = 1.6;
      setHaccpTemp(82.0);
    } else {
      flameIntensityRef.current = 2.4;
      setHaccpTemp(95.0);
      if (triggerSizzleRef.current) triggerSizzleRef.current();
    }
  };

  const triggerSizzle = () => {
    if (triggerSizzleRef.current) {
      triggerSizzleRef.current();
    }
  };

  return (
    <div className="w-full rounded-3xl bg-slate-900 border-2 border-orange-500/40 p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      {/* Corner HUD accents */}
      <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-orange-400 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-orange-400 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center space-x-2">
          <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-mono font-extrabold text-orange-300 uppercase tracking-wider">
            {title}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/50 shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>HACCP FOOD SAFETY 100% COMPLIANT</span>
        </div>
      </div>

      {/* Main Grid: 3D Kitchen Canvas + Control Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* 3D Canvas */}
        <div className="lg:col-span-8 relative h-[380px] sm:h-[430px] rounded-2xl bg-[#050914] border border-slate-800 overflow-hidden shadow-inner cursor-grab active:cursor-grabbing">
          <div ref={mountRef} className="w-full h-full" />

          {/* Interactive Overlay Helper */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 shadow-md">
            DRAG TO ROTATE · SCROLL TO ZOOM · PREP COOK (L) & SHIFT LEAD EDUARDO (R)
          </div>

          {/* On-Screen HUD Zoom Controls */}
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

          {/* Live Station Ticker */}
          <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none bg-slate-950 px-3 py-1.5 rounded-xl border border-orange-500/40 text-[11px] font-mono text-orange-300 flex items-center justify-between shadow-xl">
            <span className="truncate">STATION SYNC // PREP COOK (L) ⇄ LEAD EXPEDITER (R)</span>
            <span className="text-emerald-400 shrink-0 font-bold ml-2">
              TEMP: {haccpTemp.toFixed(1)}°C PASS
            </span>
          </div>
        </div>

        {/* Right Side: Heat Controls & Shift Telemetry */}
        <div className="lg:col-span-4 space-y-3 font-mono">
          {/* HACCP Compliance Card */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-orange-500/30 space-y-2">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              FOOD SAFETY & TEMPERATURE PROTOCOL
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5 text-orange-400" />
                <span className="text-2xl font-black text-white">{haccpTemp.toFixed(1)}°C</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                CRITICAL LIMIT OK
              </span>
            </div>
            <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">SHIFT VOLUME:</span>
                <span className="text-orange-300 font-bold">180 COVERS / NIGHT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">EXPEDITE PACE:</span>
                <span className="text-emerald-400 font-bold">&lt; 12 MIN TICKET TIME</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ACTIVE TICKETS:</span>
                <span className="text-amber-300 font-bold">{orderQueue} IN PROCESS</span>
              </div>
            </div>
          </div>

          {/* Flame Intensity Selector */}
          <div className="space-y-1.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
              GAS BURNER CONTROL
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['low', 'med', 'high', 'flambe'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleFlameChange(lvl)}
                  className={`p-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                    flameLevel === lvl
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/40 border border-orange-400'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Culinary Actions */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={triggerSizzle}
              disabled={isSizzling}
              className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-lg active:scale-95 cursor-pointer border border-orange-400"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSizzling ? 'SIZZLING...' : 'SAUTÉ / TOSS SKILLET'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
