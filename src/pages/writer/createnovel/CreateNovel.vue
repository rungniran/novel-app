<template>
  <div class="CreateNovel">
    <div class="nv-box-white nv-mt-40" enctype="multipart/form-data">
    <!-- {{data.image_data.url}} -->
      <div class="img-cropper" >
        <NovelCropper @imgCropper="imgCropper"  />
      </div>
      <div class="from nv-mt-30"  >
        <div class="contor-input">
          <div class="title">ชื่อเรื่อง <span class="is-valid">*</span></div>
          <input v-model="data.title" id="title" required />
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
                            <option v-for="item,index in dropdownCategory" :key="index" :value="item.id">{{item.name}}</option>
            </select>
          </div>
          <div class="contor-input">
            <div class="title">เรทติ้ง <span class="is-valid">*</span></div>
						<select  v-model="data.novel_rating_data_id" id="inRating">	
								<option v-for="item,index in dropdownRating" :key="index" :value="item.id">{{item.name}}</option>
						</select>
          </div>
        </div>
        <div
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
        </div>
        <div>
          <div class="title">คำโปรย <span class="is-valid">*</span></div>
          <textarea rows="10" v-model.trim="data.detail" id="detail"></textarea>
          <small :class="data.detail.length > 500 ? 'texterr' : '' "> {{data.detail.length}}/500 </small>
        </div>
        <div>
          <div class="title">เรื่องย่อ <span class="is-valid">*</span></div>
					<NovelEditor @Editor="func_Editor" :valueWay="this.data.description"/>
        </div>
        <div class="nv-mt-40">
          <div class="title">แท็ก</div>
          <input @keydown.enter='addTag'/>
        </div>
        <div v-if="!checkupdate" class="contai-checkbox">
          <div class="round">
            <input
              type="checkbox"
              :value="confirm"
              @change="funcConfirm()"
              class="checkbox"
              id="checkbox"
            />
            <label for="checkbox"></label>
          </div>
          <div >
            ยอมรับ
            <span
              class="btn-conditions"
              @click="$base.openmodal('modal-conditions', 'modal-animation', 0)"
              >ข้อกำหนดและเงื่อนไขการใช้บริการ</span
            >
          </div>
        </div>
        <div>
          <button
					v-if="!checkupdate"
            class="nv-btn-orange"
            @click="
              type === '4aa1927f-32ac-46a8-bd8a-361b8a5c208d'
                ? submit()
                : submitMy()
            "
          >
            ยืนยัน
          </button>
					 <button v-else class="nv-btn-orange" @click="Updata()">
						ยืนยัน
					</button>
        </div>
      </div>
    </div>
    <div class="alert"></div>
    <Conditions />
  </div>
</template>
<script >
import { Validation } from "../../../shares/modules/validation";
import { Gatway, GetService, ListService } from "../../../shares/services";
import { alert } from '@/shares/modules/alert'
import Vue from "vue";

export default Vue.extend({
  name: "CreateNovel",
  components: {
    NovelCropper: () => import("@/components/widget/NovelCropper.vue"),
    // NovelDropdown: () => import("@/components/widget/NovelDropdown.vue"),
    Conditions: () => import("./conditions/Conditions.vue"),
		NovelEditor: () => import("@/components/widget/NovelEditor.vue")
  },
  data() {
    return {
      dropdownCategory: [],
      dropdownRating: [],
      type: this.$route.params.id,
      confirm: false,
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
				translated_by:""
      },
      file:{}
    };
  },
  methods: {
    onFileChange(e) {
      //console.log(e.target.files[0]);
      this.filename = "Selected File: " + e.target.files[0].name;
      this.file = e.target.files[0];
    },
    async submitForm() {
      let formData = new FormData();
      formData.append('file', this.file);
      let res = await  Gatway.postService("/test/upload",formData)
      console.log(res.data.status);
      res.data.status === true
      ? alert(res.data.data, "success")
      : null
    },
    imgCropper(value) {
      console.log(value);

      this.data.img = value;
    },
		func_Editor(value){
      this.data.description = value;
		},
    submit() {
      let arrvalidate = [
        "title",
        "author",
        "inCategory",
        "inRating",
        "translatedBy",
        "detail",
      ];
      if (Validation(arrvalidate) === true) {
        this.confirm === true
          ? this.createnovel()
          : this.$base.openmodal("modal-conditions", "modal-animation", 0);
      }
    },
    submitMy() {
      let arrvalidate = ["title", "inCategory", "inRating", "detail"];
      if (Validation(arrvalidate) === true) {
        this.confirm === true
          ? this.createnovel()
          : this.$base.openmodal("modal-conditions", "modal-animation", 0);
      }
    },
    async createnovel() {
      let formData = new FormData();
      this.data = {...this.data,  formData } 
      let res = this.data.detail.length < 500 ? await  Gatway.postService("/customers/novel", this.data) : null
      if(res.data.code === 200){
        formData.append('file', this.data.img);
        formData.append('novel_data_id',  res.data.data.id)
        await Gatway.postService("/upload/image/novel-data", formData)
        if(res.data.status === true){
          alert(res.data.data, "success")
          this.$router.push("/writer") ;
        } 
      }
      
    },
    async novelRatingDataId() {
      const res = await ListService.listRating()
      this.dropdownRating = await res.data.data.reverse();

    },
    async novelCategoryDataId() {
      const res = await ListService.listCategory()
      this.dropdownCategory = await res.data.data;
    },
    funcConfirm() {
      this.confirm === false ? (this.confirm = true) : (this.confirm = false);
    },
		async GetServiceMy(){
		  const res = await	GetService.getNovel(this.$route.params.idnovel)
			this.data = res.data.data
		},
		async Updata(){
      const res = this.data.detail.length < 500 ? await Gatway.PutService('/customers/novel' , this.$route.params.idnovel, this.data) : null
      if(res.data.code === 200){      
        let formData = new FormData();
        formData.append('file', this.data.img);
        formData.append('novel_data_id',  this.$route.params.idnovel)
        alert(res.data.data, "success")
        console.log(this.data.img);
        let resimg = this.data.img ? await Gatway.postService("/upload/image/novel-data", formData) : null
        this.$router.go(-1) ;
        
      }
		},
		addTag(event){
			console.log(event.target.value);
		}
  },
  mounted() {
    this.novelRatingDataId();
    this.novelCategoryDataId();
		this.checkupdate
		? this.GetServiceMy()
		: null

    // console.log(this.$route.params.idnovel);
  },
});
</script>
<style lang="scss" scoped>
.nv-box-white {
  max-width: 950px;
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
.btn-conditions {
  text-decoration: underline;
  cursor: pointer;
}
.btn-conditions:hover {
  color: #ff6c6c;
}
.texterr{
  color: red;
 }
</style>
