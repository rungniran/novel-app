<template>

   <div>
     <div class="nv-col-2">
          <div class="nv-title">รีวิวผู้อ่าน ({{dataReview.length }})</div>
          <button
            class="nv-btn-yellow"
            @click="cleck ? $base.openmodal('review-modal', 'review-modal-amination', 1) : $base.openlogin()"
          >
            เขียนรีวิว
          </button>
        </div>
          <div v-if="dataReview.length === 0" class="not">
            ไม่มีความคิดเห็น
          </div>
          <div
            v-for="(item, index) in dataReview.slice(0, reviwe)"
            :key="index"
            class="box-review nv-mt-20"
          >
            <div class="review-profile">
              <div class="con-profile">
                <div
                  class="re-profile"
                  :style="'background: url(' + img + ') center center/cover'"
                ></div>
                <div>
                  <div class="name-review" v-if="item.user">
                    <span v-if="item.user.user_profile_datas[0].user_nickname">{{item.user.user_profile_datas[0].user_nickname}}</span>
                    <span v-else>{{item.user.user_profile_datas[0].first_name}} {{item.user.user_profile_datas[0].last_name}}</span>
                  </div>
                  <div class="review-date">
                    <NovelStar :rating="item.star" />{{$filter.Ago(item.created_at)}}
                  </div>
                </div>
              </div>
              <!-- <pre>{{item.user_id}}</pre> -->
              <div class="review-detail" v-if="item.id">
                <div class="in-review-detail">
                 <i class="far fa-thumbs-up" @click="Clicklike(item.id)"></i>
                  {{item.click_like}}
                </div>
                <div style="position: relative;">
                  <i class="fas fa-ellipsis-v" @click="profile ? openObtion(item.id) :  $base.openlogin()"></i>
                  <div class="option" :id="item.id" v-if="profile"> 
                    <li v-if="item.user_id === profile.id" @click="deleteComment(item.id, index)">ลบความคิดเห็น</li>
    
                    <li v-if="item.user_id !== profile.id">รายงาน</li>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-review" v-html="item.comment">
              
            </div>
          </div>
          <div v-if="dataReview.length > 3" class="view-all" >
            <div class="reviwe" @click="allreviwe" v-if="dataReview.length - reviwe !==0">ดูรีวิวทั้งหมด {{dataReview.length - reviwe}}</div>
            <div class="reviwe" @click="reviwe = 3" v-else>ย่อลง</div>
          </div>
        </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Gatway} from '@/shares/services'
export default Vue.extend({
  name:"NovelReview",
  components:{
    NovelStar:()=> import("@/components/widget/NovelStar.vue"),
  },
  props:{
    dataPreview:[]
  },
  data(){
    return{
      img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      reviwe: 3, 
      dataReview:[]
    }
  },
  methods:{
    openObtion(key:any){
      let option =document.getElementById(key) as HTMLElement
      option.classList.toggle('option-show')
    },
     async comment(Obj:any){
      let res = await Gatway.postService('/customers/comments/post', Obj as any) 
      return res

    },
     async deleteComment(uuid:string){
      let data = {
       action: 'click-delete-post',
       comment_data_id:uuid
     }  
     await this.comment(data) 
    this.getReviewAll()
     
    },
    async Clicklike(uuid:string){
     let data = {
        action: 'click-like',
        comment_data_id:uuid
      }
      await Gatway.postService('/customers/comments/post', data as any);
      this.getReviewAll()
    },
    allreviwe(){
      if((this.dataReview.length - this.reviwe) > 3){
        this.reviwe += 3
      }else{
        this.reviwe += this.dataReview.length - this.reviwe
      }
      
    },
    async getReviewAll(){
        let res = await Gatway.postService('/guest/comments/comment-preview', 
      {
        action:'fetch-preview', 
        novel_data_id:this.$route.params.id
      } as any) 
      console.log('>>>>>>>>>>>>', res.data.data);
      
      this.dataReview = res.data.data
      
    },
  },
  mounted(){
    this.getReviewAll()
      window.onclick = function(event:any) {
   if (!event.target.matches('.fa-ellipsis-v')) {
    var dropdowns = document.getElementsByClassName("option");
    var i = 0;
    for (i ; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('option-show')) {
        openDropdown.classList.remove('option-show');
      }
    }
  }
}
  }
  
})
</script>
<style  lang="scss" scoped >
.not{
 padding: 40px;
 text-align: center;
}
 .option{
   display: none;
   position:absolute;
   padding: 0px;
   box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
   left: -140px;
    top: 0px;
   border-radius: 5px;
   width: 130px;
   background: #ffffff;
 }
 .option-show{
   display: block;
   z-index: 10;
 }
 .fa-ellipsis-v{
   cursor: pointer;
 }
 li{
   padding: 10px 10px;
   cursor: pointer;
   font-size: 14px;
 }
 .box-review {
  display: grid;
  padding: 15px 0px;
  // padding-bottom: 30px;
  grid-template-columns: 1fr;
  border-top: 1px solid #d5d5d5;
  grid-gap: 10px;
}
.review-profile {
  display: flex;
  align-items: flex-start;
  grid-gap: 10px;
  justify-content: space-between;
}
.re-profile {
  border: 1px solid #d0d0d0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e0e0e0;
}
.story-sub {
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
	color: #727272;
}
.text-review {
  font-size: 17px;
  /* color: #565656; */
  margin-left: 60px;
  font-family: "Sarabun", sans-serif;
}
.review-detail {
  display: flex;
  align-items: center;
  justify-content: flex-end;
	grid-gap: 40px;
}
.re-star {
  margin-right: 18px;
}
.re-name {
  font-size: 13px;
}
.con-profile {
  display: flex;
  grid-gap: 10px;
  align-items: center;
}
.name-review {
  display: flex;
  align-items: center;
  // font-size: 18px;
}
.review-date {
  font-size: 13px;
  display: flex;
  align-items: center;
  grid-gap: 10px;
}
.reviwe{
  cursor: pointer;
  font-size: 14px;
}
.reviwe:hover{
  text-decoration: underline;
}
.view-all{
  display: flex;
  gap: 20px;
}
 </style>