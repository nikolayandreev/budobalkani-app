export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Будобалкани',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: process.env.API_URL },
    ],
  },
  loading: {
    color: '#c3c3c3',
    height: '5px'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/fonts.css', '@/assets/css/styles.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuelidate',
    '~/plugins/axios',
    { src: '~/plugins/v-click-outside', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          autoFetch: false,
        },
        endpoints: {
          login: {
            url: '/api/customer/login?token=true',
            method: 'POST',
          },
          logout: {
            url: '/api/customer/logout',
            method: 'GET',
          },
          user: false,
        },
      },
    },
    redirect: {
      login: '/vhod',
      logout: '/',
      callback: '/vhod',
      home: '/',
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    proxy: true,
  },

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000/api/',
      pathRewrite: { '^/api': '/' },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
