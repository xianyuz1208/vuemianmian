<template>
  <div class="enterprise-content">
    <el-card class="top-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input class="short" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            class="normal"
            v-model="formInline.status"
            placeholder="请选择状态"
          >
            <el-option label="所有" value=""></el-option>
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <template>
            <el-button type="primary" @click="searchEnterprise">搜索</el-button>
            <el-button @click="clearData">清除</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addEnterprise"
              >新增企业</el-button
            >
          </template>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="bottom-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="eid" label="企业编号"> </el-table-column>
        <el-table-column prop="name" label="企业名称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.create_time | formTime }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row)">编辑</el-button>
            <el-button type="text" @click="editStatus(scope.row)">{{
              scope.row.status === 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button type="text" @click="delData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="my-page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="formInline.page"
        :page-sizes="[2, 3, 5, 10]"
        :page-size="formInline.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="formInline.total"
      >
      </el-pagination>
    </el-card>
    <upEnterprise ref="upEnterprise"></upEnterprise>
  </div>
</template>

<script>
import {
  enterpriseList,
  enterpriseStatus,
  delEnterprise
} from "@/api/enterprise";
import upEnterprise from "./components/upEnterprise";
export default {
  name: "enterprise",
  components: {
    upEnterprise
  },
  data() {
    return {
      formInline: {
        name: "",
        eid: "",
        username: "",
        status: "",
        page: 1,
        limit: 5,
        total: 5
      },
      tableData: [{}]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取数据列表
    getData() {
      enterpriseList({
        ...this.formInline
      }).then(res => {
        // console.log(res)
        this.tableData = res.data.items;
        this.formInline.page = parseInt(res.data.pagination.page);
        this.formInline.total = res.data.pagination.total;
      });
    },
    //修改状态
    editStatus(row) {
      enterpriseStatus({ id: row.id }).then(res => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.getData();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //新增
    addEnterprise(){
      this.$refs.upEnterprise.show()
      console.log(111)
    },
    //编辑
    editData(row){
      this.$refs.upEnterprise.show(JSON.parse(JSON.stringify(row)))
    },
    //删除数据
    delData(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delEnterprise({ id: row.id }).then(res => {
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
            message: "已取消删除"
          });
        });
    },
    //搜索
    searchEnterprise() {
      this.formInline.page = 1;
      this.getData();
    },
    //清除
    clearData() {
      this.$refs.formInline.resetFields();
      this.formInline.page = 1;
      this.getData();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //每页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.formInline.page = val
      this.getData()
    }
  }
};
</script>

<style lang="less">
.enterprise-content {
  .top-card {
    .short {
      width: 100px;
    }
    .normal {
      width: 150px;
    }
  }
  .bottom-card {
    margin-top: 19px;
    .el-table .cell {
      text-align: center;
    }
    .my-page {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>
