<template>
   <div>
       <div class="b-mo">
      คู่มือนักเขียน
    </div>
    <div class="con-layout ">
        
    </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
   mounted(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>
<style lang="scss" scoped>
.b-mo{
  background: url(https://fictionlog.co/a/images/bannerPatterns/writer_guidelines.svg) left 50px / 600px repeat #9556fb;
  width: 100%;
  height: 80px;
  margin-top: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  
}
.con-layout{
    margin: auto;
    max-width: 1150px;
    height: 100vh;
    background: #fff;
}
</style>
