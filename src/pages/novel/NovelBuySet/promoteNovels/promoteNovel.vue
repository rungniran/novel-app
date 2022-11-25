<template>
<div>
<div class="footer-promote ">
  <div class="content-promode ">
     <div class="con-promode">
          
            <img :src="promoteData.image_data.url" class="nv-img-novel test" height="300px">
            <div class="detail">
              <div class="title">{{promoteData.title}} <img :src="$path.image('dragon11.png')" width="50px"></div>
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
                
                      {{ $filter.NumbertoText(promoteData.ep_count) }} 
                  </div>
                </div>
              </div>
              <p>{{promoteData.detail}}</p>
              <button
              @click="Next()"
              class="nv-btn-light">
              อ่านเลย
            </button>
            
            </div>
          </div>
  </div>
</div>
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
  methods:{
    Next(){
     this.$router.push(`/novel/807A2FA2-D699-4B4E-B49F-F41508F5F051`);
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
.fa-list {
    color: #ffffff !important;
}
.fa-eye {
    color: #ffffff;
}
.content{
  overflow: hidden !important;
}
.con-promode{
  overflow: hidden;
  color: #ffffff;
   display: grid;
   grid-template-columns: auto 1fr;
   grid-gap: 40px;
}
.detail{
   display: flex;
    grid-gap: 30px;
    align-items: flex-start;
    flex-direction: column;
}
.title{
  font-size: 23px;
      width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

}
.test{
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
@media (max-width: 415px) {
  .bubbles{
    // width: 400px;
     left:-100px;
  }
	.con-promode{
   grid-template-columns: 1fr;
   grid-gap: 40px;
       justify-items: center;
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

    .footer-promote {
        z-index: 1;
        --footer-background:#ED5565 !important;
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
            padding:2rem;
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
.dark .read .footer-promote{
  --footer-background:#ED5565 !important;

}


</style>