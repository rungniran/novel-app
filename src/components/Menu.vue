<template>
  <div class="profile-menu" v-if="this.$store.state.auth.token">
    <router-link
      v-if="this.$store.state.auth.dataset"
      :to="'/profile/' +profile.id"
      class="con-list con-profile"
      
    >
      <div
        class="img-profile"
        style="
          background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png) center center/cover;
        "
      ></div>
      <div style="width: 200px;">
        <div v-if="profile" class="line-1">{{ this.$store.state.auth.display_name}} </div>
        <small v-if="profile">#นักรบมังกร</small>
      </div>
    </router-link>
    <li class="coin gold">
      <div class="nv-con-coin" v-if="this.$store.state.auth.dataset">
        <img :src="$path.image('coin-gold.png')" width="25px" height="25px" />
        {{
          $filter.NumberToString(
            this.$store.state.auth.dataset.coin_balance_sandbox
          )
        }}
      </div>
      <router-link class="btn-gold" to="/wallet" 
        >เติมเหรียญ</router-link
      >
    </li>
    <li class="coin diamond">
      <div class="nv-con-coin">
        <img :src="$path.image('diamond.png')" width="25px" height="25px" />
        {{ $filter.NumberToString(this.$store.state.auth.dataset.diamond_balance) }}
      </div>
      <router-link
        class="btn-diamond"
        to="/exchange"
      
        >แลกของ</router-link
      >
    </li>
    <!-- <div to="#" v-if="this.$store.getters._GetTheme !== 'ambient'" class="con-list" @click="changemode('ambient')">
      <font-awesome-icon icon="fa-regular fa-moon" /> โหมดแอมเบียนท์  </div>  
     <div to="#" v-else class="con-list" @click="changemode('')"><font-awesome-icon icon="fa-regular fa-sun" /> โหมดปกติ </div>   -->
    <router-link
      class="con-list"
      active-class="active-submenu"
      to="/treasury"
   
    >
    <font-awesome-icon icon="fa-regular fa-gem" />
      <!-- <img v-lazy="$path.svg('treasury.svg')" width="20px" /> -->
      คลังสมบัติ
    </router-link>
    <router-link
      class="con-list"
      to="/writer"
      active-class="active-submenu"
    
    >
      <i class="far fa-star"></i>
      ผลงานของฉัน
    </router-link>
     <router-link
      class="con-list "
      active-class="active-submenu"
      to="/exchange"

    >
      <font-awesome-icon icon="fa-solid fa-store" />
      ร้านค้า
    </router-link>
    <router-link
      class="con-list"
      to="/bookshelf"
      active-class="active-submenu"
 
    >
    <i class="fas fa-list-ul"></i>
      ชั้นหนังสือ
    </router-link>
    <router-link
      class="con-list"
      to="/history"
      active-class="active-submenu"
   
    >
<font-awesome-icon icon="fa-solid fa-clock-rotate-left" />
      ประวัติการใช้งาน
    </router-link>
    <!-- <router-link
      class="con-list"
      active-class="active-submenu"
      to="/reportproblem"
   
    >
      <img v-lazy="$path.image('info.png')" width="20px" />
      แจ้งปัญหา
    </router-link> -->
    <router-link
      class="con-list"
      active-class="active-submenu"
      to="/account"

    >
      <!-- <i class="fas fa-cog"></i> -->
      <font-awesome-icon icon="fa-solid fa-gear" />
      ตั้งค่า
    </router-link>
    <router-link
      class="con-list"
      active-class="active-submenu"
      to="/device"
    >
    <i class="fa fa-mobile device" aria-hidden="true" ></i>
      อุปกรณ์
    </router-link>
    <li class="con-list" @click="logout()">
      <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
      ออกจากระบบ
    </li>
  </div>
</template>
<script>
import Vue from "vue";
import { Gatway } from "@/shares/services";
export default Vue.extend({
  name: "profilemenu",
  methods: {
    async logout() {
      this.$store.commit("logout");
      // window.FB.api("/me/permissions", "delete", null, () =>
      //   window.FB.logout()
      // );
      // await Gatway.getService(
      //   "/logout"
      // );
      // window.location.href = "/";
    },
    opanmenu(){
      this.$store.commit("reset");
      document
        .getElementsByClassName("profile-menu")[0]
        .classList.toggle("profile-show");
        this.$emit("closedLeft",{})
    },
    closemenu() {
      document
        .getElementsByClassName("profile-menu")[0]
        .classList.remove("profile-show");
    },
    changemode(mode){
      this.$store.commit('_SetTheme', mode)
    }
  },
  mounted(){
    document.addEventListener('click', (event)=>{
      if (!event.target.matches('.user-active')) {
        var dropdowns = document.getElementsByClassName("profile-menu");
        var i = 0;
        for (i ; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('profile-show')) {
            openDropdown.classList.remove('profile-show');
          }
        }
      }
    })
  },
  // beforeDestroy() {
  //   document.addEventListener('click', (event)=>{
  //      if (!event.target.matches('.user-active')) {
  //       var dropdowns = document.getElementsByClassName("profile-menu");
  //       var i = 0;
  //       for (i ; i < dropdowns.length; i++) {
  //         var openDropdown = dropdowns[i];
  //         if (openDropdown.classList.contains('profile-show')) {
  //           openDropdown.classList.remove('profile-show');
  //         }
  //       }
  //     }
  //   })
  // },
});
</script>
<style lang="scss" scoped>
.con-list {
  display: flex;
  align-items: center;
  grid-gap: 10px;
}
.profile-contai-modal {
  top: 0;
  left: 0;
  z-index: 3000;
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff00;
  opacity: 0;
  transition: 0.3s;
  pointer-events: none;
}
.device{
  width: 20px;
  padding-left: 3px;
}
.profile-menu {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0px;
  top: 70px;
  padding: 0px 5px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  // width: 200px;
  background: #ffffff;

  transition: 0.3s;
}
.profile-show {
  opacity: 10;
  pointer-events: auto;
  top: 60px;
}
.profile-crad-show {
  margin-top: 0px;
}
.profile-menu li,
.profile-menu .con-list {
  padding: 5px 7px;
  margin: 5px 0px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}
.profile-menu li:hover,
.profile-menu .con-list:hover {
  background: #ebebeb;
}
.coin {
  min-width: 240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.gold {
  background: #fdf4cb !important;
}
.diamond {
  background: #ece6f8 !important;
}

.btn {
  display: flex;
  align-items: center;
  padding: 2px 7px;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
}
.btn-diamond {
  @extend .btn;
  background: #8c6ac7;
}
.btn-gold {
  @extend .btn;
  background: #f4ba40;
}
.img-profile {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  // border: 2px solid #1C1140;
}
.active-submenu {
  background: #e6e6e6;
}
.shop-icon{
  opacity: 0.5;
}
</style>
