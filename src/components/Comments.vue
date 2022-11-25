<template>
  <div class="Commentss">
<!-- {{novelCommentEffet}} -->
    <div v-if="DataComment.length === 0" class="notcomment">
      <EmptyContent
        pathName="8.png"
        text="นิยายตอนนี้ยังไม่มีความคิดเห็น"
        fontSize="30px"
      ></EmptyContent>
    </div>

    <span v-else style="display: grid; gap: 5px">
      <div
        v-for="(item, index) in DataComment"
        :key="index"
        style="display: grid; gap: 5px"
        :id="item.id+'comment-main'"
      >
      <!-- {{item}} -->
        <div :class="item.active ? 'box-review activate-com' : 'box-review' " :id="index+'box-review'">
          <!-- {{item.user.comment_effect_color}} -->
          <div class="box-re-profile">
            <div
              class="re-profile"
              :style="'background: url(' + img + ') center center/cover'"
            ></div>

            <!--$isdrogon.includes(NovelID) ===  <img :src="$path.image('18 adult.png')" width="100px"> || DataComment[0].novel_data_id == '9755FCB8-78CB-42A0-85AC-272845D833C5'-->
          </div>
          <div class="name-review line-1" v-if="novelCommentEffet">
            
             <span
                class="admin-text"
                v-if="
                  item.user.user_profile_datas[0].user_id ===
                  '05A6D4DD-415C-440F-BF9E-3FFA888575A6' &&
                  novelCommentEffet
                "
              >
              {{
                item.user.user_profile_datas[0].user_nickname 
              ? item.user.user_profile_datas[0].user_nickname 
              : item.user.user_profile_datas[0].first_name + "  " + item.user.user_profile_datas[0].last_name
              }}
              </span>
              <span v-else>
                <span v-if="item.user.comment_effect_color" class="glowing-text">
                  {{
                  item.user.user_profile_datas[0].user_nickname 
                ? item.user.user_profile_datas[0].user_nickname 
                : item.user.user_profile_datas[0].first_name + "  " + item.user.user_profile_datas[0].last_name
                }}
                </span>
                <span v-else>
                    {{
                  item.user.user_profile_datas[0].user_nickname 
                ? item.user.user_profile_datas[0].user_nickname 
                : item.user.user_profile_datas[0].first_name + "  " + item.user.user_profile_datas[0].last_name
                }} 
                </span>
              </span>
              <small v-if="item.novel_episode_data" class="space-tags">
                #ตอนที่ {{ item.novel_episode_data.ep_no }}</small
              >
          </div>
          <div class="name-review line-1" v-else>
             {{
                  item.user.user_profile_datas[0].user_nickname 
                ? item.user.user_profile_datas[0].user_nickname 
                : item.user.user_profile_datas[0].first_name + "  " + item.user.user_profile_datas[0].last_name
                }} 
                <small v-if="item.novel_episode_data" class="space-tags">
                #ตอนที่ {{ item.novel_episode_data.ep_no }}</small
              >
          </div>
          <!-- <div v-if="$isdrogon.includes(NovelID ? NovelID : DataComment[0].novel_data_id) ">
            
            <div class="name-review line-1" v-if="item.user">
              <span
                class="adminWeb"
                v-if="
                  item.user.user_profile_datas[0].user_id ===
                  '05A6D4DD-415C-440F-BF9E-3FFA888575A6'
                "
              >
                <span
                  v-if="item.user.user_profile_datas[0].user_nickname"
                  class="admin-text"
                >
                  {{ item.user.user_profile_datas[0].user_nickname }}
                  <i class="edit-icon-admin fa fa-universal-access"></i>
                </span>
                <span v-else class="admin-text">
                  {{ item.user.user_profile_datas[0].first_name }}
                  {{ item.user.user_profile_datas[0].last_name }}2
                  <i class="edit-icon-admin fa fa-universal-access"></i>
                </span>
              </span>
              <span v-else></span>
              <span v-if="item.user.user_profile_datas[0].user_nickname">
                
                <span
                  v-if="item.dagonCheck"
                >
                  <span class="glowing-text">
                    {{ item.user.user_profile_datas[0].user_nickname }}
                  </span>
                </span>

                <span v-else >
                  {{ item.user.user_profile_datas[0].user_nickname }}
                </span>
              </span>
              <span v-else
                >{{ item.user.user_profile_datas[0].first_name }}
                {{ item.user.user_profile_datas[0].last_name }} &nbsp;
              </span>
              <small v-if="item.novel_episode_data" class="space-tags">
                #ตอนที่ {{ item.novel_episode_data.ep_no }}</small
              >
            </div>
          </div> -->
          <!-- <div v-else>
            <div class="name-review line-1" v-if="item.user">
              <span v-if="item.user.user_profile_datas[0].user_nickname"
                >{{ item.user.user_profile_datas[0].user_nickname }}
              </span>
              <span v-else
                >{{ item.user.user_profile_datas[0].first_name }}
                {{ item.user.user_profile_datas[0].last_name }} &nbsp;
              </span>

              <small v-if="item.novel_episode_data" class="space-tags">
                #ตอนที่ {{ item.novel_episode_data.ep_no }}</small
              >
            </div>
          </div> -->
          <div class="comment-detail">
            <!-- <div class="review-detail"></div> -->
            <div class="review-date">{{ $filter.Ago(item.created_at) }}</div>
            <div class="ddd">
              <i
                class="fas fa-ellipsis-v white-icon"
                @click="profile ? openObtion(item.id) : $base.openlogin()"
              ></i>
              <div class="option" :id="item.id" v-if="profile">
                <li
                  v-if="item.user_id === profile.id"
                  @click="deleteComment(item, index)"
                >
                  ลบความคิดเห็น
                </li>
                <li
                  v-if="item.user_id === profile.id"
                  @click="EditComment(item.id)"
                >
                  แก้ไข
                </li>
                <li v-if="item.user_id !== profile.id">รายงาน</li>
              </div>
            </div>
          </div>
          <div></div>
          <div class="box-text-review">
            <span v-if="commentLencount(item.comment) <= 300">
            <div
              class="text-review"
              :id="'comment' + item.id"
              v-html="item.comment"
            ></div>
            </span>
            <span v-else>
               <span
              class="text-review"
              :id="'comment-readmore' + item.id"
              v-html="item.comment.slice(0, 300)"
            ></span>
            <span @click="readmore(item, 'comment-readmore' + item.id, 'readmore'+ item.id)" :id="'readmore' + item.id" class="readmore">.....อ่านเพิ่มเติม</span>
            </span>

            <div class="text-review text-edit" :id="'edit' + item.id">
              <NovelEditterComment
                :htmt="item.comment"
                @click="editcommet(item, $event)"
                :Editer="'html' + item.id"
              />
            </div>
          </div>
          <div class="po-reply">
            <div class="b-t-reply">
              <i class="fa fa-thumbs-up" :id="'like'+ item.id"  @click="isLike ? Clicklike(item.id) : null"></i>
              <span class="totallike" :id="'totallike'+ item.id" v-if="item.click_like !== 0">
                {{ item.click_like }}</span
              >
              <span :id="'totallike'+ item.id" v-else></span>
            </div>
            <div class="b-t-reply" @click="openReply(index, item.reply_comment.length)">
              <i class="fa fa-reply" style="color: #6a70aa"></i
              ><span v-if="item.reply_comment.length !== 0">{{
                item.reply_comment.length
              }}</span>
            </div>
          </div>
    
        </div>
  
        <div :class="item.reply_comment.length >= 1 ? 'reply reply-show': 'reply'">
          <div
            v-for="(itemreply, indexReply) in item.reply_comment"
            :key="indexReply"
            class="box-reply"
          >
            <div class="box-re-profile">
              <div class="con-profile">
                <div
                  class="re-profile"
                  :style="'background: url(' + img + ') center center/cover'"
                ></div>
              </div>
            </div>
            <!-- {} -->
            <div class="name-review line-1" v-if="novelCommentEffet">
            
             <span
                class="admin-text"
                v-if="
                  itemreply.user.user_profile_datas[0].user_id ===
                  '05A6D4DD-415C-440F-BF9E-3FFA888575A6' &&
                  novelCommentEffet
                "
              >
              {{
                itemreply.user.user_profile_datas[0].user_nickname 
              ? itemreply.user.user_profile_datas[0].user_nickname 
              : itemreply.user.user_profile_datas[0].first_name + "  " + itemreply.user.user_profile_datas[0].last_name
              }}
              </span>
              <span v-else>
                <span v-if="itemreply.user.comment_effect_color" class="glowing-text">
                  {{
                  itemreply.user.user_profile_datas[0].user_nickname 
                ? itemreply.user.user_profile_datas[0].user_nickname 
                : itemreply.user.user_profile_datas[0].first_name + "  " + itemreply.user.user_profile_datas[0].last_name
                }}
                </span>
                <span v-else>
                    {{
                  itemreply.user.user_profile_datas[0].user_nickname 
                ? itemreply.user.user_profile_datas[0].user_nickname 
                : itemreply.user.user_profile_datas[0].first_name + "  " + itemreply.user.user_profile_datas[0].last_name
                }} 
                </span>
                
              </span>
              <small v-if="item.novel_episode_data" class="space-tags">
                #ตอนที่ {{ item.novel_episode_data.ep_no }}</small
              >
          </div>
          <div class="name-review line-1" v-else>
             {{
                  itemreply.user.user_profile_datas[0].user_nickname 
                ? itemreply.user.user_profile_datas[0].user_nickname 
                : itemreply.user.user_profile_datas[0].first_name + "  " + itemreply.user.user_profile_datas[0].last_name
                }} 
                <small v-if="item.novel_episode_data" class="space-tags">
                #ตอนที่ {{ item.novel_episode_data.ep_no }}</small
              >
          </div>
    
            <!-- <div v-if="$isdrogon.includes(NovelID ? NovelID : DataComment[0].novel_data_id)">
              <div class="name-review line-1" v-if="itemreply.user">
              <span
                class="adminWeb"
                v-if="
                  itemreply.user.user_profile_datas[0].user_id ===
                  '05A6D4DD-415C-440F-BF9E-3FFA888575A6' 
                "
              >
                <span
                  v-if="itemreply.user.user_profile_datas[0].user_nickname"
                  class="admin-text"
                >
                  {{ itemreply.user.user_profile_datas[0].user_nickname }}
                  <i class="edit-icon-admin fa fa-universal-access"></i>
                </span>
                <span v-else class="admin-text">
                  {{ itemreply.user.user_profile_datas[0].first_name }}
                  {{ itemreply.user.user_profile_datas[0].last_name }}
                  <i class="edit-icon-admin fa fa-universal-access"></i>
                </span>
              </span>
              <span v-else-if="itemreply.user.user_profile_datas[0].user_nickname">

                <span >
                  {{ itemreply.user.user_profile_datas[0].user_nickname }}
                </span>
              </span>
              <span v-else
                >{{ itemreply.user.user_profile_datas[0].first_name }}
                {{ itemreply.user.user_profile_datas[0].last_name }} &nbsp;
              </span>
              <small v-if="itemreply.novel_episode_data" class="space-tags">
                #ตอนที่ {{ itemreply.novel_episode_data.ep_no }}</small
              >
            </div>
          </div>
            <div v-else>
              <div class="name-review line-1">
                <span v-if="itemreply.user.user_profile_datas[0].user_nickname"
                  >{{ itemreply.user.user_profile_datas[0].user_nickname }}
                </span>
                <span v-else
                  >{{ itemreply.user.user_profile_datas[0].first_name }}
                  {{ itemreply.user.user_profile_datas[0].last_name }} &nbsp;
                </span>
              </div>

   
            </div> -->
            <div class="comment-detail">
              <div class="review-date comment-detail line-1" style="text-overflow: ellipsis; 
