<template>
  <div :class="'LoadingColouser nv-title-item  ' + className">
    <H1 class="loading-img  loading-title"></H1>
    <!-- {{opject}}  :lazyLoad="false"-->
    <carousel
      :items="1"
      :loop="false"
      :margin="10"
      :center="false"
      :autoplay="true"
      :singleItem="true"
      :nav="false"
      :dots="false"
      :responsive="responsive"
      v-if="opject"
    >
      <div
        v-for="(items, index) in opject"
        :key="index"
        class="nv-box-carousel LoadingColouser"
      >
 <!-- :src="items.image_data.url" :alt="items.title"-->
        <img
        
          class="item-banner loading-img"
          :src="$path.svg('imgload.svg')"
        />
        <div class="grod-detail">
          <div class="name line-1">{{items.title}}</div>
          <div class="subname loading-img"></div>
          <div class="star loading-img"></div>
          <div class="view loading-img">
          </div>
        </div>
      </div>
    </carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";


export default Vue.extend({
  name: "NovelCarousel",
  props: {
    className: String
  },
  components: {
    carousel,

  },
  data() {
    return {
      responsive: {
        0: {
          items: 2.5,
        },
        415: {
          items: 2.5,
        },
        768: {
          items: 4,
        },
        1024: {
          items: 5,
        },
        1100: {
          items: 6,
        },
      },
      opject:[...Array(6).keys()]
    };
  },
});
</script>
<style lang="scss" scoped>
.loading-title{
  height: 30px;
  width: 190px;
  border-radius: 8px;
}
.subname{
  width: 95%;
  height: 20px;
  border-radius: 5px;
}
$second-blue: #1e2046;
$second-gray: #444349;
$second-grayLight: #cfd4d9;
.LoadingColouser .grod-detail{
  width: 100%;
  display: flex;
  grid-gap: 10px;
  justify-content: flex-start;
  flex-direction: column;
}
.star{
  width: 50%;
  height: 20px;
  border-radius: 5px;
}
.view{
  width: 75%;
  height: 20px;
  border-radius: 5px;
}
.undefined{
  margin-top: 70px;
}
// .owl-stage-outer {
//   padding: 15px 0px;
// }
// .nv-box-carousel img {
//   transition: 0.3s;
// }
// .nv-box-carousel img:hover {
//   transform: scale(1.07);
// 	-webkit-transform: scale(1.07);
// }
</style>
