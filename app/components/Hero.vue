<template>
  <section id="hero">
    <!-- Floating Tech Stack Icons Background (Monochrome & Low Opacity) -->
    <div class="hero-bg-icons">
      <div v-for="(icon, index) in icons" :key="index" :class="['floating-icon', `icon-${index + 1}`]" :title="icon.name">
        <img :src="`https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${icon.slug}.svg`" :alt="icon.name" />
      </div>
    </div>

    <!-- Center Hero Content -->
    <div class="hero-content" :class="{ 'entered': active }">
      <div class="hero-pretitle">HI, MY NAME IS</div>
      <h1 class="hero-title">Muhammad Raffy<br />Andra Hadyan</h1>
      <div class="hero-subtitle-container">
        <transition name="fade" mode="out-in">
          <span :key="currentRole" class="hero-subtitle">{{ currentRole }}</span>
        </transition>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <span class="scroll-text">Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const roles = [
  "Fullstack Web Developer",
  "React Developer",
  "Node.js Engineer",
  "Database Architect",
  "Fullstack Builder"
]

const currentRoleIndex = ref(0)
const currentRole = ref(roles[0])
let roleInterval: any = null

const icons = [
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'TailwindCSS', slug: 'tailwindcss' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Express.js', slug: 'express' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Git', slug: 'git' },
  { name: 'GitHub', slug: 'github' },
  { name: 'Docker', slug: 'docker' },
  { name: 'VS Code', slug: 'visualstudiocode' }
]

onMounted(() => {
  roleInterval = setInterval(() => {
    currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length
    currentRole.value = roles[currentRoleIndex.value]
  }, 3500)
})

onBeforeUnmount(() => {
  if (roleInterval) clearInterval(roleInterval)
})
</script>

<style scoped lang="scss">
#hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
  overflow: hidden;
}

.hero-bg-icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.floating-icon {
  position: absolute;
  width: clamp(35px, 4.5vw, 55px);
  height: clamp(35px, 4.5vw, 55px);
  opacity: 0.18;
  filter: brightness(0) invert(1);
  transition: opacity 0.4s, filter 0.4s;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

// Icon Positions & Animations
.icon-1 { top: 12%; left: 8%; animation: floatY1 18s ease-in-out infinite; }
.icon-2 { top: 22%; left: 82%; animation: floatX1 22s ease-in-out infinite; }
.icon-3 { top: 72%; left: 10%; animation: floatY2 16s ease-in-out infinite; }
.icon-4 { top: 78%; left: 78%; animation: floatX2 20s ease-in-out infinite; }
.icon-5 { top: 48%; left: 88%; animation: floatY3 19s ease-in-out infinite; }
.icon-6 { top: 62%; left: 4%; animation: floatX1 25s ease-in-out infinite; }
.icon-7 { top: 38%; left: 72%; animation: floatY1 17s ease-in-out infinite; }
.icon-8 { top: 8%; left: 62%; animation: floatX2 21s ease-in-out infinite; }
.icon-9 { top: 52%; left: 14%; animation: floatY2 23s ease-in-out infinite; }
.icon-10 { top: 18%; left: 28%; animation: floatX1 15s ease-in-out infinite; }
.icon-11 { top: 74%; left: 38%; animation: floatY3 24s ease-in-out infinite; }
.icon-12 { top: 88%; left: 24%; animation: floatX2 18s ease-in-out infinite; }
.icon-13 { top: 32%; left: 92%; animation: floatY1 26s ease-in-out infinite; }
.icon-14 { top: 6%; left: 22%; animation: floatX1 20s ease-in-out infinite; }

@keyframes floatY1 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes floatY2 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(25px) rotate(-10deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes floatY3 {
  0% { transform: translateY(0) translateX(0) rotate(0deg); }
  50% { transform: translateY(-20px) translateX(15px) rotate(8deg); }
  100% { transform: translateY(0) translateX(0) rotate(0deg); }
}
@keyframes floatX1 {
  0% { transform: translateX(0) translateY(0) rotate(0deg); }
  50% { transform: translateX(20px) translateY(-15px) rotate(-12deg); }
  100% { transform: translateX(0) translateY(0) rotate(0deg); }
}
@keyframes floatX2 {
  0% { transform: translateX(0) rotate(0deg); }
  50% { transform: translateX(-25px) rotate(10deg); }
  100% { transform: translateX(0) rotate(0deg); }
}

.hero-content {
  text-align: center;
  z-index: 2;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);

  &.entered {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-pretitle {
  font-family: $font-mono;
  font-size: 1rem;
  color: $accent-color;
  margin-bottom: 1.5rem;
  letter-spacing: 0.15em;
}

.hero-title {
  font-family: $font-display;
  font-size: clamp(2.5rem, 6.2vw, 6.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: $text-primary;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
}

.hero-subtitle-container {
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.hero-subtitle {
  font-family: $font-mono;
  font-size: 1.35rem;
  color: $text-secondary;
}

// Fade transition for rotating subtitle
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
  opacity: 0;
  animation: fadeIn 1s ease forwards 1.5s;
}

.scroll-text {
  font-family: $font-mono;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: $text-secondary;
  letter-spacing: 0.15em;
}

.scroll-line {
  width: 1px;
  height: 50px;
  background-color: $border-color;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    background-color: $accent-color;
    animation: scrollAnim 2s infinite ease-in-out;
  }
}

@keyframes scrollAnim {
  0% { transform: translateY(-20px); }
  50% { transform: translateY(50px); }
  100% { transform: translateY(-20px); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
