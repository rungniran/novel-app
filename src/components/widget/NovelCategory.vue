<template>
  <div class="NovelCategory">
    <carousel
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
        to="/"
        v-for="(items, index) in opject"
        :key="index"
        class="category"
      >
        <img
          src="https://novelkingdom.co/banner/banner_pc_202202034194803.jpg"
          alt
        />
        <div class="cate-con">
          <div class="cate-con-name">
            <div class="cate-name line-1">เพียงรักข้ามพบ</div>
            <NovelStar :rating="5" />
          </div>
          <div class="cate-datail">
            <div>Novel Kingdom</div>
            |
            <div>Novel Kingdom</div>
            |
            <div class="view-list">
              <div class="view">
                <i class="far fa-eye"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(20000) }}
                </div>
              </div>
              <div class="list">
                <i class="fas fa-list"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(20320) }}
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
export default Vue.extend({
  name: "NovelCategory",
  props: {
    opject: [],
  },
  components: {
    carousel,
    NovelStar,
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
    };
  },
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
}
.cate-con {
  margin-top: 10px;
}
.cate-name {
  font-size: 18px;
  color: #000;
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
    font-size: 20px;
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
    font-size: 16px;
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
