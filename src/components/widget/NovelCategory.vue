<template>
  <div class="NovelCategory">
    <div class="nv-title-item nv-mt-30" v-if="data.length !== 0">
      <H1 class="nv-title-center">นิยายสุดมันส์แฟนหลงเฉินไม่ควรพลาด</H1>
      <carousel
        v-if="data"
        :items="1"
        :autoplay="true"
        :loop="false"
        :center="false"
        :margin="10"
        class="NovelCategory"
        :responsiveClass="true"
        :nav="true"
        :dots="false"
        :navText="sdds"
        :singleItem="false"
        :responsive="responsive"
      >
        <router-link
          :to="'/novel/' + items.ref"
          v-for="(items, index) in data"
          :key="index"
          class="category"
        >
          <img
            :src="
              items.image_data
                ? items.image_data.url
                : $path.image('loading.png')
            "
            class="img-banner-novel"
            alt
          />
          <div class="cate-con">
            <div class="cate-con-name">
              <div class="cate-name line-1">
                {{ items.novel_data.title }}
              </div>
              <!-- <NovelStar :rating="5" /> -->
            </div>
            <div class="cate-datail">
              <div>{{ items.novel_data.penname_preview }}</div>
              |
              <!-- <div>Novel Kingdom</div>
            | -->
              <div class="view-list">
                <div class="view">
                  <i class="far fa-eye"></i>
                  <div class="count-numble-view">
                    {{ $filter.NumbertoText(items.novel_data.ep_total_view) }}
                  </div>
                </div>
                <div class="list">
                  <i class="fas fa-list"></i>
                  <div class="count-numble-view">
                    {{ $filter.NumbertoText(items.novel_data.ep_count) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </carousel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";
import NovelStar from "@/components/widget/NovelStar.vue";
import { Gatway } from "@/shares/services";
export default Vue.extend({
  name: "NovelCategory",
  props: {
    opject: {
      type: [],
      default: null,
    },
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
          items: 2,
        },
        1024: {
          items: 2,
        },
      },
      data: null,
      randomBanner: null,
      sdds: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
    };
  },
  methods: {
    async getlist() {
      let banner2 = await Gatway.getService("/guest/banner2");
      if (banner2.data.data.length === 0) {
        this.data = null;
      } else {
        let randomdata = [] as any;
        await banner2.data.data.filter((element: any) => {
          if (element.table) {
            randomdata.push(element);
          }
        });
        this.data = await this.makeUniqueRandom(randomdata)
       
      }
    },
    makeUniqueRandom(numRandoms:any) {
      var nums = numRandoms as any;
        var ranNums = [] as any;
        var i = nums.length as any;
        var j = 0 as any;

      while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        ranNums.push(nums[j]);
        nums.splice(j, 1);
      }
      return ranNums;
    },
  },
  mounted() {
    this.getlist();
  },
});
</script>
<style scoped>
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
.img-banner-novel {
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset; */
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  border-radius: 20px;
}

.category .owl-carousel .owl-item img {
  border-radius: 7px;
}
i {
  font-size: 16px;
}
.count-numble-view {
  font-size: 16px;
}
.cate-name {
  font-size: 20px;
  color: #000;
}
.cate-datail {
  font-size: 18px;
}
@media (max-width: 768px) {
  .cate-datail {
    grid-gap: 5px;
  }
  /* .cate-name {
    font-size: 25px;
    color: #000;
  } */
  /* .cate-datail {
    font-size: 20px;
} */
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
