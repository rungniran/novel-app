<template>
  <div class="read" id="Read">
    <!-- <div @click="stop()">หยุด</div>
    <div @click="play()">เล่น</div> -->

    <!-- <pre>
      {{recommend.title}}
    </pre> -->
    <!-- <div class="sticky" :style="'width:'+ Percen +'%'"></div> -->
    <!-- <Pre>
      {{read}}
    </Pre> -->
    <span v-if="code">
      <span v-if="code === 200">
        <div class="nv-box-white nv-mt-40 con-read" v-if="read">
          <div class="grod-1">
            <router-link
              class="nv-btn-gold"
              :to="'/novel/' + read.novel_data_id"
            >
              <span class="pc"><i class="fas fa-chevron-left"></i></span>
              <span class="mobile"><i class="fas fa-chevron-left"></i></span
            ></router-link>
            <div
              class="nv-btn-gold contai-sarabun"
              @click="$refs.Sarabun.toggle()"
            >
              <span class="pc"><i class="fas fa-list contai-sarabun"></i></span>
              <span class="mobile"
                ><i class="fas fa-list contai-sarabun"></i
              ></span>
              <ReadSarabun
                ref="Sarabun"
                v-on:sarabun-buy="Sarabunbuy"
                :uuid="read.novel_data_id"
              />
            </div>
            <div class="line-1" style="display: flex; align-items: center">
              <p class="line-1 color-header">{{ read.name }}</p>
            </div>
          </div>
          <div class="box-percen">
            <!-- <div class="Percen">{{Percen}}%</div> -->
            <div>
              <div class="nv-btn-gold cuttom" @click="opencutom">
                <span class="pc cuttom">Aa</span>
                <span class="mobile cuttom">Aa</span>
              </div>
              <Customize @clickFonrSize="FonrSizecm" />
            </div>
          </div>
        </div>
        <div class="nv-box-white box-read" v-if="read">
          <div class="nv-mt-30">
            <span>
              <div class="name-story">{{ read.name }}</div>
              <!-- story-file100 v-if="read.file_status !== true"-->
              <div
                
                class="nv-mt-20 story"
                id="storytext"
                v-html="text"
                :style="'font-size:' + fonrsize + 'px'"
              ></div>
              <div
                v-if="
                  read.novel_data_id === '9755FCB8-78CB-42A0-85AC-272845D833C5'
                "
              >
                <Promote />
              </div>
            </span>
            <div class="next-back" v-if="previous">
              <div v-if="read.ep_no === 1"></div>
              <button
                v-else
                @click="EpฺBack(previous)"
                class="nv-btn-gold-ep"
                :disabled="isBuy"
              >
                ตอนที่แล้ว
              </button>
              <button
                :disabled="isBuy"
                v-if="next.ep_no !== read.ep_no"
                @click="EpNext(next)"
                class="nv-btn-gold-ep"
              >
                ตอนถัดไป
              </button>
            </div>
          </div>
        </div>
      </span>
      <div v-else-if="code === 402" class="nv-box-white nv-mt-40 recommend">
        เนื้อหาถูกซ่อน
        <!-- {{next}} -->
        <!-- <div class="next-back" v-if="previous">
    
              <div v-if="read.ep_no === 1"></div>
              <button v-else @click="EpฺBack(previous)" class="nv-btn-gold-ep"  :disabled="isBuy">
                ตอนที่แล้ว
              </button>
              <button
              :disabled="isBuy"
                v-if="next.ep_no !== read.ep_no"
                @click="EpNext(next)"
                class="nv-btn-gold-ep"
                
              >
                ตอนถัดไป
              </button>
            </div> -->
      </div>
      <div v-else class="nv-box-white nv-mt-40 recommend">ท่านยังไม่ซื้อ</div>
    </span>
    <div
      v-else
      class="nv-box-white read-loading"
      style="display: flex; align-items: center; justify-content: center"
    >
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 50 50"
        style="enable-background: new 0 0 50 50"
        xml:space="preserve"
      >
        <path
          fill="#000"
          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      กำลังโหลดเนื้อหา
    </div>

    <div>
      <div class="nv-box-white nv-mt-40 recommend">
        <div v-if="recommend">
          <div v-if="recommend.length !== 0">
            <NovelCarousel :opject="recommend" />
          </div>
        </div>
      </div>
      <!-- <div v-else class="nv-box-white bg-promode">
          <Promote/>
       
        </div> -->
    </div>
    <div
      class="nv-box-white nv-mt-40 NovelEditterComment bg-editor-comments"
      v-if="profile"
    >
      <div class="title-com">แสดงความคิดเห็น</div>
      <NovelEditterComment @click="ClickPost" @opanstikers="opanstikers" />
    </div>
    <div class="nv-box-white nv-mt-40 Comments" v-if="profile && DataComment">
      <span v-if="read">
        <Comments
          :novelCommentEffet="read.novel_data.status_comment_effect"
          :DataComment="setcm"
          @fetch="fetch"
          ref="Comments"
          @opanstikers="opanstikers"
        />
      </span>
      <div class="paginate" v-show="DataComment.length > pageMax">
        <NovelPaginate
          v-if="DataComment"
          :count="~~(DataComment.length / pageMax) + 1"
          @click="page"
        />
      </div>
    </div>
    <NovelModal2
      ID="BuyBovelEpAuto"
      IDCrad="BuyBovelEpAutoCrad"
      v-if="modalSell"
      :Close="true"
      ref="BuyNovelEpAuto"
    >
      <template v-slot:body>
        <div>เปิดรายตอน</div>
        <div v-if="modalSell">{{ modalSell.name }}</div>
        <img
          v-if="modalSell"
          :src="$path.image('removebg-preview.png')"
          width="50%"
        />
        <div class="buy-ep--coin">
          <span>{{ modalSell.coin }}</span>
          <img
            v-if="modalSell"
            :src="$path.image('coin-gold.png')"
            width="20%"
          />
        </div>
        <div style="display: flex; align-items: center; grid-gap: 10px">
          <input
            type="checkbox"
            v-if="modalSell"
            :checked="cleckAuten"
            @change="switchsell(read.novel_data_id)"
            id="switch"
          />
          ใช้กำลังใจอ่านอัตโนมัติ
        </div>
        <button
          class="buy"
          v-if="modalSell"
          @click="buy(modalSell, true)"
          :disabled="isBuy"
        >
          ส่งกำลังใจ
        </button>
      </template>
    </NovelModal2>
    <NovelLoading ref="loading" />
    <Sticker ref="Sticker" />
  </div>
