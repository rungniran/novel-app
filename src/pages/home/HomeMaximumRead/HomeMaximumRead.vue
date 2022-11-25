<template>
  <div class="HomeHot" v-if="dataitem">

    <div class="radiocustom">
      <input
      class="borleft"
        label="7 วัน"
        type="radio"
        value="7"
        v-model="onas"
        id="7"
        @change="noNovelReadNext"
      />
      <input
      class="borcenter"
        label="1 เดือน"
        type="radio"
        value="30"
         id="30"
        v-model="onas"
        @change="noNovelReadNext"
      />
      <input
      class="borright"
        label="ตลอดกาล"
        type="radio"
        value="all"
        d="nomol"
        v-model="onas"
        @change="noNovelReadNext"
        
      />
    </div>
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
          <div class="lv">
            {{ dataitemitem1.ranking + 1 }}
            <!-- <img v-if="dataitemitem1.ranking + 1 === 1" :src="$path.image('Novel-Kingdom-ranking-gold.png')" class="lv-img">
            <img v-else-if="dataitemitem1.ranking + 1 === 2" :src="$path.image('Novel-Kingdom-ranking-silver.png')" class="lv-img">
            <img v-else-if="dataitemitem1.ranking + 1 === 3" :src="$path.image('Novel-Kingdom-ranking-bronze.png')" class="lv-img">
            <span v-else>
              {{ dataitemitem1.ranking + 1 }}
              </span> -->
          </div>
          <router-link :to="'/novel/' + dataitemitem1.id" class="box-mywork">
           <!-- <NovelImage :image="dataitemitem1.image_data.url"  ></NovelImage> -->
              <img
                  v-lazy="
                    dataitemitem1.image_data
                      ? dataitemitem1.image_data.url
                      : $path.image('loading.png')
                  "
                  class="nv-img-novel-up"
                  @error="$event.target.src = $path.image('loading.png')"
                  width="100%">
            <NovelPomotion
              :cleckP="dataitemitem1.novel_promotion_datas.length"
              @cleckandP="0"
              msmP="Sale"
              msmE="จบ"
              :cleckE="dataitemitem1.status_end_novel"
            />
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
                {{$filter.NumbertoText(dataitemitem1.ep_total_view) }}
                  <!-- {{ 
                    onas ==='all' 
                    ? $filter.NumbertoText(dataitemitem1.ep_total_view) 
                    : $filter.NumbertoText(dataitemitem1.novel_transaction_datas_count) 
                  }} -->
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
import VueLazyload from 'vue-lazyload'
import { _HomeMaximumRead,_HomeMaximumReadSetData } from "./HomeMaximumRead"
const logic = new _HomeMaximumRead
const set = new _HomeMaximumReadSetData
Vue.use(VueLazyload, {
  error: 'https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png',
  loading: 'https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png',
})

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
      dataUrl:logic._dataUrl ,
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
      dataitem: null as any,
      onas:7,
      sdds: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
    };
  },
  methods: {
    async NovelReadNext(d:any, reset = false) {
      ! set.NovelMaximumRead || reset === true 
      ? await set._NovelReadNext(d.target.value) 
      : set.NovelMaximumRead ;
      let datasort = await logic._SortData(set.NovelMaximumRead)
      let result =  logic._ReduceNovel(datasort)

      this.dataitem = result;
    },

    async noNovelReadNext(d:any) {
      this.NovelReadNext(d, true)
    },


  },
  mounted() {
    this.NovelReadNext({target:{value:7}});
  },
});
</script>
<style lang="scss" scoped src="./HomeMaximumRead.scss"></style>