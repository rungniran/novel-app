<template>
  <NovelModal2 ID="buyset" ref="Modeal">
    <template v-slot:body>
      <div class="form-buyset-con">
        <div class="form-buyset mobeil">
          <span class="ep-title" data-v-730bc3b2="">ตอนที่</span>
          <div>
            <input type="number" class="form-control" id="epStart" />
          </div>
          <span class="ep-title-to">ถึง</span>
          <div>
            <input type="number" class="form-control" id="epEnd" />
          </div>
        </div>
        <div>
          <button class="nv-btn-yellow">คำนวณราคา</button>
        </div>
        <!-- <div>ราคา 187.11 เหรียญ</div> -->
        <!-- <div class="discount">
          <p>ซื้อยกเซต 100 ตอน ลด 1%</p>
          <p>ซื้อยกเซต 500 ตอน ลด 2%</p>
        </div> -->
        <div class="token">
          <div> เหรียญที่มีทั้งหมด </div>
          <div class="icon-coin-stat">
             <img :src="$path.image('coin-gold.png')" width="40%" >
          </div>
         <span>  0.00</span>
        </div>
      </div>
    </template>
  </NovelModal2>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "buyset",
  components: {
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
  },
  methods: {
    open() {
      (this as any).$refs.Modeal.open();
    },
  },
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
</style>