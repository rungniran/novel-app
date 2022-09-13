<template>
  <div class="NovelPreview">
    <!-- <pre>
      {{getNover}}
    </pre> -->
    <div class="nv-box-white nv-mt-40" v-if="getNover">
      <div class="box-nove">
        <div class="image-nv">
          <img
            :src="
              getNover.image_data
                ? getNover.image_data.url
                : $path.image('loading.png')
            "
            class="nv-img-novel"
            @error="$event.target.src = $path.image('loading.png')"
            width="100%"
          />
        </div>
        <div class="detail">
          <div>
            <div class="nv-title line-1">{{ getNover.title }}</div>
            <div style="color: #fb9750">
              {{ getNover.penname_preview }}
            </div>
            <div class="con-review">
              <NovelStar :rating="Math.round(getNover.avg_star)" />
              <span></span>
            </div>
            <div class="nv-mt-10">
              <router-link to="#" class="nv-tag">{{
                getNover.novel_category_data_preview
              }}</router-link>
            </div>
            <div class="story-sub line-5" style="margin-top: 15px; line-height: 1.6">
              {{ getNover.detail }}
            </div>
            <!-- <div class="view-list nv-mt-10">
              <div class="view">
                <i class="far fa-eye"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(getNover.total_view) }}
                </div>
              </div>
              <div class="list">
                <i class="fas fa-list"></i>
               
              </div>
            </div> -->
          </div>
          <div class="grud-btn">
            <!-- <button class="nv-btn-orange" @click="Views">
              <i class="fas fa-chart-line"></i> ดูสถิติ
            </button> -->
            <router-link
              :to="
                '/writer/editnovel/' +
                getNover.menu_order +
                '/' +
                getNover.novel_data_type_id +
                '/' +
                getNover.id
              "
              ><button class="nv-btn-yellow">แก้ไข</button></router-link
            >
            <button
              class="nv-btn-light-blue PromotionModal"
              @click="$refs.PromotionModal.open()"
              :disabled='eplength ? false : true'
            >
              โปรโมชัน
              <div class="numbel-p" v-if="itempromotion">{{itempromotion.length}}</div>
            </button>
            <!-- <button class="nv-btn-light-blue">โปรโมชั่น</button> -->
            <button
              class="nv-btn-blue"
              @click="$base.openalert('deletenovel', 'conDeletenovel')"
            >
              ลบหนังสือ
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- <div class="nv-box-white nv-mt-40 promotioncon" v-if="itempromotion">
      <div class="promotion-c">
          นิยายนี้ติดโปรโมชันอยู่
      </div>
    </div> -->
  <!-- <pre>

    {{moment}}
  </pre> -->
    <div class="nv-box-white nv-mt-40" v-if="moment">
      <div v-if="moment.length === 0" class="nv-col-2">
        <span></span>
        <router-link :to="'/writer/novelpreview/' + novelUuid + '/novelep'">
              <button class="nv-btn-yellow">เพิ่มตอนใหม่</button>
            </router-link>
      </div>
      <div v-else>
        <div class="nv-col-2" style="padding-bottom: 20px">
          <div class="nv-title">สารบัญ 
             <span>
                  <span v-if="eplength !== null">  ( {{ $filter.NumbertoText(eplength) }} ) </span>
                  <span v-else> รอสักครู่ </span>
                </span>
          </div>
          <div class="grud-btn">
            <button @click="test()" class="nv-btn-light-blue " :disabled="isSort">เรียงชื่อตอน</button>
            <router-link :to="'/writer/novelpreview/' + novelUuid + '/novelep'">
              <button class="nv-btn-yellow">เพิ่มตอนใหม่</button>
            </router-link>
            <!-- <button class="nv-btn-light-blue">ช่วงราคา</button> -->
          </div>
        </div>
        <div>
          <!-- <div class="nv-mt-20">
          <div v-for="(item, index) in EpisodeData" :key="index" class="episode">
             <div>#{{index + 1}} {{item.name}}</div>
             <div class="p-con-detail">
               <div v-if="item.coin != 0.00" class="coin">
                 <img :src="$path.image('coin-gold.png')" width="20px" />
                 {{item.coin}}
               </div> 
               <div v-else class="coin">

               </div>
               {{item.timestamp}}
              <div class="grud-btn-manager">
                <router-link :to="'/writer/novelpreview/'+ novelUuid + '/novelep/'+ item.id" class="grud-btn-manager"> 
                  <img :src="$path.svg('edit.svg')"> 
                </router-link>
               
       
                <div @click="$base.openalert('deleteEP', 'conDeleteEp'); epObj = item; epIndex = index" class="grud-btn-manager">
                  <img :src="$path.svg('delete.svg')">  
                </div>  
              </div>
             </div>
          </div>
          </div> -->

          <div v-for="(item, indexmoment) in moment" :key="indexmoment">
            <div
              v-if="item.ep.length"
              class="box-price_range"
              @click="openEp(indexmoment)"
            >
              <div>{{ item.moment }}</div>
              <div>
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
            <div class="container-ep">
              <div
                v-for="(item, index) in item.ep"
                :key="index"
                :class="'episode episode' + index"
              >
                <div class="line-1">#{{ item.ep_no }} {{ item.name }}</div>
                <div class="p-con-detail">
                  <div v-if="item.coin != 0.0" class="coin">
                    <img :src="$path.image('coin-gold.png')" width="20px" />
                    {{ item.coin }}
                  </div>
                  <div v-else class="coin"></div>
                    {{ $filter.toThaiDateString(item.publisher_episode_data.date_time) }} น.
                  <div class="grud-btn-manager">
                    <router-link
                      :to="
                        '/writer/novelpreview/' +
                        novelUuid +
                        '/novelep/' +
                        item.id
                      "
                      class="grud-btn-manager"
                    >
                      <img :src="$path.svg('edit.svg')" />
                    </router-link>

                    <div
                      @click="
                        $base.openalert('deleteEP', 'conDeleteEp');
                        epObj = item;
                        epIndex = index;
                        momentIndex = indexmoment;
                      "
                      class="grud-btn-manager"
                    >
                      <img :src="$path.svg('delete.svg')" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <div
      class="nv-box-white nv-mt-40 con-Sarabun"
      style="display: flex; justify-content: center; align-items: center"
      v-else
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
      กำลังโหลดสารบัญ...
    </div>
    <NovelConfirm
      color="#ab93f9"
      title="ยืนยันการลบนิยาย"
      :button="true"
      @confirm="deleteConfirm($event)"
      id="deletenovel"
      idcon="conDeletenovel"
    >
      <template v-slot:body>
        <div>ข้อควรระวัง การลบหนังสือมีเงื่อนไขต่อไปนี้</div>
        <ul class="confirm-waning">
          <li class="">ไม่สามารถค้นหาหนังสือในระบบได้อีก</li>
          <li class="">ไม่สามารถกู้คืนหนังสือที่ลบแล้วได้</li>
          <li class="">นักอ่านยังสามารถอ่านหนังสือเคยซื้อไปแล้วได้</li>
        </ul>
        <div>พิมพ์คำว่า "ลบนิยาย" ในกล่องด้านล่าง เพื่อ ยืนยันการลบหนังสือ</div>
        <div class="nv-mt-10">
          <input
            v-model="confirm"
            id="confirm"
            placeholder="พิมพ์คำว่า 'ลบนิยาย'"
          />
        </div>
      </template>
    </NovelConfirm>
    <NovelConfirm
      color="#ab93f9"
      title="ยืนยันการลบ"
      @confirm="deleteConfirm($event)"
      id="deleteEP"
      idcon="conDeleteEp"
    >
      <template v-slot:body> คุณลบนิยาย {{ epObj.name }} </template>
      <template v-slot:button>
        <button
          @click="deleteEP"
          class="confirm"
          style="background: #ab93f9; border: 1px solid #ab93f9"
        >
          ยืนยัน
        </button>
      </template>
    </NovelConfirm>
    <PromotionModal v-if="eplength" ref="PromotionModal" :epcount='eplength' @reface="getpomotiom()"/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway, GetService } from "../../../shares/services";
