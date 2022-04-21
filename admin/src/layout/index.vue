<template>
  <div class="layout-container">
    <div class="aside">
      <side-bar/>
    </div>
    <div class="right">
      <div class="header"><nav-bar/></div>
      <div class="main"><app-main/></div>
    </div>
  </div>
</template>

<script>
import {AppMain, NavBar, SideBar} from './components'
export default {
  name: "Layout",
  components:{
    AppMain,
    NavBar,
    SideBar
  }
};
</script>

<style lang="scss">
.layout-container {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display:flex;
 flex-direction: row;
  .aside {
    overflow: hidden;
  }
  .right {
    width:100%;
    .header {
      height:50px;
      line-height: 50px;
      overflow: hidden;
      padding: 0px 15px;
      background: #fdfdfd;
      box-shadow: 0px 4px 4px rgba(0, 21, 41, 0.08);
    }
    .main {
      margin: 10px 5px 0px;
    }
  }
}
</style>
