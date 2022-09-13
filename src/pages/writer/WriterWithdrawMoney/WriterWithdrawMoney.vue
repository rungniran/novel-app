<template>
  <div>
    <!-- <div class="nv-box-white nv-mt-40" v-if="getdataWreter.length !== 0">
      <div
        v-for="(item, index) in getdataWreter"
        :key="index"
        class="list-bank"
      >
        <div>
          ธนาคาร {{ item.bank_type_id }}<br />
          เลขบัญชี {{ item.account_no }}
        </div>
        <div style="display: flex; gap: 10px">
          รออนุมัส
          <div @click="del(item.id)">ยกเลิก</div> 
        </div>
      </div>
    </div> -->
    <div v-if="this.$store.state.auth.dataset.profile_writer">
      <div
        class="nv-box-white nv-mt-40"
        v-if="
          this.$store.state.auth.dataset.profile_writer.note &&
          this.$store.state.auth.dataset.profile_writer.status_approve !== true
        "
      >
        <span class="respone">เหตุผลที่ไม่อนุมัติ</span> <br /><br />
        {{ this.$store.state.auth.dataset.profile_writer.note }}
      </div>
    </div>
    
    <div :class="'nv-box-white nv-mt-40'">
    <div class="title">สมัครนักเขียน</div>
      <div class="con-from">
        <div></div>
        <div class="contor-input">
          <div class="from-title">บุลคล/นิติ</div>
          <select
            v-model="dataProfile.type_of_company_data_id"
            :disabled="clecknote()"
          >
            <option
              v-for="(item, index) in company_data"
              :value="item.id"
              :key="index"
            >
              {{ item.name_preview }}
            </option>
          </select>
        </div>
        <div class="contor-input">
          <h1 class="content-article">1. เพิ่มบัญชีธนาคาร</h1>
          <li>
            <p class="content-detail">
              ยอดเงินของคุณจะถูกโอนเข้าไปในบัญชีที่ลงทะเบียนไว้โดยอัตโนมัติทุกสิ้นเดือน
              และต้องมีมากกว่า 1000 เหรียญ
            </p>
          </li>
          <li><p class="content-detail">ชื่อ-นามสกุล (ต้องตรงกับหน้าสมุดบัญชีเท่านั้น)</p></li>
        </div>
        <div class="from">
          <div class="contor-input">
            <div class="from-title">
              อัปโหลด รูปหน้าสมุดบัญชีธนาคาร ไฟล์ .jpg เท่านั้น
            </div>
            <input
              type="file"
              id="file"
              ref="myFiles"
              @change="previewFiles"
              accept="image/jpg"
            />
          </div>
          <!-- <div class="col-2-grid" v-if="dataProfile.type_of_company_data_id === type_of_company_data_id.personal">
            <div class="contor-input">
              <div class="from-title">ชื่อ</div>
              <input type="text" v-model="dataObj.first_name" id="first_name_back" placeholder="ชื่อ" />
            </div>
            <div class="contor-input">
              <div class="from-title">นามสกุล</div>
              <input type="text" v-model="dataObj.last_name" id="last_name_back" placeholder="นามสกุล" />
            </div>
          </div> -->
          <div>
            <div class="from-title">ชื่อบัญชี</div>
            <input
              type="text"
              v-model="company"
              id="nameaccoun"
              placeholder="ชื่อบัญชี"
            />
          </div>
          <div class="col-2-grid">
            <div class="contor-input">
              <div class="from-title">เลขบัญชี</div>
              <input
                type="text"
                placeholder="xxx-x-xxxxx-x-xx"
                id="account_no"
                v-model="dataObj.account_no"
                v-mask="'###-#-#####-#-##'"
              />
            </div>
            <div class="contor-input">
              <div class="from-title">ธนาคาร</div>
              <select
                name="cars"
                v-model="dataObj.bank_type_id"
                id="bank_type_id"
              >
                <option
                  v-for="(item, index) in Banking"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.name_preview }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="contor-input">
          <h1 class="content-article">

            2. แนบสำเนาบัตรประชาชน
          </h1>
          <p class="content-detail"
            >สำเนาบัตรประชาชนที่มีชื่อ-นามสกุล พร้อมลายเซ็นสำเนาถูกต้อง
            ต้องตรงกับบัญชีธนาคาร สำหรับออกเอกสารหักภาษี ณ ที่จ่าย
            (ภงด.90)</p
          >
        </div>
        <div class="from">
          <div class="contor-input">
            <div class="from-title">นามปากกา</div>
            <input
              type="text"
              v-model="dataProfile.user_nickname"
              id="user_nickname"
            />
          </div>
          <div class="contor-input">
            <div class="from-title">
              <span
                v-if="
                  dataProfile.type_of_company_data_id ===
                  type_of_company_data_id.personal
                "
              >
                แนบสำเนาบัตรประชาชน
              </span>
              <span v-else> หนังสือรับรองบริษัท นิติบุคคล </span>
              ไฟล์ .jpg เท่านั้น
            </div>
            <input
              type="file"
              style=""
              @change="previewFilesIDCard"
              accept="image/jpg"
            />
          </div>
          <div
            class="col-2-grid"
            v-if="
              dataProfile.type_of_company_data_id ===
              type_of_company_data_id.personal
            "
          >
            <div class="contor-input">
              <div class="from-title">ชื่อ</div>
              <input
                type="text"
                v-model="dataProfile.first_name"
                id="first_name_back"
                placeholder="ชื่อ"
              />
            </div>
            <div class="contor-input">
              <div class="from-title">นามสกุล</div>
              <input
                type="text"
                v-model="dataProfile.last_name"
                id="last_name_back"
                placeholder="นามสกุล"
              />
            </div>
          </div>
          <div v-else>
            <div class="from-title">ชื่อบริษัท</div>
            <input type="text" v-model="companyProfile" />
          </div>
          <div class="contor-input">
            <div class="from-title">
              <span
                v-if="
                  dataProfile.type_of_company_data_id ===
                  type_of_company_data_id.personal
                "
              >
                เลขประจำตัวประชาชน
              </span>
              <span v-else> เลขทะเบียนนิติบุคคล </span>
            </div>
            <input
              type="text"
              placeholder="x-xxxx-xxxxx-xx-x"
              id="id_card_number"
              v-mask="'#-####-#####-##-#'"
              v-model="dataObj.address.id_card_number"
            />
          </div>
          <div class="contor-input">
            <div class="from-title">ที่อยู่ตามบัตรประชาชน</div>
            <textarea
              style="resize: none; height: 100px"
              id="card_address"
              v-model="dataObj.address.card_address"
            ></textarea>
          </div>
          <div class="from-title checkbox">
            <input type="checkbox" @change="Copyassress()" /> ที่อยู่ปัจจุบัน
          </div>
        </div>
        <div class="contor-input">
          <h1 class="content-article">

            3. เพิ่มที่อยู่ปัจจุบัน หรือ ที่อยู่ที่สามารถติดต่อได้
          </h1>
          <p class="content-detail"
            >คุณสามารถดาวน์โหลด สำเนาเอกสารหักภาษี ณ ที่จ่ายได้ทันที
            หากต้องการฉบับจริงโปรดติดต่อมาที่</p
          >
        </div>
        <div class="from">
          <div class="contor-input">
            <div class="from-title">เพิ่มที่อยู่ปัจจุบัน</div>
            <textarea
              style="resize: none; height: 100px"
              id="current_address"
              v-model="dataObj.address.current_address"
            ></textarea>
          </div>
          <div class="contor-input">
            <div class="from-title">เบอร์โทรศัพท์</div>
            <input
              type="text"
              placeholder="xxx-xxxx-xxxx"
              id="phone_numble"
              v-model="dataObj.address.phone_numble"
              v-mask="'###-####-####'"
            />
          </div>
          <div class="contor-input">
            <div class="from-title">อีเมล</div>
            <input
              type="email"
              placeholder="email@example.com"
              id="email_support"
              v-model="dataObj.address.email_support"
            />
          </div>
          <div class="checkbox">
            <input
              type="checkbox"
              :checked="confirm"
              :value="confirm"
              @change="funcConfirm()"
              class="checkbox"
              id="checkbox"
            />
            ยอมรับ
            <span @click="$refs.Conditions.open()"
              >ข้อกำหนดและเงื่อนไขการใช้บริการ</span
            >
          </div>
          <!-- <div class="contor-input"> -->
          <div>
            <div v-if="this.$store.state.auth.dataset.profile_writer">
              <button
                :disabled="isubDate"
                class="nv-btn-yellow"
                @click="update()"
                v-if="
                  this.$store.state.auth.dataset.profile_writer.note &&
                  this.$store.state.auth.dataset.profile_writer
                    .status_approve !== true
                "
              >
                !! ลงทะเบียน
              </button>
            </div>
            <button v-else class="nv-btn-yellow" @click="cleck()">
              ลงทะเบียน
            </button>
          </div>
          <!-- <div><button class="nv-btn-yellow" @click="tests()">sdf</button></div> -->
        </div>
      </div>
    </div>
    <!-- <div :class="form === true ? 'nv-box-white nv-mt-40' : 'close'">
      <div>รายการโอนเงิน</div>
      <div class="report">ไม่มีข้อมูล</div>
    </div> -->
    <NovelModal2
      ID="WriterWithdrawMoney"
      IDCrad="WriterWithdrawMoneyCrad"
      ref="Modeal"
      :Close="true"
    >
      <template v-slot:body>
        <div style="font-size: 25px">ลงทะเบียนเรียบร้อย</div>
        เราได้รับคำขอของคุณเรียบร้อยแล้ว ทางเราจะใช้เวลาตรวจความถูกต้อง
        <br />ภายใน 3-4 วัน<br /><br />
        <button class="nv-btn-yellow" style="width: 100%" @click="ok()">
          ตกลง
        </button>
      </template>
    </NovelModal2>
    <!-- <div @click="testtt()">sd</div> -->
    <Conditions
      :confirm="confirm"
      @confirmConditions="confirmConditions"
      ref="Conditions"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import { Validation } from "@/shares/modules/validation";
