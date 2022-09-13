<template>
  <div class="HistoryBuy">
    <!-- {{listbuy.data.length}} -->
    <div v-if="listbuy">
      <div
        v-for="(item, index) in listbuy.data"
        :key="index"
        class="con-storyBuy pc"
      >
        <div class="detail-novel" >
          <img
            class="img-history-buy"
            v-if="item.payment_data.novel_data"
            v-lazy="
              item.payment_data.novel_data.image_data
                ? item.payment_data.novel_data.image_data.url
                : ''
            "
            @error="$event.target.src = $path.image('loading.png')"
          />
          <img
            v-else
            v-lazy="$path.image('loading.png')"
            class="img-history-buy"
          />
          <div>
            <p class="name line-1">
              <span v-if="item.payment_data.novel_data">
                {{ item.payment_data.novel_data.title }}</span
              >
            </p>
            <!-- <div v-if="item.payment_data.payment_transaction_datas">
              <div v-if="item.payment_data.payment_transaction_datas.length <= 1 ">
                <span v-if="JSON.parse(item.payment_data.payment_transaction_datas[0].json_data)"> 
                  {{JSON.parse(item.payment_data.payment_transaction_datas[0].json_data).name}}
                </span>
              </div>
              <div v-else>
                  ซื้อยกเซต 
                  {{JSON.parse(item.payment_data.payment_transaction_datas[0].json_data).name}} - 
                  {{JSON.parse(item.payment_data.payment_transaction_datas[item.payment_data.payment_transaction_datas.length - 1].json_data).name}}
              </div>
            </div> -->
            <p
              class="sub-title"
              v-if="item.payment_data.payment_transaction_datas"
            >
              <span
                v-if="item.payment_data.payment_transaction_datas.length === 1"
              >
                <span
                  v-if="
                    JSON.parse(
                      item.payment_data.payment_transaction_datas[0].json_data
                    )
                  "
                >
                  ตอนที่ #{{
                    JSON.parse(
                      item.payment_data.payment_transaction_datas[0].json_data
                    ).ep_no
                  }}
                </span>
              </span>
              <span v-else>
                <span v-if="JSON.parse( item.payment_data.payment_transaction_datas[0].json_data)">
                  ชื้อเป็นชุด ตอนที่ #{{
                    JSON.parse(
                      item.payment_data.payment_transaction_datas[0].json_data
                    ).ep_no
                  }}
                  ถึง
                </span>
                <span v-if="JSON.parse( item.payment_data.payment_transaction_datas[item.payment_data.payment_transaction_datas.length - 1].json_data)">
                  ตอนที่ #{{
                    JSON.parse(
                      item.payment_data.payment_transaction_datas[
                        item.payment_data.payment_transaction_datas.length - 1
                      ].json_data
                    ).ep_no
                  }}
                </span>
              </span>
            </p>
          </div>
        </div>
        <!-- <div v-else>

        </div> -->
        <div class="date-price">
          <p>{{ $filter.toThaiDateString(item.created_at) }}</p>
          <div class="buy-coin">
            <img :src="$path.image('coin-gold.png')" height="20px" />
            <p class="custom-font-coin">{{ item.payment_data.total }} เหรียญ</p>
          </div>
        </div>
      </div>
      <div
        v-for="(item, index) in listbuy.data"
        :key="index"
        class="con-storyBuy-mobile mobile"
      >
        <div class="detail-novel">
          <img
            class="img-history-buy"
            v-if="item.payment_data.novel_data"
            v-lazy="
              item.payment_data.novel_data.image_preview !== ''
                ? item.payment_data.novel_data.image_preview
                : $path.image('loading.png')
            "
            @error="$event.target.src = $path.image('loading.png')"
          />
          <img class="img-history-buy" v-else v-lazy="$path.image('loading.png')" />
          <div class="detail-novel-buy">
            <p class="name line-1">
              <span v-if="item.payment_data.novel_data">
                {{ item.payment_data.novel_data.title }}</span
              >
              <span v-else> </span>
            </p>
            <p
              class="sub-title"
              v-if="item.payment_data.payment_transaction_datas"
            >
              <span
                v-if="item.payment_data.payment_transaction_datas.length === 1"
              >
                <span
                @click="read(JSON.parse(
                      item.payment_data.payment_transaction_datas[0].json_data
                    ))"
                  v-if="
                    JSON.parse(
                      item.payment_data.payment_transaction_datas[0].json_data
                    )
                  "
                >
                  ตอนที่ #{{
                    JSON.parse(
                      item.payment_data.payment_transaction_datas[0].json_data
                    ).ep_no
                  }}
                </span>
              </span>
              <span v-else>
                <span v-if="JSON.parse( item.payment_data.payment_transaction_datas[0].json_data)">
                  ชื้อเป็นชุด ตอนที่ #{{
                    JSON.parse(
                      item.payment_data.payment_transaction_datas[0].json_data
                    ).ep_no
                  }}
                  ถึง
                </span>
                <span v-if="JSON.parse( item.payment_data.payment_transaction_datas[item.payment_data.payment_transaction_datas.length - 1].json_data)">
                  ตอนที่ #{{
                    JSON.parse(
                      item.payment_data.payment_transaction_datas[
                        item.payment_data.payment_transaction_datas.length - 1
                      ].json_data
                    ).ep_no
                  }}
                </span>
              </span>
            </p>
            <div class="buy-coin-mobile">
              <p>{{ $filter.toThaiDateString(item.created_at) }}</p>
              <div style="display: flex; gap: 5px">
                <img :src="$path.image('coin-gold.png')" height="20px" />
                <p class="custom-font-coin">
                  {{ item.payment_data.total }} เหรียญ
                </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div v-if="listbuy.data.length === 0">
        <EmptyContent
          class="image"
          pathName="6.png"
          text="คุณยังไม่มีประวัติการซื้อนิยาย"
          fontSize="36px"
        ></EmptyContent>
      </div>
      <NovelPaginate v-else :count="listbuy.last_page" @click="getlist" />
    </div>
    <div v-else>loading...</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import NovelPaginate from "@/components/widget/NovelPaginate.vue";
