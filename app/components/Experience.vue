<template>
  <section id="experience">
    <div class="section-header experience-header">
      <span class="section-meta">[03 / journey]</span>
      <h2 class="section-title">Work Experience</h2>
    </div>

    <div class="experience-timeline">
      <!-- Vertical Timeline Line -->
      <div class="timeline-line"></div>

      <!-- Experience Item 1 -->
      <div class="timeline-item">
        <div class="timeline-dot-container">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-date">2023 - PRESENT</div>
          <h3 class="job-title">Freelance Fullstack Web Developer</h3>
          <h4 class="company-name">Denpasar, Bali / Remote</h4>
          <p class="job-desc">
            Mengembangkan berbagai aplikasi web kustom dan API yang dioptimalkan untuk klien lokal dan bisnis UMKM. 
            Bertanggung jawab penuh atas siklus hidup proyek, mulai dari perancangan arsitektur database, 
            pengembangan front-end yang responsif, hingga deployment cloud yang aman.
          </p>
          <div class="job-tech">
            <span class="tech-pill">React</span>
            <span class="tech-pill">Next.js</span>
            <span class="tech-pill">Node.js</span>
            <span class="tech-pill">Express.js</span>
            <span class="tech-pill">PostgreSQL</span>
          </div>
        </div>
      </div>

      <!-- Experience Item 2 -->
      <div class="timeline-item">
        <div class="timeline-dot-container">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-date">2024 (JULI - DESEMBER)</div>
          <h3 class="job-title">Leader Frontend Developer (Internship)</h3>
          <h4 class="company-name">BTW Edutech — Bali, Indonesia</h4>
          <p class="job-desc">
            Memimpin tim berisi 4 developer magang untuk membangun antarmuka web yang modern, interaktif, 
            dan responsif menggunakan React dan Tailwind CSS. Mengelola kualitas kode melalui peer review, 
            mengkoordinasikan pembagian tugas, dan memimpin pertemuan mingguan untuk pelacakan progres.
          </p>
          <div class="job-tech">
            <span class="tech-pill">React.js</span>
            <span class="tech-pill">TypeScript</span>
            <span class="tech-pill">Tailwind CSS</span>
            <span class="tech-pill">Redux</span>
            <span class="tech-pill">Git</span>
          </div>
        </div>
      </div>

      <!-- Experience Item 3 -->
      <div class="timeline-item">
        <div class="timeline-dot-container">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-date">2025 (JULI) - 2026 (JANUARI)</div>
          <h3 class="job-title">Project Manager & Technical Planner</h3>
          <h4 class="company-name">DTM Labs — Bali, Indonesia</h4>
          <p class="job-desc">
            Mengelola siklus pengembangan produk startup tahap awal (early-stage startup). 
            Mengkoordinasikan tim lintas fungsional (designer, developer, QA), merancang rencana 
            teknis arsitektur perangkat lunak, menentukan roadmap rilis produk, dan memastikan 
            pengiriman fitur secara tepat waktu dengan standar kualitas tinggi.
          </p>
          <div class="job-tech">
            <span class="tech-pill">Agile/Scrum</span>
            <span class="tech-pill">Product Roadmap</span>
            <span class="tech-pill">Software Architecture</span>
            <span class="tech-pill">Jira</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Section Header Reveal
  gsap.from('.experience-header', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.experience-header',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })

  // Stagger reveal timeline items
  const items = gsap.utils.toArray('.timeline-item')
  items.forEach((item: any) => {
    const content = item.querySelector('.timeline-content')
    const dot = item.querySelector('.timeline-dot')

    gsap.from(content, {
      x: 35,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    gsap.from(dot, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  })
})
</script>

<style scoped lang="scss">
.experience-timeline {
  position: relative;
  max-width: 900px;
  margin: 3.5rem auto 0;
  padding: 1rem 0;
}

.timeline-line {
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    rgba(0, 255, 136, 0.4) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.timeline-item {
  display: flex;
  margin-bottom: 3.5rem;
  position: relative;

  &:last-child {
    margin-bottom: 1rem;
    .timeline-line {
      display: none; // Hapus sisa garis di item terakhir
    }
  }
}

.timeline-dot-container {
  flex: 0 0 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 0.35rem;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: $bg-color;
  border: 2px solid $accent-color;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  z-index: 2;
  transition: transform 0.3s ease, background-color 0.3s ease;

  .timeline-item:hover & {
    transform: scale(1.3);
    background-color: $accent-color;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.85);
  }
}

.timeline-content {
  flex-grow: 1;
  background-color: $card-bg;
  border: 1px solid $border-color;
  padding: 2rem;
  border-radius: 6px;
  margin-left: 1rem;
  transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: $accent-color;
    box-shadow: 0 8px 30px -10px rgba(0, 255, 136, 0.12);
    transform: translateX(4px);
  }
}

.timeline-date {
  font-family: $font-mono;
  font-size: 0.75rem;
  color: $accent-color;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.job-title {
  font-family: $font-display;
  font-size: 1.35rem;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 0.25rem;
}

.company-name {
  font-family: $font-mono;
  font-size: 0.85rem;
  color: $text-secondary;
  margin-bottom: 1.25rem;
  font-weight: 500;
}

.job-desc {
  font-family: $font-body;
  font-size: 0.95rem;
  line-height: 1.6;
  color: $text-secondary;
  margin-bottom: 1.5rem;
}

.job-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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

  .timeline-content:hover & {
    border-color: rgba(0, 255, 136, 0.15);
    color: $text-primary;
  }
}

@media (max-width: 576px) {
  .timeline-content {
    padding: 1.5rem;
    margin-left: 0.5rem;
  }

  .job-title {
    font-size: 1.15rem;
  }
}
</style>
