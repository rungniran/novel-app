<template>
  <div class="WriterSeport" v-if="wraning === true">
     <table>
  <tr>
    <th>รายการ</th>
    <th>จำนวน (บาท)</th>

  </tr>
  <tr>
    <td colspan="2">การขาย</td>
 
  </tr>
  <tr>
    <td>รายได้จากการขาย</td>
    <td>{{ $filter.NumberToString(this.$store.state.auth.dataset.coin_balance )}}</td>
 
  </tr>
  <tr>
    <td>หักค่าบริการแพลทฟอร์ม (30%)</td>
    <td>?</td>

  </tr>
  <tr>
    <td>รายได้สุทธิ</td>
    <td>{{ $filter.NumberToString(this.$store.state.auth.dataset.coin_balance )}}</td>

  </tr>
  <tr>
    <td colspan="2">สนับสนุน</td>
  </tr>
  <tr>
    <td>รายได้จากสนับสนุน</td>
    <td>0</td>

  </tr>
  <tr>
    <td>รายได้รวม</td>
    <td>{{ $filter.NumberToString(this.$store.state.auth.dataset.coin_balance )}}</td>

  </tr> 
</table>
<div class="dcoin">
        <div>
          <small>รายรับคงเหลือ (บาท) </small>
          <div>{{ $filter.NumberToString(this.$store.state.auth.dataset.coin_balance )}}</div>
          
        </div>
        <div>
          <router-link to="/writer/WriterWithdrawMoney"><button class="nv-btn-yellow">รายละเอียด</button></router-link>
        </div>
      </div><br>
<div style="margin-bottom: 10px"> เงื่อนไขการจ่ายเงินให้กับนักเขียน</div>
<div class="thai Con" >
  <small> 
     <div> 1) </div>  
     ต้องเพิ่มขอมูลนักเขียนให้ละเอียดครบถ้วน
    </small> 
    <small> 
     <div> 2) </div>  
      30 วันระบบจะตัดยอดเหรียญของนักเขียนที่มีรายได้จากการขายนิยาย 1000 เหรียญขึ้นไปทั้งหมดในกรณีที่นักเขียนได้กรอกข้อมูลบัญชีธนาคารครบเรียบร้อยเเล้วหลังจากนั้นบิลการชำระจะไปอยู่ในเมนู "รายงานการขาย"
    </small> 
</div>

  </div>
  <div v-else class="not-novel">
            คุณยังไม่มีนิยาย
    </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    name:"Seport",
     props:{
        wraning:Boolean
    },
})
</script>

<style scoped>

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  /* border: 0.3px solid #dddddd; */
  width: 100%;
}

td, th {
  border: 0px solid #dddddd;
  border: 0.3px solid #dddddd;
  text-align: left;
  padding: 20px 10px;
}
th{
/* border: 1px solid #dddddd; */
/* border: 0px solid; */
/* background: #dddddd; */
}

.dcoin{
  background:#f4bb4036;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  
    align-items: center;

}
/* ol, ul ,li{
  list-style: outside;
} */
ol{
  margin: 10px 0px;
}
small{
  display: flex;
  gap: 10px;
}
.Con{
  display: grid;
  gap: 10px;
}
</style>