<template>
  <div class="noti-menu">
    <div v-if="notificationdata.length !== 0">
      <div class="name-article">
        <p class="name-ar">การแจ้งเตือน</p>
        <small @click="delNoti()">ล้าง</small>
      </div>
      <div class="conthianer-box-noti">
        <div
          v-for="item in notificationdata"
          :key="item.id"
          :class="item.status === 1 ? 'noti-box' : 'noti-box noti-box-read'"
        >
          <div @click="to(item)">
            <div>
              <div class="contain-noti">
                <img
                  class="img-noti"
                  :src="item.url_image ? item.url_image : imgDefault"
                  alt=""
                  width="80%"
                />
                <small class="detail-noti">
                 <span class="hl">  {{ item.title }} </span>
                  <span v-if="item.table === 'comment_datas'">
                    ตอนกลับคอมเม้นต์คุณ
                  </span>
                  <span v-if="item.table !== 'comment_datas'">{{
                    item.body
                  }}</span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="not-data">ไม่มีการแจ้งเตือน</div>
  </div>
</template>
<script lang="js">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import Novel from "@/pages/novel/Novel.vue"
const _Novel = new Novel
export default Vue.extend({
  name: "notication",
  data() {
    return {
      notification: [1],
      notificationdata:'',
      notificationdata_comment:[] ,
      notificationdata_novel:[] ,
      notificationdata_ep:[] ,
      imgDefault: this.$path.image('loading.png'),
    };
  },
  methods: {
    async opennoti() {
      const notiele =  await document.getElementsByClassName("noti-menu")[0]
      if(notiele.classList.length === 1){
        notiele.classList.add("noti-show");
        await this.gotNoti()
      }else{
        notiele.classList.remove("noti-show");
      }
    },
    closenoti() {
      document
        .getElementsByClassName("noti-menu")[0]
        .classList.remove("noti-show");
    },
    async gotNoti(){
      if(this.$store.state.auth.token){
      let res = await Gatway.getService("/customers/notification/fetch"); // console.log("remove") ?status=read
        this.notificationdata_ep = await []
        this.notificationdata_novel= await []
        this.notificationdata_comment = await []
        const data = [[],[],[]]
        res.data.data.filter(async (elememt)=>{
          if(elememt.table ==='novel_episode_datas' || elememt.table === 'comment_datas'){
            data[1].push(elememt)
            this.notificationdata_ep.push(elememt)
          }else if (elememt.table ==='novel_data'){
            data[0].push(elememt)
            this.notificationdata_novel.push(elememt)
          }else{
            data[1].push(elememt)
            this.notificationdata_comment.push(elememt)
          }
        })
        this.notificationdata = res.data.data
        // this.notificationdata =res.data.data.length
      }

    },
    async to(item){
      await Gatway.postService("/customers/notification/read",{id:item.id})
      var urlReply = item.url.split("/")
      var url = urlReply[urlReply.length - 1]
      var type = urlReply[urlReply.length - 2]
      this.$emit('getnovel')
      if(item.table === "comment_datas"){
        await this.$router.push('/'+ type + "/"+url+"?type="+item.table+"&ref="+item.ref)
        window.location.reload()
      }
      else if(item.table === "novel_episode_datas"){
        this.$router.push('/'+ type + "/"+url+"?type="+item.table+"&ref="+item.ref)
        await this.$store.getters._GetNovelHeader(item.ref);
        window.location.reload()
      }else{
        this.$router.push('/'+ type+ '/' + item.ref)
        window.location.reload()
      }
    },
    async delNoti(){
       Gatway.DelService("/customers/notification/delete/"+ this.$store.state.auth.dataset.id);
    }
  },
  mounted() {
    this.gotNoti()
    document.addEventListener("click", (event) => {
      if (!event.target.matches(".noti")) {
        var dropdowns = document.getElementsByClassName("noti-menu");
        var i = 0;
        for (i; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("noti-show")) {
            openDropdown.classList.remove("noti-show");
          }
        }
      }
    });
  },
});
</script>
<style scoped lang="scss">
.name-article {
  padding: 10px;
  // border-bottom: 1px solid #c3c3c3;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin-top: 10px;
}
.name-ar {
  font-size: 16px;
  font-weight: 500;
}
.img-noti {
  border-radius: 3px;
}
.detail-noti {
  display: inline;
  align-items: center;
  color: #848484;
}
.color-writer {
  color: #9b5afb;
  font-weight: 500;
}
.contain-noti {
  // word-break: break-all;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 4fr;
  padding: 5px;
  align-items: center;
  // border-bottom: 2px solid #c3c3c3;
}
.noti-menu {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 70px;
  // padding: 0px 5px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  // width: 200px;
  background: #ffffff;
  right: 10px;

  transition: 0.3s;
}
.noti-show {
  opacity: 10;
  pointer-events: auto;
  top: 60px;
}

.noti-menu {
  word-break: break-word;
  right: 0px;
  max-height: 450px;
  width: 280px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-left: 5px;
}
.noti-box {
  // border: 1px solid #c3c3c3;
}
.noti-box:hover {
  background-color: #ededed9e;
  transition: ease-in-out 0.2s;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #96969600;
}

::-webkit-scrollbar-thumb {
  background: #ffffff7d;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #aaaaaaac;
}
.not-data {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 400px;
  padding: 20px;
  color: #c5c5c5;
}
.noti-box-read {
  background: #e5e5e5;
  border-radius: 3px;
}
.box-noti {
  cursor: pointer;
  display: grid;
  gap: 2.5px;
}
.hl{
  color: #1e1e1e;
  // font-weight: 700;
}
.conthianer-box-noti{
  display: grid;
  gap: 4px;
  padding-bottom: 4.5px;
}
</style>
