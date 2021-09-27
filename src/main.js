import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'boxicons/dist/boxicons'
import * as sunnyAnimation from './assets/animations/sunny.json'
import * as cloudyAnimation from './assets/animations/cloudy.json'
import * as thunderStormAnimation from './assets/animations/thunderstorm.json'

Vue.config.productionTip = false
Vue.use(Vuesax)

window.animations = {
  sunny: sunnyAnimation.default,
  cloudy: cloudyAnimation.default,
  thunder: thunderStormAnimation.default
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
