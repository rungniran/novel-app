<template>
  <div class="CreateNovel">
    <div class="nv-box-white nv-mt-40" enctype="multipart/form-data">
    
      <!-- {{data.image_data.url}} -->
      <div class="img-cropper">
        <div v-if="data.image_data">
          <NovelCropper @imgCropper="imgCropper" type="image/jpeg" :imgupdata="data.image_data.url"/>
        </div>
        <div v-else>
          <NovelCropper @imgCropper="imgCropper" type="image/jpeg" />
        </div>
      </div>
      <div class="from nv-mt-30">
        <div class="title-checkend">
          <div class="contor-input">
            <div class="title">ชื่อเรื่อง <span class="is-valid">*</span></div>
            <input v-model="data.title" maxlength="120" id="title" required />
          </div>
          <div class="grop" v-show="checkupdate">
            <input
              type="checkbox"
              id="checkboxend"
              v-model="data.status_end_novel"
            />
            <label for="checkboxend">นิยายจบแล้ว</label>
          </div>
   
        </div>

        <div class="col-2">
          <div class="contor-input">
            <div class="title">หมวดหลัก <span class="is-valid">*</span></div>
            <!-- <NovelDropdown
              :data="dropdownCategory"
              id="inCategory"
						  :value="data.novel_category_data_id"
            /> -->

            <select v-model="data.novel_category_data_id" id="inCategory">
              <option
                v-for="(item, index) in dropdownCategory"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="contor-input">
            <div class="title">เรทติ้ง <span class="is-valid">*</span></div>
            <select v-model="data.novel_rating_data_id" id="inRating">
              <option
                v-for="(item, index) in dropdownRating"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <!-- <div
          v-if="type === '4aa1927f-32ac-46a8-bd8a-361b8a5c208d'"
          class="col-2"
        >
          <div class="contor-input">
            <div class="title">ผู้แต่ง <span class="is-valid">*</span></div>
            <input v-model="data.author" id="author" />
          </div>
          <div class="contor-input">
            <div class="title">แปลโดย <span class="is-valid">*</span></div>
            <input v-model="data.translated_by" id="translatedBy" />
          </div>
        </div> -->
        <div>
          <div class="title">คำโปรย <span class="is-valid">*</span></div>
          <textarea rows="10" v-model.trim="data.detail"  maxlength="250" id="detail"></textarea>
          <small :class="data.detail.length > maxtext ? 'texterr' : ''">
            {{ data.detail.length }}/{{maxtext}}
          </small>
        </div>
        <div>
          <div class="title">เรื่องย่อ <span class="is-valid">*</span></div>
          <NovelEditor
          height="30"
            @Editor="func_Editor"
            :valueWay="this.data.description"
          />
        </div>
        <div class="nv-mt-30">
          <div class="title">แท็ก</div>
          <input @keydown.enter="addTag" @keyup.space="addTag" maxlength="25"/>
          <div class="con-tag">
            <div
              v-for="(item, index) in data.tags"
              :key="index"
              class="tag"
              
            >
              #{{ item }}<i class="fas fa-times-circle" @click="del(index)"></i>
            </div>
          </div>
        </div>
        <div v-if="!checkupdate" class="contai-checkbox">
          <div class="round">
            <input
              type="checkbox"
              :checked="confirm"
              :value="confirm"
              @change="funcConfirm()"
              class="checkbox"
              id="checkbox"
            />
            <label for="checkbox"></label>
          </div>
          <div>
            ยอมรับ
            <span class="btn-conditions" @click="$refs.Conditions.open()"
              >ข้อกำหนดและเงื่อนไขการใช้บริการ</span
            >
          </div>
        </div>
        <div>
          <!-- {{$store.state.loading.isCheckLoading}} type === '4aa1927f-32ac-46a8-bd8a-361b8a5c208d'
                ? submit()
                : submitMy()-->
          <button
            v-if="!checkupdate"
            :disabled="disabled"
            class="nv-btn-orange"
            @click="link()"
          >
            ยืนยัน
          </button>

          <button
            v-else
            class="nv-btn-orange"
            @click="Updata()"
            :disabled="disabled"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>

    <NovelModal2 ID="setime" IDCrad="setimeCrad" ref="setimeCrad" width="400px"  :Onmouse="false" :Close="true">
       <template v-slot:body>
          <div class="co-option-time" >
            <div class="option-time" type="radio" @click="today(false)">
                 <!-- <img src="https://novelkingdom.co//public/publicImages/vVybMfdekOYF3sZFsgs06C6EPCSvl9PzwAUMXSqL.png" width="100%"> -->
                 <div>เผยแพร่</div>
            </div>
            <div class="option-time" @click="today(true)">
             <!--  <img src="https://119.59.97.111/public/publicImages/yMCxiaslObKdoAcdEQ5H072MVq5eLiG4U7kXFmYS.png" width="100%"> -->
              <div>ยังไม่เผยแพร่</div>
            </div>
          </div>
     
       </template>
    </NovelModal2>    
    <NovelModal2 ID="clecktime" IDCrad="clecktimeCrad" ref="clecktimeCrafd" width="400px"  :Onmouse="false" :Close="true">
      <template v-slot:body>

          <div class="contor-input">
             <div class="title">
              วันที่เผยแพร่ <span class="is-valid">*</span>
            </div>

            <v-date-picker is-expanded v-model="data.publisher_episode_data.date_time" @input="onDateRangeChange"/>
     <!--        <br>
            <div class="title">เวลาที่เผยแพร่</div>
            <input type='time' min="00:00" max="24:00" >
 -->          </div>
          

        <!-- </div>  @click="setsell()" -->
        <div class="contor-input nv-mt-30">
        <button
            type="submit"
            class="nv-btn-yellow"
            @click="settime()"
          
          >
            ยืนยันการตั้งเวลา
          </button>
        </div>
      </template>

    </NovelModal2>
       <NovelLoading ref="loading"/>
    <Conditions
      :confirm="confirm"
      @confirmConditions="confirmConditions"
      ref="Conditions"
    />
  </div>
