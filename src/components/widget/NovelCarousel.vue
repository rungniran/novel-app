<template>
  
    
    <carousel 
      :items="1"
      :loop="true"
      :margin="10"
      :center="false"
      :lazyLoad="false"
      :autoplay="false"
      :singleItem="false"
      :nav="false"
      :dots="false"
      :responsive="responsive"
     
    >
    <template>
      
      <router-link
        v-for="(items, index) in opject"
        :key="index"
        :to="'/novel/' + items.id"
        class="nv-box-carousel carousel"
      >
      
        <img
        
          class="item-banner"
          :src="items.image_data ? items.image_data.url  : $path.image('loading.png')"
           onerror="this.onerror=null;this.src='https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png';"
           :alt="items.title"
          
        />
        <div class="grod-detail">
          <div class="name line-1">{{items.title}}</div>
          <div class="subname">{{items.novel_category_data_preview}}</div>
          <div><NovelStar :rating="Math.round (items.avg_star)" /></div>
          <div class="view-list">
            <div class="view">
              <i class="far fa-eye"></i>
              <div class="count-numble-view">
                {{ $filter.NumbertoText(items.total_view) }}
              </div>
            </div>
            <div class="list">
              <i class="fas fa-list"></i>
              <div class="count-numble-view">
                {{ $filter.NumbertoText(items.novel_episode_data_total) }}
              </div>
            </div>
          </div>
        </div>
      </router-link>
      </template>
    </carousel >

</template>

<script lang="ts">
import Vue from "vue";
import carousel  from "vue-owl-carousel";
import NovelStar from "@/components/widget/NovelStar.vue";

export default Vue.extend({
  name: "NovelCarousel",
  props: {
    loop:Boolean,
    opject:[],
    // eslint-disable-next-line no-undef
  },

  components: {
    // carousel:()=> import('../../../node_modules/vue-owl-carousel') ,
    NovelStar,
    carousel
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
  // methods:{
  //   reface(){
  //   var container = document.getElementById("Carousel") as HTMLElement;
  //   console.log( container.innerHTML);
  //   var content = container.innerHTML;
  //   container.innerHTML= content; 
  //   }
  // }
});
</script>
<style lang="scss" scoped>

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
  align-items: center;
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
