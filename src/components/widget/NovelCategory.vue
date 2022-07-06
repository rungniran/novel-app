<template>
  <div class="NovelCategory">
    <carousel
    v-if="data"
      :items="1"
      :autoplay="false"
      :loop="false"
      :center="false"
      :margin="10"
      class="category"
      :responsiveClass="true"
      :nav="false"
      :dots="false"
      :responsive="responsive"
    >
      <router-link
        :to="'/novel/'+ items.ref"
        v-for="(items, index) in data"
        :key="index"
        class="category"
      >
        <img
          :src="items.image_preview" 
          class="img-banner-novel"
          alt
        />
        <div class="cate-con">
          <div class="cate-con-name">
            <div class="cate-name line-1">
              {{items.novel_data.title}}
            </div>
            <!-- <NovelStar :rating="5" /> -->
          </div>
          <div class="cate-datail">
            <div>{{items.novel_data.penname_preview}}</div>
            |
            <!-- <div>Novel Kingdom</div>
            | -->
            <div class="view-list">
              <div class="view">
                <i class="far fa-eye"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(items.novel_data.total_view) }}
                </div>
              </div>
              <div class="list">
                <i class="fas fa-list"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(items.novel_data.ep_total_preview) }}
                </div>
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
import NovelStar from "@/components/widget/NovelStar.vue";
import {Gatway} from "@/shares/services"
export default Vue.extend({
  name: "NovelCategory",
  props: {
    opject: [],
  },
  components: {
    carousel,
    // NovelStar,
  },
  data() {
    return {
      responsive: {
        0: {
          items: 1,
        },
        415: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1024: {
          items: 2,
        },
      },
      data:null
    };
  },
  methods:{
    async getlist(){
       let banner2 = await Gatway.getService("/guest/banner2");
      console.log(banner2);
      this.data = banner2.data.data.filter((element:any)=>{
        return element.table
      })

    }
  },
  mounted(){
    this.getlist()
  }
});
</script>
<style>
.cate-con-name {
  display: flex;
  align-items: center;
  grid-gap: 10px;
}
.cate-datail {
  display: flex;
  align-items: center;
  grid-gap: 10px;
  flex-wrap: wrap;
   font-size: 13px;
}
.cate-con {
  margin-top: 10px;
}
.cate-name {
  font-size: 18px;
  color: #000;
}
.img-banner-novel{
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  border-radius: 20px;
}

.category .owl-carousel .owl-item img {
  border-radius: 7px;
}
@media (max-width: 768px) {
  .cate-datail {
    grid-gap: 5px;
  }
  .cate-name {
    font-size: 25px;
    color: #000;
  }
  .cate-datail {
    font-size: 13px;
}
}
@media (max-width: 415px) {
  .cate-datail {
    grid-gap: 5px;
  }
  .cate-name {
    font-size: 18px;
    color: #000;
  }
   .cate-datail {
    font-size: 13px;
}

}

/* .category .owl-item {

  opacity: 0.7;
  transition: .4s ease all !important;
  transform: scale(0.75) !important;
}
.category .center {
  opacity: 1 !important;
  transform: scale(0.9) !important;
} */
</style>
