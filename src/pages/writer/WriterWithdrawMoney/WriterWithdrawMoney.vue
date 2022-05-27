<template>
  <div>
    <div class="b-mo">
      ข้อมูลนักเขียน
    </div>
    <div class="nv-box-white nv-mt-40 Money">
      <div v-for="item, index in getdataWreter" :key="index" class="list-bank">
        <div> ธนาคาร {{item.bank_type_id}}<br> เลขบัญชี {{item.account_no}} </div> 
        <div style="display: flex; gap:10px"> รออนุมัส <div @click="del(item.id)">ยกเลิก</div> </div>
      </div>
    </div>
    <div>
      
    </div>
    <div :class="form === false ? 'nv-box-white nv-mt-40' : 'close'" >
       <div class="con-from">
        <div class="contor-input">
            1. เพิ่มบัญชีธนาคาร
           <li> <small>ยอดเงินของคุณจะถูกโอนเข้าไปในบัญชีที่ลงทะเบียนไว้โดยอัตโนมัติทุกสิ้นเดือน และต้องมีมากกว่า 1000 เหรียญ</small></li>
           <li> <small>ชื่อ-นามสกุล (ต้องตรงกับหน้าสมุดบัญชีเท่านั้น)</small></li>
        </div>
        <div class="from">
          <div class="contor-input">
            <div class="from-title">อัปโหลด รูปหน้าสมุดบัญชีธนาคาร</div>
            <input type="file" id="file" ref="myFiles" @change="previewFiles" multiple>
          </div>
          <div class="col-2-grid">
            <div class="contor-input">
              <div class="from-title">ชื่อ</div>
              <input type="text" v-model="dataObj.first_name" id="first_name" placeholder="ชื่อ" />
            </div>
            <div class="contor-input">
            <div class="from-title">นามสกุล</div>
            <input type="text" v-model="dataObj.last_name" id="last_name" placeholder="นามสกุล" />
          </div>
          </div>
          <div class="col-2-grid">
            <div class="contor-input">
              <div class="from-title">เลขบัญชี</div>
              <input type="text" placeholder="xxx-x-xxxxx-x-xx" id="account_no" @input="this.target.value = this.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" v-model="dataObj.account_no"  @keydown="autoTab($event, 'xxx-x-xxxxx-x-xx')"/>
            </div>
            <div class="contor-input">
              <div class="from-title">ธนาคาร</div>
              <select name="cars"  v-model="dataObj.bank_type_id" id="bank_type_id">
                  <option v-for="item,index in Banking" :key="index" :value="item.id">{{item.name_preview}}</option>
                </select>
            </div>
           </div>
        </div>
         <div class="contor-input">
            2. แนบสำเนาบัตรประชาชน
            <small>สำเนาบัตรประชาชนที่มีชื่อ-นามสกุล พร้อมลายเซ็นสำเนาถูกต้อง ต้องตรงกับบัญชีธนาคาร สำหรับออกเอกสารหักภาษี ณ ที่จ่าย (ภงด.90)</small>
        </div>
        <div class="from">
           <div class="contor-input">
            <div class="from-title">แนบสำเนาบัตรประชาชน</div>
            <input type="file" style=""/>
          </div>
          <div class="contor-input">
            <div class="from-title">เลขประจำตัวประชาชน</div>
            <input type="text" placeholder="x-xxxx-xxxxx-xx-x"  @keydown="autoTab($event, 'x-xxxx-xxxxx-xx-x')"/>
          </div>
          <div class="contor-input">
            <div class="from-title">ที่อยู่ตามบัตรประชาชน</div>
            <textarea style="resize:none; height: 100px;"></textarea>
          </div>
        </div>
           <div class="contor-input">
              3. เพิ่มที่อยู่ปัจจุบัน หรือ ที่สามารถติดต่อได้
              <small>คุณสามารถดาวน์โหลด สำเนาเอกสารหักภาษี ณ ที่จ่ายได้ทันที หากต้องการฉบับจริงโปรดติดต่อมาที่ account@fictionlog.co</small>
           </div>
           <div class="from">
              <div class="contor-input">
                <div class="from-title">เพิ่มที่อยู่ปัจจุบัน</div>
                <textarea style="resize:none; height: 100px;"></textarea>
              </div>
              <div class="contor-input">
                <div class="from-title">เบอร์โทรศัพท์</div>
                <input type="text" placeholder="xxx-xxxx-xxxx" @keydown="autoTab($event, 'xxx-xxxx-xxxx')"/>
              </div>
              <div class="contor-input">
                <div class="from-title">อีเมล</div>
                <input type="email" placeholder="name@example.com"/>
              </div>
              <div><button class="nv-btn-yellow" @click="submit()">ลงทะเบียน</button></div>
              
           </div>
      </div>
    </div>
    <div  :class="form === true ? 'nv-box-white nv-mt-40' :'close'">
       <div>รายการโอนเงิน</div>
       <div class="report">
          ไม่มีข้อมูล
       </div>
    </div>
    <NovelModal2 ID="WriterWithdrawMoney" IDCrad="WriterWithdrawMoneyCrad" ref="Modeal" :Close="true">
      <template v-slot:body>
        <div style="font-size:25px">ลงทะเบียนเรียบร้อย</div>
        เราได้รับคำขอของคุณเรียบร้อยแล้ว ทางเราจะใช้เวลาตรวจความถูกต้อง <br>ภายใน 3-4 วัน<br><br>
        <button class="nv-btn-yellow" style="width: 100%;" @click="$refs.Modeal.close()">ตกลง</button>
      </template>
    </NovelModal2>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Gatway} from '@/shares/services'
