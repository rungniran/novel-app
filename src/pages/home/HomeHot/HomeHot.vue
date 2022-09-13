<template>
  <div class="HomeHot" v-if="dataitem">
    <!-- <pre>{{dataitem}}</pre> -->
    <carousel
      :items="1"
      :loop="loop"
      :margin="10"
      :center="false"
      :autoplay="false"
      :singleItem="false"
      :nav="true"
      :dots="false"
      class="HomeHot"
      :navText="sdds"
      :responsive="responsive"
    >
      <div
        v-for="(dataitemitem, index) in dataitem"
        :key="index"
        class="top-card"
      >
        <div
          v-for="(dataitemitem1, index) in dataitemitem"
          :key="index"
          class="top-card-box"
        >
          <!-- <pre>

          {{dataitemitem1}}
        </pre> -->
          <div class="lv">
            {{ dataitemitem1.ranking + 1 }}
          </div>
          <router-link :to="'/novel/' + dataitemitem1.id" class="box-mywork">
            <img
              width="100%"
              class="nv-img-novel"
              :src="
                dataitemitem1.image_data
                  ? dataitemitem1.image_data.url
                  : $path.image('loading.png')
              "
              lazy="loaded"
            />
            <div
              class="promotion"
              v-if="dataitemitem1.novel_promotion_datas.length !== 0"
            >
              <div>
                <div class="tag">
                  <div class="tag-side tag-3-side">
                    <div class="tag-text tag-3-text">
                      Sale
                      <!-- <div class="rule-shape">&#10052;</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tags-end-novel-hot"
              v-if="dataitemitem1.status_end_novel === true"
            >
              <div>
                <div class="tag">
                  <div class="tag-side tag-3-side">
                    <div class="tag-text tag-3-text">
                      จบ
                      <!-- <div class="rule-shape">&#10052;</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
          <div class="detail">
            <router-link
              :to="'/novel/' + dataitemitem1.id"
              class="name line-1"
              >{{ dataitemitem1.title }}</router-link
            >
            <div class="gray">
              {{ dataitemitem1.novel_category_data_preview }}
            </div>
            <div>
              <div class="NovelStar">
                <div>
                  <NovelStar :rating="Math.round(dataitemitem1.avg_star)" />
                </div>
              </div>
            </div>
            <div class="view-list">
              <div class="view">
                <i class="far fa-eye" aria-hidden="true"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(dataitemitem1.ep_total_view) }}
                </div>
              </div>
              <div class="list">
                <i class="fas fa-list" aria-hidden="true"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(dataitemitem1.ep_count) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <router-link
        v-for="items, index in dataitem"
        :key="index"
        :to="'/read/'+ items.id_ep"
        class="NovelRead-box-carousel  NovelReadNext"
      >
       <img
          class="item-banner"
          :src="'https://119.59.97.111/storage/novel_image/'+ items.id+ '.png'"
          @error="$event.target.src= $path.image('loading.png');"
          alt
        />
         <div class="grod-detail">
          <div class="name line-1">{{items.datail.title}}</div>
          <div class="name line-1">{{items.datail.novel_episode_datas.length !== 0 ? items.datail.novel_episode_datas[0]['name'] : null}}</div>

        </div>
      </router-link> -->
    </carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";
import { Gatway } from "@/shares/services";
import NovelStar from "@/components/widget/NovelStar.vue";
export default Vue.extend({
  name: "HomeHot",
  props: {
    loop: Boolean,
    opject: [],
    // eslint-disable-next-line no-undef
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
          items: 2,
        },
        1024: {
          items: 2,
        },
        1100: {
          items: 2,
        },
      },
      dataitem: null,
      sdds: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
    };
  },
  methods: {
    async NovelReadNext() {
      let getNextread = await Gatway.getService(
        "/guest/index/novel-maximum-read"
      );
      let res = await getNextread.data.data.sort((a, b) => {
        return parseInt(b.total_view) - parseInt(a.total_view);
      });
      const result = res.reduce((resultArray: any, item, index) => {
        const chunkIndex = Math.floor(index / 3) as any;
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] as any;
        }
        resultArray[chunkIndex].push({ ...item, ranking: index });
        return resultArray;
      }, []);

      this.dataitem = result;
    },
  },
  mounted() {
    this.NovelReadNext();
  },
});
</script>
<style lang="scss" scoped>
.top-card {
  display: grid;
  gap: 10px;
}
.top-card-box {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 0.3fr 1fr 2fr;
  grid-gap: 15px;
  align-items: center;
}
.nv-img-novel {
  width: 90% !important;
  border-radius: 7px !important;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
.name {
  font-size: 20px;
  color: #242424;
}
.lv {
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box-mywork {
  position: relative;
}
.tags-end-novel-hot{
  display: flex;
  align-items: center;
  justify-content: start;
  // width: 70px;
  border-radius: 10%;
  height: 15px;
  position: absolute;
  // background: #fb5353;
  right: 12px;
  font-size: 13px;
  // z-index: 100;
  top: 5px;
  padding: 5px;
  color: #fff;
}
.promotion {
  display: flex;
  align-items: center;
  justify-content: start;
  // width: 70px;
  border-radius: 10%;
  height: 15px;
  position: absolute;
  // background: #fb5353;
  left: -10px;
  font-size: 13px;
  // z-index: 100;
  top: 5px;
  padding: 5px;
  color: #fff;
}
.tag-3-side {
  margin-top: 10px;
  padding-top: 10px;
  display: -webkit-box;
  display: flex;
}
.tag-text {
  align-items: center;
}

.tag-3-text {
  background: rgba(227, 17, 17, 1);
  // background: radial-gradient(
  //   circle,
  //   rgba(138, 39, 39, 1) 0%,
  //   rgba(245, 70, 70, 1) 0%,
  //   rgba(244, 102, 102, 1) 52%,
  //   rgba(227, 17, 17, 1) 100%
  // );
  width: 100%;
  border-radius: 9px;
  // padding-top: 5px;
  padding-left: 7px;
  width: 40px;
  // height: 50px;
  font-size: 14px;
  color: #fff;
  z-index: 1;
  transform: translate(5px, -12px);
}

.tag-3-side.is-back .tag-3-text {
  background: #b6dfde;
  color: #222;
}
@media (max-width: 415px) {
  .HomeHot .owl-prev {
    display: none !important;
  }
  .HomeHot .owl-next {
    display: none !important;
  }
}
</style>
