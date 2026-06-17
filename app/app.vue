<template>
  <div class="app-wrapper" :class="{ 'no-cursor': isDesktop }">
    <!-- Custom Cursor Elements -->
    <div ref="cursorDot" id="cursor-dot"></div>
    <div ref="cursorGlow" id="cursor-glow"></div>

    <!-- Splash Screen / Entry -->
    <div v-if="!splashDismissed" id="splash-screen" :class="{ 'fade-out': entered }">
      <ThreeSpiral :entered="entered" @transition-complete="onTransitionComplete" />
      
      <div class="terminal-container">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">bash - portfolio_init.sh</span>
        </div>
        <div class="terminal-body">
          <div class="terminal-output">
            <div class="terminal-line">
              <span class="prompt"></span>{{ typedLineInit }}<span v-if="activeCursor === 1" class="terminal-cursor"></span>
            </div>
            <!-- EDIT: Ganti teks nama/profesi terminal splash screen -->
            <div class="terminal-line name">
              <span class="prompt"></span>{{ typedLineName }}<span v-if="activeCursor === 2" class="terminal-cursor"></span>
            </div>
            <div class="terminal-line role">
              <span class="prompt"></span>{{ typedLineRole }}<span v-if="activeCursor === 3" class="terminal-cursor"></span>
            </div>
          </div>
          
          <div class="audio-selection" :class="{ 'visible': typingComplete }">
            <button class="audio-btn" @click="enterSite(true)">ENTER WITH SOUND</button>
            <button class="audio-btn alt" @click="enterSite(false)">ENTER WITHOUT SOUND</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Layout Content -->
    <div :class="['main-layout', { 'layout-visible': entered }]">
      <!-- Header Navigation -->
      <header id="main-header" :class="{ 'scrolled': isScrolled }">
        <div class="header-container">
          <!-- EDIT: Logo Utama -->
          <a href="#" class="logo" @click.prevent="scrollToTop">Randra.</a>
          
          <nav class="desktop-nav">
            <a href="#works" class="nav-link" @click.prevent="scrollToSection('works')">Works</a>
            <a href="#about" class="nav-link" @click.prevent="scrollToSection('about')">About</a>
            <a href="#experience" class="nav-link" @click.prevent="scrollToSection('experience')">Experience</a>
            <a href="#stack" class="nav-link" @click.prevent="scrollToSection('stack')">Stack</a>
            <a href="#contact" class="nav-link" @click.prevent="scrollToSection('contact')">Contact</a>
          </nav>
          
          <button class="burger-menu" :class="{ 'active': mobileMenuOpen }" @click="toggleMobileMenu" aria-label="Buka Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <!-- Mobile Overlay Navigation -->
      <div class="mobile-menu-overlay" :class="{ 'active': mobileMenuOpen }">
        <nav class="mobile-nav">
          <a href="#works" class="mobile-nav-link" @click.prevent="scrollToSection('works')">Works</a>
          <a href="#about" class="mobile-nav-link" @click.prevent="scrollToSection('about')">About</a>
          <a href="#experience" class="mobile-nav-link" @click.prevent="scrollToSection('experience')">Experience</a>
          <a href="#stack" class="mobile-nav-link" @click.prevent="scrollToSection('stack')">Stack</a>
          <a href="#contact" class="mobile-nav-link" @click.prevent="scrollToSection('contact')">Contact</a>
        </nav>
      </div>

      <!-- Main Website Components -->
      <main>
        <Hero :active="heroActive" />
        <Works />
        <About />
        <Experience />
        <Stack />
        <Contact />
      </main>

      <!-- Footer -->
      <footer>
        <div class="footer-text">
          &copy; <span>{{ currentYear }}</span> Muhammad Raffy Andra Hadyan. All rights reserved.
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

const entered = ref(false)
const splashDismissed = ref(false)
const heroActive = ref(false)
const typingComplete = ref(false)
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const isDesktop = ref(false)
const currentYear = ref(new Date().getFullYear())

const cursorDot = ref<HTMLDivElement | null>(null)
const cursorGlow = ref<HTMLDivElement | null>(null)

// Sound triggers
const isSoundActive = ref(false)
let droneSound: any = null
let whooshSound: any = null
let clickSound: any = null

let lenis: Lenis | null = null

const typedLineInit = ref('')
const typedLineName = ref('')
const typedLineRole = ref('')
const activeCursor = ref(1)

// Terminal text initialization
const text1 = "> Initializing portfolio..."
const text2 = "> Muhammad Raffy Andra Hadyan"
const text3 = "> Fullstack Web Developer"

