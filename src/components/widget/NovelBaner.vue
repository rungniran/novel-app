<template>
  <div class="banner">
    <carousel
      class="banner-box"
      :items="1"
      :loop="true"
      :margin="5"
      :center="true"
      :autoplay="true"
      :autoplayTimeout="5000"
      :nav="false"
      :dots="true"
      :responsive="responsive"
    >
      <div>
        <!-- {{$path.imageCover('คุณหนูสี่.jpg')}} -->
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
      </div>
    </carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";

export default Vue.extend({
  name: "NovelBaner",
  props: {
    item: [] as [],
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
      imgitem: [],
    };
  },
});
</script>
<style>
.banner {
  margin-top: 20px;
}

.banner-box .owl-item {
  /* opacity: 0.2; */
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
