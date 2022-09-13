<template>
  <div class="writerinfo" >

   <!-- {{profile.profile_writer.status_approve}} -->
    <span v-if="$store.state.auth.dataset.profile_writer.status_approve !== null">
        <div class="box-status approve" v-if="$store.state.auth.dataset.profile_writer.status_approve === true">อนุมัติแล้ว <i class="fas fa-check-circle"></i></div>
        <div class="box-status notapprove" v-if="$store.state.auth.dataset.profile_writer.status_approve === false">ไม่อนุมัตินักเขียน <i class="fas fa-check-circle"></i></div>
    </span>
    <span v-else>
         <div class="box-status waapprove" v-if="!$store.state.auth.dataset.profile_writer.note">ยังไม่อนุมัติ <i class="fas fa-window-close"></i></div>
           <div class="box-status notapprove" v-else >
          <span>ไม่อนุมัตินักเขียน <i class="fas fa-check-circle"></i> </span>
        <span class="w-r"  @click="del()">แก้ไข</span>

        </div>
    </span>
    <br>
      <div class="from" v-if="Banking">
        <h1>ข้อมูลธนาคาร</h1>
        <div class="con-from">
            <div class="contor-input">
                <div class="from-title">ธนาคาร</div>
                 <input v-model="Banking.bank_type_preview" :disabled="true"/>
            </div>
            <div class="contor-input">
                <div class="from-title">หมายเลขบัญชี</div>
                <input v-model="Banking.account_no" :disabled="true"/>
            </div>
        </div>
        <div class="contor-input">
            <div class="from-title">ชื่อบัญชี</div>
            <input v-model="Banking.full_name_preview" :disabled="true"/>
        </div>
        <!-- <div class="contor-input">
            <div class="from-title">ชื่อสาขาบัญชี</div>
            <input />
        </div>
        <div class="contor-input">
            <div class="from-title">ประเภทบัญชี</div>
            <input />
        </div> -->
        <!-- <div class="col-2-grid">
            <div class="contor-input">
                <div class="from-title">หน้าสมุดบัญชี</div>
                <input type="file"/>
            </div>
            <div class="contor-input">
                <div class="from-title">บัตรประชาชน/เอกสารนิติบุคคล</div>
                <input type="file"/>
            </div>
            <small class="sub-key">'กรณีนักเขียนต้องการถอนเงินยอดขายออกจากระบบกรุณาใส่หลักฐานให้ครบ หากยังไม่ต้องการใส่สามารถเพิ่มได้ในภายหลัง'</small>
        </div> -->
         <h1>ข้อมูลนักเขียน</h1>
        <div class="contor-input">
            <div class="from-title">ชื่อนามสกุล/ชื่อนิติบุคคล *</div>
            <input v-model="namefull" :disabled="true"/>
        </div>
        <div class="contor-input">
            <div class="from-title">เลขประตัวประชาชน/เลขประจำตัวผู้เสียภาษี *</div>
            <input  v-model="address.id_card_number" :disabled="true"/>
        </div>
         <div class="contor-input">
            <div class="from-title">ที่อยู่ตามบัตรประชาชน</div>
            <textarea  v-model="address.current_address" :disabled="true" style="resize:none; height: 100px;"/>
        </div>
        <div class="contor-input">
            <div class="from-title">ที่อยู่ปัจจุบัน</div>
            <textarea  v-model="address.current_address" :disabled="true"  style="resize:none; height: 100px;"/>
        </div>
        <div class="contor-input">
            <div class="from-title">เบอร์โทรศัพท์</div>
            <input  v-model="address.phone_numble" :disabled="true"  />
        </div>
        <div class="contor-input">
            <div class="from-title">email support</div>
            <input  v-model="address.email_support" :disabled="true"/>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
export default Vue.extend({
  name: "writerinfo",
  data(){
    return{
      Banking:null,
      namefull:(this as any).profile.profile_writer.first_name + ' '+ (this as any).profile.profile_writer.last_name,
      address:JSON.parse((this as any).profile.json_address)
    }
  },
  methods:{
    async del(){
      this.$router.push('/writer/WriterWithdrawMoney')
      // let res = await Gatway.DelService("/customers/profile-data/"+ this.profile.profile_writer.id );
    },
    async getBanking(){
     let res = await Gatway.getService('/customers/bank-datas')
    //  console.log(res.data.data);
     this.Banking =res.data.data[0]
     
    },
  },
  mounted(){
    this.getBanking()
    // console.log((this as any).profile.profile_writer.status_approve);
    //  this.$store.commit('reset')
    
  }
});
</script>
<style lang="scss" scoped>
.col-2-grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1rf;
    grid-gap:3px 20px;
    grid-template-areas: 'null null' 'sub-key sub-key';
}
.sub-key{
    grid-area: sub-key;
    font-size: 12px;
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
        display: flex;
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
    justify-content: space-between;
}
.waapprove{
    color: #664d03;
    background-color: #fff3cd;
    border-color: #ffecb5;
}
.w-r{
    text-align: left;
}
</style>
