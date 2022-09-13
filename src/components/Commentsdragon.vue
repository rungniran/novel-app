<template>
  <div class="Commentss">
    <!-- <pre>
              {{listdragon[0].displayname}}
            </pre> -->

    <div v-if="DataComment.length === 0" class="notcomment">
      <EmptyContent
        pathName="8.png"
        text="นิยายตอนนี้ยังไม่มีความคิดเห็น"
        fontSize="30px"
      ></EmptyContent>
    </div>

    <span v-else style="display: grid; gap: 5px">
      <div
        v-for="(item, index) in pageOfItems"
        :key="index"
        style="display: grid; gap: 5px"
      >
        <div class="box-review" :id="index + 'box-review'">
          <div class="box-re-profile">
            <div
              class="re-profile"
              :style="'background: url(' + img + ') center center/cover'"
            ></div>

            <!-- <img :src="$path.image('18 adult.png')" width="100px"> -->
          </div>

          <div>
            <!-- <div v-if="listdragon.rank <= 5">

              <div class="name-review-dragon line-1" v-if="item.user">
                <span v-if="item.user.user_profile_datas[0].user_nickname"
                  >{{ item.user.user_profile_datas[0].user_nickname }}
                </span>
                <span v-else
                  >{{ item.user.user_profile_datas[0].first_name }}
                  {{ item.user.user_profile_datas[0].last_name }} &nbsp;
                </span>
                <small v-if="item.novel_episode_data">
                  #ตอนที่ {{ item.novel_episode_data.ep_no }}</small
                >
              </div>
            </div> -->
            <div>
              <div class="name-review line-1" v-if="item.user">
                <span v-if="item.user.user_profile_datas[0].user_nickname"  >
                  <span
                    v-if="
                      item.user.user_profile_datas[0].user_nickname ===
                      listdragon[0].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[1].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[2].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[3].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[4].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[5].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[6].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[7].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[8].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[9].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[10].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[11].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[12].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[13].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[14].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[15].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[16].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[17].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[18].displayname || item.user.user_profile_datas[0].user_nickname ===
                      listdragon[19].displayname 
                    "
                  >
                  <span class="glowing-text">

                    {{ item.user.user_profile_datas[0].user_nickname }}
                  </span>
                  
                  </span>
                  <span v-else>
                    {{ item.user.user_profile_datas[0].user_nickname }}
                  </span>
                </span>
                <span v-else
                  >{{ item.user.user_profile_datas[0].first_name }}
                  {{ item.user.user_profile_datas[0].last_name }} &nbsp;
                </span>
                <small v-if="item.novel_episode_data">
                  #ตอนที่ {{ item.novel_episode_data.ep_no }}</small
                >
              </div>
            </div>

            <!-- <div
            class="text-review"
            :id="'comment' + item.id"
            v-html="item.comment"
          ></div>

          <div class="text-review text-edit" :id="'edit' + item.id">
            <NovelEditterComment
              :htmt="item.comment"
              @click="editcommet(item, $event)"
              :Editer="'html' + item.id"
            />
          </div> -->
          </div>
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
            <!-- <div class="po-reply">

            <div class="b-t-reply" @click="Clicklike(item.id)">
              <i class="far fa-thumbs-up"></i>
              <span class="totallike" v-if="item.click_like !== 0">
                {{ item.click_like }}</span
              >
            </div>
            <div class="b-t-reply" @click="openReply(index)">
              <i class="fa fa-reply" style="color: #6a70aa"></i
              ><span v-if="item.reply_comment.length !== 0">{{
                item.reply_comment.length
              }}</span>
            </div>
          </div> -->
          </div>
          <div></div>
          <div class="box-text-review">
            <div
              class="text-review"
              :id="'comment' + item.id"
              v-html="item.comment"
            ></div>

            <div class="text-review text-edit" :id="'edit' + item.id">
              <NovelEditterComment
                :htmt="item.comment"
                @click="editcommet(item, $event)"
                :Editer="'html' + item.id"
              />
            </div>
          </div>
          <div class="po-reply">
            <!-- <div class="b-t-reply" @click="Clicklike(item.id)">
              <i class="fas fa-thumbs-up"></i>
              <span v-if="item.click_like !== 0"> {{item.click_like}}</span>
            </div> -->
            <div class="b-t-reply" @click="Clicklike(item.id)">
              <i class="far fa-thumbs-up"></i>
              <span class="totallike" v-if="item.click_like !== 0">
                {{ item.click_like }}</span
              >
            </div>
            <div class="b-t-reply" @click="openReply(index)">
              <i class="fa fa-reply" style="color: #6a70aa"></i
              ><span v-if="item.reply_comment.length !== 0">{{
                item.reply_comment.length
              }}</span>
            </div>
          </div>
          <!-- <div class="comment-detail">
          <div class="ddd">
            <i
              class="fas fa-ellipsis-v white-icon"
              @click="profile ? openObtion(item.id) : $base.openlogin()"
            ></i>
            <div class="option" :id="item.id" v-if="profile">
              <li
                v-if="item.user_id === profile.id"
                @click="deleteComment(item.id)"
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
          <div class="review-detail"></div>
          <div class="review-date">{{ $filter.Ago(item.created_at) }}</div>
          <div class="po-reply">
            <div class="b-t-reply" @click="Clicklike(item.id)">
              <i class="fas fa-thumbs-up"></i>
              <span v-if="item.click_like !== 0"> {{item.click_like}}</span>
            </div>
            <div class="b-t-reply" @click="Clicklike(item.id)">
              <i class="far fa-thumbs-up"></i>
              <span class="totallike" v-if="item.click_like !== 0">
                {{ item.click_like }}</span
              >
            </div>
            <div class="b-t-reply" @click="openReply(index)">
              <i class="fa fa-reply" style="color: #6a70aa"></i
              ><span v-if="item.reply_comment.length !== 0">{{
                item.reply_comment.length
              }}</span>
            </div>
          </div>
        </div> -->
        </div>
        <!-- <div class="box-review">
        <div class="review-profile">
          <div class="con-profile">
            <div
              class="re-profile"
              :style="'background: url(' + img + ') center center/cover'"
            ></div>
            <div>
              <div class="name-review" v-if="item.user">
                <span v-if="item.user.user_profile_datas[0].user_nickname" >{{item.user.user_profile_datas[0].user_nickname}} </span>
                <span v-else>{{item.user.user_profile_datas[0].first_name}}  {{item.user.user_profile_datas[0].last_name}} &nbsp; </span> 
                <small v-if="item.novel_episode_data"> #ตอนที่ {{item.novel_episode_data.ep_no}}</small>
              </div>
              <div class="review-date">{{ $filter.Ago(item.created_at)}}</div>
            </div>
          </div>
          <div class="review-detail">
            <div style="position: relative;">
              <i class="fas fa-ellipsis-v" @click="profile ? openObtion(item.id) :  $base.openlogin()"></i>
              <div class="option" :id="item.id" v-if="profile">
                <li v-if="item.user_id === profile.id" @click="deleteComment(item.id)">ลบความคิดเห็น</li>
                <li v-if="item.user_id === profile.id"  @click="EditComment(item.id)">แก้ไข</li>
                <li v-if="item.user_id !== profile.id">รายงาน</li>
              </div>
            </div>

          </div>
        </div>
        <div class="text-review" :id="'comment'+item.id" v-html="item.comment"></div>
        <div class="text-review text-edit" :id="'edit'+item.id" >
          <NovelEditterComment  :htmt="item.comment" @click="editcommet(item, $event)" :Editer="'html'+item.id"/>
        </div>
        <div class="po-reply">
           <div class="b-t-reply" @click="Clicklike(item.id)">
              <i class="fas fa-thumbs-up"></i>
              <span v-if="item.click_like !== 0"> {{item.click_like}}</span>
            </div>
          <div class="b-t-reply" @click="openReply(index)"> ตอบกลับ <span v-if="item.reply_comment.length !== 0">{{item.reply_comment.length}}</span>
           </div>
        </div> 
        
      </div> -->
        <div class="reply">
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

            <div>
              <div class="name-review line-1">
                <span v-if="itemreply.user.user_profile_datas[0].user_nickname"
                  >{{ itemreply.user.user_profile_datas[0].user_nickname }}
                </span>
                <span v-else
                  >{{ itemreply.user.user_profile_datas[0].first_name }}
                  {{ itemreply.user.user_profile_datas[0].last_name }} &nbsp;
                </span>
              </div>

              <!-- <div
              class="text-review"
              :id="'comment' + itemreply.id"
              v-html="itemreply.comment"
            ></div> -->
            </div>
            <div class="comment-detail">
              <div class="review-date comment-detail">
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
              <div
                class="text-review"
                :id="'comment' + itemreply.id"
                v-html="itemreply.comment"
              ></div>
              <div class="text-review text-edit" :id="'edit' + itemreply.id">
                <NovelEditterComment
                  :htmt="itemreply.comment"
                  @click="editcommet(itemreply, $event)"
                  :Editer="'html' + itemreply.id"
                />
              </div>
            </div>
            <div class="review-detail-reply review-detail po-reply">
              <!-- <div class="in-review-detail">
                <i class="far fa-thumbs-up" @click="Clicklike(itemreply.id)"></i>
                {{itemreply.click_like}}
              </div> -->
              <!-- <div class="text-review text-edit" :id="'edit' + itemreply.id">
              <NovelEditterComment
                :htmt="itemreply.comment"
                @click="editcommet(itemreply, $event)"
                :Editer="'html' + itemreply.id"
              />
            </div> -->
              <div class="po-reply">
                <div
                  class="b-t-reply bustom-position"
                  @click="Clicklike(itemreply.id)"
                >
                  <i class="far fa-thumbs-up"></i>
                  <span v-if="itemreply.click_like !== 0">
                    {{ itemreply.click_like }}</span
                  >
                </div>
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
            />
          </div>
        </div>
      </div>
      <div class="paginate" v-show="DataComment.length > 15">
        <!-- ความคิดเห็นก่อนหน้านี้ {{ DataComment.length - countcm }} -->
        <jw-pagination
          :items="DataComment"
          @changePage="onChangePage"
          :pageSize="15"
          :maxPages="5"
          :labels="customLabels"
        ></jw-pagination>
      </div>
    </span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Cheerup } from "@/shares/constants";
