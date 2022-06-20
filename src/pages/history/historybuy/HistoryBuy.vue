<template>
  <!-- <div class="HistoryBuy">
    <router-link
      v-for="(item, index) in listbuy"
      :key="index"
      to="/read/1"
      class="con-storyBuy"
    >
      <div class="detail-novel">
        <img
          class="buy-history-img"
          src="https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/61d58aa01353ba001c779a4d/61dc081cUzBPUw7w.jpeg"
        />
        <div class="content-information-novel">
          <h1 class="title line-1">Nam sunt pariatur</h1>
          <div class="content-subtitle">
            <p>ประเภท:</p>
            <p class="wrap-content">กำลังภายใน</p>
          </div>
          <div class="content-subtitle">
            <p>ผู้เผยแพร่:</p>
            <p class="wrap-content">Novel Kingdom Public</p>
          </div>
          <br class="lp" />
          <div class="content-subtitle2">
            <p>จำนวนตอนซื้อรวม:</p>
            <div class="buy-coin">
              <img
                src="https://cdn-icons-png.flaticon.com/512/864/864702.png"
                height="20px"
              />
              <p>1250 ตอน</p>
            </div>
          </div>
          <div class="content-subtitle2">
            <p>จำนวนเหรียญซื้อรวม:</p>
            <div class="buy-coin">
              <img :src="$path.image('coin-gold.png')" height="20px" />
              <p>{{ item.amount }} เหรียญ</p>
            </div>
          </div>
        </div>
      </div>


    </router-link>
  </div> -->
  <div class="HistoryBuy">
    <router-link v-for="item, index in listbuy" :key="index" to="/read/1" class="con-storyBuy">
      <div class="detail-novel" >
        <img src="https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/61d58aa01353ba001c779a4d/61dc081cUzBPUw7w.jpeg" width="18%">
        <div>
          <p class="name">Nam sunt pariatur autem ut</p><br>
          <p>บทที่ 1 กลายเป็นแม่ของวายร้าย</p>
            <div class="buy-coin" >
            <img :src="$path.image('coin-gold.png')" height="20px" >
          <div >{{item.amount}}</div>
        </div>
        </div>
      </div>
      <div>
         <p> 8 เม.ย. 2022, 12:04 </p>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
export default Vue.extend({
  data() {
    return {
      listbuy: [],
    };
  },
  methods: {
    async getHistoryRead() {
      let res = await Gatway.getService(
        "/customers/transaction-data/fetch-transaction"
      );
      let data = [] as any;
      res.data.data.filter((item) => {
        console.log(item.amount);
        if (item.amount < 0) {
          data.push(item);
        }
      });
      this.listbuy = data;
      console.log(data);
    },
  },
  mounted() {
    this.getHistoryRead();
  },
});
</script>
<style lang="scss" scoped>
// .HistoryBuy {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
// }

// .buy-history-img {
//   width: 30%;
//   padding: 10px;
//   border-radius: 20px;
// }

// .detail-novel {
// }

// .wrap-content {
//   border-radius: 20px;
//   border: 1px solid rgb(200, 200, 200);
//   padding: 0px 4px;
//   width: fit-content;
// }

// .content-subtitle {
//   display: grid;
//   grid-template-columns: 1fr 2fr;
//   margin: 5px 0px;
// }

// .content-subtitle2 {
//   display: grid;
//   grid-template-columns: 1.6fr 1.6fr;
//   margin: 5px 0px;
// }

// .con-storyBuy {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   border: 1px solid rgba(224, 175, 243, 0.977);
//   border-radius: 12px;
//   margin:10px;
//   background-color: white;
// }
// .detail-novel {
//   display: flex;
//   gap: 20px;
// }
// .title {
//   font-size: 25px;
//   text-align: center;
// }
// .buy-coin {
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   margin-left: 5px;
// }

// @media (max-width: 1024px) {
// }

// @media (max-width: 820px) {
//   p {
//     font-size: 12px;
//   }
//   .title {
//     font-size: 20px;
//   }

//   .detail-novel {
//   display: flex;
//   gap: 5px;
// }

//   .buy-history-img {
//     width: 35%;
//     padding: 10px;
//     border-radius: 20px;
//   }
//   .content-subtitle2 {
//     display: grid;
//     grid-template-columns: 1.6fr 1.5fr;
//     margin: 5px 0px;
//   }
// }

// @media (max-width: 768px) {
//   p {
//     font-size: 12px;
//   }
//   .title {
//     font-size: 20px;
//   }

//   .detail-novel {
//   display: flex;
//   gap: 5px;
// }

//   .buy-history-img {
//     width: 35%;
//     padding: 10px;
//     border-radius: 20px;
//   }
//   .content-subtitle2 {
//     display: grid;
//     grid-template-columns: 1.6fr 1.5fr;
//     margin: 5px 0px;
//   }
// }

// @media (max-width: 415px) {
//   .HistoryBuy {
//     display: grid;
//     grid-template-columns: 1fr;
//   }
//   .img-history-read {
//     height: auto;
//     width: 70%;
//     object-fit: cover;
//   }
//   .title {
//     font-size: 17px;
//     display: flex;
//     justify-content: center;
//     text-align: start;
//   }

//   p {
//     font-size: 11px;
//   }

//   .content-subtitle2 {
//     display: grid;
//     grid-template-columns: 1.7fr 1.5fr;
//     margin: 5px 0px;
//   }
// }
.con-storyBuy{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  // border: 1px 0 0  0 solid rgba(204, 204, 204, 0.977);
}
.detail-novel{
  display: flex;
  align-items: center;
  gap: 15px;
}
.name{
    font-size: 25px;
}
.buy-coin{
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
