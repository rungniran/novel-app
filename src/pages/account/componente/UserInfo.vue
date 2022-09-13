<template>
  <div class="userinfo">
    <div class="ee" v-if="$store.state.auth.dataset.user_profile_datas.user_nickname === 'e9eb971e-70bc-4e4e-bfd6-38046e326e29'">
      <p> เปลี่ยนชื่อที่แสดงในระบบ แล้วกดปุ่ม บันทึกข้อมูลส่วนตัว  </p><br>
     <p> เพื่อสร้างข้อมูลโปรไฟล์ของท่าน จึงจะสามารถเข้าใช้งานระบบได้ ต้องขออภัยในความไม่สะดวกครับผม 🙏</p><br>
     <div class="contor-input">
        <div class="from-title" >ชื่อที่แสดงในระบบ 👈</div>
        <input  v-model="Obj.user_nickname"/>
      </div> <br>
      <div class="con-save">
        <div class="nv-btn-light-blue btn" @click="submit()">บันทึกข้อมูลส่วนตัว</div>
      </div>
      </div>
    <div class="from" v-else>
       <div class="contor-input-2">
        <div>
          <img :src="this.fileimg" width="200px">
          <div class="from-title" >รูป โปรไฟล์</div>
          <input type="file"  @change="previewFiles" accept="image/png, image/jpeg, image/jpg"/>
        </div>
      </div> 
      <div class="contor-input">
        <div class="from-title" >ชื่อที่แสดงในระบบ</div>
        <input  v-model="Obj.user_nickname"/>
      </div> 
      <!-- <div class="con-from">
        <div class="contor-input">
          <div class="from-title">ชื่อ</div>
          <input v-model="Obj.first_name" />
        </div>
        <div class="contor-input">
          <div class="from-title">นามสกุล</div>
          <input  v-model="Obj.last_name"/>
        </div>
      </div> -->
      <!-- <div class="contor-input">
        <div class="from-title">ชื่อผู้ใช้</div>
        <input :value="profile.username"/>
      </div>-->
      <div class="con-save">
        <div class="nv-btn-light-blue btn" @click="submit()">บันทึกข้อมูลส่วนตัว</div>
      </div>
    </div>
    <div class="from nv-mt-30">
        <div class="contor-input">
        <div class="from-title">ชื่อผู้ใช้ <small class="requre">(สามารถใช้เพื่อ Log In แบบปกติได้) <span class="texthightlight">*สามารถแก้ไขได้ 1 ครั้ง*</span></small></div>
        <input v-model="ObjUsername.username"/>
        
      </div>
      <div class="contor-input">
        <div class="from-title" >อีเมล์</div>
        <input  :value="profile.email" disabled/>
      </div>
       <div class="con-save">
        <div class="nv-btn-light-blue btn" @click="ChangeUsername()">เปลี่ยน ชื่อผู้ใช้</div>
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
    <div class="from nv-mt-30">
      <div class="con-save">
        <div class="nv-btn-light-blue btn" @click="clear()">ล้างนิยายอ่านต่อ</div>
        <!-- <div class="nv-btn-light-blue btn" @click="ChangePassword()">เปลี่ยนรหัสผ่าน</div> -->
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
      fileimg:'' as any,
      Obj:{
        first_name: this.$store.state.auth.dataset.user_profile_datas.first_name,
        id:this.$store.state.auth.dataset.user_profile_datas.id,
        last_name:this.$store.state.auth.dataset.user_profile_datas.last_name,
        user_id:this.$store.state.auth.dataset.id,
        user_img:this.$store.state.auth.dataset.user_profile_datas.id,
        user_nickname: this.$store.state.auth.dataset.user_profile_datas.user_nickname ? this.$store.state.auth.dataset.user_profile_datas.user_nickname : this.$store.state.auth.display_name,
        user_profile_data_type_id:'a406c04d-3f50-4ea8-986e-315452753638',
        // type_of_company_data_id:''
      }, 
      ObjPassword:{
        password:'',
        Confirmpassword:'',
      },
      ObjUsername:{
        id:this.$store.state.auth.dataset.id,
        username:this.$store.state.auth.dataset.username,
        status_change_username:true
      },
      FilesIDCard:'' as any
    }
  },
  methods:{
    async submit(){
      let res = await Gatway.postService('/customers/profile-data',  this.Obj as any )
      console.log(this.Obj);
      let formData = new FormData();
            formData.append("file", this.FilesIDCard as any);
            formData.append("ref", this.$store.state.auth.dataset.user_profile_datas.id);
            formData.append("table", "user_profile_data_user_img");
            await Gatway.postService(
              "/upload/image/ref-table",
              formData as any
            );
      if( res.data.code === 200){
        alert(sms_alert_Update_UserInformation.successful ,'success')
        this.$store.commit('reset') 
      }
    },
    async ChangeUsername(){
      let res = await Gatway.postService('/customers/user-info/change-username', this.ObjUsername as any)
      res.data.code === 200 
      ? alert(sms_alert_Update_UserInformation.successful, 'success') 
      : null
      //  await  this.submit()
      this.$store.commit('reset')
       
    },
    previewFiles(event) {
			var reader = new FileReader()
     this.FilesIDCard = event.target.files[0]
			reader.readAsDataURL(event.target.files[0])
			reader.onload = () => {
        this.fileimg = reader.result
			};
		},
    async ChangePassword(){
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
    },
    clear(){
     localStorage.removeItem("StoryRead");
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
.texthightlight {
  color: #b80909;
}
.ee{
    color: #ffffff;
    padding: 10px;
    background: #ff4949;
     font-family: "Sarabun", sans-serif;
     border-radius: 5px;
}
  input[type="color"],
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"],
input,
select:focus,
textarea {
  font-size: 16px;
}
.contor-input-2{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>
