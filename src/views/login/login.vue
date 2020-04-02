<template>
  <div class="login-con">
    <div class="login-left">
      <div class="titleBox">
        <img src="./images/login.png" alt="" class="login" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="subTitle">用户登录</span>
      </div>
      <el-form
        ref="loginForm"
        :rules="rules"
        :model="loginForm"
        label-width="43px"
      >
        <el-form-item prop="phone">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.phone"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="loginCode">
          <el-row>
            <el-col :span="17"
              ><el-input
                <el-input
                prefix-icon="el-icon-key"
                v-model="loginForm.loginCode"
                placeholder="请输入验证码"
              ></el-input
            ></el-col>
            <el-col :span="7"
              ><img @click="getCode" class="loginCode" :src="codeURL" alt=""
            /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.isChecked"
            >我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link
              type="primary"
              >隐私条款</el-link
            ></el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >登录</el-button
          >
          <el-button type="primary" @click="showDialog">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="./images/login_banner_ele.png" alt="" />
    <registerDialog ref="registerDialog"></registerDialog>
  </div>
</template>

<script>
import registerDialog from "./components/registerDialog";
import { checkPhone } from "@/uitils/validator";
import { setToken } from "@/uitils/token";
import { login } from "@/api/login"
export default {
  name: "login",
  components: {
    registerDialog
  },
  data() {
    return {
      loginForm: {
        phone: "",
        password: "",
        loginCode: "",
        isChecked: false
      },
      codeURL: process.env.VUE_APP_URL + "/captcha?type=login",
      rules: {
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "change" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码的长度在6-12位", trigger: "change" }
        ],
        loginCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码的长度是4个", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.loginForm.isChecked != true) {
            return this.$message.warning("请同意隐私协议");
          }
          login({
            phone:this.loginForm.phone,
            password:this.loginForm.password,
            code:this.loginForm.loginCode
          }).then(res =>{
            //  window.console.log(res)
            if(res.data.code === 200){
              setToken(res.data.data.token)
              // this.$message.success('登录成功')
              this.$router.push("/index")
            }else if(res.data.code === 202){
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error("登录失败");
          return false;
        }
      });
    },
    showDialog() {
      this.$refs.registerDialog.dialogFormVisible = true;
    },
    getCode() {
      this.codeURL =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    }
  },
};
</script>

<style lang="less">
.login-con {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  align-items: center;
  justify-content: space-around;
  .login-left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-right: 41px;
    box-sizing: border-box;
    .titleBox {
      margin: 48px 48px;
      display: flex;
      align-items: center;
      .title {
        margin-left: 16px;
        margin-right: 14px;
        font-size: 24px;
      }
      .line {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
      }
      .subTitle {
        font-size: 21px;
        margin-left: 12px;
      }
    }
    .el-button {
      width: 394px;
      height: 40px;
      margin-bottom: 26px;
      margin-left: 0;
    }
    .loginCode {
      width: 110px;
      height: 40px;
    }
    .el-chenckbox {
      display: flex;
      align-items: center;
      .el-checkbox__label {
        display: flex;
      }
    }
  }
}
</style>
