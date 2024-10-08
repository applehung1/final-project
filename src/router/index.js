import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/aboutView',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/Orders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/Coupons.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/Articles.vue')
      }
    ]
  },
  {
    // 客戶端
    path: '/user',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: 'list',
        component: () => import('../views/UserList.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/UserCheckout.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue')
      },
      {
        path: 'checkinfo',
        component: () => import('../views/UserInfoCheck.vue')
      },
      {
        path: 'favorite',
        component: () => import('../views/UserFavorite.vue')
      },
      {
        path: 'about',
        component: () => import('../views/UserAbout.vue'),
        children: [
          {
            path: 'overview',
            name: 'overview',
            component: () => import('../views/about/AboutOverview.vue')
          },
          {
            path: ':articleId',
            name: 'article',
            component: () => import('../views/about/AboutArticle.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) { // 加入路由設定讓每個頁面進入時為頂端
    if (savedPosition) {
      // 有savedPosition，則返回滾動至該位置
      return savedPosition
    } else {
      // 否則，滾動至頂部
      return { top: 0 }
    }
  }
})

export default router
