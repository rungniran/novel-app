<template>
  <div class="Tags" v-if="opject">
    <!-- {{ opject.length}} -->
    <carousel
      v-if="opject"
      :items="1"
      :loop="false"
      :margin="10"
      :autoWidth="true"

      :center="false"
      :autoplay="false"
      :singleItem="true"
      :nav="false"
      :dots="false"
      :responsive="responsive"
    >
      <div v-for="(items, index) in JSON.parse(opject)" :key="index" class="box-tag"  @click="tag(items)">
        #{{items}}
      </div>
    </carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";
import { Gatway } from "@/shares/services";
export default Vue.extend({
  name: "Tags",
  props: {
    loop: Boolean,
    opject: String,
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
      dataitem: null,
    };
  },
  methods: {
       tag(key) {
      this.$router.push("/search?key=" + key);
    },
    // async NovelReadNext() {
    //   let res = await Gatway.postService(
    //     "/customers/remembers/novel-data",
    //     this.$store.state.storyread.story_Read as any
    //   );
      
    //   let data = [] as any;

    //   this.$store.state.storyread.story_Read.forEach((element: any) => {
    //     res.data.data.forEach((elementres: any) => {

    //       if (elementres) {
    //         if (elementres.id === element.id) {
    //           data.push({ ...element, datail: elementres });
    //         }
    //       }
    //     });
    //   });
  
      
    //   this.dataitem = data;
    // },
  },
  mounted() {
    // this.NovelReadNext();
  },
});
</script>
<style lang="scss" scoped>
$second-blue: #1e2046;
$second-gray: #444349;
$second-grayLight: #cfd4d9;
.Tags{
  margin-top: 30px;
}
.box-tag{
      padding: 0px 10px;
    border: 2px solid #d3d3d3;
    border-radius: 50px;
    color: #7e7e7e;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
}
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
.name {
  color: #1e2046;
  font-size: 18px !important;
}
.subname {
  font-size: 15px;
  color: #646464;
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

@media (max-width: 415px) {
	.Tags{
        margin: 15px;
	}
}

</style>
