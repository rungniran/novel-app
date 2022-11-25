<template>
  <div class="DragonHouse" v-if="listdragon">
    <div>
      <div class="title-dragon">ทำเนียบนักรบโลหิตมังกร</div>
      <!-- <div class="maintain-system">ระบบกำลังอยู่ระหว่างการปิดปรับปรุง</div> -->
    </div>
    <div class="Dragon-con">
      <!-- <pre>{{listdragon[1].user_profile_datas[1]}}</pre> -->
      <div class="con-list-dragon">
        <div
          v-for="(item, index) in listdragon"
          :key="index"
          class="box-list-dragon"
        >
          <div v-if="item.user_profile_datas[0]">
            <span class="glowing-text" v-if="item.user_profile_datas[0].user_nickname">
              {{ index + 1 }}&nbsp;
              {{ item.user_profile_datas[0].user_nickname }}
            </span>
            <span
              class="glowing-text"
              v-else
            >
              {{ index + 1 }}&nbsp;
              {{ item.user_profile_datas[0].first_name }}
              {{ item.user_profile_datas[0].last_name }}
            </span>
          </div>
          <span class="glowing-text" v-else>
            {{ index + 1 }}&nbsp;
            {{ item.username }}
          </span>
        </div>
      </div>
      <div class="con-dragon-img">
        <img :src="$path.image('dragon.png')" class="img-dragon" />
      </div>
    </div>
    <!-- <div v-else>
      Loading...
    </div> -->
    <div class="more-list">
      <router-link to="/listdragonhouse" class="btn-link btn-read-more"
        >ดูทั้งหมด</router-link
      >
    </div>
    <!-- <div class="con-dragon-img">
      <img :src="$path.image('dragon.png')" class="img-dragon" />
    </div> -->
    <!-- </div> -->
  </div>
</template>
<script lang="ts">
import { Gatway } from "@/shares/services";
import Vue from "vue";
export default Vue.extend({
  name: "DragonHouse",
  data() {
    return {
      listdragon: null,
    };
  },
  methods: {
    async getListDragon() {
      let getListDragon = await Gatway.getService(
        "/guest/index/dragon-ranking"
      );
      // console.log(getListDragon.data);
      this.listdragon = getListDragon.data.data.slice(0, 5);
    },
  },
  mounted() {
     if((this as any).$isdrogon.includes(this.$route.params.id) === true){
         this.getListDragon();
    }
    // this.getListDragon();
  },
});
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "EDMuzazhi";
  src: url(/fonts/EDMuzazhi.ttf);
}
.maintain-system {
  display: flex;
  justify-content: center;
  font-size: 25px;
  color: gold;
}
.more-list {
  display: flex;
  justify-content: center;
}
.DragonHouse {
  height: 100%;
  padding: 20px 35px;
  padding-bottom: 20px;

  background: linear-gradient(
    181deg,
    rgba(100, 91, 124, 1) 0%,
    rgba(159, 149, 187, 1) 47%,
    #776d92 100%
  );
}
.glowing-text {
  font-size: 25px;
  color: #ffeaa4;
  text-align: center;
  -webkit-animation: glowing-text 1.4s ease-in-out infinite alternate;
  -moz-animation: glowing-text 1.4s ease-in-out infinite alternate;
  animation: glowing-text 1.4s ease-in-out infinite alternate;
}
.num-ranking {
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
.img-dragon {
  height: 400px;
}
.title-dragon {
  color: #fff;
  display: flex;
  justify-content: center;
  font-size: 30px;
}
.btn-read-more {
  background: #ffffff;
  border: 2px solid #e4803a;
  border-radius: 40px;
  padding: 10px 30px;
  margin-top: 20px;
  font-weight: 500;
  font-size: 20px;
  line-height: 19px;
  color: #e4803a;
}
.Dragon-con {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 15px;
}
.con-list-dragon {
  display: grid;
  grid-gap: 20px;
}

.box-list-dragon {
  padding: 10px 40px;
  border-radius: 40px;
  background: #fff;
  border: 2px solid #f1925b;
}
.con-dragon-img {
  display: flex;
  justify-content: center;
}
@media (max-width: 820px) {
  .glowing-text {
    font-size: 20px;
  }
}
@media (max-width: 500px) {
  .con-dragon-img {
    display: none;
  }
  .Dragon-con {
    grid-template-columns: 1fr;
  }
  .DragonHouse {
    padding: 20px 5px;
    padding-bottom: 50px;
  }
  .maintain-system {
    display: flex;
    justify-content: center;
    font-size: 17px;
  }
  .box-list-dragon {
    // background: #5f5c7f;
    background-color: white;
  }
  .title-dragon {
    font-size: 20px;
    text-align: center;
  }
}
</style>
