import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight WebGL "AI agent network" background.
 * Renders animated 3D nodes + connecting lines + a glowing wireframe core with
 * orbit rings. Designed to be fast: low geometry counts, no postprocessing,
 * dpr capped, fewer nodes on small screens, paused while the tab is hidden.
 */
export function WebGLBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isSmall = width < 768;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070a, 0.035);
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 18;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isSmall, alpha: true });
    } catch {
      return; // WebGL unavailable — the CSS gradient background still shows.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.25 : 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const PALETTE = [0xc8ff4d, 0x5eead4, 0xa78bfa];

    // Nodes (AI agents & hexagons)
    const NODE_COUNT = isSmall ? 34 : 64;
    const nodes: THREE.Mesh[] = [];
    const velocities: THREE.Vector3[] = [];

    const sphereGeo = new THREE.IcosahedronGeometry(0.12, 0);
    const hexGeo = new THREE.CircleGeometry(0.15, 6);
    const nodeMats = PALETTE.map(
      (c) =>
        new THREE.MeshBasicMaterial({
          color: c,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
    );

    // Soft halo sprite shared by all nodes
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = haloCanvas.height = 64;
    const hctx = haloCanvas.getContext("2d");
    if (hctx) {
      const g = hctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,0.9)");
      g.addColorStop(0.25, "rgba(255,255,255,0.25)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      hctx.fillStyle = g;
      hctx.fillRect(0, 0, 64, 64);
    }
    const haloTex = new THREE.CanvasTexture(haloCanvas);
    const haloMats = PALETTE.map(
      (c) =>
        new THREE.SpriteMaterial({
          map: haloTex,
          color: c,
          transparent: true,
          opacity: 0.35,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
    );

    const group = new THREE.Group();
    for (let i = 0; i < NODE_COUNT; i++) {
      const isHex = i % 2 === 0;
      const colorIdx = i % 3 === 0 ? 2 : i % 5 === 0 ? 1 : 0;
      const m = new THREE.Mesh(isHex ? hexGeo : sphereGeo, nodeMats[colorIdx]);
      m.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 14,
      );
      if (isHex) {
        m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      }
      const halo = new THREE.Sprite(haloMats[colorIdx]);
      halo.scale.setScalar(0.9);
      m.add(halo);
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
        ),
      );
      nodes.push(m);
      group.add(m);
    }

    // Secondary particle field (soft drifting star dust)
    const PARTICLE_COUNT = isSmall ? 90 : 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleVelocities: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      particleVelocities.push((Math.random() - 0.5) * 0.004);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe8ecff,
      size: 0.05,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Lines between nearby nodes (dynamic)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc8ff4d,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lineGeo = new THREE.BufferGeometry();
    const MAX_LINES = 260;
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    // Central wireframe core
    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(4.2, 1),
      new THREE.MeshBasicMaterial({
        color: 0xa78bfa,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    group.add(sphere);

    // Orbit rings around the core
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc8ff4d,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ringGeo1 = new THREE.TorusGeometry(6.2, 0.012, 6, 160);
    const ringGeo2 = new THREE.TorusGeometry(7.6, 0.01, 6, 160);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat);
    ring1.rotation.x = Math.PI / 2.4;
    ring2.rotation.x = Math.PI / 1.7;
    ring2.rotation.y = Math.PI / 5;
    group.add(ring1, ring2);

    scene.add(group);

    // Scroll tracker
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let frame = 0;
    let raf = 0;
    let running = true;
    const tick = () => {
      frame++;
      for (let i = 0; i < NODE_COUNT; i++) {
        const p = nodes[i].position;
        const v = velocities[i];
        p.add(v);
        if (Math.abs(p.x) > 15) v.x *= -1;
        if (Math.abs(p.y) > 9) v.y *= -1;
        if (Math.abs(p.z) > 7) v.z *= -1;
        if (i % 2 === 0) {
          nodes[i].rotation.x += 0.002;
          nodes[i].rotation.y += 0.003;
        }
      }

      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3 + 1] += particleVelocities[i];
        if (Math.abs(positions[i * 3 + 1]) > 12) {
          positions[i * 3 + 1] = -positions[i * 3 + 1];
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Update lines every 2nd frame for perf
      if (frame % 2 === 0) {
        let li = 0;
        for (let i = 0; i < NODE_COUNT && li < MAX_LINES; i++) {
          for (let j = i + 1; j < NODE_COUNT && li < MAX_LINES; j++) {
            const a = nodes[i].position;
            const b = nodes[j].position;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dz = a.z - b.z;
            const d2 = dx * dx + dy * dy + dz * dz;
            if (d2 < 10) {
              linePositions[li * 6 + 0] = a.x;
              linePositions[li * 6 + 1] = a.y;
              linePositions[li * 6 + 2] = a.z;
              linePositions[li * 6 + 3] = b.x;
              linePositions[li * 6 + 4] = b.y;
              linePositions[li * 6 + 5] = b.z;
              li++;
            }
          }
        }
        for (let k = li * 6; k < linePositions.length; k++) linePositions[k] = 0;
        lineGeo.attributes.position.needsUpdate = true;
      }

      // Rotate core based on scrolling position and time
      sphere.rotation.x = scrollY * 0.0015 + frame * 0.0015;
      sphere.rotation.y = scrollY * 0.001 + frame * 0.002;
      ring1.rotation.z = frame * 0.0012 + scrollY * 0.0006;
      ring2.rotation.z = -frame * 0.0009 - scrollY * 0.0004;
      group.rotation.y = scrollY * 0.0002 + frame * 0.0008;
      group.position.y = scrollY * 0.0015;

      // Parallax
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 1.2 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      if (running && !reduceMotion) raf = requestAnimationFrame(tick);
    };
    tick();

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        if (!reduceMotion) raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      sphereGeo.dispose();
      hexGeo.dispose();
      nodeMats.forEach((m) => m.dispose());
      haloMats.forEach((m) => m.dispose());
      haloTex.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat.dispose();
      sphere.geometry.dispose();
      (sphere.material as THREE.Material).dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 webgl-container w-full h-full overflow-hidden"
    />
  );
}
