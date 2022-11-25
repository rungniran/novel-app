/* eslint-disable @typescript-eslint/no-unused-vars */
<template>
  
  <div class="Bookshelf">
    <!-- <pre>
      {{bookshelf}}
    </pre> -->
    <div class="nv-box-white nv-mt-40">
      <div v-if="bookshelf">
        <div class="bookshelf">
          <!-- {{bookshelf.length}} -->
          <!-- {{$filter.dateThai(new Date("2022-01-15T00:47:24.676Z"))}} -->
          <div v-for="(item, index) in bookshelf" :key="index" class="item">
            <router-link :to="'/novel/' + item.id" class="img">
              <img
                 v-lazy="
                  item.image_data
                    ? item.image_data.url
                    : $path.image('loading.png')
                "
                class="nv-img-novel"
                onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
                width="100%"
              />
              <div class="count-ep-late" v-if="item.notification_total">
                {{ item.notification_total }}
              </div>
            </router-link>
            <div class="detail">
              <router-link :to="'/novel/' + item.id" class="name line-1">{{
                item.title
              }}</router-link>
              <div class="flex-s">
                <!-- {{item.ep_last}} -->
                <div class="line-1" >
                  <span v-if="item.ep_last"> {{ item.ep_last }} </span>
                  <span v-else>loading...</span>
                </div>
                <div
                  @click="
                    openmodel(item, index)
                  "
                  class="del"
                >
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 25 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.9554 23.5625H16.2946C16.4722 23.5625 16.6426 23.4909 16.7682 23.3634C16.8937 23.236 16.9643 23.0631 16.9643 22.8828V10.6484C16.9643 10.4682 16.8937 10.2953 16.7682 10.1678C16.6426 10.0404 16.4722 9.96875 16.2946 9.96875H14.9554C14.7778 9.96875 14.6074 10.0404 14.4818 10.1678C14.3563 10.2953 14.2857 10.4682 14.2857 10.6484V22.8828C14.2857 23.0631 14.3563 23.236 14.4818 23.3634C14.6074 23.4909 14.7778 23.5625 14.9554 23.5625ZM24.1071 4.53125H19.5084L17.611 1.31973C17.3729 0.917021 17.0361 0.58379 16.6334 0.352507C16.2307 0.121224 15.7758 -0.000223356 15.3131 3.08378e-07H9.68694C9.22441 -2.76842e-05 8.76975 0.121512 8.36724 0.352786C7.96473 0.58406 7.62808 0.917185 7.39007 1.31973L5.49163 4.53125H0.892857C0.656057 4.53125 0.428955 4.62673 0.261512 4.79669C0.0940686 4.96664 0 5.19715 0 5.4375L0 6.34375C0 6.5841 0.0940686 6.81461 0.261512 6.98457C0.428955 7.15452 0.656057 7.25 0.892857 7.25H1.78571V26.2812C1.78571 27.0023 2.06792 27.6938 2.57025 28.2037C3.07258 28.7136 3.75388 29 4.46429 29H20.5357C21.2461 29 21.9274 28.7136 22.4298 28.2037C22.9321 27.6938 23.2143 27.0023 23.2143 26.2812V7.25H24.1071C24.3439 7.25 24.571 7.15452 24.7385 6.98457C24.9059 6.81461 25 6.5841 25 6.34375V5.4375C25 5.19715 24.9059 4.96664 24.7385 4.79669C24.571 4.62673 24.3439 4.53125 24.1071 4.53125ZM9.58929 2.88357C9.61913 2.83316 9.66135 2.79147 9.71182 2.76258C9.76229 2.73369 9.81929 2.71859 9.87723 2.71875H15.1228C15.1806 2.71868 15.2375 2.73383 15.2879 2.76272C15.3382 2.7916 15.3804 2.83324 15.4102 2.88357L16.3845 4.53125H8.61551L9.58929 2.88357ZM20.5357 26.2812H4.46429V7.25H20.5357V26.2812ZM8.70536 23.5625H10.0446C10.2222 23.5625 10.3926 23.4909 10.5182 23.3634C10.6437 23.236 10.7143 23.0631 10.7143 22.8828V10.6484C10.7143 10.4682 10.6437 10.2953 10.5182 10.1678C10.3926 10.0404 10.2222 9.96875 10.0446 9.96875H8.70536C8.52776 9.96875 8.35743 10.0404 8.23185 10.1678C8.10627 10.2953 8.03571 10.4682 8.03571 10.6484V22.8828C8.03571 23.0631 8.10627 23.236 8.23185 23.3634C8.35743 23.4909 8.52776 23.5625 8.70536 23.5625Z"
                      fill="#DF3D0A"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="bookshelf.length === 0">
          <EmptyContent
            pathName="10.png"
            text="ชั้นหนังสือของคุณว่างเปล่า"
           
            fontSize="36px"
          ></EmptyContent>
        </div>
      </div>

      <div v-else>londing...</div>
    </div>
    <!-- <NovelModal2
      ID="BookshelfConfirm"
      IDCrad="BookshelfConfirmCrad"
      ref="BookshelfConfirm"
    >
      <template v-slot:body>
        <div class="Bookshelf-confirm-con">
          <div style="font-size: 20px">ลบหนังสือ</div>
          <div class="line-1">{{ itemBookshelf.title }}</div>
          <div class="bth-grob">
            <button class="nv-btn-yellow" @click="closemodel()">ยกเลิก</button>
            <button
            :disabled="isDelete"
              class="nv-btn-orange"
              @click="del(itemBookshelf.id, indexBookshelf)"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </template>
    </NovelModal2> -->
    <ConfirmDialogue  ref="DeleteEp" @close="close()"></ConfirmDialogue>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
