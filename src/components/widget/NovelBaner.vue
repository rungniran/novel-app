<template>
  <div class="banner">
    <!-- {{imgitem}} -->
    <carousel
      class="banner-box"
      :items="1"
      :loop="true"
      :margin="5"
      :center="true"
      :autoplay="true"
      :autoplayTimeout="8000"
      :nav="false"
      :dots="true"
      :responsive="responsive"
      v-if="item"
    >
      <div  v-for="(items, index) in item" :key="index">
        <router-link v-if="items.ref" :to="'novel/'+ items.ref"> <img :src="items.image_preview" alt /></router-link>
        <img v-else :src="items.image_preview" alt />
      </div>
      <!-- <div>
        <img :src="$path.imageCover('คุณหนูสี่.jpg')" alt />
      </div>
      <div>
        <img :src="$path.imageCover('เคล็ดกายา.jpg')" alt />
      </div>
      <div>
        <img :src="$path.imageCover('กดซื้อหลายตอน.jpg')" alt />
      </div>
      <div>
        <img :src="$path.imageCover('ช่องทางเติมเหรียญ.jpg')" alt />
      </div>
      <div>
        <img :src="$path.imageCover('ท่านอ๋อง.jpg')" alt />
      </div>
      <div>
        <img :src="$path.imageCover('เทพสงคราม.jpg')" alt />
      </div>
      <div>
        <img :src="$path.imageCover('นครแห่งบาป.jpg')" alt />
      </div>
      <div>
        <img :src="$path.imageCover('แม่สาวเข็มเงิน.jpg')" alt />
      </div>
      <div>
        <img :src="$path.imageCover('ยอดนักรบ.jpg')" alt />
      </div>
      <div>
        <img :src="$path.imageCover('องค์ชายขี้โรค.jpg')" alt />
      </div> -->
    </carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";
import { Gatway } from "@/shares/services";
export default Vue.extend({
  name: "NovelBaner",
  props: {
    item: null as any,
  },
  components: {
    carousel,
  },
  data() {
    return {
      responsive: {
        415: {
          items: 1,
        },
        768: {
          items: 1.29,
        },
        1024: {
          items: 2.4,
        },
      },
      imgitem:null,
    };
  },
  methods:{
   async  getlist(){
       let banner = await Gatway.getService("/guest/banner");
      console.log(banner);
      let statusname = banner.data.data.filter((element:any)=>{
        return !element.table
      })
      console.log(statusname);
      this.imgitem = statusname
      // this.banner = banner.data.data.sort((a, b) => {
      //   return a.ranking - b.ranking;
      // });
    }
  },
  mounted(){
    // this.getlist()
  }
});
</script>
<style>
.banner {
  margin-top: 20px;
}

.banner-box .owl-item {
 
  transition: 0.4s ease all !important;
  transform: scale(0.95) !important;
}
.banner-box .center {
  opacity: 1 !important;
  transform: scale(1) !important;
}
.banner-box .owl-carousel .owl-item img {
  border-radius: 10px;
}

@media (max-width: 768px) {
}

@media (max-width: 415px) {
  .banner-box .owl-carousel .owl-item img {
    border-radius: 0px;
  }
  .banner {
    margin-top: 36px;
  }
}
</style>
