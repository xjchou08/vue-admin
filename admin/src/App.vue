<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    if (sessionStorage.getItem("store")) {
      //页面加载前读取sessionStorage里的状态信息
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      //在页面刷新前将vuex里的信息保存到sessionStorage里
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>
