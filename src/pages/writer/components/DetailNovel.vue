<template>
  <div>
    <div class="novel-ep">
      <div>
        <img
          :src="$path.image('loading.png')"
          class="nv-img-novel"
          onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
          width="80%"
        />
      </div>

      <div class="content-ep">
        <div>
          <p class="bg-head">อันดับ</p>
          <div class="detail">{{ "1" }}</div>
          
        </div>
        <div>
          <p class="bg-head">ตอนที่</p>
          <div class="detail">{{ "ตอนที่ 2" }}</div>
        </div>
        <div>
          <p class="bg-head">ชื่อตอน</p>
          <div class="detail">{{ "ความทรงจำของจักรพรรดิโอสถ" }}</div>
        </div>
        <div>
          <p class="bg-head">ยอดวิว</p>
          <div class="detail coin-ep">
            <i
              class="eye fa fa-eye"
              src="http://localhost:8080/img/coin-gold.46fed048.png"
              alt="coin"
            ></i
            >{{ "5000" }}
          </div>
        </div>
        <div>
          <p class="bg-head">ยอดรายได้</p>
          <div class="detail coin-ep">
            <img
              class="coin"
              src="http://localhost:8080/img/coin-gold.46fed048.png"
              alt="coin"
            />{{ "2500" }}
          </div>
        </div>
        <div>
          <p class="bg-head">อัพเดทล่าสุด</p>
          <div class="detail">{{ "1 มิ.ย. 2556" }}</div>
        </div>
      </div>
    </div>
    <div>
      <div class="WriterSeport">
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
            <td>
              {{
                $filter.NumberToString(
                  this.$store.state.auth.dataset.coin_balance
                )
              }}
            </td>
          </tr>
          <tr>
            <td>หักค่าบริการแพลทฟอร์ม (30%)</td>
            <td>?</td>
          </tr>
          <tr>
            <td>รายได้สุทธิ</td>
            <td>
              {{
                $filter.NumberToString(
                  this.$store.state.auth.dataset.coin_balance
                )
              }}
            </td>
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
            <td>
              {{
                $filter.NumberToString(
                  this.$store.state.auth.dataset.coin_balance
                )
              }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <!-- <div class="dcoin">
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
</div> -->
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "DetailNovel",
  components: {
    // NovelStar: () => import("@/components/widget/NovelStar.vue"),
  },
  props: {
    wraning: Boolean,
  },
});
</script>

<style scoped>
.novel-ep {
  display: grid;
  grid-template-columns: 1fr 3fr;
  text-align: center;
  margin-bottom: 10px;
}
.bg-head {
  padding: 5px;
  background-color: #d2b1ee;
  color: white;
}
.detail {
  display: grid;
  grid-template-rows: auto;
  background-color: white;
  padding-top: 2px;
}
.coin-ep {
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.eye {
  margin: 5px 0px 0px 3px;
  height: 20px;
  width: 20px;
  color: #cca1f1;
}

.content-ep {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  border: 1px solid #dddddd;
}

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
.coin {
  margin: 2px 0px 0px 3px;
  height: 20px;
  width: 20px;
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

.layout-main {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
  background-color: #f5ecfd;
  padding: 20px;
  border-radius: 10px;
}
.option-select {
  padding: 10px 10px 30px 10px;
  background-color: white;
  height: fit-content;
  border-radius: 10px;
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

.layout-img {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
  gap: 10px;
}

.content-inside {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  justify-content: center;
  height: fit-content;
}

.space {
  margin-bottom: 10px;
}

.nv-btn-yellow {
  width: fit-content;
  font-size: 16px;
}

@media (max-width: 1024px) {
  .search {
    display: grid;
    grid-template-columns: 3.5fr 1.7fr;
    gap: 20px;
  }
  .nv-btn-yellow {
    width: fit-content;
    font-size: 14px;
  }
}
@media (max-width: 768px) {
  .detail-novel {
    display: grid;
    grid-auto-rows: 0.3fr auto;
  }
  .nv-img-novel {
    width: 100%;
  }
  .search {
    display: grid;
    grid-template-columns: 3.5fr 2fr;
    gap: 20px;
  }

  .layout-img {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 20px;
    gap: 10px;
  }
  .nv-btn-yellow {
    width: fit-content;
    font-size: 14px;
  }
}
@media (max-width: 415px) {
  .layout-main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    background-color: #f5ecfd;
    padding: 20px;
    border-radius: 10px;
  }

  .detail-novel {
    display: grid;
    grid-auto-rows: 0.3fr auto;
  }
  .nv-img-novel {
    width: 100%;
  }
  .search {
    display: grid;
    grid-template-columns: 2fr 1.6fr;
  }

  .layout-img {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 20px;
    gap: 10px;
  }
  .nv-btn-yellow {
    width: fit-content;
    font-size: 12px;
  }
}
</style>
