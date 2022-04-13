import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:'/',
    name: "layout",
    component: () => import("../views/layout"),
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
          title: '首页',
          icon:''
        }
      },
    ],
  },

  { 
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
