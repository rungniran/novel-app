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
            />
          </div>
          <span class="ep-title-to">ถึง</span>
          <div>
            <input
              type="number"
              class="form-control"
              id="epEnd"
              v-model="obj.ep_last"
            />
          </div>
          <div>
            <button class="nv-btn-blue" @click="buyAll()">ซื้อยกเซต</button>
          </div>
          <div>
            <button class="nv-btn-yellow" @click="buyset()">คำนวณราคา</button>
          </div>
        </div>
        <!-- <div>
          <button class="nv-btn-yellow">คำนวณราคา</button>
        </div> -->
        <div v-if="sum" class="sum">
          ราคา {{ sum.toFixed(2) }} เหรียญ
        </div>
        <div class="token">
          <div>เหรียญที่มีทั้งหมด</div>
          <div class="icon-coin-stat">
            <img :src="$path.image('coin-gold.png')" width="40%" />
          </div>
          {{ $filter.NumberToString($store.state.auth.dataset.coin_balance_sandbox) }}
          <!-- {{this.$store.state.auth.dataset.coin_balance_sandbox}} -->
          <!-- <span> {{
          $filter.NumberToString(
            this.$store.state.auth.dataset.coin_balance_sandbox
          )
        }}</span> -->
        </div>
        <!-- <div class="discount">คูปอง</div> -->
        <div class="discount" v-if="itempromotion">
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
        </div>
        <div class="discount" v-if="list">
          รายละเอียดการซื้อ
          <div class="listsell">
            <span v-if="promotions">
              <div class="listsell-list">
                 <p>ยอดรวม</p>
                <p>{{promotions[0].coin_total}}</p>
              </div>
              <div v-for="(item, index) in promotions" :key="index" class="listsell-list">
                
                <p>{{item.promotion_name}}</p>
                <p class="price-promo">{{item.coin_discount}}</p>
              </div>
            </span>
            <div
              class="listsell-list"
          
            >
              <p>{{ list[2].title }}</p>
              <p>{{ list[2].detail.toFixed(2) }}</p>
            </div>
          </div>
          <button class="nv-btn-orange" @click="buyConfirm()">
            <div v-if="isLoading === true">
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
            </div>

            <div v-else>ยืนยันการซื้อ</div>
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
      promotion:promotion
    };
  },
  components: {
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
  },
  methods: {
    open(item = {} as any) {
      // console.log(item.item);
      this.item = item.item;
      this.getpomotiom();
      (this as any).$refs.Modeal.open();
    },
    async getpomotiom(){
      let res = await  Gatway.getIDService('/guest/novel-promotion-data', this.$route.params.id)
      this.itempromotion = res.data.data
    },
    async buyset() {
      const Arraya = this.item.slice(this.obj.ep_fish - 1, this.obj.ep_last);
      this.countcoin(Arraya);
    },
    async buyAll() {
      this.obj.ep_fish = 1;
      this.obj.ep_last = await this.item.length;
      const Arraya = this.item.slice(this.obj.ep_fish - 1, this.obj.ep_last);
      this.countcoin(Arraya);
    },
    buyConfirm() {
      const Arraya = this.item.slice(this.obj.ep_fish - 1, this.obj.ep_last);
      this.isLoading = true;
      this.countcoin(Arraya, true);
    },

    async countcoin(Arraya: any, purchase_confirmation = false) {
      let data = [] as any;
      Arraya.forEach((element: any) => {
        data.push(element.id);
      });
      let res = await Gatway.postService(
        "/customers/novel-episode-data-set/buys",
        {
          novel_data_id: this.$route.params.id,
          novel_episode_data_ids: data,
          purchase_confirmation: purchase_confirmation,
        } as any
      );

      // this.sum = res.data.data.descriptions[0].detail;
      if (purchase_confirmation === true) {
        if (res.data.code === 405) {
          this.isLoading = false;
          alert(res.data.data, "error");
        }else if (res.data.code === 422) {
          this.isLoading = false;
          alert('รูปแบบผิดลองเช็คดูอีกครั้ง', "error");
        } 
        else {
          this.sum = res.data.data.descriptions[0].detail;
          this.isLoading = false;
          this.$store.commit("reset");
          this.$emit('reface');
          (this as any).$refs.Modeal.close();
          alert("คุณซื้อนิยาย " +(this as any).$filter.NumberToString(res.data.data[0].detail) +" เหรียญ","success");
        }
      }else{
        this.sum = res.data.data.descriptions[0].detail;
        this.promotions = res.data.data.promotions.length !== 0 ?res.data.data.promotions :null
        this.list = res.data.data.descriptions;
      }
    },
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
.discount {
  display: grid;
  gap: 10px;
  width: 100%;
  border-top: 1px solid #d5d5d5;
  padding-top: 10px;
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
  border: 2px solid rgb(128, 25, 245);
  width: 300px;
}
.listsell-list {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.sum {
  font-size: 20px;
}
// .price-promo{
//   display: flex;
//   align-items: center;
// }
@media (max-width: 500px) {
  .form-buyset {
    display: grid;
    align-items: center;
    width: 100%;
    gap: 10px;
  }
}
</style>
