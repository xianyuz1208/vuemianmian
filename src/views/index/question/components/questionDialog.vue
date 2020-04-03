<template>
  <div class="question-content">
    <el-dialog fullscreen title="新增题库" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学科" :label-width="formLabelWidth">
          <subjectDown :isQuery="false" v-model="form.subject" />
        </el-form-item>
        <el-form-item label="阶段" :label-width="formLabelWidth">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" :label-width="formLabelWidth">
          <enterpriseDown :isQuery="false" v-model="form.enterprise" />
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
        <el-form-item
          v-if="form.type == 1"
          label="单选"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="form.single_select_answer">
           <optionItem v-for="(item,index) in select_options" :key="index"
            :label="item.label"
            :text.sync="item.text"
            :image.sync="item.image"
            />
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-else-if="form.type == 2"
          label="多选"
          :label-width="formLabelWidth"
        >
          <el-checkbox-group v-model="form.multiple_select_answer">
            <el-checkbox label="A"></el-checkbox>
            <el-checkbox label="B"></el-checkbox>
            <el-checkbox label="C"></el-checkbox>
            <el-checkbox label="D"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-else label="简单" :label-width="formLabelWidth">
          <el-input
            v-model="form.short_answer"
            resize="none"
            type="textarea"
            :rows="4"
          ></el-input>
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
import myEditor from "./myEditor";
import optionItem from "./optionItem"
export default {
  name: "questionDialog",
  components: {
    chinaArea,
    myEditor,
    optionItem
  },
  data() {
    return {
      form: {
        step: "",
        enterprise: "",
        subject: "",
        city: [],
        difficulty: 1,
        type: 1,
        title: "",
        answer_analyze: "",
        single_select_answer: "",
        multiple_select_answer: [],
        short_answer: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      select_options: [
        {
          label: "A",
          text: "",
          image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
        },
        {
          label: "B",
          text: "",
          image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
        },
        {
          label: "C",
          text: "",
          image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
        },
        {
          label: "D",
          text: "",
          image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
        }
      ]
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
