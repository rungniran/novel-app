<template>
 <NovelModal2 ID="reviewModal" IDCrad="reviewModalCard" ref="Modeal" :Close="true">
      <template v-slot:body>
        <div class="Review">
          <h2 class="Review-title">ความคิดเห็น</h2>
          <!-- <input type="number"> -->
          <div class="rating">
  <label>
    <input type="radio" name="stars" value="1" @change="stars(1)"/>
    <span class="icon"><i class="fas fa-star "></i></span>
  </label>
  <label>
    <input type="radio" name="stars" value="2" @change="stars(2)"/>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
  </label>
  <label>
    <input type="radio" name="stars" value="3" @change="stars(3)"/>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>   
  </label>
  <label>
    <input type="radio" name="stars" value="4" @change="stars(4)"/>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
  </label>
  <label>
    <input type="radio" name="stars" value="5" @change="stars(5)"/>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
    <span class="icon"><i class="fas fa-star "></i></span>
  </label>
</div>
          <textarea v-model="Obj.html" rows="10" cols="50">ssd</textarea>
          <button class="nv-btn-yellow" @click="comment('create-comment-review')">ยืนยัน</button>
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
      }
    }
  },
  methods:{
    callback(e:any){
        this.$emit('click', {e, Obj:this.Obj});
    },
    async comment(action:any){
      this.Obj.action = action;
      console.log(this.Obj);
      
      await Gatway.postService('/customers/comments/post', this.Obj as any);
      this.$emit('ResetReviwe',{});
      (this as any).$refs.Modeal.close()
      // (this as any).$base.closemodal('review-modal', 'review-modal-amination', 1)

    },

    open(){
      (this as any).$refs.Modeal.open();
    },

    stars(value:any){
      console.log(value);
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

</style>