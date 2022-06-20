<template>
  <div class="home">
    <!-- style="padding-top: 20px"  -->
    <NovelBaner :item="banner" />
    <div class="nv-box-white nv-mt-20">
      <!-- {{this.$store.state.storyread}} v-if="profile"-->
      <div class="nv-title-item" v-if="nextread === true">
        <H1 class="nv-title-center">นิยายอ่านต่อ</H1>
        <NovelReadNext :loop="false" />
      </div>
      <!-- <LoadingColouser/> -->
      <div
        class="nv-title-item nv-mt-0"
        v-if="recommend"
        :class="nextread === true ? 'nv-mt-70' : 'nv-mt-10'"
      >
        <H1 class="nv-title-center">นิยายแนะนำ</H1>
        <NovelCarousel :opject="recommend" :loop="false" />
      </div>
      <LoadingColouser v-else :className="profile ? 'nv-mt-70' : 'nv-mt-10'" />
      <div class="nv-title-item nv-mt-70" v-if="hot">
        <H1 class="nv-title-center">นิยายมาแรง</H1>
        <NovelCarousel :opject="hot" :loop="false" />
      </div>
      <!--  -->
      <LoadingColouser v-else />
      <div class="nv-title-item nv-mt-70">
        <H1 class="nv-title-center">Banner</H1>
        <NovelCategory :opject="2" :loop="true" />
      </div>
      <div class="nv-title-item-20 nv-mt-70">
        <H1 class="nv-title-center">นิยายติดอันดับ</H1>
        <div class="nover-top">
          <div v-for="(items, index) in maximum" :key="index" class="top-card">
            <div class="lv">{{ index + 1 }}</div>
            <router-link class="image-top" :to="'/novel/' + items.id">
              <img
                :src="items.image_data ? items.image_data.url : $path.image('loading.png')"
                class="nv-img-novel "
                @error="$event.target.src= $path.image('loading.png');"
                width="100%"
              />
            </router-link>
            <div class="detail">
              <router-link class="name line-1" :to="'/novel/' + items.id">{{
                items.title
              }}</router-link>
              <div class="gray">แฟนตาซี</div>
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
        <router-link to="/"></router-link>
      </div>
      <div class="nv-title-item-20 nv-mt-70">
        <H1 class="nv-title-center">นิยายอัพเดทล่าสุด</H1>
        <div class="nover-latest">
          <router-link
            v-for="(item, index) in update"
            :key="index"
            :to="'/novel/' + item.id"
            class="box-latest"
          >
            <div class="image-top">
              <img
                :src="item.image_data ? item.image_data.url : $path.image('loading.png')"
                class="nv-img-novel "
                @error="$event.target.src= $path.image('loading.png');"
                width="100%"
              />
            </div>
            <div class="detail-top">
              <div class="con-name-view-list">
                
                <div class="name-view-list">
                  <div class="name-top line-1">{{ item.title }}</div><div class="view-list">
                  <div class="view">
                    <i class="far fa-eye"></i>
                    <div class="count-numble-view">
                      {{ $filter.NumbertoText(item.total_view) }}
                    </div>
                  </div>
                  <div class="list">
                    <i class="fas fa-list"></i>
                    <div class="count-numble-view">
                      {{ $filter.NumbertoText(item.novel_episode_data_total) }}
                    </div>
                  </div>
                </div>
                </div>
                <p class="line-5 story">
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
                <div class="ep-con" v-if="item.novel_episode_datas[1]">
                  <div class="line-1">
                    {{ item.novel_episode_datas[1].name }}
                  </div>
                  <div class="ew">
                    {{ $filter.Ago(item.novel_episode_datas[1].created_at) }}
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";

export default Vue.extend({
  name: "Home",
  components: {
    NovelBaner: () => import("@/components/widget/NovelBaner.vue"),
    NovelCarousel: () => import("@/components/widget/NovelCarousel.vue"),
    NovelCategory: () => import("@/components/widget/NovelCategory.vue"),
    NovelStar: () => import("@/components/widget/NovelStar.vue"),
    NovelReadNext: () => import("./novelreadnext/NovelReadNext.vue"),
    LoadingColouser: () => import("@/components/loader/LoadingColouser.vue"),
    // NovelRecommend:()=> import("./NovelRecommend/NovelRecommend.vue")
  },
  data() {
    return {
      nextread:
        this.$store.state.storyread.story_Read && (this as any).profile
          ? true
          : false,
      recommend: null,
      banner: [...Array(5).keys()],
      top: [...Array(6).keys()],
      latest: [...Array(10).keys()],
      hot: null,
      update: null,
      maximum: null,
    };
  },
  methods:{
    async getlasthot(){
      let res = await Gatway.getService('/guest/index/novel-hot')
      this.hot = await res.data.data
      let getlastUpdate = await Gatway.getService('/guest/index/novel-last-update')
      this.update = await getlastUpdate.data.data  
      let getRecommend = await Gatway.getService('/guest/recommended-novel')
      const data = [] as any
      getRecommend.data.data.forEach((element:any) => {
        if(element.novel_data){
          data.push(element.novel_data)
        }
      });
      this.recommend = data.splice(0,12)   
      let getNextread = await Gatway.getService('/guest/index/novel-maximum-read')
      this.maximum = await getNextread.data.data.splice(0,6) 
         

    
      
      
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
  },

  mounted(){
    this.getlasthot()
    // this.getlastUpdate()
    // this.getNextread()
    // this.getRecommend()
  }
});
</script>
<style lang="scss" scoped>
$second-blue: #1e2046;
$second-gray: #444349;
$second-grayLight: #cfd4d9;
$primary-lightBlue: #61bcbe;
.nover-top {
  width: 100%;
  display: grid;
  grid-gap: 30px 0px;
  grid-template-columns: 1fr 1fr;
  grid-gap: 35px 90px;
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
  // box-shadow: 0 8px 24px hsl(210deg 8% 62% / 20%);
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
  font-size: 22px;
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
  grid-gap: 10px;
      margin-top: -4px;
}
.ep-con {
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;
}

// .view-list {
//   justify-content: end;
// }

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
  height: 0.3px;
  background: #e2e2e2;
  margin: 15px 0px;
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
  font-size: 13px;
}
.ew {
  text-align: right;
}
.name-view-list{
  display: flex;
      justify-content: space-between;
}
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
    justify-content: space-evenly;
  }
  .box-latest:hover {
    transform: scale(1);
  }
}
@media (max-width: 768px) {
  .nover-latest {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  .detail-ep {
    font-size: 20px;
  }

  .name {
    font-size: 30px;
  }
  .gray {
    font-size: 20px;
  }

  .nover-top {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  .story {
    font-size: 20px;
  }
  .box-latest {
    padding: 10px 10px;
    grid-template-columns: 1fr 2.8fr;
  }
  .detail-top {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .name-top {
    font-size: 30px;
    color: $second-gray;
  }
}
@media (max-width: 415px) {
  .nv-box-white {
    margin: 40px 0px;
    border-radius: 0px;
    padding: 15px 15px;
  }

  .name {
    font-size: 22px;
  }
  .gray {
    font-size: 14px;
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
    justify-content: space-between;
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
    font-size: 22px;
    color: $second-gray;
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
