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

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGLRenderer creation failed in VDLWidget:', e);
      setHasWebGL(false);
      return;
    }

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 12, 38);
    camera.lookAt(0, 2, 0);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    mainKeyLight.position.set(20, 30, 25);
    scene.add(mainKeyLight);

    const fillLight = new THREE.DirectionalLight(0x10b981, 1.6);
    fillLight.position.set(-25, 20, -20);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 1.4);
    rimLight.position.set(0, 15, -30);
    scene.add(rimLight);

    // Underbody Neon Pointlight
    const underGlow = new THREE.PointLight(0x38bdf8, 3, 20);
    underGlow.position.set(0, 0.5, 0);
    scene.add(underGlow);

    const group = new THREE.Group();
    scene.add(group);

    const isLight = document.documentElement.classList.contains('light');
    const colorBody = isLight ? 0x0f766e : 0x0284c7; // Deep Metallic Teal / Cyber Cyan
    const colorRoof = isLight ? 0x1e293b : 0x0f172a; // Midnight Contrast Roof
    const colorAccent = 0xef4444; // John Cooper Works Chili Red
    const colorGlow = isLight ? 0x0284c7 : 0x38bdf8; // Neon Cyan
    const colorChrome = 0xe2e8f0; // Chrome / Silver

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: colorBody,
      metalness: 0.8,
      roughness: 0.2,
    });

    const roofMat = new THREE.MeshStandardMaterial({
      color: colorRoof,
      metalness: 0.5,
      roughness: 0.3,
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.65,
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.2,
      roughness: 0.8,
    });

    const jcwRedMat = new THREE.MeshStandardMaterial({
      color: colorAccent,
      metalness: 0.6,
      roughness: 0.3,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: colorChrome,
      metalness: 0.95,
      roughness: 0.1,
    });

    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
    });

    const haloLedMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const tailLedMat = new THREE.MeshBasicMaterial({
      color: 0xff1e1e,
    });

    const wireframeOverlayMat = new THREE.MeshBasicMaterial({
      color: colorGlow,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    // -------------------------------------------------------------
    // BUILD SCULPTED MINI COOPER JOHN COOPER WORKS (JCW) / CABRIO
    // -------------------------------------------------------------
    const carGroup = new THREE.Group();

    // 1. Lower Curved Main Body Chassis
    const mainBodyGeo = new THREE.CylinderGeometry(5.2, 5.5, 18, 24);
    mainBodyGeo.rotateX(Math.PI / 2);
    mainBodyGeo.scale(1.15, 0.45, 1.0);
    const mainBody = new THREE.Mesh(mainBodyGeo, bodyMat);
    mainBody.position.set(0, 3.2, 0);
    carGroup.add(mainBody);

    // Wireframe overlay for HUD feeling
    const mainBodyWire = new THREE.Mesh(mainBodyGeo, wireframeOverlayMat);
    mainBodyWire.position.copy(mainBody.position);
    carGroup.add(mainBodyWire);

    // 2. Front Hood / Rounded Bonnet (Curved slope)
    const hoodGeo = new THREE.CylinderGeometry(4.6, 5.2, 7, 24);
    hoodGeo.rotateX(Math.PI / 2);
    hoodGeo.scale(1.1, 0.35, 1.0);
    const hood = new THREE.Mesh(hoodGeo, bodyMat);
    hood.position.set(0, 3.5, 6.2);
    hood.rotation.x = -0.08; // Downward sloping hood
    carGroup.add(hood);

    // 3. JCW Signature Hood Air Scoop
    const scoopGeo = new THREE.BoxGeometry(2.4, 0.4, 1.6);
    const scoop = new THREE.Mesh(scoopGeo, trimMat);
    scoop.position.set(0, 4.4, 5.8);
    carGroup.add(scoop);

    // 4. JCW Dual Bonnet Racing Stripes
    const stripeGeo = new THREE.PlaneGeometry(0.5, 5.5);
    stripeGeo.rotateX(-Math.PI / 2);
    const stripeL = new THREE.Mesh(stripeGeo, jcwRedMat);
    stripeL.position.set(-1.6, 4.36, 6.2);
    stripeL.rotation.x = -0.08;
    const stripeR = new THREE.Mesh(stripeGeo, jcwRedMat);
    stripeR.position.set(1.6, 4.36, 6.2);
    stripeR.rotation.x = -0.08;
    carGroup.add(stripeL);
    carGroup.add(stripeR);

    // 5. Iconic Hexagonal MINI Front Grille
    const grilleGeo = new THREE.CylinderGeometry(3.0, 3.2, 1.6, 6);
    grilleGeo.rotateX(Math.PI / 2);
    grilleGeo.scale(1.2, 0.5, 1.0);
    const grille = new THREE.Mesh(grilleGeo, trimMat);
    grille.position.set(0, 2.6, 9.6);
    carGroup.add(grille);

    // Grille Red JCW Accent Line
    const grilleAccentGeo = new THREE.BoxGeometry(3.4, 0.25, 0.3);
    const grilleAccent = new THREE.Mesh(grilleAccentGeo, jcwRedMat);
    grilleAccent.position.set(0, 2.7, 10.3);
    carGroup.add(grilleAccent);

    // Front Lower Splitter / Bumper
    const frontSplitterGeo = new THREE.BoxGeometry(10.2, 0.7, 1.8);
    const frontSplitter = new THREE.Mesh(frontSplitterGeo, trimMat);
    frontSplitter.position.set(0, 1.2, 9.4);
    carGroup.add(frontSplitter);

    // 6. Iconic Rounded Oval LED Ring Headlights (Torus Halo + Projector Disc)
    const haloGeo = new THREE.TorusGeometry(0.9, 0.12, 16, 32);
    const projectorGeo = new THREE.CircleGeometry(0.75, 24);

    const headlightLeftGroup = new THREE.Group();
    const haloL = new THREE.Mesh(haloGeo, haloLedMat);
    const projL = new THREE.Mesh(projectorGeo, haloLedMat);
    headlightLeftGroup.add(haloL);
    headlightLeftGroup.add(projL);
    headlightLeftGroup.position.set(-3.6, 3.7, 9.3);
    headlightLeftGroup.rotation.set(-0.15, -0.25, 0.1);

    const headlightRightGroup = new THREE.Group();
    const haloR = new THREE.Mesh(haloGeo, haloLedMat);
    const projR = new THREE.Mesh(projectorGeo, haloLedMat);
    headlightRightGroup.add(haloR);
    headlightRightGroup.add(projR);
    headlightRightGroup.position.set(3.6, 3.7, 9.3);
    headlightRightGroup.rotation.set(-0.15, 0.25, -0.1);

    carGroup.add(headlightLeftGroup);
    carGroup.add(headlightRightGroup);

    // 7. Raked Windshield & Glazing
    const windshieldGeo = new THREE.PlaneGeometry(8.2, 4.4);
    windshieldGeo.rotateX(-Math.PI / 3); // 60 degree rake
    const windshield = new THREE.Mesh(windshieldGeo, glassMat);
    windshield.position.set(0, 5.3, 2.5);
    carGroup.add(windshield);

    // Rear Window
    const rearWindowGeo = new THREE.PlaneGeometry(7.8, 3.6);
    rearWindowGeo.rotateX(Math.PI / 3);
    const rearWindow = new THREE.Mesh(rearWindowGeo, glassMat);
    rearWindow.position.set(0, 5.5, -5.6);
    carGroup.add(rearWindow);

    // Side Windows
    const sideWindowGeo = new THREE.BoxGeometry(8.4, 2.6, 7.8);
    const sideWindow = new THREE.Mesh(sideWindowGeo, glassMat);
    sideWindow.position.set(0, 5.3, -1.5);
    carGroup.add(sideWindow);

    // 8. Aerodynamic Roof (JCW Contrast Roof + Tailgate Lip Spoiler)
    const roofGeo = new THREE.CylinderGeometry(4.4, 4.6, 8.5, 24);
    roofGeo.rotateX(Math.PI / 2);
    roofGeo.scale(1.05, 0.25, 1.0);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 6.7, -1.8);
    carGroup.add(roof);

    // JCW Aerodynamic Rear Wing / Spoiler
    const spoilerGeo = new THREE.BoxGeometry(8.0, 0.35, 1.6);
    const spoiler = new THREE.Mesh(spoilerGeo, jcwRedMat);
    spoiler.position.set(0, 7.1, -6.4);
    carGroup.add(spoiler);

    // 9. Aerodynamic Oval Mirror Caps
    const mirrorGeo = new THREE.SphereGeometry(0.7, 16, 16);
    mirrorGeo.scale(1.2, 0.8, 0.8);
    const mirrorL = new THREE.Mesh(mirrorGeo, jcwRedMat);
    mirrorL.position.set(-5.6, 4.6, 1.8);
    const mirrorR = new THREE.Mesh(mirrorGeo, jcwRedMat);
    mirrorR.position.set(5.6, 4.6, 1.8);
    carGroup.add(mirrorL);
    carGroup.add(mirrorR);

    // 10. Flared Wheel Arches (Iconic Black Trim Surrounds)
    const archGeo = new THREE.TorusGeometry(2.3, 0.25, 12, 24, Math.PI);
    archGeo.rotateX(Math.PI / 2);
    archGeo.rotateY(Math.PI / 2);

    const archFL = new THREE.Mesh(archGeo, trimMat);
    archFL.position.set(-5.3, 2.0, 5.5);
    const archFR = new THREE.Mesh(archGeo, trimMat);
    archFR.position.set(5.3, 2.0, 5.5);
    archFR.rotation.y = Math.PI;

    const archRL = new THREE.Mesh(archGeo, trimMat);
    archRL.position.set(-5.3, 2.0, -5.5);
    const archRR = new THREE.Mesh(archGeo, trimMat);
    archRR.position.set(5.3, 2.0, -5.5);
    archRR.rotation.y = Math.PI;

    carGroup.add(archFL);
    carGroup.add(archFR);
    carGroup.add(archRL);
    carGroup.add(archRR);

    // 11. Multi-Spoke JCW Alloy Wheels + Red Brake Calipers
    const tireGeo = new THREE.CylinderGeometry(2.0, 2.0, 1.2, 28);
    tireGeo.rotateZ(Math.PI / 2);

    const rimGeo = new THREE.CylinderGeometry(1.4, 1.4, 1.25, 20);
    rimGeo.rotateZ(Math.PI / 2);

    const spokeGeo = new THREE.BoxGeometry(0.2, 2.5, 0.2);
    spokeGeo.rotateZ(Math.PI / 2);

    const caliperGeo = new THREE.BoxGeometry(0.7, 1.0, 0.5);

    const wheelPositions = [
      [-5.3, 2.0, 5.5],  // Front Left
      [5.3, 2.0, 5.5],   // Front Right
      [-5.3, 2.0, -5.5], // Rear Left
      [5.3, 2.0, -5.5],  // Rear Right
    ];

    const wheels: THREE.Group[] = [];

    wheelPositions.forEach((pos, idx) => {
      const wGroup = new THREE.Group();
      wGroup.position.set(pos[0], pos[1], pos[2]);

      // Outer Tire
      const tire = new THREE.Mesh(tireGeo, tireMat);
      wGroup.add(tire);

      // Inner Alloy Rim
      const rim = new THREE.Mesh(rimGeo, chromeMat);
      wGroup.add(rim);

      // Wheel Spokes (Sporty 5-Double Spokes)
      for (let s = 0; s < 5; s++) {
        const spoke = new THREE.Mesh(spokeGeo, chromeMat);
        spoke.rotation.x = (s * Math.PI) / 5;
        wGroup.add(spoke);
      }

      // Center Hub Cap
      const hubGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.3, 16);
      hubGeo.rotateZ(Math.PI / 2);
      const hub = new THREE.Mesh(hubGeo, jcwRedMat);
      wGroup.add(hub);

      // High Performance Red JCW Caliper (stationary with chassis)
      const caliper = new THREE.Mesh(caliperGeo, jcwRedMat);
      caliper.position.set(pos[0] * 0.9, pos[1] + 0.6, pos[2] - (idx < 2 ? 0.6 : -0.6));
      carGroup.add(caliper);

      carGroup.add(wGroup);
      wheels.push(wGroup);
    });

    // 12. Rear JCW Dual Center Chrome Exhausts
    const exhaustGeo = new THREE.CylinderGeometry(0.35, 0.4, 1.4, 16);
    exhaustGeo.rotateX(Math.PI / 2);
    const exhaustL = new THREE.Mesh(exhaustGeo, chromeMat);
    exhaustL.position.set(-0.6, 1.3, -9.8);
    const exhaustR = new THREE.Mesh(exhaustGeo, chromeMat);
    exhaustR.position.set(0.6, 1.3, -9.8);
    carGroup.add(exhaustL);
    carGroup.add(exhaustR);

    // Rear Diffuser
    const rearDiffuserGeo = new THREE.BoxGeometry(7.0, 0.8, 1.2);
    const rearDiffuser = new THREE.Mesh(rearDiffuserGeo, trimMat);
    rearDiffuser.position.set(0, 1.4, -9.4);
    carGroup.add(rearDiffuser);

    // 13. Union Jack Stylized LED Tail Lights
    const tailLightGeo = new THREE.BoxGeometry(1.6, 2.2, 0.4);
    const tailL = new THREE.Mesh(tailLightGeo, tailLedMat);
    tailL.position.set(-3.8, 3.4, -9.4);
    const tailR = new THREE.Mesh(tailLightGeo, tailLedMat);
    tailR.position.set(3.8, 3.4, -9.4);
    carGroup.add(tailL);
    carGroup.add(tailR);

    // Center Mount High Brake Light
    const thirdBrakeGeo = new THREE.BoxGeometry(2.4, 0.2, 0.2);
    const thirdBrake = new THREE.Mesh(thirdBrakeGeo, tailLedMat);
    thirdBrake.position.set(0, 6.9, -6.9);
    carGroup.add(thirdBrake);

    group.add(carGroup);

    // -------------------------------------------------------------
    // HIGH-TECH TURNTABLE & TELEMETRY MEASUREMENT PLATFORM
    // -------------------------------------------------------------
    const turntableGeo = new THREE.CylinderGeometry(15, 15, 0.4, 48);
    const turntableMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.8,
      roughness: 0.3,
    });
    const turntable = new THREE.Mesh(turntableGeo, turntableMat);
    turntable.position.set(0, -0.2, 0);
    group.add(turntable);

    // Concentric Blueprint Rings
    const ringGeo1 = new THREE.RingGeometry(14.2, 14.6, 64);
    ringGeo1.rotateX(-Math.PI / 2);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: colorGlow,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.position.y = 0.02;
    group.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(11.8, 12.0, 48);
    ringGeo2.rotateX(-Math.PI / 2);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.position.y = 0.02;
    group.add(ring2);

    // Laser crosshairs on platform
    const crosshairGeo = new THREE.PlaneGeometry(28, 0.08);
    crosshairGeo.rotateX(-Math.PI / 2);
    const crosshairMat = new THREE.MeshBasicMaterial({
      color: colorGlow,
      transparent: true,
      opacity: 0.35,
    });
    const crosshairX = new THREE.Mesh(crosshairGeo, crosshairMat);
    crosshairX.position.y = 0.02;
    const crosshairZ = new THREE.Mesh(crosshairGeo, crosshairMat);
    crosshairZ.rotation.y = Math.PI / 2;
    crosshairZ.position.y = 0.02;
    group.add(crosshairX);
    group.add(crosshairZ);

    // -------------------------------------------------------------
    // INTERACTION & CONTINUOUS SMOOTH ROTATION PHYSICS
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let baseRotation = 0;
    let isHovered = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mouseenter', () => (isHovered = true));
    mount.addEventListener('mouseleave', () => {
      isHovered = false;
      mouseX = 0;
      mouseY = 0;
    });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Continuous turntable rotation
      baseRotation += delta * 0.4;

      // Inertial damping on mouse tilt
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // Fluid orientation without abrupt snaps
      group.rotation.y = baseRotation + targetX * 0.8;
      group.rotation.x = targetY * 0.25;

      // High-precision suspension idle breathing
      carGroup.position.y = Math.sin(time * 3) * 0.04;

      // Wheel rotation
      wheels.forEach((w) => {
        w.children[0].rotation.x += delta * 2;
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
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden glass-panel border border-cyan-500/30 flex flex-col items-center justify-center bg-slate-950/60 p-6 text-center space-y-3">
        <div className="flex items-center space-x-2 bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>OEM QA // MULTI-PLATFORM CHASSIS (MINI JCW / CABRIO)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-mono">
          3D Telemetry active: 110-120 vehicles/shift · 8D RCA Zero Defects · ±0.05 mm Laser Gap & Flush
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
