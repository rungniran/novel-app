<template>
<!-- onmousedown='return false;' onselectstart='return false;' -->
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

<script lang="ts" >
import Vue from 'vue'

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
(this as any).$analytics.logEvent("notification_received");
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