overflow: hidden; 
white-space: nowrap;">
                {{ $filter.Ago(itemreply.created_at) }}
              </div>
              <div style="position: relative" class="box-option">
                <i
                  class="fas fa-ellipsis-v"
                  @click="openObtion(itemreply.id)"
                ></i>
                <div class="option" :id="itemreply.id" v-if="profile">
                  <li
                    v-if="itemreply.user_id === profile.id"
                    @click="deleteReply(itemreply.id)"
                  >
                    ลบความคิดเห็น
                  </li>
                  <li
                    v-if="itemreply.user_id === profile.id"
                    @click="EditComment(itemreply.id)"
                  >
                    แก้ไข
                  </li>
                  <li v-if="itemreply.user_id !== profile.id">รายงาน</li>
                </div>
              </div>
            </div>
            <div class="box-text-review">
              <!-- <div
                class="text-review"
                :id="'comment' + itemreply.id"
                v-html="itemreply.comment"
              ></div> -->
              <span v-if="itemreply.comment.length <= 300">
            <div
              class="text-review"
              :id="'comment' + itemreply.id"
              v-html="itemreply.comment"
            ></div>
            </span>
            <span v-else>
               <span
              class="text-review"
              :id="'comment-readmore' + itemreply.id"
              v-html="itemreply.comment.slice(0, 300)"
            ></span>
            <span @click="readmore(itemreply, 'comment-readmore' + itemreply.id, 'readmore'+ itemreply.id)" :id="'readmore' + itemreply.id" class="readmore">.....อ่านเพิ่มเติม</span>
            </span>
              <div class="text-review text-edit" :id="'edit' + itemreply.id">
                <NovelEditterComment
                  :htmt="itemreply.comment"
                  @click="editcommet(itemreply, $event)"
                  :Editer="'html' + itemreply.id"
                  @opanstikers="opanstikers"
                />
              </div>
            </div>
            <div class="review-detail-reply review-detail po-reply">
              <div class="po-reply">
                <!-- <div
                  class="b-t-reply bustom-position"
                  @click="Clicklike(itemreply.id)"
                >
                  <i class="far fa-thumbs-up"></i>
                  <span v-if="itemreply.click_like !== 0">
                    {{ itemreply.click_like }}</span
                  >
                </div> -->
                <!-- <div class="b-t-reply" @click="openReply(index)"> ตอบกลับ <span v-if="item.reply_comment.length !== 0">{{item.reply_comment.length}}</span>
              </div> -->
              </div>
            </div>

            <i class="fas fa-reply r"></i>
          </div>
          <div class="input-comment">
            <NovelEditterComment
              :htmt="resettext"
              :Editer="'htmlreply' + item.id"
              @click="submit(item.id, $event)"
              @opanstikers="opanstikers"

            />
          </div>
        </div>
      </div>
      <div class="paginate" v-show="DataComment.length > pageMax">
            <!-- <NovelPaginate :count="~~(DataComment.length/pageMax)" @click="page"/> -->
        <!-- <jw-pagination
          :items="DataComment"
          @changePage="onChangePage"
          :pageSize="15"
          :maxPages="3"
          :labels="customLabels"
        ></jw-pagination> -->
      </div>
    </span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Cheerup } from "@/shares/constants";