import { alert } from "@/shares/modules/alert";

// ['id' => 'b29a6141-34af-4ec9-8537-3359b74a6a2a', 'table' => 'user_profile', 'tag' => 'type_of_company_data_id', 'name' => 'legal entity', 'name_preview' => 'นิติบุลคล', 'value' => ''],
// ['id' => 'c7ddc8d8-dc45-4652-8bde-905e2f5a4c64', 'table' => 'user_profile', 'tag' => 'type_of_company_data_id', 'name' => 'personal', 'name_preview' => 'บุลคล', 'value' => ''],
const type_of_company_data_id = {
  legalEntity: "b29a6141-34af-4ec9-8537-3359b74a6a2a",
  personal: "c7ddc8d8-dc45-4652-8bde-905e2f5a4c64",
};
export default Vue.extend({
  data() {
    return {
      confirm: false,
      type_of_company_data_id: type_of_company_data_id,
      test: "" as any,
      Banking: [] as any,
      BankID: "",
      company: "",
      companyProfile: "",
      dataObj: {
        account_no: "",
        bank_type_id: "",
        first_name: "",
        last_name: "",
        user_id: (this as any).profile.id,
        address: {
          phone_numble: "",
          id_card_number: "",
          current_address: "",
          card_address: "",
          email_support: "",
        },
      },
      dataProfile: {
        first_name: "",
        last_name: "",
        type_of_company_data_id: type_of_company_data_id.personal,
        user_nickname: "",
      },

      getdataWreter: null,
      form: false,
      fileAccount: null as any,
      FilesIDCard: null as any,
      company_data: null as any,
      isubDate: false,
    };
  },
  components: {
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
    Conditions: () => import("./../createnovel/conditions/Conditions.vue"),
  },
  async mounted() {
    this.getlist();
    this.$store.commit("reset");
    this.getBanking();
    console.log(this.clecknote());

    // window.scrollTo({ top: 0, behavior: "smooth" });
  },
  methods: {
    clecknote() {
      console.log("sdds");
      if (this.$store.state.auth.dataset.profile_writer) {
        if (
          this.$store.state.auth.dataset.profile_writer.note &&
          this.$store.state.auth.dataset.profile_writer.status_approve !== true
        ) {
          return false;
        } else {
          return true;
        }
        // return true
      } else {
        return false;
      }
    },
    previewFiles(e) {
      // e.target.files[0].type = 'image/jpeg'

      this.fileAccount = e.target.files[0];
      // console.log(this.FilesIDCard);
    },
    confirmConditions() {
      this.funcConfirm();
    },
    funcConfirm() {
      this.confirm === false ? (this.confirm = true) : (this.confirm = false);
    },
    Copyassress() {
      this.dataObj.address.current_address = this.dataObj.address.card_address;
    },
    previewFilesIDCard(e) {
      //  e.target.files[0].type = 'image/jpeg'
      this.FilesIDCard = e.target.files[0];
      // console.log(this.FilesIDCard);
    },
    cleck() {
      if (this.confirm === true) {
        this.submit();
      } else {
        (this as any).$refs.Conditions.open();
      }
    },
    async update() {
      let arrvalidate = [
        "id_card_number",
        "account_no",
        "current_address",
        "card_address",
        "nameaccoun",
        "phone_numble",
        "email_support",
        "user_nickname",
      ];
      console.log(Validation(arrvalidate as any));

      if (Validation(arrvalidate as any) === true) {
        if (this.confirm === true) {
          this.isubDate = true;
          this.dataObj.first_name = this.companySplit(this.company).first_name;
          this.dataObj.last_name = this.companySplit(this.company).last_name;
          let data = {
            ...this.dataProfile,
            id: (this as any).profile.profile_writer.id,
            note: null,
          };
          let res = await Gatway.postService(
            "/customers/profile-data/create-novelist",
            data as any
          );
          if (this.FilesIDCard) {
            let formData = new FormData();
            formData.append("file", this.FilesIDCard as any);
            formData.append("ref", res.data.data.id);
            formData.append("table", "user_profile_data");
            await Gatway.postService(
              "/upload/image/ref-table",
              formData as any
            );
          }
          await Gatway.postService("/customers/user-info/change-address", {
            address: this.dataObj.address,
          } as any);
          let databank = { ...this.dataObj, id: this.BankID };
          let resbank = await Gatway.postService(
            "/customers/bank-datas",
            databank as any
          );
          if (this.fileAccount) {
            let formData = new FormData();
            formData.append("file", this.fileAccount as any);
            formData.append("ref", resbank.data.data.id);
            formData.append("table", "user_bank_datas");
            await Gatway.postService(
              "/upload/image/ref-table",
              formData as any
            );
          }
          this.isubDate = false;
          this.$store.commit("reset");
          (this as any).$refs.Modeal.open();
        } else {
          (this as any).$refs.Conditions.open();
        }
      }
    },
    autoTab(obj: any, fm: string) {
      if (obj.key !== "Backspace") {
        var pattern = new String(fm); // กำหนดรูปแบบในนี้
        var pattern_ex = new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
        var returnText = new String("");
        var obj_l = obj.target.value.length;
        var obj_l2 = obj_l - 1;
        for (var i = 0; i < pattern.length; i++) {
          if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
            returnText += obj.target.value + pattern_ex;
            obj.target.value = returnText;
          }
        }
        if (obj_l >= pattern.length) {
          obj.target.value = obj.target.value.substr(0, pattern.length - 1);
        }
        return obj.target.value;
      }
    },
    async getBanking() {
      let res = await Gatway.getService(
        "/miscellaneous/fetch/bank_datas/bank_type_id"
      );
      this.Banking = res.data.data;
    },

    companySplit(name) {
      //  console.log(this.company.split(' '));
      const company = name.split(" ");
      const first_name = company[0];
      company.splice(0, 1);
      const cleck_last_name = company
        .toString()
        .replaceAll("[", "")
        .replaceAll(",", " ");
      const last_name =
        cleck_last_name === ""
          ? "-"
          : company.toString().replaceAll("[", "").replaceAll(",", " ");
      return { first_name: first_name, last_name: last_name };
    },
    async submit() {
      // if (
      //   this.dataProfile.type_of_company_data_id ===
      //   this.type_of_company_data_id.legalEntity
      // ) {
      this.dataObj.first_name = this.companySplit(this.company).first_name;
      this.dataObj.last_name = this.companySplit(this.company).last_name;
      // }
      if (this.fileAccount && this.FilesIDCard) {
        let arrvalidate = [
          "id_card_number",
          "account_no",
          "current_address",
          "card_address",
          "nameaccoun",
          "phone_numble",
          "email_support",
          "user_nickname",
        ];
        if (Validation(arrvalidate as any) === true) {
          let res = await Gatway.postService(
            "/customers/bank-datas",
            this.dataObj as any
          );
          await this.submitAddress();
          await this.tests();
          if (res.data.code === 200) {
            let formData = new FormData();
            formData.append("file", this.fileAccount as any);
            formData.append("ref", res.data.data.id);
            formData.append("table", "user_bank_datas");
            await Gatway.postService(
              "/upload/image/ref-table",
              formData as any
            );
            this.$store.commit("reset");
            (this as any).$refs.Modeal.open();

            this.getlist();
          }
        }
      } else {
        alert("ไม่พบไฟล์", "error");
      }
    },

    async submitAddress() {
      let res = await Gatway.postService(
        "/customers/user-info/change-address",
        { address: this.dataObj.address } as any
      );

      // let formData = new FormData();
      // formData.append('file',this.fileAccount as any)
      // formData.append('ref',  res.data.data.id)
      // formData.append('table', 'user_bank_datas')
      // await Gatway.postService("/upload/image/ref-table", formData as any);
    },
    async tests() {
      if (
        this.dataProfile.type_of_company_data_id ===
        this.type_of_company_data_id.legalEntity
      ) {
        this.dataProfile.first_name = this.companySplit(
          this.companyProfile
        ).first_name;
        this.dataProfile.last_name = this.companySplit(
          this.companyProfile
        ).last_name;
      }
      let res = await Gatway.postService(
        "/customers/profile-data/create-novelist",
        this.dataProfile as any
      );
      if (res.data.code === 200) {
        let formData = new FormData();
        formData.append("file", this.FilesIDCard as any);
        formData.append("ref", res.data.data.id);
        formData.append("table", "user_profile_data");
        await Gatway.postService("/upload/image/ref-table", formData as any);
      }
    },
    ok() {
      // location.reload();
      this.$router.push("/writer#Seport");
    },
    async getlist() {
      let res = await Gatway.getService("/customers/bank-datas");
      let company_data = await Gatway.getService(
        "/miscellaneous/fetch/user_profile/type_of_company_data_id"
      );
      this.company_data = company_data.data.data;

      res.data.data.length !== 0 ? (this.form = true) : (this.form = false);
      this.getdataWreter = res.data.data;
      console.log((this as any).profile);
      if (res.data.data[0]) {
        this.dataObj.account_no = res.data.data[0].account_no;
        this.BankID = res.data.data[0].id;
        this.company = res.data.data[0].full_name_preview;
        this.dataObj.bank_type_id = res.data.data[0].bank_type_id;
        if ((this as any).profile.profile_writer) {
          let address = JSON.parse((this as any).profile.json_address);
          this.dataProfile.first_name = (
            this as any
          ).profile.profile_writer.first_name;
          this.dataProfile.last_name = (
            this as any
          ).profile.profile_writer.last_name;
          this.dataProfile.user_nickname = (
            this as any
          ).profile.profile_writer.user_nickname;
          this.dataProfile.type_of_company_data_id = (
            this as any
          ).profile.profile_writer.type_of_company_data_id;
          this.dataObj.address.id_card_number = address.id_card_number;
          this.dataObj.address.current_address = address.current_address;
          this.dataObj.address.card_address = address.card_address;
          this.dataObj.address.phone_numble = address.phone_numble;
          this.dataObj.address.email_support = address.email_support;
          console.log(address);
        }
      }
    },
    async del(id) {
      let res = await Gatway.DelService("/customers/bank-datas/" + id);
      this.getlist();
    },
    async testtt() {
      let company_data = await Gatway.postService(
        "/customers/query-image",
        {} as any
      );
    },
  },
});
</script>
<style lang="scss" scoped>
.b-mo {
  background: url(\https://fictionlog.co/a/images/bannerPatterns/cash_out.svg)
    left 50px / 600px repeat #ffd566c7;
  width: 100%;
  height: 80px;
  margin-top: -3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
}
.report {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.Money {
  margin-top: 0px;
  border-radius: 0px 0px 10px 10px;
}
.con-from {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: 70px 50px;
}
.col-2-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}
// .list-bank{
//   display: flex;
//   justify-content: space-between;
//   padding: 10px;

// }
.title {
  font-size: 20px;
  color: #272727;
  width: max-content;
  font-weight: 400;
  padding: 5px;
}
.respone {
  color: #c40909;
}

.close {
  display: none;
}
.checkbox {
  display: flex;
  align-items: center;
}
.content-article{
  color: #a187f7;
}
.content-detail{
  font-size: 15px;
}
@media (max-width: 1024px) {
}
@media (max-width: 768px) {
  .series {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 415px) {
  .con-from {
    grid-template-columns: 1fr;
  }
}
</style>
