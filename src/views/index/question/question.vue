<template>
  <div class="question-content">
    <el-card class="top-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <subjectDown v-model="formInline.subject" />
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.region" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <enterpriseDown v-model="formInline.enterprise" />
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.region" placeholder="请选择题型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.region" placeholder="请选择难度">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="formInline.value"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题" class="title-input">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addQusetion">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="bottom-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80px">
        </el-table-column>
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">
            {{ scope.row.subject_name }}
            .
            {{ { 1: "初级", 2: "中级", 3: "高级" }[scope.row.step] }}
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">
            {{ { 1: "简单", 2: "一般", 3: "困难" }[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? "启用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        background
        :page-sizes="[2, 3, 5, 10]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <questionDialog ref="questionDialog"></questionDialog>
  </div>
</template>

<script>
// import subjectDown from "./components/subjectDown.vue";
// import enterpriseDown from "./components/enterpriseDown.vue";
import { questionList } from "@/api/question.js";
import questionDialog from "./components/questionDialog"
export default {
  name: "question",
  components: {
    // subjectDown,
    // enterpriseDown,
    questionDialog
  },
  data() {
    return {
      formInline: {
        user: "",
        region: "",
        value: "",
        status: "",
        enterprise: "",
        subject: ""
      },
      tableData: [{}],
      page: 1,
      limit: 5,
      total: 2
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      questionList().then(res => {
        this.tableData = res.data.items;
        this.page = res.data.pagination.page;
        this.total = res.data.pagination.total;
      });
    },
    addQusetion(){
      this.$refs.questionDialog.dialogFormVisible = true
    },
    //页容量改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //每页改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less">
.question-content {
  .top-card {
    .el-form--inline .el-form-item:not(:last-child) .el-form-item__content {
      width: 150px;
    }
    .el-card__body {
      padding-left: 11px;
      .el-form--inline .el-form-item {
        padding-left: 30px;
      }
    }
    .el-form--inline .el-form-item.title-input .el-form-item__content {
      width: 382px;
    }
    .el-date-editor.el-input {
      width: 150px;
    }
  }
  .bottom-card {
    margin-top: 20px;
    .el-table .cell {
      text-align: center;
    }
    .el-pagination {
      text-align: center;
      margin-top: 31px;
    }
  }
}
</style>
