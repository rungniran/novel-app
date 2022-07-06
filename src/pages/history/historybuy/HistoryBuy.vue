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
    <select @change="group">	
        <option v-for="item,index in datalistdate" :key="index" :value="`${item.y}-${item.m}-${item.d}`">{{monthset[item.m]}} {{item.y}}</option>
      </select><br><br>
    <div v-if="listbuy">
      <div
        v-for="(item, index) in listbuy"
        :key="index"
    
        class="con-storyBuy"
      >
      <!-- <pre> {{item.payment_data.payment_transaction_datas.name}}</pre>     :to="'/read/'"+item.payment_data.payment_transaction_datas[0].novel_episode_data.id-->
        <div class="detail-novel">
          <img
            v-lazy="item.payment_data.novel_data.image_preview"
            width="100px"
          />
          <div>
            <p class="name">{{ item.payment_data.novel_data.title }}</p>
            <!-- <p>{{item.payment_data.payment_transaction_datas[0].novel_episode_data.name}}</p> -->
            <div class="buy-coin">
              <img :src="$path.image('coin-gold.png')" height="20px" />
              <div>{{item.payment_data.total }}</div>
            </div>
          </div>
        </div>
        <div>
          <p> {{$filter.toThaiDateString(item.created_at)}}</p>
        </div>
      </div>
      <div v-if="listbuy.length === 0">
        <EmptyContent
          class="image"
          pathName="6.png"
          text="คุณยังไม่มีประวัติการซื้อนิยาย"
          fontSize="36px"
        ></EmptyContent>
      </div>
    </div>

    <div v-else>loading...</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import { transaction_type_data } from "@/shares/constants/enum";
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
      per_page:[] as any,
      datalistdate:null,
       monthset:monthset
    };
  },
  components: {
    EmptyContent,
  },
  methods: {
    async getCadis(){
        let res = await Gatway.getService('/customers/transaction-data/fetch-transaction/groupDate')
        let data = [] as any
        res.data.data.filter((element:any)=>{
          data.push( {
            d:element.date.split('-')[2],
            m:element.date.split('-')[1],
            y:element.date.split('-')[0],
          } );
        })


        let uniqueIds = [] as any ;
        const unique = await data.filter((element:any) => {
          console.log(uniqueIds);
        const isDuplicate = uniqueIds.includes(element.m);
        console.log(!isDuplicate);
        if (!isDuplicate === true) {
          uniqueIds.push(element.m);
          return true;
        }
        return false;
      });
      console.log(unique);
        this.groupde(res.data.data[0].date)
        this.datalistdate = unique
           
        // // console.log(res.data.data.last_page);
        // // console.log(res.data.data.current_page);
        // // if(res.data.data.current_page === 1){
        // //   this.per_page = [res.data.data.current_page,res.data.data.current_page+1 ,res.data.data.current_page+2]
        // // }else if( res.data.data.current_page  ===  res.data.data.last_page){
        // //   this.per_page = [res.data.data.current_page -2,res.data.data.current_page -1,   res.data.data.current_page]
        // // }
        // // else{
        // //   this.per_page = [res.data.data.current_page-1,res.data.data.current_page,res.data.data.current_page+1 ]
        // // }
      },
      async groupde(event){
        let res = await Gatway.getService(`/customers/transaction-data/fetch-transaction/ซื้อนิยาย?date=${ event}`)
        this.listbuy = res.data.data
      },
      async group(event){
        let res = await Gatway.getService(`/customers/transaction-data/fetch-transaction/ซื้อนิยาย?date=${ event.target.value}`)
        this.listbuy = res.data.data
      },
    // async getHistoryRead() {
    //   let res = await Gatway.getService('/customers/transaction-data/fetch-transaction/ซื้อนิยาย?date=2022-07-01')
    //     console.log(res.data.data);
    //     this.listbuy = res.data.data
    // },
  },
  mounted() {
    this.getCadis();
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
.con-storyBuy {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  // border: 1px 0 0  0 solid rgba(204, 204, 204, 0.977);
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
</style>
