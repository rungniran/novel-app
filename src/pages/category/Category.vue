<template>
  <div class="Category">
    <!-- <pre>

    {{Base._getRecommend(this.$store.getters._GetRecommendedNovel)}}
    </pre> -->
    <div class="nv-box-white nv-mt-30 recommend">
      <div class="nv-title-item">
        <div class="nv-title-center">นิยายแนะนำ</div>
        <NovelCarousel
          v-if="recommend"
          :opject="recommend"
          :loop="false"
          :star="false"
        />
      </div>
    </div>
    <!-- <div v-else></div> -->
    <div id="contain-novel"></div>
    <div id=""></div>
    <div class="nv-box-white nv-mt-30 con-Category">
      <div class="filter">
        <div class="con-grop">
          <div class="grop">
            <p class="Category-title-type">หมวดนิยาย</p>
            <select
              @change="
                filterCategory();
                getRecommend();
              "
              v-model="textCategory"
              class="select-type"
            >
              <option class="all" value="all">ทั้งหมด</option>
              <option
                v-for="(item, index) in category"
                :key="index"
                :value="item.id"
                class="categorybox"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="group-checkbox">
            <div class="grop">
              <input
                type="checkbox"
                id="translated"
                value="4aa1927f-32ac-46a8-bd8a-361b8a5c208d"
                :checked="fitter.translated"
                @change="TypeNovel"
              />
              <span class="novelt">นิยายแปล</span>
            </div>
            <div class="grop">
              <input
                type="checkbox"
                id="mysafe"
                value="26f22967-39e5-481d-9889-a14e420f1a82"
                :checked="fitter.mysafe"
                @change="TypeNovel"
              />
              <span class="novelt">นิยายแต่งเอง</span>
            </div>
            <div class="grop">
              <input
                type="checkbox"
                id="novelend"
                :checked="fitter.novelend"
                @change="TypeNovel"
              />
              <span class="novelt">นิยายจบแล้ว</span>
            </div>
          </div>
        </div>
        <div class="status-novel">
          <div class="grop">
            <p class="Category-title">จัดเรียงตาม</p>
            <select @change="sort" v-model="dataSort" class="custom-select">
              <option class="item-option" :value="2">นิยายมาแรง</option>
              <option class="item-option" :value="1">นิยายติดอันดับ</option>
              <option class="item-option" :value="3">นิยายอัปเดตล่าสุด</option>
            </select>
          </div>
        </div>
      </div>
      <span>
      <div class="novel-category" v-if="exampleItems.length !== 0">
        <router-link
          v-for="(item, index) in pageOfItems"
          :key="index"
          :to="'/novel/' + item.id"
          class="box-crad"
        >
          <div class="con-detail">
            <div>
              <div class="title line-1">{{ item.title }}</div>
              <span style="display: flex; gap: 10px; align-items: center">
                <NovelStar :rating="Math.round(item.avg_star)"
              /></span>
              <div class="line-4 story">
                {{ item.detail }}
              </div>
            </div>
            <div class="view-list">
              <div class="view">
                <i class="far fa-eye"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(item.ep_total_view) }}
                </div>
              </div>
              <div class="list">
                <i class="fas fa-list"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(item.ep_count) }}
                </div>
              </div>
            </div>
          </div>
          <div class="category-img">
            <div class="box-mywork">
              <img
                v-lazy="
                  item.image_data
                    ? item.image_data.url
                    : $path.image('loading.png')
                "
                onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
                class="nv-img-novel"
              />
              <!-- <NovelImage
                  :image="$filter._dataUrl(item.image_data)"
                  :alt="item.title"
                ></NovelImage> -->
              <NovelPomotion
                :cleckP="item.novel_promotion_datas.length"
                @cleckandP="0"
                msmP="Sale"
                msmE="จบ"
                :cleckE="item.status_end_novel"
              />
            </div>
          </div>
        </router-link>
      </div>
      <div
        v-else
        style="
          width: 100%;
          height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        ไม่พบนิยาย
      </div>
      </span>
      <!-- <span >
        loag
      </span> -->
      <div class="card-footer" @click="TopListNovel()">
        <jw-pagination
          id="pagination"
          :items="exampleItems"
          @changePage="onChangePage"
          :pageSize="12"
          :maxPages="3"
          :labels="customLabels"
        ></jw-pagination>
      </div>
    </div>
    <NovelLoading ref="loading" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import NovelCarousel from "@/components/widget/NovelCarousel.vue";
