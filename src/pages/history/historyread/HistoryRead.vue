<template>
  <div class="HistoryBuy">
    <router-link v-for="item, index in 12" :key="index" to="/read/1" class="con-storyBuy">
      <div class="detail-novel" >
        <img src="https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/61d58aa01353ba001c779a4d/61dc081cUzBPUw7w.jpeg" width="18%">
        <div>
          <p class="name">Nam sunt pariatur autem ut</p><br>
          <p>บทที่ 1 กลายเป็นแม่ของวายร้าย</p>
        </div>
      </div>
      <div>
         <p> 8 เม.ย. 2022, 12:04 </p>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Gatway } from '@/shares/services'
export default Vue.extend({
  methods:{
    async getHistoryRead(){
            let res = await Gatway.getService('/customers/transaction-data/fetch-own-novel')
            console.log(res);
        }
  },
  mounted(){
    // this.getHistoryRead()
  }
})
</script>
<style lang="scss" scoped>
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