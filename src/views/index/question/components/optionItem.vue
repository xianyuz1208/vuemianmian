<template>
  <div class="option-container">
    <el-radio v-if="isRadio" :label="label"></el-radio>
    <el-checkbox v-else :label="label"></el-checkbox>
    <el-input :value="text" @input="input"></el-input>
    <el-upload
      class="avatar-uploader"
      :action="uploadURL"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "optionItem",
  props: {
    label: { type: String },
    text: { type: String },
    image: { type: String },
    isRadio: { type: Boolean, default: true },
  },
  data() {
    return {
      uploadURL: process.env.VUE_APP_URL + "/question/upload",
      //当图片不是空的时候,如果有在线地址就用在线地址,否则用本地的地址
      imageUrl:this.image != ""? process.env.VUE_APP_URL + "/" + this.image: this.image,
    };
  },
  methods:{
    input(val){
      this.$emit('update:text',val)
    },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$emit("update:image",res.data.url)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || "image/png" || "image/gif";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style lang="less">
.option-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
  .el-input {
    width: 450px;
    margin-right: 20px;
  }
  .el-checkbox:last-of-type {
    margin-right: 30px;
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
