import * as THREE from "three";

export type Stage = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
};
export type FrameState = { t: number; px: number; py: number; scroll: number; aspect: number };

/** Shared lifecycle: sizing, pointer, scroll progress, pausing off screen, disposal. */
export function mountStage(
  host: HTMLElement,
  build: (s: Stage) => { frame: (f: FrameState) => void; resize?: (w: number, h: number) => void; dispose?: () => void },
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const c = renderer.domElement;
  c.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  host.appendChild(c);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const stage = { scene, camera, renderer };
  const built = build(stage);
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  let visible = true, raf = 0, dead = false;
  const start = performance.now();

  const draw = () => {
    const r = host.getBoundingClientRect();
    ptr.x += (ptr.tx - ptr.x) * 0.05;
    ptr.y += (ptr.ty - ptr.y) * 0.05;
    const scroll = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    built.frame({ t: still ? 4 : (performance.now() - start) / 1000, px: ptr.x, py: ptr.y, scroll: still ? 0 : scroll, aspect: camera.aspect });
    renderer.render(scene, camera);
  };
  const loop = () => {
    raf = 0;
    if (dead || !visible || document.hidden) return;
    draw();
    if (!still) raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf && !dead) raf = requestAnimationFrame(loop); };

  const size = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    built.resize?.(w, h);
    draw();
  };
  const move = (e: PointerEvent) => {
    ptr.tx = (e.clientX / innerWidth) * 2 - 1;
    ptr.ty = (e.clientY / innerHeight) * 2 - 1;
  };
  const ro = new ResizeObserver(size);
  ro.observe(host);
  const io = new IntersectionObserver((es) => { visible = es[es.length - 1].isIntersecting; if (visible) kick(); }, { rootMargin: "100px" });
  io.observe(host);
  addEventListener("pointermove", move, { passive: true });
  document.addEventListener("visibilitychange", kick);
  size();
  kick();

  return () => {
    dead = true;
    cancelAnimationFrame(raf);
    ro.disconnect(); io.disconnect();
    removeEventListener("pointermove", move);
    document.removeEventListener("visibilitychange", kick);
    built.dispose?.();
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      (Array.isArray(m.material) ? m.material : m.material ? [m.material] : []).forEach((x) => x.dispose());
    });
    renderer.dispose();
    renderer.forceContextLoss();
    c.remove();
  };
}

export function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, "rgba(255,255,255,1)");
  r.addColorStop(0.16, "rgba(255,255,255,.55)");
  r.addColorStop(0.45, "rgba(255,255,255,.12)");
  r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/** Dark studio with a few softboxes, baked to an environment map. */
export function studio(renderer: THREE.WebGLRenderer, boxes: [number, number, number, number, number, number][]) {
  const s = new THREE.Scene();
  s.background = new THREE.Color(0x030404);
  const geo = new THREE.PlaneGeometry(1, 1);
  boxes.forEach(([x, y, z, w, h, power]) => {
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: new THREE.Color(power, power * 1.02, power * 1.05), side: THREE.DoubleSide }));
    m.position.set(x, y, z);
    m.scale.set(w, h, 1);
    m.lookAt(0, 0, 0);
    s.add(m);
  });
  const p = new THREE.PMREMGenerator(renderer);
  const rt = p.fromScene(s, 0.03);
  p.dispose();
  return rt;
}
