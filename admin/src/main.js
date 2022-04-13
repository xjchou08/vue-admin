import Vue from 'vue'
import router from './router'
import store from './store'
import Layout from '@/layout'
import '@/plugins'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Layout,
  render: h => h(Layout)
}).$mount('#app')
