<template>
  <section id="works">
    <div class="section-header works-header">
      <div class="header-left">
        <span class="section-meta">[01 / portfolio]</span>
        <h2 class="section-title">My Portfolio</h2>
        <div class="portfolio-tabs">
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'projects' }" 
            @click="switchTab('projects')"
          >
            Projects
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'certificates' }" 
            @click="switchTab('certificates')"
          >
            Certificates
          </button>
        </div>
      </div>
      
      <!-- Slider Navigation Controls -->
      <div class="carousel-nav">
        <button class="nav-btn prev" @click="scroll('prev')" :aria-label="activeTab === 'projects' ? 'Previous Project' : 'Previous Certificate'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="nav-btn next" @click="scroll('next')" :aria-label="activeTab === 'projects' ? 'Next Project' : 'Next Certificate'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>

    <!-- Carousel Container -->
    <div 
      class="carousel-wrapper"
      @mousedown="startDrag"
      @mouseleave="stopDrag"
      @mouseup="stopDrag"
      @mousemove="onDrag"
    >
      <div class="carousel-track" ref="carouselTrack" @scroll="updateProgress">
        <!-- Projects View -->
        <template v-if="activeTab === 'projects'">
          <div 
            v-for="project in projects" 
            :key="project.num" 
            class="project-card"
          >
            <!-- Project Preview Image -->
            <div class="project-preview">
              <img :src="project.image" :alt="project.title" class="preview-img" loading="lazy" />
              <div class="preview-overlay">
                <a :href="project.demoUrl" target="_blank" rel="noopener" class="preview-btn">View Site ↗</a>
              </div>
            </div>

            <div class="project-details">
              <div class="card-top">
                <div class="project-num">{{ project.num }}</div>
                <span class="project-category">{{ project.category }}</span>
              </div>
              
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-desc">{{ project.desc }}</p>
              
              <div class="project-tech">
                <span v-for="t in project.tech" :key="t" class="tech-pill">{{ t }}</span>
              </div>
              
              <div class="project-links">
                <a :href="project.demoUrl" class="btn-link" target="_blank" rel="noopener">Live Demo ↗</a>
                <a :href="project.githubUrl" class="btn-link" target="_blank" rel="noopener">GitHub ↗</a>
              </div>
            </div>
          </div>
        </template>

        <!-- Certificates View -->
        <template v-else>
          <div 
            v-for="cert in certificates" 
            :key="cert.num" 
            class="project-card cert-card"
          >
            <!-- Cert Preview Image -->
            <div class="project-preview">
              <img :src="cert.image" :alt="cert.title" class="preview-img" loading="lazy" />
              <div class="preview-overlay">
                <a :href="cert.verifyUrl" target="_blank" rel="noopener" class="preview-btn">Verify Credential ↗</a>
              </div>
            </div>

            <div class="project-details">
              <div class="card-top">
                <div class="project-num">{{ cert.num }}</div>
                <span class="project-category">{{ cert.category }}</span>
              </div>
              
              <h3 class="project-title">{{ cert.title }}</h3>
              <p class="project-desc cert-desc">
                Issued by: <strong>{{ cert.issuer }}</strong><br />
                Date: {{ cert.date }}
              </p>
              
              <div class="project-links">
                <a :href="cert.verifyUrl" class="btn-link" target="_blank" rel="noopener">Verify Credential ↗</a>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Scroll Progress Indicator -->
    <div class="scroll-progress-container">
      <div class="scroll-progress-track">
        <div class="scroll-progress-fill" :style="{ width: `${scrollProgress}%` }"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Project {
  num: string
  category: string
  title: string
  desc: string
  tech: string[]
  image: string
  demoUrl: string
  githubUrl: string
}

interface Certificate {
  num: string
  category: string
  title: string
  issuer: string
  date: string
  image: string
  verifyUrl: string
}

const activeTab = ref<'projects' | 'certificates'>('projects')