</template>
<script>
import { Validation } from "../../../shares/modules/validation";
import { Gatway,  ListService } from "../../../shares/services";
import { alert } from "@/shares/modules/alert";
// import { sms_alert_AddNovel } from "@/shares/constants/smsalert";
import Vue from "vue";

export default Vue.extend({
  name: "CreateNovel",
  components: {
    NovelCropper: () => import("@/components/widget/NovelCropper.vue"),
    // NovelDropdown: () => import("@/components/widget/NovelDropdown.vue"),
    Conditions: () => import("./conditions/Conditions.vue"),
    NovelEditor: () => import("@/components/widget/NovelEditor.vue"),
  },
  data() {
    return {
      dropdownCategory: [],
      dropdownRating: [],
      type: this.$route.params.id,
      confirm: false,
      maxtext:250,
      checkupdate: this.$route.params.idnovel,
      data: {
        novel_category_data_id: "",
        novel_data_type_id: this.$route.params.id,
        novel_rating_data_id: "",
        publisher_novel_data_id: this.profile.user_uuid,
        title: "",
        description: "",
        detail: "",
        publisher: "",
        translated_by: "",
        tags: [],
        status_end_novel: false,
        draft:false
      },
      file: {},
      tags: [],
      disabled: false,
      
    };
  },
  methods: {
    link(){
        if (this.data.img) {
           let arrvalidate = ["title", "inCategory", "inRating", "detail"];
           if (Validation(arrvalidate) === true) {

       this.$refs.setimeCrad.open()
     }
        } else {
        alert("กรุณาเพิ่มรูปนิยาย", "error");
      }
    },
    asopen(){
          console.log('asasas');
          // (this as any).$refs.clecktimeCrafd.open() 
    },
    today(key){
      this.data.draft = key
        this.type === '4aa1927f-32ac-46a8-bd8a-361b8a5c208d'
                ? this.submit()
                : this.submitMy()
    },
    onDateRangeChange(){
       // eslint-disable-next-line no-undef
      //  this.data.publisher_episode_data.date_time = this.data.publisher_episode_data.date_time
    },
    settime(){
      console.log()
      // this.data.publisher_episode_data.date_time = data.publisher_episode_data.date_time
      this.type === '4aa1927f-32ac-46a8-bd8a-361b8a5c208d' ? this.submit() : this.submitMy()
    },
    onFileChange(e) {
      this.filename = "Selected File: " + e.target.files[0].name;
      this.file = e.target.files[0];
    },
    async submitForm() {
      let formData = new FormData();
      formData.append("file", this.file);
      let res = await Gatway.postService("/test/upload", formData);
      res.data.status === true ? alert(res.data.data, "success") : null;
    },
    imgCropper(value) {
      this.data.img = value;
    },
    func_Editor(value) {
      this.data.description = value;
    },
    submit() {
      if (this.data.img) {
      let arrvalidate = [
        "title",
        // "author",
        "inCategory",
        "inRating",
        // "translatedBy",
        "detail",
      ];
      if (Validation(arrvalidate) === true) {
        this.confirm === true
          ? this.createnovel()
          : this.$refs.Conditions.open();
      }
      }else {
        alert("กรุณาเพิ่มรูปนิยาย", "error");
      }
    },
    submitMy() {
      if (this.data.img) {
        let arrvalidate = ["title", "inCategory", "inRating", "detail"];
        if (Validation(arrvalidate) === true) {
          this.confirm === true
            ? this.createnovel()
            : this.$refs.Conditions.open();
        }
      } else {
        alert("กรุณาเพิ่มรูปนิยาย", "error");
      }
    },
    async createnovel() {
      await this.$refs.loading.switchloading(true)
      this.disabled = true;
      //  this.$store.commit("isCheckLoading",{status: true});
      let res =
        this.data.detail.length < this.maxtext
          ? await Gatway.postService("/customers/novel", this.data)
          : null;
      if (res.data.code === 200) {

        // formData.append("file", this.data.img);
        // formData.append("novel_data_id", res.data.data.id);
        // await Gatway.postService("/upload/image/novel-data", formData);
        let formData = new FormData();
        formData.append("file", this.data.img);
        formData.append("ref", res.data.data.id);
        formData.append("table", "novel");
        await Gatway.postService("/upload/image/ref-table", formData);
        if (res.data.status === true) {

          // alert(sms_alert_AddNovel(this.res.data.data.title), "success");
          alert("สร้างนิยายสำเร็จ", "success");
          this.$router.push("/writer");
        }
        await this.$refs.loading.switchloading(false)
        this.disabled = false;
      }
    },
    async novelRatingDataId() {
      const res = await ListService.listRating();
      this.dropdownRating = await res.data.data.reverse();
    },
    async novelCategoryDataId() {
      const res = await ListService.listCategory();
      this.dropdownCategory = await res.data.data;
    },
    confirmConditions() {
      this.funcConfirm();
    },
    funcConfirm() {
      this.confirm === false ? (this.confirm = true) : (this.confirm = false);
    },
    async GetServiceMy() {

      const res = await Gatway.getIDService('/customers/novel',this.$route.params.idnovel);
      this.data = res.data.data;
      this.data.tags = JSON.parse(res.data.data.tags);
    },
    async Updata() {
      this.disabled = true;
      const res =
        this.data.detail.length < 1000
          ? await Gatway.PutService(
              "/customers/novel",
              this.$route.params.idnovel,
              this.data
            )
          : null;

      if (res.data.code === 200) {
        // let formData = new FormData();
        // formData.append("file", this.data.img);
        // formData.append("novel_data_id", this.$route.params.idnovel);
        alert(res.data.data, "success");
        // await Gatway.PutService("/upload/image/novel-data", this.$route.params.idnovel ,formData)
        let formData = new FormData();
        formData.append("file", this.data.img);
        formData.append("ref", this.$route.params.idnovel);
        formData.append("table", "novel");
        // await Gatway.postService("/upload/image/ref-table", formData);
        await this.data.img
          ? await Gatway.postService("/upload/image/ref-table", formData)
          : null;
        this.$router.push('/writer/novelpreview/'+this.$route.params.idnovel)
      }
      this.disabled = false;
    },
    addTag(event) {
      this.data.tags.push(event.target.value);
      event.target.value = "";
    },
    del(index) {
      this.data.tags.splice(index, 1);
    },
  },
  async mounted() {
    console.log("testurl",this.checkupdate);

    await this.novelRatingDataId();
    await this.novelCategoryDataId();
   await this.checkupdate ? this.GetServiceMy() : null;
  //  await this.$store.commit("checkLoading",{status: false});
    // console.log(this.$route.params.idnovel);
  },
  //   beforeUpdate(){
  //      this.$store.commit("checkLoading",{status: false});
  // }
});
</script>
<style lang="scss" scoped>
.nv-box-white {
  // max-width: 950px;
  position: relative;
  overflow: hidden;
}
.from {
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 20px;
}
.checkbox {
  width: 20px !important;
}
.checkboxEndNovel{
  display: none;
}
.contai-checkbox {
  height: 30px;
  display: flex;
  align-items: center;
  height: 30px;
}
.col-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.title-checkend {
  display: grid;
  grid-template-columns: 5fr auto;
  align-items: end;
  gap: 10px;
}
.grop {
  display: flex;
  align-items: center;
}
.contor-input {
  display: grid;
  grid-gap: 3px;
}
.title {
  margin-left: 3px;
  color: #444349;
  font-size: 13px;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 0px;
  height: 100px !important;
}
.editor {
  height: 20rem;
  /* //   overflow: hidden; */
}

