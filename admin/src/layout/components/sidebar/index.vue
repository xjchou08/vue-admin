<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#001e34"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse-transition="false"
    router
  >
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>

    <el-submenu
      :index="item.path"
      v-for="(item, index) in hasChildren"
      :key="index"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.title }}</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
        >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">
            {{ subItem.title }}
          </span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  data() {
    return {
      sideData: [
        {
          path: "/dashboard",
          title: "首页",
          icon: "s-home",
        },
        {
          path: "/user/index",
          title: "用户管理",
          icon: "user",
        },
        {
          path: "/echart",
          title: "图表",
          icon: "data-line",
          children: [
            {
              path: "/echart/index",
              name: "echart",
              title: "疫情地图",
              icon: "map-location",
            },
            {
              path: "/echart/bar",
              name: "bar",

              title: "柱状图",
              icon: "s-data",
            },
            {
              path: "/echart/pie",
              name: "pie",
              title: "饼图",
              icon: "pie-chart",
            },
          ],
        },
        {
          path: "/files",
          title: "文件管理",
          icon: "files",
          children: [
            {
              path: "/files/index",
              title: "文件上传",
              icon: "upload",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.collapse;
    },

    noChildren() {
      return this.sideData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.sideData.filter((item) => item.children);
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;

      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
};
</script>

<style lang="scss">
.el-menu {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
