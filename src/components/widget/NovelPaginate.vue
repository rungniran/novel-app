<template>
  <div class="NovelPaginate"> 
     <!-- :page-range="1" -->
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
    /* display: inline-block; */
    /* padding-left: 0; */
    /* margin: 20px 0; */
    /* border-radius: 4px; */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.nv-page li a {
   display: inline; 
    width: 40px;
    border: 1px solid #9575ff;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #9575ff;
}
// .nv-page li a {
//     cursor: pointer;
//     position: relative;
//     // float: left;
//     padding: 6px 14px;
//     // margin-left: -1px;
//     line-height: 1.42857143;
//     color: #5f5f5f;
//     text-decoration: none;
//     background-color: #fff;
//     // border: 1px solid #ddd;
// }
.nv-page .active a {
    border-radius: 50%;
    background: #9575ff ;
    color: #fff !important;
}
</style>