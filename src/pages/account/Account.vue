<template>
  <div>
    <div class="nv-box-white nv-mt-40">
      <div class="img-cover">
        <div
          class="img-profile"
          style="
            background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png) center center/cover;
          "
        >
        <!-- <NovelCropper type='image/jpeg'/> -->
          <!-- <div class="edit-profile">
            <i class="fa fa-camera" aria-hidden="true">
            </i></div> -->
          <!-- <div class="Lv">LV.2 &nbsp; <small>( 70 exp )</small></div> -->
        </div>
      </div>
      <div class="contant">
        <div class="box-username">
          <div v-if="profile" class="nv-username">
           {{ this.$store.state.auth.display_name}}
          </div>
          <div v-if="profile">{{ profile.email }}</div>
        </div>
      </div>

      <div class="tap-writer nv-mt-30">
        <router-link
          @click.native="changeComponent('userinfo')"
          to="#userinfo"
          :class="current === 'userinfo' ? 'nv-s nv-s1 nv-s-active' : 'nv-s nv-s1'"
        >
          ข้อมูลผู้ใช้
        </router-link>
        <router-link 
          v-if="profile.profile_writer "
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Account",
  data() {
    return {
      current: "userinfo",
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
  max-width: 950px;
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
.edit-profile{
  position: absolute;
  bottom:5px;
  right:5px;
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
  transform: translate(0px,4rem);
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
</style>
