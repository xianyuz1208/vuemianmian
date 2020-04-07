<template>
  <el-select v-model="selfValue" placeholder="请选择学科">
    <el-option v-if="isQuery" label="所有学科" value=""></el-option>
    <el-option
      v-for="(item, index) in subjectList"
      :key="index"
      :label="item.short_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { subList } from "@/api/subject.js";
export default {
  name: "subjectDown",
  props: {
    value: {
      type: [Number, String],
    },
    isQuery: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      subjectList: [],
      selfValue: this.value,
    };
  },
  created() {
    //学科下拉框的获取
    subList().then((res) => {
      this.subjectList = res.data.items;
    });
  },
  watch: {
    value(){
      this.selfValue = this.value
    },
    selfValue() {
      this.$emit("input", this.selfValue);
    }
  },
};
</script>

<style></style>
