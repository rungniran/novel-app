<template>
<div>
     <!-- <div class="con-promode">
          
            <img :src="promoteData.image_data.url" class="nv-img-novel test" height="200px">
            <div class="detail">
              <div class="title">{{promoteData.title}}</div>
              <div class="view-list pc-view size-view">
                <div class="view">
                  <i class="far fa-eye"></i>
                  <div class="count-numble-view">
                    {{ $filter.NumbertoText(promoteData.ep_total_view) }}
                  </div>
                </div>
                <div class="list">
                  <i class="fas fa-list"></i>
                  <div class="count-numble-view">
                
                      {{ $filter.NumbertoText(promoteData.ep_total_view) }} 
                  </div>
                </div>
              </div>
              <p>{{promoteData.detail}}</p>
              <button
              @click="Next()"
              class="nv-btn-orange Novel-mobile">
              อ่านเลย
            </button>
            </div>
          </div> -->
          

<!-- <div class="main"></div> -->
<div class="footer-promote ">
  <div class="fitter"> </div>

  <div class="content-promode ">
     <div class="con-promode">
          
            <img :src="promoteData.image_data.url" class="nv-img-novel test" @error="$event.target.src = $path.image('loading.png')">
            <div class="detail">
              <div class="title" v-if="!home"> 
                <p class="promoteData">{{promoteData.title}}  นิยายสุดมันส์ดุเดือดไม่แพ้หลงเฉิน ใครที่อ่านหลงเฉิน  </p>
                <p class="promoteData"> <strong> ได้ลดราคาพิเศษเพิ่มอีก 5% </strong></p>
                </div>
                <div v-else class="title">
                  <p class="promoteData">"เนื้อเรื่องสุดเข้มข้นไม่แพ้หลงเฉิน  <strong> แฟนหลงเฉินได้ลดพิเศษ</strong>"</p>
                </div>
              <button
              @click="Next()"
              class="nv-btn-light">
              อ่านเลย
            </button>
            
            </div>
          </div>
  </div>
</div>
<!-- <svg style="position:fixed; top:100vh">
  <defs>
    <filter id="blob">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob"></feColorMatrix>
    
    </filter>
  </defs>
</svg> -->
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
export default Vue.extend({
  name:'promode',
  data(){
    return{
      promoteData:''
    }
  },
   props: {
    msg: {
      type:String,
      default:``
    },
    home:{
      type:Boolean,
      default: false
    }
  },
  methods:{
    Next(){
      // this.$router.push(`/`);
     this.$router.push(`/novel/807A2FA2-D699-4B4E-B49F-F41508F5F051`);
     this.$emit("resetpage")
    //  window.location.reload()

    },
   async  promote(){
      let res = await Gatway.getIDService(
        "/guest/fetch-novel-header",
        (this as any).$promote
      );
      console.log(res.data.data);
      this.promoteData =res.data.data
      
    }
  },
  mounted(){
    this.promote()

  },
  beforeUpdate(){
    // let content =  document.getElementsByClassName('content')[0] as HTMLElement
    // content.style.overflow
  }
})
</script>

<style lang="scss" scoped>
// .fa-list {
//     color: #ffffff !important;
// }
// .fa-eye {
//     color: #ffffff;
// }
strong{
  color: #ebff00;
}
.test{
  height: 200px;
}
.content{
  overflow: hidden !important;
}
.nv-btn-light{
      color: #ffdfdf;
    border: 2px solid #ffdfdf;
       background: #ffffff00;
}
.con-promode{
  overflow: hidden;
  color: #ffffff;
   display: grid;
   grid-template-columns: auto 1fr;
   grid-gap: 40px;
       align-items: center;
}
.detail{
   display: flex;
    grid-gap: 30px;
    align-items: flex-start;
    flex-direction: column;
}
.title{
      font-size: 23px;
   font-family: Sarabun,sans-serif;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    // color: #ffcece;
     color: #fff;
    gap: 7px;

}
.test{
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
@media (max-width: 415px) {
  .bubbles{
    width: 400px;
     left:-100px;
  }
	.con-promode{
   grid-template-columns: auto 1fr;
   grid-gap: 20px;
       justify-items: center;
}
.test{
  height: 150px;
}
.title{
  font-size: 16px;
    //   -webkit-margin-before: 1em;
    // margin-block-start: 1em;
    // -webkit-margin-after: 1em;
    // margin-block-end: 1em;
    line-height: 1.7;
}
.detail{
      flex-direction: column;
      grid-gap: 10px;
}
}
.bg-color-theme{
   padding: 0  !important;
}
// .dark .read .footer-promote{
//   --footer-background:#ED5565;

// }
     .fitter{
      position: absolute;
      width: 100%;
      height: 100%;
      background: #4500007b;
     }
    .footer-promote {
      overflow: hidden;
        z-index: 1;
         box-shadow: rgba(138, 0, 0, .70) 0px 0px 24px;
        border-radius: 9px;
       
        // --footer-background: #ED5565 !important;
        background: url(https://cdn.pixabay.com/photo/2017/04/30/15/12/apocalypse-2273069_960_720.jpg) center center/cover ;
        display:grid;
        position: relative;
        grid-area: footer;
        // min-height:12rem;
        .bubbles {
            position: absolute;
            top:0;
            left:0;
            right:0;
            height:1rem;
            background:var(--footer-background);
            filter:url("#blob");
            .bubble {
                position: absolute;
                left:var(--position, 50%);
                background:var(--footer-background);
                border-radius:100%;
                animation:bubble-size var(--time, 4s) ease-in infinite var(--delay, 0s),
                    bubble-move var(--time, 4s) ease-in infinite var(--delay, 0s);
                transform:translate(-50%, 100%);
            }
        }
        .content-promode{
            z-index: 2;
            border-radius: 20px;
            // overflow: hidden;
            display:grid;
            // grid-template-columns: 1fr auto;
            grid-gap: 4rem;
            padding:20px;
            background:var(--footer-background);
            // a, p {
            //     color:#F5F7FA;
            //     text-decoration:none;
            // }
            // b {
            //     color:white;
            // }
      
           
        }
    }




</style>