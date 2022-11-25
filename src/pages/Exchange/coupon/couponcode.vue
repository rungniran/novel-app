<template>
  <NovelModal2 ID="coupon" IDCrad="couponCrad" ref="Modeal" :Close="true">
    <template v-slot:body>
      <div class="">
        <h1 style="font-size: 25px; text-align: center" class="center-text">
          เติมคูปอง
        </h1>
        <div class="text-center nv-mt-10">
          <p class="">
            <span class="color-warning">*</span>
            รหัสคูปองแต่ละรหัสสามารถใช้ได้เพียงครั้งเดียวต่อบัญชี
          </p>
        </div>
        <div class="text-center">
          <p class="">
            <span class="color-warning">*</span>
            รหัสคูปองแต่ละรหัสใช้แล้วไม่สามารถใช้ซ้ำได้
          </p>
        </div>
        <label for="coupon" class="nv-mt-20">รหัสคูปอง</label>
        <div class="flex-content input-btn nv-mt-10">
          <input type="text" placeholder="ใส่รหัสคูปองตรงนี้" v-model="code.voucher_code"/>
          <div class="btn-submit">
            <button class="nv-btn-yellow" @click="submit()">ยืนยัน</button>
          </div>
        </div>
      </div>
    </template>
  </NovelModal2>
</template>
<script lang="ts">
import { alert } from "@/shares/modules/alert";
import { Gatway } from "@/shares/services";

import Vue from "vue";
export default Vue.extend({
  name: "coupon",
  data() {
    return {
      code:{
        voucher_code:'' as any,
      }
     
    };
  },
  components: {
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
  },
  methods: {
    open(item = {} as any) {
      console.log(item.item);
      (this as any).$refs.Modeal.open();
    },

    resetpage() {
      (this as any).$refs.Modeal.close();
    },
    async submit() {
      const res = await Gatway.postService("/customers/input-voucher", this.code as any);
      console.log(res.data.data);
      if(res.data.code === 200){
        alert("เติมคูปองโค้ดสำเร็จ", "success");
        this.resetpage();
      }
    },
  },
  // mounted(){

  // }
});
</script>
<style lang="scss" scoped>
.color-warning {
  color: red;
}
.btn-submit {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
@media (max-width: 500px) {
}
</style>
