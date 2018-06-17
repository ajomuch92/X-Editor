import 'bulma/css/bulma.css'
import 'swiper/dist/css/swiper.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
