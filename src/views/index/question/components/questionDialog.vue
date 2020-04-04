<template>
  <div class="question-content">
    <el-dialog
      fullscreen
      :title="(isEdit ? '编辑' : '新增') + '题库'"
      :destroy-on-close="isDdestroy"
      :visible.sync="dialogFormVisible"
    >
      <el-form :rules="rules" ref="questionForm" :model="form">
        <el-form-item prop="subject" label="学科" :label-width="formLabelWidth">
          <subjectDown :isQuery="false" 
          :value.sync="form.subject" />
        </el-form-item>
        <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="企业"
          prop="enterprise"
          :label-width="formLabelWidth"
        >
          <enterpriseDown :isQuery="false" :value.sync="form.enterprise" />
        </el-form-item>
        <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
          <chinaArea v-model="form.city" />
        </el-form-item>
        <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="难度"
          prop="difficulty"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item
          label="试题标题"
          prop="title"
          :label-width="formLabelWidth"
        >
          <myEditor v-model="form.title" />
        </el-form-item>
        <el-form-item
          v-if="form.type == 1"
          label="单选"
          :label-width="formLabelWidth"
          prop="single_select_answer"
        >
          <el-radio-group v-model="form.single_select_answer">
            <optionItem
            v-for="(item,index) in form.select_options"
            :key="index"
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
          prop="multiple_select_answer"
        >
          <el-checkbox-group v-model="form.multiple_select_answer">
            <optionItem
              v-for="(item, index) in form.select_options"
              :key="index"
              :label="item.label"
              :isRadio="false"
              :text.sync="item.text"
              :image.sync="item.image"
            />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          v-else
          prop="short_answer"
          label="简答"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.short_answer"
            resize="none"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="解析视频" :label-width="formLabelWidth">
          <uploadVideo :video.sync="form.video" />
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item
          label="答案解析"
          prop="answer_analyze"
          :label-width="formLabelWidth"
        >
          <myEditor v-model="form.answer_analyze" />
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item
          label="试题备注"
          prop="remark"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.remark"
            resize="none"
            type="textarea"
            :rows="2"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('questionForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import chinaArea from "./chinaArea";
import myEditor from "./myEditor";
import optionItem from "./optionItem";
import uploadVideo from "./uploadVideo";
import { questionAdd, getQuestion } from "@/api/question.js";
export default {
  name: "questionDialog",
  components: {
    chinaArea,
    myEditor,
    optionItem,
    uploadVideo,
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
        short_answer: "",
        video: "",
        remark: "",
        select_options: [
          {
            label: "A",
            text: "",
            image: "",
          },
          {
            label: "B",
            text: "",
            image: "",
          },
          {
            label: "C",
            text: "",
            image: "",
          },
          {
            label: "D",
            text: "",
            image: "",
          },
        ],
        // id: this.id,
      },
      //布尔值,false是新增,true是编辑
      isEdit: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      isDdestroy: false,
      rules: {
        step: [{ required: true, message: "请输入阶段", trigger: "blur" }],
        enterprise: [
          { required: true, message: "请输入企业", trigger: "blur" },
        ],
        subject: [{ required: true, message: "请输入学科", trigger: "blur" }],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        difficulty: [
          { required: true, message: "请选择题目难度", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择题型", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        answer_analyze: [
          { required: true, message: "请输入答案解析", trigger: "blur" },
        ],
        single_select_answer: [
          { required: true, message: "请输入单选题答案", trigger: "blur" },
        ],
        multiple_select_answer: [
          { required: true, message: "请输入多选题答案", trigger: "blur" },
        ],
        short_answer: [
          { required: true, message: "请输入简单题答案", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入答案备注", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
      show(editData) {
      this.dialogFormVisible = true;
      if (editData == undefined) {
        this.$nextTick(() => {
          this.isEdit = false;
          // this.form = {};
          this.$refs.questionForm.resetFields();
        });
      } else {
        this.$nextTick(() => {
          this.isEdit = true;
          this.form = editData;
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          questionAdd(this.form).then((res) => {
            // window.console.log(res)
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.dialogFormVisible = false;
              this.isDdestroy = true;
              this.$refs.questionForm.resetFields();
              this.$parent.getData();
            } else {
              this.$message.error(res.code);
            }
          });
        } else {
          this.$message.error("校验失败,请检查数据");
          return false;
        }
      });
    },
  },
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
