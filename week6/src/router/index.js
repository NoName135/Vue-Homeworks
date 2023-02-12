import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/",
        component: () => import("../views/Index.vue"),
      },
      {
        path: "/products",
        name: "產品列表",
        component: () => import("../views/Products.vue"),
      },
      {
        path: "/cart",
        name: "購物車",
        component: () => import("../views/Cart.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    component: () => import("../views/Dashboard.vue"),
    children: [
      {
        path: "products",
        component: () => import("../views/Dashboard/Products.vue"),
      },
      {
        path: "orders",
        component: () => import("../views/Dashboard/Orders.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