const projects = ref<Project[]>([
  {
    num: '01',
    category: 'Web App',
    title: 'Umrah Buddy',
    desc: 'Platform pemandu Umrah terpercaya yang menghubungkan jamaah secara langsung dengan pemandu (muthawwif) terverifikasi untuk perjalanan ibadah personal, aman, dan bermakna. Fitur termasuk booking portal, escrow payment, dan chat terintegrasi.',
    tech: ['React', 'Vite', 'Vanilla CSS', 'Responsive UI'],
    image: '/umrah_buddy_preview.jpg',
    demoUrl: 'https://umrahbuddy-phi.vercel.app/',
    githubUrl: 'https://github.com/Randraaa'
  },
  {
    num: '02',
    category: 'Web App',
    title: 'Hotel Luxe',
    desc: 'Aplikasi pemesanan hotel mewah yang dirancang untuk pelancong modern. Pengguna dapat menjelajahi suite eksklusif, mencari ketersediaan kamar secara real-time berdasarkan tanggal dan tamu, serta menikmati alur booking premium yang responsif.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/hotel_luxe_preview.png',
    demoUrl: 'https://hotel-booking-app-alpha-ebon.vercel.app/',
    githubUrl: 'https://github.com/Randraaa'
  },
  {
    num: '03',
    category: 'Creative Front-End',
    title: 'KHAN',
    desc: 'Website showcase parfum mewah interaktif dengan estetika premium yang sinematik. Menampilkan transisi animasi intro yang elegan, pelacak kursor custom, paralaks latar belakang, serta navigasi interaktif untuk visualisasi piramida aroma.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
    image: '/khan_parfume_preview.png',
    demoUrl: 'https://khan-parfume.vercel.app/',
    githubUrl: 'https://github.com/Randraaa'
  },
  {
    num: '04',
    category: 'DevOps & API',
    title: 'RESTful API Gateway',
    desc: 'Gerbang API terdistribusi yang aman untuk memproses jutaan permintaan harian dengan pembatasan laju dinamis, caching Redis, dan orkestrasi kontainer Docker.',
    tech: ['TypeScript', 'Express.js', 'Docker', 'Redis'],
    image: '/api_gateway_preview.png',
    demoUrl: 'https://github.com/Randraaa',
    githubUrl: 'https://github.com/Randraaa'
  },
  {
    num: '05',
    category: 'Fintech App',
    title: 'Apex Financial',
    desc: 'Dashboard manajemen keuangan premium yang melacak aset, memvisualisasikan data investasi dengan grafik interaktif waktu nyata, serta menawarkan analitik tren otomatis.',
    tech: ['React', 'Next.js', 'Express.js', 'MySQL'],
    image: '/fintech_preview.png',
    demoUrl: 'https://github.com/Randraaa',
    githubUrl: 'https://github.com/Randraaa'
  },
  {
    num: '06',
    category: 'Web App',
    title: 'CineMate',
    desc: 'Platform pemesanan tiket bioskop online dengan visual seat map interaktif (VIP, Regular, Ekonomi), kode promo dinamis, pembuatan e-receipt, dan dashboard admin untuk verifikasi pemesanan & pemeliharaan kursi.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    image: '/cinemate_preview.jpg',
    demoUrl: 'https://cinemate-nu-gules.vercel.app/',
    githubUrl: 'https://github.com/Randraaa'
  }
])

