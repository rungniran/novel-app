<template>
  <div class="profile-menu">
      <div class="notication">
          ไม่มีการแจ้งเตือน
      </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "notication",
});
</script>
<style lang="scss" >
.notication {
  width: 240px;
  height: 421px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-menu {
  position: absolute;
  top: 32px;
  padding: 0px 5px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  // width: 200px;
  background: #ffffff;
  right: 5px;

  transition: 0.3s;
}
</style>
