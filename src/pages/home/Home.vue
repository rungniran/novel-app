<template>
  <div class="home">
    <!-- style="padding-top: 20px"  -->
    <NovelBaner :item="banner" />
    <div class="nv-box-white nv-mt-20">
      <!-- {{this.$store.state.storyread}} v-if="profile"-->
      <div class="nv-title-item" v-if="nextread === true">
        <H1 class="nv-title-center">นิยายอ่านต่อ</H1>
        <!-- <Suspense>
          <template > -->
        <NovelReadNext :loop="false" />
        <!-- </template>
          <template #fallback>
             <div>  londing...</div>
          </template>
        </Suspense> -->
      </div>
      <!-- <LoadingColouser/> -->
      <div
        class="nv-title-item nv-mt-0"
        v-if="recommend"
        :class="nextread === true ? 'nv-mt-60' : 'nv-mt-10'"
      >
        <H1 class="nv-title-center">นิยายแนะนำ</H1>
        <!-- <Suspense>
          <template > -->
        <NovelCarousel :opject="recommend" :loop="false" :star="false" />
        <!-- </template>
           <template #fallback>
            <LoadingColouser />
           </template>
        </Suspense> -->
      </div>
      <!-- <LoadingColouser v-else :className="profile ? 'nv-mt-60' : 'nv-mt-10'" /> -->
      <div class="nv-title-item nv-mt-60" v-if="hot">
        <H1 class="nv-title-center">นิยายมาแรง</H1>
        <NovelCarousel :opject="hot" :loop="false" />
      </div>
      <!--  -->
      <LoadingColouser v-else />
      <div class="nv-title-item nv-mt-60">
        <H1 class="nv-title-center">Banner</H1>
        <NovelCategory :opject="2" :loop="true" />
      </div>
      <div class="nv-title-item-20 nv-mt-60">
        <H1 class="nv-title-center">นิยายติดอันดับ</H1>
        <HomeHot />
        <!-- <div class="layout-hot-novel">
          <div class="slide-icon" @click="slideLeft">
            <i class="fa fa-angle-left"></i>
          </div>
          <div class="nover-top" id="nover-top">

            <div
              v-for="(items, index) in maximum"
              :key="index"
              class="top-card"
            >
              <div class="lv">{{ index + 1 }}</div>
              <router-link class="image-top" :to="'/novel/' + items.id">
                <img
                  v-lazy="
                    items.image_data
                      ? items.image_data.url
                      : $path.image('loading.png')
                  "
                  class="nv-img-novel"
                  @error="$event.target.src = $path.image('loading.png')"
                  width="100%"
                />
              </router-link>
              <div class="detail">
                <router-link class="name line-1" :to="'/novel/' + items.id">{{
                  items.title
                }}</router-link>
                <div class="gray">
                  {{ items.novel_category_data_preview }}
                </div>
                <div>
                  <NovelStar :rating="Math.round(items.avg_star)" />
                </div>
                <div class="view-list">
                  <div class="view">
                    <i class="far fa-eye"></i>
                    <div class="count-numble-view">
                      {{ $filter.NumbertoText(items.total_view) }}
                    </div>
                  </div>
                  <div class="list">
                    <i class="fas fa-list"></i>
                    <div class="count-numble-view">
                      {{ $filter.NumbertoText(items.novel_episode_data_total) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slide-icon" @click="slideRight">
            <i class="fa fa-angle-right"></i>
          </div>
        </div>
        <router-link to="/"></router-link> -->
      </div>
      <div class="nv-title-item-20 nv-mt-60" v-if="update">
        <!-- <pre>{{(update) }}</pre> -->

        <H1 class="nv-title-center">นิยายอัปเดตล่าสุด</H1>
        <div class="nover-latest">
          <router-link
            v-for="(item, index) in update"
            :key="index"
            :to="'/novel/' + item.id"
            class="box-latest"
          >
            <div class="image-top">
              <img
                v-lazy="
                  item.image_data
                    ? item.image_data.url
                    : $path.image('loading.png')
                "
                class="nv-img-novel-up"
                @error="$event.target.src = $path.image('loading.png')"
                width="100%"
              />
              <div class="pc">
                <div class="name-view-list">
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
                        <pre>{{
                          $filter.NumbertoText(item.novel_episode_data_total)
                        }}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="detail-top">
              <div class="con-name-view-list">
                <div class="title-view-list">
                  <div class="name-top line-1">{{ item.title }}</div>
                  <div class="mobile">
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
                          <pre>{{
                            $filter.NumbertoText(item.novel_episode_data_total)
                          }}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="line-4 story">
                  {{ item.detail }}
                </p>
              </div>

              <div class="detail-ep">
                <hr class="line-ep" />
                <div class="ep-con line-1" v-if="item.novel_episode_datas[0]">
                  <div class="line-1">
                    {{ item.novel_episode_datas[0].name }}
                  </div>
                  <div class="ew">
                    {{ $filter.Ago(item.novel_episode_datas[0].created_at) }}
                  </div>
                  <!-- 1 วันที่แล้ว -->
                </div>
                <div v-else>&nbsp;</div>
                <div class="ep-con" v-if="item.novel_episode_datas[1]">
                  <div class="line-1">
                    {{ item.novel_episode_datas[1].name }}
                  </div>
                  <div class="ew">
                    {{ $filter.Ago(item.novel_episode_datas[1].created_at) }}
                  </div>
                </div>
                <div v-else>&nbsp;</div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="read-more">
          <router-link to="/category" class="btn-link btn-read-more"
            >ดูทั้งหมด</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
// import carousel from "vue-owl-carousel";
export default Vue.extend({
  name: "Home",
  components: {
    NovelBaner: () => import("@/components/widget/NovelBaner.vue"),
    NovelCarousel: () => import("@/components/widget/NovelCarousel.vue"),
    NovelCategory: () => import("@/components/widget/NovelCategory.vue"),
    // NovelStar: () => import("@/components/widget/NovelStar.vue"),
    NovelReadNext: () => import("./novelreadnext/NovelReadNext.vue"),
    LoadingColouser: () => import("@/components/loader/LoadingColouser.vue"),
    HomeHot: () => import("./HomeHot/HomeHot.vue"),
    // NovelRecommend:()=> import("./NovelRecommend/NovelRecommend.vue")
  },
  data() {
    return {
      nextread:
        this.$store.state.storyread.story_Read && (this as any).profile
          ? true
          : false,
      recommend: null,
      banner: null,
      top: [...Array(6).keys()],
      latest: [...Array(10).keys()],
      hot: null,
      update: null,
      maximum: null,
    };
  },
  methods: {
    async getlasthot() {
      let banner = await Gatway.getService("/guest/banner");
      let statusname = banner.data.data.filter((element: any) => {
        return !element.table;
      });
      // console.log(statusname);
      this.banner = statusname;
      // // this.banner = banner.data.data.sort((a, b) => {
      // //   return a.ranking - b.ranking;
      // // });
      let res = await Gatway.getService("/guest/index/novel-hot");
      this.hot = await res.data.data;
      let getlastUpdate = await Gatway.getService(
        "/guest/index/novel-last-update"
      );
      this.update = await getlastUpdate.data.data;
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
      this.recommend = data.splice(0, 12);
      // let getNextread = await Gatway.getService(
      //   "/guest/index/novel-maximum-read"
      // );
      // this.maximum = await getNextread.data.data.splice(0, 18);
    },
    // async getlastUpdate(){

    // },
    // async getNextread(){

    // },
    // async getRecommend(){
    //   let res = await Gatway.getService('/guest/recommended-novel')
    //   const data = [] as any
    //   res.data.data.forEach((element:any) => {
    //     if(element.novel_data){
    //       data.push(element.novel_data)
    //     }
    //   });
    //   this.recommend = data.splice(0,12)

    // }
    slideRight() {
      const element = document.getElementById("nover-top");

      if (window.matchMedia("(max-width: 1024px)").matches) {
        (element as any).scrollLeft += 470;
      }
      if (window.matchMedia("(max-width: 768px)").matches) {
        (element as any).scrollLeft += 370;
      }
      if (window.matchMedia("(max-width: 415px)").matches) {
        (element as any).scrollLeft += 380;
      }
      if (window.matchMedia("(min-width: 1025px)").matches) {
        (element as any).scrollLeft += 470;
      }
    },
    slideLeft() {
      const element = document.getElementById("nover-top");
      if (window.matchMedia("(max-width: 1024px)").matches) {
        (element as any).scrollLeft -= 470;
      }
      if (window.matchMedia("(max-width: 768px)").matches) {
        (element as any).scrollLeft -= 370;
      }
      if (window.matchMedia("(max-width: 415px)").matches) {
        (element as any).scrollLeft -= 380;
      }
      if (window.matchMedia("(min-width: 1025px)").matches) {
        (element as any).scrollLeft -= 470;
      }
    },
  },

  mounted() {
    this.getlasthot();
    // this.getlastUpdate()
    // this.getNextread()
    // this.getRecommend()
  },
});
</script>
<style lang="scss" scoped>
$second-blue: #1e2046;
$second-gray: #444349;
$second-grayLight: #cfd4d9;
$primary-lightBlue: #61bcbe;
.read-more {
  display: flex;
  justify-content: center;
}
.btn-read-more {
  background: #ffffff;
  border: 1px solid #df3d0a;
  border-radius: 5px;
  padding: 7px 20px;
  margin-top: 20px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #e4803a;
}
.layout-hot-novel {
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
}
.slide-icon {
  border: 1px solid black;
  border-radius: 50%;
  padding: 0px 8px;
  background: #130f26;
  mix-blend-mode: normal;
  opacity: 0.4;
  color: white;
}
.nover-top {
  display: grid;
  grid-template-columns: 470px 470px 470px 470px 470px 470px;
  grid-template-rows: auto auto auto;
  grid-gap: 10px;
  padding: 10px;
  grid-auto-flow: column;
  overflow-y: hidden;
}
.layout-view-ep {
  display: grid !important;
  zoom: 0.9;
  grid-template-columns:1fr 1fr !important;
}

#nover-top {
  scroll-behavior: smooth;
}

.top-card {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 0.3fr 1fr 2fr;
  // grid-gap: 15px;
  grid-gap: 15px;
}
.detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 5px;
}
.image-top {
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  // grid-template-rows: 3fr 0.5fr;
}
.nv-img-novel {
  border-radius: 7px;
  // width: 117px;
  // height: 170px;
  width: 90%;
}
.nv-img-novel-up {
  border-radius: 7px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.name {
  font-size: 20px;
  color: #242424;
}
.nover-latest {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
.box-latest {
  border-radius: 10px;
  box-shadow: 0 8px 24px hsl(210deg 8% 62% / 20%);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 10px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  display: grid;
  grid-template-columns: 1fr 2.3fr;
  padding: 15px;
  grid-gap: 20px;
  transition: 0.3s;
  background: #fff;
}
.name-top {
  font-size: 20px;
  color: $second-gray;
}
.detail-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.con-name-view-list {
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  margin-top: -4px;
}
.ep-con {
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;
}

.mobile {
  display: flex;
  justify-content: flex-end;
}

// .view-list {
//   justify-content: space-between;
// }
.nover-top::-webkit-scrollbar {
  display: none;
}
.lv {
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  // border: 1px solid;
  // // position: absolute;
  // z-index: 10;
  // width: 30px;
  // height: 30px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // border-radius: 100%;
  // left: -10px;
  // top: -10px;

  // background: #ffffff;

  // text-align: center;
}
.line-ep {
  border: 0px solid;
  height: 1px;
  background: #61bcbe;
  margin: 10px 0px;
}
.story {
  font-size: 14px;
  font-family: "Sarabun", sans-serif;
}
.box-latest:hover {
  transform: scale(1.05);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
.detail-ep {
  font-size: 14px;
}
.ew {
  text-align: right;
}
.name-view-list {
  display: flex;
  justify-content: center;
  padding: 5px;
}
.nv-box-white {
  padding-top: 20px;
}

.pc {
  display: none;
}
.title-view-list {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
// .nover-top::-webkit-scrollbar {
//   display: none;
// }
@media (max-width: 1024px) {
  .nover-latest {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  .box-latest {
    padding: 10px 10px;
    grid-template-columns: 1fr 2fr;
  }
  .detail-top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .box-latest:hover {
    transform: scale(1);
  }
  .name-view-list {
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }

  .nover-top {
    grid-template-columns: 450px 450px 450px 450px 450px 450px;
  }
}
@media (max-width: 820px) {
  .nover-top {
    grid-template-columns: 360px 360px 360px 360px 360px 360px;
  }
}
@media (max-width: 768px) {
  .nover-latest {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  .detail-ep {
    font-size: 18px;
  }
  .nover-top {
    display: grid;
    grid-template-columns: 350px 350px 350px 350px 350px 350px;
    grid-gap: 20px;
    overflow-y: hidden;
    overflow-x: scroll;
    padding-right: 25px;
  }

  .name {
    font-size: 20px;
  }
  .gray {
    font-size: 16px;
  }

  .story {
    font-size: 18px;
  }
  .box-latest {
    padding: 10px 10px;
    grid-template-columns: 1fr 2.8fr;
  }
  .detail-top {
    display: flex;
    flex-direction: column;
    justify-content: space-betweenx;
  }
  .name-top {
    font-size: 22px;
    color: $second-gray;
  }
}
@media (max-width: 540px) {
  .nv-img-novel {
    // width: 130px;
    // height: 140px;
  }
  .nv-img-novel-up {
    width: 130px;
    height: 180px;
    border-radius: 20px;
  }
  .nv-box-white {
    margin: 40px 0px;
    border-radius: 0px;
    padding: 15px 15px;
  }
  .nover-top {
    display: grid;
    grid-template-columns: 340px 340px 340px 340px 340px 340px;
    grid-gap: 40px;
    overflow-y: hidden;
    overflow-x: scroll;
    padding-right: 25px;
  }

  .name {
    font-size: 20px;
  }
  .gray {
    font-size: 16px;
  }

  .pc {
    display: contents;
  }

  .story {
    font-size: 16px;
  }

  .nover-latest {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  .layout-view-ep {
    display: none !important;
  }
  .name-view-list {
    display: flex;
    // align-items: flex-start;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  // .box-latest {
  //   display: grid;
  //   grid-template-columns: 1fr;
  //   padding: 20px 5px;
  //   // padding-top: 0px;
  //   grid-gap: 20px;
  //   border-radius: 15px;
  // }
  .detail-top {
    padding: 0px 15px;
  }
  // .box-latest .image-top img {
  //   width: 60%;
  // }
  .nover-top .image-top img {
    width: 100%;
  }
  .name-top {
    font-size: 18px;
    color: $second-gray;
    margin-top: 5px;
  }
  .top-card {
    grid-gap: 15px;
  }
  .cate-datail {
    grid-gap: 5px;
  }
  .nv-box-white {
    padding: 15px 10px;
  }
  .detail-ep {
    font-size: 13px;
  }
  .box-latest {
    padding: 10px 10px;
    grid-template-columns: 1.5fr 2.8fr;
  }
}
@media (max-width: 415px) {
  .nv-img-novel {
    // width: 130px;
    // height: 140px;
  }
  .nv-img-novel-up {
    width: 130px;
    height: 180px;
    border-radius: 20px;
  }
  .nv-box-white {
    margin: 40px 0px;
    border-radius: 0px;
    padding: 15px 15px;
  }
  .nover-top {
    display: grid;
    grid-template-columns: 340px 340px 340px 340px 340px 340px;
    grid-gap: 40px;
    overflow-y: hidden;
    overflow-x: scroll;
    padding-right: 25px;
  }

  .name {
    font-size: 18px;
  }
  .gray {
    font-size: 14px;
  }

  .pc {
    display: contents;
  }

  .story {
    font-size: 14px;
  }

  .nover-latest {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  .name-view-list {
    display: flex;
    // align-items: flex-start;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  // .box-latest {
  //   display: grid;
  //   grid-template-columns: 1fr;
  //   padding: 20px 5px;
  //   // padding-top: 0px;
  //   grid-gap: 20px;
  //   border-radius: 15px;
  // }
  .detail-top {
    padding: 0px 15px;
  }
  // .box-latest .image-top img {
  //   width: 60%;
  // }
  .nover-top .image-top img {
    width: 100%;
  }
  .name-top {
    font-size: 18px;
    color: $second-gray;
    margin-top: 5px;
  }
  .top-card {
    grid-gap: 15px;
  }
  .cate-datail {
    grid-gap: 5px;
  }
  .nv-box-white {
    padding: 15px 10px;
  }
  .detail-ep {
    font-size: 13px;
  }
  .box-latest {
    padding: 10px 10px;
    grid-template-columns: 1.5fr 2.8fr;
  }
}
</style>
