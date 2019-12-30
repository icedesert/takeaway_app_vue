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
  },
  {
    path: '/shop',
    component: () => import('../views/shop/shop'),
    children: [
      {
        path: 'goods',
        component: () => import('../views/shop/shopChildren/shopGoods')
      },
      {
        path: 'info',
        component: () => import('../views/shop/shopChildren/shopInfo')
      },
      {
        path: 'rating',
        component: () => import('../views/shop/shopChildren/shopRating')
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
