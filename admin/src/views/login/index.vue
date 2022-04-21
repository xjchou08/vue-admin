<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      class="loginform"
    >
      <el-form-item prop="email">
        <el-input
          type="text"
          v-model="loginForm.email"
          autocomplete="on"
          placeholder="请输入邮箱账号"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="on"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="submitForm('loginForm')"
          class="loginBtn"
          >登录</el-button
        >
        <!--<el-button @click="resetForm('loginForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validEmail } from "@/utils/validate";

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length > 12 && value.length < 6) {
        callback(new Error("密码输入长度在6-12"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: "admin123@qq.com",
        password: "admin123456",
      },
      rules: {
        email: [{ validator: validateEmail, required: true, trigger: "blur" }],
        password: [
          { validator: validatePassword, required: true, trigger: "blur" },
        ],
      },
      loading: false,
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          return
        } else {
          try {
            this.loading = true;

            this.$store
              .dispatch("user/login", this.loginForm)
              .then(() => {
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({path:'/dashboard'})
                  this.$message({
                    message: "登录成功",
                    type: "success",
                  });
                }, 1000);
              })
              .catch((err) => {
                //console.log(err);
                this.loading = false;
                this.$message.error("账号或密码输入错误:"+err);    
              });
          } catch (err) {
            console.log(err);
            return err;
          }
        }
      });
    },
    /** 
     * 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },*/
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/login.scss";
</style>
