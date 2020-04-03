<template>
  <el-select v-model="selfValue" placeholder="请选择企业">
    <el-option label="所有企业" :value="0"></el-option>
    <el-option
      v-for="(item, index) in enterpriseList"
      :key="index"
      :label="item.short_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { enterpriseList } from "@/api/enterprise.js";
export default {
  name: "enterpriseDown",
  props: {
    value: {
      type: Number
    }
  },
  data() {
    return {
      enterpriseList: [],
      selfValue: this.value
    };
  },
  created() {
    //获取企业列表
    enterpriseList().then(res => {
      this.enterpriseList = res.data.items;
    });
  },
  watch: {
    selfValue() {
      this.$emit("input", this.selfValue);
    }
  }
};
</script>

<style></style>
