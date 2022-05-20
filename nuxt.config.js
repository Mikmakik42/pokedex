export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Pokedex',
    htmlAttrs: {
      lang: 'fr-FR'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#0075BE' },

  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
    pokemonApiUrl: process.env.API_POKEMON_URL
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],
  styleResources: {
    scss: [
      '~/assets/scss/utils/_utils.scss'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuei18n.ts',
    '~/plugins/api.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en-US.js' },
      { code: 'fr', iso: 'fr-FR', file: 'fr-FR.js' }
    ],
    baseUrl: process.env.BASE_URL,
    langDir: 'lang/',
    defaultLocale: 'fr',
    vueI18n: {
      fallbackLocale: 'fr'
    },
    vueI18nLoader: true,
    strategy: 'prefix_except_default'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
