<template>
  <div
    class="NovelPreview"
    v-if="getNover.user_id === $store.state.auth.dataset.id"
  >
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
            <div
              class="story-sub line-5"
              style="margin-top: 15px; line-height: 1.6"
            >
              {{ getNover.detail }}
            </div>
          </div>
          <div class="grud-btn">
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
              :disabled="eplength ? false : true"
            >
              โปรโมชัน
              <div class="numbel-p" v-if="itempromotion">
                {{ itempromotion.length }}
              </div>
            </button>
            <button
              class="nv-btn-red"
              @click="$base.openalert('deletenovel', 'conDeletenovel')"
            >
              ลบหนังสือ
            </button>
            <button v-show="getNover.draft"
              class="nv-btn-purple"
              @click="$base.openalert('publicNovel', 'conPublicnovel')"
            >
              เผยแพร่นิยาย
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="nv-box-white nv-mt-40" v-if="getNover">
     <div style="position: relative" v-if="getNover.description">
        <div class="nv-title">เรื่องย่อ</div>
        <div
          class="story"
          v-html="getNover.description"
          style="margin-top: 10px; line-height: 2; height: 200px"
        ></div>

        <div class="ade"></div>
        <div class="center">
          <button class="more nv-btn-blue" @click="Element._more()">
            ดูเพิ่มเติม
          </button>
        </div>
      </div>
    </div>
    <div class="nv-box-white nv-mt-40" v-if="moment">
      <div v-if="moment.length === 0" class="nv-col-2">
        <span></span>
        <router-link :to="'/writer/novelpreview/' + novelUuid + '/novelep'">
          <button class="nv-btn-yellow">เพิ่มตอนใหม่</button>
        </router-link>
      </div>
      <div v-else>
        <div class="nv-col-2" style="padding-bottom: 20px">
          <div class="nv-title" v-if="!isdraggable">
            สารบัญ
            <span>
              <span v-if="eplength !== null">
                ( {{ $filter.NumberToString(eplength) }} )
              </span>
              <span v-else> รอสักครู่ </span>
            </span>
          </div>
          <div class="grud-btn" v-else>
            <button
              class="nv-btn-red"
              :disabled="arrayUuid.length === 0 ? true : false"
              @click="delall()"
            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
            <button
              class="nv-btn-orange"
              :disabled="arrayUuid.length === 0 ? true : false"
              @click="sell()"
            >
              <i class="fas fa-coins"></i>
            </button>
            <!-- <button @click="testf()" class="nv-btn-yellow" :disabled="isSort">
              <font-awesome-icon :icon="['fas','fa-sort']" />
            </button> -->
          </div>
          <div class="grud-btn">
            <button  v-if="isdraggable" @click="testf()" class="nv-btn-yellow" :disabled="isSort">
              <!-- <font-awesome-icon :icon="['fas','fa-sort']" /> -->
              ยืนยันการเรียง
            </button>
            <!-- <select >{{textdraggable}}</select> cancel()-->
            <!-- <button @click="!isdraggable ? test():testf()" class="nv-btn-light-blue " :disabled="isSort">{{textdraggable}}</button> -->
            <button @click="!isdraggable ? test() : cancel()" class="cancel">
              {{ textdraggable }}
            </button>

            <router-link :to="'/writer/novelpreview/' + novelUuid + '/novelep'">
              <button class="nv-btn-yellow">เพิ่มตอนใหม่</button>
            </router-link>
            <!-- <button class="nv-btn-light-blue">ช่วงราคา</button> -->
          </div>
        </div>
        <div>
          <div v-for="(item, indexmoment) in moment" :key="indexmoment">
            <div style="display: flex; align-items: center; gap: 5px">
              <!-- <input v-show="isdraggable" type="checkbox"  :id="indexmoment"  @change="seEp(item)"> -->
              <div
                v-if="item.ep.length"
                :class="
                  !isdraggable
                    ? 'box-price_range'
                    : 'box-price_range draggable-price_range'
                "
                @click="openEp(indexmoment)"
              >
                <div>{{ item.moment }}</div>
                <div>
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>
            <div class="container-ep">
              <div v-show="isdraggable" class="episode episode fg">
                <input
                  type="checkbox"
                  id="indexmoment"
                  :value="item"
                  @change="seEp"
                />
                เลือกทั้งเซต
              </div>
              <draggable
                :list="item.ep"
                :sort="isdraggable"
                @change="removePosition"
                :animation="300"
                ghost-class="ghost-card"
                group="tasks"
                :scroll-sensitivity="250"
                :fallback-tolerance="isdraggable ? 1 : 1000"
                :force-fallback="true"

              >
                <div
                  v-for="(item, index) in item.ep"
                  :key="index"
                  :class="
                    !item.draft
                      ? ' episode episode' + index
                      : ' episode draggable episode' + index
                  "
                >
                 <!-- {{item.draft}} -->
                  <div  class="line-1" style="display: flex; gap: 10px;">
                    <input
                      v-show="isdraggable"
                      :id="item.id"
                      :checked="isCheckd"
                      :value="item.id"
                      type="checkbox"
                      @change="setepid"
                    />
                    <div v-show="isdraggable">
                      <i class="fas fa-grip-lines"></i>
                    </div>
                    <div>

                      <span v-show="!isdraggable"> #{{ item.ep_no }}</span>
                       {{ item.name }} 
                        <!-- <span class="draft" v-if="item.draft"> (ฉบับร่าง) </span>   -->
                    </div>
                  </div>
                  <div class="p-con-detail">
                    <span class="coin" v-if="item.draft" >  </span> 
                    <span v-else>
                    <div v-if="item.coin != 0.0" class="coin">
                      <img :src="$path.image('coin-gold.png')" width="20px" />
                      {{ item.coin }}
                    </div>
                    
                    <div v-else class="coin"></div>
                    </span>
                    <span class="draft" v-if="item.draft"> (ฉบับร่าง) </span>  
                    <span v-else class="toThaiDateString">
                    {{
                      $filter.toThaiDateString(
                        item.publisher_episode_data.date_time
                      )
                    }}
                    น.
                    </span>
                    <div class="grud-btn-manager">
                      <div @click="hideClick(item)" class="grud-btn-manager" title="ซ่อน">
                        <font-awesome-icon v-if="!item.status_hide_ep" icon="fa-regular fa-eye" />
                        <font-awesome-icon v-else icon="fa-regular fa-eye-slash" />
                      </div>
                      <router-link
                        :to="
                          '/writer/novelpreview/' +
                          novelUuid +
                          '/novelep/' +
                          item.id
                        "
                        class="grud-btn-manager pen"
                      >
                        <!-- <img :src="$path.svg('edit.svg')" /> -->
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                      </router-link>

                      <div
                        @click="deleteEP(item, { indexmoment, index })"
                        class="grud-btn-manager trash"
                      >
                        <!-- <img :src="$path.svg('delete.svg')" /> -->
                        <font-awesome-icon icon="fa-solid fa-trash-can"  />
                      </div>
                    </div>
                  </div>
                </div>
              </draggable>
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
      title="ตั้งค่าการเผยเเพร่นิยาย"
      :button="true"
      @confirm="NovelPublish($event)"
      id="publicNovel"
      idcon="conPublicnovel"
    >
      <template v-slot:body>
        <div>ตั้งค่าการเผยเเพร่นิยายเรื่องนี้ </div>
        <div>นิยายของคุณจะเเสดงบนหน้าเว็บไซต์ให้นักอ่านเห็น เพียงคุณกดปุ่มยืนยัน</div>
        
      </template>
    </NovelConfirm>
    <!-- <NovelConfirm
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
          disabled
          class="confirm"
          style="background: #ab93f9; border: 1px solid #ab93f9"
        >
          ยืนยัน
        </button>
      </template>
    </NovelConfirm> -->
    <ConfirmDialogue ref="DeleteEp"></ConfirmDialogue>
    <PromotionModal
      v-if="eplength"
      ref="PromotionModal"
      :epcount="eplength"
      @reface="getpomotiom()"
    />
    <NovelLoading ref="loading" />
    <NovelModal2
      ID="de"
      IDCrad="clecksellCrad"
      ref="clecksellCrad"
      width="400px"
    >
      <template v-slot:body>
        <div class="from">
          <div class="contor-input">
            <div class="title">ราคา</div>
            <input
              id="TitleEp"
              type="number"
               @change="$filter.setTwoNumberDecimal"
              v-model="change_coin"
               max="10.0"
              step="0.5"
              value="0.0"
              required
              @keyup="filter"
            />
          </div>
          <div class="contor-input">
            <button class="nv-btn-yellow" @click="submitcoin()">
              ยืนยันการเปลี่ยนราคา
            </button>
          </div>
        </div>
      </template>
    </NovelModal2>
    <NovelModal2 ID="picker" IDCrad="pickerCrad" ref="picker"  width="400px" :Close="true">
      <template v-slot:body>
          <div class="contor-input">
             <div class="title">
              วันที่เผยแพร่ <span class="is-valid">*</span>
            </div>
            <v-date-picker is-expanded />
            <br>
            <div class="title">เวลาที่เผยแพร่</div>
            <input type='time' min="00:00" max="24:00">
          </div>
        <div class="contor-input nv-mt-30">
        <button
            type="submit"
            class="nv-btn-yellow"
          >
            ยืนยันการตั้งเวลา
          </button>
        </div>
      </template>
    </NovelModal2>
  </div>
  <div v-else>
    <div class="nv-box-white nv-mt-40 not-novel-mys">ไม่พบนิยายของท่าน</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import { Gatway } from "../../../shares/services";
