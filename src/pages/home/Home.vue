<template>
  <div class="home">
    <NovelBaner :item="banner" />
    <div class="nv-box-white mt-page" style="    display: flex;
    flex-direction: column;
    gap: 40px;">
      <div class="nv-title-item" v-if="NovelDataReadNext && $store.state.auth.token">
        <H1 class="nv-title-center">นิยายอ่านต่อ</H1>
        <NovelReadNext :opject="NovelDataReadNext" :loop="true" />
      </div>
      <div v-if="CampaignList && campaign.status_campaign">
        <div
          v-if="campaign.status_campaign"
          class="nv-title-item  promoteNovel"
       
        >
          <H1 v-if="campaign" class="nv-title-center glowing-text">{{ campaign.name }}</H1>
          <div class="recommendNovel">
            <div>
              <figure>
                <img
                  class="img-recommendNovel"
                  :src="$path.image('dragon2.png')"
                />
              </figure>
            </div>
            <div v-if="CampaignList">
              <HomePromotion
                :opject="CampaignList"
                :loop="false"
                :star="false"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="nv-title-item "
        v-if="recommend"
 
      >
        <div class="recommendNovel">
          <H1 class="nv-title-center"> นิยายแนะนำ</H1>
        </div>
        <NovelCarousel :opject="recommend" :loop="false" :star="false" />
      </div>

      <div class="nv-title-item " v-if="hot">
        <H1 class="nv-title-center">นิยายมาแรง</H1>
        <NovelCarousel :opject="hot" :loop="false" />
      </div>
      <HomeBanner2 :opject="banner2" :loop="true" />

      <div class="nv-title-item-20 ">
        <div>
          <H1 class="nv-title-novelhot">นิยายติดอันดับ</H1>
        </div>
        <HomeMaximumRead />
      </div>
      <div class="nv-title-item " v-if="novelend">
        <H1 class="nv-title-center">นิยายจบแล้ว</H1>
        <NovelCarousel :opject="novelend" :loop="false" />
      </div>
      <div class="nv-title-item-20 " v-if="update">
        <H1 class="nv-title-center">นิยายอัปเดตล่าสุด</H1>
        <div class="nover-latest">
          <router-link
            v-for="(item, index) in update"
            :key="index"
            :to="'/novel/' + item.id"
            class="box-latest"
          >
            <div class="box-mywork">
              <div class="image-top">
                <NovelImage
                  :image="dataUrl(item.image_data)"
                  :alt="item.title"
                ></NovelImage>
      
                <NovelPomotion
                  :cleckP="item.novel_promotion_datas.length"
                  @cleckandP="0"
                  msmP="Sale"
                  msmE="จบ"
                  :cleckE="item.status_end_novel"
                />
              </div>
           
               <!-- <div class="view-list pc">
                      <div class="view">
                        <i class="far fa-eye"></i>
                        <div class="count-numble-view">
                          {{ $filter.NumbertoText(item.ep_total_view) }}
                        </div>
                      </div>
                      <div class="list">
                        <i class="fas fa-list"></i>
                        <div class="count-numble-view">
                          <pre>{{ $filter.NumbertoText(item.ep_count) }}</pre>
                        </div>
                      </div>
                    </div> -->
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
                          {{ $filter.NumbertoText(item.ep_total_view) }}
                        </div>
                      </div>
                      <div class="list">
                        <i class="fas fa-list"></i>
                        <div class="count-numble-view">
                          <pre>{{ $filter.NumbertoText(item.ep_count) }}</pre>
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
                    {{
                      $filter.Ago(
                        item.novel_episode_datas[0].publisher_episode_data
                          .date_time
                      )
                    }}
                  </div>
                  <!-- 1 วันที่แล้ว -->
                </div>
                <div v-else>&nbsp;</div>
                <div class="ep-con" v-if="item.novel_episode_datas[1]">
                  <div class="line-1">
                    {{ item.novel_episode_datas[1].name }}
                  </div>
                  <div class="ew">
                    {{
                      $filter.Ago(
                        item.novel_episode_datas[1].publisher_episode_data
                          .date_time
                      )
                    }}
                  </div>
                </div>
                <div v-else>&nbsp;</div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="read-more">
          <router-link to="/category?fitter=3" class="btn-link btn-read-more"
            >ดูทั้งหมด</router-link
          >
        </div>
      </div>
    </div>
    <NovelLoading ref="loading" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { _Home, _HomeSetData } from "./Home";
