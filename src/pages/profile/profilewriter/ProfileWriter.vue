<template>
  <div >
    <!-- {{gatitemProfile}} -->
    <div class="nv-box-white nv-mt-40">
      <!-- <cover :data="gatitemProfile" /> -->
      <div class="img-cover">
      <div
        class="img-profile"
        style="
          background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png) center center/cover;
        "
      >
      </div>
    </div>
    <div class="contant">
        <div class="box-username">
            <div  class="nv-username">
               <span v-if="gatitemProfile.user_profile_datas[0].user_nickname">    {{ gatitemProfile.user_profile_datas[0].user_nickname}} </span>
               <span v-else>{{ gatitemProfile.user_profile_datas[0].first_name}} {{ gatitemProfile.user_profile_datas[0].last_name}}</span>
            </div>
            <div >#นักรบมังกร</div>
            <!-- <div class="level">
                <div class="teb-level"></div>
            </div>
            <div class="nv-mt-10">
                Exp 1/ 100
            </div> -->
        </div>
    </div>
  

      <div class="box-follow nv-mt-20">
        <div class="follow">
          <span>{{ gatitemProfile.count_novel_data }}</span>
          <div>เรื่อง</div>
        </div>
        <div class="follow">
          <span v-if="gatitemProfile.user_profile_datas[0].follower">{{
            gatitemProfile.user_profile_datas[0].follower
          }}</span>
          <span v-else>{{gatitemProfile.count_follow_data}}</span>
          <div>ผู้ติดตาม</div>
        </div>
      </div>

      <div>
        <div class="nv-mt-20">
          <div class="con-detail-btn">
            <router-link
              :to="'/profile/' + this.$route.params.username"
              class="nv-btn-light-blue msg viewprofile"
              >ดูโปรไฟล์นักอ่าน</router-link
            >
            <!-- <div class="nv-btn-yellow msg">ส่งข้อความ</div>
            <div class="nv-btn-yellow msg" @click="$base.openmodal('modal-xl', 'modal-animation', 0)">ส่งกำลังใจ</div> -->
            <div class="nv-btn-yellow msg" @click="follow(gatitemProfile.id)">
              ติดตาม
            </div>
          </div>
        </div>
        <div class="nv-mt-30">
          <div class="title">
            นิยายของ {{ gatitemProfile.user_profile_datas[0]["user_nickname"] }}
          </div>
          <br />
          <!-- <pre> {{gatitemProfile.novel_datas}} </pre> -->
          <!-- <Work :data="gatitemProfile.novel_datas"/> -->
          <div v-if="gatitemProfile.novel_datas.length !== 0">
            <div class="conthianer-novel">
              <div
                v-for="(item, index) in gatitemProfile.novel_datas"
                :key="index"
              >
                <router-link :to="'/novel/' + item.id">
                  <img
                    :src=" item.image_data 
                      ? item.image_data.url
                      : $path.image('loading.png')"
                    width="100%"
                    class="nv-img-novel image"
                  />
                  <div class="line-1 conthianer-novel-title">
                    {{ item.title }}
                  </div>
                </router-link>
              </div>
              <!-- <div v-if="item.novel_datas.length === 0">
                emtpy
              </div> -->
            </div>
          </div>
          <div v-else>
            <EmptyContent
              pathName="8.png"
              text="คุณยังไม่มีนิยายผลงานนิยาย..."
              fontSize="30px"
            ></EmptyContent>
          </div>
        </div>
      </div>
    </div>
    <!-- <ModalCheerUp /> -->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import { alert } from "@/shares/modules/alert";
import EmptyContent from "../../empty/empty.vue";
export default Vue.extend({
  name: "profilewriter",
  data() {
    return {
      mywork: [...Array(10).keys()],
      gatitemProfile: {},
    };
  },
  components: {
    // cover: () => import("@/components/Cover.vue"),
    // ModalCheerUp: () => import("./components/ModalCheerUp.vue"),
    EmptyContent,
    // Work:()=> import("@/components/myWork.vue")
  },
  methods: {
    async getdata() {
      console.log('sddssdsdds');
      
      let res = await Gatway.getIDService(
        "/guest/profile-data/index",
        this.$route.params.username
      );
      console.log(res.data.data,'sddsdsds');

      this.gatitemProfile = res.data.data;
    },
    async follow(id) {
      let res = await Gatway.postService("/customers/follow-datas", {
        follow_user_id: id,
      } as any);
      res.data.code === 200 ? alert("ติดตาม", "success") : null;
    },
    async getnovel() {
      let res = await Gatway.getService("/customers/novel");
    },
  },
  mounted() {
    // this.getnovel()
    this.getdata();
  },
});
</script>
<style lang="scss" scoped>
$topcover: 280px ;
.nv-box-white {
  position: relative;
  overflow: hidden;
}
.msg,
.edit {
  font-size: 13px;
  padding: 5px 7px;
}
.edit {
  background: #828282;
  border: 1px solid #828282;
}
.title {
  font-size: 25px;
  color: #444349;
}
.con-mywork {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
}
.image {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

.type-novel {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 40px;
  background: #febc2a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.container-detail {
  margin: 10px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.box-follow {
  display: flex;
  justify-content: center;
  // grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
.follow {
  padding: 10px 20px;
  width: 140px;
  background: rgb(231, 231, 231);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
}
.viewprofile {
  position: absolute;
  top: 300px;
  left: 20px;
}
.con-detail-btn {
  display: flex;
  grid-gap: 10px;
  justify-content: center;
}
.conthianer-novel {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
}
.conthianer-novel-title {
  font-size: 17px;
  text-align: center;
}

.img-cover{
    position: absolute;
    display: flex;
    justify-content: center;
    left: 0px;
    top: 0px;
    height: $topcover;
    width: 100%;
    background: linear-gradient(180deg, #61BCBE 10.94%, #81AAD8 49.48%, #AB93F9 100%);
}
.img-profile{
    position: absolute;
    width: 130px;
    height: 130px;
    border-radius: 100%;
    background: #848484;
    margin: auto;
    bottom: -60px;
    display: flex;
    justify-content: center;
}
.Lv{
   position: absolute;
   bottom: -10px;
   background: #1D2044;
   width: 100px;
   padding: 2px 20px;
   display: flex;
   justify-content: center;
   align-items: center;
   color: #fff;
   border-radius: 50px;
}
.contant{
    margin-top: $topcover + 25;
}
.box-username{
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-gap: 5px;
}
.level{
    width: 270px;
    height: 23px;
    border-radius: 30px;
    background: #1d204442;

    margin-top: 10px;
}
.teb-level{
    height: 100%;
    width: 0%;
    border-radius: 30px;
    background: #1d2044;
     box-shadow: 0px 4px 20px #AB93F9;
    transition: 1s;
    // animation-name: example;
    // animation-duration: 2s;
    // animation-fill-mode: both;
}









@media (max-width: 768px) {
  .con-mywork {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
  }
  .conthianer-novel {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
  }
}
@media (max-width: 415px) {
  .viewprofile {
    position: unset;
  }
  .title{
    font-size: 20px;
  }
  .conthianer-novel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .con-detail-btn {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr;
  }
  .msg {
    text-align: center;
  }
}
</style>
