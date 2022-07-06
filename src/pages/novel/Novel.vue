<template>
  <div class="Novel">
    <!-- <pre>  {{resGetNovel}}</pre> -->
    <div class="nv-box-white cover-novel nv-mt-40" v-if="resGetNovel">
      <div class="box-nove">
        <div class="image-nv">
          <!-- {{readNext()}} -->
          <!-- <canvas id="canvas"></canvas> -->
          <div class="bg-gradients"></div>
          <img
             v-lazy="
              resGetNovel.image_data
                ? resGetNovel.image_data.url
                : $path.image('loading.png')
            "
            class="nv-img-novel"
            width="100%"
            @error="$event.target.src = $path.image('loading.png')"
          />
        </div>
        <div class="detail">
          <div>
            <div class="nv-title line-1">{{ resGetNovel.title }}</div>
            <router-link
              class="line-1"
              style="color: #e4803a"
              :to="'/profile/' + resGetNovel.user_id + '/writer'"
              >{{ resGetNovel.penname_preview }}</router-link
            >
            <div class="con-review">
              <NovelStar :rating="Math.round(resGetNovel.avg_star)" />
              <!-- <span> ({{dataReview.length}}) </span> -->
            </div>
            <div class="nv-mt-10">
              <router-link to="#" class="nv-tag">{{
                resGetNovel.novel_category_data_preview
              }}</router-link>
            </div>
            <div
              class="story-sub line-5"
              style="margin-top: 15px; line-height: 1.6"
            >
              {{ resGetNovel.detail }}
            </div>
            <div class="view-list nv-mt-10">
              <div class="view">
                <i class="far fa-eye"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(resGetNovel.total_view) }}
                </div>
              </div>
              <div class="list">
                <i class="fas fa-list"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(resGetNovel.ep_total_preview) }}
                </div>
              </div>
            </div>
          </div>

          <!-- {{readNext()}} -->
          <div class="grud-btn">
            <!-- <router-link :to="'/read/' + readNext() "> -->
            <button @click="Next()" class="nv-btn-orange Novel-mobile" :disabled="EplistNext ? false:  true">
              อ่าน
            </button>
            <!-- </router-link> -->
            <button
              class="nv-btn-yellow Novel-mobile"
              @click="cleck ? addBookshelf(resGetNovel.id) : $base.openlogin()"
            >
              ชั้นหนังสือ
            </button>
            <button class="nv-btn-blue share" @click="$router.go(-1)">
              กลับ
            </button>
            <!-- <button class="nv-btn-blue share">
              <i class="fas fa-share-alt"></i>
            </button> -->
          </div>
        </div>
      </div>
    </div>
    <!-- -->
    <LoadingNovel v-else />

    <div class="nv-box-white nv-mt-40" v-if="resGetNovel">
      <div style="position: relative">
        <div class="nv-title">เรื่องย่อ</div>
        <div
          class="story"
          v-html="resGetNovel.description"
          style="margin-top: 10px; line-height: 2; height: 200px"
        ></div>
        <div class="ade"></div>
        <div class="more" @click="more()">ดูเพิ่มเติม</div>
      </div>
      <div class="nv-mt-90">
        <NovelReview
          :dataPreview="dataReview"
          @fetch="reviewFetch"
          ref="NovelReview"
        />
 
      </div>
    </div>

    <div class="nv-box-white nv-mt-40 con-Sarabun" v-if="dataMomentEp">
      <div v-if="dataMomentEp.length === 0">ยังไม่มีตอนนิยาย</div>
      <div v-else>
        <div class="sarabun nv-col-2">
          <div class="nv-title">สารบัญ</div>
          <div style="display: flex; align-items: center">
            <button
              class="nv-btn-light-blue"
              @click="cleck ? $refs.NovelBuySet.open({
                item: EplistNext
              }) : $base.openlogin()"
            >
              ซื้อยกชุด
            </button>
          </div>
        </div>
        <div id="sortMomentEp">
          <div v-for="(item, index) in dataMomentEp" :key="index">
            <div
              class="box-price_range"
              @click="openEp(index)"
              v-if="item.ep.length !== 0"
            >
              <div>{{ item.moment }}</div>
              <div>
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
            
            <div class="container-ep">
              <!-- <pre>{{item.ep}}</pre> -->
              <div
                v-for="(itemep, index) in item.ep"
                :key="index"
                @click="openmenuBuy(itemep)"
              >
                <div :class="'mobile ep ep' + index">
                  <div class="con-h">
                    <div class="line-1">
                      #{{ itemep.ep_no }}
                      <span v-if="itemep.name.length > 30"
                        >{{ itemep.name.slice(1, 30) }}...</span
                      >
                      <span v-else>{{ itemep.name }}</span>
                    </div>
                    <div class="con-coin" v-if="itemep.coin !== '0.00'">
                      <div class="con-coin" v-if="itemep.bought === false">
                        <img v-lazy="$path.image('coin-gold.png')" width="20px" />
                        <span class="count-coin">{{ itemep.coin }}</span>
                      </div>
                      <div class="con-coin" v-else>
                        <img v-lazy="$path.image('coin-gray.png')" width="20px" />
                        <span class="count-coin" style="color: #cecece">{{
                          itemep.coin
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="con-h">
                    <div class="date">
                      {{ itemep.timestamp.split(" ")[0] }}
                      {{ itemep.timestamp.split(" ")[1] }}
                      {{ itemep.timestamp.split(" ")[2] }}
                    </div>
                  </div>
                </div>
                <div :class="'pc ep ep' + index">
                  <div class="line-1">
                    #{{ itemep.ep_no }}
                    <span v-if="itemep.name.length > 50"
                      >{{ itemep.name.slice(0, 50) }}...</span
                    >
                    <span v-else>{{ itemep.name }}</span>
                  </div>
                  <div class="detail-ed">
                    <div
                      v-if="readNext() === itemep.id"
                      style="width: 45px; color: #556080"
                    >
                      อ่านอยู่
                    </div>
                    <div v-else style="width: 45px"></div>
                    <div class="con-coin" v-if="itemep.coin !== '0.00'">
                      <div class="con-coin" v-if="itemep.bought === false">
                        <img :src="$path.image('coin-gold.png')" width="20px" />
                        <span class="count-coin">{{ itemep.coin }}</span>
                      </div>
                      <div class="con-coin" v-else>
                        <img :src="$path.image('coin-gray.png')" width="20px" />
                        <span class="count-coin" style="color: #cecece">{{
                          itemep.coin
                        }}</span>
                      </div>
                    </div>
                    <div class="con-coin" v-else>
                      <img width="20px" />
                      <span class="count-coin"></span>
                    </div>
                    <div class="date">{{ itemep.timestamp }}</div>
                    <div class="eye-icon-sarabun">
                      <i class="far fa-eye"></i>
                       <p style="padding-left:5px">
                         {{ $filter.NumbertoText(itemep.count_view) }}
                         </p> 

                    </div>
                    <div><i class="far fa-comment"></i> {{itemep.total_comment_preview}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nv-box-white nv-mt-40 con-Sarabun" style="display: flex; justify-content: center; align-items: center;" v-else>
        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="0.6s"
      repeatCount="indefinite"/>
    </path>
  </svg>
  กำลังโหลดสารบัญ...
    </div>

    <div class="writer-info nv-box-white" v-if="resGetNovel">
      <div class="bg-writer-info line">
        <div class="nv-title">ข้อมูลนักเขียน</div>
        <div class="writer-sarabun">
          <router-link
            class="writer-profile"
            :to="'/profile/' + resGetNovel.user_id + '/writer'"
          >
            <div class="img-profile"></div>
            <div>
              <div class="">{{ resGetNovel.penname_preview }}</div>
              <small>นักรบมังกร</small>
            </div>
          </router-link>
          
        </div>
        <div class="writer-detail">
            <button
              class="nv-btn-orange"
              @click="cleck ? null : $base.openlogin()"
            >
              ติดตาม
            </button>
          </div>
      </div>
      <div class="bg-writer-release">
        <div class="nv-title">เผยแพร่</div>
        <div class="writer-sarabun">
          <div class="writer-release">
            <div>วันที่เผยแพร่: {{ resGetNovel.timestamp }} น.</div>
            <div>ตอนล่าสุด: วันนี้ </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class=" nv-box-white tab-ser nv-mt-40">
			<div :class="current=== 'DragonHouse' ? 'se active' : 'se'" @click="current= 'DragonHouse'">ทำเนียบนักรบโลหิตมังกร</div>
			<div :class="current=== 'CheerUp' ? 'se active-cheer' : 'se'"  @click="current= 'CheerUp'">ส่งกำลังใจ</div>
		</div> 
		<div class=" nv-box-white dash nv-mt-40">
			<component :is="current"></component>
		</div>-->
    <div class="nv-box-white dash nv-mt-40" v-if="NovelID === 'F35F97E0-8B37-4705-BED4-12866281B4ED'">
      <DragonHouse />
    </div>
    <div class="nv-box-white nv-mt-40  NovelEditterComment bg-editor-comments" v-if="profile">
      <div class="title-com">แสดงความคิดเห็น</div>
      <NovelEditterComment @click="ClickPost" />
    </div>
    <div class="nv-box-white nv-mt-40 Comments" v-if="datacomment.length !== 0">
      <Comments :DataComment="datacomment" @fetch="fetch" />
    </div>
    <NovelModal2
      ID="buyNovelEpAuto"
      IDCrad="buyNovelEpAutoCard"
      ref="buyNovelEpAuto"
      :Close="true"
    >
      <template v-slot:body>
        <div style="font-size: 23px">เปิดรายตอน</div>
        <div id="epName" class="line-1"></div>
        <img
          class="dagod"
          v-lazy="$path.image('removebg-preview.png')"
          width="50%"
        />
        <div class="buy-ep--coin">
          <span id="epCoin"></span>
          <img v-lazy="$path.image('coin-gold.png')" width="20%" />
        </div>
        <div style="display: flex; align-items: center; grid-gap: 10px">
          <input
            type="checkbox"
            :checked="cleckAuten"
            @change="switchsell"
            id="switch"
          />
          เลือกเพื่อซื้ออัตโนมัติ
        </div>
        <div class="buy" id="" @click="buy">ซื้อนิยาย</div>
      </template>
    </NovelModal2>
    <NovelBuySet ref="NovelBuySet" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import { getRGB } from "@/shares/modules/color";
import { Gatway } from "@/shares/services";
import { alert } from "@/shares/modules/alert";
import { sms_alert_Add_BookShelf } from "@/shares/constants/smsalert";
import { setAutoBuy, getAutoBuy } from "@/shares/modules/autobuy";
// import LoadingNovel from "@/components/loader/LoadingNovel.vue"
// import "highlight.js/styles/tomorrow.css";
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
export default Vue.extend({
  name: "Novel",
  components: {
    NovelStar: () => import("@/components/widget/NovelStar.vue"),
    DragonHouse: () => import("./dragonhouse/DragonHouse.vue"),
    // LoadingNovel,
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
    // ReviewModal: ()=> import("./reviewmodal/ReviewModal.vue"),
    Comments: () => import("@/components/Comments.vue"),
    NovelReview: () => import("./NovelReview/NovelReview.vue"),
    NovelEditterComment: () =>
      import("@/components/widget/NovelEditterComment.vue"),
    NovelBuySet: () => import("./NovelBuySet/NovelBuySet.vue"),
    // CheerUp:()=> import("./cheerup/CheerUp.vue")
  },
  data() {
    return {
      review: [...Array(6).keys()],
      price_range: [...Array(6).keys()],
      img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      current: "DragonHouse",
      resGetNovel: null as any,
      dataMomentEp: null,
      NovelID: this.$route.params.id,
      EpID: "",
      cleckAuten: getAutoBuy(this.$route.params.id),
      datacomment: [],
      dataReview: [],
      Eplist: "",
      EplistNext: null as any
    };
  },
  methods: {
    async Next() {
      const index = this.EplistNext.findIndex(object => {
          return object.id === this.readNext();
        });
      // console.log(this.EplistNext[index]);
      this.openmenuBuy(this.EplistNext[index])
      // console.log(this.readNext());
      // let res = await Gatway.postService("/reader/novel-episode/read", {
      //   novel_episode_datas: [this.readNext()],
      //   payment_confirmation: false,
      // } as any);
      // console.log(res.data.data);
      // if(res.data.data === "please pay"){
      //   // alert("กรุณาซื้อตอนนิยาย", "error");
      //   const index = this.EplistNext.findIndex(object => {
      //     return object.id === 'b';
      //   });
      //    this.EplistNext[index]
  
      // }else{
      //   this.$router.push(`/read/${this.readNext()}`);
      // } 
      
      // this.EpID = await this.readNext();
      // await this.buy();
    },
    openEp(key: number): void {
      const con_ep = document.getElementsByClassName("container-ep")[
        key
      ] as HTMLElement;
      const chevron = document.getElementsByClassName("fa-chevron-right")[
        key
      ] as HTMLElement;
      if (con_ep.style.display === "block") {
        con_ep.style.display = "none";
        chevron.style.transform = "rotate(0deg)";
      } else {
        chevron.style.transform = "rotate(90deg)";
        con_ep.style.display = "block";
      }
    },
    async getnNovel() {
      let res = await Gatway.getIDService(
        "/guest/fetch-novel-header",
        this.$route.params.id
      );
      this.resGetNovel =  res.data.data;
      const resGetNovel = await Gatway.getIDService(
        (this as any).cleck === "true"
          ? "/novel/novel-data"
          : "/guest/novel/novel-data",
        this.$route.params.id
      );
      // this.$store.commit('setSarabun', {key:resGetNovel.data.data.novel_episode_datas}) 
      // this.Eplist = resGetNovel.data.data.novel_episode_datas.length;
      this.EplistNext = resGetNovel.data.data.novel_episode_datas
      this.momentEp(resGetNovel.data.data.novel_episode_datas);
    },

    // async getEp() {
    //   let res = await Gatway.getIDService(
    //     "/guest/fetch-novel-header",
    //     this.$route.params.id
    //   );
    //   this.resGetNovel = await res.data.data;
    // },
    async openmenuBuy(item: any): Promise<void> {
      if (
        item.coin === "0.00" ||
        this.resGetNovel.user_id === (this as any).profile?.id
      ) {
        this.$router.push(`/read/${item.id}`);
      } else {
        (this as any).profile
          ? this.bought(item)
          : (this as any).$base.openlogin();
      }
    },
    async bought(item: any) {
      if (item.bought === true) {
        this.$router.push(`/read/${item.id}`);
      } else {
        if (this.cleckAuten === true) {
          (this.EpID = await item.id), this.buy();
        } else {
          const epName = document.getElementById("epName") as HTMLElement;
          const epCoin = document.getElementById("epCoin") as HTMLElement;
          epName.innerHTML = item.name;
          epCoin.innerHTML = item.coin;
          this.EpID = item.id;
          (this as any).$refs.buyNovelEpAuto.open();
        }
      }
    },
    readNext() {
      let item = (this as any).$store.state.storyread.story_Read;
      if ((this as any).$store.state.storyread.story_Read) {
        const index = item.findIndex((object) => {
          return object.id === this.$route.params.id;
        });
        return index !== -1
          ? item[index]?.id_ep
          : (this as any).dataMomentEp[0].ep[0].id;
      } else {
        return (this as any).dataMomentEp[0].ep[0].id;
      }
    },

    async buy() {
      let res = await Gatway.postService("/reader/novel-episode/read", {
        novel_episode_datas: [this.EpID],
        payment_confirmation: true,
      } as any);
      if (res.data.code !== 402) {
        this.$store.commit("reset");
        // let dataitem = { ...this.resGetNovel, item: res.data.data };
        // this.$store.commit("setRead", dataitem);
        // console.log(res.data.data.current.coin);
        alert('คุณในซื้อนิยาย ' +  res.data.data.current.coin + ' เหรียญ','success');
        this.$router.push(`/read/${this.EpID}`);
      } else {
        alert("เหรียญของคุณมีไม่เพียงพอ", "error");
      }
    },


    switchsell() {
      this.cleckAuten = setAutoBuy(this.$route.params.id);
    },


    async momentEp(countEp: any) {
      let ep = 0;
      let [eplast, eplastStas] = [50, 50] as any[];
      let arraymoment = (await []) as any;
      let count = countEp.length / eplast;
      let momentCount = count + 0.0;
      if (countEp.length > 0) {
        for (let i = 0; i < ~~momentCount + 1; i++) {
          // setTimeout(() => {
            // console.log(eplast, "<", countEp.length);
            if (countEp.length <= eplast) {
              arraymoment.push({
                moment: `บทที่ ${ep + 1} - ${countEp.length}`,
                ep: countEp.slice(ep, eplast),
              });
              ep = +eplast;
              eplast = eplast + eplast;
            } else {
              arraymoment.push({
                moment: `บทที่ ${ep + 1} - ${eplast}`,
                ep: countEp.slice(ep, eplast),
              });
              ep = +eplast;
              eplast = eplast + eplastStas;
            }
          // }, i * 10);
        }
      }
      this.dataMomentEp = await arraymoment;
      setTimeout(async () => {
        await this.openEp(0);
      }, 100);
    },


    async addBookshelf(uuid: string) {
      let res = await Gatway.getIDService(
        "/customers/novel/add-bookshelf",
        uuid
      );
      console.log(res.data);
      
      alert(sms_alert_Add_BookShelf(this.resGetNovel.title), "success");
    },


    sort() {
      let test = document.getElementById("sortMomentEp") as HTMLElement;
      test.style.flexDirection = "column-reverse";
    },


    fetch() {
      this.getCommentAll();
      // this.getEp();
    },


    reviewFetch() {
      (this as any).$refs.NovelReview.getReviewAll();
    },


    async ClickPost(html: any) {
      let data = {
        action: "create-novel-comment",
        html: html,
        star: "0",
        novel_data_id: this.$route.params.id,
      };
      let res = await Gatway.postService(
        "/customers/comments/post",
        data as any
      );
      console.log(res);
      this.getCommentAll();
    },


    async getCommentAll() {
      let data = {
        action: "fetch-comment-all",
        novel_data_id: this.$route.params.id,
      };
      let res = await Gatway.postService(
        "/guest/comments/comment-all",
        data as any
      );
      this.datacomment = res.data.data;
      setTimeout(async () => {
        if (this.$route.name === "Novel") {
          this.getCommentAll();
        }
      }, 30000);
    },

    async getReviewAll() {
      let res = await Gatway.postService("/guest/comments/comment-preview", {
        action: "fetch-preview",
        novel_data_id: this.$route.params.id,
      } as any);
      this.dataReview = res.data.data;
      // this.countReview(res.data.data)
    },


    more() {
      let story = document.getElementsByClassName("story")[0] as HTMLElement;
      let more = document.getElementsByClassName("more")[0] as HTMLElement;
      let ade = document.getElementsByClassName("ade")[0] as HTMLElement;
      console.log(story.scrollHeight);
      
      if ( story.style.height == "200px") {
        story.style.height = story.scrollHeight + "px";
        more.innerHTML = "ย่อลง";
        ade.style.display = "none";
      } else {
        story.style.height = 200 + "px";
        more.innerHTML = "ดูเพิ่มเติม";
        ade.style.display = "flex";
      }
    },
  },

   mounted() {
    //  this.getEp();
     this.getnNovel();
    // await this.getReviewAll();
    // this.$store.commit('setSarabun', this.$route.params.id) 
     this.getCommentAll();

    // let img = document.getElementsByClassName(
    //   "nv-img-novel"
    // )[0] as HTMLImageElement;
    // let image_nv = document.getElementsByClassName('image-nv')[0] as HTMLElement
    // // let shadow = document.getElementsByClassName('nv-shadow')[0] as HTMLImageElement
    // setTimeout(()=>{
    // let { r, g, b } = getRGB(img);
    // image_nv.style.background = `rgb(${r},${g},${b})`
    // shadow.style.boxShadow = `rgb(${r},${g},${b}) 0px 7px 29px 0px`

    // },1000)
    // console.log("rgb",r,g,b);
  },
});
</script>
<style lang="scss" scoped src="./Novel.scss"></style>
