<template>
  <div class="Novel">
    <!-- <pre>  {{resGetNovel}}</pre> -->
    <div class="nv-box-white cover-novel nv-mt-40" v-if="resGetNovel">
      <div class="box-nove">
        <div class="image-nv">
					<!-- <canvas id="canvas"></canvas> -->
          <img
            :src=" resGetNovel.image_data ? resGetNovel.image_data.url : $path.image('loading.png')"
            class="nv-img-novel"
            width="100%"
          />
        </div>
        <div class="detail">
					<div>
						<div class="nv-title line-1">{{resGetNovel.title}}</div>
						<router-link style="color: #e4803a;" :to="'/profile/'+resGetNovel.publisher_novel_data_id">{{resGetNovel.novelist}}</router-link>
						<div class="con-review">
                <NovelStar :rating="Math.round (resGetNovel.avg_star)" /> 
                <!-- <span> ({{dataReview.length}}) </span> -->
						</div>
						<div class="nv-mt-10">
						  <router-link to="#" class="nv-tag">ยังไม่มีข้อมูล</router-link> 
						</div>
						<div class="story-sub line-5 " style="margin-top:15px; line-height: 1.6;">
										{{resGetNovel.detail}}
          </div> 
					<div class="view-list nv-mt-10" >
            <div class="view">
              <i class="far fa-eye"></i>
              <div class="count-numble-view">{{ $filter.NumbertoText(resGetNovel.total_view) }}</div>
            </div>
            <div class="list">
              <i class="fas fa-list"></i>
              <div class="count-numble-view">{{ $filter.NumbertoText(Eplist) }}</div>
            </div>
          </div>
					</div>
  
         
          <div class="grud-btn">
            <router-link :to="'/read/' + this.$route.params.id + '/sdhiouhs'">
            <button  class="nv-btn-orange Novel-mobile">อ่าน</button>
            </router-link>
            <button
              class="nv-btn-yellow Novel-mobile"
              @click="cleck ? addBookshelf(resGetNovel.id) : $base.openlogin()"
            >
              ชั้นหนังสือ
            </button>
            <button class="nv-btn-blue share" @click="$router.go(-1)">
              กลับ
            </button>
            <!-- <button class="nv-btn-blue share">
              <i class="fas fa-share-alt"></i>
            </button> -->
            
          </div>
        </div>
      </div>
    </div>
    <!-- -->
    <LoadingNovel v-else/>

    <div class="nv-box-white nv-mt-40" v-if="resGetNovel">
      <div style="    position: relative;">
        <div class="nv-title">เรื่องย่อ</div>
        <div class="story" v-html="resGetNovel.description" style="margin-top:10px; line-height: 2.0; height: 200px;">

        </div>
        <div class="ade"></div>
        <div class="more" @click="more()">ดูเพิ่มเติม</div>
      </div>
      <div class="nv-mt-90">
        <!-- <div class="nv-col-2">
          <div class="nv-title">รีวิวผู้อ่าน ({{dataReview.length }})</div>
          <button
            class="nv-btn-yellow"
            @click="cleck ? $base.openmodal('review-modal', 'review-modal-amination', 1) : $base.openlogin()"
          >
            เขียนรีวิว
          </button>
        </div> -->
        <NovelReview :dataPreview="dataReview" @fetch="reviewFetch" ref="NovelReview" />
        <!-- <div class="nv-mt-20">
          <div
            v-for="(item, index) in resGetNovel.comment_preview.slice(0, 3)"
            :key="index"
            class="box-review"
          >
            <div class="review-profile">
              <div class="con-profile">
                <div
                  class="re-profile"
                  :style="'background: url(' + img + ') center center/cover'"
                ></div>
                <div>
                  <div class="name-review">{{item.user_id}}</div>
                  <div class="review-date">
                    <NovelStar :rating="item.star" />15 กุมภาพันธ์ ค.ศ. 2022
                  </div>
                </div>
              </div>
              <div class="review-detail">
                <div class="in-review-detail">
                 <i class="far fa-thumbs-up"></i>
                  
                </div>
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
            <div class="text-review" v-html="item.comment">
              
            </div>
          </div>
          <div v-if="resGetNovel.comment_preview.length > 3" class="view-all">ดูรีวิวทั้งหมด</div>
        </div> -->
      </div>
    </div>
    <div class="nv-box-white  nv-mt-40 con-Sarabun">
      <div v-if="dataMomentEp.length === 0" >
        ยังไม่มีตอนนิยาย
      </div>
      <div v-else>
        <div class="sarabun nv-col-2">
          <div class="nv-title">สารบัญ</div>
          <div style="display: flex; align-items: center;">
          <!-- <input type="checkbox"  :checked="cleckAuten" @change="switchsell" id="switch" />&nbsp;
             ทดสอบซื้ออัตโนมัติ &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;
          <div @click="sort()" >เรียง</div> &nbsp; &nbsp; -->
          <button
            class="nv-btn-light-blue"
            @click="cleck ?  $refs.NovelBuySet.open() : $base.openlogin()"
          >
            ช่วงราคา
          </button>
          </div>
        </div>
        <div  id="sortMomentEp">
          <div v-for="(item, index) in dataMomentEp" :key="index">
            <div class="box-price_range" @click="openEp(index)" v-if="item.ep.length !== 0">
              <div >{{item.moment}} </div>
              <div>
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
            <div class="container-ep">
              <!-- :to="'/read/' + NovelID + '/' + itemep.id" -->
              <div v-for="(itemep, index) in item.ep"
                :key="index"
                @click="openmenuBuy(itemep)"
								
              >
              <div :class="'mobile ep ep' + index">
                <div class="con-h">
                  <div  class="line-1">#{{itemep.ep_no}} 
                    <span v-if="itemep.name.length > 30">{{itemep.name.slice(1,30)}}...</span>
                    <span v-else>{{itemep.name}}</span></div>
                  <div class="con-coin" v-if="itemep.coin !== '0.00'">
                    <div class="con-coin" v-if="itemep.bought === false">
                      <img :src="$path.image('coin-gold.png')" width="20px" />
                      <span class="count-coin">{{itemep.coin}}</span>
                    </div>
                    <div class="con-coin" v-else>
                       <img :src="$path.image('coin-gray.png')" width="20px" />
                       <span class="count-coin" style="color: #cecece;">{{itemep.coin}}</span>
                    </div>
                  </div>
                  
                </div>
                <div class="con-h">
                    <!-- <div></div> -->
                     <div class="date">{{itemep.timestamp.split(' ')[0]}} {{itemep.timestamp.split(' ')[1]}} {{itemep.timestamp.split(' ')[2]}}</div>
                </div>
              </div>
              <div :class="'pc ep ep' + index">
                <div class="line-1">#{{itemep.ep_no}} 
                  <span v-if="itemep.name.length > 50">{{itemep.name.slice(1,50)}}...</span>
                  <span v-else>{{itemep.name}}</span>
                </div>
                <div class="detail-ed">
                  <div class="con-coin" v-if="itemep.coin !== '0.00'">
                    <div class="con-coin" v-if="itemep.bought === false">
                      <img :src="$path.image('coin-gold.png')" width="20px" />
                      <span class="count-coin">{{itemep.coin}}</span>
                    </div>
                    <div class="con-coin" v-else>
                       <img :src="$path.image('coin-gray.png')" width="20px" />
                       <span class="count-coin" style="color: #cecece;">{{itemep.coin}}</span>
                    </div>
                  </div>
                  <div class="con-coin" v-else>
                    <img width="20px" />
                    <!-- <span class="count-coin">{{itemep.coin}}</span> -->
                  </div>
                  <div class="date">{{itemep.timestamp}}</div>
                  <div><i class="far fa-eye"></i> {{$filter.NumbertoText(itemep.count_view) }}</div>
                  <div><i class="far fa-comment"></i> 8</div>
                </div>

              </div>
              </div>
              


            </div>
          </div>
        </div>
      </div>


      <!-- <div class="nv-mt-30">
        <div class="nv-title">เผยแพร่โดย</div>
        <div class="writer-sarabun">
          <div class="writer-profile">
            <div class="img-profile"></div>
            <div>
              <div>Novel Kingdom</div>
              <small>@rugnzdfv</small>
            </div>
          </div>
          <div class="writer-detail">
            <div>1 เรื่อง</div>
            <div>1599 ผู้ติดตาม</div>
            <button
              class="nv-btn-orange"
              @click="cleck ? null : $base.openlogin()"
            >
              ติดตาม
            </button>
          </div>
        </div>
      </div> -->


    </div>

    <div class=" nv-box-white nv-mt-40">
        <div >
        <div class="nv-title">เผยแพร่โดย</div>
        <div class="writer-sarabun">
          <div class="writer-profile">
            <div class="img-profile"></div>
            <div>
              <div>{{resGetNovel.publisher_novel_data_id}}</div>
              <small>ไม่มีข้อมูล</small>
            </div>
          </div>
          <div class="writer-detail">
            <div>ไม่มีข้อมูล</div>
            <button
              class="nv-btn-orange"
              @click="cleck ? null : $base.openlogin()"
            >
              ติดตาม
            </button>
          </div>
        </div>
      </div>
    </div>
		<!-- <div class=" nv-box-white tab-ser nv-mt-40">
			<div :class="current=== 'DragonHouse' ? 'se active' : 'se'" @click="current= 'DragonHouse'">ทำเนียบนักรบโลหิตมังกร</div>
			<div :class="current=== 'CheerUp' ? 'se active-cheer' : 'se'"  @click="current= 'CheerUp'">ส่งกำลังใจ</div>
		</div> 
		<div class=" nv-box-white dash nv-mt-40">
			<component :is="current"></component>
		</div>-->
    <div class=" nv-box-white dash nv-mt-40">
      <DragonHouse/>
    </div>
    <div class=" nv-box-white nv-mt-40 NovelEditterComment" v-if="profile">
      <div class="title-com">แสดงความคิดเห็น</div>
      <NovelEditterComment @click="ClickPost"/>
    </div>
    <div class=" nv-box-white nv-mt-40 Comments" v-if="datacomment.length !== 0" >
      <Comments :DataComment="datacomment" @fetch="fetch"/>
    </div>
     <NovelModal classlist="buy-novel-ep-auto" animation="buy-novel-ep-auto-amination">
      <template v-slot:body>
        <div style="font-size: 23px;">เปิดรายตอน</div>
        <div id="epName" class="line-1"></div>
        <img class="dagod" :src="$path.image('removebg-preview.png')" width="50%" >
        <div class="buy-ep--coin" ><span id="epCoin"></span> <img :src="$path.image('coin-gold.png')" width="20%" ></div>
        <div style="display: flex;    align-items: center;grid-gap: 10px;">
          <!-- @click="cleck ? null : $base.openlogin()" -->
            <input type="checkbox"  :checked="cleckAuten" @change="switchsell" id="switch" />
             เลือกเพื่อซื้ออัตโนมัติ
          </div> 
        <div class="buy" id="" @click="buy">ซื้อนิยาย</div>
      </template>
    </NovelModal>
    <ReviewModal @ResetReviwe="reviewFetch"/>
    <NovelBuySet ref="NovelBuySet"/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

