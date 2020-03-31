<template>
  <div class="subject-content">
    <el-card class="top-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="short" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            class="normal"
            v-model="formInline.status"
            placeholder="请选择状态">
            <el-option label="所有" value=""></el-option>
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="searchData" type="primary">查询</el-button>
          <el-button>清除</el-button>
          <el-button @click="showDialog" icon="el-icon-plus" type="primary">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="bottom-card">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="120">
        </el-table-column>
        <el-table-column prop="name" label="学科名称" width="130">
        </el-table-column>
        <el-table-column prop="short_name" label="简称" width="140"></el-table-column>
        <el-table-column prop="username" label="创建者" width="130"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
             <span v-if="scope.row.status === 1">启用</span>
             <span style="color:red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button size="mini" type="text">编辑</el-button>
          <el-button size="mini" @click="modification(scope.$index,scope.row)" type="text">{{ scope.row.status===1 ? "禁用" : "启用" }}</el-button>
          <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="my-page"
        background
        :page-sizes="[2, 4, 5, 6]"
        :page-size="limit"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <subjectAdd ref="subjectAdd"></subjectAdd>
  </div>
</template>

<script>
 import {subList,subStatus} from '@/api/subject.js'
 import subjectAdd from "./components/subjectAdd"
export default {
  name: "subject",
  components:{
    subjectAdd
  },
  created(){
     this.getData()
  },
  data() {
    return {
      formInline: {
        name: "",
        username: "",
        rid:"",
        status:""
      },
      tableData: [
        {
          create_time: "",
          name: "",
          username: "",
          status:"",
          rid:"",
          short_name:""
        }
      ],
      page: 1,
      limit: 5,
      total: 20
    };
  },
  methods:{
      getData(){
      subList({
        limit:this.limit,
        page:this.page,
        ...this.formInline
         }).then(res =>{
       window.console.log(res)
       this.tableData = res.data.items
       this.total = res.data.pagination.total
     })
      },
      searchData(){
        this.page = 1;
        this.getData()
      },
      showDialog(){
        this.$refs.subjectAdd.dialogFormVisible = true;
      },
      modification(index,row){
        subStatus({
          id:row.id
        }).then(res =>{
          window.console.log(res)
          if(res.code === 200){
            this.$message.success('修改状态成功')
            this.getData()
          }
        })
      },
      //页容量改变
      sizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.page = 1,
        this.limit = val
        this.getData()
      },
      //页码改变
      currentChange(val) {
        this.page = val
        this.getData()
        // console.log(`当前页: ${val}`);
      }
  }
};
</script>

<style lang="less">
.subject-content {
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
    .my-page {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>
