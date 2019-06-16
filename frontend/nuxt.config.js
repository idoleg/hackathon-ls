module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
    '@/plugins/element-ui'
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/axios', {
      baseURL: 'http://back.mbbaby.ru/' //http://127.0.0.1:3333'
    }],
    ['vue-yandex-maps/nuxt', {
      apiKey: 'e713c06f-097d-4de1-9547-59177e5d2157'
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
  },

  proxy: {
    '/api/': 'http://127.0.0.1:3333'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

