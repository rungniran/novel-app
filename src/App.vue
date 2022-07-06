<template>
    <div id="app" >
        <Login/>
        <TopBar @closed="closedLeftMenu"/>
            <div class="content">
                <router-view/>
            </div>
        <Footer/>
        <NovelAlertSystem/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//   if (
//     e.keyCode === 123 ||
//     ctrlShiftKey(e, 'I') ||
//     ctrlShiftKey(e, 'J') ||
//     ctrlShiftKey(e, 'C') ||
//     (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
//   )
//     return false;
// };

export default Vue.extend({
    name: "App",
    components: {
        TopBar: ()=> import('@/layouts/TopBar.vue'),
        Footer: ()=> import('@/layouts/Footer.vue'),
        Login: ()=> import('@/components/Login.vue'),
        NovelAlertSystem:()=> import('@/components/widget/NovelAlertSystem.vue')

    },
    mounted(){
        // localStorage.clear()
        
      this.$store.commit("reset");
    //   (this as any).$analytics.logEvent("notification_received");
    },
    methods:{
        closedLeftMenu(){
            console.log("closedLeftMenu")
        }
        
    }
});
</script>

<style>

</style>
