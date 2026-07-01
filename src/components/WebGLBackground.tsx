import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight WebGL "AI agent network" background.
 * Renders animated 3D nodes + connecting lines + glowing wireframe sphere.
 * Designed to be fast: low geometry counts, no postprocessing, dpr capped.
 */
export function WebGLBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const isDarkInitial = document.documentElement.classList.contains("dark");
    const initialColor = isDarkInitial ? 0xbafca2 : 0x7fbc8c;

    // Nodes (AI agents & Hexagons)
    const NODE_COUNT = 60;
    const nodes: THREE.Mesh[] = [];
    const velocities: THREE.Vector3[] = [];
    
    // Mix of icosahedrons and hexagons (6-segmented circles)
    const sphereGeo = new THREE.IcosahedronGeometry(0.12, 0);
    const hexGeo = new THREE.CircleGeometry(0.14, 6);
    const nodeMat = new THREE.MeshBasicMaterial({ 
      color: initialColor,
      side: THREE.DoubleSide
    });

    const group = new THREE.Group();
    for (let i = 0; i < NODE_COUNT; i++) {
      const isHex = i % 2 === 0;
      const m = new THREE.Mesh(isHex ? hexGeo : sphereGeo, nodeMat);
      m.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 14,
      );
      if (isHex) {
        m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      }
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

    // Secondary Particle Field (Soft moving background dust)
    const PARTICLE_COUNT = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleVelocities: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 36;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      particleVelocities.push((Math.random() - 0.5) * 0.004); // Drift velocity
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: initialColor,
      size: 0.06,
      transparent: true,
      opacity: isDarkInitial ? 0.32 : 0.18,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Lines between nearby nodes (dynamic)
    const lineMat = new THREE.LineBasicMaterial({
      color: initialColor,
      transparent: true,
      opacity: isDarkInitial ? 0.22 : 0.12,
    });
    const lineGeo = new THREE.BufferGeometry();
    const MAX_LINES = 250;
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    // Central wireframe sphere
    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(4.2, 1),
      new THREE.MeshBasicMaterial({
        color: initialColor,
        wireframe: true,
        transparent: true,
        opacity: isDarkInitial ? 0.16 : 0.06,
      }),
    );
    group.add(sphere);

    scene.add(group);

    // Function to dynamically update colors on theme change
    const updateColors = (isDark: boolean) => {
      const color = isDark ? 0xbafca2 : 0x7fbc8c;
      nodeMat.color.setHex(color);
      lineMat.color.setHex(color);
      lineMat.opacity = isDark ? 0.22 : 0.12;
      particleMat.color.setHex(color);
      particleMat.opacity = isDark ? 0.32 : 0.18;
      (sphere.material as THREE.MeshBasicMaterial).color.setHex(color);
      (sphere.material as THREE.MeshBasicMaterial).opacity = isDark ? 0.16 : 0.06;
    };

    // MutationObserver to watch theme changes on documentElement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateColors(document.documentElement.classList.contains("dark"));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

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
    const tick = () => {
      frame++;
      // Move nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        const p = nodes[i].position;
        const v = velocities[i];
        p.add(v);
        if (Math.abs(p.x) > 15) v.x *= -1;
        if (Math.abs(p.y) > 9) v.y *= -1;
        if (Math.abs(p.z) > 7) v.z *= -1;

        // Rotate hexagons slightly over time
        if (i % 2 === 0) {
          nodes[i].rotation.x += 0.002;
          nodes[i].rotation.y += 0.003;
        }
      }

      // Update soft moving background dust particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3 + 1] += particleVelocities[i];
        if (Math.abs(positions[i * 3 + 1]) > 11) {
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
            if (d2 < 9) {
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
        // Zero out unused
        for (let k = li * 6; k < linePositions.length; k++) linePositions[k] = 0;
        lineGeo.attributes.position.needsUpdate = true;
      }

      // Rotate sphere based on scrolling position and time
      sphere.rotation.x = scrollY * 0.0015 + frame * 0.0015;
      sphere.rotation.y = scrollY * 0.001 + frame * 0.002;
      group.rotation.y = scrollY * 0.0002 + frame * 0.0008;

      // Parallax
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 1.2 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      sphereGeo.dispose();
      hexGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
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
