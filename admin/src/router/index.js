import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";
import { getToken } from "@/utils/auth";

Vue.use(VueRouter);

/**
 * 导航出现的问题
 * Error: Navigation cancelled from /echart/index to /user/index with a new navigation.
 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/login",
    component: () => import("views/login/"),
    hidden: true,
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/path(.*)",
        component: () => import("views/redirect/"),
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("views/dashboard/"),
        meta: {
          title: "首页",
          icon: "s-home",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    redirect: "/user/index",
    children: [
      {
        path: "index",
        name: "user",
        component: () => import("views/user/"),
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
    redirect: "/echart/index",
    children: [
      {
        path: "index",
        name: "echart",
        component: () => import("views/echart/"),
        meta: {
          title: "疫情地图",
          icon: "pie-chart",
        },
      },
      {
        path: "/echart/bar",
        name: "bar",
        component: () => import("views/echart/Bar"),
        meta: {
          title: "柱状图",
          icon: "s-data",
        },
      },
      {
        path: "/echart/pie",
        name: "pie",
        component: () => import("views/echart/Pie"),
        meta: {
          title: "饼图",
          icon: "s-chart",
        },
      },
    ],
  },
  {
    path: "/files",
    component: Layout,
    redirect: "/files/index",
    children: [
      {
        path: "index",
        name: "pdf",
        component: () => import("views/pdf/"),
        meta: {
          title: "文件上传",
          icon: "upload",
        },
      },
    ],
  },
  {
    path: "/*",
    redirect: "/404",
    component: () => import("views/error/404.vue"),
    hidden: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const adminToken = getToken();
  if (to.path !== "/login") {
    if (adminToken) {
      next();
    } else {
      next("/login");
    }
  }
  next();
});

export default router;
