<template>
  <el-cascader
    size="large"
    :options="options"
    v-model="selfValue"
    @change="handleChange"
    :props="{value:'label'}"
  >
  </el-cascader>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  name:'chinaArea',
  props:{
    value:{
      type:Array
    }
  },
  data(){
    return{
      selfValue:this.vaule,
      options: regionData
    }
  },
  methods:{
    handleChange(val){
      this.$emit('input',val)
    }
  }
};
</script>

<style></style>
