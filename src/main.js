import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock/mockServer'
import loading from './assets/images/loading.gif'

import './filters' // 导入日期过滤器

import { Button } from 'mint-ui'

Vue.component(Button.name, Button)
Vue.use(VueLazyLoad, {
  loading
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
