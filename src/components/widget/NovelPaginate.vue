<template>
  <div class="NovelPaginate">
    <paginate
      :page-count="count"
      :click-handler="functionName"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'nv-page'">
    </paginate>
  </div>
</template>
<script>
import Vue from 'vue'

import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)
export default Vue.extend({
  name:'NovelPaginate',
  props:{
    count:{
      type:Number,
      default:10
    }
  },
  methods:{
    async functionName(page){
      this.$emit('click', page)
    }
  }
})
</script>
<style lang="scss" >
.nv-page {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
    justify-content: flex-center;
}
.nv-page li {
    // padding: 10px;
    display: inline;
}
.nv-page li a {
    cursor: pointer;
    position: relative;
    // float: left;
    padding: 6px 14px;
    // margin-left: -1px;
    line-height: 1.42857143;
    color: #5f5f5f;
    text-decoration: none;
    background-color: #fff;
    // border: 1px solid #ddd;
}
.nv-page .active a {
    border-radius: 50%;
    background: #AB93F9 ;
    color: #fff;
}
</style>