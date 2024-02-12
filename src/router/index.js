import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/front/HomeView.vue')
        },
        {
          path: 'news',
          component: () => import('../views/front/NewsView.vue')
        },
        {
          path: 'products',
          component: () => import('../views/front/ProductsView.vue')
        },
        {
          path: 'product/:id',
          component: () => import('../views/front/ProductsDetail.vue')
        },
        {
          path: 'qa',
          component: () => import('../views/front/QaView.vue')
        },
        {
          path: 'order',
          component: () => import('../views/front/OrderView.vue'),
          children:[
            {
              path: 'carts',
              component: () => import('../views/front/order/OrderCarts.vue')
            },
            {
              path: 'subscriber',
              component: () => import('../views/front/order/OrderSubscriber.vue')
            },
            {
              path: 'payment/:orderId',
              component: () => import('../views/front/order/OrderPayment.vue')
            },
            {
              path: 'finish',
              component: () => import('../views/front/order/OrderFinish.vue')
            },
          ]
        },
        {
          path: 'like',
          component: () => import('../views/front/LikeView.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      children:[
        {
          path: 'products',
          name:'products',
          component: () => import('../views/admin/AdminProducts.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/admin/AdminOrders.vue')
        },
        {
          path: 'coupons',
          component: () => import('../views/admin/AdminCoupons.vue')
        },
        {
          path: 'news',
          component: () => import('../views/admin/AdminNews.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*', // 重新導向
      redirect: {
        name: 'home'
      }
    }
  ]
})

export default router
