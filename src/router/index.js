import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/login/login.vue")
    },
    { path: '/', redirect: '/login' },
    {
      path: '/index',
      name: 'index',
      component: () => import("../views/index/index.vue"),
      children: [
        {
          path: '/orderList',
          name: 'orderList',
          meta: {
            title: '订单列表',
            noAuth: true,
          },
          component: () => import("../views/orderList/orderList.vue"),
        }, {
          path: '/dashBoard',
          name: 'dashBoard',
          meta: {
            title: '仪表板',
            noAuth: true,
          },
          component: () => import("../views/dashBoard/index.vue"),
        }]
    },
  ]
})

export default router
