<template>
  <div class="Category">
    <!-- <pre>

    {{category}}
    </pre> -->
    <div class="nv-box-white nv-mt-30 recommend" v-if="recommend.length !== 0">
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
    <div v-else></div>
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
                :checked="translated"
                @change="TypeNovel"
              />
              <span class="novelt">นิยายแปล</span>
            </div>
            <div class="grop">
              <input
                type="checkbox"
                id="mysafe"
                :checked="mysafe"
                @change="TypeNovel"
              />
              <span class="novelt">นิยายแต่งเอง</span>
            </div>
            <div class="grop">
              <input
                type="checkbox"
                id="novelend"
                :checked="novelEnd"
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
          <!-- <div class="grop">
              <input type="checkbox"> 
              <span>นิยายจบแล้ว</span>
            </div> -->
        </div>
      </div>
      <div class="novel-category">
        <router-link
          v-for="(item, index) in pageOfItems"
          :key="index"
          :to="'/novel/' + item.id"
          class="box-crad"
        >
          <div class="con-detail">
            <div>
              <div class="title line-1">{{ item.title }}</div>
              <!-- <div class="title-cate">แอคชั่นไซไฟ</div> -->
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
              <!-- <div
                class="promotion"
                v-if="item.novel_promotion_datas.length !== 0"
              >
                <div>
                  <div class="tag">
                    <div class="tag-side tag-3-side">
                      <div class="tag-text tag-3-text">
                        Sale
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
             <NovelPomotion :cleckP='item.novel_promotion_datas.length ' @cleckandP="0" msmP="Sale" msmE='จบ' :cleckE='item.status_end_novel'/>
             <!-- <NovelPomotion :cleck='item.status_end_novel ' @cleckand="true"/> -->
              <!-- <div
                class="tags-end"
                v-if="item.status_end_novel === true"
              >
                <div>
                  <div class="tag">
                    <div class="tag-side tag-3-side">
                      <div class="tag-text tag-3-text">
                        จบ

                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </router-link>
      </div>
      <div class="card-footer" @click="TopListNovel()">
        <jw-pagination
          id="pagination"
          :items="exampleItems"
          @changePage="onChangePage"
          :pageSize="12"
          :maxPages="5"
          :labels="customLabels"
        ></jw-pagination>
      </div>
    </div>

    <!-- <div class="card text-center m-3">
        <h3 class="card-header">Vue.js Pagination Tutorial & Example</h3>
        <div class="card-body">
            <div v-for="item in pageOfItems" :key="item.id">{{item.name}}</div>
        </div>
        <div class="card-footer pb-0 pt-3">
            <jw-pagination :items="exampleItems" @changePage="onChangePage"></jw-pagination>
        </div>
    </div> -->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import NovelCarousel from "@/components/widget/NovelCarousel.vue";
import LoadingColouser from "@/components/loader/LoadingColouser.vue";
import { Gatway } from "@/shares/services";
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
      recommend: null,
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
      translated: true,
      mysafe: true,
      novelEnd: true,
      customLabels,
    };
  },
  components: {
    NovelCarousel,
    // NovelPomotion: () => import("@/components/widget/NovelPomotion.vue"),
    NovelStar: () => import("@/components/widget/NovelStar.vue"),
  },
  methods: {
    async getNovelType() {
      let res = await Gatway.getService("/guest/novel/group-type");
      this.category = res.data.data;
      this.All = res.data.data;
      this.exampleItems = await this.novelAll(res.data.data);
      this.filterCategory();
    },
    TopListNovel() {
        (document as any).querySelector("#contain-novel").scrollIntoView();
      
    },
    filterCategory() {
      // this.getRecommend();
      var searchResult = this.category.filter(
        (word) => word["id"].indexOf(this.textCategory) > -1
      );
      console.log(searchResult);
      this.exampleItems =
        this.textCategory === "all"
          ? this.novelAll(this.All)
          : searchResult[0]["novel_datas"];
      this.dataCategory =
        this.textCategory === "all"
          ? this.novelAll(this.All)
          : searchResult[0]["novel_datas"];
      this.sort();
    },
    novelAll(ojb: any) {
      let NovelAll = [] as any;
      ojb.forEach((element: any) => {
        // setTimeout(()=>{
        NovelAll.push(...element.novel_datas);
        // },100)
      });
      return NovelAll;
    },
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
      this[e.target.id] = await e.target.checked;
      await this.getNovelType();
      let data = [] as any;
      if (this.translated === true && this.mysafe === true && this.novelEnd === true) {
        this.exampleItems.filter((uuid: any) => {
          data.push(uuid);
        });
      } else if (this.translated === true && this.mysafe === false) {
        this.exampleItems.filter((uuid: any) => {
          uuid["novel_data_type_id"]
            .toLowerCase()
            .indexOf(TypeNovel.translated) > -1
            ? data.push(uuid)
            : null;
        });
      } else if (this.translated === false && this.mysafe === true) {
        this.exampleItems.filter((uuid: any) => {
          uuid["novel_data_type_id"].toLowerCase().indexOf(TypeNovel.mysafe) >
          -1
            ? data.push(uuid)
            : null;
        });
      }
      // console.log(data)
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

      this.recommend = this.makeUniqueRandom(data);
    },
    async getRecommends() {
      let getRecommend = await Gatway.getService("/guest/recommended-novel");
      const data = [] as any;
      getRecommend.data.data.forEach((element: any) => {
        if (element.novel_data) {
          data.push({
            ...element.novel_data,
            novel_episode_data_total: element.novel_data.ep_total_preview,
          });
        }
      });
      this.recommend = this.makeUniqueRandom(data);
    },
    makeUniqueRandom(numRandoms: any) {
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
    this.getNovelType();
    this.getRecommends();
    // this.dataSort = this.$route.query.fitter
  },
});
</script>
<style lang="scss" scoped>
.view-list-category {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 40%;
}
.Category-title-type {
  width: 150px;
}
.novel-category {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px 25px;
}
.box-crad {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  height: 210px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #ab93f9;
  // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 18px 0px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 10px;
  padding: 15px;
  grid-gap: 20px;
  margin: 5px 0px;
  transition: 0.3s;
}
.view-list {
  margin-top: 10px;
}
.box-crad:hover {
  background: #fbf9ff;
}