import { alert, loadbtn, closealert } from "@/shares/modules/alert";
import { sms_alert_DelNovelep } from "@/shares/constants/smsalert";
export default Vue.extend({
  name: "NovelPreview",
  components: {
    NovelStar: () => import("@/components/widget/NovelStar.vue"),
    NovelConfirm: () => import("@/components/widget/NovelConfirm.vue"),
    // eslint-disable-next-line vue/no-unused-components
    NovelModal: () => import("@/components/widget/NovelModal.vue"),
    PromotionModal: () => import("./PromotionModal/PromotionModal.vue"),
  },
  data() {
    return {
      isSort:false,
      review: [...Array(6).keys()],
      price_range: [...Array(6).keys()],
      img: "https://pbs.twimg.com/media/EsBPBp1XEAMVZxC.jpg",
      getNover: {} as any,
      novelUuid: this.$route.params.id,
      EpisodeData: [],
      confirm: "",
      confirmEp: null,
      nameEP: "" as string,
      epObj: {} as any,
      epIndex: 0,
      moment: null as any,
      momentIndex: 0,
      eplength: null as any,
      itempromotion: null as any,
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60],
        },
      ],
      chartOptions: {
        chart: {
          id: "realtime",
          height: 350,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 500,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
    };
  },
  methods: {
    async test(){
      this.isSort = true
      let res = await Gatway.postService('/customers/user-info/novel-episode-data/sort',{novel_data_id:this.$route.params.id} as any)
      // setTimeout
      // const myTimeout = setTimeout(myGreeting, 5000);
      setTimeout(() => {
        // console.log("Delayed for 1 second.");
        this.isSort = false
      }, 30000)
      alert("เรียงตอนใหม่", "success");
             
    },
    async getnNovel() {
      // const resGetNovel = await GetService.getNovel(this.$route.params.id);
      let res = await Gatway.getIDService(
        "/guest/fetch-novel-header",
        this.$route.params.id
      );
      this.getNover = await res.data.data;
    },

    async getListEp() {
      const resEpisodeData = await Gatway.getService(
        `/customers/episode_data/index/${this.$route.params.id}`
      );
      
      this.EpisodeData = await resEpisodeData.data;
      this.eplength = resEpisodeData.data.data.length;
      let res = resEpisodeData.data.data.sort((a, b) => {
        return a.ep_no - b.ep_no
      } )
      this.momentEp(res);
    },
    confirmDelete() {
      this.confirm === "ลบนิยาย"
        ? this.delete()
        : document.getElementById("confirm")?.classList.add("err");
        
    },
    deleteConfirm(value: any) {
      value.value === true
        ? this.confirmDelete()
        : document.getElementById("confirm")?.classList.remove("err");
    },
    async delete() {
      loadbtn("add");
      const res = await Gatway.DelService(
        `/customers/novel/${this.$route.params.id}`
      );
      if (res) {
        loadbtn("remove");
        alert("ลบนิยายสำเร็จ", "success");
        this.$router.push("/writer");
      }
    },
    // ConfirmdeleteEp(value?:any, uuid?:string){
    //   value.value === true
    //   ? this.deleteEP(value.uuid, value.index)
    //   : closealert('deleteEp', 'conDeleteEp')

    // },
    async deleteEP() {
      // let moment:any[] = this.moment[0]
      // console.log(moment);
      const res = await Gatway.DelService(
        `/customers/episode_data/${this.epObj.id}`
      );
      if (res) {
        this.moment[this.momentIndex];
        this.moment[this.momentIndex].ep.splice(this.epIndex, 1);
        // this.EpisodeData.splice(this.epIndex, 1);
        // alert(sms_alert_DelNovelep(this.res.epObj.name), "success");
        alert("ลบตอนนิยายสำเร็จ", "success");
        closealert("deleteEp", "conDeleteEp");
      }
    },
    async getpomotiom() {
      let res = await Gatway.getIDService(
        "/guest/novel-promotion-data",
        this.$route.params.id
      );
      
      this.itempromotion = res.data.data.length !== 0 ? res.data.data : null ;
    },
    filterEp(key: any) {
      return this.EpisodeData.filter((item: any) => {
        return item.id.match(key);
      });
    },
    momentEp(countEp: any) {
      let arraymoment = [] as any;
      let count = countEp.length / 50;
      let momentCount = count + 0.0;
      let ep = 0;
      let [eplast, eplastStas] = [50, 50] as any[];
      if (countEp.length > 0) {
        for (let i = 0; i < ~~momentCount + 1; i++) {
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
        }
      }
      this.moment = arraymoment;
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
    Views() {
      let series = document.getElementById("series") as HTMLElement;
      window.scrollTo({ top: series.offsetHeight, behavior: "smooth" });
    },
    // test() {
    //   const limit = 100;
    //   let Sell = [
    //     Math.floor(Math.random() * limit),
    //     Math.floor(Math.random() * limit),
    //     Math.floor(Math.random() * limit),
    //     Math.floor(Math.random() * limit),
    //     Math.floor(Math.random() * limit),
    //     Math.floor(Math.random() * limit),
    //   ];
    //   let View = [
    //     Math.floor(Math.random() * limit),
    //     Math.floor(Math.random() * limit),
    //     Math.floor(Math.random() * limit),
    //     Math.floor(Math.random() * limit),
    //     Math.floor(Math.random() * limit),
    //     Math.floor(Math.random() * limit),
    //   ];
    //   (this as any).$refs.chartSell.updateSeries([
    //     {
    //       data: Sell as any,
    //     },
    //   ]);
    //   (this as any).$refs.chartSell1.updateSeries([
    //     {
    //       data: Sell as any,
    //     },
    //   ]);
    //   (this as any).$refs.chartView.updateSeries([
    //     {
    //       data: View as any,
    //     },
    //   ]);
    //   (this as any).$refs.chartView1.updateSeries([
    //     {
    //       data: View as any,
    //     },
    //   ]);
    // },
  },
  mounted() {
    this.getnNovel();
    this.getListEp();
    this.getpomotiom()
  },
});
</script>
<style lang="scss" scoped>
.btn-promotion {
  background-color: #61bcbe;
  border: 2px solid #61bcbe;
}

