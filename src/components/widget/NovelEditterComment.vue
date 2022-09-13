<template>
  <div class="text-editer">
    <div class="option-icon">
      <!-- <i class="fas fa-bookmark" @click="spoler(index)"></i>
      <i class="fas fa-icons"></i> -->
      <div><i class="fas fa-sticky-note" @click="opanstiker(Editer)"></i></div>
      <emoji-picker @emoji="insert">

        <div
          slot="emoji-invoker"
          slot-scope="{ events: { click: clickEvent } }"
          @click.stop="clickEvent"
        >

          <i class="fa fa-smile-o" @click="opanemoji(Editer)"></i>
        </div>
        <div slot="emoji-picker" slot-scope="{ emojis, insert }">
          <div class="model-emoji">

            <div>
              <div v-for="(emojiGroup, category) in emojis" :key="category">
                <h5>{{ category }}</h5>
                <span
                  class="emoji-space"
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                  >{{ emoji }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </emoji-picker>
    </div>
    <div
      :contenteditable="true"
      ondragenter="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
      ondragover="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
      class="Editer"
      oncopy="return false"
      onpaste="return false"
      :id="Editer"
      @input="onInput()"
      v-html="htmt"
    >
      <!-- <span style="color:gray">แสดงความคิดเห็น</span> -->
    </div>
    {{ test }}
    <div class="con-submit">
      <button :disabled="issubmit" class="nv-btn-yellow submit" @click="cleck ? submit($event) : $base.openlogin()">ส่ง</button>
    </div>
    <div id="stiker">
      <!-- {{sticker}} -->
      <div class="con-stiker">
        <div @click="close()" class="close">
          <i class="fas fa-times-circle"></i>
        </div>
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
      </div>
    </div>
    <!-- <textarea v-model="input"></textarea> -->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Cheerup } from "@/shares/constants";
import { Gatway } from "@/shares/services";
// import { shop_type_data_id } from "@/shares/constants/enum";
import EmojiPicker from "vue-emoji-picker";
import carousel from "vue-owl-carousel";
// import EmptyContent from "../../pages/empty/empty.vue";
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
    EmojiPicker,
    // EmptyContent,
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
      stickerss: null as any,
      issubmit:false
    };
  },
  methods: {
    async opanstiker(as: any) {

      await this.getListstiger();

      await this.filter(this.sticker[0]);
      await localStorage.setItem("s", as);
      // let conModal = (await document.getElementById("stiker")) as HTMLElement;
      // conModal.style.display = await "flex";
    },
    opanemoji(as: any) {
      localStorage.setItem("s", as);
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
    insert(moji) {
      const editer = document.getElementById(
        localStorage.getItem("s") as any
      ) as any;
      const element = document.createElement("span");
      // var span = document.getElementById('my-span');
      // console.log(span);

      editer.appendChild(document.createTextNode(moji));
      //  var my_text = element.createTextNode('Hello!');
      //   editer.appendChild(my_text);

      //   editer.createTextNode('dssd')
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
      let res = await Gatway.postService(
        "/customers/comments/post",
        Obj as any
      );
      return res;
    },
    async submit(e: any) {
      this.issubmit = true
      let html = this.onInput();
      if (html !== '') {
        await this.$emit("click", html, e);
        this.issubmit = false
        await this.reset();
      }
      this.issubmit = false
      // this.$emit('fetch', this.obj, index)
      // this.fetchComment(uuid)
    },
    reset() {
      
      let html = document.getElementById("Editer") as HTMLElement;
      html.innerHTML = "";
    },
    async getListstiger() {
      let res = await Gatway.getService("/customers/treasure-box-data/sticker");
      // console.log(res.data.data);
      this.sticker = res.data.data;
      if (res) {

        let conModal = (await document.getElementById("stiker")) as HTMLElement;
        conModal.style.display = await "flex";
      }
    },
    async filter(item: any) {
      item !== undefined ? (this.stickerss = item.shop_item_datas) : null;
    },
  },
  mounted() {
    // this.getListstiger();
  },
});
</script>
<style lang="scss" scoped>
.layout-sticker-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
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
  font-family: "Sarabun", sans-serif;
}
.text-editer {
  padding: 20px;
  border: 1px solid #d7d7d7;
  // border-radius: 0 0 10px 10px !important;
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
.model-emoji {
  position: absolute;
  right: 0px;
  z-index: 1000;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px;
  height: 500px;
  width: 400px;
  overflow-y: scroll;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
[contenteditable] {
    -webkit-user-select: text;
    user-select: text;
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
  padding: 10px 10px 5px 10px;
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
      justify-items: center;
}
.stiker-img {
  height: 70px;
  width: 70px;
}
.con-title-stiker {
  position: absolute;
  // margin: 0px 20px;
  display: flex;
  // gap: 20px;
}
.close {
  position: absolute;
  right: 5px;
  font-size: 20px;
  cursor: pointer;
  z-index: 1000;
}

.emoji-space {
  // padding-left: 3px;
}

@media (max-width: 415px) {
  .model-emoji {
    height: 350px;
  width: 300px;

  }
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
    width: 90%;
    padding: 0px;
  }
  .con-item {
    margin: 20px 0px;
  }
  .title {
    width: 100px;
  }
  .stiker-img {
    height: 80px;
    width: 80px;
  }
}
</style>
