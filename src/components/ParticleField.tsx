import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count = 90 }: ParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.z = 6;

    const positions = new Float32Array(count * 3);
    const velocities: number[] = [];
    const opacities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      velocities.push(
        (Math.random() - 0.5) * 0.003,
        Math.random() * 0.004 + 0.001,
        0,
      );
      opacities[i] = Math.random() * 0.5 + 0.15;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Soft round sprite
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(90,60,20,0.9)');
    grad.addColorStop(1, 'rgba(90,60,20,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      map: texture,
      size: 0.12,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let rafId: number;
    const pos = geometry.attributes.position.array as Float32Array;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      for (let i = 0; i < count; i++) {
        pos[i * 3]     += velocities[i * 3];
        pos[i * 3 + 1] += velocities[i * 3 + 1];
        if (pos[i * 3 + 1] > 5.5) {
          pos[i * 3 + 1] = -5.5;
          pos[i * 3]     = (Math.random() - 0.5) * 16;
        }
        if (pos[i * 3] > 8)  pos[i * 3] = -8;
        if (pos[i * 3] < -8) pos[i * 3] = 8;
      }
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [count]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
