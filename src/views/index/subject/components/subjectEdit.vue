<template>
  <el-dialog
    class="subj-edit"
    center
    width="600px"
    title="编辑学科"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="subjectEdit">
      <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
        <el-input  v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name"  label="学科名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="学科简称" :label-width="formLabelWidth">
        <el-input  v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="学科简介" :label-width="formLabelWidth">
        <el-input prop="intro" v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="学科备注" :label-width="formLabelWidth">
        <el-input  v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('subjectEdit')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { subEdit } from '@/api/subject.js'
export default {
  name: "subjectEdit",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        rid:"",
        short_name:"",
        intro:"",
        remark:""
      },
      formLabelWidth: "120px",
      rules:{
        rid:[
          {required:true,message:"学科编号不能为空",trigger:"blur"}
        ],
        name:[
          {required:true,message:'学科名称不能为空',trigger:"blur"}
        ]
      }
    };
  },
  methods:{
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            subEdit(this.form).then(res =>{
              // window.console.log(res)
              if(res.code === 200){
                this.dialogFormVisible = false
                this.$refs[formName].resetFields()
                this.$message.success('编辑成功')
                //从父组件中获取数据
                this.$parent.getData()
              }else if(res.code === 201){
                this.$message.error(res.message)
              }
            })
          } else {
            this.$message.error("数据校验失败,请核对")
            return false;
          }
        });
      },
  }
};
</script>

<style lang="less">
.subj-edit {
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
