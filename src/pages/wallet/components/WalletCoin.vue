<template>
  <div class="wallet-history">
    <!-- <table>
  <tr>
    <th>วันที่</th>
    <th >ประเภท</th>
    <th class="mobile">เพรช</th>
    <th class="mobile">เหรียญ</th>
    <th >เงิน</th>
    <th >สถานะ</th>
  </tr>
  <tr v-for="item, index in pageOfItems" :key="index">
    <td >{{$filter.toThaiDateString(item.created_at)}}</td>
    <td >{{item.topic_coins_data.coin_type_data.name_preview}} </td>
    <td class="mobile">{{item.topic_coins_data.diamond_amount}}</td>
    <td class="mobile">{{item.topic_coins_data.coin_amount}}</td>
    <td> {{$filter.NumberToString(parseInt(item.topic_coins_data.price_amount))}}</td>
    <td>
      <div v-if="TypeStatusWallet.pending === item.status_data.id" :class="item.status_data.name">{{item.status_data.name_preview}}</div>
      <div v-else-if="TypeStatusWallet.successful === item.status_data.id" :class="item.status_data.name">{{item.status_data.name_preview}}</div>
      <div v-else-if="TypeStatusWallet.failed === item.status_data.id" :class="item.status_data.name">{{item.status_data.name_preview}}</div>
      <div v-else>sdsd</div> -->

    <!-- {{item.status_data.name_preview}} -->
    <!-- </td>
  </tr>
</table> -->

    <!-- <div v-show="isVisible"> -->
    <ListDataWallet
      v-for="(item, index) in pageOfItems"
      :key="index"
      :id="item.id"
      :statusid="item.status_data.id"
      :date="item.created_at"
      :isVisible="item.isVisible"
      :coin="item.topic_coins_data.coin_amount"
      :price="item.topic_coins_data.price_amount"
      :status="item.status_data.name_preview"
      :statusname="item.status_data.name"
      :name="item.topic_coins_data.coin_type_data.name_preview"
      :diamond="item.topic_coins_data.diamond_amount"
      @show="toggleVisible"
    >
    </ListDataWallet>
    <!-- </div> -->

    <div class="nv-mt-20">
      <jw-pagination
        :items="data"
        @changePage="onChangePage"
        :pageSize="8"
        :maxPages="5"
      ></jw-pagination>
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

<script lang="js">
import Vue from 'vue'
import { Gatway } from '@/shares/services'
import { TypeStatusWallet } from '@/shares/constants'
import JwPagination from "jw-vue-pagination";
import ListDataWallet from "./ListDataWallet.vue"
Vue.component('jw-pagination', JwPagination);
export default Vue.extend({
    name:"Coin",
    components:{
      ListDataWallet,
    },
    data(){
      return{
        data:[],
        TypeStatusWallet:TypeStatusWallet,
        pageOfItems:[],
        isVisible: false,
      }
    },
    methods:{
      async getCadis(){
        let data = []
        let res = await Gatway.getService('/customers/transaction-data/fetch-transaction')
        console.log(res.data);
        res.data.data.filter((item)=>{
          // console.log(item.user_transaction_data_type.name_preview );
          item.amount > 0  && item.user_transaction_data_type_id === "def249ef-6818-4bb2-998d-0f34b5f05827"
          ?data.push({...item,isVisible:false})
          :null
        })
        this.data = data
        console.log("test",this.data)
      },
       onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    },
    toggleVisible(id) {
      this.pageOfItems = this.pageOfItems.map((item)=>{
        console.log(item.isVisible)
        if(item.id === id){
          return {...item,isVisible:!item.isVisible}
        }
        return item
      })
    },
    },
    mounted(){
      this.getCadis()
    }
})
</script>

<style lang="scss" scoped>
.wallet-history{
  background-color: rgb(250, 250, 250);
  border-radius: 12px;
  padding: 10px;
}
</style>