// import { transaction_type_data } from "@/shares/constants/enum";
import EmptyContent from "../../empty/empty.vue";
const monthset = {
  "01": "ม.ค.",
  "02": "ก.พ.",
  "03": "มี.ค.",
  "04": "เม.ย.",
  "05": "พ.ค.",
  "06": "มิ.ย.",
  "07": "ก.ค.",
  "08": "ส.ค.",
  "09": "ก.ย.",
  "10": "ต.ค.",
  "11": "พ.ย.",
  "12": "ธ.ค.",
};
export default Vue.extend({
  data() {
    return {
      listbuy: null,
      per_page: [] as any,
      datalistdate: null,
      monthset: monthset,
    };
  },
  components: {
    EmptyContent,
    NovelPaginate,
  },
  methods: {
    async getlist(page) {
      let res = await Gatway.getService(
        "/customers/transaction-data/fetch-transaction/ซื้อนิยาย?page=" + page
      );
      
      this.listbuy = res.data.data;
    },
    read(id){
      
       this.$router.push('/read'+ id)
    }
  },
  mounted() {
    this.getlist(1);
    // this.getCadis();
  },
});
</script>
<style lang="scss" scoped>
.img-history-buy {
  height: auto;
  width: 145px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

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
.date-price{
  // display: flex;
  width: fit-content;
}
.active-item {
  padding: 5px 15px;
  background-color: #645692;
  border-radius: 50%;
  color: #ffff;
  cursor: pointer;
}

.con-storyBuy {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 20px;
  // padding: 10px;
  border-radius: 10px;
  // border: 1px 0 0  0 solid rgba(204, 204, 204, 0.977);
}
.sub-title {
  color: rgb(168, 166, 166);
  font-size: 1ุ5px;
}
.detail-novel {
  display: flex;
  align-items: center;
  gap: 15px;
}
.name {
  font-size: 25px;
}
.buy-coin {
  display: flex;
  align-items: center;
  gap: 10px;
}
.con-page {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
}
.NovelPaginate {
  display: flex;
  justify-content: center;
}
.nv-page {
  display: flex;
  justify-content: center;
}
.nopage {
  cursor: pointer;
}
.item {
  cursor: pointer;
}
.mobile {
  display: none;
}
p {
  font-size: 20px;
}

@media (max-width: 820px) {
  // .name {
  //   font-size: 20px;
  // }
  // p {
  //   font-size: 17px;
  // }
  .img-history-buy {
    width: 25%;
  }
  .detail-novel {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 450px;
}
}
@media (max-width: 768px) {
  .name {
    font-size: 20px;
  }
  p {
    font-size: 17px;
  }
}
@media (max-width: 680px) {
    .detail-novel {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 350px;
}
}

@media (max-width: 520px) {
  .detail-novel-buy {
    width: 100%;
  }
  .img-history-buy {
    width: 28%;
  }
  .name {
    font-size: 17px;
  }
  .custom-font-coin {
    font-size: 15px;
  }
  p {
    font-size: 15px;
  }
  .con-storyBuy {
    display: grid;
    grid-template-columns: auto;
    // margin-bottom: 20px;
    // border: 1px 0 0  0 solid rgba(204, 204, 204, 0.977);
  }
  .con-storyBuy-mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white !important;
    // padding: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    // border: 1px 0 0  0 solid rgba(204, 204, 204, 0.977);
  }
  .buy-coin-mobile {
    display: flex;
    justify-content: space-between;
  }
  .pc {
    display: none;
  }
  // .buy-coin {
  //   flex-direction: columns !important;
  // }
  // .pc {
  // display: contents;
  // display: flex;
  // justify-content: space-between;
  // }
}
</style>
