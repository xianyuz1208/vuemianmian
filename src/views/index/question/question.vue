<template>
  <div class="question-content">
    <el-card class="top-card">
      <el-form
        :inline="true"
        ref="formInline"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item prop="subject" label="学科">
          <subjectDown v-model="formInline.subject" />
        </el-form-item>
        <el-form-item prop="step" label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="enterprise" label="企业">
          <enterpriseDown v-model="formInline.enterprise" />
        </el-form-item>
        <el-form-item prop="type" label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item prop="difficulty" label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="作者">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="create_date" label="日期">
          <el-date-picker
            v-model="formInline.create_date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item prop="title" label="标题" class="title-input">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="serchData">搜索</el-button>
          <el-button @click="clearData">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addQusetion"
            >新增试题</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="bottom-card">
      <el-table :data="tableData" border style="width: 100%;">
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
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color: red;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editQuestion(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="editStatus(scope.row)">
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </el-button>
            <el-button type="text" @click="delData(scope.row)">删除</el-button>
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
import { questionList, changeStatus, delQuestion } from "@/api/question.js";
import questionDialog from "./components/questionDialog";
export default {
  name: "question",
  components: {
    questionDialog,
  },
  data() {
    return {
      formInline: {
        username: "",
        step: "",
        type: "",
        status: "",
        enterprise: "",
        subject: "",
        create_date: "",
        title: "",
        difficulty: "",
      },
      tableData: [{}],
      page: 1,
      limit: 5,
      total: 2,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      questionList({
        page: this.page,
        limit: this.limit,
        ...this.formInline,
      }).then((res) => {
        this.tableData = res.data.items;
        this.page = parseInt(res.data.pagination.page);
        this.total = res.data.pagination.total;
      });
    },
    serchData() {
      this.page = 1;
      this.getData();
    },
    clearData() {
      this.$refs.formInline.resetFields();
      this.page = 1;
      this.getData();
    },
    //修改状态
    editStatus(row) {
      changeStatus({ id: row.id }).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改状态成功");
          this.getData();
        } else {
          this.message.error(res.message);
        }
      });
    },
    //删除
    delData(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delQuestion({ id: row.id }).then((res) => {
            if (res.code === 200) {
              this.$message.success("删除成功");
              if (this.tableData.length == 1) {
                this.formInline.page--;
                if (this.formInline.page <= 0) {
                  this.formInline.page = 1;
                }
              }
              this.getData();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editQuestion(row) {
      let rowData = JSON.parse(JSON.stringify(row));
      rowData.city = rowData.city.split(",");
      rowData.multiple_select_answer = rowData.multiple_select_answer.split(
        ","
      );
      this.$refs.questionDialog.show(rowData);
    },
    addQusetion() {
      this.$refs.questionDialog.show();
    },
    //页容量改变
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      this.page = 1;
      this.getData();
    },
    //每页改变
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getData();
    },
  },
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
