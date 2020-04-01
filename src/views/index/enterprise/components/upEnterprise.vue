<template>
  <div class="edit-enterprise">
    <el-dialog
      width="600px"
      center
      :title="(isEdit ? '编辑' : '新增') + '企业'"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="upEnterprise" :rules="rules" :model="form">
        <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="企业名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="short_name"
          label="企业简称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="intro"
          label="企业简介"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="remark"
          label="企业备注"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('upEnterprise')">
          {{ isEdit ? "保 存" : "确 定" }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { enterpriseAdd, editEnterprise } from "@/api/enterprise.js";
export default {
  name: "upEnterprise",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        eid: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      formLabelWidth: "120px",
      //布尔值,false为新增,true为编辑
      isEdit: false,
      rules: {
        eid: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    //接收父组件是否传递值
    show(editData) {
      this.dialogFormVisible = true;
      if (editData == undefined) {
        this.$nextTick(() => {
          this.isEdit = false;
          this.form = {};
          this.$refs.upEnterprise.resetFields();
        });
      } else {
        this.$nextTick(() => {
          this.isEdit = true;
          this.form = editData;
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            //编辑
            editEnterprise(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success("修改成功");
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.$parent.getData();
              } else {
                this.$message.error(res.message);
              }
            });
          } else {
            enterpriseAdd(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success("新增成功");
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.$parent.getData();
              } else {
                this.$message.error(res.message);
              }
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.edit-enterprise {
  .el-dialog__header {
    background: linear-gradient(to right, #02c6fc, #1394fb);

    .el-dialog__title {
      color: #ffffff;
    }
    .el-dialog__close {
      color: white;
    }
  }
}
</style>
