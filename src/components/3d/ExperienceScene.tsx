'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

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
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 100% transparent canvas
    container.appendChild(renderer.domElement);

    // Dynamic Nodes Constellation
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(isLight ? '#0284c7' : '#38bdf8'); // Cyan
    const color2 = new THREE.Color(isLight ? '#4f46e5' : '#6366f1'); // Indigo
    const color3 = new THREE.Color(isLight ? '#f59e0b' : '#fbbf24'); // Amber

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 1200; // X spread (full width)
      positions[i3 + 1] = (Math.random() - 0.5) * 800; // Y spread
      positions[i3 + 2] = (Math.random() - 0.5) * 400; // Z spread

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

    // TorusKnot Data Core
    const torusGeo = new THREE.TorusKnotGeometry(40, 5, 120, 20);
    const torusMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x059669 : 0x10b981, // Emerald
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.5 : 0.4,
    });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torusKnot);

    // Inner Core
    const innerSphere = new THREE.SphereGeometry(25, 16, 16);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x4f46e5 : 0x6366f1, // Indigo
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.4 : 0.3,
    });
    const sphere = new THREE.Mesh(innerSphere, innerSphereMat);
    scene.add(sphere);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Mouse coordinates tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Relative to the container
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const windowHalfX = rect.width / 2;
      const windowHalfY = rect.height / 2;
      mouseX = (x - windowHalfX) * 0.05;
      mouseY = (y - windowHalfY) * 0.05;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

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
        torusMat.color.setHex(0x059669);
        torusMat.opacity = 0.5;
        innerSphereMat.color.setHex(0x4f46e5);
        innerSphereMat.opacity = 0.4;
        particleMaterial.blending = THREE.NormalBlending;
        particleMaterial.opacity = 0.8;
        renderer.setClearColor(0xffffff, 0);
      } else {
        scene.fog = new THREE.FogExp2(0x07090e, 0.002);
        torusMat.color.setHex(0x10b981);
        torusMat.opacity = 0.4;
        innerSphereMat.color.setHex(0x6366f1);
        innerSphereMat.opacity = 0.3;
        particleMaterial.blending = THREE.AdditiveBlending;
        particleMaterial.opacity = 0.8;
        renderer.setClearColor(0x000000, 0);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.005;

      // Mouse interaction damping
      targetX = mouseX * 0.05;
      targetY = mouseY * 0.05;
      
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;
      
      torusKnot.rotation.x += 0.003;
      torusKnot.rotation.y += 0.004;
      torusKnot.rotation.z += 0.001;
      
      sphere.rotation.x -= 0.002;
      sphere.rotation.y -= 0.003;

      // Float effect based on time
      camera.position.y += (targetY - camera.position.y) * 0.05 + Math.sin(time) * 0.05;
      camera.position.x += (targetX - camera.position.x) * 0.05 + Math.cos(time) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      innerSphere.dispose();
      innerSphereMat.dispose();
      renderer.dispose();
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
