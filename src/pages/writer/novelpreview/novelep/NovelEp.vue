<template>
  <div class="NovelEP">
    <!-- <div class="nv-box-white nv-mt-40">
      <div>
          <button type="submit" class="nv-btn-orange" :disabled="disabledSubmit" @click="!idEp ? submit() : updata()">ยืนยัน</button>
        </div>
    </div> -->
    <div class="nv-box-white nv-mt-40 f-box">
      <div
        style="
          display: flex;
          justify-content: space-between;
          position: absolute;
          width: -webkit-fill-available;
          top: 0;
          left: 0;
          padding: 20px;
        "
      >

        <button
          type="submit"
          class="nv-btn-blue"
          :disabled="disabledSubmit"
          @click="$router.go(-1)"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="btn-g">
          <button
            @click="!idEp ? submit(true) : updata(true)"
            class="nv-btn-orange"
            :disabled="this.data.draft === false ? true : disabledSubmit"
          >
            บันทึกร่าง
          </button>
          <button
            type="submit"
            class="nv-btn-yellow"
            :disabled="!this.data.detail ? true : disabledSubmit"
            @click="settime()"
          >
            เผยแพร่
          </button>
        </div>
      </div>
      <br /><br />
      <div class="from">
        <div class="contor-input">
          <div class="title">ชื่อตอน <span class="is-valid">*</span></div>
          <div>
            <input v-model="data.name" id="TitleEp" required />
          </div>
          <small :class="data.name.length > 100 ? 'texterr' : 'title-v'"
            >{{ data.name.length }} / 100</small
          >
        </div>
        <div class="col-2">
          <div class="contor-input">
          </div>
        </div>
      </div>
    </div>
    <div class="nv-box-white nv-mt-40 box-read">
      <div class="lengthText">
        {{ lengthText ? lengthText : data.detail.length }} ตัวอักษร
      </div>
      <NovelEditor
        @Editor="func_Editor"
        :valueWay="data.detail"
        classset="editor"
        height="30"
      />
      <div style="display: flex; justify-content: space-between; padding: 10px">
        <span></span>
      </div>
    </div>
    <NovelModal2
      ID="setime"
      IDCrad="setimeCrad"
      ref="setimeCrad"
      width="400px"
      :Onmouse="false"
      :Close="true"
    >
      <template v-slot:body>
        <div class="co-option-time">
          <div class="option-time" type="radio" @click="today()">
       
            <div>เผยแพร่ตอนนี้</div>
          </div>
          <div class="option-time" @click="$refs.clecktimeCrad.open()">
            <div>ตั้งเวลา</div>
          </div>
        </div>
      </template>
    </NovelModal2>
    <NovelModal2
      ID="clecktime"
      IDCrad="clecktimeCrad"
      ref="clecktimeCrad"
      width="400px"
      :Onmouse="false"
      :Close="true"
    >
      <template v-slot:body>
        <div class="contor-input">
          <div class="con-to">
            <div class="title">
              วันที่เผยแพร่ <span class="is-valid">*</span>
            </div>
       
          </div>

          <v-date-picker
            v-if="data.publisher_episode_data.date_time !== ''"
            is-expanded
            v-model="data.publisher_episode_data.date_time"
            @input="onDateRangeChange"
          />
          <br />
          <div class="title">เวลาที่เผยแพร่</div>
          <input type="time" min="00:00" max="24:00" v-model="datatime" />
        </div>


        <div class="contor-input nv-mt-30">
          <button
            type="submit"
            class="nv-btn-yellow"
            :disabled="disabledSubmit"
            @click="setsell()"
          >
            ยืนยันการตั้งเวลา
          </button>
        </div>
      </template>
    </NovelModal2>
    <NovelModal2
      ID="clecksell"
      IDCrad="clecksellCrad"
      ref="clecksellCrad"
      width="400px"
      :Onmouse="false"
      :Close="true"
    >
      <template v-slot:body>
        <div class="col-1">
          <div class="co-option">
            <div class="option" type="radio" @click="option(0)">
              <img
                src="https://novelkingdom.co//public/publicImages/vVybMfdekOYF3sZFsgs06C6EPCSvl9PzwAUMXSqL.png"
                width="100%"
              />
              <div>ฟรี</div>
            </div>
            <div class="option" @click="option(1)">
              <img
                src="https://novelkingdom.co//public/publicImages/yMCxiaslObKdoAcdEQ5H072MVq5eLiG4U7kXFmYS.png"
                width="100%"
              />
              <div>ขาย</div>
            </div>
          </div>
          <!--       <br> -->
          <!-- <div class="contor-input">
            <div class="title">สำหรับขาย</div>
            <select v-model="clecksell">
              <option value="1">ฟรี</option>
              <option value="2">ขาย</option>
            </select>
          </div> -->
          <!-- <div v-if="itempromotion"> -->
            <div class="contor-input nv-mt-10" v-if="clecksell == 1">
            <div class="title">
              ราคา
              <span class="warning"
                > ขั้นต่ำ 1.0 เเหรียญ</span
              >
            </div>
            <div class="form-promotion">
              <input
                class="input-name-ep"
                type="number"
                v-model="data.coin"
                @change="$filter.setTwoNumberDecimal"
                min="0.10"
                @keyup="filter"
               @keydown="updateValue"
                max="10.0"
                step="0.5"

                id="Coin"
              />
              <div class="form-promotion use-promotion" style="font-size: 13px" v-if="itempromotion">
                <input type="checkbox" class="check-promo" v-model="data.use_promotion" />
                <div class="">
                  <p>
                    ใช้โปรโมชัน</p>
                    <br>
                    <ul>
                    <li class="warning">
                      เมื่อคุณเลือก "ใช้โปรโมชัน"
                      ราคาตอนนี้จะถูกกำหนดให้ราคาตอนเหมือนกันกับโปรโมชันที่คุณตั้งก่อนหน้านี้
                    </li>
                    <li class="warning">
                 ราคาจะเป็นราคาปกติของคุณเมื่อคุณยกเลิกโปรโมชัน  </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- </div> -->
         
          <!-- <div v-else>
            <div class="contor-input nv-mt-10" v-if="clecksell == 1">
              <div class="title">
                ราคา
                <span class="warning">*</span>
              </div>
              <div class="form-promotion">
                <input
                  class="input-name-ep"
                  type="number"
                  v-model="data.coin"
                  @change="$filter.setTwoNumberDecimal"
                  @input="updateValue"
                  min="0.5"
                  @keyup="filter"
                  max="10.0"
                  step="0.5"
                  id="Coin"
                />
              </div>
            </div>
          </div> -->
        </div>

        <div class="contor-input nv-mt-30">
          <button
            type="submit"
            class="nv-btn-yellow"
            :disabled="data.coin < 1 && clecksell == '1' ? true : disabledSubmit"
            @click="!idEp ? submit() : updata()"
          >
            ยืนยัน
          </button>
        </div>
      </template>
    </NovelModal2>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import { alert } from "@/shares/modules/alert";
