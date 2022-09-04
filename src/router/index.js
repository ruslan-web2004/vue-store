import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/products',
        name: 'products',
        component: () => import('../pages/MainPage.vue')
      },
      {
        path: '/products/:id',
        name: 'productPage',
        component: () => import('../pages/ProductPage.vue')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../pages/CartPage.vue')
      },
      {
        path: '/wishes',
        name: 'wishes',
        component: () => import('../pages/WishesPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  if (to.path === '/') {
    return {name: 'products'}
  }
})

export default router
