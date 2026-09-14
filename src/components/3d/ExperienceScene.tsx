'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getClampedPixelRatio, createFpsThrottler, setupVisibilityAndIntersection, disposeThreeScene } from '@/lib/three-perf';

export default function ExperienceScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for WebGL support
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

    const isLight = document.documentElement.classList.contains('light');

    const scene = new THREE.Scene();
    if (!isLight) {
      scene.fog = new THREE.FogExp2(0x07090e, 0.002);
    }

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 135;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(getClampedPixelRatio());
    renderer.setClearColor(0x000000, 0); // 100% transparent canvas
    container.appendChild(renderer.domElement);

    // Dynamic Nodes Constellation
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(isLight ? '#0284c7' : '#38bdf8'); // Cyan
    const color2 = new THREE.Color(isLight ? '#4f46e5' : '#6366f1'); // Indigo
    const color3 = new THREE.Color(isLight ? '#f59e0b' : '#fbbf24'); // Amber

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 1000; // X spread
      positions[i3 + 1] = (Math.random() - 0.5) * 700; // Y spread
      positions[i3 + 2] = (Math.random() - 0.5) * 350; // Z spread

      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isLight ? 2.5 : 2.0,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.8 : 0.8,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Global Wireframe Network Sphere (Globe) - Scaled 15% smaller for complete lateral clearance
    const globeGeo = new THREE.SphereGeometry(38, 32, 24);
    const globeMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8, // Sky / Cyan
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.55 : 0.45,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Inner Geometric Core - Scaled proportionally
    const innerSphereGeo = new THREE.IcosahedronGeometry(19.5, 2);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x4f46e5 : 0x6366f1, // Indigo
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.40 : 0.35,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    scene.add(innerSphere);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Mouse coordinates tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.05;
      mouseY = (event.clientY - windowHalfY) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Theme Change Observer
    const observer = new MutationObserver(() => {
      const currentIsLight = document.documentElement.classList.contains('light');
      if (currentIsLight) {
        scene.fog = null;
        globeMat.color.setHex(0x0284c7);
        globeMat.opacity = 0.55;
        innerSphereMat.color.setHex(0x4f46e5);
        innerSphereMat.opacity = 0.40;
        particleMaterial.blending = THREE.NormalBlending;
        particleMaterial.opacity = 0.8;
        renderer.setClearColor(0xffffff, 0);
      } else {
        scene.fog = new THREE.FogExp2(0x07090e, 0.002);
        globeMat.color.setHex(0x38bdf8);
        globeMat.opacity = 0.45;
        innerSphereMat.color.setHex(0x6366f1);
        innerSphereMat.opacity = 0.35;
        particleMaterial.blending = THREE.AdditiveBlending;
        particleMaterial.opacity = 0.8;
        renderer.setClearColor(0x000000, 0);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Animation Loop & Visibility Handling
    let animationFrameId: number;
    let time = 0;
    let isVisibleInView = true;

    const cleanupVisibility = setupVisibilityAndIntersection(container, (vis) => {
      isVisibleInView = vis;
    });

    const throttler = createFpsThrottler(45);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisibleInView) return;
      const now = performance.now();
      if (!throttler(now)) return;

      time += 0.005;

      // Mouse interaction damping
      targetX = mouseX * 0.05;
      targetY = mouseY * 0.05;
      
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;
      
      globe.rotation.x += 0.001;
      globe.rotation.y += 0.002;
      
      innerSphere.rotation.x -= 0.0015;
      innerSphere.rotation.y -= 0.0025;

      // Float effect based on time
      camera.position.y += (targetY - camera.position.y) * 0.05 + Math.sin(time) * 0.05;
      camera.position.x += (targetX - camera.position.x) * 0.05 + Math.cos(time) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      cleanupVisibility();
      cancelAnimationFrame(animationFrameId);
      disposeThreeScene(scene, renderer);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 bg-subtle-grid-bg opacity-30 pointer-events-none" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
    </div>
  );
}
