<template>
  <div class="userinfo">
    <div class="from">
      <div class="contor-input">
        <div class="from-title" >ชื่อที่แสดงระบบ</div>
        <input  v-model="Obj.user_nickname"/>
      </div> 
      <div class="con-from">
        <div class="contor-input">
          <div class="from-title">ชื่อ</div>
          <input v-model="Obj.first_name" />
        </div>
        <div class="contor-input">
          <div class="from-title">นามสกุล</div>
          <input  v-model="Obj.last_name"/>
        </div>
      </div>
      <!-- <div class="contor-input">
        <div class="from-title">ชื่อผู้ใช้</div>
        <input :value="profile.username"/>
      </div>-->
      <!-- <div class="con-save">
        <div class="nv-btn-light-blue btn" @click="submit()">บันทึกข้อมูลส่วนตัว</div>
      </div> -->
    </div>
    <div class="from nv-mt-30">
        <div class="contor-input">
        <div class="from-title">ชื่อผู้ใช้ <small class="requre">คุณสามารถเปลี่ยนชื่อผู้ใช้ได้ 1 ครั้ง</small></div>
        <input v-model="ObjUsername.username"/>
        
      </div>
      <div class="contor-input">
        <div class="from-title" >อีเมล์</div>
        <input  :value="profile.email" disabled/>
      </div>
       <div class="con-save">
        <div class="nv-btn-light-blue btn" @click="ChangeUsername()">บันทึกข้อมูลผู้ใช้</div>
      </div>
    </div>
    <div class="from nv-mt-30">
      <div class="contor-input">
        <div class="from-title">รหัสผ่าน</div>
        <input type="password" v-model="ObjPassword.password" placeholder="********"/>
      </div>
      <div class="contor-input">
        <div class="from-title">ยืนยันรหัสผ่าน</div>
        <input type="password"  v-model="ObjPassword.Confirmpassword" placeholder="********"/>
      </div>
      <div class="con-save">
        <div class="nv-btn-light-blue btn" @click="ChangePassword()">เปลี่ยนรหัสผ่าน</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import { alert } from "@/shares/modules/alert";
import { sms_alert_Change_Password, sms_alert_Update_UserInformation } from "@/shares/constants/smsalert"
export default Vue.extend({
  name: "userinfo",
  data(){
    return{
      Obj:{
        first_name: this.$store.state.auth.dataset.user_profile_datas[0].first_name,
        id:this.$store.state.auth.dataset.user_profile_datas[0].id,
        last_name:this.$store.state.auth.dataset.user_profile_datas[0].last_name,
        user_id:this.$store.state.auth.dataset.id,
        user_nickname: this.$store.state.auth.dataset.user_profile_datas[0].user_nickname ? this.$store.state.auth.dataset.user_profile_datas[0].user_nickname : this.$store.state.auth.display_name,
        user_profile_data_type_id:'a406c04d-3f50-4ea8-986e-315452753638'
      }, 
      ObjPassword:{
        password:'',
        Confirmpassword:'',
      },
      ObjUsername:{
        id:this.$store.state.auth.dataset.id,
        username:this.$store.state.auth.dataset.username,
        status_change_username:false
      }
    }
  },
  methods:{
    async submit(){
      console.log(this.Obj);
      let res = await Gatway.PutService('/customers/profile-data', (this as any).profile.user_profile_datas[0].id , this.Obj as any )
      // if( res.data.code === 200){
      //   alert(sms_alert_Update_UserInformation.successful ,'success')
      //   this.$store.commit('reset') 
      // }
    },
    async ChangeUsername(){
      let res = await Gatway.postService('/customers/user-info/change-username', this.ObjUsername as any)
      res.data.code === 200 
      ? alert(sms_alert_Update_UserInformation.successful, 'success') 
      : null
       await  this.submit()
       this.$store.commit('reset')
       
    },
    async ChangePassword(){
      console.log(this.ObjPassword.password.length < 8);
      if(this.ObjPassword.password.length >= 8){
        if(this.ObjPassword.password === this.ObjPassword.Confirmpassword){
          let data = await {
            id:this.$store.state.auth.dataset.id,
            password:this.ObjPassword.password,
            password_confirmation:this.ObjPassword.Confirmpassword
          }
          let res = await Gatway.postService('/customers/user-info/change-password', data as any)
          let test = JSON.stringify(res.data.data)
          res.data.code === 200 ? alert(sms_alert_Change_Password.successful, 'success') : alert(test,'error')
        }else{
          alert('Password ไม่ตรงกัน','error')
        }
      }else{
         alert('Password ต้องมากกว่า 8 ตัว','error') 
      }
    }
  },
  mounted(){
    // this.ChangePassword()
  }
});
</script>
<style lang="scss" scoped>
.btn {
  //   width: 120px;
  text-align: center;
  font-size: 13px;
  padding: 4px 7px;
}
.con-save {
  display: flex;
  justify-content: flex-end;
}
.requre{
  font-size: 12px;
  margin-left: 10px;
}
</style>
