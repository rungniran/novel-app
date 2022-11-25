<template>
  <div class="userinfo">
    <div
      class="ee"
      v-if="
        $store.state.auth.dataset.user_profile_datas.user_nickname ===
        'e9eb971e-70bc-4e4e-bfd6-38046e326e29'
      "
    >
      <p>เปลี่ยนชื่อที่แสดงในระบบ แล้วกดปุ่ม บันทึกข้อมูลส่วนตัว</p>
      <br />
      <p>
        เพื่อสร้างข้อมูลโปรไฟล์ของท่าน จึงจะสามารถเข้าใช้งานระบบได้
        ต้องขออภัยในความไม่สะดวกครับผม 🙏
      </p>
      <br />
      <div class="contor-input">
        <div class="from-title">ชื่อที่แสดงในระบบ 👈</div>
        <input v-model="Obj.user_nickname" />
      </div>
      <br />
      <div class="con-save">
        <button class="nv-btn-light-blue btn" @click="submit()" >
          บันทึกข้อมูลส่วนตัว
        </button>
      </div>
    </div>
    <div class="from" v-else>
      <!-- <div class="contor-input-2">
        <div>
          <img :src="this.fileimg" width="200px">
          <div class="from-title" >รูป โปรไฟล์</div>
          <input type="file"  @change="previewFiles" accept="image/png, image/jpeg, image/jpg"/>
        </div>
      </div>  -->
      <div class="contor-input">
        <div class="from-title">ชื่อที่แสดงในระบบ</div>
        <input v-model="Obj.user_nickname" maxlength="30"/>
      </div>
      <div class="contor-input" v-if="ObjProfilreWriter === null">
      </div>
      <div v-else>
        <div class="from-title">นามปากกา</div>
        <input v-model="Obj.user_penname" maxlength="30" placeholder="กรอกนามปากกา"/>
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
        <button
          class="nv-btn-light-blue btn"
          @click="submit()"
          :disabled="isLoading"
        >
          บันทึกข้อมูลส่วนตัว
        </button>
      </div>
    </div>
    <div class="from nv-mt-30">
      <div class="contor-input">
        <div class="from-title">
          ชื่อผู้ใช้
          <small class="requre"
            >(สามารถใช้เพื่อ Log In แบบปกติได้)
            <span class="texthightlight">*สามารถแก้ไขได้ 1 ครั้ง*</span></small
          >
        </div>
        <input v-model="ObjUsername.username" />
      </div>
      <div class="contor-input">
        <div class="from-title">อีเมล์</div>
        <input :value="profile.email" disabled />
      </div>
      <div class="con-save">
        <button
          class="nv-btn-light-blue btn"
          @click="ChangeUsername()"
          :disabled="isChangeUser"
        >
          เปลี่ยน ชื่อผู้ใช้
        </button>
      </div>
    </div>
    <div class="from nv-mt-30">
      <div class="contor-input">
        <div class="from-title">รหัสผ่าน</div>
        <input
          type="password"
          v-model="ObjPassword.password"
          placeholder="********"
        />
      </div>
      <div class="contor-input">
        <div class="from-title">ยืนยันรหัสผ่าน</div>
        <input
          type="password"
          v-model="ObjPassword.Confirmpassword"
          placeholder="********"
        />
      </div>
      <div class="con-save">
        <button
          class="nv-btn-light-blue btn"
          @click="ChangePassword()"
          :disabled="isChangePasswond"
        >
          เปลี่ยนรหัสผ่าน
        </button>
      </div>
    </div>
    <div class="from nv-mt-30">
      <div class="con-save">
        <button class="nv-btn-light-blue btn" @click="clear()" :disabled="isClear">
          ล้างนิยายอ่านต่อ
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import { alert } from "@/shares/modules/alert";
import {
  sms_alert_Change_Password,
  sms_alert_Update_UserInformation,
} from "@/shares/constants/smsalert";
export default Vue.extend({
  name: "userinfo",
  data() {
    return {
      fileimg: "" as any,
      Obj: {
        first_name:
          this.$store.state.auth.dataset.user_profile_datas.first_name,
        id: this.$store.state.auth.dataset.user_profile_datas.id,
        last_name: this.$store.state.auth.dataset.user_profile_datas.last_name,
        user_id: this.$store.state.auth.dataset.id,
        user_img: this.$store.state.auth.dataset.user_profile_datas.id,
        user_nickname: this.$store.state.auth.dataset.user_profile_datas
          .user_nickname
          ? this.$store.state.auth.dataset.user_profile_datas.user_nickname
          : this.$store.state.auth.display_name,
        user_profile_data_type_id: "a406c04d-3f50-4ea8-986e-315452753638",
        user_penname: this.$store.state.auth.dataset.user_profile_datas
          .user_penname
        // type_of_company_data_id:''
      },
      ObjProfilreWriter:this.$store.state.auth.dataset.profile_writer,
      ObjPassword: {
        password: "",
        Confirmpassword: "",
      },
      ObjUsername: {
        id: this.$store.state.auth.dataset.id,
        username: this.$store.state.auth.dataset.username,
        status_change_username: true,
      },
      FilesIDCard: "" as any,
      isLoading: false,
      isChangeUser: false,
      isChangePasswond: false,
      isClear: false,
    };
  },
  methods: {
    async submit() {
      this.isLoading = true;
      let res = await Gatway.postService(
        "/customers/profile-data",
        this.Obj as any
      );
      console.log(this.Obj);
      if (res.data.code === 200) {
        this.isLoading = false;
        alert(sms_alert_Update_UserInformation.successful, "success");
        this.$store.commit("reset");
      }
    },
    async ChangeUsername() {
      this.isChangeUser = true;
      let res = await Gatway.postService(
        "/customers/user-info/change-username",
        this.ObjUsername as any
      );
      if (res.data.code === 200) {
        this.$store.commit("reset");
        alert(sms_alert_Update_UserInformation.successful, "success");
        this.isChangeUser = false;
      } else {
        this.isChangeUser = false;
        null;
      }
      //  await  this.submit()
    },
    previewFiles(event) {
      var reader = new FileReader();
      this.FilesIDCard = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.fileimg = reader.result;
      };
    },
    async ChangePassword() {
      this.isChangePasswond = true;
      if (this.ObjPassword.password.length >= 8) {
        if (this.ObjPassword.password === this.ObjPassword.Confirmpassword) {
          this.isChangePasswond = true;
          let data = await {
            id: this.$store.state.auth.dataset.id,
            password: this.ObjPassword.password,
            password_confirmation: this.ObjPassword.Confirmpassword,
          };
          let res = await Gatway.postService(
            "/customers/user-info/change-password",
            data as any
          );
          let test = JSON.stringify(res.data.data);
          if (res.data.code === 200) {
            this.isChangePasswond = false;
            alert(sms_alert_Change_Password.successful, "success");
          } else {
            alert(test, "error");
            this.isChangePasswond = false;
          }
        } else {
          this.isChangePasswond = false;

          alert("Password ไม่ตรงกัน", "error");
        }
      } else {
        this.isChangePasswond = false;

        alert("Password ต้องมากกว่า 8 ตัว", "error");
      }
    },
    clear() {
      localStorage.removeItem("StoryRead");
    },
  },
  mounted() {
    // this.ChangePassword()
    console.log(this.$store.state.auth.dataset)
    console.log(this.$route.query?.user_nickname);
    if(this.$route.query?.user_nickname){
    window.alert('ท่านยังไม่ได้ บันทึก ชื่อที่แสดงในระบบ ') 
        
    }
    

  },
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
.requre {
  font-size: 12px;
  margin-left: 10px;
}
.texthightlight {
  color: #b80909;
}
.ee {
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
.contor-input-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>
