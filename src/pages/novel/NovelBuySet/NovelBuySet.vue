<template>
  <NovelModal2 ID="buyset" IDCrad="buysetCrad" ref="Modeal" :Close="true">
    <template v-slot:body>
      <div class="form-buyset-con">
        <div class="form-buyset mobeil">
          <span class="ep-title" data-v-730bc3b2="">ตอนที่</span>
          <div>
            <input
              type="number"
              class="form-control"
              id="epStart"
              v-model="obj.ep_fish"
              min="0.0"
              @keyup="filter"
            />
          </div>
          <span class="ep-title-to">ถึง</span>
          <div>
            <input
              type="number"
              class="form-control"
              id="epEnd"
              min="0.0"
              v-model="obj.ep_last"
              @keyup="filter"
            />
          </div>
          <div class=" cal-price1">
            <button class="nv-btn-blue" @click="buyAll()" :disabled="isBtn">ซื้อยกเซต</button>
          </div>
          <div class="cal-price2">
            <button class="nv-btn-yellow" @click="buyset()" :disabled="isBtn">คำนวณราคา</button>
          </div>
        </div>
        <div class="as" v-if="$route.params.id === '9755FCB8-78CB-42A0-85AC-272845D833C5'" >
          <promoteNovel @resetpage="resetpage"/>
        </div>
        <!-- <div class="promoteNovels"> -->
        <!-- <promoteNovels v-show="false"/> -->
        <!-- </div> -->
        <!-- <div>
          <button class="nv-btn-yellow">คำนวณราคา</button>
        </div> -->
        <!-- <div v-if="sum" class="sum">
          ราคา {{Number(sum.toFixed(2)).toLocaleString() }} เหรียญ
        </div> -->
        <div class="token">
          <button class="nv-btn-yellow" @click="addcoin()">เติมเงิน</button>
          <!-- <div style="display: flex; align-items: center; gap: 10px;">
           <div
                  class="image-profile-user"
                  style="background: url('https://cdn-icons-png.flaticon.com/512/149/149071.png') center center/cover; "
                ></div>
                
                  {{ $store.state.auth.display_name}} 
              
          </div> -->
          <div class="icon-coin-stat">
            <img :src="$path.image('coin-gold.png')" width="20px" />
            {{ $filter.NumberToString($store.state.auth.dataset.coin_balance_sandbox) }}
          </div>
          
        </div>


        <!-- <div class="discount">คูปอง</div> -->
        <div v-if="itempromotion" class="discount">
        <div class="discount" v-if="itempromotion.length !==0">
          โปรโมชัน
          <div v-for="(item, index) in itempromotion" :key="index" class="promotion">
          <span>
                 {{
                  novel_promotion_type_fix_data_id[item.novel_promotion_type_fix_data_id].name_preview
                }}
                <span
                  v-if="
                    item.novel_promotion_type_fix_data_id ===
                    promotion.epTo
                  "
                >
                  {{ item.ep_start }} ถึงตอนที่
                  {{ item.ep_end }}
                </span>
                <span
                  v-else-if="
                    item.novel_promotion_type_fix_data_id ===
                    promotion.over
                  "
                >
                  {{ item.ep_end }} ตอนหรือมากกว่า
                </span>
                {{
                  novel_promotion_type_data_id[item.novel_promotion_type_data_id].name_preview
                }}
                {{ item.amount }}
                {{
                  novel_promotion_type_data_id[item.novel_promotion_type_data_id].value
                }}
                </span>
          </div>
          <div class="promotion"  v-if="$route.params.id === '807A2FA2-D699-4B4E-B49F-F41508F5F051'" >
            โปรโมชัน ซื้อเคล็ดกายานวดารา ได้ส่วนลด 5 %
          </div>
        </div>
        </div>
        <div class="discount" v-if="list">
          รายละเอียดการซื้อ
          <div class="listsell">
            <span v-if="promotions">
              <div class="listsell-list">
                 <p>ยอดรวม</p>
                <p>{{promotions[0].coin_total.toLocaleString()}}</p>
              </div>
              <div v-for="(item, index) in promotions" :key="index" class="listsell-list">
                
                <p>{{item.promotion_name}}</p>
                <p class="price-promo">{{ Number(item.coin_discount.toFixed(2)).toLocaleString()}}</p>
              </div>
            </span>
            <div
              class="listsell-list"
          
            >
              <p>{{ list[3].title }}</p>
              <p>{{  Number(list[3].detail.toFixed(2)).toLocaleString()}}</p>
            
            </div>
          </div>
          <button class="nv-btn-yellow" @click="buyConfirm()" :disabled="isLoading">
            <!-- <div v-if="isLoading === true">
              <svg
                version="1.1"
                id="loader-1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="22px"
                height="22px"
                viewBox="0 0 50 50"
                style="enable-background: new 0 0 50 50"
                xml:space="preserve"
              >
                <path
                  fill="#fff"
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
            </div> -->

            <div >ยืนยันการซื้อ</div>
          </button>
        </div>
      </div>
    </template>
  </NovelModal2>
