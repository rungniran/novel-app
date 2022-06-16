<template>
  <div class="NovelReadNext">
    <carousel
      v-if="dataitem"
      :items="1"
      :loop="loop"
      :margin="10"
      :center="false"
      :autoplay="false"
      :singleItem="true"
      :nav="false"
      :dots="false"
      :responsive="responsive"
    >
      <router-link
        v-for="items, index in dataitem"
        :key="index"
        :to="'/read/'+ items.id_ep"
        class="NovelRead-box-carousel  NovelReadNext"
      >
      <!-- {{items}} -->
      <!-- {{'https://119.59.97.111/storage/'+items.id +'.png'}} -->
       <img
          class="item-banner"
          :src="'https://119.59.97.111/storage/novel_image/'+ items.id+ '.png'"
          @error="$event.target.src= $path.image('loading.png');"
          alt
        />
         <div class="grod-detail">
          <div class="name line-1">{{items.datail.title}}</div>
          <div  class="line-1">{{items.id_ep}}</div>
        </div>
      </router-link>
    </carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";
import { Gatway } from "@/shares/services"
export default Vue.extend({
  name: "NovelReadNext",
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
          items: 2,
        },
        415: {
          items: 2,
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
      dataitem:null
    };
  },
  methods:{
    async NovelReadNext(){
      let res = await Gatway.postService('/customers/remembers/novel-data', this.$store.state.storyread.story_Read as any)
      let data = [] as any
      this.$store.state.storyread.story_Read.forEach((element:any) => {
        res.data.data.forEach((elementres:any)=>{
          if(elementres.id === element.id){
            data.push({...element, datail:elementres})
          }
        })
      });
      console.log(data); 
      this.dataitem = data
      
    }
  },
  mounted(){
    this.NovelReadNext()
  }
});
</script>
<style lang="scss" scoped>
$second-blue: #1e2046;
$second-gray: #444349;
$second-grayLight: #cfd4d9;
.owl-carousel .owl-item img {
  border-radius: 10px;
}
.NovelRead-box-carousel {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  justify-content: center;
  align-items: flex-start;
}
.NovelReadNext .nv-box-carousel .grod-detail {
  display: flex;
  flex-direction: column;
	width: 100%;
  grid-gap: 5px;
  justify-content: flex-start;
  align-items: flex-start;
}
.nv-box-carousel .grod-detail .name {
  color: #1e2046;
  font-size: 18px;
}
.subname {
  font-size: 15px;
  color: rgb(182, 182, 182);
}
.owl-stage-outer {
  padding: 15px 0px;
}
// .NovelReadNext img {
//   transition: 0.3s;
// }
// .nv-box-carousel img:hover {
//   transform: scale(1.07);
// }
</style>
