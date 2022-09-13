<template>
  <!-- <NovelModal classlist="walllet-modal"  animation="create-novel-show"> -->
  <div>
    <NovelModal2
      ID="PromotionModal"
      IDCrad="PromotionModalCard"
      ref="Modeal"
      :Close="true"
      width="600px"
    >
      <template v-slot:body>
        <div class="conthianer-pro">
          <div id="page1" class="page">
            <div class="hh">
              <h1 class="title-promo">จัดการโปรโมชันนิยาย</h1>
              <button class="nv-btn-light-blue " @click="page(1)">
                เพิ่มโปรโมชัน
              </button>
            </div>
            <br />
            <div v-if="itempromotion" class="promotion-ch">
              <div
                v-for="(item, index) in itempromotion"
                :key="index"
                class="promotion-c"
              >
              <span>
                 {{
                  novel_promotion_type_fix_data_id[item.novel_promotion_type_fix_data_id].name_preview
                }}
                <span
                  v-if="
                    item.novel_promotion_type_fix_data_id ===
                    promotionfix.epTo
                  "
                >
                  {{ item.ep_start }} ถึงตอนที่
                  {{ item.ep_end }}
                </span>
                <span
                  v-else-if="
                    item.novel_promotion_type_fix_data_id ===
                    promotionfix.over
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
                <span class="del" @click="delpromotion(item,'sd')">
                  ลบ
                </span>
              </div>
             
              <div class="notice">
              <h1>*คำเตือน ขอให้นักเขียนโปรดใช้ความระมัดระวังในการใช้ Feature โปรโมชั่น เนืองจากโปรโมชั่นในแต่ละแบบสามารถทำงานซ้อนทับกันได้ 
              ทางแพลตฟอร์มแนะนำเป็นอย่างยิ่งว่านักเขียน 'ควรศึกษาคู่มือก่อนการใช้งาน' ข้อนี้สำคัญมาก
              หมายเหตุ: หากมีข้อสงสัยใด ๆ สามารถติดต่อสอบถามได้ทาง Page Facebook Novelkingdom*
              </h1>
              </div>

            </div>
            
            <div v-else>ไม่มีโปรโมชั่น</div>
          </div>
          <div id="page2" class="page">
            <!-- {{promotion_type_fix}} -->
            <div class="h">
              <i @click="page(0)" class="fas fa-arrow-left"></i>
              <h1 class="title-promo">โปรโมชันนิยาย</h1>
                <button class="nv-btn-light-blue " style="float: left;" @click="mannual()">
                คู่มือโปรโมชั่น
              </button>
            </div>
              

            <div
              v-for="(item, index) in promotion_type_fix"
              :key="index"
              class="card-select"
            >
              <div class="card-detail">
                <p>
                  {{ item.name_preview }}
                  <!-- {{item.id}} -->
                  <!-- 1.1 โปรโมชัน ซื้อตั้งแต่ตอน XXX ถึงตอนที่ XXX ลดเหลือตอนละ XXX
                เหรียญ -->
                </p>
                <div class="button-layout">
                  <button
                    class="nv-btn-blue"
                    @click="openSettingPromoOne(item)"
                  >
                    เลือก
                  </button>
                </div>
              </div>
            </div>
               <br>
              <div class="notice">
              <h1>*คำเตือน ขอให้นักเขียนโปรดใช้ความระมัดระวังในการใช้ Feature โปรโมชั่น เนืองจากโปรโมชั่นในแต่ละแบบสามารถทำงานซ้อนทับกันได้ 
              ทางแพลตฟอร์มแนะนำเป็นอย่างยิ่งว่านักเขียน 'ควรศึกษาคู่มือก่อนการใช้งาน' ข้อนี้สำคัญมาก
              หมายเหตุ: หากมีข้อสงสัยใด ๆ สามารถติดต่อสอบถามได้ทาง Page Facebook Novelkingdom*
              </h1>
              </div>
          </div>
        </div>
      </template>
    </NovelModal2>
    <NovelModal2
      ID="be084528-696d-40ea-ba35-2fb23e5e28ab"
      IDCrad="be084528-696d-40ea-ba35-2fb23e5e28abModalCard"
      ref="be084528-696d-40ea-ba35-2fb23e5e28ab"
      :Close="true"
    >
      <template v-slot:body>
        <div class="con-protion">
          <h1 class="title-promo">โปรโมชัน ซื้อตั้งแต่ตอนที่ xx ถึงตอนที่ xx </h1>
          <div class="from-col">
            <div>
              ตอนที่
              <input type="text" v-model="objData.ep_start" />
            </div>
            <div>
              ถึงตอนที่
              <input type="text" v-model="objData.ep_end" />
            </div>
            <div>
              <!-- จำนวนที่ลด -->
             {{novel_promotion_type_data_id[objData.novel_promotion_type_data_id].name_preview}}
             <!-- {{novel_promotion_type_data_id[objData.novel_promotion_type_data_id].value}}  -->
              <input type="text" v-model="objData.amount" />
            </div>
            <!-- <div>
              ประเภทที่ลด
              <select
                :disabled="ispromotion_type"
                v-model="objData.novel_promotion_type_data_id"
              >
                <option
                  v-for="(item, index) in promotion_type"
                  :value="item.id"
                  :key="index"
                >
                  {{ item.name_preview }}
                </option>
              </select>
            </div> -->
          </div>
          <table v-if="itempromotion">
            <tr>
              <th>ตอนแรก</th>
              <th>ตอนสุดท้าย</th>
              <th>จำนวน</th>
              <th>ประเภท</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
            <tr
              style="text-align: center"
              v-for="(item, index) in itempromotion"
              :key="index"
            >
              <td>{{ item.ep_start }}</td>
              <td>{{ item.ep_end }}</td>
              <th>{{ item.amount }}</th>
              <td>{{ item.novel_promotion_type_data_preview }}</td>
              <td>{{ item.status }}</td>
              <td>
                <!-- <button>แก้ไข</button> -->
                <button @click="delpromotion(item)">ลบ</button>
              </td>
            </tr>
            <tr v-if="itempromotion.length === 0">
              <td colspan="6">ไม่มีข้อมูล</td>
            </tr>
          </table>
          <div>
            <button class="nv-btn-light-blue" @click="addpromotion()">
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </template>
    </NovelModal2>
    <NovelModal2
      ID="4d0e3f6d-b458-458d-8e31-81c4a9d17836"
      IDCrad="4d0e3f6d-b458-458d-8e31-81c4a9d17836ModalCard"
      ref="4d0e3f6d-b458-458d-8e31-81c4a9d17836"
      :Close="true"
    >
      <template v-slot:body>
        <div class="con-protion">
          <h1 class="title-promo">โปรโมชัน ซื้อนิยายยกชุด xx ตอน</h1>
          <div class="from-col">
            <div>
              จำนวนตอนที่ครบ
              <input type="text" v-model="objData.ep_end" />
            </div>
            <div>
              {{novel_promotion_type_data_id[objData.novel_promotion_type_data_id].name}} 
              {{novel_promotion_type_data_id[objData.novel_promotion_type_data_id].value}} 
              <input type="text" v-model="objData.amount" />
            </div>
            <!-- <div>
              ประเภทที่ลด
              <select
                v-model="objData.novel_promotion_type_data_id"
                :disabled="ispromotion_type"
              >
                <option
                  v-for="(item, index) in promotion_type"
                  :value="item.id"
                  :key="index"
                  selected
                >
                  {{ item.name_preview }}
                </option>
              </select>
            </div> -->
          </div>
          <table style="width: 100%" v-if="itempromotion">
            <tr>
              <th>ซื้อครบ</th>
              <th>จำนวน</th>
              <th>ประเภท</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
            <tr
              style="text-align: center"
              v-for="(item, index) in itempromotion"
              :key="index"
            >
              <td>{{ item.ep_end }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.novel_promotion_type_data_preview }}</td>
              <td>{{ item.status }}</td>
              <td>
                <!-- <button>แก้ไข</button> -->
                <button @click="delpromotion(item)">ลบ</button>
              </td>
            </tr>
            <tr v-if="itempromotion.length === 0">
              <td colspan="5">ไม่มีข้อมูล</td>
            </tr>
          </table>
          <div>
            <button class="nv-btn-light-blue" @click="addpromotion()">
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </template>
    </NovelModal2>
    <NovelModal2
      ID="ff37897a-4c02-4ba2-9849-b79ae51bff5f"
      IDCrad="ff37897a-4c02-4ba2-9849-b79ae51bff5fModalCard"
      ref="ff37897a-4c02-4ba2-9849-b79ae51bff5f"
      :Close="true"
    >
      <template v-slot:body>
        <div class="con-protion">
          <h1 class="title-promo">โปรโมชัน ซื้อครบทุกตอน (ถึงตอนล่าสุดของนิยาย) </h1>
          <div class="from-col">
            <div>
              {{novel_promotion_type_data_id[objData.novel_promotion_type_data_id].name}} 
              {{novel_promotion_type_data_id[objData.novel_promotion_type_data_id].value}} 
              <input type="text" v-model="objData.amount" />
            </div>
            <!-- <div>
              ประเภทที่ลด
              <select :disabled="ispromotion_type"  v-model="objData.novel_promotion_type_data_id">
                <option
                  v-for="(item, index) in promotion_type"
                  :value="item.id"
                  :key="index"
                >
                  {{ item.name_preview }}
                </option>
              </select>
            </div> -->
          </div>
          <table v-if="itempromotion">
            <tr>
              <th>จำนวน</th>
              <th>ประเภท</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
            <tr
              style="text-align: center"
              v-for="(item, index) in itempromotion"
              :key="index"
            >
              <td>{{ item.amount }}</td>
              <td>{{ item.novel_promotion_type_data_preview }}</td>
              <td>{{ item.status }}</td>
              <td>
                <!-- <button>แก้ไข</button> -->
                <button @click="delpromotion(item)">ลบ</button>
              </td>
            </tr>
            <tr v-if="itempromotion.length === 0">
              <td colspan="4">ไม่มีข้อมูล</td>
            </tr>
          </table>
          <div>
            <button class="nv-btn-light-blue" @click="addpromotion()">
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </template>
    </NovelModal2>
  </div>
