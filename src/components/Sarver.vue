<template>
  <div class="Sarver">
    <div class="closelink">{{link}}</div>
    <div class="con-thia">
      
      <div @click="close()" class="close">
        <i class="fas fa-angle-left"></i>
      </div>
      <div :class="link === item.link ? 'box activate' :'box'" v-for="item, indax in server" :key="indax" @click="change(item)"> 
        <!-- <h3> {{item.title}}</h3> -->
        <div > {{item}} </div>
        <div v-if="link === item" class="africa"> เปิดใช้งานอยู่</div>
        <div v-else class="unlink"><i class="fas fa-unlink"></i> ปิดใช้งานอยู่</div>
      </div>
      <!-- <div class="box"> 
        <h3> server เทส </h3>
        <div @click="change('https://119.59.97.111/api/')">https://119.59.97.111/api/</div>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Api } from "@/shares/constants"
export default Vue.extend({
	name:"Sarver",
  data(){
    return{
      link: localStorage.getItem('server'),
      server:Api
    }
  },
  methods:{
    change(link){
      localStorage.setItem('server',link)
      window.location.reload()
    },
    close(){
      let contha = document.getElementsByClassName('con-thia')[0] as HTMLElement
      contha.classList.toggle('con-thia-show')

    }
  }

})
</script>
<style lang="scss" scoped>
.con-thia{
  position: fixed;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 7000;
  width: 300px;
  margin-right: -300px;
  transition: 0.3s;
  height: 100vh;
  background: #ffffff;
  right: 0;
  display: flex;
  padding: 10px;
  flex-direction: column;
  gap: 10px;
}
.con-thia-show{
  margin-right: 0px;
}
.closelink{
  z-index: 4000;
  position: fixed;
  left: 0;
  padding: 5px;
  bottom: 0px;
  color: #ffffff;
   background: #c28bfb;
   border-radius: 0px 5px 0 0px;
}
.box{
  padding: 10px;
 box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
  border-radius: 5px;
  cursor: pointer;
}
.close{
  cursor: pointer;
// padding:  10px;
//  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
position: absolute;
left: -9.1%;
text-align: right;
background: #c1c1c1;
border-radius: 5px 0 0 5px;
top: 0px;
padding: 10px;
// background: #ffffff;
}
.africa{
  color: rgb(80, 142, 44);
  font-size: 12px;
}
.unlink{
  color: #ca4a36;
  font-size: 12px;
}
.activate{
  background: #d2d2d2;
}
@media (max-width: 415px) {
  .model-emoji {
    height: 350px;
  width: 300px;

  }
  .text-review {
    font-size: 17px;

    margin-left: 0px;
  }
  .con-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: 20px;
    justify-items: center;
  }
  .con-stiker {
    width: 90%;
    padding: 0px;
  }
  .con-item {
    margin: 20px 0px;
  }
  .title {
    width: 100px;
  }
  .stiker-img {
    height: 80px;
    width: 80px;
  }
}
</style>