import * as THREE from "three";
import { glowTexture, mountStage, studio } from "./stage";

/** A folded paper boat, alone on a dark sea. */
const WAVES = [
  [0.21, 1.0, 0.35, 0.95], [0.12, -0.6, 1.3, 1.3], [0.075, 1.9, 1.1, 1.7], [0.045, -2.3, 1.7, 2.2], [0.026, 3.6, -2.4, 2.9],
];
const height = (x: number, z: number, t: number) => WAVES.reduce((s, [a, kx, kz, w]) => s + a * Math.sin(x * kx + z * kz + t * w * 0.7), 0);
const glslHeight = `float h(vec2 p,float t){float s=0.;${WAVES.map(([a, kx, kz, w]) => `s+=${a.toFixed(4)}*sin(dot(p,vec2(${kx.toFixed(3)},${kz.toFixed(3)}))+t*${(w * 0.7).toFixed(4)});`).join("")}return s;}`;

function boatGeometry() {
  const bow = [-1.75, 0.95, 0], stern = [1.75, 0.95, 0], k1 = [-0.95, -0.12, 0], k2 = [0.95, -0.12, 0];
  const p = [0, 0.48, 0.74], q = [0, 0.48, -0.74], top = [0, 1.45, 0], l = [-0.85, 0.42, 0], r = [0.85, 0.42, 0], f = [0, 0.4, 0.3], b = [0, 0.4, -0.3];
  const tri = [
    bow, k1, p, k1, k2, p, k2, stern, p, bow, q, k1, k1, q, k2, k2, q, stern,
    bow, p, l, l, p, f, f, p, r, r, p, stern, bow, l, q, l, b, q, b, r, q, r, stern, q,
    l, f, top, f, r, top, l, top, b, b, top, r,
  ];
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(tri.flat(), 3));
  g.computeVertexNormals();
  return g;
}

export const mountSea = (host: HTMLElement) =>
  mountStage(host, ({ scene, camera, renderer }) => {
    const bg = new THREE.Color(0x0c0d0e);
    scene.background = bg;
    const env = studio(renderer, [[-5, 7, 2, 7, 5, 4], [6, 3, -4, 3, 6, 3]]);
    renderer.toneMappingExposure = 1;

    const uni = { t: { value: 0 }, lamp: { value: new THREE.Vector3() }, bg: { value: bg } };
    const sea = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60, 220, 220).rotateX(-Math.PI / 2),
      new THREE.ShaderMaterial({
        uniforms: uni,
        vertexShader: `uniform float t;varying vec3 w;${glslHeight}
          void main(){vec3 p=position;p.y+=h(p.xz,t);w=p;gl_Position=projectionMatrix*viewMatrix*vec4(p,1.);}`,
        fragmentShader: `uniform float t;uniform vec3 lamp,bg;varying vec3 w;${glslHeight}
          float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
          float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
          float d(vec2 p){float s=h(p,t);vec2 q=p*vec2(2.1,3.2);float a=.034;
            for(int i=0;i<5;i++){s+=a*(n(q+vec2(t*.5,t*.22)*(1.+float(i)*.35))+.5*n(q*1.1-vec2(t*.3,t*.4)));q=mat2(1.5,1.1,-1.1,1.5)*q;a*=.46;}return s;}
          void main(){
            float dist=length(cameraPosition-w),e=.015+dist*.0016;
            float c=d(w.xz);
            vec3 N=normalize(vec3(c-d(w.xz+vec2(e,0)),e*1.15,c-d(w.xz+vec2(0,e))));
            vec3 V=normalize(cameraPosition-w),R=reflect(-V,N);
            float fr=.03+.97*pow(1.-max(dot(N,V),0.),5.);
            float sky=smoothstep(0.,1.,R.y)*.1+pow(max(dot(R,normalize(vec3(-.5,.45,-.75))),0.),8.)*1.05;
            vec3 col=vec3(.004,.005,.006)+sky*(fr*.9+.022)*vec3(.9,.97,1.);
            vec3 L=lamp-w;float ld=length(L);
            col+=vec3(1.,.07,.02)*(pow(max(dot(R,L/ld),0.),14.)*.9+.012)/(1.+ld*ld*1.2);
            col=mix(col,bg*.35,smoothstep(9.,24.,dist));
            gl_FragColor=vec4(col,1.);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`,
      }),
    );
    sea.frustumCulled = false;
    scene.add(sea);

    const boat = new THREE.Group();
    const hull = new THREE.Mesh(boatGeometry(), new THREE.MeshStandardMaterial({ color: 0xd9dcdc, roughness: 0.72, metalness: 0, side: THREE.DoubleSide, flatShading: true, envMap: env.texture, envMapIntensity: 0.5 }));
    boat.add(hull);
    boat.scale.setScalar(0.56);
    scene.add(boat);
    const key = new THREE.DirectionalLight(0xe8f0f4, 1.9);
    key.position.set(-5, 5, 2);
    scene.add(key, new THREE.HemisphereLight(0xb8c6cc, 0x1a1d1f, 0.55));

    const tex = glowTexture();
    const red = 0xff1d0c;
    const halos = [-1, 1].map((s) => {
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.05, 14, 12), new THREE.MeshBasicMaterial({ color: red, toneMapped: false }));
      bulb.position.set(s * 1.72, 1.0, 0);
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: red, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
      halo.scale.setScalar(0.8);
      halo.position.copy(bulb.position);
      boat.add(bulb, halo);
      return halo;
    });
    const lamp = new THREE.PointLight(red, 2, 3);
    lamp.position.set(1.8, 1.1, 0.1);
    boat.add(lamp);

    const up = new THREE.Vector3(0, 1, 0), nrm = new THREE.Vector3(), tilt = new THREE.Quaternion(), yaw = new THREE.Quaternion();
    return {
      frame({ t, px, py, aspect }) {
        uni.t.value = t;
        const e = 0.6, y = height(0, 0, t);
        nrm.set(height(-e, 0, t) - height(e, 0, t), 2 * e, height(0, -e, t) - height(0, e, t)).normalize();
        tilt.setFromUnitVectors(up, nrm);
        yaw.setFromAxisAngle(up, -0.62 + Math.sin(t * 0.22) * 0.16 + px * 0.15);
        boat.quaternion.slerp(tilt.multiply(yaw), 0.12);
        boat.position.set(0, y + 0.02, 0);
        lamp.getWorldPosition(uni.lamp.value);
        const pulse = Math.max(0.25, Math.sin(t * 2.2));
        halos.forEach((h) => (h.material.opacity = 0.35 + 0.65 * pulse));
        lamp.intensity = 0.8 + 1.4 * pulse;
        const far = aspect < 0.8 ? 1.5 : 1;
        camera.position.set(px * 0.6, (5.6 - py * 0.4) * far, 8.2 * far);
        camera.lookAt(aspect < 0.8 ? 0 : -0.1, 0.45, 0);
      },
      dispose() { env.dispose(); tex.dispose(); },
    };
  });
