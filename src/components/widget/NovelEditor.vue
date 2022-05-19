<template>
<div>            
  <!-- :style="'min-height:'+ 20 +'rem'" -->
   <quill-editor
            class="editor"

            ref="myTextEditor"
            :value="valueWay"
            :options="editorOption"
            @change="onEditorChange"
           
          >
          </quill-editor> 
          <!-- @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)" -->
</div>
</template>
<script>

import dedent from "dedent";
import hljs from "highlight.js";
import debounce from "lodash/debounce";
import { quillEditor } from "vue-quill-editor";
import "highlight.js/styles/tomorrow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import Vue from "vue";

export default Vue.extend({
  name: "NovelEditor",
  components:{
    quillEditor
  },
  props:[
    "valueWay",
    "height"
  ],
  data() {
    return {
      content: dedent`${this.valueWay}`,
      editorOption: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
    };
  },
  methods: {
    onEditorChange: debounce(function (value) {
      // console.log(value.html);
      this.$emit('Editor', value.html)
      this.content = value.html
    }, 466),
    // onEditorBlur(editor) {
    //   console.log("editor blur!", editor);
    // },
    // onEditorFocus(editor) {
    //   console.log("editor focus!", editor);
    // },
    // onEditorReady(editor) {
    //   console.log("editor ready!", editor);
    // },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    },
  },

})

  </script>
<style lang="scss">
  .ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 0px;
  // height: 100px !important;
}
.editor {
  line-height: 2;
  // height: 20rem;
  //   overflow: hidden;
}
.ql-editor {
    line-height: 2 ;
}
.ql-editor {
  font-family: "Sarabun", sans-serif;
    line-height: 2 !important;

}

.ql-editor {
    box-sizing: border-box;
    line-height: 1.42;
    min-height: 300px;
}
  </style>