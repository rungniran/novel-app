<template>
  <div class="Carousel">
    <!-- <pre>

    {{opject}} 
    </pre> -->
    <carousel
      :items="1"
      :loop="loop"
      :margin="10"
      :center="false"
      :autoplay="true"
      :singleItem="true"
      :nav="false"
      :dots="false"
      :responsive="responsive"
      v-if="opject"
    >
    
      <router-link
        v-for="(items, index) in opject"
        :key="index"
        :to="'/novel/' + items.novel_data.id"
        class="nv-box-carousel carousel "
      >
      <NovelPomotion :cleckP='items.novel_promotion_datas.length ' @cleckandP="0" msmP="Sale" msmE='จบ' :cleckE='items.status_end_novel'/>

        <img
        
          class="item-banner"
           v-lazy="items.novel_data.image_data ? items.novel_data.image_data.url  : $path.image('loading.png')"
           onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
           :alt="items.title"
          
        />
        <div class="grod-detail">
          <div class="name line-1">{{items.novel_data.title}}</div>
          <div class="subname">{{items.novel_category_data_preview}}</div>
          <div><NovelStar :rating="4" /></div>
          <div class="view-list">
            <div class="view">
              <i class="far fa-eye"></i>
              <div class="count-numble-view">
                {{ $filter.NumbertoText(200000) }}
              </div>
            </div>
            <div class="list">
              <i class="fas fa-list"></i>
              <div class="count-numble-view">
                {{ $filter.NumbertoText(items.novel_data.novel_episode_data_total) }}
                       {{items.image_data}}
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";

export default Vue.extend({
  name: "NovelCarousel",
  props: {
    loop:Boolean,
    opject:[],
    // eslint-disable-next-line no-undef
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
    };
  },
});
</script>
<style lang="scss">
$second-blue: #1e2046;
$second-gray: #444349;
$second-grayLight: #cfd4d9;
.owl-carousel .owl-item img {
  border-radius: 10px;
}
.nv-box-carousel {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  justify-content: center;
  // align-items: center;
}
.nv-box-carousel .grod-detail {
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  justify-content: center;
  align-items: center;
}
.nv-box-carousel .grod-detail .name {
  color: #1e2046;
  font-size: 18px;
}
.subname {
  font-size: 15px;
  color: rgb(182, 182, 182);
}
.promotion {
  display: flex;
  align-items: center;
  justify-content: start;
  // width: 70px;
  border-radius: 10%;
  height: 10px;
  position: absolute;
  // background: #fb5353;
  left: 0px;
  font-size: 13px;
  // z-index: 100;
  top: 5px;
  padding: 5px;
  color: #fff;
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