</template>

<script lang="ts">
import Sticker from "@/components/widget/Sticker.vue";
import { Gatway } from "@/shares/services";
import { _Read, _ReadSetData } from "./Read";
const logic = new _Read();
import { alert } from "@/shares/modules/alert";
import { setAutoBuy, getAutoBuy } from "@/shares/modules/autobuy";
import { setThreme } from "./ReadCustomize";
import ReadSarabun from "./readsarabun/ReadSarabun.vue";
import Vue from "vue";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
export default Vue.extend({
  name: "Read",
  data() {
    return {
      responsive: {
        0: {
          items: 2.5,
        },
        415: {
          items: 2.5,
        },
        768: {
          items: 4,
        },
        1024: {
          items: 5,
        },
        1100: {
          items: 6,
        },
      },
      sdds: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      recommend: null,
      fonrsize: localStorage.getItem("fontSize")
        ? parseInt(localStorage.getItem("fontSize") as string)
        : 20,
      Theme: "",
      fontStyle: "",
      Percen: 0,
      read: null as any,
      next: null,
      previous: null,
      text: "",
      code: null as number | null,
      cleckAuten: false,
      // promoteData:'',
      // IDnovel:this.$route.params.id,
      current: "",
      modalSell: null,
      commentObj: {
        action: "",
        html: "",
        star: "0",
        novel_data_id: "",
        novel_episode_data_id: this.$route.params.slug,
      },
      DataComment: null as any,
      isBuy: false,
      novel_cat: null as any,
      uuidNovel: null,
      pagesdata: [0, 15],
      pageMax: 15,
      setcm: null as any,
    };
  },
  // metaInfo: {
  //   title: 'resGetNovel',
  //   titleTemplate: '%s | My Awesome Webapp'

  // },
  components: {
    // carousel,
    NovelCarousel: () => import("@/components/widget/NovelCarousel.vue"),
    Customize: () => import("./customize/Customize.vue"),
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
    ReadSarabun,
    // NovelStar,
    Promote: () => import("./promoteNovels/promoteNovel.vue"),
    Sticker,
    Comments: () => import("@/components/Comments.vue"),
    // ReadCommentEp: () => import("./readcommentep/ReadCommentEp.vue"),
    NovelEditterComment: () =>
      import("@/components/widget/NovelEditterComment.vue"),
  },
  methods: {
    page(page: number) {
      this.pagesdata[1] = page * this.pageMax;
      this.pagesdata[0] = this.pagesdata[1] - this.pageMax;
      this.setcm = this.DataComment.slice(this.pagesdata[0], this.pagesdata[1]);
    },
    async opanstikers() {
      await (this as any).$refs.Sticker.openmodel();
    },
    FonrSizecm(size: any) {
      this.fonrsize = size;
    },
    opencutom() {
      let box_cuttom = document.getElementsByClassName(
        "box-cuttom"
      )[0] as HTMLElement;
      if (box_cuttom.classList.length === 1) {
        box_cuttom.classList.add("box-cuttom-show");
        this.current = "";
      } else {
        box_cuttom.classList.remove("box-cuttom-show");
      }
    },
    onScroll() {
      let story = document.getElementsByClassName("story")[0] as HTMLElement;
      let percen =
        ((window as any).top.scrollY / (story.scrollHeight - 500)) * 100;
      percen < 101 ? (this.Percen = percen ^ 0) : null;
      if (this.$route.fullPath.split("/")[1] === "read") {
        localStorage.setItem(
          "scollbar",
          (window as any).top.scrollY.toString()
        );
      }
    },

    async getread(Ojb: any) {
      this.read = null;
      if (Ojb.data.data === "please pay") {
        this.code = 401;
      } else if (Ojb.data.data === "hide ep") {
        this.code = 402;
      } else {
        this.code = await Ojb.data.code;
        this.read = await Ojb.data.data.current;
        this.next = await Ojb.data.data.next;
        this.previous = await Ojb.data.data.previous;
        this.isBuy = false;

        if (Ojb.data.data.current?.detail) {
          await this.forment(Ojb.data.data.current);
        }
        let dataitem = {
          id: Ojb.data.data.current.novel_data_id,
          id_ep: Ojb.data.data.current.id,
          timestamp_update: new Date(),
          // image_data:res.data.data.image_data.url,
          // title:res.data.data.title,
          // name:Ojb.data.data.current.name
          // img: res.data.data.
        };
        this.novel_cat =
          Ojb.data.data.current.novel_data.novel_category_data_id;
        this.$store.commit("setRead", dataitem);
        await this.$store.getters._GetNovelHeader(
          Ojb.data.data.current.novel_data_id
        );
        await this.$store.getters._GetNovelEpSet(
          Ojb.data.data.current.novel_data_id
        );
        // const url = await (this as any).cleck === "true" ? "/novel/novel-data" : "/guest/novel/novel-data";
        // // await this.$store.getters._GetNovelEp(url, Ojb.data.data.current.novel_data_id);
      }
      // this.isBuy = false
      setThreme();
    },

    async cleckNovel() {
      if ((this as any).profile) {
        await (this as any).$refs.loading.switchloading(true);

        let resguest = await Gatway.getIDService(
          "/guest/novel-episode/read",
          this.$route.params.slug
        );
        // this.getread(await resguest);
        await (this as any).$refs.loading.switchloading(false);
        let resreader = await Gatway.postService("/reader/novel-episode/read", {
          novel_episode_datas: [this.$route.params.slug],
          payment_confirmation: resguest.data.code !== 401 ? true : true,
        } as any);
        let res = (await (this as any).cleck) === "true" ? resreader : resguest;
        if (res.data.data === "please pay") {
          (this as any).$refs.BuyNovelEpAuto.open();
        }

        this.cleckAuten = getAutoBuy(res.data.data?.current?.novel_data_id);
        this.getread(await res);
        this.tets();
      } else {
        let resguest = await Gatway.getIDService(
          "/guest/novel-episode/read",
          this.$route.params.slug
        );
        if (resguest.data.code === 401) {
          (this as any).$base.openlogin();
        } else {
          this.read = null;
          this.getread(await resguest);
        }
        this.tets();
      }
    },
    switchsell(key: string) {
      this.cleckAuten = setAutoBuy(key);
    },
    async buy(item: any, paymentConfirma: boolean) {
      // (this as any).$refs.BuyNovelEpAuto.close()
      // this.read = null
      this.isBuy = true;
      let res = await Gatway.postService("/reader/novel-episode/read", {
        novel_episode_datas: [item.id],
        payment_confirmation: paymentConfirma,
      } as any);
      this.isBuy = false;
      if (res.data.code === 402) {
        // alert("เหรียญของคุณมีไม่เพียงพอ", "error");
      } else if (res.data.data === "please pay") {
        if (this.cleckAuten === true) {
          await this.AutoBuy(item);
        } else {
          (this as any).$refs.BuyNovelEpAuto.open();
        }
      } else {
        await this.getread(res);
        await this.$router.push("/read/" + item.id);
        await this.tets();
        this.$store.commit("reset");
        await (this as any).$refs.BuyNovelEpAuto.close();
        if (paymentConfirma === true) {
          if (item.coin !== "0.00") {
            if (item.bought != true) {
              alert("คุณในซื้อนิยาย " + item.coin + " เหรียญ", "success");
            }
          }
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    async AutoBuy(item: any) {
      // await (this as any).$refs.loading.switchloading(true)
      let res = await Gatway.postService("/reader/novel-episode/read", {
        novel_episode_datas: [item.id],
        payment_confirmation: true,
      } as any);
      // await (this as any).$refs.loading.switchloading(false)
      if (res.data.code === 402) {
        alert("เหรียญของคุณมีไม่เพียงพอ", "error");
      } else {
        await this.getread(res);
        await this.$router.push("/read/" + item.id);
        this.tets();
        this.$store.commit("reset");
        // alert(sms_alert_BuyEpisoderead(this.item.name,item.coin), "success");
        alert("คุณได้ซื้อนิยาย " + item.coin + " เหรียญ", "success");
      }
    },

    Sarabunbuy(item: any) {
      this.modalSell = item;
      this.cleckAutoBuy(item, !item.status_hide_ep || item.bought);
    },
    EpNext(item: any) {
      this.modalSell = item;
      this.cleckAutoBuy(item, !item.status_hide_ep || !item.bought);
    },
    EpฺBack(item: any) {
      this.modalSell = item;
      this.cleckAutoBuy(item, !item.status_hide_ep || !item.bought);
    },
    async cleckAutoBuy(item: any, status_hide_ep = true) {  
      if ( status_hide_ep) {
        this.Cleckbuy(item);
      } else {
        (this as any).$alert(
          "เนื้อหา " + item.name + " ถูกซ่อนอยู่",
          "wraning"
        );
      }
    },

    async Cleckbuy(item: any) {
      if ((this as any).profile) {
        if (item.coin === "0.00") {
          await this.buy(item, true);
        } else {
          await this.buy(item, false);
        }
      } else {
        if (item.coin === "0.00") {
          await this.$router.push("/read/" + item.id);
        } else {
          (this as any).$login.openlogin();
        }
        this.cleckNovel();
      }
    },

    opanSarabun() {
      // (this as any).$refs.Sarabun.toggle()
      // if (this.current !== "ReadSarabun") {
      //   this.current = "ReadSarabun";
      //   let box_cuttom = document.getElementsByClassName(
      //     "box-cuttom"
      //   )[0] as HTMLElement;
      //   box_cuttom.classList.remove("box-cuttom-show");
      // } else {
      //   this.current = "";
      // }
    },
    async comment(action: any) {
      this.commentObj.action = action;
      this.commentObj.novel_data_id = this.read.novel_data_id;
      this.commentObj.novel_episode_data_id = this.$route.params.slug;
      await Gatway.postService(
        "/customers/comments/post",
        this.commentObj as any
      );
      this.tets();
      // alert(sms_alert_CommentEp(this.item.epName), "success");
    },
    fetch() {
      this.tets();
    },
    async ClickPost(html: any) {
      let data = {
        action: "create-novel-comment-of-ep",
        html: html,
        star: "0",
        novel_data_id: this.read.novel_data_id,
        novel_episode_data_id: this.$route.params.slug,
      };
      let res = await Gatway.postService(
        "/customers/comments/post",
        data as any
      );

      this.tets();
    },
    async tets() {
      if (this.$store.state.auth.dataset) {
        let res = await Gatway.postService(
          "/customers/comments/comment-episode",
          {
            action: "fetch-comment-episode",
            novel_episode_data_id: this.$route.params.slug,
          } as any
        );
        this.DataComment = await res.data.data;
        this.page(1);
      }
    },
    async getRecommend() {
      this.recommend = logic._getRecommend(
        await this.$store.getters._GetRecommendedNovel
      ) as any;
      // this.recommend = await null;
      // let res = await Gatway.getService("/guest/recommended-novel");
      // const data = [] as any;
      // res.data.data.forEach((element: any, index: number) => {
      //   if (element.novel_data) {
      //     if ( element.novel_data.novel_category_data_id === this.novel_cat) {
      //       {
      //         data.push({
      //           ...element.novel_data,
      //           novel_episode_data_total: element.novel_data.ep_total_preview,
      //         });
      //       }
      //     }
      //   }
      // });

      // this.recommend = this.makeUniqueRandom(data);
    },
    // makeUniqueRandom(numRandoms:any) {
    //   var nums = numRandoms as any;
    //     var ranNums = [] as any;
    //     var i = nums.length as any;
    //     var j = 0 as any;

    //   while (i--) {
    //     j = Math.floor(Math.random() * (i + 1));
    //     ranNums.push(nums[j]);
    //     nums.splice(j, 1);
    //   }
    //   return ranNums;
    // },
    // async testfunction(){
    //   let res = await Gatway.getService("/guest/novel-episode/read");
    //   console.log(res)
    // },
    notprint() {
      let read = document.getElementById("Read") as HTMLElement;
      read.remove();

      // const isVisible = window.confirm("คุณพยายามละเมิดลิขสิทธิ์");
      // if (isVisible) {
      //   window.location.reload();
      // }else{
      window.location.reload();
      // }
    },

    stop() {
      window.speechSynthesis.cancel();
    },
    play() {
      // var voices = window.speechSynthesis.getVoices();
      var msg = new SpeechSynthesisUtterance();
      // msg.rate = 1;
      // msg.voice = voices[2];
      msg.lang = "th-TH";
      msg.volume = 0.75;
      msg.text = this.read.name + "  " + this.text;

      // window.speechSynthesis.cancel()
      window.speechSynthesis.speak(msg);
    },
    async forment(item: any) {
      // console.log('',item.detail.split('<br />\n'));
      if (item.file_status !== true) {
        let cutcode = await item.detail;
        let cutcode1 = await cutcode.replaceAll("style", "class");
        this.text = cutcode1;
        let ep_no = Array.from({ length: 50 }, (_, i) => i + 1) as any;
        let ep_no1 = Array.from({ length: 10 }, (_, i) => i + 81) as any;
        console.log(ep_no1);
        if (
          item.novel_data_id === "2B3CC094-1623-4C61-97A0-0F748ABA24CE" &&
          ep_no.concat(ep_no1).includes(item.ep_no) === true
        ) {
          let storytext = document.getElementById("storytext") as HTMLElement;
          storytext.classList.add("pre-wrap");
        } else if (
          item.novel_data_id === "72CE3214-410E-42FB-A30C-84AE03047A93" &&
          Array.from({ length: 10 }, (_, i) => i + 1001).includes(
            item.ep_no
          ) === true
        ) {
          console.log(Array.from({ length: 10 }, (_, i) => i + 1001));

          let storytext = document.getElementById("storytext") as HTMLElement;
          storytext.classList.add("pre-wrap");
        } else {
          let storytext = document.getElementById("storytext") as HTMLElement;
          storytext.classList.remove("pre-wrap");
        }
      } else {
        console.log("", item.detail.split("<br />\n"));
        const length = item.detail.split("<br />\n").length
        const items = item.detail.split("<br />\n")
        let text = "";

        for (let i = 0; i < length; i++) {
          if (i === length) {
            continue;
          }
          console.log(items[i]);
          const sdf =  items[i] !== '' ? '<p>'+items[i]+ '</p>' : ''
          text = text + sdf;
        }

        console.log(text);
        this.text = text
      }
      // let cutcode2  = await this.read.detail.split("<p>")
      // console.log(cutcode);
      // if(cutcode2.length > 15 || cutcode2.length == 1){
      //   this.text = cutcode1
      // let storytext = document.getElementById('storytext') as HTMLElement
      // storytext.classList.add('pre-wrap') '<p class="pre-wrap">' +
      // .replaceAll('"<br /> <br />','<br>')
      // }else{
      //   this.text = cutcode2[1]
      // }
      //  cutcode2.length > 15 || cutcode2.length == 1 ?  :
    },
    // async  promote(){
    //   let res = await Gatway.getIDService(
    //     "/guest/fetch-novel-header",
    //     (this as any).$promote
    //   );
    //   console.log(res);
    //   this.promoteData =res.data.data

    // }
  },
  async mounted() {
    window.addEventListener("beforeprint", (event) => {
      this.notprint();
    });
    window.addEventListener("keyup", (e) => {
      console.log(e.key);

      if (e.key == "PrintScreen" || e.key == "Unidentified" || e.key == "F12") {
        this.notprint();
      }
    });

    await this.cleckNovel();
    // await this.testfunction();
    await this.getRecommend();
  },
  // beforeDestroy
  // async beforeUpdate(){
  //   let cutcode = await this.read.detail.replaceAll('<br /><br />','<br>')
  //   let cutcode2  = await this.read.detail.split("<p>")
  //   console.log(cutcode);

  //   this.text = cutcode2.length > 15 || cutcode2.length == 1 ? cutcode :'<p class="pre-wrap">' + cutcode2[1]
  // },
  beforeDestroy() {
    let content = document.getElementsByClassName("content")[0] as HTMLElement;
    const Topbar = document.getElementById("Topbar") as HTMLElement;
    const text = document.getElementsByClassName("text")[0] as HTMLElement;
    const listmenu = document.getElementsByClassName("list-sub-menu");
    const footer = document.getElementsByClassName("footer")[0] as HTMLElement;
    const menuiocn = document.getElementsByClassName(
      "menumobile"
    )[0] as HTMLElement;
    Topbar.style.background = "#fff";
    footer.style.background = "#efefef";
    footer.style.color = "#5f5f5f";
    menuiocn.style.color = "#1c1140";
    for (let i = 0; i < listmenu.length - 1; i++) {
      (listmenu[i] as HTMLElement).style.color = "#1E2046";
    }
    content.style.background =
      "linear-gradient(180deg, rgba(230, 222, 255, 0.433) 2.72%, rgba(175, 151, 249, 0.432) 100%)";
    text.style.color = "#1E2046";
    for (let i = 0; i < listmenu.length - 1; i++) {
      (listmenu[i] as HTMLElement).style.color = "#1E2046";
    }
  },
});
</script>

<style lang="scss" scoped src="./Read.scss"></style>
 <style lang="scss">
.dark .read .text-editer {
  border: 1px solid #282828 !important;
}
.dark .read .Editer {
  // border: 1px solid #282828 !important;
  color: #fff;
}
.dark .read .notcomment {
  background: #313131 !important;
}
.read .notcomment {
  background: #fff !important;
}

.dark .read .box-review {
  background: #313131;
  border: 2px solid #313131;
}
.dark .read .box-reply {
  background: #313131;
  border: 2px solid #313131;
}
.dark .read .text-review {
  color: #a2a2a2 !important;
}
.dark .read .text-editer {
  background: #313131;
}
.dark .read .name-review {
  color: #a2a2a2;
}
.dark .read .review-date {
  color: #a2a2a2;
}
.dark .read .ddd {
  color: #a2a2a2;
}
.dark .read .option-icon {
  color: #a2a2a2;
}
.dark .read .b-t-reply {
  color: #a2a2a2;
}
.dark .read .fa-bars {
  color: #a2a2a2 !important;
}
.dark .read .Sarabun {
  background: #313131;
}
.dark .read .loading-sarabun {
  color: #bdbdbd;
}
.dark .read #loader-1 {
  fill: #bdbdbd;
}
.dark .read .box-sarabun {
  color: #bdbdbd !important;
}
// border: 1px solid #e7e7e7;
.dark .read .Sarabun-activate {
  background: #6d6d6d;
}
.dark .read #BuyBovelEpAutoCrad {
  background: #373737;
  color: #bdbdbd;
}
.dark .read .nv-box-carousel .grod-detail .name {
  color: #fff;
}
.dark .read .recommend {
  background: #1c1c1e;
}
.dark .read .loading-sarabun {
  color: rgb(180, 180, 180);
}
.dark .read .box-sarabun:hover {
  color: rgb(107, 107, 107) !important;
}
// .dark .read .footer-promote{
//   --footer-background: #313131 !important;
// }
</style>
