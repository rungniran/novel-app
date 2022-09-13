<template>
  <div class="con-t">
    <div class="con-reswtpassword">
      <h1>รีเซ็ตรหัสผ่านของคุณ</h1><br>
      <div class="from">
        <div class="contor-input">
            <div class="from-title" >อีเมลของคุณ</div>
            <input placeholder="อีเมลของคุณ" v-model="email"/>
        </div>

        <button class="nv-btn-blue btn" @click="submit()">ส่งไปทางอีเมล</button>
        <div class="contor-input  susscess">
          <!-- ส่งอีเมลไปที่ {{email}} เรียบร้อย -->
          {{smserr}}
        </div>
      </div>
     </div>
  </div> 
</template>
<script lang="ts">
import Vue from 'vue'
import { Auth, Gatway } from "@/shares/services";
export default Vue.extend({
  data(){
    return{
      email:'',
      smserr:''
    }
  },
  methods:{
    async  submit(){
       let res = await Gatway.postService('/password/reset', {
        email:this.email,
       } as any )
       console.log(res.data.data);
       
       let reset = document.getElementsByClassName('susscess')[0] as any
       console.log(reset);
       if(res.data.data !== 'email not found'){
        this.smserr = `ส่งอีเมลไปที่ ${this.email} เรียบร้อย `
       }else{
        this.smserr = res.data.data
       }
       
      //  this.smserr = 
       reset.classList.add('susscess-show')
       
    }
  }
})
</script>
<style lang="scss" scoped>
.con-reswtpassword{
  width: 400px;
  padding: 20px;
  background: rgb(255, 255, 255);
  border-radius: 10px;
      // margin: auto;
}
.con-t{
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  top: 0px;
  position: fixed;
  // z-index: 3000;
  background: rgb(220, 199, 233);
  display: flex;

}
.susscess{
  color: #779d34;
  display: none;
}
.susscess-show{
  display: flex;
}
</style>