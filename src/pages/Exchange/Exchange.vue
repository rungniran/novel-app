<template>
  <div class="Exchange">
    <div class="nv-box-white nv-mt-40">
      <div class="add-coin">
        <div class="writer-profile">
          <div
            class="nv-profile-small"
            style="
              background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png) center center/cover;
            "
          ></div>
          <div>
            <div v-if="profile">{{ profile.username }}</div>
            <div v-if="profile">{{ profile.dragon }}</div>
          </div>
        </div>
        <div class="box-coin">
          <div class="nv-con-coin">
            <img :src="$path.image('diamond.png')" width="25px" height="25px" />
            {{$filter.NumberToString(profile.diamond_balance)}}
          </div>
          <button class="nv-btn-yellow" >ดูประวัติ</button>
        </div>
      </div>
    </div>
    <div class="nv-box-white nv-mt-40 item-Exchange">
      <!-- <div class="nv-title history-title" style="al"> แลกของรางวัล</div> -->
      
      <div class="item" >
           <div class="box-item" v-for="item,idex in Exchange" :key="idex" >
             <img src="https://novelkingdom.co/redeem/redeem_202201311143733.png" width="50%">
             <div class="detail-item">
               <div class="item-name">{{item.name}}</div>
               <div>ใช้เพชร {{$filter.NumberToString(item.use_diamond)}} ดวงแลก {{item.name}} </div>
               <div class="btn-item" @click="
               profile.diamond_balance > item.use_diamond 
               ? $base.openmodal('ExchangeModal', 'ExchangeModal-animetion', 0) 
               : notDiamond()"
               > 
               <img :src="$path.image('diamond.png')" width="25px" height="25px" /> {{$filter.NumberToString(item.use_diamond)}}</div>
             </div>
           </div>
      </div>
    </div>
    <NovelModal classlist="ExchangeModal" animation="ExchangeModal-animetion">
      <template v-slot:body>
        <div>กรุณากรองข็อมูลที่อยู่เพิ่มจัดส่ง</div>
        <div class="from nv-mt-30"  >
          <div class="contor-input">
            <div class="title">ชื่อ-นามสกุล</div>
            <input id="title" required />
          </div>
          <div class="contor-input">
            <div class="title">ที่อยู่</div>
            <textarea></textarea>
          </div>
          <div class="contor-input">
            <div class="title">เบอร์โทรศัพท์</div>
            <input id="title" required />
          </div>
        </div>
        <button class="nv-mt-20 nv-btn-yellow">ยืนยัน</button>
      </template>

    </NovelModal>
  </div>
</template>
<script lang="ts">
import { Gatway } from "@/shares/services";
import Vue from "vue";
import { alert } from '@/shares/modules/alert'
export default Vue.extend({
  name: "Exchange",
  data() {
    return {
      current: "Coin",
      Exchange:[]

    };
  },
  components: {
    NovelModal:()=> import('@/components/widget/NovelModal.vue')
  },
  methods: {
    notDiamond(){
      console.log('dffd');
      
      alert('จำนวนเพรชไม่เพียงพอ','error')
    },
    changeComponent(component: string): void {
      this.current = component;
    },
    cleckpath(): string {
      return this.$route.hash.slice(1);
    },
    opanmodal(): void {
      document.getElementsByClassName("contai-modal")[0].classList.add("show");
    },
    async gitlist(){
      let res = await Gatway.getService('/admin/shop-data-topic-item')
      console.log('>>>',res.data.data);
      this.Exchange =res.data.data
      
    }
  },
  mounted() {
    this.gitlist()
    this.cleckpath() === ""
      ? this.changeComponent("Coin")
      : this.changeComponent(this.$route.hash.slice(1));
  },
});
</script>
<style lang="scss" scoped>
.add-coin {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-coin {
  display: flex;
  grid-gap: 20px;
}
.tap-writer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 5px;
  justify-items: center;
}
.nv-s1 {
  border-radius: 5px 0px 0px 5px;
  border-right: 0px solid;
}
.nv-s2 {
  border-radius: 0px 5px 5px 0px;
  border-left: 0px solid;
}
.history-title {
  text-align: center;
}
.item{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
}
.box-item{
  background:#f7f8f9;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}
.box-item img{
  border-radius: 100%;
}
.item-name{
  font-size: 20px;
  text-align: center;
}
.btn-item{
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  padding: 5px 20px;
  background: #f1e2ff;
  cursor: pointer;
  width: 100%;
  border-radius: 50px;
}
.detail-item{
  display: flex;
      align-items: center;
  flex-direction: column;
  gap: 10px;
}
.from{
      width: 300px;
}
@media (max-width: 768px) {
.item {

    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
}
}
@media (max-width: 415px){
.item {

    grid-template-columns: 1fr 1fr;
    gap: 15px;
}
.item-Exchange{
  padding: 20px 0px;
}
}
</style>