</template>

<script>
import Vue from "vue";
/* eslint-disable no-undef */
import { Gatway } from "@/shares/services";
import { promotion, promotion_type } from "@/shares/constants/enum";
import { novel_promotion_type_data_id, novel_promotion_type_fix_data_id } from "@/shares/constants/constant";
export default Vue.extend({
  components: {
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
  },
  props: {
    epcount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      object: ["1"],
      promotionfix: promotion,
      ispromotion_type: false,
      promotion_type_fix: null,
      promotion: null,
      promotion_type: null,
      itempromotion: null,
      objData: {
        amount: "",
        ep_end: "",
        ep_start: "",
        novel_data_id: this.$route.params.id,
        novel_promotion_type_data_id: "",
        novel_promotion_type_fix_data_id: "",
      },
      novel_promotion_type_data_id:novel_promotion_type_data_id,
      novel_promotion_type_fix_data_id:novel_promotion_type_fix_data_id,
    };
  },
  methods: {
    open() {
      this.getpomotiom();
      this.page(0)
      this.$refs.Modeal.open();
    },

    mannual() {
      this.$router.push("/howtopromotion")
    },

    async gelmi() {
      let res = await Gatway.getService(
        "/miscellaneous/fetch/novel_promotion_datas/novel_promotion_type_fix_data_id"
      );
      this.promotion_type_fix = res.data.data;
      let promotion_type = await Gatway.getService(
        "/miscellaneous/fetch/novel_promotion_datas/novel_promotion_type_data_id"
      );
      //  console.log(promotion_type.data.data);
      this.promotion_type = promotion_type.data.data;
    },
    async getpomotiom() {
      let res = await Gatway.getIDService(
        "/guest/novel-promotion-data",
        this.$route.params.id
      );
      this.itempromotion = res.data.data;
      this.$emit('reface')
    },
    async getpomotiomfilter(uuid) {
      let res = await Gatway.getIDService(
        "/guest/novel-promotion-data",
        this.$route.params.id
      );
      this.itempromotion = res.data.data.filter((item) => {
        return item.novel_promotion_type_fix_data_id === uuid;
      });
      this.$emit('reface')
      // this.itempromotion = res.data.data
    },
    page(p) {
      if (p === 1) {
        this.gelmi();
      } else if (p === 0) {
        this.getpomotiom();
      }
      let conthianer = document.getElementsByClassName("conthianer-pro")[0];
      conthianer.style.marginLeft = -600 * p + "px";
    },
    async openSettingPromoOne(item) {
      this.reset();
      this.itempromotion = null;
      if (promotion.epTo === item.id) {
        this.ispromotion_type = true;
        this.objData.novel_promotion_type_data_id = promotion_type.reduced;
      } else if (promotion.over === item.id) {
        this.ispromotion_type = true;
        this.objData.ep_start = 1;
        this.objData.novel_promotion_type_data_id = promotion_type.percentage;
      } else if (promotion.buySet === item.id) {
        this.ispromotion_type = true;
        this.objData.novel_promotion_type_data_id = promotion_type.percentage;
        this.objData.ep_start = 1;
        this.objData.ep_end = this.$props.epcount;
      }
      await this.getpomotiomfilter(item.id);
      this.objData.novel_promotion_type_fix_data_id = item.id;

      this.$refs[item.id].open();
    },
    async addpromotion() {
      await Gatway.postService(
        "/customers/novel-promotion",
        this.objData
      );

      this.getpomotiomfilter(this.objData.novel_promotion_type_fix_data_id);
    },
    async delpromotion(item, filters= undefined) {
      await Gatway.DelService(
        "/customers/novel-promotion/" + item.id
      );
      filters === undefined
      ? this.getpomotiomfilter(item.novel_promotion_type_fix_data_id)
      : this.getpomotiom()
    },
    reset() {
      this.objData = {
        amount: "",
        ep_end: "",
        ep_start: "",
        novel_data_id: this.$route.params.id,
        novel_promotion_type_data_id: "",
        novel_promotion_type_fix_data_id: "",
      };
    },
  },
  mounted() {
    // this.gelmi()
  },
});
</script>
<style lang="scss" scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.del{
  // color: red;
  // color: #000;
  cursor: pointer;
  padding: 1px 5px;
  background: #db6060;
  border-radius: 5px;
  font-size: 14px;
}
.con-protion {
  display: grid;
  gap: 20px;
}
.PromotionModal {
  width: 600px;
}
.page {
  width: 600px;
  padding: 20px;
}
.detail-promo {
  margin: 20px 0px;
}
.conthianer-pro {
  transition: 0.3s;
  // overflow: hidden;
  width: 600px;
  //  padding: 20px;
  display: grid;
  grid-template-columns: 600px 600px;
  width: 600px;
}
.from-col {
  display: flex;
  gap: 10px;
}
.btn-add-promo {
  margin-bottom: 5px;
  display: flex;
  justify-content: end;
}
.promotion-ch{
  display: grid;
  gap: 10px;
}
.btn-save {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.red-color {
  color: red;
}
.btn-promo {
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
}

.add-more-promo {
  margin-top: 150px;
  display: flex;
  justify-content: center;
}
.buy1 {
  display: grid;
  gap: 3px;
  grid-template-columns: auto auto auto;
  align-items: center;
}
.buy2 {
  display: grid;
  gap: 3px;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  align-items: center;
}
.buy3 {
  display: grid;
  gap: 3px;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  align-items: center;
}
.buy4 {
  display: grid;
  gap: 3px;
  grid-template-columns: 1fr 1fr 2fr;
  align-items: center;
}

.icon-promo {
  display: flex;
  justify-content: end;
  cursor: pointer;
}

.card-detail {
  display: grid;
  grid-template-columns: auto auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-detail-select .button-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 10px;
  display: flex;
  align-items: center;
}
.promotion-c{
      padding: 20px;
    background: #6a70aa;
    font-family: "Sarabun", sans-serif;
    border-radius: 5px;
    font-size: 15px;
    color: white;
    display: flex;
    justify-content: space-between;
}
.card-select {
  border-radius: 7px;
  // border: 2px solid #ab93f9;
  padding: 15px;
  color: #ffffff;
  background: #6a70aa;
  margin-bottom: 5px;
}

.card {
  border-radius: 12px;
  border: 1px solid red;
  padding: 10px;
  margin-bottom: 10px;
}

.title-promo {
  text-align: center;
  font-size: 20px;
}
.contai-modal-crad {
  // height: 550px !important;
  // width: 1150px !important;
  overflow-y: scroll;
}
.contai-modal-crad::-webkit-scrollbar {
  display: none;
}

@media (max-width: 1024px) {
}
@media (max-width: 630px) {
    .PromotionModal {
  width: 500px;
}
.page {
  width: 500px;
  padding: 20px;
}
}
@media (max-width: 500px) {
    .PromotionModal {
  width: 430px;
}
.page {
  width: 430px;
  padding: 20px;
}
}
@media (max-width: 415px) {
  // .card-detail {
  //   display: grid;
  //   grid-template-columns: 1fr;
  //   justify-content: space-between;
  //   align-items: center;
  // }
  .PromotionModal {
  width: 410px;
}
.page {
  width: 410px;
  padding: 20px;
}
  .button-layout {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  .mobile {
    display: none;
  }
  .add-more-promo {
    display: flex;
    justify-content: center;
  }
  .buy4 {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr;
    align-items: center;
    text-align: center;
  }
  .btn-addpromo {
    display: flex;
    justify-content: center;
  }
  .buy1 {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr;
    align-items: center;
    text-align: center;
  }
  .buy2 {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr;
    align-items: center;
    text-align: center;
  }
  .buy3 {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr;
    align-items: center;
    text-align: center;
  }
}

.layout-main {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
  background-color: #f5ecfd;
  padding: 20px;
  border-radius: 10px;
}
.option-select {
  padding: 10px 10px 30px 10px;
  background-color: white;
  height: fit-content;
  border-radius: 10px;
}

.detail-novel {
  display: grid;
  grid-auto-rows: 0.3fr auto;
}

// .search {
//   display: grid;
//   grid-template-columns: 3.5fr 1fr;
//   gap: 20px;
// }

.layout-img {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
  gap: 10px;
}

.content-inside {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  justify-content: center;
  height: fit-content;
}

.space {
  margin-bottom: 10px;
}

.nv-btn-yellow {
  width: fit-content;
  font-size: 16px;
}
.h {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}
.hh {
  display: flex;
  justify-content: space-between;
}
.notice {
  width: 100%;
  background: #f8e0d7;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px;
  color: #db6060;
  border: 1px solid #db6060;
}
@media (max-width: 390px) {

  .PromotionModal {
  width: 375px;
}
.page {
  width: 375px;
  padding: 20px;
}
}
</style>
