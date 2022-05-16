<template>
  <div class="layout-container">
    <div class="aside">
      <side-bar />
    </div>
    <div class="right">
      <nav-bar :class="{ fixedHeader: collapse }" />
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

    .fixedHeader {
      position: fixed;
      top: 0;
      width: calc(100% - 201px);
      .hideSidebar {
        width: calc(100% - 54px);
      }
    }
  }
}
</style>
