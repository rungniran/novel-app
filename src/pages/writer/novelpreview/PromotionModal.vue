<template>
  <!-- <NovelModal classlist="walllet-modal"  animation="create-novel-show"> -->
  <div>
    <NovelModal2
      ID="PromotionModal"
      IDCrad="PromotionModalCard"
      ref="Modeal"
      :Close="true"
    >
      <template v-slot:body>
        <h1 class="title-promo">จัดการโปรโมชันนิยาย</h1>
        <div v-if="object.length !== 0" class="card">
          <div class="card-detail">
            <p>
              1.1 โปรโมชัน ซื้อครบ 100 ตอนหรือมากกว่า ลดเหลือตอนละ 1.5 เหรียญ
              <span style="color: green">{{ `( กำลังใช้งาน )` }}</span>
            </p>
            <div class="button-layout">
              <button class="nv-btn-blue">ตั้งค่า</button>
              <button class="nv-btn-red">ลบ</button>
            </div>
          </div>
        </div>
        <div v-else class="add-more-promo">
          <button class="nv-btn-orange add-promo" @click="openSelectPromo()">
            เพิ่มโปรโมชันนิยายของคุณ
          </button>
        </div>
      </template>
    </NovelModal2>
    <NovelModal2
      ID="SelectModal"
      IDCrad="SelectModalCard"
      ref="select"
      :Close="true"
    >
      <template v-slot:body>
        <h1 style="text-align: center" class="title-promo">โปรโมชันนิยาย</h1>
        <div class="card">
          <div class="card-detail">
            <p>
              1.1 โปรโมชัน ซื้อครบ 100 ตอนหรือมากกว่า ลดเหลือตอนละ 1.5 เหรียญ
            </p>
            <div class="button-layout">
              <button class="nv-btn-blue" @click="openSettingPromo()">
                เลือก
              </button>
            </div>
          </div>
          <div class="icon-promo">
            <i class="fa fa-angle-down" @click="toggleIsVisible"></i>
          </div>
          <div v-show="isVisible">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
            cumque nesciunt natus distinctio ducimus ipsam tempora consequuntur
            ad in nulla quia, aspernatur ipsum rerum voluptates nostrum facilis
            eos reprehenderit ea?
          </div>
        </div>
      </template>
    </NovelModal2>
    <NovelModal2
      ID="PromotionSettingModal"
      IDCrad="PromotionSettingModalCard"
      ref="setting"
      :Close="true"
    >
      <template v-slot:body>
        <h1 class="title-promo">ตั้งค่าโปรโมชัน</h1>
        <div class="card-setting">
          <div class="card-detail-setting">
            <div>
              <p>
                1.1 โปรโมชัน ซื้อครบ 100 ตอนหรือมากกว่า ลดเหลือตอนละ 1.5 เหรียญ
              </p>
            </div>
            <div class="buy">
              <div>กำหนดตอนเริ่มต้น <input type="text" /></div>
              <div>
                &nbsp;
                <p>ถึง</p>
              </div>
              <div>กำหนดตอนสิ้นสุด <input type="text" /></div>
              <div>เหลือตอนละ (เหรียญ) <input type="text" /></div>
              <div>วันสิ้นสุดโปรโมชัน <input type="date" /></div>
              <div>
                &nbsp;<button class="nv-btn">เพิ่มช่วงโปรโมชันตอนนิยาย</button>
              </div>
            </div>
          </div>
          <table style="width: 100%">
            <tr>
              <th>ตอนเริ่มต้นโปรโมชัน</th>
              <th>ตอนสิ้นสุดโปรโมชัน</th>
              <th>จำนวนเหรียญ</th>
              <th>เริ่มต้น/สิ้นสุด</th>
              <th>จัดการ</th>
            </tr>
            <tr>
              <td>1</td>
              <td>100</td>
              <td>50</td>
              <td>20/06/65 27/06/65</td>
              <td>
                <button>แก้ไข</button>
                <button>ลบ</button>
              </td>
            </tr>
          </table>
          <div>
            ตัวอย่างโปรโมชัน
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur explicabo quam quisquam, suscipit excepturi perferendis
              expedita? Commodi neque voluptates laborum natus, aspernatur modi
              laudantium, architecto numquam suscipit eius, necessitatibus in.
            </p>
          </div>
          <button class="btn-save">บันทึกข้อมูล</button>
        </div>
      </template>
    </NovelModal2>
  </div>
</template>

<script>
import Vue from "vue";
/* eslint-disable no-undef */
export default Vue.extend({
  components: {
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
  },
  data() {
    return {
      object: [],
      isVisible: false,
    };
  },
  methods: {
    open() {
      // console.log("openModal")
      this.$refs.Modeal.open();
    },
    openSelectPromo() {
      this.$refs.select.open();
      this.$refs.Modeal.close();
    },
    openSettingPromo() {
      this.$refs.setting.open();
      this.$refs.Modeal.close();
      this.$refs.select.close();
    },
    toggleIsVisible() {
      this.isVisible = !this.isVisible;
    },
  },
});
</script>
<style lang="scss">
.btn-save{
    display: flex;
    justify-content: center;
    text-align: center;
}

table,
th,
td {
  border: 1px solid black;
}

table{
    margin-top: 20px;
}
.add-more-promo {
  margin-top: 150px;
  display: flex;
  justify-content: center;
}
.buy {
  display: grid;
  gap: 3px;
  grid-template-columns: 1fr 0.2fr 1fr 1fr 1fr 1fr;
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

.card-detail-setting {
  display: grid;
  grid-template-rows: auto;
}

.button-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 10px;
  display: flex;
  align-items: center;
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
  margin-bottom: 10px;
}
.contai-modal-crad {
  height: 450px;
  width: 800px;
  overflow-y: scroll;
}
.contai-modal-crad::-webkit-scrollbar {
  display: none;
}

@media (max-width: 1024px) {
}
@media (max-width: 768px) {
}
@media (max-width: 415px) {
  .add-more-promo {
    display: flex;
    justify-content: center;
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

.search {
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  gap: 20px;
}

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
</style>
