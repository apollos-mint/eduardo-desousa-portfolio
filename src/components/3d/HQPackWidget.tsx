'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getClampedPixelRatio, createFpsThrottler, setupVisibilityAndIntersection, disposeThreeScene } from '@/lib/three-perf';
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Radio,
  Box,
  Layers,
} from 'lucide-react';

interface HQPackWidgetProps {
  title?: string;
  lang?: string;
}

interface EcosystemPartner {
  id: string;
  name: string;
  category: string;
  module: string;
  description: string;
  tolerance: string;
  compliance: string;
  badge: string;
}

const ECOSYSTEM_PARTNERS: EcosystemPartner[] = [
  {
    id: 'asml',
    name: 'ASML Supply Chain',
    category: 'EUV Lithography Systems',
    module: 'EUV / DUV Optic Pod & Wafer Module',
    description: 'Cleanroom packaging assembly conforming to ASML cleanroom specifications and ISO Class 5 standards.',
    tolerance: '< 0.1 µm Particulates',
    compliance: 'ISO 14644-1 Class 5',
    badge: 'Cleanroom Spec',
  },
  {
    id: 'zeiss',
    name: 'Carl Zeiss Optics',
    category: 'High-NA Precision Optics',
    module: 'Sub-Nanometer Optical Mirror Shroud',
    description: 'Sub-nanometer optical surface protection with zero hydrocarbon outgassing for lithography mirrors.',
    tolerance: 'VOC Zero Outgas',
    compliance: 'Optics Grade A',
    badge: 'Zero Outgassing',
  },
  {
    id: 'iso14644',
    name: 'ISO 14644-1 Spec',
    category: 'Airborne Particulate Control',
    module: 'Class 5/6 Environmental Chamber',
    description: 'Stringent cleanroom atmospheric monitoring, continuous laminar airflow, and zero-particle handling protocol.',
    tolerance: '< 3,520 particles/m³',
    compliance: 'ISO 14644-1 Cl. 5',
    badge: 'ISO Certified',
  },
  {
    id: 'purge',
    name: 'Hermetic N2 Purge',
    category: 'Purge & Vacuum Control',
    module: 'Positive Pressure & N2 Purge Barrier',
    description: 'N2 positive pressure seal (+0.02 bar) and ultra-low helium leak rate preventing molecular airborne contamination.',
    tolerance: '< 1x10⁻⁹ mbar·l/s',
    compliance: 'Grade 1 Vacuum Spec',
    badge: 'Hermetic Pass',
  },
  {
    id: 'tuv',
    name: 'TÜV Rheinland Audit',
    category: 'Quality Governance & Audit Prep',
    module: 'Technical QMS Compliance & Recertification',
    description: '100% compliance verification, empirical test protocol preparation, and flawless third-party recertification audits.',
    tolerance: '100% Compliance',
    compliance: 'ISO 9001 / TÜV QMS',
    badge: 'TÜV Verified',
  },
  {
    id: 'isah',
    name: 'ERP ISAH System',
    category: 'Digital Work Order Governance',
    module: '150+ Monthly Orders & Traceability',
    description: 'Real-time data governance in ERP ISAH, tracking 150+ monthly complex technical interventions with 100% serial number traceability.',
    tolerance: '100% Traceability',
    compliance: 'ISAH ERP Governance',
    badge: '150+ Monthly',
  },
];

