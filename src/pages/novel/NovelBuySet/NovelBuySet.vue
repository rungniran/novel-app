<template>
      
  <NovelModal2 ID="buyset" IDCrad="buysetCrad" ref="Modeal" :Close="true">
    <template v-slot:body>
      <div class="form-buyset-con">
        <div class="form-buyset mobeil">
          <span class="ep-title" data-v-730bc3b2="">ตอนที่</span>
          <div>
            <input type="number" class="form-control" id="epStart" v-model="obj.ep_fish" />
          </div>
          <span class="ep-title-to">ถึง</span>
          <div>
            <input type="number" class="form-control" id="epEnd" v-model="obj.ep_last"/>
          </div>
          <div>
            <button class="nv-btn-blue" @click="buyAll()">ซื้อยกเซต</button>
          </div>
          <div>
            <button class="nv-btn-yellow"  @click="buyset()">คำนวณราคา</button>
          </div>
        </div>
        <!-- <div>
          <button class="nv-btn-yellow">คำนวณราคา</button>
        </div> -->
        <div v-if="sum !== null" class="sum">ราคา {{$filter.NumberToString(sum)}} เหรียญ</div>
        <div class="token">
          <div> เหรียญที่มีทั้งหมด </div>
          <div class="icon-coin-stat">
             <img :src="$path.image('coin-gold.png')" width="40%" >
          </div>
          {{$filter.NumberToString(coin)}}
          <!-- {{this.$store.state.auth.dataset.coin_balance_sandbox}} -->
         <!-- <span> {{
          $filter.NumberToString(
            this.$store.state.auth.dataset.coin_balance_sandbox
          )
        }}</span> -->
        </div>
        <div class="discount">
          คูปอง

        </div>
        <div class="discount">
          โปรโมชัน
          <div class="promotion">ซื้อยกเซต 100 ตอน ลด 1%</div>
          <div class="promotion">ซื้อยกเซต 500 ตอน ลด 2%</div>
        </div>
        <div class="discount" v-if="list">
          ราบละเอียดการซื่อ
          <div class="listsell">
            <div class="listsell-list" v-for="item,index in list" :key="index">
              <p>{{$filter.NumberToString(item.title)}}</p>
              <p>{{$filter.NumberToString(item.detail)}}</p>
            </div>
          </div>
          <button class="nv-btn-orange" @click="buyConfirm()">ยืนยันการซื้อ</button>
        </div>
      </div>
    </template>
  </NovelModal2>
</template>
<script lang="ts">
import { Gatway } from "@/shares/services";
import { alert } from "@/shares/modules/alert";
import Vue from "vue";
export default Vue.extend({
  name: "buyset",
  data(){
    return{
     coin:this.$store.state.auth.dataset.coin_balance_sandbox,
     item:null as any,
     obj:{
      ep_fish:'',
      ep_last:''
     } as any,
     sum: null as any,
     list:null as any
    }
  },
  components: {
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
  },
  methods: {
    open(item={} as  any) {
      // console.log(item.item);
      this.item = item.item;
      (this as any).$refs.Modeal.open();
    },
    async buyset(){
      const Arraya = this.item.slice((this.obj.ep_fish - 1), this.obj.ep_last)
      this.countcoin(Arraya)
      
    },
    async buyAll(){
      this.obj.ep_fish =  1
      this.obj.ep_last = await this.item.length
      const Arraya = this.item.slice((this.obj.ep_fish - 1), this.obj.ep_last)
      this.countcoin(Arraya)
    },
    buyConfirm(){
      const Arraya = this.item.slice((this.obj.ep_fish - 1), this.obj.ep_last)
      this.countcoin(Arraya, true)
    },
    
    async countcoin(Arraya:any,purchase_confirmation = false){
       let data = [] as any
      Arraya.forEach((element:any) => {
        data.push(element.id)
      });
      let res = await Gatway.postService('/customers/novel-episode-data-set/buys', 
      {
        novel_data_id:this.$route.params.id,
        novel_episode_data_ids:data,
        purchase_confirmation:purchase_confirmation
      } as any)
      this.list = res.data.data
      this.sum = res.data.data[0].detail
      if (purchase_confirmation === true) {
        this.$store.commit("reset");
        (this as any).$refs.Modeal.close();
        alert('คุณซื้อนิยาย ' +  (this as any).$filter.NumberToString(res.data.data[0].detail) + ' เหรียญ','success');
      }
    }
  },
  // mounted(){
    
    
  // }
});
</script>
<style lang="scss" scoped>
.form-buyset-con {
  display: grid;
  gap: 20px;
  justify-items: center;
}
.form-buyset {
  display: flex;
  align-items: center;
  gap: 10px;
}
.token {
    // border: 2px solid #ab93f9;
    // background: #ab93f9;
    // color: #fff;
    
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    padding: 6px 15px;
    font-size: 18px;
    color: #303030;
    display: flex;
    // gap: 2px;
}
.icon-coin-stat {
    display: flex;
    justify-content: center;
    align-items: center;
}
.discount{
  display: grid;
  gap: 10px;
  width: 100%;
  border-top: 1px solid #d5d5d5;
  padding-top: 10px;
}
.promotion{
  padding: 10px;
  background: #ffc4c4;
  border-radius: 5px;
  border: 1px solid rgb(244, 77, 77);
  color: rgb(253, 22, 22);
  
}
.listsell{
   padding: 10px;
  background: #fff8e0;
  border-radius: 5px;
  border: 1px solid rgb(255, 205, 5);
  color: #000000;
}
.token{
  border: 2px solid rgb(128, 25, 245);
    width: 300px;
}
.listsell-list{
  display: flex;
      justify-content: space-between;
}
.sum{
  font-size: 20px;
}
@media (max-width: 415px){
.form-buyset {
  display: grid;
  align-items: center;
      width: 100%;
  gap: 10px;
}
}
</style>