import { Validation } from "@/shares/modules/validation";
export default Vue.extend({
  data(){
    return{
     test:'' as any,
     Banking:[] as any,
     dataObj:{
       account_no:'',
       bank_type_id:'',
       first_name:'',
       last_name:'',
       user_id: (this as any).profile.id,
     },
     getdataWreter: null,
     form:false,
     fileAccount:'' as any
    }
  },
  components:{
     NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
  },
  async mounted(){
    this.getlist()
    this.getBanking()
    
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  methods:{
    previewFiles(e) {
      this.fileAccount = e.target.files[0]
    },
    autoTab(obj:any, fm:string){
        if(obj.key !=='Backspace'){
        var pattern=new String(fm); // กำหนดรูปแบบในนี้
        var pattern_ex=new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
        var returnText=new String("");
        var obj_l=obj.target.value.length;
        var obj_l2=obj_l-1;
        for(var i=0;i<pattern.length;i++){           
          if(obj_l2==i && pattern.charAt(i+1)==pattern_ex){
            returnText+=obj.target.value+pattern_ex;
             obj.target.value=returnText;
          }
        }
        if(obj_l>=pattern.length){
          obj.target.value=obj.target.value.substr(0,pattern.length -1 );           
        } 
        return  obj.target.value
        }
    },
    async getBanking(){
     let res = await Gatway.getService('/miscellaneous/fetch/bank_datas/bank_type_id')
     console.log(res.data.data);
     this.Banking =res.data.data
     
    },
    async submit(){
      let arrvalidate = ["first_name", "last_name", "file","account_no","bank_type_id"] as any;
      if (Validation(arrvalidate) === true) {
        let res = await Gatway.postService('/customers/bank-datas', this.dataObj as any) 
        if(res.data.code === 200){
          let formData = new FormData();
          formData.append('file',this.fileAccount as any)
          formData.append('novel_data_id',  res.data.data.id)
          await Gatway.postService("/upload/image/novel-data", formData as any);
          (this as any).$refs.Modeal.open()
          this.getlist()
        }
      }
      
      
    },
    async getlist(){
      let res = await Gatway.getService('/customers/bank-datas')
      console.log(res);
      res.data.data.length !== 0 
      ? this.form = true
      : this.form = false
      this.getdataWreter = res.data.data
      
    },
    async del(id){
      let res = await Gatway.DelService('/customers/bank-datas/'+ id)
      console.log(res.data.data);
      this.getlist()
    }
  }
})
</script>
<style lang="scss" scoped>
.b-mo{
  background: url(\https://fictionlog.co/a/images/bannerPatterns/cash_out.svg) left 50px / 600px repeat #ffd566c7;
  width: 100%;
  height: 80px;
  margin-top: -3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  
}
.report{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.Money{
  margin-top: 0px;
  border-radius: 0px 0px 10px 10px;
}
.con-from{
  display: grid;
  grid-template-columns: 1fr 1fr;
      align-items: start;
      gap: 70px 50px;
}
.col-2-grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}
// .list-bank{
//   display: flex;
//   justify-content: space-between;
//   padding: 10px;

// }
.close{
  display: none;

}

</style>