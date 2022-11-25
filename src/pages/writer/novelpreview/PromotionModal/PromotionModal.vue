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
              <button class="nv-btn-light-blue" @click="page(1)">
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
                    novel_promotion_type_fix_data_id[
                      item.novel_promotion_type_fix_data_id
                    ].name_preview
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
                    novel_promotion_type_data_id[
                      item.novel_promotion_type_data_id
                    ].name_preview
                  }}
                  {{ item.amount }}
                  {{
                    novel_promotion_type_data_id[
                      item.novel_promotion_type_data_id
                    ].value
                  }}
                </span>
                <span class="del" @click="delpromotion(item, index)"> ลบ </span>
              </div>

              <div class="notice">
                <h1>
                  *คำเตือน ขอให้นักเขียนโปรดใช้ความระมัดระวังในการใช้ Feature
                  โปรโมชั่น เนืองจากโปรโมชั่นในแต่ละแบบสามารถทำงานซ้อนทับกันได้
                  ทางแพลตฟอร์มแนะนำเป็นอย่างยิ่งว่านักเขียน
                  'ควรศึกษาคู่มือก่อนการใช้งาน' ข้อนี้สำคัญมาก หมายเหตุ:
                  หากมีข้อสงสัยใด ๆ สามารถติดต่อสอบถามได้ทาง Page Facebook
                  Novelkingdom*
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
              <button
                class="nv-btn-light-blue"
                style="float: left"
                @click="mannual()"
              >
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
            <br />
            <div class="notice">
              <h1>
                *คำเตือน ขอให้นักเขียนโปรดใช้ความระมัดระวังในการใช้ Feature
                โปรโมชั่น เนืองจากโปรโมชั่นในแต่ละแบบสามารถทำงานซ้อนทับกันได้
                ทางแพลตฟอร์มแนะนำเป็นอย่างยิ่งว่านักเขียน
                'ควรศึกษาคู่มือก่อนการใช้งาน' ข้อนี้สำคัญมาก หมายเหตุ:
                หากมีข้อสงสัยใด ๆ สามารถติดต่อสอบถามได้ทาง Page Facebook
                Novelkingdom*
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
          <h1 class="title-promo">
            โปรโมชัน ซื้อตั้งแต่ตอนที่ xx ถึงตอนที่ xx
          </h1>
          <div class="from-col">
            <div>
              ตอนที่
              <input type="number" @keyup="filter" v-model="objData.ep_start" />
            </div>
            <div>
              ถึงตอนที่
              <input type="number" @keyup="filter"  @input="updateValue" v-model="objData.ep_end" />
            </div>
            <div>
              <!-- จำนวนที่ลด -->
              {{
                novel_promotion_type_data_id[
                  objData.novel_promotion_type_data_id
                ].name_preview
              }}
              <!-- {{novel_promotion_type_data_id[objData.novel_promotion_type_data_id].value}}  -->
              <input type="number" @keyup="filter" v-model="objData.amount" />
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
              <th>ราคา</th>
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
                <button @click="delpromotion(item, index)">ลบ</button>
              </td>
            </tr>
            <tr v-if="itempromotion.length === 0">
              <td colspan="6">ไม่มีข้อมูล</td>
            </tr>
          </table>
          <div>
            <button
              class="nv-btn-light-blue"
              @click="addpromotion()"
              :disabled="isAddpromotion"
            >
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
              <input type="number" @keyup="filter" v-model="objData.ep_end" />
            </div>
            <div>
              {{
                novel_promotion_type_data_id[
                  objData.novel_promotion_type_data_id
                ].name
              }}
              {{
                novel_promotion_type_data_id[
                  objData.novel_promotion_type_data_id
                ].value
              }}
              <input type="number" @keyup="filter" v-model="objData.amount" />
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
              <th>ส่วนลด (%)</th>
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
                <button @click="delpromotion(item, index)">ลบ</button>
              </td>
            </tr>
            <tr v-if="itempromotion.length === 0">
              <td colspan="5">ไม่มีข้อมูล</td>
            </tr>
          </table>
          <div>
            <button
              class="nv-btn-light-blue"
              @click="addpromotion()"
              :disabled="isAddpromotion"
            >
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
          <h1 class="title-promo">
            โปรโมชัน ซื้อครบทุกตอน (ถึงตอนล่าสุดของนิยาย)
          </h1>
          <div class="from-col">
            <div>
              {{
                novel_promotion_type_data_id[
                  objData.novel_promotion_type_data_id
                ].name
              }}
              {{
                novel_promotion_type_data_id[
                  objData.novel_promotion_type_data_id
                ].value
              }}
              <input type="number" @keyup="filter" v-model="objData.amount" />
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
              <th>ส่วนลด (%)</th>
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
                <button @click="delpromotion(item, index)">ลบ</button>
              </td>
            </tr>
            <tr v-if="itempromotion.length === 0">
              <td colspan="4">ไม่มีข้อมูล</td>
            </tr>
          </table>
          <div>
            <button
              class="nv-btn-light-blue"
              @click="addpromotion()"
              :disabled="isAddpromotion"
            >
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
import {
  novel_promotion_type_data_id,
  novel_promotion_type_fix_data_id,
} from "@/shares/constants/constant";
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
      isAddpromotion: false,
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
      novel_promotion_type_data_id: novel_promotion_type_data_id,
      novel_promotion_type_fix_data_id: novel_promotion_type_fix_data_id,
    };
  },
  methods: {
    open() {
      this.getpomotiom();
      this.page(0);
      this.$refs.Modeal.open();
    },

    mannual() {
      this.$router.push("/howtopromotion");
    },
    filter(e) {
      // console.log(e.target.value);
      if (e.target.value < 0) {
        e.target.value = Math.abs(e.target.value);
      } else if (e.target.value === "") {
        e.target.value = "";
      }
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
      this.$emit("reface");
    },
    async getpomotiomfilter(uuid) {
      let res = await Gatway.getIDService(
        "/guest/novel-promotion-data",
        this.$route.params.id
      );

      this.itempromotion = res.data.data.filter((item) => {
        // console.log(uuid);
        return item.novel_promotion_type_fix_data_id === uuid;
      });

      this.$emit("reface");
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
      if(
        promotion.epTo === this.objData.novel_promotion_type_fix_data_id ||
        promotion.over === this.objData.novel_promotion_type_fix_data_id 
      )
      {
        if( parseInt(this.objData.ep_end) > this.$props.epcount){
          this.objData.ep_end = this.$props.epcount;
        }
      }
      if( parseInt(this.objData.ep_start) > parseInt(this.objData.ep_end) ){
         window.alert("รูปแบบไม่ถูกต้องค่าซ้ำ");
      }else if(promotion.epTo === this.objData.novel_promotion_type_fix_data_id){
        const clekeBoolean = [] 
        this.itempromotion.filter(element =>{
          clekeBoolean.push(
            element.ep_start >= this.objData.ep_start && element.ep_start <= this.objData.ep_end ||
            element.ep_end >= this.objData.ep_start && element.ep_end <= this.objData.ep_end
          )
        })
        ! clekeBoolean.includes(true)
        ? this.AddServicepromotion()
        : window.alert('พบช่วงตอนที่ซ้ำกับโปรโมชั่นก่อนหน้า')
      }
      else{    
        this.AddServicepromotion()
      }
    },


    async AddServicepromotion(){
      this.isAddpromotion = true;
        let res = await Gatway.postService(
          "/customers/novel-promotion",
          this.objData
        );
        if (res.data.code === 405) {
          window.alert("ค่าซ้ำ");
          this.isAddpromotion = false;
        } else {
          this.isAddpromotion = false;
          this.getpomotiomfilter(this.objData.novel_promotion_type_fix_data_id);
        }
    },

    async delpromotion(item, filters = undefined) {

      let res = await Gatway.DelService(
        "/customers/novel-promotion/" + item.id
      );
    //   const index = this.itempromotion.findIndex((object) => {
    //     return object.id === item.id;
    // });

    // console.log(index);
      if (res.data.code === 200) {
        await this.itempromotion.splice(filters, 1);
        this.$emit("reface");
      }
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
     updateValue(event) {
      const value = event.target._value
      if(value > this.$props.epcount){
        this.objData.ep_end  = this.$props.epcount
      }
      // if (String(value).length <= 10) {
      //   '10' = value
      // }
      this.$forceUpdate()
    }
  },
  mounted() {
    // this.gelmi()
  },
});
</script>
<style lang="scss" src="./PromotionModal.scss" scoped>
</style>
