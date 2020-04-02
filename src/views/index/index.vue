<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
        <i @click="isCollapse=!isCollapse" class="el-icon-s-fold"></i>
        <img src="../../assets/index_icon.png" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="$store.state.userIcon" alt="" />
        <span class="name">{{ $store.state.username }},您好</span>
        <el-button size="mini" type="primary" @click="open">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu router :collapse="isCollapse" :default-active="$route.path" class="el-menu-vertical-demo">
          <template v-for="(item,index) in navRoute">
          <el-menu-item v-if="item.meta.rules.includes($store.state.role)" :index="item.meta.fullPath" :key="index">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
          </template>
          <!-- <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {  logout } from "@/api/index.js";
import { remToken } from "@/uitils/token.js";
import navRoute from "@/router/childrenRoute.js"
export default {
  name: "index",
  data() {
    return {
      // avatar: "",
      // username: "",
      isCollapse: false,
      navRoute:navRoute
    };
  },
  // created() {
  //   info().then(res => {
  //     // window.console.log(res)
  //     this.username = res.data.data.username;
  //     this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
  //   });
  // },
  methods: {
    open() {
      this.$confirm("此操作将会退出该网站,是否继续?", "友情提示", {
        confirmButtonText: "确认离开",
        cancelButtonText: "继续看看",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            // window.console.log(res)
            if (res.data.code === 200) {
              remToken();
              this.$message.success("退出成功");
              this.$store.commit('changeName',"")
              this.$store.commit('changeIcon',"")
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      i {
        margin-right: 22px;
        font-size: 24px;
      }
      img {
        margin-right: 11px;
      }
      .title {
        color: #49a1ff;
        font-size: 22px;
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .name {
        color: #636363;
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
