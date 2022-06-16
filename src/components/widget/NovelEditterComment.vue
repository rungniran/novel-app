<template>
  <div class="text-editer">
    <div class="option-icon">
      <!-- <i class="fas fa-bookmark" @click="spoler(index)"></i>
      <i class="fas fa-icons"></i> -->
      <i class="fas fa-sticky-note" @click="opanstiker(Editer)"></i>
    </div>
    <div
      :contenteditable="true"
      placeholder="oksdofmk"
      ondragenter="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
      ondragover="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
      class="Editer"
      :id="Editer"
      @input="onInput()"
      v-html="htmt"
    >
      <!-- <span style="color:gray">แสดงความคิดเห็น</span> -->
    </div>
    {{ test }}
    <div class="con-submit">
      <div class="nv-btn-yellow submit" @click="submit($event)">ส่ง</div>
    </div>
    <div id="stiker">
      <div class="con-stiker" v-if="sticker">
        <div @click="close()" class="close">
        <i class="fas fa-times-circle" ></i>
        </div>
        <!-- <div class="con-title-stiker" v-if="sticker"> -->
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
        <!-- </div> -->
        <div class="con-item">
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
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Cheerup } from "@/shares/constants";
import { Gatway } from "@/shares/services";
import { shop_type_data_id } from "@/shares/constants/enum"
import carousel from "vue-owl-carousel";
export default Vue.extend({
  name: "NovelEditterComment",
  props: {
    novelDataId: String,
    htmt: String,
    Editer: {
      type: String,
      default: "Editer",
    },
  },
  components: {
    carousel,
  },

  data() {
    return {
      cheerup: Cheerup,
      obj: {
        action: "click-post",
        html: "",
        star: "0",
        novel_data_id: "",
      },
      test: "",
      sticker: null as any,
      stickerss: [] as any,
    };
  },
  methods: {
    opanstiker(as) {
      let conModal = document.getElementById("stiker") as HTMLElement;

      this.filter(this.sticker[0]);
      localStorage.setItem("s", as);
      conModal.style.display = "flex";
    },
    addstikerf(stiker: any) {
      const editer = document.getElementById(
        localStorage.getItem("s") as any
      ) as any;
      const element = document.createElement("img");
      element.setAttribute("src", stiker);
      element.setAttribute("class", "stiker-img");
      editer.appendChild(element);
      this.onInput();
      this.close();
    },
    close() {
      let conModal = document.getElementById("stiker") as HTMLElement;
      conModal.style.display = "none";
    },
    onInput() {
      let html = document.getElementById(this.Editer) as HTMLElement;
      var text = html.innerHTML;
      this.$emit("htmt", html);
      return text;
    },
    async comment(Obj: any) {
      console.log();

      let res = await Gatway.postService(
        "/customers/comments/post",
        Obj as any
      );
      return res;
    },
    async submit(e: any) {
      let html = this.onInput();
      this.$emit("click", html, e);
      this.reset();
      // this.$emit('fetch', this.obj, index)
      // this.fetchComment(uuid)
    },
    reset() {
      let html = document.getElementById("Editer") as HTMLElement;
      html.innerHTML = "";
    },
    async getListstiger() {
      let res = await Gatway.getService("/customers/treasure-box-data/index");
      let data = [] as any;
     
      
      res.data.data.filter((res: any) => {
        // console.log( JSON.parse(res.system_note));
        if(JSON.parse(res.system_note).shop_type_data_id === shop_type_data_id.sticker){
          data.unshift({
            id: JSON.parse(res.system_note).id,
            name: JSON.parse(res.system_note).name,
          });
        }
      });
      let ressticker = await Gatway.postService("/guest/shop-data/lists", {
        shop_type_data_id: "9c1c64df-3516-4098-8575-1c3470206710",
      } as any);
      ressticker.data.data.filter((res: any) => {
        if (res.diamond === null || parseInt(res.diamond) === 0) {
          data.push({
            id: res.id,
            name: res.name,
          });
        }
      });
      const uniq = new Set(data.map((e: any) => JSON.stringify(e)));
      const resa = Array.from(uniq).map((e: any) => JSON.parse(e));
      this.sticker = await resa;
    },
    async filter(item: any) {
      let res = await Gatway.getIDService("admin/shop-data-topic", item.id);

      // this.sticker.filter((res:any)=>{

      //   if(res.id === item.id){
      //     // console.log(res.shop_item_datas);
      //      this.stickerss = res.shop_item_datas
      //     // data.push(res)
      //   }
      // })
      this.stickerss = res.data.data.shop_item_datas;
    },
  },
  mounted() {
    this.getListstiger();
  },
});
</script>
<style lang="scss" scoped>
.t-reply {
  font-size: 20px;
  /* color: #565656; */
  margin-bottom: 0px;
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
.po-reply {
  color: #ffffff;
  position: absolute;
  right: 15px;
  bottom: 8px;
  align-items: center;
  display: flex;
  gap: 5px;
  cursor: pointer;
}
.review-date {
  font-size: 13px;
}

.input-comment {
  margin-left: 60px;
  background: #ffff;
  display: grid;
  position: relative;
  gap: 10px;
}
.Editer {
  min-height: 80px;
  margin-right: 70px;
}
.text-editer {
  padding: 20px;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
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
.Editer:focus-visible {
  outline: none;
}
#stiker {
  position: fixed;
  background: #000000c1;
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
  min-height: 450px;
  position: relative;
  overflow: hidden;
   width: 550px;
  // display: grid;
  padding: 0px 20px;
  // grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background: #ffffff;
  border-radius: 10px;
  // // padding: 20px;
  // justify-items: center;
  // align-items: center;
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

#Editer .spolers {
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
.title {
  padding: 10px;
  // width: 100px;
  font-size: 13px;
  text-align: center;
  border-bottom: 1px solid #dedede;
}
.title:hover {
  background: #dfdfdf;
}
.con-item {
  display: grid;
  margin-top: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.stiker-img {
  height: 100px;
  width: 100px;
}
.con-title-stiker {
  position: absolute;
  // margin: 0px 20px;
  display: flex;
  // gap: 20px;
}
.close{
  position: absolute;
    right: 5px;
    font-size: 20px;
    cursor: pointer;
    z-index: 1000;
}

@media (max-width: 415px) {
  .text-review {
    font-size: 17px;

    margin-left: 0px;
  }
  .con-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: 20px;
    justify-items: center;
  }
  .con-stiker {
    width: 100%;
    padding: 0px;
  }
  .con-item
  {
    margin: 20px 0px;
  }
  .title{
    width: 100px;
  }
  .stiker-img {
    height: 80px;
    width: 80px;
}
}
</style>