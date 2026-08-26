'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TopicVisualizerProps {
  type: 'cleanroom' | 'automotive' | 'logistics' | 'commercial' | 'consulting';
  title?: string;
}

export default function TopicVisualizer({ type, title }: TopicVisualizerProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 300;
    const height = mount.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Contextual Scene Creation
    if (type === 'cleanroom') {
      // Cleanroom / Semiconductor Wafer & Hexagonal Matrix
      const ringGeo = new THREE.RingGeometry(12, 16, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      group.add(ring);

      const centerCore = new THREE.DodecahedronGeometry(8, 0);
      const centerMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const core = new THREE.Mesh(centerCore, centerMat);
      group.add(core);

      // Orbiting Sensor Nodes
      const nodeGeo = new THREE.SphereGeometry(0.8, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(Math.cos(angle) * 14, Math.sin(angle) * 14, 0);
        group.add(node);
      }
    } else if (type === 'automotive') {
      // Automotive Chassis Telemetry Ring
      const torusGeo = new THREE.TorusGeometry(14, 2, 16, 50);
      const torusMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      group.add(torus);

      const innerTorusGeo = new THREE.TorusGeometry(8, 1, 16, 32);
      const innerTorusMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const innerTorus = new THREE.Mesh(innerTorusGeo, innerTorusMat);
      group.add(innerTorus);

      const boxGeo = new THREE.BoxGeometry(6, 10, 4);
      const boxMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      group.add(box);
    } else if (type === 'consulting') {
      // Global Coordinate Sphere with Supply Chain Arcs
      const globeGeo = new THREE.SphereGeometry(14, 18, 18);
      const globeMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const globe = new THREE.Mesh(globeGeo, globeMat);
      group.add(globe);

      // Hub points (China, India, Netherlands, Spain)
      const hubs = [
        new THREE.Vector3(12, 6, 4),
        new THREE.Vector3(8, -4, 10),
        new THREE.Vector3(-6, 11, 7),
        new THREE.Vector3(-10, 8, 4),
      ];

      const hubMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const hubGeo = new THREE.SphereGeometry(1.2, 16, 16);

      hubs.forEach((pos) => {
        const hubMesh = new THREE.Mesh(hubGeo, hubMat);
        hubMesh.position.copy(pos);
        group.add(hubMesh);
      });

      // Connecting arcs
      const lineMat = new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.6 });
      for (let i = 0; i < hubs.length - 1; i++) {
        const curve = new THREE.QuadraticBezierCurve3(
          hubs[i],
          new THREE.Vector3(0, 16, 0),
          hubs[i + 1]
        );
        const points = curve.getPoints(24);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
      }
    } else if (type === 'logistics') {
      // High-Density Logistics Rack Matrix
      for (let x = -2; x <= 2; x++) {
        for (let y = -2; y <= 2; y++) {
          const boxGeo = new THREE.BoxGeometry(4, 4, 4);
          const boxMat = new THREE.MeshBasicMaterial({
            color: (x + y) % 2 === 0 ? 0x38bdf8 : 0x10b981,
            wireframe: true,
            transparent: true,
            opacity: 0.35,
          });
          const box = new THREE.Mesh(boxGeo, boxMat);
          box.position.set(x * 6, y * 6, 0);
          group.add(box);
        }
      }
    } else {
      // Commercial & Process Flow Matrix
      const octaGeo = new THREE.OctahedronGeometry(12, 1);
      const octaMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const octa = new THREE.Mesh(octaGeo, octaMat);
      group.add(octa);

      const circleGeo = new THREE.RingGeometry(16, 17, 32);
      const circleMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const circle = new THREE.Mesh(circleGeo, circleMat);
      group.add(circle);
    }

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      group.rotation.x = time * 0.15;
      group.rotation.y = time * 0.25;
      group.rotation.z = time * 0.05;

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
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type]);

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 flex items-center justify-center">
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center space-x-2 bg-slate-950/80 px-3 py-1.5 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>3D TELEMETRY MATRIX // {type.toUpperCase()}</span>
        </div>
      </div>
      {title && (
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
          <span className="text-xs font-mono text-slate-400 bg-slate-950/80 px-3 py-1 rounded-md border border-slate-800">
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
