<template>
  <div class="userDialog">
    <el-dialog
      width="600px"
      center
      :title="(isEdit ? '编辑' : '新增') + '用户'"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="userDialog" :rules="rules" :model="form">
        <el-form-item
          prop="username"
          label="用户名"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
          <el-select
            class="normal"
            v-model="form.role_id"
            placeholder="请选择角色"
          >
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-select
            class="normal"
            v-model="form.status"
            placeholder="请选择状态"
          >
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="remark"
          label="用户备注"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('userDialog')">
          {{ isEdit ? "保 存" : "确 定" }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userAdd, editUser } from "@/api/user.js";
import { checkMailbox, checkPhone } from "@/uitils/validator";
export default {
  name: "userDialog",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        phone: "",
        role_id: "",
        username: "",
        email: "",
        remark: ""
      },
      formLabelWidth: "120px",
      //布尔值,false为新增,true为编辑
      isEdit: false,
      rules: {
        role_id: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
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
    //接收父组件是否传递值
    show(editData) {
      this.dialogFormVisible = true;
      if (editData == undefined) {
        this.$nextTick(() => {
          this.isEdit = false;
          this.form = {};
          this.$refs.userDialog.resetFields();
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
            editUser(this.form).then(res => {
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
            userAdd(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success("修改成功");
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
.userDialog {
  .el-dialog__header {
    background: linear-gradient(to right, #02c6fc, #1394fb);

    .el-dialog__title {
      color: #ffffff;
    }
    .el-dialog__close {
      color: white;
    }
  }
  .normal {
    width: 150px;
  }
}
</style>
