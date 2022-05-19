<template>
  <div class="NovelReadNext">
    <carousel
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
      <div
        v-for="(items) in opject"
        :key="items.id"
        :to="'/novel/' + items"
        class="NovelRead-box-carousel  NovelReadNext"
      >
        <img
          class="item-banner"
          src="https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/61d58aa01353ba001c779a4d/61dc081cUzBPUw7w.jpeg"
          alt
        />
        <div class="grod-detail">
          <div class="name">เพียงรักข้ามพบ</div>
          <div>บทที่ 11 เริ่มต้นใหม่</div>
        </div>
      </div>
    </carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";

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
