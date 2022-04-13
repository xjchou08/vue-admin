
<template>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  
  <el-form-item prop="email">
    <el-input type="text" v-model="ruleForm.email" autocomplete="on" placeholder="请输入邮箱账号"></el-input>
  </el-form-item>

  <el-form-item  prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="on" placeholder="请输入密码"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import  {login} from '@/api/user'

  export default {
    data() {
      return {
        ruleForm: {
          email: 'admin123@qq.com',
          password: 'admin123456'
        },

        rules: {
          email: [ {required:true,  trigger: 'blur' }],
          password: [
            { required:true, trigger: 'blur' }
          ],
          
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) { 
            let data = this.ruleForm
            
            login(data).then(res=>{
              console.log(res)
              if(res.status === 200) {
               this.$message({
                 message:'用户登录成功',
                 type:'success'
               })
                localStorage.setItem('token',res.data.token)
                this.$router.push({path:'/about'})
               
              }
            }).catch(err=>{
              return err
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>