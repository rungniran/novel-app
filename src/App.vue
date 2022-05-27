<template>
    <div id="app">
        
        <Login/>
        <TopBar/>
            <div class="content">
                <router-view/>
            </div>
        <!-- <Footer/> -->
        <NovelAlertSystem/>
    </div>
</template>

<script lang="ts" >
import Vue from 'vue'
import Login from '@/components/Login.vue'
export default Vue.extend({
    name: "App",
    components: {
        TopBar: ()=> import('@/layouts/TopBar.vue'),
        // Footer: ()=> import('@/layouts/Footer.vue'),
        Login: ()=> import('@/components/Login.vue'),
        NovelAlertSystem:()=> import('@/components/widget/NovelAlertSystem.vue')

    },
    mounted(){
        // localStorage.clear()
      this.$store.commit("reset")
    }
});
</script>

<style>

</style>
