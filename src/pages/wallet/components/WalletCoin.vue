<template>
  <div>
    <table>
  <tr>
    <th class="mobile">วันที่</th>
    <th >ประเภท</th>
    <th class="mobile">เพรช</th>
    <th >เหรียญ</th>
    <th>เงิน</th>
    <th class="mobile">สถานะ</th>
  </tr>
  <tr v-for="item, index in pageOfItems" :key="index">
    <td class="mobile">{{$filter.toThaiDateString(item.created_at)}}</td>
    <td >{{item.topic_coins_data.coin_type_data.name_preview}} </td>
    <td class="mobile">{{item.topic_coins_data.diamond_amount}}</td>
    <td>{{item.topic_coins_data.coin_amount}}</td>
    <td> {{$filter.NumberToString(parseInt(item.topic_coins_data.price_amount))}}</td>
    <td class="mobile">
      <div v-if="TypeStatusWallet.pending === item.status_data.id" :class="item.status_data.name">{{item.status_data.name_preview}}</div>
      <div v-else-if="TypeStatusWallet.successful === item.status_data.id" :class="item.status_data.name">{{item.status_data.name_preview}}</div>
      <div v-else-if="TypeStatusWallet.failed === item.status_data.id" :class="item.status_data.name">{{item.status_data.name_preview}}</div>
      <div v-else>sdsd</div>

      <!-- <div>{{item.status_data.name_preview}}</div> -->
    </td>
  </tr>
</table>
<div class="nv-mt-20">
  <jw-pagination :items="data" @changePage="onChangePage"  :pageSize="8" :maxPages="5"></jw-pagination>
</div>
      <!-- <div v-for="item, index in data" :key="index">
        <div v-if="item.amount > 0" class="box-wallet">
          <p>{{$filter.toThaiDateString(item.created_at)}}</p>
          <div class="box-cadis">
            <p> {{item.topic_coins_data.coin_type_data.name_preview}} </p>

            <div>
              {{item.topic_coins_data.diamond_amount}}
              {{item.topic_coins_data.coin_amount}}
              {{item.topic_coins_data.price_amount}} บาท
            </div>
          </div>
        </div>
      </div> -->
      
  </div>
</template>

<script>
import Vue from 'vue'
import { Gatway } from '@/shares/services'
import { TypeStatusWallet } from '@/shares/constants'
import JwPagination from "jw-vue-pagination";
Vue.component('jw-pagination', JwPagination);
export default Vue.extend({
    name:"Coin",
    data(){
      return{
        data:[],
        TypeStatusWallet:TypeStatusWallet,
        pageOfItems:[]
      }
    },
    methods:{
      async getCadis(){
        let res = await Gatway.getService('/customers/transaction-data/fetch-transaction')
        console.log(res.data);
        let resfilter = res.data.data.filter((item)=>{
          // console.log(item.user_transaction_data_type.name_preview );
          return item.amount > 0  && item.user_transaction_data_type_id === "def249ef-6818-4bb2-998d-0f34b5f05827"
        })
        console.log(resfilter);
        this.data = resfilter
      },
       onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    },
    },
    mounted(){
      this.getCadis()
    }
})
</script>

<style lang="scss" scoped>
.box-wallet{
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #e1e1e1;
}
.box-cadis{
  display: flex;
  gap: 25px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 10px;
}

td, th {
  border-bottom: .3px solid #dddddd;
  text-align: left;
  padding: 20px;
}

// tr:nth-child(even) {
//   background-color: #dddddd;
// }
.pending{
  background: #f4ba40;
  padding: 4px 0px;
  color: #ffffff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.successful{
background: #4a8556;
  padding: 4px 0px;
  color: #ffffff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.failed{
  background: #e15858;
  padding: 4px 0px;
  color: #ffffff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 415px) {
  .mobile{
    display: none;
  }
}
</style>