.box-crad:hover .title {
  color: #ab93f9;
}
.title {
  transition: 0.3s;
  // color: #fff;
  // color: #f4ba40;
  font-size: 22px;
  font-weight: 400px;
}
.box-mywork {
  position: relative;
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
.rule-shape {
  margin-left: -7px;
  color: #fff;
  font-size: 14px;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  align-self: flex-end;
}

.rule-shape:before,
.rule-shape:after {
  content: " ";
  background: #fff;
  height: 1px;
  margin-bottom: 8px;
  display: block;
  -webkit-box-flex: 2;
  flex-grow: 2;
}

.rule-shape:before {
  margin-right: 6.25px;
}

.rule-shape:after {
  margin-left: 6.25px;
}

.tag-3-text {
  background: rgba(227, 17, 17, 1);

  width: 100%;
  border-radius: 9px;
  // padding-top: 9px;
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

.story {
  font-size: 14px;
  font-family: "Sarabun", sans-serif;
  color: #a0a0a0;
}
.title-cate {
  color: #939393;
}
.con-detail {
  display: flex;
  height: 180px;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.category-img {
  display: flex;
  justify-content: center;
  align-items: center;
}
.group-checkbox {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px;
}
.select-type {
  width: 100%;
}
.categorybox {
  font-size: 16px;
}
.all {
  font-size: 16px;
}
.item-option {
  font-size: 16px;
}

.filter {
  display: flex;
  padding: 0px 0px;
  padding-bottom: 30px;
  gap: 20px;
  justify-content: space-between;
}
.recommend {
  min-height: 400px;
}
select {
  //   display: block;
  //   width: 100%;
  //   padding: 2px 10px;
  //   -moz-padding-start: calc(0.75rem - 3px);
  //   font-size: 0.9rem;
  //   font-weight: 400;
  //   line-height: 1.6;
  //   color: #212529;
  //   background-color: #f8fafc;
  //   background-repeat: no-repeat;
  //   background-position: right 0.75rem center;
  //   background-size: 16px 12px;
  //   border: 1px solid #212529 solid #ced4da;
  //   border-radius: 0.25rem;
  //   transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  //   -webkit-appearance: none;
  //   -moz-appearance: none;
  appearance: none;
}

.grop {
  display: flex;
  align-items: center;
}
.Category-title {
  width: 150px;
}
.novelt {
  width: max-content;
}
.status-novel {
  display: flex;
  gap: 20px;
}
.con-grop {
  display: flex;
  gap: 20px;
}
.card-footer {
  margin-top: 50px;
}
.tag-end{
  
}
.category-img > div > img {
  // position: absolute;
  // object-fit: fill;
  // height: 200px;
  width: 150px !important;
  // margin-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

@media (max-width: 1024px) {
  .novel-category {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    .con-detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
    }
  }
  .select-type {
    // width: 60%;
    font-size: 16px;
  }
  .custom-select {
    font-size: 16px;
  }
  .tag-3-text {
    transform: translate(5px, -12px);
  }
  // .category-img > img {
  //   position: absolute;
  //   object-fit: fill;
  //   height: 180px;
  //   width: 130px !important;
  //   margin-top: 20px;
  // }

  .con-detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .story {
    -webkit-line-clamp: 3;
  }
  // .box-crad {
  //   padding: 17px;
  //   grid-template-columns: 2fr 1.3fr;
  // }

  .group-checkbox {
    display: flex;
  }
}
@media (max-width: 770px) {
  .Category-title-type {
    margin-right: 10px;
  }
  .Category-title {
    width: fit-content;
  }

  .con-grop {
    display: flex;
    // flex-direction: row !important;
  }
  .grop {
    margin: 0px 0px 5px 10px;
  }
  .custom-select {
    width: 60%;
    margin-left: 10px;
  }
}

@media (max-width: 768px) {
  .Category-title-type {
    margin-right: 0px;

    width: 160px;
  }
  .Category-title {
    width: 150px !important;
  }
  .custom-select {
    width: 100%;
  }

  .novel-category {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    .con-detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 160px;
    }
  }

  .box-crad {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
  }

  // .category-img > img {
  //   position: absolute;
  //   object-fit: fill;
  //   height: 190px ;
  //   width: 140px !important;
  //   margin-top: 20px;
  // }

  // .Category-title{
  //   width: 100px;
  // }
  .con-detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  // .box-crad {
  //   padding: 17px;
  //   grid-template-columns: 1.7fr 1.3fr;
  // }
  .filter,
  .con-grop {
    flex-direction: column;
  }
  .grop {
    margin: 0px 0px 10px 20px;
  }
}
@media (max-width: 757px) {
  // .box-crad {
  //   padding: 17px;
  //   grid-template-columns: 2.7fr 1.3fr;
  // }
  .novel-category {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    .con-detail {
      width: 100%;
    }
  }
  .tag-3-text {
    // display: flex;
    justify-content: start;
    // transform: translate(60px, 3px);
  }
}

@media (max-width: 520px) {
  .con-grop {
    flex-direction: column !important;
  }
  .tag-3-text {
    // display: flex;
    justify-content: start;
    // position: fixed;
    transform: translate(5px, -12px);
  }
}

@media (max-width: 415px) {
  .con-grop {
    flex-direction: column !important;
  }
  .Category-title-type {
    margin-right: 20px;

    width: auto;
  }

  .tag-3-text {
    // display: flex;
    // justify-content: start;
    transform: translate(5px, -12px);
  }
  .box-crad {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    height: 170px;
    border-radius: 10px;
    background: #ffffff;
    border: 1px solid #ab93f9;
    // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 18px 0px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 10px;
    padding: 10px 15px !important;
    grid-gap: 20px;
    margin: 5px 0px;
    transition: 0.3s;
  }
  .category-img > div > img {
    // position: absolute;
    // object-fit: fill;
    // height: 200px;
    width: 120px !important;
    // margin-top: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  //   .box-crad {
  //   padding: 17px;
  //   grid-template-columns: 2fr 1.3fr;
  // }
  .novel-category {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    .con-detail {
      display: flex;
      flex-direction: column;
      justify-content: start !important;
    }
  }
  // .category-img > img {
  //   position: absolute;
  //   object-fit: fill;
  //   height: 180px;
  //   width: 140px !important;
  //   margin-top: 20px;
  // }
  .con-Category {
    border-radius: 0px;
    padding: 50px 10px;
  }
  .filter,
  .con-grop {
    flex-direction: column;
  }
  // .box-crad {
  //   border-radius: 10px;
  //   margin: 5px 0px;
  //   height: 180px;
  //   // background: #fff6e4;
  //   // border: 0px solid #212529;
  // }
  .view-list-category {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 50%;
  }
  .grop {
    margin: 0px 0px 5px 20px;
  }
  .custom-select {
    margin-left: 5px;
    width: 100%;
  }

  .select-type {
    width: 60%;
  }
  .group-checkbox {
    display: grid;
    grid-template-columns: auto auto;
  }
}
// #pointer {
//   width: 30px;
//   height: 30px;
//   border-radius: 4px;
//   position: relative;
//   background: rgb(139, 58, 232);
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
// }
// #pointer:after {
//   content: "";
//   position: absolute;
//   left: 0;
//   bottom: -15px;
//   width: 0;
//   height: 0;
//   border-left: 15px solid  red;
//   border-top: 15px solid transparent;
//   border-bottom: 15px solid transparent;
// }
// #pointer:before {
//   content: "";
//   position: absolute;
//   right: 0px;
//   bottom: -15px;
//   width: 0;
//   height: 0;
//    border-right: 15px solid  red;
//   border-top: 15px solid transparent;
//   border-bottom: 15px solid transparent;
// }
</style>
