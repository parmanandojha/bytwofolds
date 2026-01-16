<template>
  <div ref="webglContainer" class="absolute inset-0 w-full h-full z-0"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const webglContainer = ref(null)
let scene, camera, renderer, material, mesh
let animationId = null

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  // Animated particles
  float particles(vec2 uv, float time) {
    float particleField = 0.0;
    
    // Create multiple layers of particles
    for(int i = 0; i < 8; i++) {
      float layer = float(i);
      vec2 particlePos = vec2(
        sin(time * 0.3 + layer * 0.5) * 0.3 + 0.5,
        cos(time * 0.2 + layer * 0.7) * 0.3 + 0.5
      );
      
      float dist = distance(uv, particlePos);
      float size = 0.03 + sin(time + layer) * 0.015;
      float brightness = 1.0 - smoothstep(0.0, size, dist);
      brightness *= 0.6;
      
      particleField += brightness;
    }
    
    return particleField;
  }
  
  // Flowing waves
  float waves(vec2 uv, float time) {
    vec2 p = uv * 3.0;
    float wave = sin(p.x * 2.0 + time * 0.5) * 0.5 + 0.5;
    wave += sin(p.y * 1.5 + time * 0.3) * 0.3;
    wave += sin((p.x + p.y) * 1.0 + time * 0.7) * 0.2;
    wave = wave / 1.5;
    return wave;
  }
  
  // Radial gradient from center
  float radialGradient(vec2 uv) {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(uv, center);
    return 1.0 - smoothstep(0.0, 0.7, dist);
  }
  
  void main() {
    vec2 uv = vUv;
    float time = uTime;
    
    // Base dark color
    vec3 color = vec3(0.0, 0.0, 0.0);
    
    // Add flowing wave pattern
    float wavePattern = waves(uv, time);
    vec3 waveColor = vec3(0.05, 0.05, 0.12) * wavePattern;
    color += waveColor;
    
    // Add particle field
    float particleField = particles(uv, time);
    vec3 particleColor = vec3(0.2, 0.25, 0.4) * particleField;
    color += particleColor;
    
    // Add subtle noise texture
    float n = noise(uv * 5.0 + time * 0.1);
    color += vec3(n * 0.03);
    
    // Add radial vignette effect
    float vignette = radialGradient(uv);
    color *= (0.8 + vignette * 0.2);
    
    // Add subtle blue tint in center
    float centerGlow = 1.0 - distance(uv, vec2(0.5, 0.5)) * 1.5;
    centerGlow = max(0.0, centerGlow);
    color += vec3(0.03, 0.05, 0.08) * centerGlow;
    
    // Ensure it stays dark but more visible
    color = clamp(color, vec3(0.0), vec3(0.3));
    
    gl_FragColor = vec4(color, 1.0);
  }
`

const initWebGL = () => {
  if (!webglContainer.value) return

  // Scene setup
  scene = new THREE.Scene()
  
  // Camera setup
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    powerPreference: "high-performance"
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  webglContainer.value.appendChild(renderer.domElement)
  
  // Shader material
  material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader,
    fragmentShader
  })
  
  // Create fullscreen quad
  const geometry = new THREE.PlaneGeometry(2, 2)
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  
  // Animation loop
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    
    if (material && material.uniforms) {
      material.uniforms.uTime.value += 0.01
    }
    
    renderer.render(scene, camera)
  }
  
  animate()
  
  // Handle resize
  const handleResize = () => {
    if (!renderer || !camera || !material) return
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (material.uniforms && material.uniforms.uResolution) {
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    if (renderer) {
      renderer.dispose()
    }
    if (material) {
      material.dispose()
    }
    if (geometry) {
      geometry.dispose()
    }
    if (webglContainer.value && renderer.domElement) {
      webglContainer.value.removeChild(renderer.domElement)
    }
  }
}

let cleanup = null

onMounted(() => {
  cleanup = initWebGL()
})

onUnmounted(() => {
  if (cleanup) {
    cleanup()
  }
})
</script>

<style scoped>
div {
  pointer-events: none;
}
</style>