import { Validation } from "@/shares/modules/validation";
import { datatime, redatatime } from "@/shares/modules/datatime";
import NovelModal2 from "@/components/widget/NovelModal2.vue";

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
    NovelModal2,
  },
  data() {
    return {
      timeset: new Date(),

      lengthText: null as any,
      isdatetime: true,
      clecktime: "1",
      htime: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "23",
      ],
      itempromotion: null as any,
      datatime: datatime(new Date()).split("T")[1],
      clecksell: "0",
      idEp: this.$route.params.idEP,
      data: {
        count_character: "",
        novel_data_id: "",
        name: "",
        coin: 0 as any,
        detail: "",
        draft: true,

        publisher_episode_data: {
          date_time: "" as any,
        },
      },
      texts: {
        la: "",
        key: "",
      },
      disabledSubmit: false,
      publisher_episode_data: "",
    };
  },
  methods: {
    onDateRangeChange() {
      this.data.publisher_episode_data.date_time =
        datatime(this.data.publisher_episode_data.date_time).split("T")[0] +
        "T" +
        this.datatime;
    },
    async today() {
      this.data.publisher_episode_data.date_time = await "";
      const time = datatime(new Date()).split("T")[1];

      this.datatime = time;
      this.data.publisher_episode_data.date_time = datatime(new Date());
      console.log(this.data.publisher_episode_data.date_time);
      await (this as any).$refs.clecksellCrad.open();
    },
    option(key:any) {

      this.clecksell = key;
      const option0 = document.getElementsByClassName("option")[0];
      const option1 = document.getElementsByClassName("option")[1];
      if (key == 1) {
        option1.classList.add("option-active");
        option0.classList.remove("option-active");
        // this.data.coin = ''
      } else {
        option1.classList.remove("option-active");
        option0.classList.add("option-active");
        this.data.coin = 0.00
      }
    },
    async settime() {
      const arrvalidate = ["TitleEp"];
      if (Validation(arrvalidate as any) === true) {
        if (this.data.detail) {
          (this as any).$refs.setimeCrad.open();
        } else {
          alert("ไม่พบเนื้อหา", "error");
        }
      }
    },
    setsell() {
      this.data.publisher_episode_data.date_time =
        this.data.publisher_episode_data.date_time.split("T")[0] +
        "T" +
        this.datatime;
      // console.log(this.data.publisher_episode_data.date_time)
      (this as any).$refs.clecksellCrad.open();
    },
    updateValue(event: { target: { _value: any; }; }) {
      
      
      // const value = event.target._value
      // console.log(value);
      // if(value <= 0){
      //   this.disabledSubmit = true
      // }else{
      //   this.disabledSubmit = false
      // }
      // // if (String(value).length <= 10) {
      // //   '10' = value
      // // }
      // this.$forceUpdate()
    },
    async submit(draft = false) {
       this.clecksell == '1' &&  this.data.coin == 0 ? this.data.coin = 1 : null
      this.data.novel_data_id = this.$route.params.id;
      const arrvalidate = ["TitleEp"];
      if (Validation(arrvalidate as any) === true) {
        this.disabledSubmit = true;

        this.data.name = await this.removeSpaces(this.data.name);
        let res = await Gatway.postService("/customers/episode_data", {
          ...this.data,
          draft: draft,
          publisher_episode_data: {
            date_time: this.data.publisher_episode_data.date_time,
          },
        } as any);
        this.disabledSubmit = false;
        if (res.data.status === true) {
          if (draft) {
            alert("บันทึกฉบับบร่าง", "wraning");
            history.back();
          } else {
            alert("สร้างตอนนิยานสำเร็จ", "success");
            history.back();
          }
        }
      }
    },

    time() {
      // if(this.clecktime === '2' || this.clecktime === '3'){
      //   this.isdatetime = false
      // }else if(this.clecktime === '1'){
      //   this.data.publisher_episode_data.date_time = datatime(new Date())
      //   // console.log(new Date());
      //   this.isdatetime = true
      // }else{
      //   this.isdatetime = false
      // }
    },
    // datatimeset(){
    //   this.data.publisher_episode_data.date_time = `${this.datatime.date}T${this.datatime.h}:${this.datatime.m}:00`
    // },
    filter(e) {
      // console.log(e.target.value);
      if (e.target.value < 0) {
        e.target.value = Math.abs(e.target.value);
      } else if (e.target.value === "") {
        e.target.value = "";
      }
    },
    func_Editor(value: any) {
      this.data.detail = value;
      let ql0editor = document.getElementsByClassName(
        "ql-editor"
      )[0] as HTMLElement;
      let lengthText = ql0editor.textContent?.length;
      this.data.count_character = lengthText as any;
      this.lengthText = lengthText;
    },

    async getEp() {
      let res = await Gatway.getIDService("/customers/episode_data", this.idEp);
      this.data.coin = res.data.data.coin;
      this.clecksell = (await res.data.data.coin) === "0.00" ? "0" : "1";
      this.option(this.clecksell);
      this.data.novel_data_id = res.data.data.novel_data_id;
      this.data.name = res.data.data.name;
      this.data.detail = res.data.data.detail;
      this.data.draft = res.data.data.draft;
      this.data.publisher_episode_data.date_time =
        res.data.data.publisher_episode_data.date_time;
      // this.publisher_episode_data = redatatime( res.data.data.publisher_episode_data.date_time)
      this.datatime = redatatime(
        res.data.data.publisher_episode_data.date_time
      ).split("T")[1];
      // }
      // if(datatime(new Date()) > res.data.data.publisher_episode_data.date_time.split('.')[0]){
      //   console.log();
      // }
    },
    async getpomotion() {
      let res = await Gatway.getIDService(
        "/guest/check-promotion",
        this.$route.params.id
      );
      console.log(res);
      this.itempromotion = res.data.data.check_promotion;
    },
    async updata(draft = false) {
      // this.data.name = this.data.name.split(/\s+/).join(' ');
      console.log(this.data);
      this.disabledSubmit = true;
      this.data.novel_data_id = this.$route.params.id;
      this.data.coin = this.clecksell == "0" ? 0.0 : this.data.coin;
      this.data = { ...this.data, id: this.idEp } as any;
      this.data.name = await this.removeSpaces(this.data.name);

      let res = await Gatway.PutService("/customers/episode_data", this.idEp, {
        ...this.data,
        draft: draft,
        publisher_episode_data: {
          date_time: !draft
            ? this.data.publisher_episode_data.date_time
            : this.data.publisher_episode_data.date_time,
        },
      } as any);
      this.disabledSubmit = false;
      if (res) {
        if (!draft) {
          alert("อัปเดตตอนนิยายสำเร็จ", "success");
          this.getEp();
          history.back();
        } else {
          history.back();
        }
      }
      if (res.data.data == "Error Created") {
        alert("เวลาลงนิยายล่วงหน้าไม่ถูกต้อง", "error");
      }
      // console.log(res.data.data)
    },

    async removeSpaces(name) {
      return name.split(/\s+/).join(" ");
    },
  },
  mounted() {
    this.getpomotion();
    // console.log(datatime(new Date()));
    if (this.idEp) {
      this.getEp();
      this.clecktime = "3";
      // this.texts = {
      //   la:"เผยแผ่ทันที",
      //   key:'1'
      // }
    } else {
      this.data.publisher_episode_data.date_time = datatime(new Date());
      this.clecktime = "1";
      //   this.texts = {

      //     la:"เวลาที่เคยเผยแผ่ทันที",
      //     key:'1'
      //   }
    }
  },
});
</script>
<style lang="scss" scoped src="./NovelEp.scss"></style>
