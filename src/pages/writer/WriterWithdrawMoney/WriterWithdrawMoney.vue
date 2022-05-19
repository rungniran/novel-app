<template>
  <div>
    <div class="b-mo">
      ถอนเงิน
    </div>
    <div class="nv-box-white nv-mt-40 Money">
        <div>
          ยอดเงินที่ถอนได้
          {{ $filter.NumberToString(this.$store.state.auth.dataset.coin_balance )}} บาท
        </div>
        <div>
          <button class="nv-btn-yellow" @click="$refs.Modeal.open();" :disabled="true">ถอนเงิน</button>
        </div>
    </div>
    <div class="nv-box-white nv-mt-40">
       <div class="con-from">
        <div class="contor-input">
            1. เพิ่มบัญชีธนาคาร
            <small>ยอดเงินของคุณจะถูกโอนเข้าไปในบัญชีที่ลงทะเบียนไว้โดยอัตโนมัติ ซึ่งคุณสามารถเปลี่ยนแปลงบัญชีที่ใช้ได้ตลอดเวลา</small>
        </div>
        <div class="from">
          <div class="contor-input">
            <div class="from-title">ชื่อ-นามสกุล (ต้องตรงกับหน้าสมุดบัญชีเท่านั้น)</div>
            <input type="text" placeholder="ชื่อ-นามสกุล" />
          </div>
          <div class="col-2-grid">
            <div class="contor-input">
              <div class="from-title">เลขบัญชี</div>
              <input type="text" placeholder="xxx-x-xxxxx-x-xx"  @keydown="autoTab($event, 'xxx-x-xxxxx-x-xx')"/>
            </div>
            <div class="contor-input">
              <div class="from-title">ธนาคาร</div>
              <select name="cars" id="cars">
                  <option value="volvo">กรุงเทพ</option>
                  <option value="saab">กรุงไทย</option>
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
            <div class="from-title">อัปโหลดไฟล์ JPG,JPEG,PNG ขนาดไม่เกิน 2MB</div>
            <input type="file" style=""/>
          </div>
          <div class="contor-input">
            <div class="from-title">เลขประจำตัวประชาชน</div>
            <input type="text" placeholder="x-xxxx-xxxxx-xx-x"  @keydown="autoTab($event, 'x-xxxx-xxxxx-xx-x')"/>
          </div>
          <div class="contor-input">
            <div class="from-title">ที่อยู่ตามบัตรประชาชน</div>
            <input type="text" />
          </div>
        </div>
           <div class="contor-input">
              3. เพิ่มที่อยู่ปัจจุบัน หรือ ที่สามารถติดต่อได้
              <small>คุณสามารถดาวน์โหลด สำเนาเอกสารหักภาษี ณ ที่จ่ายได้ทันที หากต้องการฉบับจริงโปรดติดต่อมาที่ account@fictionlog.co</small>
           </div>
           <div class="from">
              <div class="contor-input">
                <div class="from-title">เพิ่มที่อยู่ปัจจุบัน</div>
                <input type="text" />
              </div>
              <div class="contor-input">
                <div class="from-title">เบอร์โทรศัพท์</div>
                <input type="text" placeholder="xxx-xxxx-xxxx" v-model="test" @keydown="autoTab($event, 'xxx-xxxx-xxxx')"/>
              </div>
              <div><button class="nv-btn-yellow">ลงทะเบียน</button></div>
              
           </div>
      </div>
    </div>
    <NovelModal2 ID="WriterWithdrawMoney" ref="Modeal">
      <template v-slot:body>
        ท่านต้องเพิ่มข้อมูลนักเขียนก่อน
      </template>
    </NovelModal2>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Gatway} from '@/shares/services'
export default Vue.extend({
  data(){
    return{
     test:'' as any
    }
  },
  components:{
     NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
  },
  async mounted(){
    const ress = await Gatway.getService('/customers/profile-data/index/'+(this as any).profile.id)
    console.log(ress);
    
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  methods:{
    autoTab(obj, fm){
        if(obj.key !=='Backspace'){
        console.log(obj.key);  
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
    }
  }
})
</script>
<style lang="scss" scoped>
.b-mo{
  background: url(\https://fictionlog.co/a/images/bannerPatterns/cash_out.svg) left 50px / 600px repeat #ffd566c7;
  width: 100%;
  height: 80px;
  margin-top: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  
}
.Money{
  margin-top: 0px;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
</style>