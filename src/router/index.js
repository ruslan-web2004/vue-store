import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../pages/MainPage.vue')
        },
        {
          path: '/product/:id',
          name: 'productPage',
          component: () => import('../pages/ProductPage.vue'),
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('../pages/CartPage.vue')
        },
        {
          path: '/wishlist',
          name: 'wishlist',
          component: () => import('../pages/WishListPage.vue')
        }
      ]
    }
  ]
})
