<template>
    <div class="footer">
      <!-- @Novel Kingdom 2032 -->
      <div class="footer-menu">
        <div>วิธีลงนิยาย</div>
        <div>เกี่ยวกับเรา</div>
        <div>ติดต่อเรา</div>
        <div>นโยบายความเป็นส่วนตัว</div>
        <div>ข้อตกลงในการใช้งาน</div>
      </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Footer',
});
</script>
<style lang="scss" scoped>
.footer{
   padding: 20px 100px;
   background:#ffffff ;
   position: unset;
}
.footer-menu{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
}
</style>
