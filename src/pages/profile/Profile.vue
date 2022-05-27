<template>
  <div>
    <div class="nv-box-white nv-mt-40">
      <!-- <div class="img-cover">
                <div class="img-profile" style="background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png) center center/cover ;">
                    <div class="Lv">
                        Level 1
                    </div>
                </div>
            </div> -->
      <cover  :data="gatitemProfile"/>
      <!-- <div class="contant">
                  <div class="box-username">
                    <div v-if="profile" class="nv-username">{{profile.username}}</div>
                    <div v-if="profile" >#{{profile.dragon}}</div>
                    <div class="level">
                        <div class="teb-level"></div>
                    </div>
                    <div class="nv-mt-10">
                        Exp {{lv}} / 100
                    </div>
                </div>
            </div> -->
      <div>
        <div class="nv-mt-10">
          <div style="display: flex; grid-gap: 10px; justify-content: center">
            <router-link
              :to="'/profile/' + this.$route.params.username + '/writer'"
              class="nv-btn-light-blue msg viewprofile"
              >ดูโปรไฟล์นักเขียน</router-link
            >
            <div class="nv-btn-yellow msg">ส่งข้อความ</div>
            <router-link v-if="this.$route.params.username === profile.id" to="/account" class="nv-btn-blue edit"
              ><i class="far fa-edit"></i> ตั้งค่า</router-link
            >
          </div>
          <div class="nv-mt-10">
            <div>
              <div class="title">ของสะสมหายาก</div>
              <div class="con-all">
                <div class="box-all"></div>
                <div class="box-all"></div>
                <div class="box-all"></div>
                <div class="box-all"></div>
              </div>
            </div>
          </div>
          <div class="nv-mt-20">
            <div>
              <div class="title">นักเขียนคนโปรด</div>
              <div class="con-all">
                <div class="box-all"></div>
                <div class="box-all"></div>
                <div class="box-all"></div>
                <div class="box-all"></div>
              </div>
            </div>
          </div>
          <div class="nv-mt-20">
            <div>
              <div class="title">เรื่องที่ติดตาม</div>
              <div class="con-all">
                <div class="box-all"></div>
                <div class="box-all"></div>
                <div class="box-all"></div>
                <div class="box-all"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services"
export default Vue.extend({
  name: "Account",
  data(){
    return{
      gatitemProfile:{}
    }
  },
  components: {
    cover: () => import("@/components/Cover.vue"),
  },
  methods:{
    async getdata(){
      let res = await Gatway.getIDService('/customers/profile-data/index', this.$route.params.username)
      this.gatitemProfile = res.data.data
    }
  },
  mounted(){
    this.getdata()
  }
});
</script>

<style lang="scss" scoped>
.nv-box-white {
  position: relative;
  overflow: hidden;
}
$topcover: 280px;
.img-cover {
  position: absolute;
  display: flex;
  justify-content: center;
  left: 0px;
  top: 0px;
  height: $topcover;
  width: 100%;
  background: linear-gradient(
    180deg,
    #61bcbe 10.94%,
    #81aad8 49.48%,
    #ab93f9 100%
  );
}
.contant {
  margin-top: $topcover + 25;
}
.img-profile {
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 100%;
  background: #848484;
  margin: auto;
  bottom: -60px;
  display: flex;
  justify-content: center;
}
.Lv {
  position: absolute;
  bottom: -10px;
  background: #1d2044;
  width: 100px;
  padding: 2px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 50px;
}
.box-username {
  display: flex;
  align-items: center;
  flex-direction: column;
  grid-gap: 5px;
}
.level {
  width: 270px;
  height: 23px;
  border-radius: 30px;
  background: #1d204442;

  margin-top: 10px;
}
.teb-level {
  height: 100%;
  width: 0%;
  border-radius: 30px;
  background: #1d2044;
  box-shadow: 1px 0px 15px 2.5px #9779f8;
  transition: 1s;
  // animation-name: example;
  // animation-duration: 2s;
  // animation-fill-mode: both;
}
.msg,
.edit {
  font-size: 13px;
  padding: 5px 7px;
}
.edit {
  background: #828282;
  border: 1px solid #828282;
}
.title {
  font-size: 20px;

  /* identical to box height */

  color: #444349;
}
.con-all {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}

.box-all {
  height: 200px;
  border: 1px solid #9d9d9d;
  background: #1d2044;
  border-radius: 7px;
}
.viewprofile {
  position: absolute;
  top: 300px;
  left: 20px;
}
@media (max-width: 1024px){
	
}
@media (max-width: 768px){
	.con-mywork {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
  }
	.con-mywork{
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}

@media (max-width: 415px){
	.viewprofile {
    position: unset;
  }
	.con-mywork{
      grid-template-columns: 1fr 1fr ;
    }
		.con-all{
			  grid-template-columns: 1fr 1fr ;
		}
}
</style>
