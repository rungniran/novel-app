<template>
  <div>
    <div  :class="wraning === true ? 'b-mo' : 'close'">
      <!-- * คุณยังไม่เพิ่มข้อมูลนักเขียน หากมีข้อมูลนักเขียนเราตัดยอดหรียญทุก 30 วัน <router-link c to="/writer/WriterWithdrawMoney">คลิกที่นี้เพิ่มข้อมูลเขียน</router-link> -->
      * คำแนะนำ ตอนนี้คุณยังไม่มีข้อมูลนักเขียน หากคุณต้องการถอนเหรียญ  &nbsp; &nbsp; <router-link class="blink" to="/writer/WriterWithdrawMoney">"ให้คลิกที่นี่เพิ่มข้อมูลนักเขียน"</router-link>&nbsp; &nbsp;  จึงจะสามารถทำการถอนเหรียญได้
    </div>
    <div class="nv-box-white nv-mt-40">
      <div class="box-profile">
        <div class="con-profile">
          <div
            class="profile"
            style="
              background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png) center center/cover;
            "
          ></div>
          <div v-if="profile" class="nv-username">{{ this.$store.state.auth.display_name}}</div>
          <!-- <div v-if="profile">{{ profile.username }}</div> -->
        </div>
        <div class="data-info nv-mt-30">
          <div class="box-follow">
            <div class="follow">
              <span>0</span>
              <div>กำลังติดตาม</div>
            </div>
            <div class="follow">
              <span>0</span>
              <div>ผู้ติดตาม</div>
            </div>
          </div>
          <div class="box-follow" style="margin-top: 10px">
            <button
              class="nv-btn-yellow"
              @click="$base.openmodal('create-novel', 'create-novel-show', 0)"
            >
              เพิ่มผลงาน
            </button>
            <router-link to="/writer/howtonovel" class="nv-btn-orange btn-link"
              >คู่มือนักเขียน</router-link
            >
          </div>
        </div>
        <!-- <div class="dcoin">
        <div>
          <small>รายรับคงเหลือ (บาท) </small>
          <div>{{ $filter.NumberToString(this.$store.state.auth.dataset.coin_balance )}}</div>
          
        </div>
        <div>
          <router-link to="/writer/WriterWithdrawMoney"><button class="nv-btn-yellow">ถอนเงิน</button></router-link>
        </div>
      </div> -->
      </div>
      <div class="nv-mt-20">
        <div class="tap-writer">
          <router-link
            @click.native="changeComponent('Mywork')"
            to="#Mywork"
            :class="
              current === 'Mywork'
                ? 's-writer s-active1 s-active'
                : 's-writer s-active1'
            "
            replace
          >
            ผลงานของฉัน
          </router-link>
          <router-link
            @click.native="changeComponent('Statistics')"
            to="#Statistics"
            :class="
              current === 'Statistics'
                ? 's-writer s-active2 s-active'
                : 's-writer s-active2'
            "
          >
            สถิติโดยรวม
          </router-link>
          <router-link
            @click.native="changeComponent('Seport')"
            to="#Seport"
            :class="
              current === 'Seport'
                ? 's-writer s-active3 s-active'
                : 's-writer s-active3'
            "
          >
            รายงานการขาย
          </router-link>
        </div>
        <div class="nv-mt-30 component">
          <component :is="current" :wraning="wraning"></component>
        </div>
        <ModalCreateNovel />
      </div>
    </div>

    <div></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { ListService } from "@/shares/services";
export default Vue.extend({
  data() {
    return {
      current: "Mywork",
      wraning: false
    };
  },
  components: {
    Mywork: () => import('./writermywork/WriterMywork.vue'),
    Statistics: () => import("./writerstatistics/WriterStatistics.vue"),
    Seport: () => import("./components/WriterSeport.vue"),
    NovelModal: () => import("@/components/widget/NovelModal.vue"),
    ModalCreateNovel: () => import("./modelcreatenovel/ModelCreateNovel.vue"),
  },
  methods: {
    changeComponent(component: string): void {
      this.current = component;
    },
    cleckpath(): string {
      return this.$route.hash.slice(1);
    },
    async listNovel() {
      let res = await ListService.listNovel();
      console.log('>>>>>>>>',res.data.data.length);
      this.wraning = res.data.data.length !== 0 ?  true  : false
    },

    // opanmodal():void{
    // document.getElementsByClassName("create-novel")[0].classList.add("create-novel-show")
    // document.getElementsByClassName("contai-modal")[0].classList.add("show")
    // }
  },
  mounted() {
    this.listNovel()
    this.cleckpath() === ""
      ? this.changeComponent("Mywork")
      : this.changeComponent(this.$route.hash.slice(1));
  },
});
</script>
<style lang="scss" scoped>
  .b-mo{
  background:  #f36642;
  width: 100%;
  // height: 50px;
  z-index: 100;
  padding: 10px;
  margin-top: -3px;
   text-align: center;
  color: #fff;
font-family: "Sarabun", sans-serif;
font-size: 14px;
      top: 56px;
    position: sticky;
}
.blink{
  text-decoration: underline;
  color: rgb(0, 0, 0);
}
.dcoin{
  background:#f4bb4036;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  
    align-items: center;

}
.content {
  top: 0;
  width: 100%;
  min-height: 100vh;
  background: #f0f2f5 !important;
  padding-bottom: 100px;
}
// .nv-box-white{
// max-width: 950px;
// }
.box-profile {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.con-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile {
  width: 100px;
  height: 100px;
}
.box-follow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
.follow {
  padding: 10px 20px;
  background: rgb(231, 231, 231);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
}
.tap-writer {
  width: 100%;
  // border: 2px solid rgb(221, 221, 221);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  // overflow: hidden;
  border-radius: 5px;
  justify-items: center;
}
.s-writer {
  padding: 10px 0px;
  width: 100%;
  text-align: center;
  border: 1px solid rgb(220, 220, 220);
}
$radiustap: 5px;
.s-active {
  color: #fff;
  border-radius: $radiustap;
  background: #8586a7;
}
.s-active1 {
  border-radius: $radiustap 0px 0px $radiustap;
  border-right: 0px solid;
}
.s-active2 {
  // border-radius: 5px 0px 0px 5px;
  border-right: 0px solid;
  border-left: 0px solid;
}
.s-active3 {
  border-radius: 0px $radiustap $radiustap 0px;
  border-left: 0px solid;
}

.title {
  text-align: center;
  font-size: 20px;
}
.component{
  min-height: 300px;
}
.close{
  display: none;
}
@media (max-width: 1024px){
	
}
@media (max-width: 768px){
	
}

@media (max-width: 415px){
	.tap-writer{

    grid-template-columns: 1fr;
}
}
</style>