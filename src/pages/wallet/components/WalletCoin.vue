<template>
  <div class="nv-box-white">
    <div class="nv-box-white con-hisC" v-if="dataItem">
      <!-- <div v-for="(item, index) in dataItem" :key="index">
      </div> -->


      <div v-if="data.data.length !== 0">
        <table>
          <tr>
            <th >วันที่</th>
            <th class="mobile">ประเภท</th>
            <th class="mobile">เพรช</th>
            <th>เหรียญ</th>
            <th class="mobile">เงิน</th>
            <th>สถานะ</th>
          </tr>
          <!-- <tr v-for="(item, index) in data.data" :key="index"></tr> -->
          <tr v-for="(item, index) in dataItem" :key="index">
            <td>
              {{ $filter.toThaiDateString(item.created_at) }}
            </td>
            <td class="mobile">
              {{ item.topic_coins_data.coin_type_data.name_preview }}
            </td>
            <td class="mobile"> 
              <div class="layout-icon">
                {{ item.topic_coins_data.diamond_amount }}
                <img v-lazy="$path.image('diamond.png')" width="20px" />
              </div>
            </td>
            <td>
              <div class="layout-icon">
                {{ item.topic_coins_data.coin_amount }}
                <img v-lazy="$path.image('coin-gold.png')" width="20px" />
              </div>
            </td>
            <td class="mobile">{{ item.topic_coins_data.price_amount }}</td>
            <td>{{ item.status_data_preview }}</td>
          </tr>
        </table>

       
        <div class="navigation-historyCoin">
          <NovelPaginate :count="data.last_page" @click="list" />
        </div>
      </div>
      <div v-else class="not-data">
        ยังไม่มีประวัติการเติม
      </div>
    </div>

  </div>
  
</template>

<script lang="js">
import Vue from 'vue'
import { Gatway } from '@/shares/services'
import { TypeStatusWallet } from '@/shares/constants'
// import JwPagination from "jw-vue-pagination";

import NovelPaginate from "@/components/widget/NovelPaginate.vue";

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
// Vue.component('jw-pagination', JwPagination);
export default Vue.extend({
    name:"Coin",
    components:{
      // EmptyContent,
      NovelPaginate
    },
    data(){
      return{
        data: null,
        TypeStatusWallet:TypeStatusWallet,
        pageOfItems:[],
        isVisible: false,
        per_page:[],
        datalistdate:null,
        monthset:monthset,
        dataItem:{}
      }
    },
    methods:{
    //   async getCadis(){
    //     let res = await Gatway.getService('/customers/transaction-data/fetch-transaction/groupDate')
    //     let data = []
    //     res.data.data.filter((element)=>{
    //       data.push( {
    //         d:element.date.split('-')[2],
    //         m:element.date.split('-')[1],
    //         y:element.date.split('-')[0],
    //       } );
    //     })


    //     let uniqueIds = [] ;
    //     const unique = await data.filter((element) => {
    //       console.log(uniqueIds);
    //     const isDuplicate = uniqueIds.includes(element.m);
    //     console.log(!isDuplicate);
    //     if (!isDuplicate === true) {
    //       uniqueIds.push(element.m);
    //       return true;
    //     }
    //     return false;
    //   });
    //   console.log(unique);
    //     this.groupde(res.data.data[0].date)
    //     this.datalistdate = unique

    //     // // console.log(res.data.data.last_page);
    //     // // console.log(res.data.data.current_page);
    //     // // if(res.data.data.current_page === 1){
    //     // //   this.per_page = [res.data.data.current_page,res.data.data.current_page+1 ,res.data.data.current_page+2]
    //     // // }else if( res.data.data.current_page  ===  res.data.data.last_page){
    //     // //   this.per_page = [res.data.data.current_page -2,res.data.data.current_page -1,   res.data.data.current_page]
    //     // // }
    //     // // else{
    //     // //   this.per_page = [res.data.data.current_page-1,res.data.data.current_page,res.data.data.current_page+1 ]
    //     // // }
    //   },
    //   async groupde(event){
    //     let res = await Gatway.getService(`/customers/transaction-data/fetch-transaction/เติ่มเงิน?date=${ event}`)
    //     this.data = res.data.data
    //     console.log("data1",this.data)
    //   },
    //   async group(event){
    //     let res = await Gatway.getService(`/customers/transaction-data/fetch-transaction/เติ่มเงิน?date=${ event.target.value}`)
    //     this.data = res.data.data
    //     console.log("data2",this.data)
    //   },
    //    onChangePage(pageOfItems) {
    //     this.pageOfItems = pageOfItems;
    // },
    // toggleVisible(id) {
    //   this.pageOfItems = this.pageOfItems.map((item)=>{
    //     console.log(item.isVisible)
    //     if(item.id === id){
    //       return {...item,isVisible:!item.isVisible}
    //     }
    //     return item
    //   })
    // },
    async list(page){
      let res = await Gatway.getService(`/customers/transaction-data/fetch-transaction/เติ่มเงิน?page=${ page}`)
      this.dataItem = res.data.data.data.filter((res)=>{
        // console.log(res);
        return res.ref 
      })
      console.log(this.dataItem);
      this.data = res.data.data
    }
    },
    mounted(){
      this.list(1)
    },
    beforeUpdate(){
      // this.list(1)
    }
})
</script>

<style lang="scss" scoped>
.layout-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
table {
  width: 100%;
}
td {
  text-align: center;
  padding: 10px;
}
tr {
  // font-size: 18px;
}
.wallet-history {
  background-color: rgb(250, 250, 250);
  border-radius: 12px;
  padding: 10px;
}
.pending {
  background: #f4ba40;
  padding: 2px 8px;
  color: #ffffff;
  border-radius: 10px;
  align-items: center;
  width: fit-content;
  justify-content: center;
}
.navigation-historyCoin {
  display: flex;
  justify-content: center;
}

.successful {
  background: #4a8556;
  padding: 2px 8px;

  color: #ffffff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.not-data{
  display: flex;
  justify-content: center;
  margin-bottom: 40px;  
}
.position-status {
  display: flex;
  justify-content: center;
}
.failed {
  background: #e15858;
  padding: 2px 8px;

  color: #ffffff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.con-hisC {
  background: #ffffff00;
  padding: 0;
}
.box-hisC {
  background: #ffffff;
}
@media (max-width: 500px) {
  .mobile {
    display: none;
  }
  tr {
    font-size: 17px;
  }
}
</style>