.btn-promotion:hover {
  box-shadow: #61bcbe 0px 3px 10px 0px;
}
.numbel-p{
  position: absolute;
  right: -10px;
  top: -10px;
  width: 20px;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #db3d3d;
  color: white;
  height: 20px;
}

.box-nove {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  grid-gap: 30px;
}
.detail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.PromotionModal{
  position: relative;
}
.grud-btn {
  display: flex;
  align-items: center;
  grid-gap: 10px;
}
.story {
  margin: 10px 0px;
  font-family: "Sarabun", sans-serif;
  font-weight: 500;
  color: #4e4e4e;
}
.story-sub {
  font-family: "Sarabun", sans-serif;
}
.image-nv {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.box-price_range {
  background: #6a70aa;
  display: flex;
  color: #fff;
  justify-content: space-between;
  padding: 20px 20px;
  border-radius: 5px;
  margin: 1px 0px;
  transition: 0.3s;
  cursor: pointer;
}
.box-price_range:hover {
   background: #545ca0;
  box-shadow: rgba(98, 145, 151, 0.8) 0px 3px 8px;
}
// .box-price_range:hover {
//   transform: scale(1.01);
//   background: #61bcbed2;
// }
.ep {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #bbbbbb;
}
.ep0 {
  border-top: 0px solid #61bcbe80;
}
.detail-ed {
  display: flex;
  justify-content: space-between;
}
.count-coin {
  margin-left: 5px;
  color: #febc2a;
}
.con-coin {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-ep {
  display: none;
  margin: 0px 15px;
}

.fa-chevron-right {
  transition: 0.3s;
}
.writer-sarabun {
  display: flex;
  justify-content: space-between;
}
.writer-detail {
  display: flex;
  align-items: center;
  grid-gap: 15px;
}
.con-review {
  display: flex;
  align-items: center;
}
.confirm-waning {
  padding: 10px;
  border: 2px solid #ab93f9;
  margin: 20px 0px;
  line-height: 1.6;
  font-size: 12px;
  border-radius: 5px;
}
.episode {
  padding: 20px 0px;
  border-top: 1px solid rgb(209, 209, 209);
  display: grid;
  grid-template-columns: 1.2fr 1fr;
}
.grud-btn-manager img {
  cursor: pointer;
}

.p-con-detail {
  display: flex;
  // grid-gap: 40px;
  align-items: center;
  justify-content: space-between;
}
.grud-btn-manager {
  display: flex;
  grid-gap: 20px;
  align-items: center;
}
#deleteEP {
  width: 200px !important;
}
.coin {
  width: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #febc2a;
}
// .promotion-c{
//       padding: 20px;
//     background: #6a70aa;
//     font-family: "Sarabun", sans-serif;
//     border-radius: 5px;
//     font-size: 15px;
//     color: white;
//     display: flex;
//     justify-content: space-between;
// }
.episode0 {
  border-top: 0px solid;
}
.series {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.promotioncon{
  padding: 0px;
  
}
.nv-img-novel{
  border-radius: 10px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

@media (max-width: 1024px) {
  .box-nove {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
  .image-nv img {
    width: 40%;
  }
}
@media (max-width: 768px) {
  .box-nove {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
  .image-nv img {
    width: 40%;
  }
}
@media (max-width: 415px) {
  .box-nove {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }

  .image-nv img {
    width: 70%;
  }
  .series {
    grid-template-columns: 1fr;
  }
}
</style>
