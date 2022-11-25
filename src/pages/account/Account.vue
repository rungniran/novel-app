<template>
  <div>
    
    <div class="nv-box-white nv-mt-40">
      <div class="img-cover">
        <div
          class="img-profile border-3-b"
          :style="'background: url(' + $profileimgW  + ') center center/cover; '"
        >
        <div v-if="$store.state.auth.dataset.profile_writer">
          <NovelCropper
            type="image/jpeg"
            :width="500"
            :height="500"
            @imgCropper="imgCropper"
            @reset="reset"
            ref="NovelCropper"
          />
          <button v-if="file" @click="savefile()" class="save">บันทึก</button>
        </div>
        </div>
      </div>
      <div class="contant">
        <div class="box-username">
          <div v-if="profile" class="nv-username ">
            {{ this.$store.state.auth.display_name }}
          </div>
          <div v-if="profile">{{ profile.email }}</div>
        </div>
      </div>

      <div class="tap-writer nv-mt-30">
        <router-link
          @click.native="changeComponent('userinfo')"
          to="#userinfo"
          :class="
            current === 'userinfo' ? 'nv-s nv-s1 nv-s-active' : 'nv-s nv-s1'
          "
        >
          ข้อมูลผู้ใช้
        </router-link>
        <router-link
          v-if="profile.profile_writer"
          @click.native="changeComponent('writerinfo')"
          to="#writerinfo"
          :class="
            current === 'writerinfo' ? 'nv-s nv-s2 nv-s-active' : 'nv-s nv-s2'
          "
        >
          ข้อมูลนักเขียน
        </router-link>
      </div>
      <div class="nv-mt-30">
        <component :is="current"></component>
      </div>
    </div>
    <div class="nv-box-white nv-mt-40  fg">
       <div to="#"  class="con-list" @click="changemode('ambient')">
      <font-awesome-icon icon="fa-regular fa-moon" /> โหมดแอมเบียนท์  </div>  
     <div to="#" class="con-list" @click="changemode('')"><font-awesome-icon icon="fa-regular fa-sun" /> โหมดปกติ </div> 
     <div to="#" class="con-list" @click="changemode('main-dark')"><font-awesome-icon icon="fa-regular fa-sun" /> โหมดสีเข้ม </div> 
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import { alert } from "@/shares/modules/alert";
export default Vue.extend({
  name: "Account",
  data() {
    return {
      current: "userinfo",
      file: null,
      // img: this.$store.state.auth.dataset.profile_writer ? this.$store.state.auth.dataset.profile_writer.image_data.url :'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    };
  },
  components: {
    userinfo: () => import("./componente/UserInfo.vue"),
    writerinfo: () => import("./componente/WriterInfo.vue"),
    NovelCropper: () => import("@/components/widget/NovelCropper2.vue"),
  },
  methods: {
    changeComponent(component: string): void {
      this.current = component;
    },
    cleckpath(): string {
      return this.$route.hash.slice(1);
    },
    imgCropper(file) {
      // console.log(file);
      this.file = file;
    },
    reset(){
      this.file = null
    },
    async savefile() {
      let formData = new FormData();
      formData.append("file", this.file as any);
      formData.append(
        "ref",
        this.$store.state.auth.dataset.profile_writer.id
      );
      formData.append("prefix", "user_profile_data_user_img");
      await Gatway.postService("/upload/image/attached-file", formData as any);
      (this as any).$refs.NovelCropper.reset()
      this.file = null
      alert('อัพโหลดสำเร็จ' ,'success')
    },
    changemode(mode:any){
      this.$store.commit('_SetTheme', mode)
    }
  },
  mounted() {
    this.cleckpath() === ""
      ? this.changeComponent("userinfo")
      : this.changeComponent(this.$route.hash.slice(1));
  },
});
</script>

<style lang="scss" scoped>
.nv-box-white {
  position: relative;
  overflow: hidden;
  // max-width: 950px;
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
.edit-profile {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #1d2044;
  // width: 130px;
  padding: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 100%;
}
.contant {
  margin-top: $topcover + 35;
}
.img-profile {
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 100%;
  background: #848484;
  margin: auto;
  bottom: -60px;
  display: flex;
  justify-content: center;
  transform: translate(0px, 4rem);
}
.Lv {
  position: absolute;
  bottom: -10px;
  background: #1d2044;
  width: 130px;
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
}
.tap-writer {
  width: 100%;
  display: flex;
  // grid-template-columns: 1fr 1fr;
}
.nv-s1 {
  border-radius: 5px 0px 0px 5px;
  border-right: 0px solid;
}
.nv-s2 {
  border-radius: 0px 5px 5px 0px;
  border-left: 0px solid;
}
.save {
  position: absolute;
  right: -60px;
  background: #1d2044;
  border: 0px solid;
  color: #fff;
  border-radius: 5px;
    top: -0px;
}
.fg{
padding: 20px;
    display: flex;
    gap: 50px;
    justify-content: center;
}
</style>
