<template>
  <div class="read" id="Read">
    <!-- <pre>
      {{recommend.title}}
    </pre> -->
    <!-- <div class="sticky" :style="'width:'+ Percen +'%'"></div> -->
    <!-- <Pre>
      {{read}}
    </Pre> -->
    <div class="con-read nv-box-white nv-mt-40" v-if="read">
      <div class="grod-1">
        <router-link class="nv-btn-gold" :to="'/novel/' + read.novel_data_id">
          <span class="pc"><i class="fas fa-chevron-left"></i></span>
          <span class="mobile"><i class="fas fa-chevron-left"></i></span
        ></router-link>
        <div class="nv-btn-gold contai-sarabun" @click="$refs.Sarabun.toggle()">
          <span class="pc"><i class="fas fa-list contai-sarabun"></i></span>
          <span class="mobile"><i class="fas fa-list contai-sarabun"></i></span>
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
          <Customize   @clickFonrSize="FonrSizecm"/>
        </div>
      </div>
    </div>
    <div class="nv-box-white box-read" v-if="read">
      <div class="nv-mt-30">
        <div class="name-story">{{ read.name }}</div>
        <div
          class="nv-mt-20 story"
          v-html="read.detail"
          :style="'font-size:' + fonrsize + 'px'"
        ></div>

        <div class="next-back" v-if="previous">
 
          <div v-if="read.ep_no === 1"></div>
          <div v-else @click="EpฺBack(previous)" class="nv-btn-gold-ep">
            ตอนที่แล้ว
          </div>
          <div
            v-if="next.ep_no !== read.ep_no"
            @click="EpNext(next)"
            class="nv-btn-gold-ep"
          >
            ตอนถัดไป
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div v-else class="nv-box-white read-loading"  style="    display: flex;
    align-items: center;
    justify-content: center;
    ">
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
      </svg> กำลังโหลดเนื้อหา
    </div>
    
    <!-- <pre>
      {{recommend}}
    </pre> -->
    
    <div v-if="recommend">
      <div v-if="recommend.length !== 0" class="nv-box-white nv-mt-40 bg-color-theme">
        <div class="NovelCarousel">
        <carousel
          :items="1"
          :loop="true"
          :margin="10"
          :center="false"
          :lazyLoad="false"
          :autoplay="true"
          :singleItem="false"
          :nav="true"
          class="NovelCarousel"
          :dots="false"
          :responsive="responsive"
          :navText="sdds"
        >
          <template>
       
            <router-link
              v-for="(items, index) in recommend"
              :key="index"
              :to="'/novel/' + items.id"
              class="nv-box-carousel carousel"
            >
      
              <img
                class="item-banner"
                :src="
                  items.image_data
                    ? items.image_data.url
                    : $path.image('loading.png')
                "
                onerror="this.onerror=null;this.src='https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png';"
                :alt="items.title"
              />

              <div class="grod-detail">
                <div class="name line-1">{{ items.title }}</div>
                <div class="subname">
                  {{ items.novel_category_data_preview }}
                </div>
                <div>
                  <NovelStar
                  
                    :rating="Math.round(items.avg_star)"
                  />
                </div>
                <div class="view-list">
                  <div class="view">
                    <i class="far fa-eye"></i>
                    <div class="count-numble-view">
                      {{ $filter.NumbertoText(items.ep_total_view) }}
                    </div>
                  </div>
                  <div class="list">
                    <i class="fas fa-list"></i>
                    <div class="count-numble-view">
                      {{ $filter.NumbertoText(items.ep_count) }}
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </template>
        </carousel>
      </div>
      </div>
     <div v-else>
      <!-- df -->
     </div>
    </div>
    <div
      class="nv-box-white nv-mt-40 NovelEditterComment bg-editor-comments"
      v-if="profile"
    >
      <div class="title-com">แสดงความคิดเห็น</div>
      <NovelEditterComment @click="ClickPost" />
    </div>
    <div class="nv-box-white nv-mt-40 Comments" v-if="profile && DataComment">

      <Comments :DataComment="DataComment" @fetch="fetch" />
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
        <button class="buy" v-if="modalSell" @click="buy(modalSell, true)" :disabled="isBuy">
          ส่งกำลังใจ
        </button>
      </template>
    </NovelModal2>
  </div>
</template>

