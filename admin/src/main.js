import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import * as echarts from "echarts";
import * as echarts4 from "echarts4";

import chinaMap from "echarts4/map/json/china.json"; //引入中国地图包
import worldMap from "echarts4/map/json/world.json"; //引入世界地图包'

import "@/plugins"; // 局部elementui
import "assets/styles/index.scss"; //全局样式

Vue.config.productionTip = false;

Vue.prototype.$echart = echarts;
Vue.prototype.$echart4 = echarts4;

// 注册地图
echarts4.registerMap("china", chinaMap);
echarts4.registerMap("world", worldMap);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