// Reusable typing writer function
function typeWriter(text: string, speed: number, targetRef: any, callback?: () => void) {
  let i = 0
  targetRef.value = ''
  
  function type() {
    if (i < text.length) {
      targetRef.value += text.charAt(i)
      i++
      setTimeout(type, speed)
    } else if (callback) {
      callback()
    }
  }
  type()
}

const runTypingSequence = () => {
  typeWriter(text1, 25, typedLineInit, () => {
    activeCursor.value = 2
    setTimeout(() => {
      typeWriter(text2, 20, typedLineName, () => {
        activeCursor.value = 3
        setTimeout(() => {
          typeWriter(text3, 20, typedLineRole, () => {
            activeCursor.value = 0
            setTimeout(() => {
              typingComplete.value = true
            }, 1000)
          })
        }, 300)
      })
    }, 500)
  })
}

// Enter website click handler
const enterSite = (withSound: boolean) => {
  entered.value = true
  isSoundActive.value = withSound

  if (withSound && whooshSound) {
    whooshSound.play()
    setTimeout(() => {
      if (droneSound) droneSound.play()
    }, 1000)
  }

  // Fallback timer: in case Three.js transition fails or doesn't emit transition-complete,
  // we dismiss the splash screen anyway after 2.2 seconds!
  setTimeout(() => {
    splashDismissed.value = true
    heroActive.value = true
  }, 2200)

  // Unlock scrolling once site is entered
  setTimeout(() => {
    if (lenis) lenis.start()
  }, 1800)
}

// When Three.js camera flythrough finishes, dismiss splash completely
const onTransitionComplete = () => {
  splashDismissed.value = true
  heroActive.value = true
}

// Scroll controllers
const scrollToSection = (id: string) => {
  mobileMenuOpen.value = false
  document.body.classList.remove('no-scroll')
  
  const el = document.getElementById(id)
  if (el && lenis) {
    lenis.scrollTo(el, { offset: -50 })
  }
}

const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0)
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.classList.add('no-scroll')
    if (lenis) lenis.stop()
  } else {
    document.body.classList.remove('no-scroll')
    if (lenis) lenis.start()
  }
}

