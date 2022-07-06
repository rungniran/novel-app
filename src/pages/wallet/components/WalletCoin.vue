<template>
  <div>
    <div class="nv-box-white nv-mt-40">
      <select @change="group">
        <option
          v-for="(item, index) in datalistdate"
          :key="index"
          :value="`${item.y}-${item.m}-${item.d}`"
        >
          {{ monthset[item.m] }} {{ item.y }}
        </option></select
      ><br /><br />
      <table>
        <tr>
          <th class="mobile">วันที่</th>
          <th class="mobile">ประเภท</th>
          <th>เพรช</th>
          <th>เหรียญ</th>
          <th>เงิน</th>
          <th>สถานะ</th>
        </tr>
        <tr v-for="(item, index) in data" :key="index">
          <td class="mobile">
            {{ $filter.toThaiDateString(item.created_at) }}
          </td>
          <td class="mobile">
            {{ item.topic_coins_data.coin_type_data.name_preview }}
          </td>
          <td>
            <div class="layout-icon">
              {{ item.topic_coins_data.diamond_amount }}
              <img
                v-lazy="$path.image('diamond.png')"
                width="20px"
              />
            </div>
          </td>
          <td>
            <div class="layout-icon">
              {{ item.topic_coins_data.coin_amount }}
              <img
                v-lazy="$path.image('coin-gold.png')"
                width="20px"
              />
            </div>
          </td>
          <td>{{ item.topic_coins_data.price_amount }}</td>
          <td>{{ item.status_data_preview }}</td>
          <!--<td >{{item.topic_coins_data.coin_amount}}</td>
    <td> {{$filter.NumberToString(parseInt(item.topic_coins_data.price_amount))}}</td>
    <td class="position-status">
      <div v-if="TypeStatusWallet.pending === item.status_data.id" :class="item.status_data.name">{{item.status_data.name_preview}}</div>
      <div v-else-if="TypeStatusWallet.successful === item.status_data.id" :class="item.status_data.name">{{item.status_data.name_preview}}</div>
      <div v-else-if="TypeStatusWallet.failed === item.status_data.id" :class="item.status_data.name">{{item.status_data.name_preview}}</div>
      <div v-else>sdsd</div>

    </td> -->
        </tr>
      </table>
      <!-- <ListDataWallet
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
    </ListDataWallet> -->
      <!-- </div> -->
      <!-- <pre>{{data}}</pre> -->
      <div v-if="data.length === 0">
        <EmptyContent
          class="image"
          pathName="1.png"
          text="ไม่มีข้อมูลประวัติการเติมเงิน"
          fontSize="36px"
        ></EmptyContent>
      </div>

      <div class="nv-mt-20">
        <li
          v-for="(item, index) in per_page"
          :key="index"
          @click="getCadis(item)"
        >
          {{ item }}
        </li>
        <!-- <li>2</li>
      <li>3</li>
      <li>4</li> -->
        <!-- <jw-pagination
        :items="data"
        @changePage="onChangePage"
        :pageSize="8"
        :maxPages="5"
      ></jw-pagination> -->
      </div>
    </div>
    <!-- <div class="nv-box-white  nv-mt-40" v-else  >
    londing...
  </div> -->
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import { Gatway } from '@/shares/services'
import { TypeStatusWallet } from '@/shares/constants'
import JwPagination from "jw-vue-pagination";
import {transaction_type_data} from "@/shares/constants/enum"
import EmptyContent from "../../empty/empty.vue";
import ListDataWallet from "./ListDataWallet.vue"
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
Vue.component('jw-pagination', JwPagination);
export default Vue.extend({
    name:"Coin",
    components:{
      EmptyContent,
    },
    data(){
      return{
        data: null,
        TypeStatusWallet:TypeStatusWallet,
        pageOfItems:[],
        isVisible: false,
        per_page:[],
        datalistdate:null,
        monthset:monthset
      }
    },
    methods:{
      async getCadis(){
        let res = await Gatway.getService('/customers/transaction-data/fetch-transaction/groupDate')
        let data = []
        res.data.data.filter((element)=>{
          data.push( {
            d:element.date.split('-')[2],
            m:element.date.split('-')[1],
            y:element.date.split('-')[0],
          } );
        })


        let uniqueIds = [] ;
        const unique = await data.filter((element) => {
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
        let res = await Gatway.getService(`/customers/transaction-data/fetch-transaction/เติ่มเงิน?date=${ event}`)
        this.data = res.data.data
      },
      async group(event){
        let res = await Gatway.getService(`/customers/transaction-data/fetch-transaction/เติ่มเงิน?date=${ event.target.value}`)
        this.data = res.data.data
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
.layout-icon{
  display: flex;
  justify-content: center;
  align-items: center;
  gap:5px;
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

.successful {
  background: #4a8556;
  padding: 2px 8px;

  color: #ffffff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
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
@media (max-width: 415px) {
  .mobile {
    display: none;
  }
  tr {
    font-size: 17px;
  }
}
</style>
