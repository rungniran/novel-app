<template>
    <div class="footer">
      <!-- @Novel Kingdom 2032 -->
      <div class="footer-menu">
       
        <div class="con-menu-footer"> 
          <div class="list-menu">เกี่ยวกับเรา</div>
          <div  class="list-menu line">
            <router-link to="/contact">  ติดต่อเรา </router-link>
          </div>
          <div  class="list-menu line">
            <router-link to="/privacy"> นโยบายความเป็นส่วนตัว </router-link>
          </div>
          <div  class="list-menu line">
            <router-link to="/terms-conditions">  ข้อตกลงในการใช้งาน </router-link>
          </div>
        </div>
        <!-- <div><i class="fas fa-copyright"></i> novelkingdom 2022 version bata</div> -->
      </div>
      <div class="social">
        <div class="box-social"><i class="fab fa-instagram"></i></div>
        <div class="box-social"><i class="fab fa-facebook-f"></i></div>
        <div class="box-social"><i class="fab fa-pinterest-p"></i></div>
        <div class="box-social"><i class="fab fa-twitter"></i></div>
      </div>
      <!-- <div><i class="fas fa-copyright"></i> novelkingdom 2022 version bata</div> -->
       <div class="name-company"><i class="fas fa-copyright"></i> novelkingdom 2022 version bata</div>
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
   padding: 20px 50px;
   padding-top: 30px;
   background:#efefef; 
   position: unset;
  //  color: #fff;
   position: unset;
   display: grid;
   gap: 25px;
}
.line{
  border-left: 2px solid #ffb527;
}
.con-menu-footer{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  justify-items: center;
}
.list-menu{
  width: 100%;
  text-align: center;
}
.social{
  margin: auto;
  display: flex;
  gap: 10px;
}
.box-social{
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #ec7920;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffff;
}
.name-company{
  text-align: center;
}
@media (max-width: 1024px) {

}
@media (max-width: 768px) {

}
@media (max-width: 415px) {
.footer{
   padding: 20px 10px;

}
.line{
  border-left: 0px solid #ffb527;
}
.con-menu-footer{
  display: grid;
  grid-template-columns: 1fr 1fr ;
  gap: 15px;
}

}
</style>
