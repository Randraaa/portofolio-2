<template>
  <section id="contact">
    <div class="section-header contact-header">
      <span class="section-meta">[05 / connection]</span>
    </div>

    <div class="contact-content">
      <h2 class="contact-headline">Let's build<br />something together.</h2>
      <p class="contact-sub">Open for freelance projects & collaborations.</p>

      <div class="email-wrapper">
        <!-- EDIT: Email Anda -->
        <a href="mailto:raffybalian19@gmail.com" class="email-link">raffybalian19@gmail.com</a>
      </div>

      <div class="social-wrapper">
        <!-- EDIT: Link sosial media Anda -->
        <a href="https://github.com/Randraaa" class="social-link" target="_blank" rel="noopener">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" class="social-icon" alt="GitHub" />
          <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/muhammad-raffy-andra-hadyan" class="social-link" target="_blank" rel="noopener">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" class="social-icon" alt="LinkedIn" />
          <span>LinkedIn</span>
        </a>
        <a href="https://www.instagram.com/xxralfy" class="social-link" target="_blank" rel="noopener">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" class="social-icon" alt="Instagram" />
          <span>Instagram</span>
        </a>
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

  // Reveal contact content
  gsap.from('.contact-content', {
    y: 50,
    opacity: 0,
    duration: 1.0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-content',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
})
</script>

<style scoped lang="scss">
.contact-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 0 2rem;
}

.contact-headline {
  font-family: $font-display;
  font-size: clamp(2.5rem, 5.2vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: $text-primary;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.contact-sub {
  font-family: $font-body;
  font-size: 1.25rem;
  color: $text-secondary;
  margin-bottom: 4rem;
}

.email-wrapper {
  margin-bottom: 4.5rem;
}

.email-link {
  font-family: $font-mono;
  font-size: clamp(1.2rem, 3.2vw, 2.2rem);
  color: $accent-color;
  text-decoration: none;
  border-bottom: 2px solid rgba(0, 255, 136, 0.3);
  padding-bottom: 0.5rem;
  transition: border-color 0.3s, color 0.3s, text-shadow 0.3s;

  &:hover {
    border-color: $accent-color;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
  }
}

.social-wrapper {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: $font-mono;
  font-size: 0.9rem;
  color: $text-secondary;
  text-decoration: none;
  border: 1px solid $border-color;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  transition: border-color 0.3s, color 0.3s, background-color 0.3s;

  &:hover {
    border-color: $accent-color;
    color: $text-primary;
    background-color: rgba(0, 255, 136, 0.03);
  }
}

.social-icon {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1) opacity(0.6);
  transition: filter 0.3s, opacity 0.3s;

  .social-link:hover & {
    filter: brightness(0) invert(1) sepia(1) saturate(100) hue-rotate(90deg);
    opacity: 1;
  }
}
</style>
