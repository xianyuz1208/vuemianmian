<template>
  <div class="upload-vieo">
    <el-upload
      :action="uploadURL"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
    </el-upload>
    <video :src="videoUrl" class="video" controls></video>
  </div>
</template>

<script>
export default {
  name: "uploadVideo",
  props:{
    video:{type:String}
  },
  data() {
    return {
      uploadURL: process.env.VUE_APP_URL + "/question/upload",
      videoUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      this.$emit("update:video",res.data.url)
    },
    beforeAvatarUpload(file) {
      // window.console.log(file)
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传的只能是mp4格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传的视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.upload-vieo {
  .video{
    width: 360px;
    height: 240px;
  }
}
</style>