const logic = new _Home();
const SetData = new _HomeSetData();
export default Vue.extend({
  name: "Home",
  components: {
    NovelBaner: () => import("./NomeBaner/NomeBaner.vue"),
    NovelCarousel: () => import("@/components/widget/NovelCarousel.vue"),
    HomePromotion: () => import("./HomePromotion/HomePromotion.vue"),
    HomeBanner2: () => import("./HomeBanner2/HomeBanner2.vue"),
    NovelReadNext: () => import("./novelreadnext/NovelReadNext.vue"),
    HomeMaximumRead: () => import("./HomeMaximumRead/HomeMaximumRead.vue"),
  },
  data() {
    return {
      dataUrl: logic._dataUrl,
      nextread:
        this.$store.state.storyread.story_Read && (this as any).profile
          ? true
          : false,
      recommend: null as any,
      banner: null as any,
      top: [...Array(6).keys()],
      latest: [...Array(16).keys()],
      hot: null,
      update: null,
      maximum: null,
      novelend: null,
      novelfestival: null,
      bookweek: null as any,
      NovelDataReadNext: null as any,
      banner2: null as any,
      campaign: null as any,
      CampaignList: null as any | null,
    };
  },
  methods: {
    async public() { 
      if(this.$store.state.auth.dataset) {
         this.NovelData();
      }
      (this as any).$refs.loading.switchloading(true);
      this.Banner();
      this.NovelHot();
      await this.RecommendedNovel();
      await this.Campaign();
      await this.Banner2();
      await (this as any).$refs.loading.switchloading(false);
      await this.NovelLastUpdate();
      await this.$store.getters._getGroupType;
    },

    async NovelData() {
      // this.NovelDataReadNext = null;
      ! SetData.NovelDataReadNext || SetData.NovelDataReadNextModel !== this.$store.state.storyread.story_Read
      ? await SetData._NovelData(this.$store.state.storyread.story_Read as any): null ;
      this.NovelDataReadNext = await SetData.NovelDataReadNext;
    },
    async Campaign() {
      ! SetData.Campaign ||
      ! SetData.CampaignList ||
      SetData.CampaignList?.length === 0
      ? await SetData._Campaign()
      : null;
      this.CampaignList =  SetData.CampaignList || null
      this.campaign = await SetData.Campaign;
    },

    async Banner() {
      ! SetData.Banner ? await SetData._Banner() : null ;
      this.banner = logic._statusname(await SetData.Banner);
    },

    async NovelHot() {
      !SetData.NovelHot ? await SetData._NovelHot() : null;
      this.hot = SetData.NovelHot;
    },

    async RecommendedNovel() {
      this.recommend = logic._getRecommend(
        await this.$store.getters._GetRecommendedNovel
      );
    },

    async ThaiNationalBookFair() {
      ! SetData.ThaiNationalBookFair ||
      SetData.ThaiNationalBookFair?.length === 0
      ? await SetData._ThaiNationalBookFair()
      : null;
      this.bookweek = logic._makeUniqueRandom(
      await SetData.ThaiNationalBookFair
      );
    },
    async NovelLastUpdate() {
      ! SetData.NovelLastUpdate
      ? await SetData._NovelLastUpdate()
        : SetData.NovelLastUpdate;
      this.update = SetData.NovelLastUpdate;
    },

    async Banner2() {
      ! SetData.Banner2 ? await SetData._Banner2() : SetData.Banner2;
      var data = await logic._setBanner2(SetData.Banner2);
      this.banner2 = data;
    },
  },

  mounted() {
    this.public();
  },
});
</script>
<style lang="scss" scoped src="./Home.scss"></style>