import { Gatway } from "@/shares/services";
import { _Category, _CategorySetData } from "./Category";
const logic = new _Category();
const SetData = new _CategorySetData();
import JwPagination from "jw-vue-pagination";
Vue.component("jw-pagination", JwPagination);
// const exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
const customLabels = {
  first: "<<",
  last: ">>",
  previous: "<",
  next: ">",
};

enum TypeSort {
  hot = 1,
  top = 2,
  latest = 3,
}
enum TypeNovel {
  translated = "4aa1927f-32ac-46a8-bd8a-361b8a5c208d",
  mysafe = "26f22967-39e5-481d-9889-a14e420f1a82",
}
export default Vue.extend({
  name: "Category",
  data() {
    return {
      logic: logic,
      recommend: null as any,
      category: [...Array(7).keys()],
      novel: [...Array(7).keys()],
      exampleItems: [],
      pageOfItems: [],
      textCategory: "all",
      All: [],
      dataCategory: [] as any,
      dataSort: this.$route.query.fitter
        ? parseInt(this.$route.query.fitter as any)
        : (TypeSort.hot as any),
      dataTypeNovel: TypeNovel,
      fitter: {
        translated: true,
        mysafe: true,
        novelend: false,
      } as any,

      customLabels,
    };
  },
  components: {
    NovelCarousel,
    // NovelPomotion: () => import("@/components/widget/NovelPomotion.vue"),
    NovelStar: () => import("@/components/widget/NovelStar.vue"),
  },
  methods: {
    async RecommendedNovel() {
      this.recommend = logic._getRecommend(
        await this.$store.getters._GetRecommendedNovel
      );
    },
    async getNovelType() {
      await (this as any).$refs.loading.switchloading(true);
      let data = await this.$store.getters._getGroupType;
      try {
        this.category = await data;
        this.All =await data;
        this.exampleItems = await logic._novelAll(data);
        this.filterCategory();
      } catch (error) {
        console.log(error);
      }
      await (this as any).$refs.loading.switchloading(false);
    },
    TopListNovel() {
      (document as any)
        .querySelector("#contain-novel")
        .scrollIntoView({ behavior: "smooth" });
    },
    filterCategory() {
      var searchResult = this.category.filter(
        (word) => word["id"].indexOf(this.textCategory) > -1
      );
      this.exampleItems =
        this.textCategory === "all"
          ? logic._novelAll(this.All)
          : searchResult[0]["novel_datas"];
      this.dataCategory =
        this.textCategory === "all"
          ? logic._novelAll(this.All)
          : searchResult[0]["novel_datas"];
      this.sort();
    },
    // novelAll(ojb: any) {
    //   let NovelAll = [] as any;
    //   ojb.forEach((element: any) => {
    //     // setTimeout(()=>{
    //     NovelAll.push(...element.novel_datas);
    //     // },100)
    //   });
    //   return NovelAll;
    // },
    onChangePage(pageOfItems: never[]) {
      this.pageOfItems = pageOfItems;
      // window.scrollTo({top: 0, behavior: 'smooth'});
    },

    sort() {
      if (TypeSort.top === this.dataSort) {
        this.exampleItems.sort((a: any, b: any) => b.score - a.score);
      } else if (TypeSort.hot === this.dataSort) {
        this.exampleItems.sort(
          (a: any, b: any) => b.ep_total_view - a.ep_total_view
        );
      } else if (TypeSort.latest === this.dataSort) {
        this.exampleItems.sort((a: any, b: any): any => {
          return (
            new Date(b.timestamp_update).valueOf() -
            new Date(a.timestamp_update).valueOf()
          );
          // this.exampleItems.sort((a: any, b: any): any =>  {
          //   console.log(a.timestamp_update);
          //   // Date.parse( b.timestamp_update) - Date.parse( a.timestamp_update)
        });
      }
    },
    async TypeNovel(e) {
      // console.log(this.fitter[e.target.id]);
      this.fitter[e.target.id] = await e.target.checked;
      await this.getNovelType();
      let data = this.exampleItems.filter((item: any) => {
        let rr = [item["status_end_novel"]];
        let rr1 = [item["novel_data_type_id"]];
        if (
          this.fitter.translated === true &&
          this.fitter.mysafe === true &&
          this.fitter.novelend === true
        ) {
          return (
            JSON.stringify(rr).match("true") ||
            (JSON.stringify(rr1).match(this.dataTypeNovel.translated) &&
              JSON.stringify(rr1).match(this.dataTypeNovel.mysafe))
          );
        } else if (
          this.fitter.translated === false &&
          this.fitter.mysafe === false &&
          this.fitter.novelend === true
        ) {
          return JSON.stringify(rr).match("true");
        } else if (
          this.fitter.translated === false &&
          this.fitter.mysafe === true &&
          this.fitter.novelend === true
        ) {
          return (
            JSON.stringify(rr).match("true") &&
            JSON.stringify(rr1).match(this.dataTypeNovel.mysafe)
          );
        } else if (
          this.fitter.translated === false &&
          this.fitter.mysafe === true &&
          this.fitter.novelend === false
        ) {
          return JSON.stringify(rr1).match(this.dataTypeNovel.mysafe);
          // JSON.stringify(rr).match("false")
        } else if (
          this.fitter.translated === true &&
          this.fitter.mysafe === false &&
          this.fitter.novelend === false
        ) {
          return (
            JSON.stringify(rr1).match(this.dataTypeNovel.translated) &&
            JSON.stringify(rr).match("false")
          );
        } else if (
          this.fitter.translated === true &&
          this.fitter.mysafe === false &&
          this.fitter.novelend === true
        ) {
          return (
            JSON.stringify(rr1).match(this.dataTypeNovel.translated) &&
            JSON.stringify(rr).match("true")
          );
        } else if (
          this.fitter.translated === true &&
          this.fitter.mysafe === true &&
          this.fitter.novelend === false
        ) {
          return (
            JSON.stringify(rr1).match(this.dataTypeNovel.translated) ||
            JSON.stringify(rr1).match(this.dataTypeNovel.mysafe)
            // JSON.stringify(rr).match("false")
          );
        } else if (
          this.fitter.translated === false &&
          this.fitter.mysafe === false &&
          this.fitter.novelend === true
        ) {
          return JSON.stringify(rr).match("true");
        } else if (
          this.fitter.translated === false ||
          (this.fitter.mysafe === false && this.fitter.novelend === false)
        ) {
          return JSON.stringify(rr).match("false");
        } else {
          return null;
        }
      });
      console.log(data);

      // this[e.target.id] = await e.target.checked;
      // await this.getNovelType();
      // let data = [] as any;
      // if (this.translated === true && this.mysafe === true && this.novelEnd === true) {
      //   this.exampleItems.filter((uuid: any) => {
      //     data.push(uuid);
      //   });
      // } else if (this.translated === true && this.mysafe === false) {
      //   this.exampleItems.filter((uuid: any) => {
      //     uuid["novel_data_type_id"]
      //       .toLowerCase()
      //       .indexOf(TypeNovel.translated) > -1
      //       ? data.push(uuid)
      //       : null;
      //   });
      // } else if (this.translated === false && this.mysafe === true) {
      //   this.exampleItems.filter((uuid: any) => {
      //     uuid["novel_data_type_id"].toLowerCase().indexOf(TypeNovel.mysafe) >
      //     -1
      //       ? data.push(uuid)
      //       : null;
      //   });
      // }
      this.exampleItems = data;
    },
    async getRecommend() {
      this.recommend = await null;
      let res = await Gatway.getService("/guest/recommended-novel");
      const data = [] as any;
      res.data.data.forEach((element: any, index: number) => {
        if (element.novel_data) {
          if (this.textCategory !== "all") {
            if (
              element.novel_data.novel_category_data_id === this.textCategory
            ) {
              data.push({
                ...element.novel_data,
                novel_episode_data_total: element.novel_data.ep_total_preview,
              });
            }
          } else {
            data.push({
              ...element.novel_data,
              novel_episode_data_total: element.novel_data.ep_total_preview,
            });
          }
        }
      });

      this.recommend = logic._makeUniqueRandom(data);
    },
    // async getRecommends() {
    //   let getRecommend = await Gatway.getService("/guest/recommended-novel");
    //   const data = [] as any;
    //   getRecommend.data.data.forEach((element: any) => {
    //     if (element.novel_data) {
    //       data.push({
    //         ...element.novel_data,
    //         novel_episode_data_total: element.novel_data.ep_total_preview,
    //       });
    //     }
    //   });
    //   this.recommend = this.makeUniqueRandom(data);
    // },
    // makeUniqueRandom(numRandoms: any) {
    //   var nums = numRandoms as any;
    //   var ranNums = [] as any;
    //   var i = nums.length as any;
    //   var j = 0 as any;

    //   while (i--) {
    //     j = Math.floor(Math.random() * (i + 1));
    //     ranNums.push(nums[j]);
    //     nums.splice(j, 1);
    //   }
    //   return ranNums;
    // },
    async public() {
      await this.RecommendedNovel();
    },
  },

  mounted() {
    this.getNovelType();
    this.public();
    // this.getRecommends();
    // this.dataSort = this.$route.query.fitter
  },
});
</script>
<style lang="scss" scoped src="./Category.scss"></style>