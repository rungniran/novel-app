<template>
 <NovelModal2 ID="reviewModal" IDCrad="reviewModalCard" ref="Modeal" :Close="true">
      <template v-slot:body>
        <div class="Review">
          <h2 class="Review-title">ความคิดเห็น</h2>
          <!-- <input type="number"> -->
          <div class="rating">
  <label>
    <input type="radio"  name="stars" value="1"  v-model="Obj.star"/>
    <span class="icon"><i class="fas fa-star "></i></span>
  </label>
  <label>
    <input type="radio" name="stars" value="2" v-model="Obj.star"/>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
  </label>
  <label>
    <input type="radio" name="stars" value="3" v-model="Obj.star"/>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>   
  </label>
  <label>
    <input type="radio" name="stars" value="4" v-model="Obj.star"/>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
  </label>
  <label>
    <input type="radio" name="stars" value="5" v-model="Obj.star"/>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
  </label>
</div>
          <textarea v-model="Obj.html" rows="10" cols="50"  maxlength="2000">ssd</textarea>
          <button class="nv-btn-yellow" @click="comment('create-comment-review')" :disabled="isloading">ยืนยัน</button>
        </div>
        <div class="loading" v-show="isloading"> 
          <svg
              version="1.1"
              id="loader-1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="70px"
              height="70px"
              viewBox="0 0 50 50"
              style="enable-background:new 0 0 50 50;"
              xml:space="preserve"
            >
              <path
                fill="#fff"
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
      </template>
  </NovelModal2>
</template>
<script lang="ts">
import Vue from 'vue'
import {Gatway} from '@/shares/services'
export default Vue.extend({
  name:"ReviewModal",
  components:{
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
  },
  data(){
    return{
      Obj:{
        action:'',
        star:'0',
        html:'',
        novel_data_id: this.$route.params.id
      },
      isloading:false
    }
  },
  methods:{
    callback(e:any){
        this.$emit('click', {e, Obj:this.Obj});
    },
    async comment(action:any){
      this.isloading = true
      this.Obj.action = action;
      
      let res = await Gatway.postService('/customers/comments/post', this.Obj as any);
      if(res.data.code === 200){
        
        this.reset()
        this.$emit('ResetReviwe',{});
        (this as any).$refs.Modeal.close()
      }
      this.isloading = false
      
      // (this as any).$base.closemodal('review-modal', 'review-modal-amination', 1)

    },
    reset(){
     this.Obj={
        action:'',
        star:'0',
        html:'',
        novel_data_id: this.$route.params.id
      }
    },

    open(){
      (this as any).$refs.Modeal.open();
    },

    stars(value:any){
      this.Obj.star = value
    }
  }
})
</script>
<style lang="scss" scoped>
.Review{
   display: flex;
   flex-direction: column;
   gap: 10px;
}.Review-title{
  font-size: 20px;
  margin-bottom: -10px;
}
.rating {
  display: inline-block;
  position: relative;
  height: 50px;
  line-height: 50px;
  font-size: 25px;
}

.rating label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  cursor: pointer;
}

.rating label:last-child {
  position: static;
}

.rating label:nth-child(1) {
  z-index: 5;
}

.rating label:nth-child(2) {
  z-index: 4;
}

.rating label:nth-child(3) {
  z-index: 3;
}

.rating label:nth-child(4) {
  z-index: 2;
}

.rating label:nth-child(5) {
  z-index: 1;
}

.rating label input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.rating label .icon {
  float: left;
  color: transparent;
}

.rating label:last-child .icon {
  color: #737272;
}

.rating:not(:hover) label input:checked ~ .icon,
.rating:hover label:hover input ~ .icon {
  color: #f4ba40;
}
.rating:hover label:hover input ~ .icon {
   color: #c5c5c5;
}
.rating label input:focus:not(:checked) ~ .icon:last-child {
  color: #000;
  text-shadow: 0 0 5px #09f;
}
.loading{
  position: absolute;
  background: #4d4d4d;
  color: #fff;
  z-index: 2000;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
}
.none{
  display: none;
}

</style>
