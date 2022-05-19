<template>
  <div class="profile-menu">
    <router-link
      v-if="profile"
      :to="'/profile/' + path_profile"
      class="con-list con-profile"
      @click.native="closemenu()"
    >
      <div
        class="img-profile"
        style="
          background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png) center center/cover;
        "
      ></div>
      <div>
        <div v-if="profile">{{ this.$store.state.auth.dataset.user_profile_datas[0].first_name}}  {{ this.$store.state.auth.dataset.user_profile_datas[0].last_name}}</div>
        <small v-if="profile">{{ profile.username }}</small>
      </div>
    </router-link>
    <li class="coin gold">
      <div class="nv-con-coin">
        <img :src="$path.image('coin-gold.png')" width="25px" height="25px" />
        {{
          $filter.NumberToString(
            this.$store.state.auth.dataset.coin_balance_sandbox
          )
        }}
      </div>
      <router-link class="btn-gold" to="/wallet" @click.native="closemenu()"
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
        @click.native="closemenu()"
        >แลกของ</router-link
      >
    </li>
    <router-link
      class="con-list"
      active-class="active-submenu"
      to="/treasury"
      @click.native="closemenu()"
    >
      <img :src="$path.svg('treasury.svg')" width="20px" />
      คลังสมบัติ
    </router-link>
    <router-link
      class="con-list"
      to="/writer"
      active-class="active-submenu"
      @click.native="closemenu()"
    >
      <img :src="$path.image('star.png')" width="20px" />
      ผลงานของฉัน
    </router-link>
    <router-link
      class="con-list"
      to="/bookshelf"
      active-class="active-submenu"
      @click.native="closemenu()"
    >
      <img :src="$path.image('list.png')" width="20px" />
      ชั้นหนังสือ
    </router-link>
    <router-link
      class="con-list"
      to="/history"
      active-class="active-submenu"
      @click.native="closemenu()"
    >
      <img :src="$path.image('history.png')" width="20px" />
      ประวัติการใช้งาน
    </router-link>
    <router-link
      class="con-list"
      active-class="active-submenu"
      to="/reportproblem"
      @click.native="closemenu()"
    >
      <img :src="$path.image('info.png')" width="20px" />
      แจ้งปัญหา
    </router-link>
    <router-link
      class="con-list"
      active-class="active-submenu"
      to="/account"
      @click.native="closemenu()"
    >
      <img :src="$path.image('setting.png')" width="20px" />
      ตั้งค่า
    </router-link>
    <li class="con-list" @click="logout()">
      <img :src="$path.image('logout.png')" width="20px" />
      ออกจากระบบ
    </li>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  name: "profilemenu",
  methods: {
    logout() {
      this.$store.commit("logout");
      // window.FB.api("/me/permissions", "delete", null, () =>
      //   window.FB.logout()
      // );
      window.location.href = "/";
    },
    opanmenu(){
      console.log('>>>>>>>>>>>');
      document
        .getElementsByClassName("profile-menu")[0]
        .classList.toggle("profile-show");
    },
    closemenu() {
      document
        .getElementsByClassName("profile-menu")[0]
        .classList.remove("profile-show");
    },
  },
  mounted(){
     window.onclick = function(event) {
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
}
  }
});
</script>
<style lang="scss" >
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

.profile-menu {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 70px;
  padding: 0px 5px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  // width: 200px;
  background: #ffffff;
  right: 10px;

  transition: 0.3s;
}
.profile-show {
  opacity: 10;
  pointer-events: auto;
  top: 55px;
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
.con-list {
  display: flex;
  align-items: center;
  grid-gap: 10px;
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
</style>
