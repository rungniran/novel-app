<template>
  <div class="Category">
    <div class="nv-box-white nv-mt-40 recommend">
      <div class="nv-title-item">
        <div class="nv-title-center">นิยายแนะนำ</div>
        <NovelCarousel v-if="recommend" :opject="recommend" :loop="false" />
      </div>
    </div>
    <div class="nv-box-white nv-mt-40 con-Category">
      <div class="filter">
        <div class="con-grop">
          <div class="grop">
            <p class="Category-title">หมวดนิยาย</p>
            <select @change="filterCategory()" v-model="textCategory">
              <option value="all">ทั้งหมด</option>
              <option
                v-for="(item, index) in category"
                :key="index"
                :value="item.id"
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
              <span>นิยายแปล</span>
            </div>
            <div class="grop">
              <input
                type="checkbox"
                id="mysafe"
                :checked="mysafe"
                @change="TypeNovel"
              />
              <span>นิยายแต่งเอง</span>
            </div>
          </div>
        </div>
        <div class="status-novel">
          <div class="grop">
            <p class="Category-title">จัดเรียงตาม</p>
            <select @change="sort" v-model="dataSort">
              <option :value="1">นิยายมาแรง</option>
              <option :value="2">นิยายติดอันดับ</option>
              <option :value="3">นิยายอัปเดทล่าสุด</option>
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
              <div class="line-5 story">
                {{ item.detail }}

              </div>
            </div>
            <div class="view-list">
              <div class="view">
                <i class="far fa-eye"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(item.total_view) }}
                </div>
              </div>
              <div class="list">
                <i class="fas fa-list"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(item.ep_total_preview) }}
                </div>
              </div>
            </div>
          </div>
          <div class="category-img">
            <img
              :src="
                item.image_data
                  ? item.image_data.url
                  : $path.image('loading.png')
              "
              onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
              class="nv-img-novel"
              width="100%"
            />
          </div>
        </router-link>
      </div>
      <div class="card-footer">
        <jw-pagination
          :items="exampleItems"
          @changePage="onChangePage"
          :pageSize="8"
          :maxPages="5"
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
      dataSort: TypeSort.hot,
      dataTypeNovel: TypeNovel,
      translated: true,
      mysafe: true,
    };
  },
  components: {
    NovelCarousel,
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
    filterCategory() {
      this.getRecommend();
      var searchResult = this.category.filter(
        (word) => word["id"].indexOf(this.textCategory) > -1
      );
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
    },
    sort() {
      console.log(this.exampleItems);
      if (TypeSort.top === this.dataSort) {
        this.exampleItems.sort((a: any, b: any) => b.score - a.score);
      } else if (TypeSort.hot === this.dataSort) {
        this.exampleItems.sort((a: any, b: any) => b.total_view - a.total_view);
      } else if (TypeSort.latest === this.dataSort) {
        this.exampleItems.sort((a: any, b: any) => b.menu_order - a.menu_order);
      }
    },
    async TypeNovel(e) {
      this[e.target.id] = await e.target.checked;
      console.log(this.translated, " ", this.mysafe);
      await this.getNovelType();
      let data = [] as any;
      if (this.translated === true && this.mysafe === true) {
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
              console.log(
                element.novel_data.novel_category_data_id === this.textCategory
              );
              data.push(element.novel_data);
            }
          } else {
            data.push(element.novel_data);
          }
        }
      });

      this.recommend = data.splice(0, 12);
    },
  },
  mounted() {
    this.getNovelType();
    this.getRecommend();
  },
});
</script>
<style lang="scss" scoped>
.novel-category {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
.box-crad {
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 200px;
  border-radius: 10px;
  background: #ffffff;
  border: 2px solid #f4ba40;
  // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 18px 0px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 15px;
  grid-gap: 20px;
  margin: 5px 0px;
  transition: 0.3s;
}
.box-crad:hover {
  background: #fff6e5;
}

.box-crad:hover .title {
  color: #f4ba40;
}
.title {
  transition: 0.3s;
  // color: #fff;
  // color: #f4ba40;
  font-size: 22px;
  font-weight: 400px;
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
  flex-direction: column;
  justify-content: space-between;
  width: 260px;
}
.category-img {
  display: flex;
  justify-content: center;
  align-items: center;
}
  .group-checkbox {
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
  }

.filter {
  display: flex;
  padding: 0px 0px;
  padding-bottom: 30px;
  gap: 20px;
  justify-content: space-between;
}
.recommend {
  min-height: 500px;
}
select {
  display: block;
  width: 100%;
  padding: 2px 10px;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.6;
  color: #212529;
  background-color: #f8fafc;
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #212529 solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.grop {
  display: flex;
  align-items: center;
}
.Category-title {
  width: 150px;
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

.category-img > img {
  position: absolute;
  object-fit: fill;
  height: 200px;
  width: 150px;
  margin-top: 20px;
}

@media (max-width: 820px) {
  .novel-category {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    .con-detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 200px;
    }
  }

  .category-img > img {
    position: absolute;
    object-fit: fill;
    height: 180px;
    width: 130px;
    margin-top: 20px;
  }

  .con-detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .story {
    -webkit-line-clamp: 3;
  }
  .box-crad {
    padding: 17px;
    grid-template-columns: 2fr 1.3fr;
  }
  .filter,
  .con-grop {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .novel-category {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    .con-detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 180px;
    }
  }

  .category-img > img {
    position: absolute;
    object-fit: fill;
    height: 190px;
    width: 140px;
    margin-top: 20px;
  }

  .con-detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .story {
    -webkit-line-clamp: 3;
  }
  .box-crad {
    padding: 17px;
    grid-template-columns: 2fr 1.3fr;
  }
  .filter,
  .con-grop {
    flex-direction: column;
  }
}

@media (max-width: 415px) {
  .novel-category {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    .con-detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .category-img > img {
    position: absolute;
    object-fit: fill;
    height: 180px;
    width: 140px;
    margin-top: 20px;
  }
  .con-Category {
    border-radius: 0px;
    padding: 50px 10px;
  }
  .filter,
  .con-grop {
    flex-direction: column;
  }
  .box-crad {
    border-radius: 10px;
    margin: 5px 0px;
    height: 180px;
    // background: #fff6e4;
    // border: 0px solid #212529;
  }
}
</style>
