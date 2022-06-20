<template>
  <div class="read" id="Read">
    
		<!-- <div class="sticky" :style="'width:'+ Percen +'%'"></div> -->
    <!-- {{read}}  v-if="code !== 401"-->
		<div class="con-read nv-box-white  nv-mt-40"  v-if="read">
        <div class="grod-1">
          <router-link class="nv-btn-gold" :to="'/novel/'+ read.novel_data_id"><span class="pc"><i class="fas fa-chevron-left"></i></span> <span class="mobile"><i class="fas fa-chevron-left"></i></span></router-link>
          <div class="nv-btn-gold contai-sarabun" @click="opanSarabun()"><span class="pc"><i class="fas fa-list"></i></span> <span class="mobile"><i class="fas fa-list"></i></span>
             <!-- <ReadSarabun  /> -->
             <component :is="current" v-on:sarabun-buy="Sarabunbuy" :uuid="read.novel_data_id"></component>
          </div>
					<div class=" line-1"> {{read.name}}</div>
        </div>
        <div class="box-percen">
					<!-- <div class="Percen">{{Percen}}%</div> -->
					<div>
						<div class="nv-btn-gold cuttom" @click="opencutom"> <span class="pc">Aa</span> <span class="mobile">Aa</span></div>
						<Customize/>
					</div>
        </div>
      </div>
      <!-- {{read}}  v-if="code !== 401"-->
    <div class="nv-box-white box-read" v-if="read">
      <div class="nv-mt-30">
        <div class="name-story line-1" >{{read.name}}</div>
        <div class="nv-mt-20 story" v-html="read.detail" :style="'font-size:' + fonrsize + 'px'">
         
        </div>
        <!-- <div class="hr">
          <hr />
        </div> -->
        <div class="next-back" v-if="previous">
          <!-- <div style="display: flex;     align-items: center;grid-gap: 10px;">
            <input type="checkbox"  :checked="cleck" @change="switchsell" id="switch" /><label for="switch">Toggle</label> 
            <div>ซื้อนิยายอัตโนมัติ</div>
          </div> -->
          <div v-if="read.ep_no === 1"></div>
          <div v-else @click="EpฺBack(previous)" class="nv-btn-gold-ep">ตอนที่แล้ว</div>
          <!-- <div class="con-btn-next">
            <div class="btn-setting"  @click="$base.openmodal('buy-novel-ep-auto', 'create-novel-show', 0)"><i class="fas fa-cog"></i></div> -->
          <div @click="EpNext(next)" class="nv-btn-gold-ep">ตอนถัดไป</div>
          <!-- </div> -->
        </div>
      </div>
    </div>
     <!-- v-else -->
     <!-- <div class="nv-box-white sell">
          <div>
            คุณยังไม่ได้ซื้อนิยายตอนนี้
          </div>
          <button class="nv-btn-yellow read-coin" @click="cleck ? buy(this.read.id) : $base.openlogin() ">คลิกเพื่อซื้อนิยาย <img :src="$path.image('coin-gold.png')" width="20px" /></button>
          
     </div> -->
    <!-- <div class="nv-box-white nv-mt-40">
      <NovelCarousel :opject="recommend" />
    </div> -->
    <div class="nv-box-white nv-mt-40">
      <NovelCarousel v-if="recommend" :opject="recommend" :loop="false"/>
    </div>
    <div class=" nv-box-white nv-mt-40 NovelEditterComment" v-if="profile">
      <NovelEditterComment @click="ClickPost"/>
    </div>
    <div class="nv-box-white nv-mt-40 Comments" v-if="profile">
      <!-- <div class="comment-textarea">
        <textarea rows="10" v-model="commentObj.html"></textarea>
        <button class="nv-btn-yellow" @click="comment('click-post')">ส่ง</button>
      </div> -->
      <Comments :DataComment="DataComment"  @fetch="fetch"/>
    </div>
    <NovelModal classlist="buy-novel-ep-auto" animation="buy-novel-ep-auto-amination" v-if="modalSell">
      <template v-slot:body>
        <div>เปิดรายตอน</div>
        <div  v-if="modalSell" >{{modalSell.name}}</div>
        <img  v-if="modalSell" :src="$path.image('removebg-preview.png')" width="100%" >
        <div class="buy-ep--coin" ><span>{{modalSell.coin}}</span> <img  v-if="modalSell" :src="$path.image('coin-gold.png')" width="20%" ></div>
        <div style="display: flex; align-items: center;grid-gap: 10px;">

            <input type="checkbox"  v-if="modalSell" :checked="cleckAuten" @change="switchsell(read.novel_data_id)" id="switch" />
             ใช้กำลังใจอ่านอัตโนมัติ
          </div> 
        <div class="buy"  v-if="modalSell" @click="buy(modalSell, true)" >ส่งกำลังใจ</div>
      </template>
    </NovelModal>

  </div>