import { Gatway } from "@/shares/services";
import NovelPaginate from "./widget/NovelPaginate.vue"
import EmptyContent from "../pages/empty/empty.vue";
import JwPagination from "jw-vue-pagination";
import { push } from "firebase/database";
Vue.component("jw-pagination", JwPagination);
const customLabels = {
  first: "<<",
  last: ">>",
  previous: "<",
  next: ">",
};
export default Vue.extend({
  name: "Comments",
  components: {
    NovelEditterComment: () => import("./widget/NovelEditterComment.vue"),
    EmptyContent,
    // NovelPaginate
  },
  props: {
    DataComment:{
      type: Array,
      default:[] as any
    },
    // uuid: String,
    novelCommentEffet: {
      type:Boolean,
      default:false
    }
    // idNovel:{
    //   type:String,
    //   default:'9755FCB8-78CB-42A0-85AC-272845D833C5'
    // }
  },
  data() {
    return {
      isLike:true,
      NovelID: this.$route.params.id,
      img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      current: "picker",
      cheerup: Cheerup,
      countcm: 10,
      test: "",
      id: "",
      html1:
        '<div><span style="font-family: Sarabun, sans-serif; font-size: 17px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;">เยี่ยฉวนเติบโตขึ้นมาในฐานะนายน้อยตระกูลเยี่ย เขาทำทุกอย่างเพื่อตระกูล</span><br></div>',
      html: '<img src="/img/Fish.d165d6a3.png"><img src="/img/Rare_Fish.406029b2.png"><div><span style="font-family: Sarabun, sans-serif; font-size: 17px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;">เยี่ยฉวนเติบโตขึ้นมาในฐานะนายน้อยตระกูลเยี่ย เขาทำทุกอย่างเพื่อตระกูล และน้องสาวที่กำลังป่วยหนัก </span><br></div>',
      obj: {
        action: "create-reply-comment",
        comment_data_id: "",
        html: "",
      },
      mode: "read",
      resettext: "",
      Comments: "",
      pageOfItems: [],
      customLabels,
      listdragon:null,
      pagesdata:[0,15],
      pageMax:15
    };
  },
  methods: {
    page(page:number){
      // // console.log(this.DataComment);
      // console.log(page);
      
      // this.pagesdata[1] = page * this.pageMax
      // this.pagesdata[0] = this.pagesdata[1] - this.pageMax
      // this.pageOfItems = this.DataComment.slice(this.pagesdata[0], this.pagesdata[1])
    },
    readmore(item:any, id, idtext){
        let option = document.getElementById(id) as HTMLElement
        let lengtjgf =  option.innerHTML.replaceAll('&nbsp;','')
        
        let readmore =document.getElementById(idtext) as HTMLElement
        if (lengtjgf.length <= 300){
          readmore.innerHTML = ".....ย่อลง"
          option.innerHTML = item.comment
        }else{
          
          readmore.innerHTML = ".....อ่านเพิ่มเติม"
          option.innerHTML = item.comment.slice(0, 300)
        }
        
        
    },
    NovelIDget(uuid ={} as any){
      
     this.NovelID = uuid.uuid as any
    },
    // viewCOMment() {
    //   this.countcm += 10;
    // },
    async opanstikers() {

       
      // await this.getListstiger();
      
      // await this.filter(this.sticker[0]);
      
      this.$emit("opanstikers")
      // await (this as any).$refs.Sticker.openmodel()
      // localStorage.setItem("s", as);
      // let conModal = (await document.getElementById("stiker")) as HTMLElement;
      // conModal.style.display = await "flex";
    },
    // opanstiker() {
    //   let conModal = document.getElementsByClassName(
    //     "con-modal"
    //   )[0] as HTMLElement;
    //   conModal.style.display = "grid";
    // },
    close() {
      let conModal = document.getElementsByClassName(
        "con-modal"
      )[0] as HTMLElement;
      conModal.style.display = "none";
    },
    async onChangePage(pageOfItems: never[]) {
      // // n.log(pageOfItems);
      // if((this as any).$isdrogon.includes(this.NovelID ? this.NovelID :this.$props.DataComment[0].novel_data_id) ){
      //   let res = await this.getListDragon()
      //   console.log(res);
        
      // //   // n.log(res);
        
      //   let reslength =  res.slice(0, 200)
      //   let resssd = [] as any
      //   pageOfItems.filter((res:any)=>{
      //     let resss = reslength.filter((res1:any)=>{
            
      //       return res1.id ===  res.user.id
      //     }  )
          
      //     if(resss.length === 0){
      //       resssd.push({...res, dagonCheck:false})
      //     }else{
      //       resssd.push({...res,dagonCheck:true})
      //     }
      //   })

        
      //   this.pageOfItems = resssd;
      // }else{
        console.log('>>>>>',pageOfItems);
        
        this.pageOfItems = pageOfItems;
      // }
      
      
      
    },
    addstiker(stiker: any) {
      const editer = document.getElementsByClassName("editer")[this.id] as any;
      const element = document.createElement("img");
      element.setAttribute("src", (this as any).$path.cheerup(stiker));
      editer.appendChild(element);
      this.onInput();
    },
    spoler(i: any) {
      const editer = document.getElementsByClassName("editer")[i] as any;
      const element = document.createElement("div");
      element.setAttribute("class", "spolers");
      element.setAttribute("contenteditable", "true");
      element.appendChild(document.createTextNode("สปอย"));
      editer.appendChild(element);
    },
    openReply(i: number,idx:number) {
      if(idx > 0){
        const reply = document.getElementsByClassName("input-comment")[i] as HTMLElement;
        reply.classList.toggle("input-comment-show");
      }else{
        const reply = document.getElementsByClassName("input-comment")[i] as HTMLElement;
        reply.classList.toggle("input-comment-show");
        const replys = document.getElementsByClassName("reply")[i] as HTMLElement;
        replys.classList.toggle("reply-show");
      }
    },
    onInput(i?: any) {
      let html = document.getElementsByClassName("editer")[i] as HTMLElement;
      var text = html.innerHTML;
      // this.obj.html = text
      // var newtext: string;
      let newtext = text.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

      // html.innerHTML = newtext;
      return newtext;
    },
    openObtion(key: any) {
      let option = document.getElementById(key) as HTMLElement;
      option.classList.toggle("option-show");
      // let option = document.getElementsByClassName('option')[key] as HTMLElement
      // option.classList.toggle('option-show')
    },
    async comment(Obj: any) {
      let res = await Gatway.postService(
        "/customers/comments/post",
        Obj as any
      );
      return res;
    },

    async submit(uuid: string, html: any) {

      console.log();
      if(this.$store.state.auth.dataset.user_profile_datas.user_nickname){
        this.obj.html = html;
        this.obj.comment_data_id = uuid;
        const res = await this.comment(this.obj);
        if(res){
          this.$emit("fetch", this.obj);
          this.reset(uuid);
          this.fetchComment(uuid);
        }
      }
      
      else{
        
        this.$router.push('/account?user_nickname=true')
      }
      
      
    },

    reset(uuid: any) {
      let html = document.getElementById("htmlreply" + uuid) as HTMLElement;
      html.innerHTML = "";
    },
    commentLencount(item){
      let cut = item.replaceAll('<img src="https://novelkingdom.co/public/publicImages/','').replaceAll('" class="stiker-img">')  
      return cut.length
      
    },
    async Clicklike(uuid: string) {
      this.isLike = false
      let totallike = document.getElementById("totallike" + uuid) as HTMLElement
      
      
      
      let data = {
        action: "click-like",
        comment_data_id: uuid,
      };
      let res = await this.comment(data);
      if (res.data.code === 405) {
        data.action = await "click-unlike";
        await this.comment(data);
        if(totallike.innerText === '1' ){
          totallike.innerText = ''
        }else{
          totallike.innerText = (parseInt( totallike.innerText) - 1).toString()
        }
        
      }else{
        if(totallike.innerText !== ""){
          totallike.innerText = (parseInt( totallike.innerText) + 1).toString()
        }else{
          totallike.innerText = '1'
        }
      }
      setTimeout(() => {
        this.isLike = true
      }, 1500);
      
    },
    async deleteComment(item: any, index: any) {
      let id = document.getElementById(index + "box-review") as HTMLElement;
      id.style.opacity = "0.3";
      let data = {
        action: "click-delete-post",
        comment_data_id: item.id,
      };
      let res = await this.comment(data);

      if (res.data.code === 200) {
        this.$props.DataComment.splice(index, 1);
        this.page(1)
        id.style.opacity = "1";
        this.$emit("fetch");
      }
    },
    async deleteReply(uuid: string) {
      let data = {
        action: "click-delete-post",
        comment_data_id: uuid,
      };
      let res = await this.comment(data);
      this.$emit("fetch");
    },
    async fetchComment(uuid: string) {
      let data = {
        action: "fetch-comment",
        novel_episode_data_id: uuid,
      };
      let res = await this.comment(data);
    },
    async editcommet(item: any, html: any) { 
      console.log('assaas');
      let data = {
        action: "click-edit-post",
        comment_data_id: item.id,
        html: html,
      };
     
      const res = await this.comment(data);
      
      
      if(res.data.code === 200){
        this.$emit("fetch");
        this.EditComment(item.id);
      }
      
      
    },
    async EditComment(id: any) {
      let EditComment = (await document.getElementById("comment" + id)) as any;
      let Edit = (await document.getElementById("edit" + id)) as HTMLElement;
      if (EditComment.style.display !== "none") {
        EditComment.style.display = "none";
        Edit.style.display = "block";
      } else {
        EditComment.style.display = "block";
        Edit.style.display = "none";
      }
    },
    async getListDragon() {
      if((this as any).$isdrogon.includes(this.NovelID ? this.NovelID :this.$props.DataComment[0].novel_data_id) ){
      let getListDragon = await Gatway.getService(
        "/guest/index/dragon-ranking"
      );
      return getListDragon.data.data
      }
    },
  },
  mounted() {
    console.log('sddsds');
    
    if((this as any).$isdrogon.includes(this.$route.params.id) === true){
       this.getListDragon();
    }
    this.page(1)
    // this.getprop();
    document.addEventListener("click", (event: any) => {
      if (!event.target.matches(".fa-ellipsis-v")) {
        var dropdowns = document.getElementsByClassName("option");
        var i = 0;
        for (i; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("option-show")) {
            openDropdown.classList.remove("option-show");
          }
        }
      }
    });
  },
});
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap%27");
@import url("https://fonts.googleapis.com/css2?family=Sriracha&display=swap%27");
// $font: 'Poppins', sans-serif;
// $font: 'Poppins', sans-serif;
.admin-text  {
  font-weight: 900;
  color: #8226ec !important;
  font-family: "Sriracha", cursive;
  text-shadow: 3px 0px 7px rgba(166, 74, 252, 0.301),
    -3px 0px 7px rgba(179, 77, 247, 0.349),
    0px 4px 7px rgba(192, 71, 248, 0.315);
}
.edit-icon-admin {
  font-size: 13px;
}
.review-detail {
  display: contents;
}
// .white-icon {
//   background-color: white;
// }
.box-review {
  display: grid;
  position: relative;
  padding: 10px;
  grid-template-columns: auto 1fr 100px;
  grid-template-rows: 30px auto 30px;
  // padding-bottom: 30px;
  // grid-template-columns: 1fr;
  // margin: 5px 0px;
  background: #fff;
  border: 2px solid #e5e2ee;
  border-radius: 10px;
  // border-top: 1px solid #d5d5d5;
  // grid-gap: 3px;
  grid-template-areas:
    "box-re-profile box-name ."
    "box-re-profile box-text-review box-text-review"
    ". . po-reply";
}
@-webkit-keyframes glowing-text {
  0% {
    text-shadow: 0 0 2px #fff, 0 0 5px #da7807, 0 0 10px #da7807,
      0 0 15px #ffb24d, 0 0 20px #ffb24d, 0 0 25px #ffb24d, 0 0 30px #ffb24d;
  }

  100% {
    text-shadow: 0 0 2px #fff, 0 0 5px #f81f4e, 0 0 10px #f81f4e,
      0 0 15px #eb8e37, 0 0 20px #da7807, 0 0 25px #ffb24d, 0 0 30px #ffb24d;
  }
}
.glowing-text {
  // font-size: 25px;
  color: #cda112;
  text-align: center;
    text-shadow: 3px 0px 7px rgba(252, 249, 74, 0.638),
    -3px 0px 7px rgba(247, 205, 77, 0.643),
    0px 4px 7px rgba(248, 233, 71, 0.315);
    // text-shadow: 0 0 2px #fff, 0 0 5px #f81f4e, 0 0 10px #f81f4e,
    //   0 0 15px #eb8e37, 0 0 20px #da7807, 0 0 25px #ffb24d, 0 0 30px #ffb24d;
  // -webkit-animation: glowing-text 1.4s ease-in-out infinite alternate;
  // -moz-animation: glowing-text 1.4s ease-in-out infinite alternate;
  // animation: glowing-text 1.4s ease-in-out infinite alternate;
}
// .admin-text{
//   color: #a11ff8;
// }
.Commentss {
  display: grid;
  gap: 5px;
}
.box-text-review {
  grid-area: box-text-review;
}
.box-re-profile {
  grid-area: box-re-profile;
  // transform: translate(-0%, 10%);
}
.box-name {
  grid-area: box-name;
}
.review-profile {
  // display: flex;
  // align-items: flex-start;
  // grid-gap: 10px;
  // justify-content: space-between;
}
.adminWeb {
  color: #ffb24d;
}
.re-profile {
  // border: 1px solid #d0d0d0;
  width: 40px;
  height: 40px;
  // border-radius: 50%;
  // background: #e0e0e0;
}
.fa-thumbs-up {
  padding: 3px;
}
.story-sub {
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
  color: #727272;
}
.text-review {
  color: rgb(114, 114, 114);
  font-size: 17px;
  line-height: 1.7;
  word-break: break-all;
  // width: 70%;
  // overflow-y: scroll;
  // border: solid 1px black;
  // display: block;
  // margin-bottom: 20px;
  // margin-left: 60px;
  font-family: "Sarabun", sans-serif;
  margin-left: 18px;
  // display: flex;
  // align-items: center;
}
.t-reply {
  font-size: 20px;
  /* color: #565656; */
  margin-bottom: 0px;
  margin-left: 60px;
  font-family: "Sarabun", sans-serif;
}
.review-detail {
  display: flex;
  align-items: start;
  justify-content: flex-end;
  grid-gap: 40px;
}
.re-star {
  margin-right: 18px;
}
.space-tags {
  margin-left: 7px;
}
.re-name {
  font-size: 13px;
}
.con-profile {
  display: flex;
  grid-gap: 10px;
  align-items: center;
}
.po-reply {
  grid-area: po-reply;
  // color: #ffffff;
  // position: absolute;
  // right: 15px;
  // bottom: 8px;
  display: flex;
  gap: 5px;
  cursor: pointer;
  justify-content: flex-end;
}
.review-date {
  font-size: 13px;
  text-align: right;
}
.box-reply {
  background: #fff;
  padding: 10px;
  // padding-bottom: 30px;
  // margin: 5px 0px;
  border: 2px solid #e5e2ee;
  border-radius: 10px;
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr 100px;
  grid-template-rows: 30px auto 30px;
  // grid-gap: 10px;
  // border-top: 1px solid #d5d5d5;
  margin-left: 60px;
  grid-template-areas:
    "box-re-profile box-name ."
    "box-re-profile box-text-review box-text-review"
    ". . po-reply";
}
.input-comment {
  margin-left: 60px;
  // display: grid;
  display: none;
  position: relative;
  gap: 10px;
}
.input-comment-show{
  display: grid;
}
.editer {
  min-height: 80px;
  margin-right: 70px;
}
.text-editer {
  padding: 20px;
  word-break: break-all;
  background: #fff;
  border: 2px solid #e5e2ee;
  border-radius: 10px !important;
  position: relative;
}
.option-icon {
  cursor: pointer;
  display: flex;
  gap: 10px;
  position: absolute;
  right: 10px;
  top: 7px;
}
.editer:focus-visible {
  outline: none;
}
.fas {
  // color: #fff;
}
.totallike {
  // color: #fff;
}
.con-modal {
  position: fixed;
  background: #cbcbcb95;
  width: 100%;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}
