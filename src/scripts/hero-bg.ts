import * as THREE from 'three';

const COUNT = 3000;
const POINTER_RADIUS = 2.2;
const PUSH = 1.4;

export function initHeroBackground(host: HTMLElement): void {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
  } catch {
    return; // CSS gradient fallback stays
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    host.clientWidth / host.clientHeight,
    0.1,
    50
  );
  camera.position.z = 8;

  renderer.setSize(host.clientWidth, host.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  host.appendChild(renderer.domElement);

  // Geometry: random cloud, base positions kept for spring-back
  const positions = new Float32Array(COUNT * 3);
  const basePositions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);

  const ink = new THREE.Color('#2a2a2a');
  const orange = new THREE.Color('#fb9826');
  const blue = new THREE.Color('#0099ff');

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 18;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 4;
    basePositions.set(positions.slice(i3, i3 + 3), i3);

    const roll = Math.random();
    const c = roll < 0.85 ? ink : roll < 0.95 ? orange : blue;
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });

  scene.add(new THREE.Points(geometry, material));

  // Pointer in world units at z=0 plane (approximate via viewport fit)
  const pointer = new THREE.Vector2(999, 999);
  const target = new THREE.Vector2(999, 999);

  host.ownerDocument.addEventListener('pointermove', (e) => {
    const rect = host.getBoundingClientRect();
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    target.set(ndcX * halfH * camera.aspect, ndcY * halfH);
  });

  // Visibility-gated render loop
  let running = true;
  let rafId = 0;

  const io = new IntersectionObserver(([entry]) => {
    running = entry.isIntersecting && !document.hidden;
    if (running) loop();
  });
  io.observe(host);

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) loop();
  });

  function loop(): void {
    if (!running) return;
    pointer.lerp(target, 0.08);

    const pos = geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const dx = bx - pointer.x;
      const dy = by - pointer.y;
      const dist = Math.hypot(dx, dy);

      let tx = bx;
      let ty = by;
      if (dist < POINTER_RADIUS && dist > 0.001) {
        const force = (1 - dist / POINTER_RADIUS) * PUSH;
        tx = bx + (dx / dist) * force;
        ty = by + (dy / dist) * force;
      }
      pos.array[i3] += (tx - pos.array[i3]) * 0.06;
      pos.array[i3 + 1] += (ty - pos.array[i3 + 1]) * 0.06;
    }
    pos.needsUpdate = true;

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener('resize', () => {
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(host.clientWidth, host.clientHeight);
  });

  // Cleanup on page hide (Astro static site: pagehide is enough)
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(rafId);
    io.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  });
}
