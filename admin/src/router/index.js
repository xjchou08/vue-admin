import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
    hidden: true,
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: Layout,
    children: [
      {
        path: "/dashboard",
        name: "首页",
        component: () => import("../views/dashboard"),
        meta: {
          title: "首页",
          icon: "dashboard",
        },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    children: [
      {
        path: "/user",
        name: "user",
        component: () => import("../views/user/index.vue"),
        meta: {
          title: "用户管理",
          icon: "user",
        },
      },
    ],
  },
  {
    path: "/echart",
    component: Layout,
    children: [
      {
        path: "/echart",
        name: "echart",
        component: () => import("../views/echart/index.vue"),
        meta: {
          title: "图表",
          icon: "user",
        },
      },
    ],
  },
  {
    path: "/*",
    component: () => import("../views/error/404.vue"),
    hidden: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

/**

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.token) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next('/');
  }
});
 */
export default router;
