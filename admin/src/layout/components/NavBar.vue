<template>
  <div class="navbar">
    <div class="icon" @click="toggleCollapse">
      <i v-if="this.$store.getters.collapse" class="el-icon-s-unfold"></i>
      <i v-else class="el-icon-s-fold"></i>
    </div>
    <el-dropdown :hide-on-click="false">
      <div class="rightNav">
        <img :src="avaster + '?imageView2/1/w/80/h/80'" alt="头像" />
        <span style="margin: 0px 6px">{{ username || "用户名" }}</span>
        <i class="el-icon-arrow-down"></i>
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人设置</el-dropdown-item>
        <!-- .native  原生事件修饰符 -->
        <el-dropdown-item @click.native="logout">用户退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      username: "",
      avaster: "",
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      // 用户个人信息
      await this.$store.dispatch("user/getUser").then((res) => {
        this.username = res.username;
        this.avaster = res.image;
      });
    },
    async logout() {
      //退出系统
      await this.$confirm("确认退出吗？", "提示", {
        confirmButtonText: "是的",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("user/logout").then(() => {
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          });
        })
        .catch(() => {});
    },

    toggleCollapse() {
      //改变折叠侧边栏状态
      this.$store.dispatch("app/toggleCollapse");
    },
  },
};
</script>

<style lang="scss">
.navbar {
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;

  .icon {
    font-size: 24px;
    cursor: pointer;
  }
  .rightNav {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      padding: 2px;
      border-radius: 50%;
    }
  }
}
.hideSidebar .navbar {
  position: fixed;
  top: 0;
  z-index: 9;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
