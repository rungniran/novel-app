<template>
  <div id="app" v-if="ischeck" :class="`test ${this.$store.getters._GetTheme}`">
    <Login ref="Login" />
    <Sarver v-if="cleckhostname()" />
    <TopBar @closed="closedLeftMenu"  v-if="isheckApi" />
    <!-- <div class="topbar-f">
    </div> -->
    <div class="content"  v-if="isheckApi">
      <router-view />
    </div>
    <Footer v-if="isheckApi"/>
    <NovelAlertSystem />
  </div>
  <div v-else class="not-ip">
    <div >Novel Kingdom server Test please check ip</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import NovelDebug from "@/components/NovelDebug.vue"
import { Gatway, _cleckapi} from "@/shares/services";
import { Seturl } from "@/shares/constants"
import {getDatabase, ref, onValue } from "firebase/database";
import { firedatabase } from "@/shares/services/firebase.service"
const  testapi = new _cleckapi
// document.onkeydown = function (e) {
//   // disable F12 key
//   if (e.keyCode == 123) {
//     return false;
//   }

//   // disable I key
//   if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
//     return false;
//   }

//   // disable J key
//   if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
//     return false;
//   }

//   // disable U key
//   if (e.ctrlKey && e.keyCode == 85) {
//     return false;
//   }
// };

export default Vue.extend({
  name: "App",
  components: {
    TopBar: () => import("@/layouts/TopBar.vue"),
    Footer: () => import("@/layouts/Footer.vue"),
    Login: () => import("@/components/Login.vue"),
    NovelAlertSystem: () => import("@/components/widget/NovelAlertSystem.vue"),
    Sarver: () => import("@/components/Sarver.vue"),
    // NovelDebug,
    // WalletModal: () => import("@/pages/wallet/WalletModal/walletmodal.vue")
    
    // Maintenance: () => import("./pages/Maintenance.vue"),
  },
  data() {
    return {
      seturl: Seturl,
      password: "",
      ischeck: true as any,
      isheckApi: false as any,
      isActivate: false as any,
      hostname: window.location.hostname
    };
  },

  async mounted() {
    const hostname = window.location.hostname;
    if ( Seturl.server_test.includes(hostname) ) {
      
      this.ip();
    } else {
      this.isheckApi = true;
    }
  },
  methods: {
     cleckhostname(){
        if(
         testapi.opentest()
        ){
          return true
        }else{
          return false
        }
    },

    async ip() {
     
      let ip = await fetch("https://api.ipify.org?format=json")
        .then((x) => x.json())
        .then(({ ip }) => {
          return ip;
        });
        const db = getDatabase();
 const starCountRef = ref(db, "/ip_appress/");
 onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
 console.log(data);
 
});
      const datas = ref(firedatabase, "/ip_appress/");
      console.log('datas');
      onValue(datas, (snapshot) => {
        
        const data = snapshot.val();
        
        if (data) {
          const asArray = Object.entries(data);
          console.log(asArray);
          let cleckIP = asArray.filter((item: any) => {
            return item[1].ip === ip;
          });
          if (cleckIP.length >= 1) {
            this.ischeck = true;
            this.isheckApi = true;
          } else {
            this.ischeck = false;
            this.isheckApi = false;
          }
        } else {
          this.isheckApi = false;
          this.ischeck = false;
        }
      });
    },
    closedLeftMenu() {
      console.log("closedLeftMenu");
    },

    test() {
      (this as any).$refs.test.open();
    },
    ds() {
      const datas = ref((this as any).$firedatabase, "/activate_serve/");
      onValue(datas, async (snapshot) => {
        const data = snapshot.val();
        if (data === true) {
          this.isheckApi = false;
          this.ischeck = false;
          this.isActivate = true;
        } else {
          this.isheckApi = true;
          this.ischeck = true;
        }
      });
    },
  },

  updated() {
    if(this.$route.hash ==="#login"){
      (this as any).$refs.Login.openlogin()
    }
    window.scrollTo(0, 0);
    if (this.$store.state.auth.dataset) {
      if (this.$store.state.auth.dataset.user_profile_datas) {
        if (
          this.$store.state.auth.dataset.user_profile_datas.user_nickname ===
          "e9eb971e-70bc-4e4e-bfd6-38046e326e29"
        ) {
          this.$router.push("/account");
        }
      }
    }
  },

  async beforeDestroy (){
    const item =  localStorage.getItem("StoryRead") ? JSON.parse(localStorage.getItem("StoryRead") as string) : [] as any;
    if((this as any).$store.state.auth.token){
        await Gatway.postService('/customers/cookie', {item} as any) 
    }
  }
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
.not-ip {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topbar-f{
  height: 56px;
}
</style>
