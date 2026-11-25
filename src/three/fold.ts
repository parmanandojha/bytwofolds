import * as THREE from "three";
import { glowTexture, mountStage, studio } from "./stage";

/*
 * The hero object: a Miura-ori sheet (a rigid fold with one degree of freedom) wrapped
 * into a drum. It breathes, leans toward the pointer, and unrolls as the page scrolls.
 */
const NI = 44, NJ = 16; // facets around, facets along
const A = 0.34, B = 0.3, GAMMA = THREE.MathUtils.degToRad(58);

export const mountFold = (host: HTMLElement) =>
  mountStage(host, ({ scene, camera, renderer }) => {
    scene.background = new THREE.Color(0x0b0c0d);
    const env = studio(renderer, [
      [-7, 4, 3, 5, 9, 9],
      [6, 7, -4, 10, 3, 12],
      [8, -2, 3, 1.2, 9, 7],
      [0, -8, 2, 9, 1, 1.4],
    ]);
    scene.environment = env.texture;
    renderer.toneMappingExposure = 0.95;
    camera.position.set(0, 0, 11);

    const tris = NI * NJ * 6;
    const pos = new Float32Array(tris * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(tris * 3), 3).setUsage(THREE.DynamicDrawUsage));
    const index: number[] = [];
    for (let i = 0; i < NI; i++)
      for (let j = 0; j < NJ; j++) {
        const a = i * (NJ + 1) + j, b = a + NJ + 1;
        index.push(a, b, a + 1, b, b + 1, a + 1);
      }
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x8d9294, metalness: 0.92, roughness: 0.3, side: THREE.DoubleSide, flatShading: false, clearcoat: 0.25, clearcoatRoughness: 0.4,
    });
    const group = new THREE.Group();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    group.add(mesh);
    scene.add(group);

    // A second, smaller drum turns the other way inside the first
    const inner = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: 0x4a4e50, metalness: 0.95, roughness: 0.26, side: THREE.DoubleSide }));
    inner.frustumCulled = false;
    group.add(inner);
    const heart = new THREE.PointLight(0xff1d0c, 10, 5, 1.6);
    group.add(heart);

    const tex = glowTexture();
    const lampAt: [number, number, number][] = [[3, NJ - 3, 0xff1d0c], [40, NJ - 7, 0xff1d0c], [38, NJ - 1, 0xfff0c4], [18, NJ - 3, 0xff1d0c], [24, NJ - 8, 0xff1d0c], [30, NJ - 5, 0xfff0c4]];
    const lamps = lampAt.map(([, , color]) => {
      const g = new THREE.Group();
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 16), new THREE.MeshBasicMaterial({ color, toneMapped: false }));
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.85 }));
      halo.scale.setScalar(0.85);
      const light = new THREE.PointLight(color, 5, 3.2, 2);
      g.add(bulb, halo, light);
      mesh.add(g);
      return { g, halo, light };
    });

    const pts = new Float32Array((NI + 1) * (NJ + 1) * 3);
    const solve = (theta: number, bend: number, t: number) => {
      const c = Math.cos(theta), tg = Math.tan(GAMMA), q = Math.sqrt(1 + c * c * tg * tg);
      const H = A * Math.sin(theta) * Math.sin(GAMMA);
      const S = (B * c * tg) / q, V = B / q;
      const L = A * Math.sqrt(1 - Math.sin(theta) ** 2 * Math.sin(GAMMA) ** 2);
      const W = NI * S, R = W / (Math.PI * 2 * Math.max(bend, 0.02));
      const offset = bend > 0.02 ? R : 0;
      for (let i = 0; i <= NI; i++)
        for (let j = 0; j <= NJ; j++) {
          const x = S * i - W / 2;
          const y = L * j + V * (i % 2) - (L * NJ) / 2;
          const swell = 0.06 * Math.sin(j * 0.55 + t * 0.8) * bend;
          const z = H * (j % 2) + swell;
          const a = x / R, r = R + z;
          const k = (i * (NJ + 1) + j) * 3;
          pts[k] = Math.sin(a) * r;
          pts[k + 1] = y;
          pts[k + 2] = Math.cos(a) * r - offset * (1 - bend);
        }
      for (let n = 0; n < index.length; n++) {
        const k = index[n] * 3;
        pos[n * 3] = pts[k]; pos[n * 3 + 1] = pts[k + 1]; pos[n * 3 + 2] = pts[k + 2];
      }
      geo.attributes.position.needsUpdate = true;
      geo.computeVertexNormals(); // non-indexed, so each facet stays flat
    };

    const rim = new THREE.Vector3(1.05, 1, 1.05);
    let intro = 0, last = 0;
    return {
      frame({ t, px, py, scroll, aspect }) {
        const dt = Math.min(0.05, t - last); last = t;
        intro += (1 - intro) * (dt ? Math.min(1, dt * 1.1) : 1);
        const open = THREE.MathUtils.smoothstep(scroll, 0.02, 0.95);
        const theta = THREE.MathUtils.degToRad(60 + Math.sin(t * 0.55) * 5 + px * 4 - (1 - intro) * 34) * (1 - open * 0.55);
        const bend = 1 - open * 0.8;
        solve(theta, bend, t);

        const portrait = aspect < 0.9;
        const mid = aspect >= 0.9 && aspect < 1.3;
        group.position.set(portrait ? 0.15 : mid ? 1.1 : 1.35, portrait ? 0.15 : 0.1, portrait ? -3.4 : 0);
        group.scale.setScalar(1.12);
        group.rotation.set(0.72 + py * 0.12 - open * 0.5, 0, -0.72 + px * 0.06 + open * 0.25);
        mesh.rotation.y = Math.sin(t * 0.12) * 0.5 + px * 0.25;
        inner.rotation.y = -t * 0.16;
        inner.position.y = 0.75 * (1 - open);
        inner.scale.set(0.62, 0.86, 0.62);
        inner.visible = open < 0.55;
        heart.position.y = 2.3;
        heart.intensity = (9 + 3 * Math.sin(t * 1.8)) * (1 - open);

        lamps.forEach(({ g, halo, light }, n) => {
          const [i, j] = lampAt[n];
          const k = (i * (NJ + 1) + j) * 3;
          g.position.set(pts[k], pts[k + 1], pts[k + 2]).multiply(rim);
          const pulse = 0.75 + 0.25 * Math.sin(t * 1.8 + n * 2.1);
          halo.material.opacity = 0.9 * pulse;
          light.intensity = 6 * pulse;
        });
      },
      dispose() { env.dispose(); tex.dispose(); },
    };
  });
