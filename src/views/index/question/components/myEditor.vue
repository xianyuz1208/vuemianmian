<template>
  <quill-editor
    v-model="selfValue"
    ref="myQuillEditor"
    :options="editorOption"
    @change="onEditorChange($event)"
  >
  </quill-editor>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.snow.css";
import * as Quill from "quill";
export default {
  name: "myEditor",
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      selfValue:this.vaule,
      editorOption: {
        placeholder: '请输入正文'
      }
    };
  },
  methods:{
    onEditorChange($event){
      // window.console.log($event)
      this.$emit('input',$event.html)
    }
  },
};
</script>

<style></style>