</template>
<script lang="ts">
import { Gatway } from "@/shares/services";
import { novel_promotion_type_data_id, novel_promotion_type_fix_data_id } from "@/shares/constants/constant";
import { promotion } from "@/shares/constants/enum";
import { alert } from "@/shares/modules/alert";
import Vue from "vue";
export default Vue.extend({
  name: "buyset",
  props:{
    lastEP:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      coin: this.$store.state.auth.dataset.coin_balance_sandbox,
      item: null as any,
      obj: {
        ep_fish: "",
        ep_last: "",
      } as any,
      sum: null as any,
      list: null as any,
      isLoading: false,
      promotions:null,
      itempromotion:null as any,
      novel_promotion_type_data_id:novel_promotion_type_data_id,
      novel_promotion_type_fix_data_id:novel_promotion_type_fix_data_id,
      promotion:promotion,
      isBtn:false
    };
  },
  components: { 
    promoteNovel:() => import("@/pages/read/promoteNovels/promoteNovel.vue"),
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
    
    // promoteNovels:() => import("./promoteNovels/promoteNovel.vue"),
  },
  methods: {
    open(item = {} as any) {
      this.item = item.item;
      this.getpomotiom();
      (this as any).$refs.Modeal.open();
    },
    async getpomotiom(){
      let res = await  Gatway.getIDService('/guest/novel-promotion-data', this.$route.params.id)
      this.itempromotion = res.data.data.length  === 0 ? null : res.data.data
    },
    async buyset() {
      // const Arraya = this.item.slice(this.obj.ep_fish - 1, this.obj.ep_last);
       this.countcoin(this.obj.ep_fish , this.obj.ep_last);
    },
    async buyAll() {
      this.obj.ep_fish = 1;
      this.obj.ep_last =  this.lastEP;
       this.countcoin(this.obj.ep_fish , this.obj.ep_last);
    },
    buyConfirm() {
      // const Arraya = this.item.slice(this.obj.ep_fish - 1, this.obj.ep_last);
      this.isLoading = true;
      this.countcoin(this.obj.ep_fish , this.obj.ep_last, true);

    },
    
    filter(e){
      // console.log(e.target.value);
      if(e.target.value < 0){
        e.target.value = Math.abs(e.target.value)
      }else if(e.target.value === ''){
        e.target.value = ''
      }
      
    },
    addcoin(){
      this.$emit('addcoin');
      //  this.$router.push('/wallet')
    },
    async countcoin(ep_fish:any, ep_last:any,purchase_confirmation = false) {
      this.isBtn = true
      // let data = [] as any;
      // Arraya.forEach((element: any) => {
      //   data.push(element.id);
      // });
      
      let res = await Gatway.postService(
        "/customers/novel-episode-data-set/buys",
        {
          novel_data_id: this.$route.params.id,
          novel_ep_start: ep_fish,
          novel_ep_end:ep_last,
          purchase_confirmation: purchase_confirmation,
        } as any
      );

      if (purchase_confirmation === true) {
        if (res.data.code === 405) {
          this.$emit('addcoin');
          this.isLoading = false;
          alert(res.data.data, "error");
        }else 
        if (res.data.code === 422) {
          this.isLoading = false;
          alert('รูปแบบผิดลองเช็คดูอีกครั้ง', "error");
        } 
        else {

          this.sum = res.data.data.descriptions[3].detail;
          this.isLoading = false;
          this.$store.commit("reset");
          this.$emit('reface');
          (this as any).$refs.Modeal.close();
          this.obj.ep_last = ""
          this.obj.ep_fish = ""
          
          alert("คุณซื้อนิยาย " +(this as any).$filter.NumberToString(res.data.data.descriptions[3].detail) +" เหรียญ","success");
        }
      }else{
        if(res.data.code === 422){
          alert('รูปแบบผิดลองเช็คดูอีกครั้ง', "error");
          this.isBtn = false
        }

        this.sum = res.data.data.descriptions[0].detail;
        this.promotions = res.data.data.promotions.length !== 0 ?res.data.data.promotions :null
        this.list = res.data.data.descriptions;
        const buysetCrad = await document.getElementById("buysetCrad") as HTMLElement;
          buysetCrad.scrollTo({ top:10000, behavior: 'smooth'});
      }
      this.isBtn = false
    },
    resetpage(){
      this.$emit("resetpage");
      (this as any).$refs.Modeal.close();
    }
  },
  // mounted(){

  // }
});
</script>
<style lang="scss" scoped>
.form-buyset-con {
  display: grid;
  gap: 15px;
  justify-items: center;
}
.as{
  zoom: 0.8;
  margin: 20px 0px;
      max-width: 600px;
}
.form-buyset {
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto auto auto auto;
  gap: 10px;
}
.form-control{
  width: 100px;
}
.token {
  margin-top: 20px;
  // border: 2px solid #ab93f9;
  // background: #ab93f9;
  // color: #fff;
// border: 2px solid #f#fff4d0#fff8e0;
  background: #fff1d2;
  width: 100%;
  display: flex;
    justify-content: space-between;
  align-items: center;
  border-radius: 5px;
       padding: 10px;
  font-size: 18px;
  color: #303030;
  display: flex;
  
    align-items: center;

  // gap: 2px;
}
.icon-coin-stat {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
      // color: #1b1b1b;
}
.discount {
  display: grid;
  gap: 10px;
  width: 100%;
  // border-top: 1px solid #d5d5d5;
  padding-top: 10px;
}
.promoteNovels{
  padding-top: 40px;
  overflow: hidden;
  max-width: 700px;

}
.promotion {
  padding: 15px;
      background: #6a70aa;
      font-family: "Sarabun", sans-serif;
  border-radius: 5px;
  font-size: 15px;
  // border: 1px solid rgb(244, 77, 77);
  color: rgb(255, 255, 255);
}
.listsell {
  padding: 10px;
  background: #fff8e0;
  border-radius: 5px;
  border: 1px solid rgb(255, 205, 5);
  color: #000000;
}
.token {
  // border: 2px solid rgb(128, 25, 245);
  // width: 300px;
}
.listsell-list {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.sum {
  font-size: 20px;
      padding-top: 25px;
}
// .price-promo{
//   display: flex;
//   align-items: center;
// }
@media (max-width: 500px) {
  .form-buyset {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 0.6fr 2fr;
  gap: 10px;
}
.cal-price1{
  display: flex;
  justify-content: end;
  grid-column: 1/span 2;
}
.cal-price2{
  grid-column: 3/span 4;
}
.form-buyset-con {
  display: grid;
  gap: 5px;
  justify-items: center;
}

}
.image-profile-user{
  width: 50px;
  height: 50px;
}
</style>