import { Gatway } from "@/shares/services";
import EmptyContent from "../pages/empty/empty.vue";
import JwPagination from "jw-vue-pagination";
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
  },
  props: {
    DataComment: [],
  },
  data() {
    return {
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
      listdragon: null as any,
    };
  },
  methods: {
    // viewCOMment() {
    //   this.countcm += 10;
    // },
    opanstiker() {
      let conModal = document.getElementsByClassName(
        "con-modal"
      )[0] as HTMLElement;
      conModal.style.display = "grid";
    },
    close() {
      let conModal = document.getElementsByClassName(
        "con-modal"
      )[0] as HTMLElement;
      conModal.style.display = "none";
    },
    onChangePage(pageOfItems: never[]) {
      this.pageOfItems = pageOfItems;
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
    openReply(i: any) {
      const reply = document.getElementsByClassName("reply")[i] as HTMLElement;
      reply.classList.toggle("reply-show");
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
      this.obj.html = html;
      this.obj.comment_data_id = uuid;
      await this.comment(this.obj);
      this.$emit("fetch", this.obj);
      this.reset(uuid);
      // this.resettext = await ''
      this.fetchComment(uuid);
    },

    reset(uuid: any) {
      let html = document.getElementById("htmlreply" + uuid) as HTMLElement;
      html.innerHTML = "";
    },

    async Clicklike(uuid: string) {
      let data = {
        action: "click-like",
        comment_data_id: uuid,
      };
      let res = await this.comment(data);
      if (res.data.code === 405) {
        data.action = await "click-unlike";
        await this.comment(data);
      }

      this.$emit("fetch");
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
      let data = {
        action: "click-edit-post",
        comment_data_id: item.id,
        html: html,
      };
      await this.comment(data);
      this.$emit("fetch");
      this.EditComment(item.id);
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
    getprop() {
      // console.log(this.$props.DataComment);
      // this.Comments = this.$props.DataComment
      // console.log( this.Comments);
    },
    async getListDragon() {
      let getListDragon = await Gatway.getService(
        "/guest/index/dragon-ranking"
      );
      let numRank = [] as any;
      for (var i = 0; i < getListDragon.data.data.length; i++) {
        if (getListDragon.data.data[i].user_profile_datas[0]) {
          numRank.push({
            ...getListDragon.data.data[i],
            rank: i + 1,
            displayname: getListDragon.data.data[i].user_profile_datas[0]
              .user_nickname
              ? getListDragon.data.data[i].user_profile_datas[0].user_nickname
              : getListDragon.data.data[i].user_profile_datas[0].first_name +
                " " +
                getListDragon.data.data[i].user_profile_datas[0].last_name,
          });
        } else {
          numRank.push({
            ...getListDragon.data.data[i],
            rank: i + 1,
            displayname: getListDragon.data.data[i].username,
          });
        }
      }
      this.listdragon = numRank.slice(0, 300);
    },
  },
  mounted() {
    this.getListDragon();
    this.getprop();
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
  color: #ffeaa4;
  text-align: center;
  -webkit-animation: glowing-text 1.4s ease-in-out infinite alternate;
  -moz-animation: glowing-text 1.4s ease-in-out infinite alternate;
  animation: glowing-text 1.4s ease-in-out infinite alternate;
}
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
  display: grid;
  position: relative;
  gap: 10px;
}
.editer {
  min-height: 80px;
  margin-right: 70px;
}
.text-editer {
  padding: 20px;
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
  background: #fff;
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
    align-items: end;
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
    border: 2px solid #d7d7d7;
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
}
</style>
