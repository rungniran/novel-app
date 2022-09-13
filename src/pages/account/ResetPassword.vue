<template>
  <div class="con-t">
    <div class="con-reswtpassword">
      <h1>ตั้งรหัสผ่านใหม่</h1><br>
      <div class="from">
        <div class="contor-input">
            <div class="from-title" >รหัสผ่านใหม่ รหัสผ่านต้องมากกว่า 8 ตัว</div>
            <input type="password" v-model="dataOJBpassword.password" @keyup="isRTL"/>
        </div>
        <div class="contor-input">
            <div class="from-title">ยืนยันรหัสผ่าน</div>
            <input  type="password" v-model="dataOJBpassword.password_confirmation"/>
        </div>
        <button class="nv-btn-blue btn" @click="submit()">ตกลง</button>
        <div class="contor-input">
          {{smserr}}
        </div>
        
        
      </div>
     </div>
  </div> 
</template>
<script lang="ts">
import Vue from 'vue'
import { Gatway } from "@/shares/services";
export default Vue.extend({
  data(){
    return{
      dataOJBpassword:{
        password:'',
        password_confirmation:'',
        email:this.$route.query.email,
         token:this.$route.query.token
      },
      smserr:''
    }
  },
  methods:{
    async  submit(){
      console.log(this.$route.query.email);
      
      if(this.dataOJBpassword.password.length >= 8){
        if(this.dataOJBpassword.password === this.dataOJBpassword.password_confirmation){
          let res = await Gatway.postService('/password/confirm-resetpassword ', this.dataOJBpassword as any )
          if(res.data.code === 200){
            this.$router.push('/')
          }
        }else{
          this.smserr = 'รหัสผ่านไม่ตรงกัน'
        }
      
      }else{
        this.smserr = 'รหัสผ่านต้องมากกว่า 8 ตัว'
      }
       
    },
    isRTL(s:any){           
      if (/^[\u0E00-\u0E7F]+$/.test(s.target.value)) {
        s.target.value = s.target.value.substr(0, s.target.length - 1);
        this.smserr = 'ขออภัย รหัสผ่านไม่สามารถตั้งภาษาไทยได้'
      }else if (/^[a-zA-Z0-9]+$/.test(s.target.value)) {
        this.smserr = 'รูปแบบถูกต้อง'
      }else{
        s.target.value = s.target.value.substr(0, s.target.length - 1);
        this.smserr = 'ขออภัย รหัสผ่านไม่สามารถตั้งภาษาไทยได้'
      }
      
    }
  }
})
</script>
<style lang="scss" scoped>
.con-reswtpassword{
  width: 400px;
  padding: 20px;
  background: #fff;
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
  z-index: 3000;
  background: rgb(220, 199, 233);
  display: flex;

}
</style>