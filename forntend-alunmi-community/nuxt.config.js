import colors from 'vuetify/es5/util/colors'

export default {

  env: {
    baseUrl: `${process.env.BASE_URL || 'http://localhost:5000'}`
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MFU Alumni Community',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
    
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/auth','@nuxtjs/axios'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    retry: false,
  },

  bridge: {
    nitro: false
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},


  auth: {
    strategies: {
      
      // local: {
      //   endpoints: {
      //     login: { url: `${process.env.BASE_URL || 'http://localhost:5000'}/authentication/login`, method: 'post', propertyName: 'token'},
      //     user: { url: `${process.env.BASE_URL || 'http://localhost:5000'}/authentication/check`, method: 'get', propertyName: 'users'},
      //     logout: false, // Disable logout endpoint for local strategy
      //   },
      //   // Other options for the local strategy if needed
      // },
        google: {
        
        client_id: `${process.env.CLIENT_ID || '77058474582-k55ggfmlb2bd7cjo49uuj7nkqotd2veg.apps.googleusercontent.com'}`,
        response_type: 'code',
        redirect_uri:`${process.env.REDIRECT_URI || 'http://localhost:3000/login/'}`,
        access_token_endpoint: `${process.env.BASE_URL || 'http://localhost:5000'}/authentication/user/google`,
        userinfo_endpoint: `${process.env.BASE_URL || 'http://localhost:5000'}/authentication/auth/user`
        // Other options for the Google strategy if needed
      },

      
    },
    redirect: {
      login: '/login/', 
      logout: '/',
      callback: '/login/',
    },
  },


}
