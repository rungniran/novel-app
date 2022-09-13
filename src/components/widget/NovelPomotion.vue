<template>
  <div class="promotion" v-if="cleckP !== 0">
    <div id="pointer">
      <div style="text-align: center; margin-top: 4px">{{msmP}}</div>
    </div>
    <div id="pointer1" v-if="cleckE !== false">
      <div style="text-align: center; margin-top: 4px">{{msmE}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NovelModal2",
  data() {
    return {
      onmouse: true,
    };
  },
  props: {
    cleckP: {
      type: Number,
      default: 0,
    },
    cleckE:{
      type: Boolean,
      default: false,
    },
    cleckandP:{
      default: '',
    },
    msmP: {
      type: String,
      default: '',
    },
    msmE: {
      type: String,
      default: '',
    },
  },
});
</script>
<style lang="scss" scoped>
$color:#de2727;
$color1:#8027de;
.promotion {
  display: flex;
  align-items: center;
  justify-content: start;
  border-radius: 10%;
  height: 15px;
  position: absolute;
  left: -10px;
  font-size: 13px;
  gap: 5px;
  top: 4px;
  padding: 5px;
  color: #fff;
}
#pointer1 {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  position: relative;
  background:$color1;
  // box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
#pointer1:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -15px;
  width: 0;
  height: 0;
  border-left: 15px solid  $color1;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  
}
#pointer1:before {
  content: "";
  position: absolute;
  right: 0px;
  bottom: -15px;
  width: 0;
  height: 0;
   border-right: 15px solid  $color1;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}
#pointer {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  position: relative;
  background:$color;
  // box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
#pointer:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -15px;
  width: 0;
  height: 0;
  border-left: 15px solid  $color;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  
}
#pointer:before {
  content: "";
  position: absolute;
  right: 0px;
  bottom: -15px;
  width: 0;
  height: 0;
   border-right: 15px solid  $color;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}
</style>