const certificates = ref<Certificate[]>([
  {
    num: '01',
    category: 'AI & Creative Technology',
    title: 'Peserta - Roadshow Nextgen Tech Series (Almazing: Creative Content with AI)',
    issuer: 'Indigo & ITB STIKOM Bali',
    date: '22 Oktober 2025',
    image: '/Nextgen_Tech_Series_Almazing_Creative_Content_AI_Raffy.png',
    verifyUrl: '/Nextgen_Tech_Series_Almazing_Creative_Content_AI_Raffy.pdf'
  },
  {
    num: '02',
    category: 'Full Stack Development',
    title: 'Full Stack Web Developer Certificate',
    issuer: 'Dicoding Academy',
    date: 'Desember 2025',
    image: '/certificate_preview.jpg',
    verifyUrl: 'https://www.dicoding.com/'
  },
  {
    num: '03',
    category: 'Front-End Development',
    title: 'React & Front-End Specialist',
    issuer: 'Coursera / Meta',
    date: 'Oktober 2025',
    image: '/certificate_preview.jpg',
    verifyUrl: 'https://www.coursera.org/'
  },
  {
    num: '04',
    category: 'Back-End Development',
    title: 'Node.js & Database Architecture',
    issuer: 'Udemy / Zero To Mastery',
    date: 'Agustus 2025',
    image: '/certificate_preview.jpg',
    verifyUrl: 'https://www.udemy.com/'
  },
  {
    num: '05',
    category: 'Responsive Web Design',
    title: 'Responsive Web Design & Layouts',
    issuer: 'freeCodeCamp',
    date: 'Juni 2025',
    image: '/certificate_preview.jpg',
    verifyUrl: 'https://www.freecodecamp.org/'
  }
])

const carouselTrack = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)

// Drag variables
let isDown = false
let startX = 0
let scrollLeft = 0

const startDrag = (e: MouseEvent) => {
  if (!carouselTrack.value) return
  isDown = true
  carouselTrack.value.classList.add('active-drag')
  startX = e.pageX - carouselTrack.value.offsetLeft
  scrollLeft = carouselTrack.value.scrollLeft
}

const stopDrag = () => {
  isDown = false
  if (carouselTrack.value) {
    carouselTrack.value.classList.remove('active-drag')
  }
}

const onDrag = (e: MouseEvent) => {
  if (!isDown || !carouselTrack.value) return
  e.preventDefault()
  const x = e.pageX - carouselTrack.value.offsetLeft
  const walk = (x - startX) * 1.5 // Scroll speed multiplier
  carouselTrack.value.scrollLeft = scrollLeft - walk
}

const scroll = (direction: 'prev' | 'next') => {
  if (!carouselTrack.value) return
  const card = carouselTrack.value.querySelector('.project-card') as HTMLElement
  const cardWidth = card ? card.offsetWidth + 32 : 472
  const currentScroll = carouselTrack.value.scrollLeft
  const target = direction === 'next' ? currentScroll + cardWidth : currentScroll - cardWidth
  carouselTrack.value.scrollTo({
    left: target,
    behavior: 'smooth'
  })
}

const updateProgress = () => {
  if (!carouselTrack.value) return
  const track = carouselTrack.value
  const maxScroll = track.scrollWidth - track.clientWidth
  if (maxScroll <= 0) {
    scrollProgress.value = 0
  } else {
    scrollProgress.value = (track.scrollLeft / maxScroll) * 100
  }
}

const switchTab = (tab: 'projects' | 'certificates') => {
  if (activeTab.value === tab) return

  gsap.to(carouselTrack.value, {
    opacity: 0,
    y: 15,
    duration: 0.35,
    ease: 'power2.out',
    onComplete: () => {
      activeTab.value = tab
      if (carouselTrack.value) {
        carouselTrack.value.scrollLeft = 0
      }
      scrollProgress.value = 0

      gsap.to(carouselTrack.value, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
        onComplete: () => {
          updateProgress()
        }
      })
    }
  })
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  // Section Header Reveal
  gsap.from('.works-header', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.works-header',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })

  // Project Cards Reveal (Staggered)
  gsap.from('.project-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.carousel-wrapper',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })

  // Initial calculation
  setTimeout(() => {
    updateProgress()
  }, 100)
})
</script>

