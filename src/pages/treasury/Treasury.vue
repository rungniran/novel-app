<template>
  <div>
    <div>
    <div class="nv-box-white nv-mt-40">
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
        <div v-if="profile" class="line-1 display_name">{{ this.$store.state.auth.display_name}} </div>
          <div v-if="profile">#นักรบมังกร</div>
         <div class=" nv-mt-40">
      <!-- <cover /> -->
     <!-- <pre> {{treasury}}</pre> -->
      <!-- <div class="btn-c">ภารกิจประจำวัน!</div> -->
      <div v-if="treasury">
        <!-- <pre>{{JSON.parse(treasury[0].system_note)}}</pre> -->
        <div v-if="treasury.length !== 0">
          <div class="title">คลังสมบัติ</div>
          <div class="con-tsry nv-mt-10">
            <div
              v-for="(item, index) in treasury"
              :key="index"
              class="box-tsry"
            >
              <!-- {{item}} @error="$event.target.src = $path.image('loading.png')"-->
              <div class="title-tsry">
                <pre class="line-1">  {{ JSON.parse(item.system_note).name }}</pre>
              </div>

              <img 
              v-lazy="  item.image_url
                ? item.image_url
                : $path.image('loading.png')" 
              height="160px" />
              <div class="cover"></div>
            </div>
          </div>
        </div>

        <div v-if="treasury.length === 0">
          <EmptyContent
            class="image"
            pathName="7.png"
            text="คลังสมบัติของคุณว่างเปล่า"
          ></EmptyContent>
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
        </div>
      </div>
      <div>
        <div class="nv-mt-10">
         
            
          <div class="nv-mt-10" v-if="treasureBoxDatas">
              <div class="title">ของสะสมหายาก</div>
              
           
          </div>
         
        </div>
      </div>
    </div>
    <!-- <img :src="$path.svg('test.svg')"> -->
  </div>
    
  </div>
</template>
<script lang="ts">
import { Gatway } from "@/shares/services";
import Vue from "vue";
import EmptyContent from "../empty/empty.vue";
export default Vue.extend({
  name: "treasury",
  data() {
    return {
      treasury: null,
      gatitemProfile: {},
    };
  },
  components: {
    EmptyContent,
    // cover: () => import("@/components/Cover.vue"),
  },
  methods: {
    async get() {
      let res = await Gatway.getService("/customers/treasure-box-data/index");
      let data = [] as any; 
      
      // let res1 = await Gatway.getIDService(
      //   "/customers/profile-data/index",
      //   this.$route.params.username
      // );
      // this.gatitemProfile = res1.data.data;
      // console.log(res);
      // res.data.data.filter((item: any) => {
       

      //   data.push(JSON.parse(item.system_note));
      // });
      this.treasury = res.data.data;
    },
  },
  mounted() {
    this.get();
  },
});
</script>
<style lang="scss" scoped>
.nv-box-white {
  position: relative;
  overflow: hidden;
}
.display_name{
  font-size: 20px;
}
.title {
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  text-align: start;
}
.con-tsry {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 25px 30px;
}
.box-tsry {
  display: flex;
  justify-content: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 60px 0px 20px 0px;
  position: relative;
  // overflow: hidden;
  border-radius: 10px;
  margin:20px 0px;
  cursor: pointer;
}
.box-tsry:hover {
  box-shadow: rgba(70, 3, 97, 0.664) 0px 7px 29px 0px;
  transition: all 0.4s ease-in-out;
}
.title-tsry {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0px;
  height: 35px;
  background: #01070780;
  color: #fff;
  left: 0px;
  z-index: 200px;
  border-radius: 12px 12px 0px 0px;
}

.cover {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  // background: #07070780;
  z-index: 100px;
  border-radius: 12px;
}
img {
  // opacity: 0.2;
}
// .image{
//   width: 120% !important;
// }
.btn-c {
  background: #ee7809;
  box-shadow: #eeb909e1 0px 10px 36px 0px, #ee7809 0px 0px 0px 1px;
  width: 150px;
  padding: 5px 10px;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
.nv-box-white {
  position: relative;
  overflow: hidden;
}
$topcover: 280px;
.img-cover {
  position: absolute;
  display: flex;
  justify-content: center;
  left: 0px;
  top: 0px;
  height: $topcover;
  width: 100%;
  background: linear-gradient(
    180deg,
    #61bcbe 10.94%,
    #81aad8 49.48%,
    #ab93f9 100%
  );
}
.contant {
  margin-top: $topcover + 25;
}
.img-profile {
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
.Lv {
  position: absolute;
  bottom: -10px;
  background: #1d2044;
  width: 100px;
  padding: 2px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 50px;
}
.box-username {
  display: flex;
  align-items: center;
  flex-direction: column;
  grid-gap: 5px;
}
.level {
  width: 270px;
  height: 23px;
  border-radius: 30px;
  background: #1d204442;

  margin-top: 10px;
}
.teb-level {
  height: 100%;
  width: 0%;
  border-radius: 30px;
  background: #1d2044;
  box-shadow: 1px 0px 15px 2.5px #9779f8;
  transition: 1s;
  // animation-name: example;
  // animation-duration: 2s;
  // animation-fill-mode: both;
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

  /* identical to box height */

  color: #444349;
}
.con-all {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      align-items: center;
  grid-gap: 20px;
}

.box-all {
  // height: 200px;
  // border: 1px solid #9d9d9d;
  // background: #1d2044;
  border-radius: 7px;
}
.viewprofile {
  position: absolute;
  top: 300px;
  left: 20px;
}
.nv-img-novel {
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
@media (max-width: 1024px) {
  .con-tsry {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .con-tsry {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
   .con-mywork {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
  }
  .con-mywork {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media (max-width: 415px) {
  .con-tsry {
    grid-template-columns: 1fr 1fr;
  }
  .viewprofile {
    position: unset;
  }
  .con-mywork {
    grid-template-columns: 1fr 1fr;
  }
  .con-all {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