// import { getRGB } from "@/shares/modules/color"
import { Gatway } from "@/shares/services"
import { alert } from '@/shares/modules/alert'
import { setAutoBuy, getAutoBuy }  from '@/shares/modules/autobuy'
import "highlight.js/styles/tomorrow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
export default Vue.extend({
  name: "Novel",
  components: {
    NovelStar:()=> import("@/components/widget/NovelStar.vue"),
		DragonHouse:()=> import("./dragonhouse/DragonHouse.vue"),
    LoadingNovel:()=> import("@/components/loader/LoadingNovel.vue"),
    NovelModal: () => import("@/components/widget/NovelModal.vue"),
    ReviewModal: ()=> import("./reviewmodal/ReviewModal.vue"),
    Comments:() => import('@/components/Comments.vue'),
    NovelReview:()=> import('./NovelReview/NovelReview.vue'),
    NovelEditterComment:()=> import('@/components/widget/NovelEditterComment.vue'),
    NovelBuySet:()=> import('./NovelBuySet/NovelBuySet.vue'),
		// CheerUp:()=> import("./cheerup/CheerUp.vue")
  },
  data() {
    return {
      review: [...Array(6).keys()],
      price_range: [...Array(6).keys()],
      img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
			current: "DragonHouse",
      resGetNovel:null as any,
      dataMomentEp:null,
      NovelID: this.$route.params.id,
      EpID:'',
      cleckAuten: getAutoBuy(this.$route.params.id),
      datacomment:[],
      dataReview:[],
      Eplist:''
    };
  },
  methods: {
    openEp(key: number): void {
      const con_ep = document.getElementsByClassName("container-ep")[
        key
      ] as HTMLElement;
      const chevron = document.getElementsByClassName("fa-chevron-right")[
        key
      ] as HTMLElement;
      if (con_ep.style.display === "block") {
        con_ep.style.display = "none";
        chevron.style.transform = "rotate(0deg)";
      } else {
        chevron.style.transform = "rotate(90deg)";
        con_ep.style.display = "block";
      }
    },
     async getnNovel() {
      const resGetNovel = await Gatway.getIDService((this as any).cleck === "true" ? '/novel/novel-data' : '/guest/novel/novel-data',this.$route.params.id);
      console.log('asdsd',resGetNovel);
      this.Eplist  = resGetNovel.data.data.novel_episode_datas.length
      // if(resGetNovel.data.status === true){
        this.momentEp(resGetNovel.data.data.novel_episode_datas)
      // }else{
      //   this.resGetNovel = null
      // }
    },

    async getEp(){
     let res = await Gatway.getIDService('/guest/fetch-novel-header', this.$route.params.id)
     console.log('>>>>',res.data.data);
      this.resGetNovel = await res.data.data
     
    },
    async openmenuBuy(item:any):Promise<void>{
      if(item.coin === '0.00'){
        this.$router.push(`/read/${item.id}`)
      }else{
        (this as any).cleck === "true"
        ? this.bought(item)
        : (this as any).$base.openlogin()
      }
    },
    async bought(item:any){
      if(item.bought === true){
        this.$router.push(`/read/${item.id}`)
      }   
      else{
        if (this.cleckAuten === true){
          this.EpID = await item.id,
          this.buy()
        }else{
          const epName = document.getElementById('epName') as HTMLElement
          const epCoin = document.getElementById('epCoin') as HTMLElement
          epName.innerHTML = item.name
          epCoin.innerHTML = item.coin
          this.EpID = item.id;
          console.log();
          
          (this as any).$base.openmodal('buy-novel-ep-auto', 'buy-novel-ep-auto-amination', 0)
        }
      }
    },
    async buy(){
      let res = await Gatway.postService('/reader/novel-episode/read', 
      { 
        "novel_episode_datas":[ this.EpID],
        "payment_confirmation":true
      } as any)
      if (res.data.code !== 402) {
        this.$store.commit("reset")
        alert('คุณในซื้อนิยาย ' +  res.data.data.current.coin + ' เหรียญ' , 'success')
        this.$router.push(`/read/${this.EpID}`)    
      }else{
        alert('เหรียญของคุณมีไม่เพียงพอ' , 'error')
      }
    },
    switchsell(){
     this.cleckAuten = setAutoBuy(this.$route.params.id)
    },
    async momentEp(countEp: any) {
      let ep = 0;
      let [eplast, eplastStas]  = [50,50] as any[];
      let arraymoment = [] as any;
      let count = countEp.length / eplast;
      let momentCount = count + 0.00; 
      if(countEp.length > 0){
        for (let i = 0; i < ~~ momentCount + 1; i++) {
        setTimeout(()=> { 
          console.log(eplast,'<', countEp.length); 
          if(countEp.length <= eplast){
            arraymoment.push({
              moment: `บทที่ ${ep + 1} - ${countEp.length}`,
              ep: countEp.slice(ep, eplast),
            });
            ep = +eplast;
            eplast = eplast + eplast;
          }else{
            arraymoment.push({
              moment: `บทที่ ${ep + 1} - ${eplast}`,
              ep: countEp.slice(ep, eplast),
            });
            ep =+ eplast;
            eplast = eplast + eplastStas;
          }
         }, i * 10);
          
        }
      }
      this.dataMomentEp = await arraymoment
      setTimeout(() => {
        // this.openEp(0)
      }, 100);
      
    },
    async addBookshelf(uuid:string){
      let res = await Gatway.getIDService('/customers/novel/add-bookshelf', uuid )
      alert(res.data.data,'success')
    },
    sort(){
      let test = document.getElementById('sortMomentEp') as HTMLElement
      test.style.flexDirection = "column-reverse"
    },
    fetch(){
      this.getCommentAll()
      this.getEp()      
    },
    reviewFetch(){
      (this as any).$refs.NovelReview.getReviewAll()
    },
    async ClickPost(html:any){
      let data ={
        action: 'create-novel-comment',
        html: html,
        star:'0',
        novel_data_id :this.$route.params.id
      }
      let res = await Gatway.postService('/customers/comments/post', data as any)
      console.log(res);
      this.getCommentAll()
    },
    async getCommentAll(){
      let data ={
        action:'fetch-comment-all', 
        novel_data_id:this.$route.params.id
      }
      let res = await Gatway.postService('/guest/comments/comment-all', data as any) 
      this.datacomment = res.data.data
      setTimeout(async ()=> {
        if(this.$route.name === 'Novel'){
          this.getCommentAll();
        }
        
      }, 30000)
    },


    async getReviewAll(){
        let res = await Gatway.postService('/guest/comments/comment-preview', 
      {
        action:'fetch-preview', 
        novel_data_id:this.$route.params.id
      } as any) 
      console.log( res.data.data);
      
      this.dataReview = res.data.data
      this.countReview(res.data.data)
      
    },
    more(){
      let story = document.getElementsByClassName('story')[0] as HTMLElement
      let more = document.getElementsByClassName('more')[0] as HTMLElement
      let ade = document.getElementsByClassName('ade')[0] as HTMLElement
      // story.style.height = story.scrollHeight +'px'
      // console.log(story);
      
      // // story.classList
      console.log(story.style.height);
      if(story.style.height == '200px'){
        story.style.height = story.scrollHeight +'px'
        more.innerHTML = 'ย่อลง'
        ade.style.display = 'none'

      }else{
        story.style.height = 200 +'px'
        more.innerHTML = 'ดูเพิ่มเติม'
        ade.style.display = 'flex'
      }
      
    },
    countReview(data:any){
      console.log(data);
      for(let i= 1; i < data.length; i++){
        console.log(data[i]);
        
      }
      
    }
    
 
  },
  
	mounted(){
    this.getEp()
    this.getCommentAll()
    this.getReviewAll()
    this.getnNovel()
    
		// let img = document.getElementsByClassName('nv-img-novel')[0] as HTMLImageElement
		// let image_nv = document.getElementsByClassName('image-nv')[0] as HTMLElement
    // // let shadow = document.getElementsByClassName('nv-shadow')[0] as HTMLImageElement
		// setTimeout(()=>{
		// 	let  {r,g,b} = getRGB(img)
		// image_nv.style.background = `rgb(${r},${g},${b})`
    // // shadow.style.boxShadow = `rgb(${r},${g},${b}) 0px 7px 29px 0px`
 
		// },1000)
		
		// console.log(R.r);
		
	}
});
</script>
<style  lang="scss" scoped src="./Novel.scss"></style>
