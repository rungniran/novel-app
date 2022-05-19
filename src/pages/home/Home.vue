<template>
  <div class="home">
      <!-- style="padding-top: 20px"  -->
    <NovelBaner :item="banner" />
    <div class="nv-box-white nv-mt-20" >
      <div class="nv-title-item" v-if="profile">
        <H1 class="nv-title-left">นิยายอ่านต่อ</H1>
        <NovelReadNext :opject="nextread" :loop="true" />
      </div>
      <!-- <LoadingColouser/> -->
      <div
        class="nv-title-item nv-mt-0"  v-if="recommend"
        :class="profile ? 'nv-mt-70' : 'nv-mt-10'"
      >
        <H1 class="nv-title-left">นิยายแนะนำ</H1>
        <NovelCarousel :opject="recommend"  :loop="false" />
      </div>
      <LoadingColouser v-else :className="profile ? 'nv-mt-70' : 'nv-mt-10'"/>
      <div class="nv-title-item nv-mt-70" v-if="hot">
        <H1 class="nv-title-left">นิยายมาแรง</H1>
        <NovelCarousel :opject="hot" :loop="false" />
      </div>
      <!--  -->
      <LoadingColouser v-else/>
      <div class="nv-title-item nv-mt-70">
        <H1 class="nv-title-left">Banner</H1>
        <NovelCategory :opject="2" :loop="true" />
      </div>
      <div class="nv-title-item-20 nv-mt-70">
        <H1 class="nv-title-left">นิยายติดอันดับ</H1>
        <div class="nover-top">
          <div v-for="(items, index) in maximum" :key="index" class="top-card">
            <router-link class="image-top" :to="'/novel/' + items.id">
              <img
                :src="items.image_data ? items.image_data.url : $path.image('loading.png')"
                class="nv-img-novel "
                onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
                width="100%"
              />
            </router-link>
            <div class="detail">
              <router-link  class="name line-1" :to="'/novel/' + items.id">{{items.title}}</router-link>
              <div class="gray">แฟนตาซี</div>
              <div>
                <NovelStar :rating="Math.round (items.avg_star)"/>
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
        <H1 class="nv-title-left">นิยายอัพเดทล่าสุด</H1>
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
                onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
                width="100%"
              />
            </div>
            <div class="detail-top">
              <div class="con-name-view-list">
                <div class="name-view-list">
                  <div class="name-top line-1">{{item.title}}</div>
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
                        {{ $filter.NumbertoText(item.novel_episode_data_total) }}
                      </div>
                    </div>
                  </div>
                </div>
                <p class="line-5 story">
                  {{item.detail}}
                </p>
              </div>

              <div class="detail-ep">
                <hr class="line-ep" />
                <div class="ep-con line-1"  v-if="item.novel_episode_datas[0]" >
                  <div class="line-1">{{item.novel_episode_datas[0].name}}</div>
                  <div class="ew">{{ $filter.Ago(item.novel_episode_datas[0].created_at)}}</div>
                  <!-- 1 วันที่แล้ว -->
                </div>
                <div class="ep-con" v-if="item.novel_episode_datas[1]">
                  <div class="line-1">{{item.novel_episode_datas[1].name}}</div>
                  <div class="ew">{{ $filter.Ago(item.novel_episode_datas[1].created_at)}}</div>
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
import {Gatway} from "@/shares/services"

export default Vue.extend({
  name: "Home",
  components: {
    NovelBaner:()=> import("@/components/widget/NovelBaner.vue"),
    NovelCarousel:()=>import("@/components/widget/NovelCarousel.vue"),
    NovelCategory:()=>import("@/components/widget/NovelCategory.vue"),
    NovelStar:()=>import("@/components/widget/NovelStar.vue"),
		NovelReadNext:()=>import("./novelreadnext/NovelReadNext.vue"),
    LoadingColouser:()=> import("@/components/loader/LoadingColouser.vue"),
    // NovelRecommend:()=> import("./NovelRecommend/NovelRecommend.vue")
  },
  data() {
    return {
      nextread: [...Array(6).keys()],
      recommend: null,
      banner: [...Array(5).keys()],
      top: [...Array(6).keys()],
      latest: [...Array(10).keys()],
      hot:null,
      update:null,
      maximum:null
    };
  },
  methods:{
    async getlasthot(){
      let res = await Gatway.getService('/guest/index/novel-hot')
      this.hot = res.data.data
      
      
    },
    async getlastUpdate(){
      let res = await Gatway.getService('/guest/index/novel-last-update')
      this.update = res.data.data
    },
    async getNextread(){
      let res = await Gatway.getService('/guest/index/novel-maximum-read')
      this.maximum = res.data.data.splice(0,6)      
    },
    async getRecommend(){
      let res = await Gatway.getService('/guest/recommended-novel')
      const data = [] as any
      res.data.data.forEach((element:any) => {
        console.log(element.novel_data);
        if(element.novel_data){
          data.push(element.novel_data)
        }
      });
      this.recommend = data.splice(0,12)      

    }
  },

  mounted(){
    this.getlasthot()
    this.getlastUpdate()
    this.getNextread()
    this.getRecommend()
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
  display: grid;
  grid-template-columns: 1fr 2fr;
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
  color: #848484;
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
.name-view-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
}
.ep-con {
      display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr 1fr;
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
.ew{
  text-align: right;
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
.box-latest:hover{
transform: scale(1.0);
}
}
@media (max-width: 768px) {
  .nover-latest {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
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
}
@media (max-width: 415px) {
  .nv-box-white {
    margin: 40px 0px;
    border-radius: 0px;
    padding: 50px 15px;
  }
  .nover-latest {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  .nover-top {
    display: grid;
    grid-template-columns: 1fr ;
    grid-gap: 20px;
  }
  .name-view-list {
    display: flex;
    // align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
  }
  .box-latest {
    display: grid;
    grid-template-columns: 1fr;
    padding: 20px 5px;
    // padding-top: 0px;
    grid-gap: 20px;
    border-radius: 15px;
  }
  .detail-top {
    padding: 0px 15px;
  }
  .box-latest .image-top img {
    width: 60%;
  }
  .nover-top .image-top img {
    width: 100%;
  }
  .top-card {
    grid-gap: 15px;
  }
  .cate-datail {
    grid-gap: 5px;
  }
	.nv-box-white{
		    padding: 50px 10px;
	}
}
</style>
