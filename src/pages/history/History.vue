<template>
    <div class="history">
        <div class="nv-box-white nv-mt-40" >
             <!-- <div class="nv-title history-title" style="al">ประวัติการใช้งาน</div> -->
            <!--<div class="add-coin nv-mt-40">
                <div class="writer-profile">
                    <div class="nv-profile-small" style="background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png) center center/cover ;">
                    
                    </div>
                    <div>
                        <div v-if="profile">{{profile.username}}</div>
                        <div v-if="profile">{{profile.dragon}}</div>
                    </div>
                </div>
            </div> -->
            <div class="tap-writer " >
                <router-link @click.native="changeComponent('HistoryRead')" to="#HistoryRead" :class="current === 'HistoryRead' ? 'nv-s nv-s1 nv-s-active' : 'nv-s nv-s1'">
                    ประวัติการอ่าน
                </router-link>
                <router-link @click.native="changeComponent('HistoryBuy')" to="#HistoryBuy"  :class="current === 'HistoryBuy' ? 'nv-s nv-s2 nv-s-active' : 'nv-s nv-s2'">
                    ประวัติการซื้อ
                </router-link>
            </div>
            <div class="nv-mt-30">
                <component :is="current"></component>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name:"history",
    data() {
        return {
            current:"HistoryRead"
        }
    },
    components:{
        HistoryRead:()=> import('./historyread/HistoryRead.vue'),
        HistoryBuy:()=> import('./historybuy/HistoryBuy.vue')
          
          
    },
    methods:{
        changeComponent(component:string):void{
            this.current = component

        },
        cleckpath():string{
            return this.$route.hash.slice(1)
        },
        opanmodal():void{
             document.getElementsByClassName("contai-modal")[0].classList.add("show")
        },
    },
    mounted(){
       this.cleckpath() === ""
       ? this.changeComponent("HistoryRead")
       : this.changeComponent(this.$route.hash.slice(1))
    },
    
    
})
</script>
<style lang="scss" scoped>
.add-coin{
   display: flex;
   justify-content: space-between;
   align-items: center;
}
.box-coin{
    
    display: flex;
    grid-gap: 20px;
}
.tap-writer{
 
    width: 100%;
    // border: 2px solid rgb(221, 221, 221);
    display: grid;
    grid-template-columns: 1fr 1fr;
    // overflow: hidden;
    border-radius: 5px;
    justify-items: center;

}
.nv-s1{
    border-radius: 5px 0px 0px 5px;
    border-right: 0px solid;
}
.nv-s2{
    border-radius: 0px 5px 5px 0px;
    border-left: 0px solid;
}
.history-title{
    text-align: center;
}

</style>