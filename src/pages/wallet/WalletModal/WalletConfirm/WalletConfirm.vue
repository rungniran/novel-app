<template>
  <div>
    <div class="nv-box-white nv-mt-40">
      <div class="title-name">ทำรายการสำเร็จ</div>
      <div class="img-dragon">
        <img :src="$path.image('dragonwallet.png')" />
      </div>
      <div class="con-btn">
        <button class="nv-btn-blue" @click="topage()">
          กลับหน้าเติมเหรียญ
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mounted() {
    this.$store.commit("reset");
  },
  methods: {
    topage() {
      this.$store.commit("reset");
      this.$router.push("/wallet");
    },
  },
  beforeDestroy() {
    this.$store.commit("reset");
  },
});
</script>
<style scoped>
.title-name {
  display: flex;
  justify-content: center;
  font-size: 30px;

}
.img-dragon {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-right: 20px;

}
.con-btn {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

}
</style>