// import Component  from 'vue-class-component'
// import { sms_alert_Bookshelf } from "@/shares/constants/smsalert";
import { Gatway } from "@/shares/services";
import { alert } from "@/shares/modules/alert";
import EmptyContent from "../empty/empty.vue";
import { sms_alert_Bookshelf } from "@/shares/constants/smsalert";
export default Vue.extend({
  name: "Bookshelf",
  data() {
    return {
      bookshelf: null as any,
      itemBookshelf: {} as any,
      indexBookshelf: null,
      isDelete:false,
    };
  },
  components: {
    // NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
    EmptyContent,
  },
  methods: {
    async openmodel(item: any,i) {
       let confirm = await (this as any).$refs.DeleteEp.show({
          title: 'ลบนิยายออกจากชั้นหนังสือ',
          message: `ต้องการลบ ${item.title} ออกจากชั้นหนังสือ`,
          okButton: 'ยืนยัน',
      })
      if(confirm === true){
         await Gatway.DelService(`/customers/novel/remove-bookshelf/${item.id}`
      );
       this.bookshelf.splice(i, 1);
       await (this as any).$refs.DeleteEp.close()
      }
    },

    closemodel() {
      (this as any).$refs.BookshelfConfirm.close();
    },

    async getBookshelf() { 
      let res = await Gatway.getService("/customers/novel/fetch-bookshelf");
      this.bookshelf = res.data.data;
      let remembers = await Gatway.postService("/customers/remembers/novel-data", this.$store.state.storyread.story_Read as any);
      let data = [] as any;
      // this.$store.state.storyread.story_Read.forEach()
      // console.log(this.$store.state.storyread.story_Read);
      res.data.data.forEach((element : any) => {
        const index = remembers.data.data.findIndex((object:any) => {
          if(object){
            return object.id === element.id;
          }
        });
        res.data.data[index] !== undefined
        ? data.push({...element, ep_last:remembers.data.data[index]?.novel_episode_datas[0].name})
        : data.push({...element, ep_last:'ยังไม่ได้อ่านนิยาย'})
      });
      console.log(data);
      this.bookshelf =  data 
    },
  },
  mounted() {
    this.getBookshelf();
  },
});
</script>
<style lang="scss" scoped>
.btn-search {
  background: #e4803a;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 300;
  line-height: 23px;
  color: white;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 7px 25px;
}
.input-btn-emtry-bookshelf {
  margin: 20px 0px 0px 0px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
}
.nv-img-novel{
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
}
.bookshelf {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 40px 15px;
}
.img {
  border-radius: 12px;
}
img.img-no-data {
  width: 70%;
}
.img-dragon {
  display: flex;
  justify-content: center;
}
.item {
  border-radius: 13px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  //    box-shadow: rgba(99, 99, 99, 0.571) 0px 2px 8px 0px;
}
.text-no {
  color: #fff;
  margin: 30px 50px;
  font-size: 20px;
}
figure {
  width: intrinsic;
}
.talkbubble {
  width: 100%;
  font-size: 36px;
  font-weight: 900;
  line-height: 40px;
  color: #e4803a;
}
input {
  height: 41px;
  border: 1px solid #e4803a;
  display: flex;
  align-items: center;
}
input::placeholder {
  font-size: 18px;
  color: #cfd4df;
}

.name {
  color: #1e2046;
  font-size: 18px;
}
.image-box {
  display: flex;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  justify-content: center;
  align-items: center;
}
.flex-s {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fa-dumpster {
  color: crimson;
}
.detail {
  display: flex;
  flex-direction: column;
  grid-gap: 0px;
  padding: 0px 4px;
}
.count-ep-late {
  position: absolute;
  //    width: 30px;
  //    height: 30px;
  padding: 0px 8px;
  color: #fff;
  background: #fc6f6f;
  border-radius: 5px;
  right: -10px;
  top: -10px;
}
.img {
  position: relative;
}

.bth-grob {
  display: flex;
  grid-gap: 20px;
}
.Bookshelf-confirm-con {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  align-items: center;
}
.del {
  cursor: pointer;
}
@media (max-width: 1024px) {
  .bookshelf {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
  //   .talkbubble {
  //   font-family: "Roboto";
  //   font-size: 28px;
  //   font-weight: 900;
  //   line-height: 40px;
  //   color: #e4803a;
  // }
}
@media (max-width: 820px) {
  .text-no {
    width: 60%;
    margin: 16px 50px;
  }
}
@media (max-width: 768px) {
  .bookshelf {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }
  .talkbubble {
    font-size: 27px;
  }
  .text-no {
    width: 360px;
    font-size: 18px;
    margin: 25px 50px;
  }
}
@media (max-width: 415px) {
  .image-box {
    text-align: center;
    grid-template-columns: 1fr;
  }
  img.img-no-data {
    margin-bottom: 10px;
  }
  .talkbubble {
    font-size: 25px;
    font-weight: 900;
    line-height: 40px;
    color: #e4803a;
  }
  .input-btn-emtry-bookshelf {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 10px;
  }

  .bookshelf {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  .talkbubble:before {
    display: none;
  }
}
</style>
