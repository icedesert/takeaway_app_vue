import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: () => import('../views/home/home'),
    meta: {
      tabbarShow: true
    }
  },
  {
    path: '/order',
    component: () => import('../views/order/order'),
    meta: {
      tabbarShow: true
    }
  },
  {
    path: '/profile',
    component: () => import('../views/profile/profile'),
    meta: {
      tabbarShow: true
    }
  },
  {
    path: '/search',
    component: () => import('../views/search/search'),
    meta: {
      tabbarShow: true
    }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('../views/login/login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