.ql-editor {
  font-family: "Sarabun", sans-serif;
}
.output {
  width: 100%;
  height: 20rem;
  margin: 0;
  border: 1px solid #ccc;
  overflow-y: auto;
  resize: vertical;
}
textarea {
  resize: none;
}

textarea:focus-visible {
  outline: none;
}
.img-cropper {
  display: flex;
  justify-content: center;
}
.round {
  position: relative;
  width: 40px;
  height: 30px;
}

.round label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  left: 0;
  position: absolute;
  top: 0;
  width: 28px;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  left: 7px;
  opacity: 0;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 12px;
}

.round input[type="checkbox"] {
  visibility: hidden;
}

.round input[type="checkbox"]:checked + label {
  background-color: #66bb6a;
  border-color: #66bb6a;
}

.round input[type="checkbox"]:checked + label:after {
  opacity: 1;
}
.alert {
  position: fixed;

  width: 300px;
  height: 70px;
  z-index: 1000px;
  background: #ffcccc;
  border: 2px solid #ff6c6c;
  border-radius: 5px;
}
.co-option-time{
      display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    font-family: Sarabun,sans-serif;
}
.option-time{
   padding: 20px;
    border: 2px solid #ffc54c;
    font-size: 18px;
    background: #fbc24b;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
    text-align: center;
}
.option-time:hover{
  // background: #fbc24b;
  background: #fff3d9;
  color: #ffc54c;
}
.btn-conditions {
  text-decoration: underline;
  cursor: pointer;
}
.btn-conditions:hover {
  color: #ff6c6c;
}
.texterr {
  color: red;
}
.con-tag {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.tag {
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
  background: #cecece;
  position: relative;
}
.fa-times-circle {
  position: absolute;
  top: -3px;
  cursor: pointer;
  transform: scale(0);
  transition: 0.3s;
}
.tag:hover {
  cursor: pointer;
}
.tag:hover .fa-times-circle {
  transform: scale(1);
}
</style>
