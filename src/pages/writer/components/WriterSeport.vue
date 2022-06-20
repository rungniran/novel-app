<template>
  <div class="WriterSeport" v-if="wraning === true">
      <div class="WriterSeport-select">
      <select id="inCategory">	
        <option v-for="item,index in 3" :key="index" :value="item.id">{{item}}</option>
      </select>
      <select id="inCategory">	
        <option v-for="item,index in 3" :key="index" :value="item.id">{{item}}</option>
      </select>
      </div>
      <br><br>
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
  <!-- <div>
    <div class="layout-main">
      <div class="option-select">
        <p>เดือน</p>
        <select>
          <option value="">มิ.ย</option>
        </select>
        <p>จัดเรียงตาม</p>
        <select>
          <option value="">ยอดขายสูง</option>
          <option value="">ยอดขายต่ำ</option>
        </select>
        <p>หมวดหมู่</p>
        <select>
          <option value="">แฟนตาซี</option>
        </select>
      </div>
      <div class="detail-novel">
        <div class="search">
          <input type="text" placeholder="ค้นหานิยายของคุณ ..."/>
          <button class="nv-btn-yellow">รายงานประจำเดือน</button>
        </div>
        <div>
            <img
              :src="

                  $path.image('loading.png')
              "
              class="nv-img-novel"
              onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
              width="100%"
            />
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Seport",
  props: {
    wraning: Boolean,
  },
});
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  /* border: 0.3px solid #dddddd; */
  width: 100%;
}

td,
th {
  border: 0px solid #dddddd;
  border: 0.3px solid #dddddd;
  text-align: left;
  padding: 20px 10px;
}
th {
  /* border: 1px solid #dddddd; */
  /* border: 0px solid; */
  /* background: #dddddd; */
}

.dcoin {
  background: #f4bb4036;
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
ol {
  margin: 10px 0px;
}
small {
  display: flex;
  gap: 10px;
}
.Con {
  display: grid;
  gap: 10px;
}
<<<<<<< HEAD
.WriterSeport-select{
  display: flex;
  gap: 10px;
}
</style>
=======

.layout-main {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.option-select {
  background-color: blue;
}

.detail-novel {
  display: grid;
  grid-auto-rows: 0.3fr auto;
}

.search {
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  gap: 20px;

}
</style>
>>>>>>> 75d9322ef797a0f2934eb001588232980b5dcd94
