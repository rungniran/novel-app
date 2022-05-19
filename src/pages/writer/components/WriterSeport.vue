<template>
  <div class="WriterSeport">

      <div class="coin">
        <div>
          จำนวนเหรียญ
        </div>
        <div>
          {{ $filter.NumberToString(this.$store.state.auth.dataset.coin_balance )}}
        </div>
      </div>
      <div class="coin">
        <div>
          <small>รายรับคงเหลือ (บาท) </small>
          <div>{{ $filter.NumberToString(this.$store.state.auth.dataset.coin_balance )}}</div>
          
        </div>
        <div>
          <router-link to="/writer/WriterWithdrawMoney"><button class="nv-btn-yellow">ถอนเงิน</button></router-link>
        </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    name:"Seport"
})
</script>

<style scoped>
.WriterSeport{
  display: grid;
  gap: 10px;
}
.coin{
  background:#f4bb4036;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  
    align-items: center;

}
</style>