</template>

<script lang="ts">
import { Gatway } from '@/shares/services'
import {sms_alert_BuyEpisoderead } from '@/shares/constants/smsalert'
import { alert } from '@/shares/modules/alert'
import { setAutoBuy, getAutoBuy }  from '@/shares/modules/autobuy'
import { setThreme} from './ReadCustomize'

import Vue from "vue";
export default Vue.extend({
  name: "Read",
  data() {
    return {
      recommend: null,
      fonrsize: localStorage.getItem("fontSize")
        ? parseInt(localStorage.getItem("fontSize") as string)
        : 20,
      Theme: "",
      fontStyle: "",
			Percen: 0,
      read:null as any,
      next:null,
      previous:null,
      code:401,
      cleckAuten: false,
      // IDnovel:this.$route.params.id,
      current:"",
      modalSell:null,
      commentObj:{
        action :'',
        html:'',
        star:'0',
        novel_data_id:'',
        novel_episode_data_id: this.$route.params.slug
      },
      DataComment:[]
    };
  },
  components: {
    NovelCarousel:()=>import("@/components/widget/NovelCarousel.vue"),
		Customize:() => import('./customize/Customize.vue'),
    NovelModal: () => import("@/components/widget/NovelModal.vue"),
    ReadSarabun:() => import('./readsarabun/ReadSarabun.vue'),
    Comments:() => import('@/components/Comments.vue'),
    ReadCommentEp:() =>import('./readcommentep/ReadCommentEp.vue'),
    NovelEditterComment:() =>import('@/components/widget/NovelEditterComment.vue')

  },
  methods: {
		opencutom(){
			let box_cuttom = document.getElementsByClassName("box-cuttom")[0] as HTMLElement
      console.log(box_cuttom.classList)
      if(box_cuttom.classList.length === 1){
        box_cuttom.classList.add("box-cuttom-show")
        this.current = ""
      }
      else{
        box_cuttom.classList.remove("box-cuttom-show")
      }

		},
		onScroll(){
			let story = document.getElementsByClassName("story")[0] as HTMLElement
			let percen = (window.top.scrollY/(story.scrollHeight-500))*100
			percen < 101 ? this.Percen = percen ^ 0 : null
	    if(this.$route.fullPath.split("/")[1] === 'read'){
			  localStorage.setItem("scollbar", window.top.scrollY.toString())
			}
		},
    async getread(Ojb:any){
      if(Ojb.data.data ==="please pay"){
        this.code = 401
      }else{
        
        this.code = await Ojb.data.code
        this.read = await Ojb.data.data.current
        this.next = await Ojb.data.data.next
        this.previous = await Ojb.data.data.previous
        setThreme()
     
 
        let dataitem = {
          id:Ojb.data.data.current.novel_data_id,
          id_ep:Ojb.data.data.current.id,
          // image_data:res.data.data.image_data.url,
          // title:res.data.data.title,
          // name:Ojb.data.data.current.name
          // img: res.data.data.
        }
        console.log(dataitem);
        
        this.$store.commit("setRead", dataitem)
       
      }   
    },
    async cleckNovel(){
      // console.log('fgfggfgf',(this as any).profile);
      
      if((this as any).profile){
        let resguest = await Gatway.getIDService('/guest/novel-episode/read', this.$route.params.slug)
        let resreader = await Gatway.postService('/reader/novel-episode/read', 
        { novel_episode_datas: [this.$route.params.slug], payment_confirmation: resguest.data.code !== 401 ? true : false } as any); 
        let res = await (this as any).cleck === 'true' ? resreader : resguest
        if( res.data.data==="please pay"){
          (this as any).$base.openmodal('buy-novel-ep-auto', 'buy-novel-ep-auto-amination', 0)
        }
        this.cleckAuten = getAutoBuy(res.data.data.current.novel_data_id)
        this.getread(await res) 
        this.tets() 
      }else{
        let resguest = await Gatway.getIDService('/guest/novel-episode/read', this.$route.params.slug)
        this.getread(await resguest) 
        // this.tets() 
      }
      
    },
    switchsell(key:string){
     this.cleckAuten = setAutoBuy(key) 
    },
    async buy(item:any, paymentConfirma:boolean){
      let res = await Gatway.postService('/reader/novel-episode/read', 
      { 
        "novel_episode_datas":[item.id],
        "payment_confirmation":paymentConfirma
      } as any)
  
      
      if( res.data.code===402){
        alert('เหรียญของคุณมีไม่เพียงพอ' , 'error')
      }else if(res.data.data==="please pay"){
          this.cleckAuten === true ? this.AutoBuy(item) : (this as any).$base.openmodal('buy-novel-ep-auto', 'buy-novel-ep-auto-amination', 0)
      }
      else{
        await this.getread(res);
        await this.$router.push('/read/' + item.id);
        this.tets()
        this.$store.commit("reset");
        (this as any).$base.closemodal('buy-novel-ep-auto', 'buy-novel-ep-auto-amination', 0)
        if(paymentConfirma === true){
          if(item.coin !== '0.00'){
            if(item.bought != true){ 
              alert('คุณในซื้อนิยาย ' +  item.coin + ' เหรียญ','success')
              // alert(sms_alert_BuyEpisoderead("",""),'success')
            }
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      
      // alert('คุณในซื้อนิยาย ' +  item.coin + ' เหรียญ','success')
      // if(res.data.data){
      //   console.log("sdds");  
      // }
      // if (res.data.code !== 402) {
      //   await this.getread(res)
      //   this.$store.commit("reset");
      //   (this as any).$base.closemodal('buy-novel-ep-auto', 'create-novel-show', 0)
      //   window.scrollTo({ top: 0, behavior: 'smooth' })
      //   await this.$router.push('/read/' + item.id)
      //   if(item.coin !== '0.00' && item.bought != true){
      //     alert('คุณในซื้อนิยาย ' +  item.coin + ' เหรียญ','success')
      //   }
      // }else{
      //   alert('เหรียญของคุณมีไม่เพียงพอ' , 'error')
      // }
    },
    async AutoBuy(item:any){
      let res = await Gatway.postService('/reader/novel-episode/read', 
      { 
        "novel_episode_datas":[item.id],
        "payment_confirmation": true
      } as any)
      console.log('AutoBuy', res);
      if(res.data.code=== 402){
         alert('เหรียญของคุณมีไม่เพียงพอ' , 'error')
      }else{
        await this.getread(res);
        await this.$router.push('/read/' + item.id);
        this.tets()
        this.$store.commit("reset");
        alert('คุณในซื้อนิยาย ' +  item.coin + ' เหรียญ','success')
      }
      
    },

    Sarabunbuy(item:any){
      this.modalSell = item;
      this.cleckAutoBuy(item)
      
    },
     EpNext(item:any){
      this.modalSell = item;
      this.cleckAutoBuy(item)
      
    },
    EpฺBack(item:any){
      this.modalSell = item;
      this.cleckAutoBuy(item)
      
    },
    async cleckAutoBuy(item:any){
      console.log(item);
      
      if(item.coin === '0.00'){
        await this.buy(item, true)
      }else{
         await this.buy(item, false)
      }
    },

    opanSarabun(){
      if(this.current !== "ReadSarabun"){
      this.current = "ReadSarabun"
      let box_cuttom = document.getElementsByClassName("box-cuttom")[0] as HTMLElement
			box_cuttom.classList.remove("box-cuttom-show")			
      }else{
        this.current = ""
      }
    },
    async comment(action:any){
      this.commentObj.action = action
      this.commentObj.novel_data_id = this.read.novel_data_id
      this.commentObj.novel_episode_data_id = this.$route.params.slug
      await Gatway.postService('/customers/comments/post', this.commentObj as any)
      this.tets()
     
    },
    fetch(){
      this.tets()
    },
    async ClickPost(html:any){
      console.log(html);
      let data = {
        action:'create-novel-comment-of-ep',
        html:html,
        star:'0',
        novel_data_id:this.read.novel_data_id,
        novel_episode_data_id: this.$route.params.slug
      }
      let res = await Gatway.postService('/customers/comments/post', data as any)
      console.log(res);
      
      this.tets()
      

    },
     async  tets(){
      let res = await Gatway.postService('/customers/comments/comment-episode', { action: 'fetch-comment-episode', novel_episode_data_id: this.$route.params.slug} as any) 
      this.DataComment = res.data.data
      
    },
    async getRecommend(){
      let res = await Gatway.getService('/guest/recommended-novel')
      const data = [] as any
      res.data.data.forEach((element:any) => {
        if(element.novel_data){
          data.push(element.novel_data)
        }
      });
      this.recommend = data.splice(0,12)      

    }
    

  },
  async mounted() {
    await this.cleckNovel()
    // setTimeout(()=>, 5000);
    await this.getRecommend()
    // this.tets()
    
    
    
		// window.scrollTo({ top: 0, behavior: 'smooth' })
		// window.addEventListener("scroll", this.onScroll)
  },
});
</script>

<style lang="scss" scoped src="./Read.scss"></style>

