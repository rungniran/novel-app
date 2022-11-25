<template>
    <carousel
      v-if="opject"
      :items="1"
      :loop="true"
      :margin="10"
      :center="false"
      :autoplay="false"
      :singleItem="true"
      :nav="false"
      :dots="false"
      :responsive="responsive"
    >
      <div v-for="(items, index) in opject" :key="index">
        <div v-if="items.datail">
          <!-- {{items.datail.novel_episode_datas.lengt }} -->
          <router-link
            :to=" items.datail.novel_episode_datas.length !== 0 ? '/read/' + items.id_ep : '/novel/' + items.id"
            class="NovelRead-box-carousel NovelReadNext"
          >
            <NovelImage :image="$filter._dataUrl(items.datail.image_data)" :alt="items.datail.title "></NovelImage>
            <div class="grod-detail">
              <div class="name line-1">{{ items.datail.title }}</div>
              <div class="subname line-1">
                {{
                  items.datail.novel_episode_datas.length !== 0
                    ? items.datail.novel_episode_datas[0]["name"]
                    : "นิยายตอนนี้ถูกลบ"
                }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </carousel>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";
export default Vue.extend({
  name: "NovelReadNext",
  props: {
    loop: Boolean,
    opject: [],
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
        540:{
           items: 3,
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
      dataitem: null,
    };
  },
  // methods: {
  //   async NovelReadNext() {
  //     // let res = await Gatway.postService(
  //     //   "/customers/remembers/novel-data",
  //     //   this.$store.state.storyread.story_Read as any
  //     // );
      
  //     // let data = [] as any;

  //     // this.$store.state.storyread.story_Read.forEach((element: any) => {
  //     //   res.data.data.forEach((elementres: any) => {

  //     //     if (elementres) {
  //     //       if (elementres.id === element.id) {
  //     //         data.push({ ...element, datail: elementres });
  //     //       }
  //     //     }
  //     //   });
  //     // });
  //     // console.log("readnext",this.$store.state.storyread.story_Read)
      
  //     // this.dataitem = data;
  //   },
  // },
  // mounted() {
  //   this.NovelReadNext();
  // },
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
  // align-items: flex-start;
}
.NovelReadNext .nv-box-carousel .grod-detail {
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-gap: 5px;
  justify-content: flex-start;
  align-items: flex-start;
}
.name {
  color: #1e2046;
  font-size: 18px !important;
}
// .subname {
//   font-size: 15px;
//   color: #646464;
// }
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
