import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'boxicons/dist/boxicons'
import VueGeolocation from "vue-browser-geolocation/src"

Vue.config.productionTip = false
Vue.use(Vuesax)
Vue.use(VueGeolocation)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
