<template>
<div>            
  <!-- :style="'min-height:'+ 20 +'rem'" -->
  <!-- {{valueWay}} editor -->
   <quill-editor
            :class="classset"

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
// const spell = require('spell-checker-js')
//  import spell  from "spell-checker-js"
// Load dictionary
// spell.load('en')
 
// // Checking text
// const check = spell.check('Some text to check, blahblahblah, olololo')
 
// console.log(check)
import dedent from "dedent";
import hljs from "highlight.js";
import debounce from "lodash/debounce";
import { quillEditor } from "vue-quill-editor";
import "highlight.js/styles/tomorrow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Vue from "vue";

export default Vue.extend({
  name: "NovelEditor",
  components:{
    quillEditor
  },
  props:{
    classset:{
      type:String,
      default:'class'
    },
    valueWay:{
      type:String,
      default:''

    },
    height:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      content: dedent`${this.valueWay}`,
      editorOption: {
        placeholder: "เนื้อหา",
        theme: 'snow',
          // theme: 'bubble',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: '' }, { align: 'center' }, { align: 'right' }],
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
    };
  },
  mounted(){
    this.quill.root.setAttribute('data-placeholder', "Your new placeholder");
  },
  methods: {

    onEditorChange: debounce(function (value) {
      console.log(value.html);
      //  this.quill.getText().trim();
      // this.forment(value.html)value.html.replaceAll('style','class')
      let text = value.html.replaceAll('style','class')
      // console.log(text);
      this.$emit('Editor', text)
      this.content = text
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
  // async forment(html){
  //     let cutcode = await html
  //     let cutcode2  = await html.split("<p>")
  //     if(cutcode2.length > 15 || cutcode2.length == 1){
  //       return cutcode
  //     }else{
  //       return '<p class="pre-wrap">' + cutcode2[1] 
  //     }
  // },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    },
  },
  // mounted(){}
  // mounted(){
    
  // }

})

  </script>
<style lang="scss">
$f:1.2em;
.editor .ql-editor {
    // -webkit-user-select: text;
    white-space: normal !important;
    padding: 30px 70px;
    // padding: 0px 0px;
}
.editor  .ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 0px;
  
  // height: 100px !important;
   border: 0px solid #ccc;
}
.editor .ql-toolbar.ql-snow {
  // margin: 0px 70px !important;
    border: 0px solid #ccc;
    box-sizing: border-box;
    // font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    padding: 8px;
}
.editor .ql-editor {
   font-family: "Sarabun", sans-serif;
    line-height: 1.7 ;
    box-sizing: border-box;
    min-height: 300px;
    font-size: 18px !important;
}
.ql-editor {
 min-height: 300px
}
// .ql-editor p {
//     margin-block-start: 1em;
//     margin-block-end: 1em;
// }
.editor .ql-editor p {
 -webkit-margin-before: $f;
    margin-block-start: $f;
    -webkit-margin-after: $f;
    margin-block-end: $f;
    margin-block-start: $f;
    text-indent: 10%;
}
@media (max-width: 768px) {
	.editor .ql-editor {
		    padding: 30px 35px !important;
	}
  // .nv-btn-gold-ep{
  //   border-radius: 50px;
  // }
}



@media (max-width: 415px) {
    // .ql-editor p {
    // text-indent: 1.5em;
    // }
    .editor .ql-editor {
        padding: 30px 10px !important;
    }
}
@media (max-width: 415px) {
    // .editor .ql-editor p {
    //   text-indent: 1.5em;
    // }
}

  </style>