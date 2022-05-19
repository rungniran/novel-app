<template>
  <div class="NovelConfirm " :id="idcon">
      <div class="con-confirm" :id="id">
        <div class="haeder-confirm" :style="'background:' + color ">
          <div>{{title}}</div>
          <div></div>
        </div>
        <div class="mss-confirm">
          <slot name="body" />
        </div>
        <div class="con-button" v-if="button === true">
          <div></div>
          <div class="box-button">
            <button class="cancel" @click="close()">ยกเลิก</button>
            <button class="confirm" :style="'background:' + color + ' ;border: 1px solid' + color  " @click="submit(true, value)">ยืนยัน
            </button>
            
            <div class="load">
              <!-- <img :src="$path.svg('loading.svg')" width="20px" /> -->
              <svg
              version="1.1"
              id="loader-1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="25px"
              height="25px"
              viewBox="0 0 50 50"
              style="enable-background:new 0 0 50 50;"
              xml:space="preserve"
            >
              <path
                :fill="color"
                d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
          </div>
        </div>
        <div v-else class="con-button">
          <div></div>
          <div class="box-button">  
          <button class="cancel" @click="close()">ยกเลิก</button>
          <slot name="button" />
          </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name:"NovelConfirm",
  props:{
    color:String,
    title:String,
    id:String,
    idcon:String,
    value:String,
    index:Number,
    button:Boolean
  },
  methods:{
    submit(value:boolean, uuid?:string):void{
        this.$emit("confirm", {value,uuid} )
    },
    submitchange(value:boolean){
         this.$emit("change", value)
    },
    close(){
      this.$emit("confirm", false)
      document.getElementById(this.idcon)?.classList.remove("NovelConfirm-show")
      document.getElementById(this.id)?.classList.remove("con-confirm-show")
    }
  }
  
})
</script>
<style lang="scss">
.NovelConfirm{
  position: fixed;
  width: 100%;
  background: #ffffffcc;
  height: 100vh;
  font-family: "Sarabun", sans-serif;
  z-index: 1500;
  top: 0;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: .3s;
  pointer-events: none;
 
}
.NovelConfirm-show{
    opacity: 10;
    pointer-events: auto;
}
.con-confirm{ 
  color: #000;
  background: #ffffff;
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.2);
  margin: 20px;
  // padding: 20px;
  border-radius: 7px;
  overflow: hidden;
  min-width: 400px;
  opacity: 0;
  transition: .3s;
  transform: scale(0.7);
}
.con-confirm-show{
  opacity: 10;
  transform: scale(1.0);
}
.haeder-confirm{
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  background: #ff6b6b;
  padding: 15px 20px;
  color: #ffffff;
}
.mss-confirm{
  padding: 20px 20px;
}
.con-button{
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  padding-top: 0px;
}
.box-button{
  display: flex;
  grid-gap: 10px;
}
.btn{
  padding: 8px 25px;
  border-radius: 5px;
  cursor: pointer;
}
.cancel{
  @extend .btn;
  background: #fff;
  border: 1px solid #b8b8b8;
  color: #636363;
}

.confirm{
  @extend .btn;
  background: #ff6b6b;
  border: 1px solid #ff6b6b;
  color: #fff;
}
.load{
  display: none;
  align-items: center;
  justify-content: center;
  padding: 5px 29.5px;
}
.load-show{
  display: flex;
}
.confirm-none{
  display: none;
}
</style>