<style scoped lang="scss">
.portfolio-tabs {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.tab-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: $text-secondary;
  font-family: $font-mono;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: rgba(255, 255, 255, 0.25);
    color: $text-primary;
  }

  &.active {
    background-color: $accent-color;
    border-color: $accent-color;
    color: #0d0b09;
    font-weight: 600;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
  }
}

.cert-desc {
  font-family: $font-body;
  font-size: 0.9rem;
  line-height: 1.6;
  color: $text-secondary;
  margin-bottom: 2rem;
  flex-grow: 1;

  strong {
    color: $text-primary;
  }
}

.works-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.carousel-nav {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.nav-btn {
  background: transparent;
  border: 1px solid $border-color;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-primary;
  cursor: pointer;
  transition: border-color 0.3s, color 0.3s, background-color 0.3s, transform 0.2s;

  &:hover {
    border-color: $accent-color;
    color: $accent-color;
    background-color: rgba(0, 255, 136, 0.03);
  }

  &:active {
    transform: scale(0.92);
  }

  svg {
    width: 20px;
    height: 20px;
  }
}

.carousel-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin-top: 3rem;
}

.carousel-track {
  display: flex;
  align-items: stretch;
  gap: 2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  cursor: grab;
  padding: 1.5rem 0.5rem 2.5rem 0.5rem;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &.active-drag {
    cursor: grabbing;
    user-select: none;
  }
}

.project-card {
  flex: 0 0 440px;
  background-color: $card-bg;
  border: 1px solid $border-color;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  scroll-snap-align: start;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-6px);
    border-color: $accent-color;
    box-shadow: 0 12px 30px -10px rgba(0, 255, 136, 0.12);
  }
}

@media (max-width: 768px) {
  .project-card {
    flex: 0 0 290px;
    max-width: 85vw;
  }

  .project-details {
    padding: 1.5rem;
  }

  .project-preview {
    height: 180px;
  }
}

@media (max-width: 576px) {
  .works-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
}

.project-preview {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  border-bottom: 1px solid $border-color;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  .project-card:hover & {
    transform: scale(1.06);
  }
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  .project-card:hover & {
    opacity: 1;
  }
}

.preview-btn {
  background-color: $accent-color;
  color: #0d0b09;
  padding: 0.6rem 1.25rem;
  font-family: $font-mono;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  border-radius: 100px;
  transform: translateY(10px);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s;

  .project-card:hover & {
    transform: translateY(0);
  }

  &:hover {
    background-color: #33ffaa;
  }
}

.project-details {
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.project-num {
  font-family: $font-mono;
  font-size: 0.875rem;
  color: $text-muted;
  transition: color 0.3s ease;

  .project-card:hover & {
    color: $accent-color;
  }
}

.project-category {
  font-family: $font-mono;
  font-size: 0.75rem;
  color: $accent-color;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-title {
  font-family: $font-display;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: $text-primary;
}

.project-desc {
  font-family: $font-body;
  font-size: 0.9rem;
  line-height: 1.6;
  color: $text-secondary;
  margin-bottom: 1.75rem;
  flex-grow: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
}

.tech-pill {
  font-family: $font-mono;
  font-size: 0.75rem;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: $text-secondary;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  transition: border-color 0.3s, color 0.3s;

  .project-card:hover & {
    border-color: rgba(0, 255, 136, 0.20);
    color: $text-primary;
  }
}

.project-links {
  display: flex;
  gap: 1.5rem;
}

.btn-link {
  font-family: $font-mono;
  font-size: 0.875rem;
  color: $text-primary;
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: $accent-color;
    transition: width 0.3s ease;
  }

  &:hover {
    color: $accent-color;

    &::after {
      width: 100%;
    }
  }
}

.scroll-progress-container {
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.06);
  margin-top: 3rem;
  border-radius: 100px;
  overflow: hidden;
  position: relative;
}

.scroll-progress-fill {
  height: 100%;
  background-color: $accent-color;
  width: 0%;
  transition: width 0.1s ease-out;
}
</style>
