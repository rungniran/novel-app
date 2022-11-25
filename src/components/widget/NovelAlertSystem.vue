<template>
  <div class="NovelAlertSystem">
    <div class="con-aler-system">
    <!-- <div class="aler-system">
    </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name:"NovelAlertSystem"
})
</script>
<style lang="scss" >
.aler{
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 20px 15px;
  margin-bottom: -200px;
  min-width: 300px;
  transition: .5s;
  width: 300px;
  opacity: 0;
  animation-name: example;
  animation-fill-mode: both;
  animation-duration: 5s;
}
@mixin all-aler($color, $color-border, $background) {
    @extend .aler;
    color: $color;
    
    background-color: $background;
    border:1px solid $color-border;
    
}

.aler-system{
  @include all-aler(#f7e0d9,#DF3D0A, #DF3D0A);
}
.success{
  @include all-aler(#dee9e4,#dee9e4, #61BCBE);
}

.error{
  @include all-aler(#fabfae,#DF3D0A, #DF3D0A);
}
.wraning{
  @include all-aler(#664d03,#fff3cd, #fff3cd);
}
    // color: #664d03;
    // background-color: #fff3cd;
    // border-color: #fff3cd;

@keyframes example {
  0% {
    opacity: 0;
    margin-bottom: -200px
    }
  10%{
    opacity: 5;
    margin-bottom: 0px
  }
  50%{
    opacity: 10;
    margin-bottom: 0px
  }
  90%{
    opacity: 2;
  margin-bottom: 0px
  }
  100% {
    opacity: 0;
    margin-bottom: 20px;
    pointer-events: none;
    display: none;
  }
}
// .aler-system-show{
//   opacity: 10;
//   pointer-events: auto;
  
// }
.con-aler-system{
  position: fixed;
  
  bottom: 20px;
  display: grid;
  grid-gap: 10px;
  flex-direction: column-reverse;
 right: 20px;
 pointer-events: none; 
 z-index: 4000;
}
</style>