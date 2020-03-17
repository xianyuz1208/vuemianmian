<template>
  <el-dialog
    width="603px"
    class="register-dialog"
    center
    title="用户注册"
    :visible.sync="dialogFormVisible"
    top="8vh"
    :show-close="false"
  >
    <el-form status-icon :model="form" :rules="rules" ref="registerForm">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="uploadURL"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input
          show-password
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="imgCode" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off"></el-input
          ></el-col>
          <el-col :offset="1" :span="7">
            <img
              @click="changeCode"
              class="registerCode"
              :src="codeURL"
              alt=""
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input
              v-model="form.rcode"
              autocomplete="off"
            ></el-input
          ></el-col>
          <el-col :offset="1" :span="7">
            <el-button :disabled="delay != 0" @click="getSMS">{{
              delay == 0 ? "获取用户验证码" : `还有${delay}秒继续获取`
            }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('registerForm')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { sendSms,upRegister } from "../../../api/register";
import { checkMailbox,checkPhone } from '@/uitils/validator'
export default {
  name: "registerDialog",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: "",
        email: "",
        phone: "",
        password: "",
        imgCode: "",
        rcode: "",
        avatar: ""
      },
      formLabelWidth: "62px",
      imageUrl: "",
      delay: 0,
      uploadURL: process.env.VUE_APP_URL + "/uploads",
      codeURL: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      rules: {
        avatar: [{ required: true, message: "头像不能为空", tigger: "blur" }],
        username: [
          { required: true, message: "用户名不能为空", tigger: "blur" },
          { min: 6, max: 8, message: "用户名的长度为6-8位", tigger: "change" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码的长度为6-12位", trigger: "change" }
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "change" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkMailbox, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    changeCode() {
      this.codeURL =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          upRegister({
            username:this.form.username,
            phone:this.form.phone,
            email:this.form.email,
            avatar:this.form.avatar,
            password:this.form.password,
            rcode:this.form.rcode,
          }).then(res =>{
            if(res.data.code === 200){
              this.$message.success('恭喜注册成功!')
              this.$refs[formName].resetFields()
              this.imageUrl = ""
              this.dialogFormVisible = false
            }else if(res.data.code === 201){
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error("登录失败");
          return false;
        }
      });
    },
    getSMS() {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(this.form.phone) != true) {
        return this.$message.error("手机格式不对,请核对");
      }
      if (this.form.imgCode.length != 4) {
        return this.$message.error("图片验证码的长度不对,请核对");
      }
      if (this.delay == 0) {
        this.delay = 60;
        const interId = setInterval(() => {
          this.delay--;
          if (this.delay == 0) {
            clearInterval(interId);
          }
        }, 1000);
      }
      sendSms({
        phone: this.form.phone,
        code: this.form.imgCode
      }).then(res => {
        window.console.log(res)
        if (res.data.code == 200) {
          this.$message.success("获取成功" + res.data.data.captcha);
        } else if (res.data.code == 0) {
          this.$message.error("验证码获取失败"+res.data.message);
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data.file_path;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG与PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.register-dialog {
  .el-dialog__header {
    background: linear-gradient(to right, #02c6fc, #1394fb);
  }
  .el-dialog__title {
    color: #ffffff;
  }
  .registerCode {
    width: 143px;
    height: 41px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
