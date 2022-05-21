<template>
  <div class="userinfo">
    <div class="from">
      <div class="con-from">
        <div class="contor-input">
          <div class="from-title">ชื่อ</div>
          <input v-model="Obj.first_name" />
        </div>
        <div class="contor-input">
          <div class="from-title">นามสกุล</div>
          <input  v-model="Obj.last_name"/>
          <!-- {{profile.user_profile_datas[0].first_name}} -->
        </div>
      </div>
      <div class="contor-input">
        <div class="from-title">ชื่อผู้ใช้</div>
        <input :value="profile.username" disabled/>
      </div>
      <div class="contor-input">
        <div class="from-title" >อีเมล์</div>
        <input  :value="profile.email" disabled/>
      </div>
      <div class="con-from">
        <!-- <div class="contor-input">
          <div class="from-title">เพศ</div>
          <input  />
        </div> -->
        <!-- <div>
          <div class="from-date">
            <div class="contor-input">
              <div class="from-title">วัน</div>
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div class="contor-input">
              <div class="from-title">เดือน</div>
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div class="contor-input">
              <div class="from-title">ปีเกิด</div>
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          </div>
        </div> -->
      </div>
      <div class="con-save">
        <div class="nv-btn-light-blue btn" @click="submit()">บันทึกข้อมูล</div>
      </div>
    </div>
    <!-- <div class="from nv-mt-30">
      <div class="contor-input">
        <div class="from-title">รหัสผ่าน</div>
        <input type="password" placeholder="*********" />
      </div>
      <div class="contor-input">
        <div class="from-title">ยืนยันรหัสผ่าน</div>
        <input type="password" placeholder="*********"  />
      </div>
      <div class="con-save">
        <div class="nv-btn-light-blue btn">บันทึกข้อมูล</div>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
export default Vue.extend({
  name: "userinfo",
  data(){
    return{
      Obj:{
        first_name: this.$store.state.auth.dataset.user_profile_datas[0].first_name,
        id:this.$store.state.auth.dataset.user_profile_datas[0].id,
        last_name:this.$store.state.auth.dataset.user_profile_datas[0].last_name,
        user_id:this.$store.state.auth.dataset.id,
        user_nickname:this.$store.state.auth.dataset.user_profile_datas[0].first_name + ' ' + this.$store.state.auth.dataset.user_profile_datas[0].last_name,
        user_profile_data_type_id:'a406c04d-3f50-4ea8-986e-315452753638'
      }
    }
  },
  methods:{
    async submit(){
       console.log(this.Obj);
       
      let res = await Gatway.PutService('/customers/profile-data', (this as any).profile.user_profile_datas[0].id , this.Obj as any )
      console.log(res);
      this.$store.commit('reset')
      
    }
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
</style>
