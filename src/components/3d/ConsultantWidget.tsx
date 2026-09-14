'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import worldLandData from '@/data/world-land.json';
import { getClampedPixelRatio, createFpsThrottler, setupVisibilityAndIntersection, disposeThreeScene } from '@/lib/three-perf';
import {
  Globe2,
  TrendingUp,
  Ship,
  ShieldCheck,
  DollarSign,
  Package,
  Layers,
  ArrowUpRight,
  Maximize2,
} from 'lucide-react';

interface PortHub {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  type: 'sourcing' | 'transit' | 'destination';
  volume: string;
  spec: string;
  auditScore: string;
  saving: string;
}

const PORT_HUBS: PortHub[] = [
  {
    id: 'shenzhen',
    name: 'Shenzhen & Foshan',
    country: 'China',
    lat: 22.54,
    lon: 114.05,
    type: 'sourcing',
    volume: '10-12 Cont/Qtr',
    spec: 'Tooling, Architectural Metals & APQP L3',
    auditScore: '99/100',
    saving: '-75% vs Wholesale',
  },
  {
    id: 'morbi',
    name: 'Morbi, Gujarat',
    country: 'India',
    lat: 22.82,
    lon: 70.83,
    type: 'sourcing',
    volume: '6-8 Cont/Qtr',
    spec: 'Technical Ceramics & Refractories ISO 10545',
    auditScore: '96/100',
    saving: '+25% Net Margin',
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam Gateway',
    country: 'Netherlands',
    lat: 51.92,
    lon: 4.48,
    type: 'transit',
    volume: '20 Cont/Qtr',
    spec: 'Multimodal Hub & Brainport ASML Connection',
    auditScore: '100/100',
    saving: 'Zero Demurrage',
  },
  {
    id: 'valencia',
    name: 'Valencia Terminal',
    country: 'Spain',
    lat: 39.46,
    lon: -0.37,
    type: 'transit',
    volume: '14 Cont/Qtr',
    spec: 'Mediterranean Customs & Final Distribution',
    auditScore: '98/100',
    saving: '48h Customs Clearance',
  },
  {
    id: 'latam',
    name: 'Santos & Manzanillo',
    country: 'Brazil / Mexico',
    lat: -23.96,
    lon: -46.33,
    type: 'destination',
    volume: '8-10 Cont/Qtr',
    spec: 'Direct Port Consolidations & Escrow Release',
    auditScore: '100/100',
    saving: 'Zero Cargo Disputes',
  },
  {
    id: 'caracas',
    name: 'Caracas & La Guaira',
    country: 'Venezuela',
    lat: 10.48,
    lon: -66.90,
    type: 'destination',
    volume: '6-8 Cont/Qtr',
    spec: 'Latin American Direct Sourcing & Port Logistics Gateway',
    auditScore: '99/100',
    saving: 'Direct Factory BOM',
  },
];

