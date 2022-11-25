<template>
  <div>
    <div class="img-cover">
      <div
        class="img-profile"
        style="
          background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png) center center/cover;
        "
      >
      </div>
    </div>
    <div class="contant">
        <div class="box-username">
            <div v-if="profile" class="nv-username">
               <span v-if="data.user_profile_datas[0].user_nickname">    {{ data.user_profile_datas[0].user_nickname}} </span>
               <span v-else>{{ data.user_profile_datas[0].first_name}} {{ data.user_profile_datas[0].last_name}}</span>
            </div>
            <div v-if="profile" >#นักรบมังกร</div>
            <!-- <div class="level">
                <div class="teb-level"></div>
            </div>
            <div class="nv-mt-10">
                Exp 1/ 100
            </div> -->
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name:"cover",
    props:{
       data:{}
    },
    data() {
        return {
            lv: 65
        }
    },
    methods:{
        lev():void{
            setTimeout(()=>{
                const l = document.getElementsByClassName("teb-level")[0] as HTMLElement
                l.style.width = (this as any).data.user_profile_datas[0].user_level + "%"
            }, 600)
        }
    },
    mounted(){
        this.lev()
    }
})
</script>
<style lang="scss" scoped>
$topcover: 100px ;
.img-cover{
    position: absolute;
    display: flex;
    justify-content: center;
    left: 0px;
    top: 0px;
    height: $topcover;
    width: 100%;
    background: linear-gradient(180deg, #61BCBE 10.94%, #81AAD8 49.48%, #AB93F9 100%);
}
.img-profile{
    position: absolute;
    width: 130px;
    height: 130px;
    border-radius: 100%;
    background: #848484;
    margin: auto;
    bottom: -60px;
    display: flex;
    justify-content: center;
}
.Lv{
   position: absolute;
   bottom: -10px;
   background: #1D2044;
   width: 100px;
   padding: 2px 20px;
   display: flex;
   justify-content: center;
   align-items: center;
   color: #fff;
   border-radius: 50px;
}
.contant{
    margin-top: $topcover + 25;
}
.box-username{
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-gap: 5px;
}
.level{
    width: 270px;
    height: 23px;
    border-radius: 30px;
    background: #1d204442;

    margin-top: 10px;
}
.teb-level{
    height: 100%;
    width: 0%;
    border-radius: 30px;
    background: #1d2044;
     box-shadow: 0px 4px 20px #AB93F9;
    transition: 1s;
    // animation-name: example;
    // animation-duration: 2s;
    // animation-fill-mode: both;
}
@media (max-width: 415px) {
    $topcover:  150px ;

    .img-cover{
        height: $topcover;
    }
    .contant{
    margin-top: $topcover + 25;
}
}
</style>
