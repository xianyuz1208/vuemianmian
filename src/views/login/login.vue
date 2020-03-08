<template>
<div class="login-con">
   <div class="login-left">
      <div class="titleBox">
         <img src="./images/login.png" alt="" class="login">
         <span class="title">黑马面面</span>
         <span class="line"></span>
         <span class="subTitle">用户登录</span>
      </div>
      <div class="inpBox">
      <el-col :span="24"><el-input prefix-icon="el-icon-user" v-model= "userInput" placeholder="请输入内容"></el-input></el-col>
      <el-col :span="24"><el-input prefix-icon="el-icon-lock" v-model= "userInput" placeholder="请输入密码"></el-input></el-col>
       <el-col :span="12"><el-input prefix-icon="el-icon-key" v-model= "userInput" placeholder="请输入验证码"></el-input></el-col>
       <el-col :span="24"><el-checkbox v-model="checked"></el-checkbox>我已阅读并同意用户协议和隐私条款</el-col>
       <el-col :span="24"><el-button type="primary" class="btn">登录</el-button></el-col>
       <el-col :span="24"><el-button type="primary" class="btn">注册</el-button></el-col>
      </div> 
   </div>
   <img src="./images/login_banner_ele.png" alt="">
</div>
</template>

<script>
export default {
 data(){
   return{
      userInput:'',
      checked:false
      }
   }
}
</script>

<style lang="less">
   .login-con{
     height: 100%;
     background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
     display: flex;
     align-items: center;
     justify-content: space-around;
    .login-left{
      width:478px;
      height:550px;
      background:rgba(245,245,245,1);
      .titleBox{
         margin: 48px 48px;
         display: flex;
         align-items: center;
         .title{
            margin-left: 16px;
            margin-right: 14px;
            font-size: 24px;
         }
         .line{
            width: 1px;
            height: 28px;
            background-color: #C7C7C7;
         }
         .subTitle{
            font-size: 21px;
            margin-left: 12px;
         }
      }
      .inpBox{
         padding: 0 43px;
         .el-input__inner{
            margin-bottom: 25px;
         }
         .btn{
            width: 394px;
            height: 40px;
            border-radius: 4px;
            margin-top:26px; 
            font-size: 16px;
            color: #FFFFFF;
         }
      }
    }
   }
</style>