export default function ConsultantWidget({ title, lang = 'en' }: { title?: string; lang?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [activePort, setActivePort] = useState<PortHub>(PORT_HUBS[0]);
  const [hoveredPort, setHoveredPort] = useState<{
    hub: PortHub;
    x: number;
    y: number;
  } | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<'all' | 'asia-eu' | 'india-eu' | 'eu-latam'>('all');

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
      renderer.toneMappingExposure = 1.35;
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGLRenderer failed in ConsultantWidget:', e);
      setHasWebGL(false);
      return;
    }

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 16, 44);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.minDistance = 24;
    controls.maxDistance = 65;
    controls.enablePan = false;

    // 3. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.2); // Cyan Key Light
    keyLight.position.set(30, 40, 30);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x10b981, 2.5); // Emerald Rim Light
    rimLight.position.set(-30, -20, -30);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Initial tilt to display Eurasia and shipping corridors gracefully
    rootGroup.rotation.x = 0.22;
    rootGroup.rotation.y = -Math.PI / 4;

    const globeRadius = 14;

    // Helper: Convert Lat/Lon to 3D Cartesian coordinates on sphere (Standard Right-Handed Geodetic)
    const latLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const lambda = lon * (Math.PI / 180);
      const x = radius * Math.sin(phi) * Math.sin(lambda);
      const z = radius * Math.sin(phi) * Math.cos(lambda);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // 4. Globe Core Sphere with Oceanic Depth
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    const oceanColor = isDark ? 0x050d1a : 0x0f172a;

    const coreMat = new THREE.MeshStandardMaterial({
      color: oceanColor,
      roughness: 0.35,
      metalness: 0.85,
    });
    const globeSphere = new THREE.Mesh(new THREE.SphereGeometry(globeRadius, 64, 64), coreMat);
    rootGroup.add(globeSphere);

    // Atmospheric Outer Rim Glow
    const haloGeo = new THREE.SphereGeometry(globeRadius * 1.05, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    rootGroup.add(halo);

    // 5. Latitude & Longitude Cyber Matrix Rings
    const gridMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0284c7 : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const cyberGrid = new THREE.Mesh(new THREE.SphereGeometry(globeRadius * 1.005, 28, 28), gridMat);
    rootGroup.add(cyberGrid);

    // Prominent Glowing Equator Ring
    const equatorGeo = new THREE.RingGeometry(globeRadius * 1.01, globeRadius * 1.03, 64);
    equatorGeo.rotateX(Math.PI / 2);
    const equatorMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
    const equator = new THREE.Mesh(equatorGeo, equatorMat);
    rootGroup.add(equator);

    // 6. High-Definition Continental Coastlines & Matrix Landmass Point System
    const coastlineVertices: number[] = [];
    (worldLandData.coastlines as number[][][]).forEach((ring) => {
      for (let i = 0; i < ring.length - 1; i++) {
        const p1 = latLonToVector3(ring[i][1], ring[i][0], globeRadius * 1.008);
        const p2 = latLonToVector3(ring[i + 1][1], ring[i + 1][0], globeRadius * 1.008);
        coastlineVertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      }
    });

    const coastGeo = new THREE.BufferGeometry();
    coastGeo.setAttribute('position', new THREE.Float32BufferAttribute(coastlineVertices, 3));
    const coastMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.72 : 0.52,
    });
    const coastlinesMesh = new THREE.LineSegments(coastGeo, coastMat);
    rootGroup.add(coastlinesMesh);

    // Accurate Landmass Matrix Point Cloud
    const particlePositions: number[] = [];
    const particleColors: number[] = [];
    const colorLandCyan = new THREE.Color(0x38bdf8);
    const colorLandEmerald = new THREE.Color(0x10b981);

    (worldLandData.landPoints as number[][]).forEach(([lon, lat]) => {
      const v = latLonToVector3(lat, lon, globeRadius * 1.012);
      particlePositions.push(v.x, v.y, v.z);

      const mixCol = Math.random() > 0.4 ? colorLandCyan : colorLandEmerald;
      particleColors.push(mixCol.r, mixCol.g, mixCol.b);
    });

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const landmassPoints = new THREE.Points(particlesGeo, particlesMat);
    rootGroup.add(landmassPoints);

    // 7. Interactive Port Hub Markers with Pulsing Radar Rings
    const portMeshes: THREE.Mesh[] = [];
    const portMarkerGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const pulseRings: THREE.Mesh[] = [];

    // All Port Beacons (including Manzanillo Pacific beacon)
    const portLocations = [
      ...PORT_HUBS,
      {
        id: 'latam-manzanillo',
        name: 'Manzanillo Pacific Hub',
        country: 'Mexico',
        lat: 19.05,
        lon: -104.32,
        type: 'destination' as const,
        volume: '8-10 Cont/Qtr',
        spec: 'Direct Port Consolidations & Escrow Release',
        auditScore: '100/100',
        saving: 'Zero Cargo Disputes',
      },
    ];

    portLocations.forEach((hub) => {
      const pos = latLonToVector3(hub.lat, hub.lon, globeRadius * 1.02);

      // Port beacon core
      const hubMat = new THREE.MeshStandardMaterial({
        color: hub.type === 'sourcing' ? 0x38bdf8 : hub.type === 'transit' ? 0x10b981 : 0xf59e0b,
        emissive: hub.type === 'sourcing' ? 0x0284c7 : hub.type === 'transit' ? 0x059669 : 0xd97706,
        emissiveIntensity: 0.85,
      });
      const marker = new THREE.Mesh(portMarkerGeo, hubMat);
      marker.position.copy(pos);
      marker.userData = { hub: hub.id === 'latam-manzanillo' ? PORT_HUBS[4] : hub };
      rootGroup.add(marker);
      portMeshes.push(marker);

      // Radar pulse ring
      const pRingGeo = new THREE.RingGeometry(0.65, 0.9, 24);
      const pRingMat = new THREE.MeshBasicMaterial({
        color: hub.type === 'sourcing' ? 0x38bdf8 : hub.type === 'transit' ? 0x10b981 : 0xf59e0b,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
      });
      const pRing = new THREE.Mesh(pRingGeo, pRingMat);
      pRing.position.copy(pos);
      pRing.lookAt(new THREE.Vector3(0, 0, 0));
      rootGroup.add(pRing);
      pulseRings.push(pRing);
    });

    // 8. 3D Spherical Geodesic Great-Circle Shipping Trade Route Arcs
    interface TradeRoute {
      id: string;
      from: PortHub;
      to: PortHub;
      color: number;
      curve: THREE.CatmullRomCurve3;
      mesh: THREE.Line;
      vessels: THREE.Mesh[];
    }

    const tradeRoutes: TradeRoute[] = [];

    const createShippingArc = (
      id: string,
      fromLat: number,
      fromLon: number,
      toLat: number,
      toLon: number,
      fromHub: PortHub,
      toHub: PortHub,
      colorHex: number
    ) => {
      const start = latLonToVector3(fromLat, fromLon, globeRadius * 1.02);
      const end = latLonToVector3(toLat, toLon, globeRadius * 1.02);
      const distance = start.distanceTo(end);

      // Slerp along spherical great circle with low-orbit elevation arc
      const arcPoints: THREE.Vector3[] = [];
      const numSegments = 60;
      for (let i = 0; i <= numSegments; i++) {
        const t = i / numSegments;
        const p = new THREE.Vector3().copy(start).lerp(end, t).normalize();
        const altitude = Math.sin(t * Math.PI) * (distance * 0.16 + 0.8);
        p.multiplyScalar(globeRadius * 1.02 + altitude);
        arcPoints.push(p);
      }

      const curve = new THREE.CatmullRomCurve3(arcPoints);
      const points = curve.getPoints(50);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.8,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      rootGroup.add(line);

      // Animated cargo vessels navigating along the curve
      const vessels: THREE.Mesh[] = [];
      const vGeo = new THREE.BoxGeometry(0.75, 0.45, 1.4);
      const vMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: colorHex,
        emissiveIntensity: 0.7,
      });

      [0.2, 0.7].forEach((initT) => {
        const ship = new THREE.Mesh(vGeo, vMat);
        ship.userData = { t: initT, speed: 0.045 + Math.random() * 0.02 };
        rootGroup.add(ship);
        vessels.push(ship);
      });

      tradeRoutes.push({ id, from: fromHub, to: toHub, color: colorHex, curve, mesh: line, vessels });
    };

    // Corridor A: Shenzhen (China) -> Rotterdam (Europe)
    createShippingArc('asia-eu', 22.54, 114.05, 51.92, 4.48, PORT_HUBS[0], PORT_HUBS[2], 0x38bdf8);
    // Corridor B: Morbi (India) -> Rotterdam (Europe)
    createShippingArc('india-eu', 22.82, 70.83, 51.92, 4.48, PORT_HUBS[1], PORT_HUBS[2], 0x10b981);
    // Corridor C: Rotterdam (Europe) -> Valencia (Spain)
    createShippingArc('eu-transit', 51.92, 4.48, 39.46, -0.37, PORT_HUBS[2], PORT_HUBS[3], 0x38bdf8);
    // Corridor D: Valencia (Europe) -> Santos (Brazil)
    createShippingArc('eu-latam', 39.46, -0.37, -23.96, -46.33, PORT_HUBS[3], PORT_HUBS[4], 0xf59e0b);
    // Corridor E: Trans-Pacific Direct: Shenzhen (China) -> Manzanillo (Mexico)
    createShippingArc('asia-latam', 22.54, 114.05, 19.05, -104.32, PORT_HUBS[0], PORT_HUBS[4], 0x38bdf8);
    // Corridor F: Trans-Atlantic Direct: Valencia (Spain) -> Caracas (Venezuela)
    createShippingArc('eu-caracas', 39.46, -0.37, 10.48, -66.90, PORT_HUBS[3], PORT_HUBS[5], 0xf59e0b);
    // Corridor G: Direct China-LatAm Sourcing: Shenzhen (China) -> Caracas (Venezuela)
    createShippingArc('asia-caracas', 22.54, 114.05, 10.48, -66.90, PORT_HUBS[0], PORT_HUBS[5], 0x38bdf8);

    // 9. Raycaster for Interactive Port Selection & Real-Time Hover HUD
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);

    const onPointerMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(portMeshes);
      if (hits.length > 0) {
        const hitHub = hits[0].object.userData.hub as PortHub;
        if (hitHub) {
          const worldPos = new THREE.Vector3();
          hits[0].object.getWorldPosition(worldPos);
          const screenPos = worldPos.clone().project(camera);
          const px = ((screenPos.x + 1) / 2) * rect.width;
          const py = ((-screenPos.y + 1) / 2) * rect.height;

          // Only display if port is facing the camera
          if (screenPos.z < 1) {
            setHoveredPort({ hub: hitHub, x: px, y: py });
            mount.style.cursor = 'pointer';
            return;
          }
        }
      }
      setHoveredPort(null);
      mount.style.cursor = 'grab';
    };

    const onPointerClick = (e: MouseEvent) => {
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(portMeshes);
      if (hits.length > 0) {
        const hitHub = hits[0].object.userData.hub as PortHub;
        if (hitHub) setActivePort(hitHub);
      }
    };

    const onPointerLeave = () => {
      setHoveredPort(null);
    };

    mount.addEventListener('mousemove', onPointerMove);
    mount.addEventListener('click', onPointerClick);
    mount.addEventListener('mouseleave', onPointerLeave);

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

      // Pulse radar rings around port hubs
      pulseRings.forEach((ring, idx) => {
        const pulse = (time * 2 + idx * 1.2) % 2;
        ring.scale.set(1 + pulse * 0.8, 1 + pulse * 0.8, 1);
        (ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.7 - pulse * 0.35);
      });

      // Animate Cargo Vessels along their curved shipping lanes
      tradeRoutes.forEach((route) => {
        route.vessels.forEach((ship) => {
          let t = ship.userData.t + ship.userData.speed * delta;
          if (t > 1.0) t = 0.0;
          ship.userData.t = t;

          const pt = route.curve.getPoint(t);
          ship.position.copy(pt);

          // Point vessel tangent to the route curve
          const tangent = route.curve.getTangent(t);
          ship.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
        });
      });

      // Slight breathing of atmosphere halo
      halo.scale.setScalar(1.0 + Math.sin(time * 1.5) * 0.015);

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
      mount.removeEventListener('mousemove', onPointerMove);
      mount.removeEventListener('click', onPointerClick);
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
      ? 'LOGÍSTICA MULTIMODAL GLOBAL Y COMPRAS ESTRATÉGICAS'
      : isPt
      ? 'LOGÍSTICA MULTIMODAL GLOBAL E COMPRAS ESTRATÉGICAS'
      : 'GLOBAL MULTI-MODAL LOGISTICS & CAPITAL SOURCING',
    topSub: isEs
      ? 'Corredores Directos Asia-Europa-LatAm • 20 Cont/Trimestre • $800,000 USD Gestión Anual'
      : isPt
      ? 'Corredores Diretos Ásia-Europa-LatAm • 20 Cont/Trimestre • $800,000 USD Gestão Anual'
      : "Direct Asia-Europe-LatAm Corridors • 20 Cont/Qtr • $800,000 USD Annual Spend",
    escrowBadge: isEs ? 'Escudo Escrow 4 Fases' : isPt ? 'Escudo Escrow 4 Fases' : '4-Gate Escrow Shield',
    savingBadge: isEs ? '-75% Costes Sourcing' : isPt ? '-75% Custos Sourcing' : '-75% Sourcing Costs',
    managedSpend: isEs ? 'Gestión Anual Compras' : isPt ? 'Gestão Anual Aquisições' : 'Annual Managed Spend',
    contQtr: isEs ? '20 Cont/Trimestre' : isPt ? '20 Cont/Trimestre' : '20 Cont/Quarter',
    landedCost: isEs ? 'Estructura Costes Destino' : isPt ? 'Estrutura Custos Destino' : 'Landed Cost Structure',
    netProfit: isEs ? '+28% Margen Neto' : isPt ? '+28% Margem Líquida' : '+28% Net Profit',
    bom: isEs ? 'Coste Directo Fábrica (BOM):' : isPt ? 'Custo Direto Fábrica (BOM):' : 'Direct Factory BOM:',
    freight: isEs ? 'Flete Marítimo y Combustible:' : isPt ? 'Frete Marítimo e Combustível:' : 'Ocean Freight & Fuel:',
    tariffs: isEs ? 'Aranceles, Puerto y Aduanas:' : isPt ? 'Tarifas, Porto e Alfândega:' : 'Tariffs, Port & Clearance:',
    margin: isEs ? 'Mejora Margen Neto:' : isPt ? 'Melhoria Margem Líquida:' : 'Net Margin Improvement:',
    saved: isEs ? '+28% Ahorrado' : isPt ? '+28% Poupado' : '+28% Saved',
    selectHub: isEs ? 'Seleccionar Hub Portuario:' : isPt ? 'Selecionar Hub Portuário:' : 'Select Port Hub:',
    volume: isEs ? 'Volumen' : isPt ? 'Volume' : 'Volume',
    impact: isEs ? 'Impacto' : isPt ? 'Impacto' : 'Impact',
    hubTypeSourcing: isEs ? 'Centro Primario de Sourcing' : isPt ? 'Centro Principal de Sourcing' : 'Primary Sourcing Hub',
    hubTypeTransit: isEs ? 'Terminal Principal de Tránsito' : isPt ? 'Terminal Principal de Trânsito' : 'Main Transit Terminal',
    hubTypeDest: isEs ? 'Destino Consolidado' : isPt ? 'Destino Consolidado' : 'Consolidated Destination',
  };

  const getHubSpec = (hub: PortHub) => {
    if (isEs) {
      if (hub.id === 'shenzhen') return 'Matrices, Metales Arquitectónicos y APQP Nivel 3';
      if (hub.id === 'morbi') return 'Cerámica Técnica y Refractarios ISO 10545';
      if (hub.id === 'rotterdam') return 'Hub Multimodal y Conexión Brainport ASML';
      if (hub.id === 'valencia') return 'Aduana Mediterránea y Distribución Final Peninsular';
      if (hub.id === 'latam') return 'Consolidación Portuaria Directa y Liberación Escrow';
      if (hub.id === 'caracas') return 'Sourcing Directo Latinoamericano y Terminal Portuaria';
    }
    if (isPt) {
      if (hub.id === 'shenzhen') return 'Moldes, Metais Arquitetónicos e APQP Nível 3';
      if (hub.id === 'morbi') return 'Cerâmica Técnica e Refratários ISO 10545';
      if (hub.id === 'rotterdam') return 'Hub Multimodal e Ligação Brainport ASML';
      if (hub.id === 'valencia') return 'Alfândega Mediterrânica e Distribuição Final';
      if (hub.id === 'latam') return 'Consolidação Portuária Direta e Liberação Escrow';
      if (hub.id === 'caracas') return 'Sourcing Direto Latino-Americano e Terminal Portuário';
    }
    return hub.spec;
  };

  const getHubSaving = (hub: PortHub) => {
    if (isEs) {
      if (hub.id === 'shenzhen') return '-75% vs Distribuidor';
      if (hub.id === 'morbi') return '+25% Margen Neto';
      if (hub.id === 'rotterdam') return 'Cero Demoras Aduaneras';
      if (hub.id === 'valencia') return 'Despacho Aduanero 48h';
      if (hub.id === 'latam') return 'Cero Disputas Carga';
      if (hub.id === 'caracas') return 'BOM Directo Fábrica';
    }
    if (isPt) {
      if (hub.id === 'shenzhen') return '-75% vs Distribuidor';
      if (hub.id === 'morbi') return '+25% Margem Líquida';
      if (hub.id === 'rotterdam') return 'Zero Demoras Aduaneiras';
      if (hub.id === 'valencia') return 'Despacho Aduaneiro 48h';
      if (hub.id === 'latam') return 'Zero Disputas Carga';
      if (hub.id === 'caracas') return 'BOM Direto Fábrica';
    }
    return hub.saving;
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
         TOP COMMAND HUD: SOURCING TITLE & ACTIVE CORRIDOR BADGES
         ========================================================================= */}
      <div className="p-4 sm:p-5 border-b border-cyan-500/30 bg-slate-900/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 relative z-20">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md">
            <Globe2 className="w-5 h-5 animate-spin-slow" />
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
            {t.escrowBadge}
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm">
            {t.savingBadge}
          </span>
        </div>
      </div>

      {/* =========================================================================
         3D INTERACTIVE GLOBE CANVAS CONTAINER (EXPANDED HEIGHT)
         ========================================================================= */}
      <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[560px]">
        {/* Three.js Canvas Mount */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

        {/* Dynamic Background Telemetry & Blueprint Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 font-mono text-[9px] select-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-cyan-400/50 tracking-widest uppercase">
            ORBITAL TELEMETRY // WGS84 GEODESIC ARC SYSTEM // SOURCING LOGISTICS
          </div>
        </div>

        {/* Floating 3D Port Beacon HUD Tooltip on Hover */}
        {hoveredPort && (
          <div
            className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-opacity duration-150"
            style={{ left: `${hoveredPort.x}px`, top: `${hoveredPort.y - 12}px` }}
          >
            <div className="px-3 py-2 rounded-xl bg-slate-950/95 border border-cyan-400 text-xs font-mono text-white shadow-2xl backdrop-blur-md flex flex-col items-center whitespace-nowrap">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold text-cyan-300 uppercase tracking-wider">{hoveredPort.hub.name}</span>
                <span className="text-[10px] text-slate-400">({hoveredPort.hub.country})</span>
              </div>
              <div className="text-[10px] text-emerald-300 font-semibold mt-1 flex items-center gap-2">
                <span>{hoveredPort.hub.volume}</span>
                <span>·</span>
                <span>{getHubSaving(hoveredPort.hub)}</span>
              </div>
              <div className="text-[9px] text-slate-300 mt-0.5 max-w-[200px] truncate">
                {getHubSpec(hoveredPort.hub)}
              </div>
              <div className="w-2.5 h-2.5 bg-slate-950/95 border-r border-b border-cyan-400 transform rotate-45 -mb-1.5 mt-1" />
            </div>
          </div>
        )}

        {/* Floating Financial Telemetry Card: Left Side */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 max-w-[260px] sm:max-w-[290px] space-y-2 pointer-events-none">
          {/* Card A: Managed Spend & Allocation */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-cyan-500/50 shadow-xl space-y-1.5 pointer-events-auto">
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
              <span className="text-slate-400 uppercase tracking-wider font-bold">{t.managedSpend}</span>
              <span className="text-cyan-400 font-black text-[11px] sm:text-xs">$800,000 USD</span>
            </div>

            {/* Quarterly Allocation Bar Chart */}
            <div className="space-y-1 pt-0.5">
              <div className="flex justify-between text-[9px] font-mono text-slate-400">
                <span>Q1 ($200K)</span>
                <span>Q2 ($200K)</span>
                <span>Q3 ($200K)</span>
                <span>Q4 ($200K)</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div className="w-1/4 h-full bg-cyan-500 border-r border-slate-900" />
                <div className="w-1/4 h-full bg-emerald-500 border-r border-slate-900" />
                <div className="w-1/4 h-full bg-indigo-500 border-r border-slate-900" />
                <div className="w-1/4 h-full bg-sky-400" />
              </div>
            </div>

            <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
              <span className="text-emerald-400 font-bold">{t.contQtr}</span>
              <span className="text-slate-400">40' High Cube FCL</span>
            </div>
          </div>

          {/* Card B: Landed Cost & Profit Breakdown */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-emerald-500/50 shadow-xl space-y-1.5 pointer-events-auto">
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
              <span className="text-slate-400 uppercase tracking-wider font-bold">{t.landedCost}</span>
              <span className="text-emerald-400 font-black text-[11px] sm:text-xs">{t.netProfit}</span>
            </div>

            {/* 4-Part Segment Progress */}
            <div className="space-y-0.5 text-[9px] font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>{t.bom}</span>
                <span className="text-cyan-300 font-bold">42% (-75% vs local)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>{t.freight}</span>
                <span className="text-slate-400 font-bold">18%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>{t.tariffs}</span>
                <span className="text-slate-400 font-bold">12%</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400 font-bold pt-0.5">
                <span>{t.margin}</span>
                <span className="text-emerald-300">{t.saved}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Active Port Hub Detail Inspector: Right Side */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 max-w-[260px] sm:max-w-[290px] pointer-events-auto">
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950 border border-cyan-500/60 shadow-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-[9px] font-mono font-bold text-cyan-300 uppercase">
                {activePort.type === 'sourcing' ? t.hubTypeSourcing : activePort.type === 'transit' ? t.hubTypeTransit : t.hubTypeDest}
              </span>
              <span className="text-[11px] font-mono font-black text-emerald-400">
                {activePort.auditScore}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <span>{activePort.name}</span>
                <span className="text-[10px] font-normal text-slate-400 font-mono">({activePort.country})</span>
              </h4>
              <p className="text-[11px] text-slate-300 font-normal leading-relaxed mt-0.5">
                {getHubSpec(activePort)}
              </p>
            </div>

            <div className="pt-1.5 border-t border-slate-800 grid grid-cols-2 gap-1.5 text-[11px] font-mono">
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[9px] text-slate-400">{t.volume}</div>
                <div className="font-bold text-cyan-300">{activePort.volume}</div>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[9px] text-slate-400">{t.impact}</div>
                <div className="font-bold text-emerald-300">{getHubSaving(activePort)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Port Selector Pills - Solid Opaque & Proportional */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 right-3 sm:left-4 sm:right-4 z-20 flex flex-wrap items-center justify-center gap-1.5 pointer-events-auto">
          <span className="text-[10px] font-mono text-slate-400 font-bold mr-1 hidden sm:inline">
            {t.selectHub}
          </span>
          {PORT_HUBS.map((hub) => (
            <button
              key={hub.id}
              onClick={() => setActivePort(hub)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all shadow-md ${
                activePort.id === hub.id
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-cyan-500/30 scale-105 ring-1 ring-cyan-400'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50'
              }`}
            >
              {hub.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}