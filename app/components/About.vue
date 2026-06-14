<template>
  <section id="about">
    <div class="section-header about-header">
      <span class="section-meta">[02 / profile]</span>
      <h2 class="section-title">About Me</h2>
    </div>

    <div class="about-grid">
      <!-- Visual Profile Circle (Placeholder with Initials "MR") -->
      <!-- EDIT: Ganti isi container ini dengan tag <img> jika ingin menggunakan foto -->
      <!-- Visual Profile Circle (Placeholder / Foto) -->
      <!-- EDIT: 
           1. Simpan file foto Anda di folder "/public" (misal: /public/profile.jpg).
           2. Ganti isi dari <div class="profile-circle"> di bawah dengan:
              <img src="/profile.jpg" alt="Muhammad Raffy Andra Hadyan" class="profile-image" />
           3. Hapus elemen <span class="profile-initials">MR</span>.
      -->
      <div class="profile-container">
        <div class="profile-circle">
          <img src="/profile.jpeg" alt="Muhammad Raffy Andra Hadyan" class="profile-image" />
        </div>
      </div>

      <!-- Bio Text & Highlights -->
      <!-- EDIT: Detail Biografi & Statistik -->
      <div class="bio-container">
        <p class="bio-lead">Saya Muhammad Raffy Andra Hadyan, seorang Fullstack Web Developer yang berbasis di Denpasar, Bali, Indonesia.</p>
        <p class="bio-text">
          Saya berdedikasi membangun aplikasi web modern yang cepat, andal, mudah diskalakan, dan berorientasi penuh pada pengguna. 
          Melalui penulisan kode yang bersih (clean code) dan arsitektur yang kuat, saya menjembatani visual antarmuka yang elegan 
          dengan logika server yang tangguh. Saya senang mengeksplorasi teknologi baru dan menyelesaikan masalah rekayasa perangkat lunak yang kompleks.
        </p>

        <!-- Highlights cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-num">3+</div>
            <div class="stat-label">Years Exp</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">10+</div>
            <div class="stat-label">Projects Built</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">Open</div>
            <div class="stat-label">Freelance</div>
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
  gsap.from('.about-header', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.about-header',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })

  // Profile container reveal
  gsap.from('.profile-container', {
    scale: 0.9,
    opacity: 0,
    duration: 1.0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.profile-container',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })

  // Bio content reveal
  gsap.from('.bio-container', {
    y: 45,
    opacity: 0,
    duration: 1.0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.bio-container',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })
})
</script>

<style scoped lang="scss">
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: center;
  margin-top: 3rem;
}

@media (max-width: 992px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .profile-container {
    order: -1;
    display: flex;
    justify-content: center;
  }
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-circle {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background-color: $card-bg;
  border: 1px solid $border-color;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden; // Memastikan gambar terpotong rapi membentuk lingkaran
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;

  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    border: 1px dashed rgba(0, 255, 136, 0.15);
    animation: rotateDashed 25s linear infinite;
    transition: border-color 0.4s ease;
  }

  &:hover {
    border-color: $accent-color;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.15);
    transform: scale(1.02);

    &::after {
      border-color: rgba(0, 255, 136, 0.45);
    }
  }
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%; // Menurunkan fokus gambar (menampilkan bagian atas/kepala lebih banyak)
  border-radius: 50%;
  transition: transform 0.4s ease;

  .profile-circle:hover & {
    transform: scale(1.05);
  }
}

@keyframes rotateDashed {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.profile-initials {
  font-family: $font-display;
  font-size: 4.5rem;
  font-weight: 700;
  color: $accent-color;
  letter-spacing: -0.05em;
  user-select: none;
  transition: color 0.4s ease, text-shadow 0.4s ease;

  .profile-circle:hover & {
    color: #ffffff;
    text-shadow: 0 0 12px rgba(0, 255, 136, 0.8);
  }
}

.bio-lead {
  font-family: $font-body;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6;
  color: $text-primary;
  margin-bottom: 1.5rem;
}

.bio-text {
  font-family: $font-body;
  font-size: 1.05rem;
  line-height: 1.75;
  color: $text-secondary;
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.stat-card {
  background-color: $card-bg;
  border: 1px solid $border-color;
  padding: 1.5rem;
  text-align: center;
  border-radius: 4px;
  transition: border-color 0.3s ease, transform 0.3s ease;

  &:hover {
    border-color: $accent-color;
    transform: translateY(-2px);
  }
}

.stat-num {
  font-family: $font-display;
  font-size: 2.25rem;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-family: $font-mono;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: $text-secondary;
  letter-spacing: 0.05em;
}
</style>
