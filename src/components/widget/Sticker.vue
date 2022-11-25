<template>
  <NovelModal2 ID="Sticker" IDCrad="StickerCard" ref="Sticker" :Close="true">
    <template v-slot:body>
       <span v-if="sticker">
          <carousel :nav="false" :dots="false" :items="5">
            <div
              v-for="(item, index) in sticker"
              :key="index"
              class="title line-1"
              @click="filter(item)"
            >
              {{ item.name }}
            </div>
          </carousel>
        </span>
        <div class="con-item" v-if="stickerss">
          <div v-for="(item, index) in stickerss" :key="index">
            <div
              v-if="item.image_data"
              @click="addstikerf(item.image_data.url)"
            >
              <img
                v-lazy="item.image_data.url"
                :alt="item.name"
                class="stiker-img"
              />
            </div>
          </div>
        </div>
        <div v-else class="no-sticker">
          <div class="layout-sticker-modal">
            <p>คุณยังไม่มีสติ๊กเกอร์</p><br>
            <router-link to="/exchange#sticker" class="nv-btn-yellow">ไปร้านสติ๊กเกอร์</router-link>
          </div>
        </div>
    </template>
  </NovelModal2>
</template>
<script lang="ts">
import NovelModal2 from "@/components/widget/NovelModal2.vue";
import Vue from "vue";
import { Gatway } from "@/shares/services";
import carousel from "vue-owl-carousel";
export default Vue.extend({
  name: "Sticker",
  components: {
    NovelModal2,
    carousel,
  },
  data(){
    return{
      sticker:null as any,
      stickerss:null as any
    }
  },
  methods: {
    async openmodel() {
      // this.getListstiger()
      if(this.$store.state.auth.token){
        await (this as any).$refs.Sticker.open();
      }else{
         (this as any).$base.openlogin()
      }
      
    },
    async close(){
       await (this as any).$refs.Sticker.close();
    },
    async getListstiger() {
      
      let res = await Gatway.getService("/customers/treasure-box-data/sticker");
      // console.log(res.data.data);
      this.sticker = await res.data.data;
      // await this.filter(res.data.data[0]);
    },
    async filter(item: any) {
      item !== undefined ? (this.stickerss = item.shop_item_datas) : null;
    },
    addstikerf(stiker: any) {
      this.$emit("addstikerf", stiker)
      const editer = document.getElementById(
        localStorage.getItem("s") as any
      ) as any;
      const element = document.createElement("img");
      element.setAttribute("src", stiker);
      element.setAttribute("class", "stiker-img");
      editer.appendChild(element);
      this.close()
      // this.onInput();
      // this.close();
    },
    
  },
  mounted(){
    if(this.$store.state.auth.token){
      this.getListstiger()
    }
    
  }
});
</script>
<style lang="scss" scoped>
.con-item {
  display: grid;
  margin-top: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      justify-items: center;
}
.stiker-img {
  height: 70px;
  width: 70px;
}
.title {
  padding: 10px 10px 5px 10px;
  // width: 100px;
  font-size: 13px;
  text-align: center;
  border-bottom: 1px solid #dedede;
}
.title:hover {
  background: #dfdfdf;
}
.layout-sticker-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>