.con-stiker {
  height: 70vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  justify-items: center;
  align-items: center;
}
.con-submit {
  display: flex;
}
.submit {
  position: absolute;
  bottom: 10px;
  padding: 2px 10px;
  background: #727272;
  border: #727272;
  right: 10px;
}
.reply {
  display: none;
}
.activate-com{
 border: 2px solid #c695ff;
    padding: 10px;
    // border-radius: 14px;
    background: #f5edff;
}
.reply-show {
  display: grid;
  gap: 5px;
}
.stiker-img {
  height: 70px;
  width: 70px;
}
.r {
  width: 20px;
  position: absolute;
  left: -40px;
  top: 10px;
  height: 20px;
  transform: rotate(180deg);
}
.editer .spolers {
  width: 100%;
  padding: 10px;
  border: 1px solid;
  margin: 10px;
}
.n-reply {
  background: #826527;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  width: 25px;
  //  height: 25px;
  align-items: center;
}
.b-t-reply {
  // color: #ffffff;
  padding: 10px;
  align-items: center;
  display: flex !important;
  gap: 5px;
  cursor: pointer;
  display: flex;
  padding: 2px 10px;
  border-radius: 5px;
  // border: 1px solid #6A70AA;
  // background: #6A70AA;
}
//  .b-t-reply:hover {
//   box-shadow: #6A70AA 0px 3px 10px 0px;
//  }
.paginate {
  margin: 20px 0px;
}
.option {
  display: none;
  position: absolute;
  padding: 0px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  left: -140px;
  top: 0px;
  border-radius: 5px;
  width: 130px;
  background: #ffffff;
}
.option-show {
  display: block;
  z-index: 10;
}
.fa-ellipsis-v {
  cursor: pointer;
}
li {
  padding: 10px 10px;
  cursor: pointer;
  font-size: 14px;
}
.text-review:focus-visible {
  outline: none;
  border: 1px solid #c2c2c2;
  border-radius: 20px;
  padding: 10px;
}
.text-edit {
  display: none;
}
.notcomment {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  // background: #fff;
  border-radius: 10px;
}
.ddd {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
}
.view-com {
  cursor: pointer;
}
.comment-detail {
  align-items: center;
  gap: 10px;
  display: flex;
  // align-items: flex-start;
  justify-content: flex-end;
}  .readmore{
    cursor: pointer;
  }
