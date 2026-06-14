// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  app: {
    head: {
      title: 'Muhammad Raffy Andra Hadyan | Fullstack Web Developer',
      htmlAttrs: {
        lang: 'id'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portofolio Muhammad Raffy Andra Hadyan, seorang Fullstack Web Developer profesional yang berbasis di Denpasar, Bali. Spesialisasi dalam React, Next.js, Node.js, dan arsitektur database.' },
        { name: 'keywords', content: 'Muhammad Raffy Andra Hadyan, Randra, Fullstack Web Developer, Bali, React, Next.js, Node.js, Portofolio Web Developer' },
        { property: 'og:title', content: 'Muhammad Raffy Andra Hadyan | Fullstack Web Developer' },
        { property: 'og:description', content: 'Lihat portofolio karya pilihan dan keahlian teknologi dari Muhammad Raffy Andra Hadyan.' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap' }
      ]
    }
  },

  css: [
    '~/assets/scss/main.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    },
    optimizeDeps: {
      include: [
        'gsap',
        'gsap/ScrollTrigger',
        'howler',
        'lenis',
        'three'
      ]
    }
  }
})
