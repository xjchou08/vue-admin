<template>
  <el-menu
    default-active="/dashboard"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :collapse-transition="true"
    background-color="#001e34"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/dashboard">
      <i class="el-icon-document"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-setting"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">轮播图管理</span>
    </el-menu-item>
    <el-menu-item index="/echart">
      <i class="el-icon-setting"></i>
      <span slot="title">echarts</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.collapse;
    },
  },
};
</script>

<style lang="scss">
.el-menu {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 175px;
}
</style>
