<template>
  <div>
    <div class="promotion" v-if="cleckP !== 0">
      <div id="pointer">
        <div class="position-tag">{{ msmP }}</div>
      </div>
    </div>
    <div id="triangle-topright" class="" v-if="cleckE !== false  && cleckE !== null">
      <!-- {{msmE}} -->
    <div class="tags-end">{{msmE}}</div>
  </div>
    <!-- <div class="tags-end" v-if="cleckE !== false">
      <div>
        <div class="tag">
          <div class="tag-side tag-3-side">
            <div class="tag-text tag-3-text">
              จบ
            </div>
          </div>
        </div>
      </div>
    </div> -->
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
    cleckE: {
      type: Boolean,
      default: false,
    },
    cleckandP: {
      default: "",
    },
    msmP: {
      type: String,
      default: "",
    },
    msmE: {
      type: String,
      default: "",
    },
  },
});
</script>
<style lang="scss" scoped>
$color: #de2727;
$color1: #8027de;
.promotion {
  display: flex;
  align-items: center;
  justify-content: start;
  border-radius: 10%;
  height: 10px;
  position: absolute;
  left: -7px;
  font-size: 13px;
        top: 6px;
    right: -2px;
  gap: 5px;
  top: 4px;
  padding: 5px;
  color: #fff;
  z-index: 10;
}
.position-tag {
  text-align: center;
  margin-top: 4px;
}
.tags-end {
  position: absolute;
  // display: flex;
  // align-items: center;
  // justify-content: start;
  // // width: 70px;
  // border-radius: 12px;
  // height: 15px;
  // position: absolute;
  // // background: #fb5353;
  // right: 0px;
  // font-size: 13px;
  // // z-index: 100;
  // top: 0px;
  // padding: 10px;
  // color: #fff;
  // background-color: #8027de;
  // z-index: 10;
}
#pointer1 {
  width: 30px;
  height: 30px;
    //   top: 6px;
    // right: -2px;
  border-radius: 4px;
  position: relative;
  background: $color1;
  // box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
#pointer1:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -15px;
  width: 0;
  height: 0;
  border-left: 15px solid $color1;
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
  border-right: 15px solid $color1;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}
#pointer {
  width: 30px;
  height: 30px;
        top: 6px;
    right: -2px;
  border-radius: 4px;
  position: relative;
  background: $color;
  // box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
#pointer:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -15px;
  width: 0;
  height: 0;
  border-left: 15px solid $color;
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
  border-right: 15px solid $color;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}

    #triangle-topright {
      width: 0;
      height: 0;
      position: absolute;
      // border-top-right-radius:10px;
      // border-top: 100px solid red;
      // border-left: 100px solid transparent;
          border-top: 40px solid $color1;
    border-left: 40px solid transparent;
    
    // border-radius: 0 10px 0 0;
    top: 0;
    right: 0;
    z-index: 10;
    }
.tags-end{
  // position: absolute;
      position: absolute;
    top: -35px;
}
</style>