.box-option {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.name-review {
  padding-left: 15px;
}
.name-review-dragon {
  padding-left: 15px;
  color: red;
}
@media (max-width: 1024px) {
}
@media (max-width: 768px) {
}

@media (max-width: 415px) {
  .stiker-img {
    height: 50px;
    width: 50px;
  }
  .box-re-profile {
    grid-area: box-re-profile;
    // transform: translate(-0%, 30%);
  }
  .name-review {
    font-size: 12px;
    // padding-left: 15px;
  }
  .box-review {
    display: grid;
    position: relative;
    padding: 10px;
    grid-template-columns: 40px 1fr 110px;
    grid-template-rows: 30px auto 30px;
    // padding-bottom: 30px;
  }
  .text-editer {
    // margin-bottom: 100px;
  }
  .comment-detail {
    display: flex;
        align-items: center;
  }

  .text-review {
    font-size: 17px;

    // margin-left: 18px;
  }
  // .box-review {
  //   border-radius: 0px;
  //   // border: 2px solid #f4ba40;
  //   border-left: 0px;
  //   grid-template-columns: 50px 1fr;
  //   grid-template-rows: 1fr 30px;
  //   grid-template-areas: "null null" "comment-detail comment-detail";
  //   border-right: 0px;
  // }
  .po-reply {
    // position: relative;
    // transform: translate(20px ,0px);
  }
  // .comment-detail {
  //   grid-area: comment-detail;
  //   display: flex;
  //   justify-content: space-between;

  // }
  .re-profile {
    width: 40px;
    height: 40px;
  }

  .box-reply {
    //  border-radius: 0px;
    border: 2px solid #e5e2ee;
  }
  .box-reply,
  .input-comment {
    margin-left: 30px;
  }
  .r {
    display: none;
  }

  .review-date {
    padding: 10px;
  }
  .ddd {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 20px;
    right: 10px;
    top: 10px;
  }
  .b-t-reply {
    width: max-content;
  }
  .review-date {
    width: auto;
  }
  // .box-reply {
  //   // border: 2px solid #f4ba40;
  //   grid-template-columns: 50px 1fr 0.1fr;
  //   grid-template-rows: 1fr 30px;
  //   grid-template-areas: "null null" "comment-detail comment-detail";
  // }
  .position-thump {
    display: flex;
    justify-content: end;
  }
  .review-detail-reply {
    display: flex;
    align-items: start;
    justify-content: flex-end;
    grid-gap: 0px !important;
  }
  .bustom-position {
    transform: translate(0px, 6px);
  }
  .review-detail {
    display: none;
  }
  .Comments{
    background: #fff;
  }
}
</style>
