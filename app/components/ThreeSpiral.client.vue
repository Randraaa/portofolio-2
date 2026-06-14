<template>
  <div class="three-canvas-container" ref="canvasContainer">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'

const props = defineProps({
  entered: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['transition-complete'])

const canvasContainer = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let points: THREE.Points
let geometry: THREE.BufferGeometry
let material: THREE.PointsMaterial

// Mouse coordinates targeting
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

// Galaxy parameters
const parameters = {
  count: 4000,
  size: 0.012,
  radius: 5,
  branches: 3,
  spin: 1.8,
  randomness: 0.35,
  randomnessPower: 3,
  insideColor: '#00ff88',
  outsideColor: '#0A0A0A'
}

const handleMouseMove = (event: MouseEvent) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2
}

const handleResize = () => {
  if (!camera || !renderer || !canvasContainer.value) return
  
  const width = window.innerWidth
  const height = window.innerHeight
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

onMounted(() => {
  if (!canvasRef.value) return

  try {
    // Scene setup
    scene = new THREE.Scene()

    // Camera setup
    const width = window.innerWidth
    const height = window.innerHeight
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 2.5
    camera.position.z = 4.5
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    scene.add(camera)

    // Galaxy Generator
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.count; i++) {
      const r = Math.random() * parameters.radius
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2
      const spinAngle = r * parameters.spin

      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * r
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * r
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * r

      positions[i * 3 + 0] = Math.cos(branchAngle + spinAngle) * r + randomX
      positions[i * 3 + 1] = randomY
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ

      const mixedColor = colorInside.clone().lerp(colorOutside, r / parameters.radius)
      colors[i * 3 + 0] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Material setup
    material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    })

    points = new THREE.Points(geometry, material)
    scene.add(points)

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Animation Loop
    const clock = new THREE.Clock()
    let animationId = 0

    const tick = () => {
      if (!points || !renderer || !scene || !camera) return
      
      const elapsedTime = clock.getElapsedTime()
      points.rotation.y = elapsedTime * 0.04

      // Mouse movement lerp for lag rotation effect
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05
      
      points.rotation.x = targetY * 0.15
      points.rotation.z = targetX * 0.15

      renderer.render(scene, camera)
      animationId = window.requestAnimationFrame(tick)
    }
    tick()

    onBeforeUnmount(() => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      window.cancelAnimationFrame(animationId)
      
      // Dispose resources
      if (geometry) geometry.dispose()
      if (material) material.dispose()
      if (renderer) renderer.dispose()
    })
  } catch (error) {
    console.warn('Three.js failed to initialize:', error)
  }
})

// Watch for the 'entered' trigger to fire transition
watch(() => props.entered, (isEntered) => {
  if (isEntered) {
    if (!camera || !points || !material) {
      emit('transition-complete')
      return
    }

    // 1. Move camera down into the galaxy core
    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: 0.1,
      duration: 2.0,
      ease: 'power3.in',
      onUpdate: () => {
        if (camera) camera.lookAt(new THREE.Vector3(0, 0, 0))
      }
    })

    // 2. Scale up/disperse particles to simulate flying past them
    gsap.to(points.scale, {
      x: 2.5,
      y: 2.5,
      z: 2.5,
      duration: 2.0,
      ease: 'power2.in'
    })

    // 3. Fade out material size to disappear completely
    gsap.to(material, {
      size: 0,
      duration: 1.8,
      ease: 'power2.in',
      onComplete: () => {
        emit('transition-complete')
      }
    })
  }
})
</script>

<style scoped lang="scss">
.three-canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}
canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
