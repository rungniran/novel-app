<template>
  <div class="WriterSeport" v-if="wraning === true">
    <!-- <pre> {{listwithdraw}}</pre> -->
     <!-- {{this.listwithdraw.total_coin * (30/100) }} -->
     

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
          <th class="list-writer bold-font">  รายการ</th>
          <th class="amount-writer bold-font" >จำนวน (บาท)</th>
        </tr>
        <tr>
          <td colspan="2" class="font-sell"><i class="fa fa-angle-down" aria-hidden="true"></i> การขาย</td>
        </tr>
        <tr>
          <td class="list-writer sub-list">ยอดการขาย</td>
          <td class="amount-writer">{{ $filter.NumberToString(this.listwithdraw.total_coin) }}</td>
        </tr>
        <tr>
          <td class="list-writer sub-list">หักค่าบริการแพลทฟอร์ม + ตัวกลางชำระเงิน</td>
          <td class="amount-writer">
            {{
              $filter.NumberToString(
                (listwithdraw.json_data.percent_discount.reduce_coin + listwithdraw.json_data.service_charge.reduce_coin).toFixed(2)
              )
            
            }}
            <!-- {{
              $filter.NumberToString(
                (this.listwithdraw.total_coin * (30 / 100)).toFixed(2)
              )
            }} -->
          </td>
        </tr>
         <!-- <tr>
          <td class="list-writer sub-list">หัก ณ ที่จ่าย</td>
          <td class="amount-writer">
          
             {{
              $filter.NumberToString(
                (
                  listwithdraw.json_data.withholding.reduce_coin
                ).toFixed(2)
              )
            }}
          </td>
        </tr> -->
        <tr>
          <td class="list-writer sub-list">รายได้หลังหักค่าบริการ</td>
          <td class="amount-writer">
            {{
              $filter.NumberToString(
                (
                  listwithdraw.json_data.sum_percent_total.coin_total
                ).toFixed(2)
              )
            }}
          </td>
        </tr>
        <tr>
          <td colspan="2" class="font-support"><i class="fa fa-angle-down" aria-hidden="true"></i> สนับสนุน</td>
        </tr>
        <tr>
          <td class="list-writer sub-list">รายได้จากสนับสนุน</td>
          <td class="amount-writer">0</td>
        </tr>
        <tr>
          <td class="list-writer summary">รายได้สุทธิ</td>
          <td class="amount-writer">
             {{
              $filter.NumberToString(
                (
                  listwithdraw.json_data.sum_percent_total.coin_total
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
                  listwithdraw.json_data.sum_percent_total.coin_total
                ).toFixed(2)
              )
            }}
          </div>
        </div>
        <div>
          <!-- <router-link to="/writer/WriterWithdrawMoney"
            ><button class="nv-btn-yellow">รายละเอียด</button></router-link
          > -->
          <button class="nv-btn-orange" @click="downloadFile()">
        โหลดเอกสาร
      </button>
        </div>
      </div>
<!-- <div class="Con-btn">

      <span v-if="profile.profile_writer">
       <div class="box-status approve" v-if="profile.profile_writer.status_approve === true">อนุมัสิแล้ว <i class="fas fa-check-circle"></i></div>
        <div class="box-status notapprove" v-else>ยังไม่อนุมัสิ <i class="fas fa-window-close"></i></div>
      </span>
      <span v-else>
         <div class="box-status asapprove" ><router-link to="/writer/WriterWithdrawMoney">สมัครนักเขียน </router-link></div>
      </span>
</div> -->
    </div>
    <div class="not-novel" v-else>ไม่มีข้อมูล</div>
    <div class="Con-btn">
    <span v-if="this.$store.state.auth.dataset.profile_writer">
      <span v-if="this.$store.state.auth.dataset.profile_writer.status_approve !== null">
        <div class="box-status approve" v-if="this.$store.state.auth.dataset.profile_writer.status_approve === true">อนุมัติแล้ว <i class="fas fa-check-circle"></i></div>
        <div class="box-status notapprove" v-if="this.$store.state.auth.dataset.profile_writer.status_approve === false" @click="del()">
          <span>ไม่อนุมัตินักเขียน <i class="fas fa-check-circle"></i> </span>
        <span class="w-r">สมัครนักเขียนใหม่</span>

        </div>
    </span>
    <span v-else>
         <div class="box-status waapprove" v-if="!this.$store.state.auth.dataset.profile_writer.note">ยังไม่อนุมัติ <i class="fas fa-window-close"></i> </div>
         <div class="box-status notapprove" v-else >
          <span>ไม่อนุมัตินักเขียน <i class="fas fa-check-circle"></i> </span>
        <span class="w-r"  @click="del()">แก้ไข</span>

        </div>
    </span>
    </span>
</div>
    <div class="Con-con">
    <div>เงื่อนไขการจ่ายเงินให้กับนักเขียน</div>
    <div class="thai Con">
      <small>
        <div>1)</div>
        ต้องเพิ่มข้อมูลนักเขียนให้ละเอียดครบถ้วน
      </small>
      <small>
        <div>2)</div>
        ระบบจะตัดยอดทุกสิ้นเดือนและโอนให้ในวันที่ 5 ของเดือนถัดไป แต่หากยอดไม่ถึง 1000 บาท ยอดจะถูกยกไปเดือนถัดไป
      </small>
    </div>
    </div>
  </div>
  <div v-else class="wbox">
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
import { alert } from "@/shares/modules/alert";
import axios from "axios";
import { saveAs } from 'file-saver';
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
      this.listwithdraw = res.data.data[0];
    },
    async del(){
      this.$router.push('/writer/WriterWithdrawMoney')
      // let res = await Gatway.DelService("/customers/profile-data/"+ this.profile.profile_writer.id );
    },
    pad(d) {
      return d < 10 ? "0" + d.toString() : d.toString();
    },
    async getitem() {
      let res = await Gatway.getService(
        `/customers/withdraw-data?month=${this.ojb.month}&year=${this.ojb.year}`
      );
      this.listwithdraw = res.data.data[0];
    },