onMounted(async () => {
  // Check if pointer device is fine (desktop)
  isDesktop.value = window.matchMedia('(pointer: fine)').matches

  // Initialize scroll listeners
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })

  // Start terminal typing sequence
  runTypingSequence()

  // ----------------------------------------------------
  // Dynamic SSR-safe Howler.js Load
  // ----------------------------------------------------
  if (process.client) {
    const { Howl } = await import('howler')
    
    droneSound = new Howl({
      src: ['https://cdn.pixabay.com/audio/2022/03/24/audio_73145452d3.mp3'],
      loop: true,
      volume: 0.2,
      html5: true
    })

    whooshSound = new Howl({
      src: ['https://cdn.pixabay.com/audio/2021/11/25/audio_2d4d3a24b1.mp3'],
      volume: 0.5
    })

    clickSound = new Howl({
      src: ['https://cdn.pixabay.com/audio/2022/03/10/audio_c230dc1c05.mp3'],
      volume: 0.1
    })
  }

  // ----------------------------------------------------
  // Custom Cursor LERP (Desktop Only)
  // ----------------------------------------------------
  if (isDesktop.value && cursorDot.value && cursorGlow.value) {
    let mouseX = 0, mouseY = 0
    let glowX = 0, glowY = 0

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      if (cursorDot.value) {
        cursorDot.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      }
    })

    function animateCursor() {
      const dx = mouseX - glowX
      const dy = mouseY - glowY
      
      glowX += dx * 0.15
      glowY += dy * 0.15
      
      if (cursorGlow.value) {
        cursorGlow.value.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`
      }
      requestAnimationFrame(animateCursor)
    }
    requestAnimationFrame(animateCursor)

    // Cursor element hover effects (event delegation)
    document.addEventListener('mouseover', (e: any) => {
      const target = e.target.closest('a, button, .project-card, .tech-card, .stat-card, .audio-btn')
      if (target) {
        cursorGlow.value?.classList.add('expand')
        cursorDot.value?.classList.add('accent')
        if (isSoundActive.value && clickSound) {
          clickSound.play()
        }
      }
    })

    document.addEventListener('mouseout', (e: any) => {
      const target = e.target.closest('a, button, .project-card, .tech-card, .stat-card, .audio-btn')
      if (target) {
        cursorGlow.value?.classList.remove('expand')
        cursorDot.value?.classList.remove('accent')
      }
    })
  }

  // ----------------------------------------------------
  // Lenis Smooth Scroll
  // ----------------------------------------------------
  gsap.registerPlugin(ScrollTrigger)

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1.0
  })

  // Lock scroll initially for splash screen
  lenis.stop()

  function raf(time: number) {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
})

onBeforeUnmount(() => {
  if (lenis) lenis.destroy()
  if (droneSound) droneSound.stop()
})
</script>

<style lang="scss">
/* Layout-specific root and global resets/transitions */
.app-wrapper {
  background-color: $bg-color;
  min-height: 100vh;
  position: relative;
  
  &.no-cursor {
    cursor: none;
  }
}

/* Splash Screen layout */
#splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: $bg-color;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;

  &.fade-out {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-50px) scale(0.98);
  }
}

.terminal-container {
  width: 90%;
  max-width: 600px;
  background-color: rgba(15, 15, 15, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid $border-color;
  border-radius: 6px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  z-index: 2;
}

.terminal-header {
  background-color: rgba(22, 22, 22, 0.9);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid $border-color;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.terminal-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;

  &.red { background-color: #FF5F56; }
  &.yellow { background-color: #FFBD2E; }
  &.green { background-color: #27C93F; }
}

.terminal-title {
  font-family: $font-mono;
  font-size: 0.75rem;
  color: $text-secondary;
  margin-left: 0.5rem;
}

.terminal-body {
  padding: 2rem;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
}

.terminal-output {
  font-family: $font-mono;
  font-size: 0.95rem;
  line-height: 1.6;
  width: 100%;
}

.terminal-line {
  margin-bottom: 0.5rem;
  min-height: 1.5rem;

  &.name {
    font-family: $font-display;
    font-size: 1.5rem;
    font-weight: 700;
    color: #FFFFFF;
    margin-top: 1rem;
  }

  &.role {
    color: $accent-color;
    font-weight: 500;
  }
}

.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  background-color: $accent-color;
  animation: blink 1s step-end infinite;
  vertical-align: middle;
  margin-left: 4px;
}

@keyframes blink {
  from, to { background-color: transparent }
  50% { background-color: $accent-color }
}

.audio-selection {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.audio-btn {
  flex: 1;
  font-family: $font-mono;
  font-size: 0.8rem;
  background-color: transparent;
  border: 1px solid $accent-color;
  color: $accent-color;
  padding: 0.85rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 255, 136, 0.1);
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.35);
  }

  &.alt {
    border-color: rgba(255, 255, 255, 0.2);
    color: $text-secondary;

    &:hover {
      border-color: #FFFFFF;
      color: #FFFFFF;
      background-color: rgba(255, 255, 255, 0.05);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
    }
  }
}

/* Main Layout visibility */
.main-layout {
  opacity: 0;
  visibility: hidden;
  transition: opacity 1s ease 0.5s, visibility 1s ease 0.5s;

  &.layout-visible {
    opacity: 1;
    visibility: visible;
  }
}

/* Header navigation bar styling */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: background-color 0.4s, border-color 0.4s, backdrop-filter 0.4s;
  border-bottom: 1px solid transparent;

  &.scrolled {
    background-color: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
}

.logo {
  font-family: $font-display;
  font-size: 1.35rem;
  font-weight: 700;
  color: $text-primary;
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: color 0.3s;

  &:hover {
    color: $accent-color;
  }
}

.desktop-nav {
  display: flex;
  gap: 2.5rem;
}

.nav-link {
  font-family: $font-mono;
  font-size: 0.875rem;
  color: $text-secondary;
  text-decoration: none;
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: $text-primary;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1.5px;
    bottom: -4px;
    left: 0;
    background-color: $accent-color;
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover::after {
    width: 100%;
  }
}

/* Mobile burger button */
.burger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  padding: 0;
  z-index: 1002;

  span {
    width: 100%;
    height: 2px;
    background-color: $text-primary;
    transition: transform 0.3s, opacity 0.3s, background-color 0.3s;
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .burger-menu {
    display: flex;
  }
}

/* Mobile Navigation Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &.active {
    opacity: 1;
    pointer-events: auto;
  }
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  text-align: center;
}

.mobile-nav-link {
  font-family: $font-display;
  font-size: 2.5rem;
  font-weight: 600;
  color: $text-secondary;
  text-decoration: none;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: $accent-color;
    transform: scale(1.05);
  }
}

/* Burger Active State */
.burger-menu.active {
  span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
    background-color: $accent-color;
  }

  span:nth-child(2) {
    opacity: 0;
  }

  span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
    background-color: $accent-color;
  }
}

/* Footer Section */
footer {
  border-top: 1px solid $border-color;
  padding: 3rem 0;
  text-align: center;
  margin-top: 8rem;
}

.footer-text {
  font-family: $font-mono;
  font-size: 0.75rem;
  color: $text-muted;
}
</style>
