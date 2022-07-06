<template>
  <div class="WriterSeport" v-if="wraning === true">
    <!-- <pre> {{listwithdraw}}</pre>
     {{this.listwithdraw.total_coin * (30/100) }} -->

    <div class="WriterSeport-select">
      <div>
        <div>เดือน</div>
        <select id="inCategory" v-model="ojb.month">
          <option
            v-for="(item, index) in monthset"
            :key="index"
            :value="item.key"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div>
        <div>ปี</div>
        <select id="inCategory" v-model="ojb.year">
          <option v-for="(item, index) in yearset" :key="index" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div>
        <div></div>
        <button class="nv-btn-orange button" @click="getitem()">ยืนยัน</button>
      </div>
    </div>
    <br />
    <!-- {{listwithdraw}} -->
    <div v-if="listwithdraw">
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
          <td>{{ $filter.NumberToString(this.listwithdraw.total_coin) }}</td>
        </tr>
        <tr>
          <td>หักค่าบริการแพลทฟอร์ม (30%)</td>
          <td>
            {{
              $filter.NumberToString(
                (this.listwithdraw.total_coin * (30 / 100)).toFixed(2)
              )
            }}
          </td>
        </tr>
        <tr>
          <td>รายได้สุทธิ</td>
          <td>
            {{
              $filter.NumberToString(
                (
                  this.listwithdraw.total_coin -
                  this.listwithdraw.total_coin * (30 / 100)
                ).toFixed(2)
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
                (
                  this.listwithdraw.total_coin -
                  this.listwithdraw.total_coin * (30 / 100)
                ).toFixed(2)
              )
            }}
          </td>
        </tr>
      </table>
      <div class="dcoin">
        <div>
          <small>รายรับคงเหลือ (บาท) </small>
          <div>
            {{
              $filter.NumberToString(
                (
                  this.listwithdraw.total_coin -
                  this.listwithdraw.total_coin * (30 / 100)
                ).toFixed(2)
              )
            }}
          </div>
        </div>
        <div>
          <router-link to="/writer/WriterWithdrawMoney"
            ><button class="nv-btn-yellow">รายละเอียด</button></router-link
          >
        </div>
      </div>
<div class="Con-btn">
  <button class="nv-btn-orange ">
      <a
        :href="
          'https://119.59.97.111/storage/novel_image/' +
          this.listwithdraw.id +
          '.pdf'
        "
        :download='this.listwithdraw.id'
        >โหลดเอกสาร</a
      >
  </button>
  <!-- <input type="file" @change="filepdf">
  {{this.listwithdraw.id}}
      <button class="nv-btn-orange" @click="downloadFile()">
        โหลดเอกสาร
      </button> -->
</div>
    </div>
    <div class="not-novel" v-else>ไม่มีข้อมูล</div>
    <div class="Con-con">
    <div>เงื่อนไขการจ่ายเงินให้กับนักเขียน</div>
    <div class="thai Con">
      <small>
        <div>1)</div>
        ต้องเพิ่มขอมูลนักเขียนให้ละเอียดครบถ้วน
      </small>
      <small>
        <div>2)</div>
        ระบบจะตัดยอดทุกสิ้นเดือนและโอนให้ในวันที่ 5 ของเดือนถัดไป แต่หากยอดไม่ถึง 1000 บาท ยอดจะถูกยกไปเดือนถัดไป
      </small>
    </div>
    </div>
  </div>
  <div v-else class="not-novel">
    <EmptyContent pathName="2.png" text="ไม่พบข้อมูลรายงานการขาย..." :isSearch=false ></EmptyContent>
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
import { Gatway } from "@/shares/services";
import axios from "axios";
import  EmptyContent  from "../../empty/empty.vue";
const tokenStr = localStorage.getItem("token")
const Authorization =  { headers: {"Authorization" : `Bearer ${tokenStr}`} }
export default Vue.extend({
  name: "Seport",
  props: {
    wraning: Boolean,
  },
  data() {
    return {
      listwithdraw: null,
      monthset: [
        {
          key: "01",
          name: "เดือนมกราคม",
        },
        {
          key: "02",
          name: "เดือนกุมภาพันธ์",
        },
        {
          key: "03",
          name: "เดือนมีนาคม ",
        },
        {
          key: "04",
          name: "เดือนเมษายน",
        },
        {
          key: "05",
          name: "เดือนพฤษภาคม",
        },
        {
          key: "06",
          name: "เดือนมิถุนายน",
        },
        {
          key: "07",
          name: "เดือนกรกฎาคม",
        },
        {
          key: "08",
          name: "เดือนสิงหาคม",
        },
        {
          key: "09",
          name: "เดือนกันยายน",
        },
        {
          key: "10",
          name: "เดือนตุลาคม",
        },
        {
          key: "11",
          name: "เดือนพฤศจิกายน",
        },
        {
          key: "12",
          name: "เดือนธันวาคม",
        },
      ],
      ojb: {
        month: "",
        year: "",
      },
      monthValue: "",
      yearset: "",
    };
  },
  components: {
    EmptyContent
  },
  methods: {
    async withdraw() {
      let res = await Gatway.getService("/customers/withdraw-data");
      console.log(res);
      this.listwithdraw = res.data.data[0];
    },
    pad(d) {
      return d < 10 ? "0" + d.toString() : d.toString();
    },
    async getitem() {
      let res = await Gatway.getService(
        `/customers/withdraw-data?month=${this.ojb.month}&year=${this.ojb.year}`
      );
      console.log(res.data.data[0]);
      this.listwithdraw = res.data.data[0];
    },
//     getBase64Image(imageUrl) {
//        // eslint-disable-next-line no-undef
//        var result = request.getSync(imageUrl, {encoding: null});
//         return 'data:image/png;base64,' + new Buffer(result.body).toString('base64');
// },
filepdf(event){
  console.log(event.target.value);
},
    async downloadFile() {
      const response = await axios.get("https://119.59.97.111/api/customers/transaction-data/download/" + this.listwithdraw.id,
      Authorization, { responseType: "arraybuffer",dataType:'blob', headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                }});
      console.log(response);
      //  const blob = new Blob([url], { type: 'application/pdf' })
      //  var fileURL = URL.createObjectURL(blob);
      //  console.log(fileURL);
      //  window.open(fileURL);
      //  console.log(blob);
      //   const link = document.createElement('a')
      //   link.href = URL.createObjectURL(blob)
      //   link.download = this.listwithdraw.id
      //   link.click()
      //   URL.revokeObjectURL(link.href)
      // const blob = new Blob([response.data]);
      // URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // console.log(link);
    },
  },
  mounted() {
    const d = new Date();
    let month = d.getMonth();
    let year = d.getFullYear() + 1;
    let yearago = [];
    for (let i = 1; i < 6; i++) {
      console.log(year - 1);
      yearago.push(year - 1);
      year = year - 1;
    }
    console.log("0" + (month + 1));
    this.ojb.year = d.getFullYear();
    this.yearset = yearago;
    this.ojb.month = "0" + (month + 1);
    this.withdraw();
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
.not-novel {
  margin: -30px;
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
}
.option-select {
  background-color: blue;
}
.button {
  width: 100px;
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
.WriterSeport-select {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr auto;
  align-items: end;
}
.Con-con{
  display: grid;
  gap: 10px;
}
.Con-btn{
  margin: 40px 0px;
      margin: 10px 0px;
    isolation: f;
    display: flex;
    gap: 10px;
}
</style>
