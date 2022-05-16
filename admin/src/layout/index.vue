<template>
  <div class="layout-container">
    <div class="aside">
      <side-bar />
    </div>
    <div class="right">
      <div class="navBar" :class="{ fixedHeader: collapse }">
        <nav-bar />
      </div>
      <app-main class="app-main" />
    </div>
  </div>
</template>

<script>
import { AppMain, NavBar, SideBar } from "./components";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    NavBar,
    SideBar,
  },
  computed: {
    ...mapState({
      collapse: (state) => state.app.sidebar.collapse,
    }),

    classObj() {
      return {
        hideSidebar: !this.collapse,
      };
    },
  },
};
</script>

<style lang="scss">
.layout-container {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  background-color: rgb(243, 240, 240);
  .right {
    width: 100%;
    .navBar {
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }
    .fixedHeader {
      position: fixed;
      top: 0;
      z-index: 9;
      width: calc(100% - 201px);
    }
    .hideSidebar .fixedHeader {
      width: calc(100% - 54px);
    }
  }
}
</style>
