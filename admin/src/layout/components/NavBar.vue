<template>
  <div class="navbar">
    <div class="icon" @click="toggleCollapse">
      <i class="el-icon-s-fold" ></i>
    </div>
    <el-dropdown :hide-on-click="false">
      <div class="rightNav">
        <img src=" https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="头像" sizes="" srcset="" />
        <span style="margin:0px 6px">{{username || '用户名'}}</span>
        <i class="el-icon-arrow-down"></i>
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人设置</el-dropdown-item>
        <el-dropdown-item @click.native ="logout">用户退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "NavBar",
  computed:{
    ...mapGetters([
      'avaster',
      'username',
    ])
  },
  methods:{
     logout(){
       //退出系统
       this.$store.dispatch('user/logout').then(()=>{
            this.$router.push({path:'/login'}).catch(()=>{})
       })
  
     },

    toggleCollapse() {
         this.$store.dispatch('app/toggleCollapse')
         //console.log(1111)
    }
   
  }
};
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
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
</style>