<script lang="ts">
import { Gatway } from "@/shares/services";
import carousel from "vue-owl-carousel";
// import { sms_alert_BuyEpisoderead } from "@/shares/constants/smsalert";
import NovelStar from "@/components/widget/NovelStar.vue";
import { alert } from "@/shares/modules/alert";
import { setAutoBuy, getAutoBuy } from "@/shares/modules/autobuy";
import { sms_alert_CommentEp } from "@/shares/constants/smsalert";
import { setThreme } from "./ReadCustomize";
import ReadSarabun from "./readsarabun/ReadSarabun.vue";
import Vue from "vue";
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
      },sdds: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
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
      code: 401,
      cleckAuten: false,
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
      DataComment: [],
      isBuy:false,
      novel_cat:null as any,
    };
  },
  components: {
    carousel,
    // NovelCarousel: () => import("@/components/widget/NovelCarousel.vue"),
    Customize: () => import("./customize/Customize.vue"),
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
    ReadSarabun,
    NovelStar,
    Comments: () => import("@/components/Comments.vue"),
    // ReadCommentEp: () => import("./readcommentep/ReadCommentEp.vue"),
    NovelEditterComment: () =>
      import("@/components/widget/NovelEditterComment.vue"),
  },
  methods: {
    FonrSizecm(size:any){
      this.fonrsize = size
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
      let percen = (window.top.scrollY / (story.scrollHeight - 500)) * 100;
      percen < 101 ? (this.Percen = percen ^ 0) : null;
      if (this.$route.fullPath.split("/")[1] === "read") {
        localStorage.setItem("scollbar", window.top.scrollY.toString());
      }
    },
    async getread(Ojb: any) {
      this.read = null
      if (Ojb.data.data === "please pay") {
        this.code = 401;
      } else {
        this.code = await Ojb.data.code;
        this.read = await Ojb.data.data.current;
        this.next = await Ojb.data.data.next;
        this.previous = await Ojb.data.data.previous;
        // console.log("sdf",Ojb.data.data.code)
        setThreme();

        let dataitem = {
          id: Ojb.data.data.current.novel_data_id,
          id_ep: Ojb.data.data.current.id,
          timestamp_update:new Date()
          // image_data:res.data.data.image_data.url,
          // title:res.data.data.title,
          // name:Ojb.data.data.current.name
          // img: res.data.data.
        };
        this.novel_cat = Ojb.data.data.current.novel_data.novel_category_data_id
        this.$store.commit("setRead", dataitem);
      }
    },
    
    async cleckNovel() {
       
        
      if ((this as any).profile) {
        let resguest = await Gatway.getIDService(
          "/guest/novel-episode/read",
          this.$route.params.slug
        );

        let resreader = await Gatway.postService("/reader/novel-episode/read", {
          novel_episode_datas: [this.$route.params.slug],
          payment_confirmation: resguest.data.code !== 401 ? true : false,
        } as any);
        let res = (await (this as any).cleck) === "true" ? resreader : resguest;
        if (res.data.data === "please pay") {
          (this as any).$refs.BuyNovelEpAuto.open();
        }
        
        this.cleckAuten = getAutoBuy(res.data.data.current.novel_data_id);
        this.getread(await res);
        this.tets();
      } else {
        let resguest = await Gatway.getIDService(
          "/guest/novel-episode/read",
          this.$route.params.slug
        );
        if( resguest.data.code === 401){
          (this as any). $base.openlogin() 
        } else{
          this.read = null
          this.getread(await resguest);
        } 
        this.tets()
      }
    },
    switchsell(key: string) {
      this.cleckAuten = setAutoBuy(key);
    },
    async buy(item: any, paymentConfirma: boolean) {
      // (this as any).$refs.BuyNovelEpAuto.close()
      // this.read = null
      this.isBuy = true
      let res = await Gatway.postService("/reader/novel-episode/read", {
        novel_episode_datas: [item.id],
        payment_confirmation: paymentConfirma,
      } as any);
      this.isBuy = false
      if (res.data.code === 402) {
        alert("เหรียญของคุณมีไม่เพียงพอ", "error");
      } else if (res.data.data === "please pay") {
        if (this.cleckAuten === true) {
          this.AutoBuy(item)
        } else{
          (this as any).$refs.BuyNovelEpAuto.open() ;
          //  this.read = {}
        }
          // ? 
          // : 
      } else {
        
        await this.getread(res);
        await this.$router.push("/read/" + item.id);
        this.tets();
        this.$store.commit("reset");
        (this as any).$refs.BuyNovelEpAuto.close();
        if (paymentConfirma === true) {
          if (item.coin !== "0.00") {
            if (item.bought != true) {
              alert("คุณในซื้อนิยาย " + item.coin + " เหรียญ", "success");
              // alert(sms_alert_BuyEpisoderead("",""),'success')
            }
          }
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // alert('คุณในซื้อนิยาย ' +  item.coin + ' เหรียญ','success')
      // if(res.data.data){
      //   console.log("sdds");
      // }
      // if (res.data.code !== 402) {
      //   await this.getread(res)
      //   this.$store.commit("reset");
      //   (this as any).$base.closemodal('buy-novel-ep-auto', 'create-novel-show', 0)
      //   window.scrollTo({ top: 0, behavior: 'smooth' })
      //   await this.$router.push('/read/' + item.id)
      //   if(item.coin !== '0.00' && item.bought != true){
      //     alert('คุณในซื้อนิยาย ' +  item.coin + ' เหรียญ','success')
      //   }
      // }else{
      //   alert('เหรียญของคุณมีไม่เพียงพอ' , 'error')
      // }
    },
    async AutoBuy(item: any) {
      let res = await Gatway.postService("/reader/novel-episode/read", {
        novel_episode_datas: [item.id],
        payment_confirmation: true,
      } as any);
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
      this.cleckAutoBuy(item);
    },
    EpNext(item: any) {
      this.modalSell = item;
      this.cleckAutoBuy(item);
    },
    EpฺBack(item: any) {
      this.modalSell = item;
      this.cleckAutoBuy(item);
    },
    async cleckAutoBuy(item: any) {
      if((this as any).profile){
        if (item.coin === "0.00") {
          await this.buy(item, true);
        } else {
          await this.buy(item, false);
        }
      }else{
        await this.$router.push("/read/" + item.id);
        this.cleckNovel()
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
      if(this.$store.state.auth.dataset){
      let res = await Gatway.postService(
        "/customers/comments/comment-episode",
        {
          action: "fetch-comment-episode",
          novel_episode_data_id: this.$route.params.slug,
        } as any
      );
      this.DataComment = res.data.data;
      }
    },
    async getRecommend() {
      // this.recommend = await null;
      let res = await Gatway.getService("/guest/recommended-novel");
      const data = [] as any;
      res.data.data.forEach((element: any, index: number) => {
        console.log(element.novel_data)
        if (element.novel_data) {
          if ( element.novel_data.novel_category_data_id === this.novel_cat) {
            {
              data.push({
                ...element.novel_data,
                novel_episode_data_total: element.novel_data.ep_total_preview,
              });
            }
          } 
        }
      });

      this.recommend = this.makeUniqueRandom(data);
    },
    makeUniqueRandom(numRandoms:any) {
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
    // async testfunction(){
    //   let res = await Gatway.getService("/guest/novel-episode/read");
    //   console.log(res)
    // },
    notprint(){
      // console.log("Before print");
      let read = document.getElementById("Read") as HTMLElement;
      read.remove();

      const isVisible = window.confirm("คุณพยายามละเมิดลิขสิทธิ์");
      if (isVisible) {
        window.location.reload();
      }else{
        window.location.reload();
      }
    }
  },
  async mounted() {
    window.addEventListener("beforeprint", (event) => {
      this.notprint()
    });
    // window.addEventListener('keyup', (e) => {
    //   console.log(e.key);
      
    // if (e.key == 'PrintScreen' || e.key =='Unidentified'|| e.key =='F12') {
    //     this.notprint()
    //   }
    // });

    await this.cleckNovel();
    // await this.testfunction();
    await this.getRecommend();
  },
  // beforeDestroy
  beforeCreate(){
    // console.log();

    // content.style.background = '#151515'
  },
  beforeDestroy (){
    let content = document.getElementsByClassName('content')[0] as HTMLElement
    const Topbar = document.getElementById('Topbar') as HTMLElement
    const text = document.getElementsByClassName('text')[0] as HTMLElement
    const listmenu = document.getElementsByClassName('list-sub-menu')
    const footer = document.getElementsByClassName('footer')[0] as HTMLElement
    Topbar.style.background = '#fff'
    footer.style.background = '#efefef';
    footer.style.color = '#5f5f5f';
     for (let i= 0; i < listmenu.length -1 ;i++) {
      (listmenu[i] as HTMLElement).style.color = '#1E2046'
    }
    content.style.background= 'linear-gradient(180deg, rgba(230, 222, 255, 0.433) 2.72%, rgba(175, 151, 249, 0.432) 100%)'
    text.style.color = '#1E2046' 
      for (let i= 0; i < listmenu.length -1 ;i++) {
      (listmenu[i] as HTMLElement).style.color = '#1E2046'
    }
  }
});
</script>

<style lang="scss" scoped src="./Read.scss"></style>
 <style lang="scss">
.dark .read .text-editer {
  border: 1px solid #282828 !important;
}
.dark .read .Editer{
  // border: 1px solid #282828 !important;
  color: #fff;
}
.dark .read  .notcomment{
  background: #313131 !important;
}

.dark .read .box-review{
    background: #313131; 
    border: 2px solid #313131;
}
.dark .read .box-reply{
    background: #313131; 
    border: 2px solid #313131;
}
.dark .read .text-review{
 color: #a2a2a2 !important;
}
.dark .read .text-editer{
  background: #313131; 
}
.dark .read .name-review{
  color: #a2a2a2;
}
.dark .read .review-date{
  color: #a2a2a2;
}
.dark .read .ddd{
  color: #a2a2a2;
}
.dark .read .option-icon{
  color: #a2a2a2;
}
.dark .read .b-t-reply{
  color: #a2a2a2;
}


</style>
