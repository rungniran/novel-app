<template>
  <div :class="`contai-modal ${Classa}`" @click="onmouse == false ? close() : null" :id="ID" >
    <!-- {{onmouse}} -->
    <div class="contai-modal-crad" :id="IDCrad" :style="'width:' + width ">
      <i v-if="Close === true" class="fas fa-times-circle" @click="close()"></i>
      <slot name="body" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NovelModal2",
  data() {
    return {
      onmouse: true,
    };
  },
  props: {
    ID: {
      type: String,
      default: "ID",
    },
    IDCrad: {
      type: String,
      default: "IDCrad",
    },
    Close: {
      type: Boolean,
      default: false,
    },
    width:{
      type:String,
      default:'auto'
    },
    Classa:{
      type:String,
      default:'sa'
    },
    Onmouse:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    close(): void {
      let id = document.getElementById(this.$props.ID) as HTMLElement;
      let idCrad = document.getElementById(this.$props.IDCrad) as HTMLElement;
      id?.classList.remove("show");
      idCrad?.classList.remove("contai-modal-crad-show");
    },
    open(): void {
      let id = document.getElementById(this.$props.ID) as HTMLElement;
      let idCrad = document.getElementById(this.$props.IDCrad) as HTMLElement;
      id?.classList.add("show");
      idCrad?.classList.add("contai-modal-crad-show");
    },
  },
  mounted() {
    if(this.$props.Onmouse ===true){
    let elememt = document.getElementById(this.$props.IDCrad) as HTMLElement;
      if(elememt){
        elememt.onmouseover = () => {
          this.onmouse = true;
        };
        elememt.onmouseout = () => {
          this.onmouse = false;
        };
      }
    }
    
  },
});
</script>
<style lang="scss" scoped>
#PromotionModalCard{
  overflow: hidden;
}
.contai-modal {
  top: 0;
  left: 0;
  z-index: 3000;
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000c4;
  opacity: 0;
  transition: 0.3s;
  pointer-events: none;
}

.show {
  opacity: 10;
  pointer-events: auto;
}
.contai-modal-crad {
    overflow: hidden;
  position: relative;
  transition: 0.3s;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  transform: scale(0.9);
}
.contai-modal-crad-show {
  transform: scale(1);
}
#WriterWithdrawMoneyCrad {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  text-align: center;
  gap: 10px;
}
#buysetCrad{
   max-height: 100vh;
   overflow-y: scroll;
}  
.fa-times-circle {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
#NovelConfirmCead {
  display: flex;
  flex-direction: column;
  align-items: center;
  // gap: 10px;
  min-width: 350px;
}
#buyNovelEpAutoCard {
  background: #ffffff;
  display: flex;
  grid-gap: 10px;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 20px 40px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  border-radius: 10px;
  max-width: 470px;
  transition: 0.1s;
}
#createNovelCrad {
  position: absolute;
  top: 70px;
}
#BuyBovelEpAutoCrad {
  background: #ffffff;
  display: flex;
  grid-gap: 10px;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 20px 40px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  border-radius: 10px;
  max-width: 470px;
}
#testCrad{
    width: 100%;
    height: 100vh;
}
#ModalConditionsCrad {
  height: 90vh;
  border-radius: 15px;
  transition: 0.3s;
  // overflow-y: scroll;
  max-width: 850px;
  padding: 40px 0px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
#PromotionModalCard{
  padding: 0px;
}

#StickerCard{
  min-height: 450px;
  position: relative;
  overflow: hidden;
  width: 550px !important; 
}
@media (max-width: 415px) {
  #buysetCrad {
    height: auto;
    overflow-y: scroll;
  }
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #96969600;
}

::-webkit-scrollbar-thumb {
  background: #bfbfbf7d;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8484849e;
}
#NovelConfirmCead{
  padding:0px; 
   box-shadow: 0 10px 50px 0 rgb(0 0 0 / 20%);
}

.bg-w{
      background: #ffffffcc;
         
}
#ExchangeCrad{
  padding: 0px;
}
// #clecktimeCrad #clecksellCrad
</style>
