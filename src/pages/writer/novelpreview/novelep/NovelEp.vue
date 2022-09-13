<template>
  <div class="NovelEP">
    <!-- <div class="nv-box-white nv-mt-40">
      <div>
          <button type="submit" class="nv-btn-orange" :disabled="disabledSubmit" @click="!idEp ? submit() : updata()">ยืนยัน</button>
        </div>
    </div> -->
    <div class="nv-box-white nv-mt-40">
      <div style="display: flex; justify-content: space-between">
        <button
          type="submit"
          class="nv-btn-blue"
          :disabled="disabledSubmit"
          @click="$router.go(-1)"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          type="submit"
          class="nv-btn-orange"
          :disabled="disabledSubmit"
          @click="!idEp ? submit() : updata()"
        >
          ยืนยัน
        </button>
      </div>
      <br /><br />

      <div class="from">
        <div class="contor-input">
          <div class="title">ชื่อตอน <span class="is-valid">*</span></div>
          <input v-model="data.name" id="TitleEp" required />
          <small :class="data.name.length > 100 ? 'texterr' : 'title-v'"
            >{{ data.name.length }} / 100</small
          >
        </div>
        <div class="col-2">
          <div class="contor-input">
            <div class="title">เวลาที่เผยแพร่</div>
            <select v-model="clecktime" @click="time()">
              <option value="1">เผยแพร่เลย</option>
              <option value="2">ตั้งเวลาล่วงหน้า</option>
            </select>
          </div> 
          <div class="contor-input">
            <div class="title">
              วันที่เผยแพร่ <span class="is-valid">*</span>
            </div>
            <input 
               v-if="clecktime === '1'"
              :disabled="isdatetime"
              type="datetime-local"
              v-model="data.publisher_episode_data.date_time"
              id="DateTime"
              value="2017-06-01T08:30"
              required
            />
            <div v-else class="con_date_time">
              <input type="date" v-model="datatime.date" @change="datatimeset"/>
              <select class="form-control"  v-model="datatime.h" @change="datatimeset">
                <option v-for="item,index in htime" :key="index" :value="item" >{{item}}</option>
              </select>
              <select class="form-control"  v-model="datatime.m" @change="datatimeset">
                <option value="00" > 00</option>
                <option value="30" > 30</option>
              </select>
            </div>
          </div>
          <!-- <div class="contor-input">
            <div class="title">สำหรับขาย</div>
            <select v-model="clecksell">
              <option value="1">ฟรี</option>
              <option value="2">ขาย</option>
            </select>
          </div> -->
        </div>
        <div class="col-2">
           <div class="contor-input">
            <div class="title">สำหรับขาย</div>
            <select v-model="clecksell">
              <option value="1">ฟรี</option>
              <option value="2">ขาย</option>
            </select>
          </div>
          <div class="contor-input" v-if="clecksell == 2">
            <div class="title">ราคา <span class="is-valid">*</span></div>
            <!-- <input type="number" v-model="data.coin"   @change="setTwoNumberDecimal" id="Coin" required /> -->
            <input
              type="number"
              v-model="data.coin"
              @change="$filter.setTwoNumberDecimal"
              min="0.0"
              @keyup="filter"
              max="10.0"
              step="0.5"
              value="0.0"
              id="Coin"
 
            />
          </div>
        </div>
        <div class="contor-input">
          <div class="title">เนื้อเรื่อง <span class="is-valid">*</span></div>
          <NovelEditor
            @Editor="func_Editor"
            :valueWay="this.data.detail"
            height="30"
          />
        </div>
        <div style="display: flex; justify-content: space-between">
          <span></span>
          <button
            type="submit"
            class="nv-btn-orange"
            :disabled="disabledSubmit"
            @click="!idEp ? submit() : updata()"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import { alert } from "@/shares/modules/alert";
import { Validation } from "@/shares/modules/validation";
import { datatime } from "@/shares/modules/datatime";
import { sms_alert_AddEp } from "@/shares/constants/smsalert";

// interface typeEp {
//   novel_data_id:string;
//   name:string;
//   coin:number;
//   publisher_episode_data : {
//     date_time:string ;
//   } ;
// }

export default Vue.extend({
  name: "NovelEP",
  components: {
    NovelEditor: () => import("@/components/widget/NovelEditor.vue"),
  },
  data() {
    return {
      isdatetime:true,
      clecktime:"1",
      htime:[
        '00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','23',
      ],
      datatime:{
          date:'',
          h:'',
          m:''
      },
      clecksell: "1",
      idEp: this.$route.params.idEP,
      data: {
        novel_data_id: "",
        name: "",
        coin: 0.0,
        detail: "",
        publisher_episode_data: {
          date_time: datatime(new Date()),
        },
      },
      disabledSubmit: false,
    };
  },
  methods: {
    async submit() {
      this.data.novel_data_id = this.$route.params.id;
      const arrvalidate = ["TitleEp"];
      if (Validation(arrvalidate as any) === true) {
        this.disabledSubmit = true;
        let res = await Gatway.postService(
          "/customers/episode_data",
          this.data as any
        );
        if (res.data.status === true) {
          this.disabledSubmit = false;
          alert("สร้างตอนนิยานสำเร็จ", "success");
          history.back();
        } else {
          var result = Object.keys(res.data.data).map(
            (key) => res.data.data[key]
          );
          for (let i = 0; i < result.length; i++) {
            alert(result[i], "error");
          }
        }
      }
    },
    time(){
      if(this.clecktime === '2'){
        this.isdatetime = false
      }else{
        console.log(datatime(new Date()));
        
        this.data.publisher_episode_data.date_time = datatime(new Date())
        this.isdatetime = true
      }
      
     console.log();
     
    },
    datatimeset(){
      this.data.publisher_episode_data.date_time = `${this.datatime.date}T${this.datatime.h}:${this.datatime.m}:00`
          console.log();

          
    },
    filter(e){
      console.log(e.target.value);
      if(e.target.value < 0){
        e.target.value = Math.abs(e.target.value)
      }else if(e.target.value === ''){
        e.target.value = ''
      }
      
    },
    func_Editor(value: any) {
      this.data.detail = value;
    },
    async getEp() {
      let res = await Gatway.getIDService("/customers/episode_data", this.idEp);
      this.clecksell = res.data.data.coin === "0.00" ? "1" : "2";
      this.data.novel_data_id = res.data.data.novel_data_id;
      this.data.name = res.data.data.name;
      this.data.detail = res.data.data.detail;
      this.data.coin = res.data.data.coin;
    },
    async updata() {
      this.data.novel_data_id = this.$route.params.id;
      this.data.coin = this.clecksell === "1" ? 0.0 : this.data.coin;
      this.data = { ...this.data, id: this.idEp } as any;
      let res = await Gatway.PutService(
        "/customers/episode_data",
        this.idEp,
        this.data as any
      );
      if (res) {
        alert("อัปเดตตอนนิยายสำเร็จ", "success");
        // alert(res.data.data, "success")
        this.getEp();
        history.back();
      }
    },
  },
  mounted() {
    console.log(datatime(new Date()));
    
    this.idEp ? this.getEp() : null;
  },
});
</script>
<style lang="scss" scoped>
.nv-box-white {
  position: relative;
  overflow: hidden;
}
.title {
  margin-left: 3px;
  color: #444349;
  font-size: 13px;
}
.title-v {
  color: #8a8a8a;
  font-size: 13px;
}
.texterr {
  color: red;
}
.ql-editor {
  font-size: 20px !important;
}
.con_date_time{
  display: flex;
  gap: 20px;
}
</style>
