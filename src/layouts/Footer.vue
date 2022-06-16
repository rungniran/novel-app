<template>
    <div class="footer">
      <!-- @Novel Kingdom 2032 -->
      <div class="footer-menu">
       <div><i class="fas fa-copyright"></i> novelkingdom 2022 version bata</div>
       <div> </div>
        <!-- <div>วิธีลงนิยาย</div>
        <div>เกี่ยวกับเรา</div>
        <div>ติดต่อเรา</div>
        <div>นโยบายความเป็นส่วนตัว</div>
        <div>ข้อตกลงในการใช้งาน</div> -->
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
   background:#54279d ;
   position: unset;
   color: #fff;
   position: unset;
}
.footer-menu{
  display: grid;
  justify-items: center;
}
@media (max-width: 1024px) {

}
@media (max-width: 768px) {

}
@media (max-width: 415px) {
.footer{
   padding: 20px 10px;
   background:#54279d ;
   position: unset;
   color: #fff;
   position: unset;
}
}
</style>
