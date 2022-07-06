<template>
  <div>
    <div class="nv-box-white nv-mt-40">
      <cover :data="gatitemProfile"/>

        <div class="box-follow nv-mt-20">
          <div class="follow">
            <span>{{mywork.length}}</span>
            <div>เรื่อง</div>
          </div>
          <div class="follow">
            <span>1</span>
            <div>ผู้ติดตาม</div>
          </div>
          <!-- <div class="follow">
            <span>1</span>
            <div>ผู้ติดตาม</div>
          </div> -->
        </div>

      <div>
        <div class="nv-mt-20">
          <div class="con-detail-btn">
            <router-link :to="'/profile/' + this.$route.params.username" class="nv-btn-light-blue msg viewprofile"
              >ดูโปรไฟล์นักอ่าน</router-link
            >
            <!-- <div class="nv-btn-yellow msg">ส่งข้อความ</div>
            <div class="nv-btn-yellow msg" @click="$base.openmodal('modal-xl', 'modal-animation', 0)">ส่งกำลังใจ</div> -->
            <div class="nv-btn-yellow msg">ติดตาม</div>
          </div>
        </div>
        <div class="nv-mt-30" >
          <div class="title">นิยายของคุณ {{ gatitemProfile.user_nickname }}</div>
          <Work/>
        </div>
      </div>
    </div>
    <ModalCheerUp/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services"
export default Vue.extend({
  name: "profilewriter",
  data() {
    return {
      mywork: [...Array(10).keys()],
      gatitemProfile:{}
    };
  },
  components: {
    cover: () => import("@/components/Cover.vue"),
    ModalCheerUp:()=>import("./components/ModalCheerUp.vue"),
		Work:()=> import("@/components/myWork.vue")

  },
  methods:{
    async getdata(){

      
      let res = await Gatway.getIDService('/customers/profile-data/index', this.$route.params.username)
      console.log(res);
      this.gatitemProfile = res.data.data
      
    },
    async getnovel(){
      let res = await    Gatway.getService('/customers/novel')
      console.log(res);
      
    }
    
  },
  mounted(){
    this.getnovel()
     this.getdata()
  }
});
</script>
<style lang="scss" scoped>
.nv-box-white {
  position: relative;
  overflow: hidden;
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
  font-size: 25px;
  color: #444349;
}
.con-mywork {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
}
.image {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
.type-novel {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 40px;
  background: #febc2a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.container-detail {
  margin: 10px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.box-follow{
display: flex;
justify-content: center;
// grid-template-columns: 1fr 1fr 1fr;
grid-gap: 10px;
}
.follow{
padding: 10px 20px;
width: 140px;
background: rgb(231, 231, 231);
display: flex;
flex-direction: column;
align-items: center;
border-radius: 7px;

}
.viewprofile{
   position: absolute;
   top: 300px;
   left: 20px;
}
.con-detail-btn{
	display: flex; grid-gap: 10px; justify-content: center;
}
@media (max-width: 768px) {
.con-mywork {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-gap: 30px;
}

}
@media (max-width: 415px) {
    .viewprofile{
    position: unset;
    }
		.con-detail-btn{
	display: grid; grid-gap: 10px;
	grid-template-columns: 1fr 1fr;
}
.msg {
	text-align: center;
}
}
</style>
