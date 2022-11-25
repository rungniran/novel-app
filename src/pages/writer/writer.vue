<template>
  <div>
    <div  :class="data_type() === false ? 'b-mo' : 'close'">
      <!-- * คุณยังไม่เพิ่มข้อมูลนักเขียน หากมีข้อมูลนักเขียนเราตัดยอดหรียญทุก 30 วัน <router-link c to="/writer/WriterWithdrawMoney">คลิกที่นี้เพิ่มข้อมูลเขียน</router-link> -->
      * คำแนะนำ หากคุณต้องการถอนเหรียญ  &nbsp; &nbsp; <router-link class="blink" to="/writer/WriterWithdrawMoney">"ให้คลิกที่นี่เพิ่มข้อมูลนักเขียน"</router-link>&nbsp; &nbsp;  จึงจะสามารถทำการถอนเหรียญได้
    </div>
    <div  v-if="this.$store.state.auth.dataset.profile_writer">
    <div class="b-mo red" v-if="this.$store.state.auth.dataset.profile_writer.note && this.$store.state.auth.dataset.profile_writer.status_approve !== true ">
     <i class="fas fa-exclamation-circle"></i> &nbsp; &nbsp;  <router-link class="blink" to="/writer/WriterWithdrawMoney">ข้อมูลนักเขียนของคุณไม่ผ่านการอนุมัติ กรุณาเเก้ไขข้อมูลใหม่อีกครั้ง</router-link>   
    </div>
    </div>
    <div class="nv-box-white nv-mt-40">
      <div class="box-profile">
        <div class="con-profile">
          <div
            class="profile border-3-b"
            :style="
              `background: url( ${$profileimgW} ) center center/cover;`
            "
          ></div>
          <div v-if="profile" class="nv-username name-writer">{{ _name(this.$store.state.auth.dataset)}}</div>
          <!-- <div v-if="profile">{{ profile.username }}</div> -->
        </div>
        <div class="data-info nv-mt-30">
          <div class="box-follows">
            <div class="follow">
              <span>{{follow.length}}</span>
              <div>กำลังติดตาม</div>
            </div>
            <div class="follow" v-if="this.$store.state.auth.dataset.profile_writer">
              <span>0</span>
              <div>ผู้ติดตาม</div>
            </div>
          </div>
          <div class="box-follow" style="margin-top: 10px">
            <button 
              class="nv-btn-yellow custom-font"
              @click="$refs.ModalCreateNovel.open()"
            >
              เพิ่มผลงาน
            </button>
            <button class="nv-btn-orange ">

              <router-link to="/writer/howtonovel" 
                >คู่มือนักเขียน</router-link
              >
            </button>
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
          <!-- {{current}} -->
          <component :is="current" :wraning="wraning"></component>
          <div :class="current === 'Statistics' ? ' ':'close' " >
               <!-- <Statistics   :wraning="wraning"/> -->
          </div>
        </div>
        <ModalCreateNovel ref="ModalCreateNovel" />
        <!-- <Statistics :wraning="wraning"/> -->
      </div>
    </div>

    <div></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { ListService } from "@/shares/services";
import { Gatway } from "@/shares/services";
import { user_profile_data_type_id } from "@/shares/constants/enum"
export default Vue.extend({
  data() {
    return {
      current: "Mywork",
      wraning: false,
      follow:''
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
      
      this.wraning = res.data.data.length !== 0   ?  true  : false
       let follow = await Gatway.getService("/customers/follow-datas");
      console.log(follow);
      this.follow = follow.data.data
    },
    data_type(){
      if(this.$store.state.auth.dataset.profile_writer){
        return true    
      }else{
        return false
      }
    },
    _name(item:any):string{
      console.log(item.show_name);
      
      if(item.profile_writer){
        return item.profile_writer.user_nickname
      }
      else{
        if(item.user_profile_datas.user_nickname){
           return item.user_profile_datas.user_nickname
        }else{
          return item.show_name
        }
      }
      
        // return this.$store.state.auth.dataset.user_profile_datas.user_nickname
      
    }


    // opanmodal():void{
    // document.getElementsByClassName("create-novel")[0].classList.add("create-novel-show")
    // document.getElementsByClassName("contai-modal")[0].classList.add("show")
    // }
  },
  mounted() {
    this.$store.commit("reset");
    this.listNovel()
    this.cleckpath() === ""
      ? this.changeComponent("Mywork")
      : this.changeComponent(this.$route.hash.slice(1));
  },
  computed: {
    // _name: ()=> {
    //   if((this as any).$store.state.auth.dataset.profile_writer){
    //     return (this as any).$store.state.auth.dataset.profile_writer.user_nickname
    //   }
    //   else{
    //     if((this as any).$store.state.auth.dataset.user_profile_datas.user_nickname){
    //        return (this as any).$store.state.auth.dataset.user_profile_datas.user_nickname
    //     }else{
    //       return 'ไม่พบชื่อในระบบ'
    //     }
    //   }
      
    //     // return this.$store.state.auth.dataset.user_profile_datas.user_nickname
      
    // }
  },
});
</script>
<style lang="scss" scoped>
.nv-btn-orange a {
  color: #fff;
}
  .b-mo{
  background:  #f4ba40;
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
}.red{
   background:  #f45840;
}
.blink{
  text-decoration: underline;
  color: rgb(0, 0, 0);
}
.name-writer{
  word-break: break-all;
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
  width: 130px;
  height: 130px;
  border-radius: 50%;
}
.box-follows{
  display: flex;
  grid-gap: 10px;
  justify-content: space-around;
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
  
  border-right: 1px solid rgb(220, 220, 220);
}
.s-active2 {
  border-radius: 0px 0px 0px 0px;
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
	.b-mo {
    margin-top: 50px;
  }
}

@media (max-width: 415px){
	.tap-writer{
    grid-template-columns: 1fr;
}
.s-active2 {
  border-left: 1px solid;
}
.s-active3 {
  border-left: 1px solid;
}
.s-writer{
  border-radius: $radiustap;
  border: 1px solid rgb(220, 220, 220);
  margin: 2px;
}
.b-mo {
    margin-top: 50px;
  }
}
</style>