import { alert, loadbtn, closealert } from "@/shares/modules/alert";
import draggable from "vuedraggable";
import NovelModal2 from "@/components/widget/NovelModal2.vue";
import {_NovelPreview,_NovelPreviewSetData, _NovelPreviewElement} from "./NovelPreview"
const logic = new _NovelPreview
const Setdata = new _NovelPreviewSetData
export default Vue.extend({
  name: "NovelPreview",
  components: {    
    draggable,
    NovelStar: () => import("@/components/widget/NovelStar.vue"),
    NovelConfirm: () => import("@/components/widget/NovelConfirm.vue"),
    PromotionModal: () => import("./PromotionModal/PromotionModal.vue"),
    NovelModal2,
  },
  data() {
    return {
      Element: new _NovelPreviewElement(),
      Ep: [] as any,
      isdraggable: false,
      textdraggable: "เปิดโหมดจัดการ",
      dataSort: [] as any,
      isSort: true,
      review: [...Array(6).keys()],
      price_range: [...Array(6).keys()],
      img: "https://pbs.twimg.com/media/EsBPBp1XEAMVZxC.jpg",
      getNover: {} as any,
      novelUuid: this.$route.params.id,
      EpisodeData: [] as any,
      isCheckd: false,
      confirm: "",
      confirmEp: null,
      nameEP: "" as string,
      arrayUuid: [] as any,
      epObj: {} as any,
      change_coin: 0.00,
      epIndex: 0,
      moment: null as any,
      momentdefault: null as any,
      momentIndex: 0,
      eplength: null as any,
      itempromotion: null as any,
      NovelId:this.$route.params.id,
    };
  },
  methods: {

    async hideClick(item:any){
      let confirm = await (this as any).$refs.DeleteEp.show({
        title: !item.status_hide_ep ? "ซ่อนตอนนิยาย" : "ยกเลิกซ่อนตอนนิยาย",
        message: "ตอนที่ " + item.ep_no + " " + item.name,
        okButton: "ยืนยัน",
      });
      if(confirm){
        await Gatway.postService('/customers/hide-episode', { id:item.id , status_hide_ep:!item.status_hide_ep } as any)
        const index =  logic._findIndex(this.EpisodeData, item.id ) 
        this.EpisodeData[index].status_hide_ep = !item.status_hide_ep 
        this.moment = await logic._momentEp(this.EpisodeData)
        await (this as any).$refs.DeleteEp.close();
        this.getListEp()
      }
    },
    NovelPublish(value: any) {
      value.value === true
        ? this.publishComfirm()
        : document.getElementById("confirm")?.classList.remove("err");
    },
    async publishComfirm(){
      const res = await Gatway.PutService(
        `/customers/change-draft`,this.NovelId,this.novelUuid as any
      );
      if (res) {
        alert("เผยแพร่ตอนสำเร็จ", "success");
        // this.$router.push("/writer"); 
        window.location.reload();
        // loadbtn("remove");
      }
    },

    filter(e:any) {
      if (e.target.value < 0) {
        e.target.value = Math.abs(e.target.value);
      } else if (e.target.value === "") {
        e.target.value = "";
      }
    },

    async delall() { 
      let confirm = await (this as any).$refs.DeleteEp.show({title: "ลบตอนที่เลือก",okButton: "ยืนยัน",});
      if (confirm === true) {
        await (this as any).$refs.loading.switchloading(true);
        const dataset = { novel_data_id: this.$route.params.id, dataEp: this.arrayUuid } as any
        await Setdata._setDelete(dataset)
        await (this as any).$refs.DeleteEp.close();
        const data = logic._changeNodeList(this.Ep,this.arrayUuid)
        this.moment = await logic._momentEp(data)
        this.cancelAll()
        await (this as any).$refs.loading.switchloading(false);
      }
    },

    sell() {
      (this as any).$refs.clecksellCrad.open();
    },

    seEp(el:any) {
      if (el.target.checked === true) {
        el.target._value.ep.forEach((element:any) => {
          let seEp = document.getElementById(element.id) as HTMLInputElement;
          const index =  logic._findIndex(this.arrayUuid,element.id)
          index === -1 ? this.arrayUuid.push(element.id) : null
          seEp.checked = true;
        });
      } else {
        el.target._value.ep.forEach((element:any) => {
          let seEp =  document.getElementById(element.id) as HTMLInputElement;
          const index = logic._findIndex(this.arrayUuid,element.id)
          this.arrayUuid.splice(index, 1);
          seEp.checked = false;
        });
      }
    },

    setepid(item: any) {
      if (item.target.checked === true) {
        this.arrayUuid.push(item.target.value);
      } else {
        const index = this.arrayUuid.findIndex((object: any) => {
          return object === item.target.value;
        });
        this.arrayUuid.splice(index, 1);
      }
    },

    cancelAll(){
      this.arrayUuid = []
      this.momentdefault.forEach((element) => {
         let seEp = document.getElementById(element) as HTMLInputElement;
         if(seEp){
          seEp.checked = false;
         } 
      })
    },

    async submitcoin() {
      (this as any).$refs.clecksellCrad.close();
      await (this as any).$refs.loading.switchloading(true);
      const dataset =  { novel_data_id: this.$route.params.id, dataEp: this.arrayUuid,coin: this.change_coin,} as any
      await Setdata._setCoin(dataset)
      const  data = logic._changeNodeList(this.Ep,this.arrayUuid, this.change_coin)
      this.moment = await  logic._momentEp(data)
      this.cancelAll()
      await (this as any).$refs.loading.switchloading(false);
    },

    async test() {
      this.isdraggable = true;
      this.textdraggable = "ยกเลิก";
      this.getListEp(true);

    },

    async testf() {
      let confirm = await (this as any).$refs.DeleteEp.show({
        title: "ยืนยันการเรียงตอน",
        okButton: "ยืนยัน",
      });
      if (confirm === true) {
        await (this as any).$refs.loading.switchloading(true);
        await Gatway.postService(
          "/customers/user-info/novel-episode-data/sortV2",
          { novel_data_id: this.$route.params.id, dataEp: this.dataSort } as any
        );
        this.cancel();
      }
      await (this as any).$refs.DeleteEp.close();
    },

    cancel() {
      this.cancelAll()
      this.isdraggable = false;
      this.textdraggable = "เปิดโหมดจัดการ";
      this.getListEp();
    },

    removePosition() {
      let ArrayID = [] as any;
      this.moment.forEach((element:any) => {
        element.ep.forEach((element_ed:any) => {
          ArrayID.push(element_ed.id);
        });
      });
      this.isSort  = logic._arrayLike(ArrayID,this.momentdefault)
      this.dataSort = ArrayID;
    },

    async getnNovel() {
      const res = await this.$store.getters._GetNovelHeader(this.$route.params.id);
      this.getNover = await res;
    },

    async getListEp(draft = false) {
      await Setdata._setEpisodeData(this.$route.params.id)
      const resEpisodeData = await Setdata.getEpisodeData
      this.eplength = await resEpisodeData.length;
      let res = logic._sort(resEpisodeData, 'ep_no')
      this.EpisodeData = await res;
      this.Ep = await res;
      if(draft){
        const resfilter = await res.filter((element:any)=>{
            return  element.draft === false
        })
        this.momentdefault = logic._defaultArrayID(resfilter) ;
        this.moment = await  logic._momentEp(resfilter)
      }else{
        this.momentdefault = logic._defaultArrayID(res) ;
        this.moment = await  logic._momentEp(res)
      }

      
      await (this as any).$refs.loading.switchloading(false);
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
        alert("ลบนิยายสำเร็จ", "success");
        this.$router.push("/writer");
        loadbtn("remove");
      }
    },

    async deleteEP(item: any, index: any) {
      let confirm = await (this as any).$refs.DeleteEp.show({
        title: "ลบตอนนิยาย",
        message: "ลบ ตอนที่ " + item.ep_no + " " + item.name,
        okButton: "ยืนยัน",
        theme:'delete'
      });
      if (confirm === true) {
        const res = await Gatway.DelService(`/customers/episode_data/${item.id}`);
        await (this as any).$refs.DeleteEp.close();
        if (res) {
          this.moment[index.indexmoment].ep.splice(index.index, 1);
          alert("ลบตอนนิยายสำเร็จ", "success");
          closealert("deleteEp", "conDeleteEp");
        }
      }
    },

    async getpomotiom() {
      let res = await Gatway.getIDService(
        "/guest/novel-promotion-data",
        this.$route.params.id
      );

      this.itempromotion = res.data.data.length !== 0 ? res.data.data : null;
    },

    openEp(key: number): void {
      const con_ep = document.getElementsByClassName("container-ep")[key] as HTMLElement;
      const chevron = document.getElementsByClassName("fa-chevron-right")[key] as HTMLElement;
      if (con_ep.style.display === "block") {
        con_ep.style.display = "none";
        chevron.style.transform = "rotate(0deg)";
      } else {
        chevron.style.transform = "rotate(90deg)";
        con_ep.style.display = "block";
      }
    },
  },

  mounted() {
    this.getnNovel();
    this.getListEp();
    this.getpomotiom();
  },
});
</script>
<style lang="scss" scoped src="./NovelPreview.scss">
</style>
