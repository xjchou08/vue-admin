import Vue from "vue";
import Element from "../plugins/element.js";

Vue.prototype.$message = Element.productionTipCmp[0];
Vue.prototype.$confirm = Element.productionTipCmp[1];

Element.components.forEach((i) => Vue.use(i));