export default function HQPackWidget({ title, lang = 'en' }: HQPackWidgetProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [activeWafer, setActiveWafer] = useState<number>(3);
  const [isPurging, setIsPurging] = useState<boolean>(true);
  const [selectedPartner, setSelectedPartner] = useState<EcosystemPartner>(ECOSYSTEM_PARTNERS[0]);

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

    const width = mount.clientWidth || 800;
    const height = mount.clientHeight || 520;

    // 1. Renderer Setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(getClampedPixelRatio());
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGLRenderer failed in HQPackWidget:', e);
      setHasWebGL(false);
      return;
    }

    // 2. Scene & Camera Setup (Optimized near/far planes for enhanced 24-bit depth precision)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.5, 300);
    camera.position.set(22, 16, 28);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.minDistance = 16;
    controls.maxDistance = 55;
    controls.maxPolarAngle = Math.PI / 2 - 0.08; // Keep securely above turntable plane
    controls.target.set(0, 3.5, 0);

    // 3. Cinematic Showroom Cleanroom Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.2); // Cleanroom Cyan Key
    keyLight.position.set(25, 35, 25);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x34d399, 2.2); // Emerald Precision Fill
    fillLight.position.set(-25, 20, -20);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.4); // Violet Backlight Rim
    rimLight.position.set(0, 18, -30);
    scene.add(rimLight);

    // Cleanroom Platform Ambient Rim Accent
    const underglow = new THREE.PointLight(0x0284c7, 1.4, 25);
    underglow.position.set(0, -1.0, 0);
    scene.add(underglow);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 4. Cleanroom Turntable Platform & Metrology Grid (Matte Anodized Obsidian - Zero Specular Shimmer)
    const turntableGeo = new THREE.CylinderGeometry(14, 14, 0.4, 64);
    const turntableMat = new THREE.MeshStandardMaterial({
      color: 0x09101f,
      metalness: 0.2,
      roughness: 0.85,
    });
    const turntable = new THREE.Mesh(turntableGeo, turntableMat);
    turntable.position.set(0, -0.2, 0); // Top surface at y = 0.0
    rootGroup.add(turntable);

    // Platform Metallic Chamfer Edge Ring (placed strictly on the outer perimeter beneath turntable top)
    const rimGeo = new THREE.CylinderGeometry(14.15, 14.15, 0.36, 64);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8, roughness: 0.3 });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.set(0, -0.22, 0); // Top at y = -0.04, eliminating coplanar face conflict with turntable
    rootGroup.add(rimMesh);

    // Crosshair Metrology Lines (Depth-biased with polygonOffset to completely prevent Z-fighting)
    const chMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const chX = new THREE.Mesh(new THREE.PlaneGeometry(26, 0.08), chMat);
    chX.rotation.x = -Math.PI / 2;
    chX.position.y = 0.015;
    const chZ = new THREE.Mesh(new THREE.PlaneGeometry(26, 0.08), chMat);
    chZ.rotation.x = -Math.PI / 2;
    chZ.rotation.z = Math.PI / 2;
    chZ.position.y = 0.018;
    rootGroup.add(chX);
    rootGroup.add(chZ);

    // Outer Blueprint Ring (Cyan) - Kept in pure XY plane with mesh rotation.x = -PI/2 for wobble-free planar spin
    const ringGeo1 = new THREE.RingGeometry(13.2, 13.6, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = -Math.PI / 2;
    ring1.position.y = 0.024;
    rootGroup.add(ring1);

    // Inner Precision Ring (Emerald)
    const ringGeo2 = new THREE.RingGeometry(10.5, 10.8, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = 0.028;
    rootGroup.add(ring2);

    // 5. ASML Hermetic Wafer Carrier FOUP Chamber (Chassis)
    const foupGroup = new THREE.Group();
    foupGroup.position.set(0, 0.35, 0);

    const aluMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.95,
      roughness: 0.18,
    });
    const anodizedCyanMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.9,
      roughness: 0.25,
    });

    // 4 ASML Precision Kinematic Coupling Damper Feet (mounting pedestal connecting FOUP to turntable)
    const footGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.35, 24);
    const footMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2,
    });
    [[-3.8, -3.8], [3.8, -3.8], [-3.8, 3.8], [3.8, 3.8]].forEach(([fx, fz]) => {
      const foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(fx, 0.175, fz);
      rootGroup.add(foot);
    });

    // FOUP Base Platform
    const foupBase = new THREE.Mesh(new THREE.BoxGeometry(9.4, 0.8, 9.4), aluMat);
    foupBase.position.set(0, 0.4, 0);
    foupGroup.add(foupBase);

    // FOUP Top Roof with Carrying Handle
    const foupRoof = new THREE.Mesh(new THREE.BoxGeometry(9.4, 0.6, 9.4), aluMat);
    foupRoof.position.set(0, 8.2, 0);
    foupGroup.add(foupRoof);

    // Robot Gripper Top Flange
    const topFlange = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.0, 0.8, 16), anodizedCyanMat);
    topFlange.position.set(0, 8.9, 0);
    foupGroup.add(topFlange);

    // 4 Corner Structural Uprights (Vertical Pillars)
    const pillarGeo = new THREE.BoxGeometry(0.8, 7.2, 0.8);
    [[-4.3, -4.3], [4.3, -4.3], [-4.3, 4.3], [4.3, 4.3]].forEach(([x, z]) => {
      const p = new THREE.Mesh(pillarGeo, anodizedCyanMat);
      p.position.set(x, 4.4, z);
      foupGroup.add(p);
    });

    // Hermetic Polycarbonate Enclosure Walls (Transparent Cleanroom Glass)
    const wallGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xbae6fd,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.88,
      thickness: 1.2,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });

    // Back & Side Walls
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 7.2), wallGlassMat);
    backWall.position.set(0, 4.4, -4.6);
    foupGroup.add(backWall);

    const sideWallL = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 7.2), wallGlassMat);
    sideWallL.rotation.y = Math.PI / 2;
    sideWallL.position.set(-4.6, 4.4, 0);
    foupGroup.add(sideWallL);

    const sideWallR = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 7.2), wallGlassMat);
    sideWallR.rotation.y = -Math.PI / 2;
    sideWallR.position.set(4.6, 4.4, 0);
    foupGroup.add(sideWallR);

    // Front Opening Seal Frame
    const frontSeal = new THREE.Mesh(new THREE.BoxGeometry(8.8, 0.3, 0.4), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    frontSeal.position.set(0, 4.4, 4.6);
    foupGroup.add(frontSeal);

    // 6. Stack of 5 Multi-Tier ASML EUV/DUV Silicon Wafers (300mm Standard)
    const waferMeshes: THREE.Mesh[] = [];
    const waferGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.08, 48);

    // Iridescent Mirror Silicon Wafer Material
    const siliconMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.98,
      roughness: 0.06,
    });
    const waferBevelMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    // Wafer slot levels (Y from 1.6 to 6.8)
    const waferYLevels = [1.8, 3.0, 4.2, 5.4, 6.6];

    waferYLevels.forEach((yLvl, idx) => {
      const wafer = new THREE.Mesh(waferGeo, siliconMat);
      wafer.position.set(0, yLvl, 0);

      // Micro-pattern circuit diffraction ring on wafer surface
      const patternRing = new THREE.Mesh(
        new THREE.RingGeometry(1.2, 3.5, 32).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({
          color: idx === 2 ? 0x10b981 : 0x38bdf8,
          transparent: true,
          opacity: 0.35,
          side: THREE.DoubleSide,
        })
      );
      patternRing.position.y = 0.05;
      wafer.add(patternRing);

      // Wafer edge notch / alignment guide
      const notch = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.3), waferBevelMat);
      notch.position.set(0, 0.05, 3.5);
      wafer.add(notch);

      foupGroup.add(wafer);
      waferMeshes.push(wafer);
    });

    rootGroup.add(foupGroup);

    // 7. Robotic Cleanroom Wafer Handling Arm & End-Effector
    const robotArmGroup = new THREE.Group();
    robotArmGroup.position.set(0, 0.35, 7.5);

    // Precision Linear Guide Rail
    const guideRail = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 8.0), aluMat);
    guideRail.position.set(0, 0.2, 1.0);
    robotArmGroup.add(guideRail);

    // Vertical Articulated Elevator Column
    const elevatorCol = new THREE.Mesh(new THREE.BoxGeometry(1.0, 7.5, 1.0), anodizedCyanMat);
    elevatorCol.position.set(0, 3.8, 4.5);
    robotArmGroup.add(elevatorCol);

    // End-Effector Vacuum Paddle (Reaching inside the wafer chamber)
    const paddleGeo = new THREE.BoxGeometry(3.8, 0.12, 5.0);
    const paddleMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.92,
      roughness: 0.15,
    });
    const endEffector = new THREE.Mesh(paddleGeo, paddleMat);
    endEffector.position.set(0, 4.2, 0); // Aligned with central wafer (index 2)
    robotArmGroup.add(endEffector);

    // Vacuum suction cups on paddle
    [[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]].forEach(([sX, sZ]) => {
      const suctionCup = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.15, 12), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
      suctionCup.position.set(sX, 0.1, sZ);
      endEffector.add(suctionCup);
    });

    rootGroup.add(robotArmGroup);

    // 8. Animated Optical Laser Particle Detection Scanner (<0.1µm Telemetry)
    const scanLaserBeam = new THREE.Mesh(
      new THREE.BoxGeometry(8.0, 0.05, 0.05),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.9 })
    );
    scanLaserBeam.position.set(0, 4.75, 0);
    rootGroup.add(scanLaserBeam);

    const scanLaserSheet = new THREE.Mesh(
      new THREE.PlaneGeometry(8.0, 7.2).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    scanLaserSheet.position.set(0, 4.75, 0);
    rootGroup.add(scanLaserSheet);

    // 9. Floating Particle Telemetry Points (Cleanroom ISO 5 Aerosol particles)
    const particleCount = 45;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = 1.0 + Math.random() * 6.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const aerosolGeo = new THREE.BufferGeometry();
    aerosolGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const aerosolMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.25,
      transparent: true,
      opacity: 0.65,
    });
    const aerosolParticles = new THREE.Points(aerosolGeo, aerosolMat);
    foupGroup.add(aerosolParticles);

    // 10. Animation Loop & Visibility Handling
    let animId: number;
    const clock = new THREE.Clock();
    let isVisibleInView = true;

    const cleanupVisibility = setupVisibilityAndIntersection(mount, (vis) => {
      isVisibleInView = vis;
    });

    const throttler = createFpsThrottler(45);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisibleInView) return;
      const now = performance.now();
      if (!throttler(now)) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      controls.update();

      // Platform Ring Rotation
      ring1.rotation.z = time * 0.04;
      ring2.rotation.z = -time * 0.06;

      // Laser Particle Scanner Vertical & Depth Sweep
      const laserZ = Math.sin(time * 1.8) * 3.8;
      scanLaserBeam.position.z = laserZ;
      scanLaserSheet.position.z = laserZ;

      // Subtle breathing of end-effector arm (Linear interpolation)
      endEffector.position.z = Math.sin(time * 1.2) * 0.8 - 0.2;

      // Aerosol particles Brownian floating
      const positions = aerosolGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time * 2 + i) * 0.004;
        if (positions[i * 3 + 1] > 7.5) positions[i * 3 + 1] = 1.5;
        if (positions[i * 3 + 1] < 1.0) positions[i * 3 + 1] = 7.0;
      }
      aerosolGeo.attributes.position.needsUpdate = true;

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
      cancelAnimationFrame(animId);
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

  const t = {
    topTitle: isEs
      ? 'SALA LIMPIA ASML ISO 14644-1 CLASE 5 // CONTENEDOR FOUP DE OBLEAS'
      : isPt
      ? 'SALA LIMPA ASML ISO 14644-1 CLASSE 5 // TRANSPORTADOR FOUP DE WAFERS'
      : 'ASML CLEANROOM ISO 14644-1 CLASS 5 // WAFER CARRIER FOUP',
    topSub: isEs
      ? 'HQ Pack (Brainport Eindhoven) • Obleas de Silicio 300mm Litografía • Precisión Submicrónica'
      : isPt
      ? 'HQ Pack (Brainport Eindhoven) • Wafers de Silício 300mm Litografia • Precisão Submicrónica'
      : 'HQ Pack (Brainport Eindhoven) • 300mm Lithography Silicon Wafers • Sub-Micron Precision',
    particulateBadge: isEs ? 'Partículas: <0.1µm Superado' : isPt ? 'Partículas: <0.1µm Aprovado' : 'Particulate: <0.1µm Pass',
    outgassingBadge: isEs ? 'Cero Desgasificación VOC' : isPt ? 'Zero Desgaseificação VOC' : 'Zero Outgassing VOC',
    atmosTele: isEs ? 'Telemetría Atmosférica' : isPt ? 'Telemetria Atmosférica' : 'Atmospheric Telemetry',
    particleCount: isEs ? 'Conteo de Partículas (≥0.1µm):' : isPt ? 'Contagem Partículas (≥0.1µm):' : 'Particle Count (≥0.1µm):',
    hermeticPurge: isEs ? 'Purga Hermética:' : isPt ? 'Purga Hermética:' : 'Hermetic Purge:',
    moduleInteg: isEs ? 'Integridad del Módulo' : isPt ? 'Integridade do Módulo' : 'Module Integrity',
    grade1Vac: isEs ? 'Vacío Grado 1' : isPt ? 'Vácuo Grau 1' : 'Grade 1 Vacuum',
    heLeak: isEs ? 'Tasa de Fuga de Helio:' : isPt ? 'Taxa de Fuga de Hélio:' : 'Helium Leak Rate:',
    esd: isEs ? 'Descarga Electrostática:' : isPt ? 'Descarga Eletrostática:' : 'Electrostatic Discharge:',
    packCycle: isEs ? 'Tiempo Ciclo Embalaje:' : isPt ? 'Tempo Ciclo Embalagem:' : 'Packaging Cycle Time:',
    packCycleVal: isEs ? '-30% con ERP ISAH' : isPt ? '-30% com ERP ISAH' : '-30% with ISAH ERP',
    tolerance: isEs ? 'Tolerancia' : isPt ? 'Tolerância' : 'Tolerance',
    compliance: isEs ? 'Conformidad' : isPt ? 'Conformidade' : 'Compliance',
    activeSubsys: isEs ? 'Subsistema Activo:' : isPt ? 'Subsistema Ativo:' : 'Active Subsystem:',
    subsystems: isEs
      ? ['Pila de Obleas EUV', 'Brazo End-Effector', 'Purga Hermética N2', 'Contador Láser Partículas']
      : isPt
      ? ['Pilha de Wafers EUV', 'Braço End-Effector', 'Purga Hermética N2', 'Contador Laser Partículas']
      : ['EUV Wafer Stack', 'End-Effector Arm', 'N2 Hermetic Purge', 'Laser Particle Counter'],
  };

  const getPartnerDesc = (partner: EcosystemPartner) => {
    if (isEs) {
      if (partner.id === 'asml') return 'Ensamblaje y mantenimiento de embalaje de precisión conforme a especificaciones ASML y normas ISO Clase 5.';
      if (partner.id === 'zeiss') return 'Protección de superficie óptica sub-nanométrica con cero desgasificación de hidrocarburos para espejos litográficos.';
      if (partner.id === 'iso14644') return 'Monitorización ambiental continua de flujo laminar y control estricto de partículas <0.1µm en sala limpia.';
      if (partner.id === 'purge') return 'Sellado a sobrepresión de nitrógeno N2 (+0.02 bar) y tasa de fuga de helio ultra-baja previniendo contaminación molecular.';
      if (partner.id === 'tuv') return 'Preparación técnica y verificación de matrices de cumplimiento para la aprobación sin observaciones de auditorías TÜV.';
      if (partner.id === 'isah') return 'Gestión de gobernanza de datos en ERP ISAH con registro de más de 150 intervenciones técnicas mensuales y trazabilidad total.';
    }
    if (isPt) {
      if (partner.id === 'asml') return 'Montagem e manutenção de embalagem de precisão conforme especificações ASML e normas ISO Classe 5.';
      if (partner.id === 'zeiss') return 'Proteção de superfície ótica subnanométrica com zero desgaseificação de hidrocarbonetos para espelhos litográficos.';
      if (partner.id === 'iso14644') return 'Monitorização ambiental contínua de fluxo laminar e controlo rigoroso de partículas <0.1µm em sala limpa.';
      if (partner.id === 'purge') return 'Vedação a sobrepressão de nitrogénio N2 (+0.02 bar) e taxa de fuga de hélio ultrabaixa prevenindo contaminação molecular.';
      if (partner.id === 'tuv') return 'Preparação técnica e verificação de matrizes de conformidade para aprovação exemplar em auditorias TÜV.';
      if (partner.id === 'isah') return 'Gestão de governança de dados no ERP ISAH com registo de mais de 150 intervenções técnicas mensais e rastreabilidade total.';
    }
    return partner.description;
  };

  if (!hasWebGL) {
    return (
      <div className="relative w-full h-[500px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 flex flex-col items-center justify-center bg-slate-950/60 p-6 text-center space-y-3">
        <div className="flex items-center space-x-2 bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.topTitle}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-mono">
          {t.topSub}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-panel border-2 border-cyan-500/40 bg-slate-950/90 shadow-2xl space-y-0">
      {/* =========================================================================
         TOP COMMAND HUD: ASML CLEANROOM ISO 5 SPEC & ACTIVE TELEMETRY
         ========================================================================= */}
      <div className="p-4 sm:p-5 border-b border-cyan-500/30 bg-slate-900/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 relative z-20">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md">
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-mono font-extrabold text-cyan-300 tracking-wider flex items-center gap-2">
              <span>{t.topTitle}</span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {t.topSub}
            </div>
          </div>
        </div>

        {/* Global Live Cadence Metrics */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold shadow-sm">
            {t.particulateBadge}
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm">
            {t.outgassingBadge}
          </span>
        </div>
      </div>

      {/* =========================================================================
         3D INTERACTIVE CLEANROOM CHAMBER CANVAS (EXPANDED HEIGHT)
         ========================================================================= */}
      <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[560px]">
        {/* Three.js Canvas Mount */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

        {/* Laminar Airflow Particle Stream & Cleanroom Blueprint Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 font-mono text-[9px] select-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-emerald-400/50 tracking-widest uppercase">
            ISO 14644-1 CLASS 5 ENVIRONMENT // LAMINAR AIRFLOW &lt;0.1µm // BRAINPORT EINDHOVEN
          </div>
        </div>

        {/* Floating Quality Gate Telemetry Card: Left Side */}
        <div className="absolute top-4 left-4 z-20 max-w-[280px] sm:max-w-[310px] space-y-2.5 pointer-events-none">
          {/* Card A: Cleanroom Specifications */}
          <div className="p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 shadow-xl space-y-2 pointer-events-auto">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400 uppercase tracking-wider font-bold">{t.atmosTele}</span>
              <span className="text-emerald-400 font-black text-xs">ISO CLASS 5 OK</span>
            </div>

            {/* Particle Counter Telemetry Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-300">
                <span>{t.particleCount}</span>
                <span className="text-cyan-300 font-bold">3.2 / m³ (Max 10)</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div className="w-[32%] h-full bg-gradient-to-r from-emerald-500 to-cyan-400" />
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-cyan-300 font-bold">{t.hermeticPurge}</span>
              <span className="text-emerald-400">N2 Positive +0.02 bar</span>
            </div>
          </div>

          {/* Card B: Lithography Carrier Specs */}
          <div className="p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 shadow-xl space-y-2 pointer-events-auto">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400 uppercase tracking-wider font-bold">{t.moduleInteg}</span>
              <span className="text-cyan-400 font-black text-xs">{t.grade1Vac}</span>
            </div>

            <div className="space-y-1 text-[10px] font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>{t.heLeak}</span>
                <span className="text-emerald-300 font-bold">&lt; 1x10⁻⁹ mbar·l/s</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>{t.esd}</span>
                <span className="text-cyan-300 font-bold">ESD &lt; 10V Pass</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>{t.packCycle}</span>
                <span className="text-emerald-300 font-bold">{t.packCycleVal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Active Partner Inspector: Right Side */}
        <div className="absolute top-4 right-4 z-20 max-w-[280px] sm:max-w-[340px] pointer-events-auto">
          <div className="p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-cyan-500/50 shadow-2xl space-y-3">
            {/* Ecosystem Partner Selector Chips */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-800 pb-2.5">
              {ECOSYSTEM_PARTNERS.map((partner) => (
                <button
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                    selectedPartner.id === partner.id
                      ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/40 font-black'
                      : 'bg-slate-900/80 hover:bg-slate-850 text-slate-300 border border-slate-800 hover:border-cyan-500/30'
                  }`}
                >
                  {partner.name}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300 uppercase">
                {selectedPartner.category}
              </span>
              <span className="text-xs font-mono font-black text-emerald-400">
                {selectedPartner.badge}
              </span>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5">
                <span>{selectedPartner.module}</span>
              </h4>
              <p className="text-xs text-slate-300 font-normal leading-relaxed mt-1">
                {getPartnerDesc(selectedPartner)}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] text-slate-400">{t.tolerance}</div>
                <div className="font-bold text-cyan-300">{selectedPartner.tolerance}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] text-slate-400">{t.compliance}</div>
                <div className="font-bold text-emerald-300">{selectedPartner.compliance}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-center gap-2 pointer-events-auto">
          <span className="text-[11px] font-mono text-slate-400 font-bold mr-1 hidden sm:inline">
            {t.activeSubsys}
          </span>
          {t.subsystems.map((sub, idx) => (
            <button
              key={idx}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all shadow-md ${
                idx === 0
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-cyan-500/30 scale-105'
                  : 'bg-slate-950/80 hover:bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}