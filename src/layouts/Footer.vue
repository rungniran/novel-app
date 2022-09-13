<template>
    <div class="footer">
      <!-- @Novel Kingdom 2032 -->
      <div class="footer-menu">
       
        <div class="con-menu-footer"> 
          <div class="list-menu cursor">เกี่ยวกับเรา</div>
          <div  class="list-menu line cursor">
            <div @click="page('/contact')">  ติดต่อเรา </div>
          </div>
          <div  class="list-menu line cursor">
            <div @click="page('/privacy')"> นโยบายความเป็นส่วนตัว </div>
          </div>
          <div  class="list-menu line cursor">
            <div  @click="page('/terms-conditions')">  ข้อตกลงในการใช้งาน </div>
          </div>
        </div>
        <!-- <div><i class="fas fa-copyright"></i> novelkingdom 2022 version bata</div> -->
      </div>
      <div class="social">
        <div class="box-social"><a href="https://www.facebook.com/Novelkingdom" target="_blank" class="icon-fb"><i class="fab fa-instagram"></i></a></div>
        <div class="box-social"><a href="https://www.facebook.com/Novelkingdom" target="_blank" class="icon-fb"><i class="fab fa-facebook-f"></i></a></div>
        <!-- <div class="box-social"><i class="fab fa-pinterest-p"></i></div> -->
        <div class="box-social"><a href="https://www.facebook.com/Novelkingdom" target="_blank" class="icon-fb"><i class="fab fa-twitter"></i></a></div>
      </div>
      <!-- <div><i class="fas fa-copyright"></i> novelkingdom 2022 version bata</div> -->
       <div class="name-company"><i class="fas fa-copyright"></i> 2022 Novel Kingdom Version 0.0.2</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Footer',
  methods:{
    page(key){
      this.$router.push(key)
    }
  }
});
</script>
<style lang="scss" scoped>
.footer{
   padding: 20px 50px;
   padding-top: 30px;
   background:#FFFFFF; 
   position: unset;
  //  color: #fff;
   position: unset;
   display: grid;
   gap: 25px;
}
.cursor{
  cursor: pointer;
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
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background: #ec7920;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffff;
}
.icon-fb{
  color: white;
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
