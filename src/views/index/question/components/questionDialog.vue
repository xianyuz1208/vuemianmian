<template>
  <div class="question-content">
    <el-dialog fullscreen title="新增题库" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学科" :label-width="formLabelWidth">
          <subjectDown />
        </el-form-item>
        <el-form-item label="阶段" :label-width="formLabelWidth">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" :label-width="formLabelWidth">
          <enterpriseDown />
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <chinaArea v-model="form.city" />
        </el-form-item>
        <el-form-item label="题型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" :label-width="formLabelWidth">
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="试题标题" :label-width="formLabelWidth">
          <myEditor v-model="form.title" />
        </el-form-item>
        <el-form-item label="答案解析" :label-width="formLabelWidth">
          <myEditor v-model="form.answer_analyze" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import chinaArea from "./chinaArea";
import myEditor from './myEditor'
export default {
  name: "questionDialog",
  components: {
    chinaArea,
    myEditor
  },
  data() {
    return {
      form: {
        step: "",
        enterprise: 0,
        subject: 0,
        city: [],
        difficulty: 1,
        type: 1,
        title:"",
        answer_analyze:"",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  }
};
</script>

<style lang="less" scoped>
.question-content {
  .el-form {
    width: 835px;
    margin: 0 auto;
  }
  /deep/.el-form-item__label {
    padding-right: 36px;
  }
  .el-select {
    width: 364px;
  }
  .el-cascader {
    width: 364px;
  }
}
</style>
