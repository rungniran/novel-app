<template>
  <div id="app">
    <Login />
    <Sarver v-show="$base.cleckhostname()"/>
    <TopBar @closed="closedLeftMenu" />
    <div class="content">
      <!-- <div @click=" test()">dfdffd</div> -->
      <!-- <transition name="route" mode="out-in"> -->
        <router-view />
      <!-- </transition> -->
    </div>
    <Footer />
    <NovelAlertSystem />
    <!-- <NovelModal2    
        ID="test"
      IDCrad="testCrad"

      ref="test">
      <template v-slot:body>
        <div style="font-size:23px; font-family: 'Sarabun', sans-serif; ">
            <input v-model="password">
            <button @click="closedtest">Test</button>
            <br><br><br>
        ขณะนี้เว็บ Novelkingdom กำลังปิดปรับปรุงเว็บไซต์อยู่ ขออภัยในความไม่สะดวก <br><br>
        สามารถติดตามข่าวสารเพิ่มเติมในเพจ <a href="https://www.facebook.com/Novelkingdom "> facebook:https://www.facebook.com/Novelkingdom </a>
        </div>
      </template>
      </NovelModal2> -->

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { set } from "vue/types/umd";
// import cleckhostname from "@/shares/function/function_base"
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//   return e.ctrlKey && e.shiftKey && e.keyCode && e.altKey && e.metaKey === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//   if (
//     e.keyCode === 123 ||
//     ctrlShiftKey(e, 'I') ||
//     ctrlShiftKey(e, 'J') ||
//     ctrlShiftKey(e, 'C') ||
//      ctrlShiftKey(e, 'P') ||
//     (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
//   )
//     return false;
// };

export default Vue.extend({
  name: "App",
  components: {
    TopBar: () => import("@/layouts/TopBar.vue"),
    Footer: () => import("@/layouts/Footer.vue"),
    Login: () => import("@/components/Login.vue"),
    NovelAlertSystem: () => import("@/components/widget/NovelAlertSystem.vue"),
    Sarver:()=> import('@/components/Sarver.vue'),
  },
  data() {
    return {
      password: "",
      // cleckhostname:cleckhostname
    };
  },
  mounted() {
     window.scrollTo(0, 0);
    if (
      this.$store.state.auth.dataset.user_profile_datas.user_nickname ===
      "e9eb971e-70bc-4e4e-bfd6-38046e326e29"
    ) {
      this.$router.push("/account");
    }
    // localStorage.clear()
    // setTimeout(() => {
    //     this.test()
    // }, 2000);

    //   this.$store.commit("reset");
    //   (this as any).$analytics.logEvent("notification_received");
  },
  methods: {
    closedLeftMenu() {
      console.log("closedLeftMenu");
    },
    closedtest() {
      if (this.password === "7695cfc2-5a7a-40b9-b4bf-5bdbd254197e") {
        localStorage.setItem("test", this.password);
        (this as any).$refs.test.close();
      }
    },
    test() {
      (this as any).$refs.test.open();
    },
  },
  beforeUpdate() {
    window.scrollTo(0, 0);
    if (
      this.$store.state.auth.dataset.user_profile_datas.user_nickname ===
      "e9eb971e-70bc-4e4e-bfd6-38046e326e29"
    ) {
      this.$router.push("/account");
    }
    // if(localStorage.getItem('test') !== '7695cfc2-5a7a-40b9-b4bf-5bdbd254197e'){
    //     this.test()
    // }
  },
});
</script>

<style>
#test {
  background: #111;
}
#testCrad {
  width: 100% !important;
  height: 100vh;
  border-radius: 0px;
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
select:focus,
input,
textarea {
  font-size: 16px;
}
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.4s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.4s ease-in;
}
</style>
