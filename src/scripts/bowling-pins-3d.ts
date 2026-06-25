// 3D pin field for the hero bowling easter egg. One shared WebGL canvas renders
// all six pins from a single GLB. three.js + the model are dynamically imported
// (code-split) and only loaded on demand, so they never touch initial page weight.
//
// The collision/physics stays 2D (in bowling.ts). This module only renders: pin
// screen positions are mapped 1:1 to an orthographic camera (1 world unit = 1px,
// y flipped so screen-down = world-down), and pins tumble in real 3D on scatter.

import gsap from 'gsap';
import type { Vec } from './bowling-physics';

export interface PinField {
  /** Position the pins at home (screen px) for a fresh frame and make them visible. */
  place(homeCenter: Vec, offsets: Vec[]): void;
  /** Pop the pins in (scale up). */
  spawn(): void;
  /** Knock pin `index` down: fly along `dir` (screen-space), tumble in 3D, fade. */
  scatter(index: number, dir: Vec): void;
  /** Hide all pins (between throws). */
  reset(): void;
  startRender(): void;
  stopRender(): void;
}

export async function createPinField(glbUrl: string, pinHeightPx: number): Promise<PinField> {
  const THREE = await import('three');
  const { GLTFLoader } = (await import('three/addons/loaders/GLTFLoader.js')) as any;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const canvas = renderer.domElement;
  canvas.className = 'hb-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, 1, 0, -1, 0.1, 4000);
  camera.position.set(0, 0, 2000);

  scene.add(new THREE.AmbientLight(0xffffff, 0.95));
  const key = new THREE.DirectionalLight(0xffffff, 1.7);
  key.position.set(-0.4, 1, 0.9);
  const rim = new THREE.DirectionalLight(0xffffff, 0.5);
  rim.position.set(0.7, 0.3, -0.8);
  scene.add(key, rim);

  const sizeRenderer = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.left = 0;
    camera.right = w;
    camera.top = 0;
    camera.bottom = -h;
    camera.updateProjectionMatrix();
  };
  sizeRenderer();

  // Load the model and normalise it: scale so it stands `pinHeightPx` tall and
  // recentre its geometry on the origin so positioning places its middle.
  const gltf: any = await new GLTFLoader().loadAsync(glbUrl);
  const model = gltf.scene as any;
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const centre = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(centre);
  model.position.sub(centre);
  const normWrap = new THREE.Group();
  normWrap.add(model);
  normWrap.scale.setScalar(pinHeightPx / (size.y || 1));

  // Six independent instances, each with cloned materials so they fade alone.
  const pins = Array.from({ length: 6 }, () => {
    const inst = normWrap.clone(true);
    const mats: any[] = [];
    inst.traverse((o: any) => {
      if (o.isMesh && o.material) {
        o.material = o.material.clone();
        o.material.transparent = true;
        mats.push(o.material);
      }
    });
    const group = new THREE.Group();
    group.add(inst);
    group.visible = false;
    scene.add(group);
    return { group, mats };
  });

  let raf = 0;
  const loop = () => {
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };

  const killPin = (p: (typeof pins)[number]) => {
    gsap.killTweensOf(p.group.position);
    gsap.killTweensOf(p.group.rotation);
    gsap.killTweensOf(p.group.scale);
    p.mats.forEach((m) => gsap.killTweensOf(m));
  };

  return {
    place(homeCenter, offsets) {
      sizeRenderer();
      offsets.forEach((off, i) => {
        const p = pins[i];
        if (!p) return;
        killPin(p);
        // screen → world: x as-is, y flipped
        p.group.position.set(homeCenter.x + off.x, -(homeCenter.y + off.y), 0);
        p.group.rotation.set(0, 0, 0);
        p.group.scale.setScalar(1);
        p.mats.forEach((m) => (m.opacity = 1));
        p.group.visible = true;
      });
    },
    spawn() {
      pins.forEach((p, i) => {
        p.group.scale.setScalar(0);
        gsap.to(p.group.scale, { x: 1, y: 1, z: 1, duration: 0.3, delay: i * 0.03, ease: 'back.out(2)' });
      });
    },
    scatter(index, dir) {
      const p = pins[index];
      if (!p) return;
      const ang = Math.atan2(-dir.y, dir.x); // dir is screen-space; world y is flipped
      const dist = 50 + Math.random() * 50;
      gsap.to(p.group.position, {
        x: `+=${Math.cos(ang) * dist}`,
        y: `+=${Math.sin(ang) * dist}`,
        duration: 0.6,
        ease: 'power2.out',
      });
      gsap.to(p.group.rotation, {
        x: (Math.random() - 0.5) * 9,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 9,
        duration: 0.6,
        ease: 'power2.out',
      });
      p.mats.forEach((m) => gsap.to(m, { opacity: 0, duration: 0.55, ease: 'power2.out' }));
    },
    reset() {
      pins.forEach((p) => {
        killPin(p);
        p.group.visible = false;
      });
    },
    startRender() {
      if (!raf) loop();
    },
    stopRender() {
      cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}