//     getBase64Image(imageUrl) {
//        // eslint-disable-next-line no-undef
//        var result = request.getSync(imageUrl, {encoding: null});
//         return 'data:image/png;base64,' + new Buffer(result.body).toString('base64');
// },
filepdf(event){
  // console.log(event.target.value);
},

base64ToArrayBuffer(base64) {
  console.log(base64.data);
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}
,
    async downloadFile() {

//         axios.get('https://119.59.97.111/api/customers/transaction-data/download/' + this.listwithdraw.id, Authorization,  
//         { responseType: 'blob'})
//         .then((response) => {
//           const fileName = `${+ new Date()}.pdf`
//  let blob = new Blob([response.data], { type: 'application/pdf' ,encoding: 'UTF-8'})
//       let link = document.createElement('a')
//       link.href = window.URL.createObjectURL(blob)
//       link.setAttribute('download', fileName)
   
//       link.click()
// })
        
        

  
      let file =  await Gatway.getService("/customers/transaction-data/download/" + this.listwithdraw.id)
      console.log(file.data.data.split("/"));
      let patharray =  file.data.data.split("/")
      if(patharray[5]){
        window.open(file.data.data);
      }else{
        alert('ไม่พบไฟล์', 'error')
      }
      // 
      // const blob = new Blob([file.data], { type: 'application/pdf' })
      // var fileURL = URL.createObjectURL(blob);
      // var link = document.createElement('a');
      // link.href = fileURL;
      // link.download = 'file.pdf';
      // link.click()
      // link.dispatchEvent(new MouseEvent('click'));

      // var reader = new FileReader()
		  // reader.readAsDataURL(blob)
			// reader.onload = () => {
			// 	this.tests =reader.result
			// 	var file = this.dataURLtoFile(reader.result,"dffddf");
				
			// };
        // PDFObject.embed(, "#pdfObjectViewer");
    //  var arrrayBuffer = this.base64ToArrayBuffer(file);
      // let byteArray = new Uint8Array(file.data)
      // const blob = new Blob([file], { type: 'application/pdf' })
      
      // console.log(blob);
      // var fileURL = URL.createObjectURL(file.data);
      // console.log(fileURL);
      // var link = document.createElement('a');
      // link.href = fileURL;
      // link.download = 'file.pdf';
      // link.dispatchEvent(new MouseEvent('click'));
      // await axios.get("https://119.59.97.111/api/customers/transaction-data/download/" + this.listwithdraw.id,
      // Authorization, { responseType: "arraybuffer",dataType:'blob', headers: {'Content-Type': 'application/json','Accept': 'application/pdf'}});
      //  var blob = this.base64ToBlob(result.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      //   saveAs(blob, `${this.bindingTableName}.xlsx`);
      // }catch(error){
      //   alert('ไม่พบไฟล์', 'error')
        
      // }
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
    this.$store.commit("reset");
    const d = new Date();
    let month = d.getMonth();
    let year = d.getFullYear() + 1;
    let yearago = [];
    for (let i = 1; i < 6; i++) {
      yearago.push(year - 1);
      year = year - 1;
    }
    this.ojb.year = d.getFullYear();
    this.yearset = yearago;
    this.ojb.month = "0" + (month + 1);
    this.withdraw();
  },
});
</script>

<style scoped>
.sub-list{
  padding-left: 70px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  /* border: 0.3px solid #dddddd; */
  width: 100%;
}
.bold-font{
  font-weight: bold;
}
.font-sell{
  color: #AB93F9;
  font-weight: bold;
}
.font-support{
  color: #61BCBE;
  font-weight: bold;
}
.summary{
  font-weight: bold;
}
td,
th {
  border: 0px solid #dddddd;
  border: 0.3px solid #dddddd;
  text-align: left;
  padding: 20px 10px 20px 50px;
}
.list-writer{
  border-right: 0px solid #dddddd;
}
.amount-writer{
  border-left: 0px solid #dddddd;
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
.wbox {
    margin-top: 85px;
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
.w-r{
  cursor: pointer;
 text-align: left;
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
    /* isolation: f;
    display: flex;
    gap: 10px; */
}
.box-status{
    width: 100%;
    padding: 10px;
    padding: 1rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}
.approve{
    color: #0f5132;
    background-color: #d1e7dd;
    border-color: #badbcc; 
}
.notapprove{
        color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
        display: flex;
    align-items: center;
    justify-content: space-between;
}
/* .asapprove{
      color: #084298;
    background-color: #cfe2ff;
    border-color: #b6d4fe;
} */
.waapprove{
    color: #664d03;
    background-color: #fff3cd;
    border-color: #ffecb5;
}
@media (max-width: 415px){
  .wbox {
    margin-top: 30px;
  }
  td,
th {
  border: 0px solid #dddddd;
  border: 0.3px solid #dddddd;
  text-align: left;
  padding: 20px 10px 20px 30px;
}
.sub-list{
  padding-left: 40px;
}
}
</style>
