<template>
  <section id="stack">
    <div class="section-header stack-header">
      <span class="section-meta">[03 / capability]</span>
      <h2 class="section-title">Tech Stack</h2>
    </div>

    <div class="stack-categories">
      <!-- Frontend Category -->
      <div class="tech-category">
        <h3 class="category-title">Frontend</h3>
        <div class="tech-grid">
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg" alt="React" />
            <span class="tech-name">React</span>
          </div>
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg" alt="Next.js" />
            <span class="tech-name">Next.js</span>
          </div>
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg" alt="TailwindCSS" />
            <span class="tech-name">TailwindCSS</span>
          </div>
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg" alt="JavaScript" />
            <span class="tech-name">JavaScript</span>
          </div>
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg" alt="TypeScript" />
            <span class="tech-name">TypeScript</span>
          </div>
        </div>
      </div>

      <!-- Backend Category -->
      <div class="tech-category">
        <h3 class="category-title">Backend</h3>
        <div class="tech-grid">
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg" alt="Node.js" />
            <span class="tech-name">Node.js</span>
          </div>
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/express.svg" alt="Express.js" />
            <span class="tech-name">Express.js</span>
          </div>
        </div>
      </div>

      <!-- Database Category -->
      <div class="tech-category">
        <h3 class="category-title">Database</h3>
        <div class="tech-grid">
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg" alt="PostgreSQL" />
            <span class="tech-name">PostgreSQL</span>
          </div>
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mysql.svg" alt="MySQL" />
            <span class="tech-name">MySQL</span>
          </div>
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mongodb.svg" alt="MongoDB" />
            <span class="tech-name">MongoDB</span>
          </div>
        </div>
      </div>

      <!-- Tools Category -->
      <div class="tech-category">
        <h3 class="category-title">Tools & Others</h3>
        <div class="tech-grid">
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg" alt="Git" />
            <span class="tech-name">Git</span>
          </div>
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" />
            <span class="tech-name">GitHub</span>
          </div>
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg" alt="Docker" />
            <span class="tech-name">Docker</span>
          </div>
          <div class="tech-card">
            <img class="tech-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudiocode.svg" alt="VS Code" />
            <span class="tech-name">VS Code</span>
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
  gsap.from('.stack-header', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.stack-header',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })

  // Stagger reveal tech cards inside each category
  gsap.utils.toArray('.tech-category').forEach((category: any) => {
    const cards = category.querySelectorAll('.tech-card')
    const title = category.querySelector('.category-title')

    gsap.from(title, {
      x: -30,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: {
        trigger: category,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })

    gsap.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: category,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  })
})
</script>

<style scoped lang="scss">
.stack-categories {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  margin-top: 3rem;
}

.category-title {
  font-family: $font-mono;
  font-size: 0.875rem;
  color: $accent-color;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  border-bottom: 1px solid $border-color;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 480px) {
  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tech-card {
  background-color: $card-bg;
  border: 1px solid $border-color;
  padding: 1.75rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 4px;
  transition: border-color 0.4s ease, box-shadow 0.4s ease, 
              transform 0.4s ease;

  &:hover {
    border-color: $accent-color;
    box-shadow: 0 8px 20px -8px rgba(0, 255, 136, 0.2);
    transform: translateY(-4px);
  }
}

.tech-icon {
  width: 32px;
  height: 32px;
  filter: brightness(0) invert(1) opacity(0.65);
  transition: filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease;

  .tech-card:hover & {
    filter: brightness(0) invert(1) sepia(1) saturate(100) hue-rotate(90deg);
    opacity: 1;
    transform: scale(1.1);
  }
}

.tech-name {
  font-family: $font-mono;
  font-size: 0.8rem;
  color: $text-secondary;
  transition: color 0.4s ease;

  .tech-card:hover & {
    color: $text-primary;
  }
}
</style>
