<template>
  <div class="banner">
    <!-- {{item}} -->
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
      <div  v-for="(items, index) in item" :key="index"  @click="open(items.url)"  >
          <NovelImage :image="items.image_data.url" :alt="items.title " datatype="Banner"></NovelImage>

      </div>
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
        2000:{
          items:3.8
        }
      },
      imgitem:null,
    };
  },
  methods:{
   async  getlist(){
       let banner = await Gatway.getService("/guest/banner");
      let statusname = banner.data.data.filter((element:any)=>{
        return !element.table
      })
      console.log(statusname);
      
      this.imgitem = statusname
      // this.banner = banner.data.data.sort((a, b) => {
      //   return a.ranking - b.ranking;
      // });
    },
    open(url){
      window.open(url)
    },
    route(uuid){
      this.$router.push('/novel/'+ uuid)
    }
  },
  mounted(){
    // this.getlist()
  }
});
</script>
<style >
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
    .banner {
    margin-top: 50px;
  }
}

@media (max-width: 415px) {
  .banner-box .owl-carousel .owl-item img {
    border-radius: 0px;
  }
  .banner {
    margin-top: 48px;
  }
}
</style>
