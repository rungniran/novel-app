<template>
  <button :class="ClassName" @click="NvClick.$emit($event)">{{Msg}}</button>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name:"NovelButton",
  props:{
    ClassName:String,
    Msg:String,
    NvClick:String
  }
})
</script>