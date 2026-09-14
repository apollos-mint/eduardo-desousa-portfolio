import * as THREE from 'three';

/**
 * Returns a pixel ratio clamped to Math.min(devicePixelRatio, 1.25).
 * High-DPI screens (Retina 2x/3x) cause a 4x to 9x fragment fill-rate explosion
 * with imperceptible visual benefit in 3D canvas backgrounds.
 */
export function getClampedPixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  return Math.min(window.devicePixelRatio || 1, 1.25);
}

/**
 * High-performance frame throttler for Three.js requestAnimationFrame loops.
 * Clamps maximum rendering rate to targetFps (default 45 FPS) to keep GPUs cool
 * and prevent frame dropping / hitching.
 */
export function createFpsThrottler(targetFps: number = 45) {
  const frameInterval = 1000 / targetFps;
  let lastTime = 0;

  return (currentTime: number): boolean => {
    if (currentTime - lastTime >= frameInterval) {
      lastTime = currentTime - ((currentTime - lastTime) % frameInterval);
      return true;
    }
    return false;
  };
}

/**
 * Sets up an IntersectionObserver and Page Visibility listener.
 * Automatically pauses 3D rendering loops when the canvas scrolls out of view
 * or when the user switches browser tabs.
 */
export function setupVisibilityAndIntersection(
  element: HTMLElement,
  onStateChange: (isVisible: boolean) => void
): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  let inViewport = true;
  let isTabVisible = !document.hidden;

  const notify = () => {
    onStateChange(inViewport && isTabVisible);
  };

  const handleVisibility = () => {
    isTabVisible = !document.hidden;
    notify();
  };
  document.addEventListener('visibilitychange', handleVisibility);

  let observer: IntersectionObserver | null = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        inViewport = entry ? entry.isIntersecting : true;
        notify();
      },
      { root: null, rootMargin: '100px', threshold: 0.01 }
    );
    observer.observe(element);
  }

  return () => {
    document.removeEventListener('visibilitychange', handleVisibility);
    if (observer) {
      observer.disconnect();
    }
  };
}

/**
 * Deep recursive memory disposal for Three.js scenes.
 * Cleans up geometries, materials, textures, and the WebGL renderer.
 */
export function disposeThreeScene(scene: THREE.Scene, renderer?: THREE.WebGLRenderer) {
  try {
    scene.traverse((object) => {
      // Meshes, Points, Lines
      if ((object as THREE.Mesh).isMesh || (object as THREE.Points).isPoints || (object as THREE.Line).isLine) {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }

        if (mesh.material) {
          const disposeMaterial = (mat: THREE.Material) => {
            // Dispose all common texture maps
            const m = mat as unknown as Record<string, unknown>;
            const textureKeys = [
              'map',
              'lightMap',
              'bumpMap',
              'normalMap',
              'specularMap',
              'envMap',
              'alphaMap',
              'roughnessMap',
              'metalnessMap',
              'emissiveMap',
              'clearcoatMap',
              'transmissionMap',
            ];

            for (const key of textureKeys) {
              const val = m[key];
              if (val && typeof (val as THREE.Texture).dispose === 'function') {
                (val as THREE.Texture).dispose();
              }
            }

            mat.dispose();
          };

          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => disposeMaterial(mat));
          } else {
            disposeMaterial(mesh.material);
          }
        }
      }
    });

    // Clear all children from scene
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }

    // Dispose renderer and force context release
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss?.();
    }
  } catch (e) {
    console.warn('Error during Three.js scene disposal:', e);
  }
}
