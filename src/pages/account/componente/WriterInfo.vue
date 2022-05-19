<template>
  <div class="writerinfo">
      <div class="from">
        <div class="contor-input">
            <div class="from-title">ธนาคาร</div>
            <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
        </div>
        <div class="contor-input">
            <div class="from-title">หมายเลขบัญชี</div>
            <input />
        </div>
        <div class="contor-input">
            <div class="from-title">ชื่อบัญชี</div>
            <input />
        </div>
        <div class="contor-input">
            <div class="from-title">ชื่อสาขาบัญชี</div>
            <input />
        </div>
        <div class="contor-input">
            <div class="from-title">ประเภทบัญชี</div>
            <input />
        </div>
        <div class="col-2-grid">
            <div class="contor-input">
                <div class="from-title">หน้าสมุดบัญชี</div>
                <input type="file"/>
            </div>
            <div class="contor-input">
                <div class="from-title">บัตรประชาชน/เอกสารนิติบุคคล</div>
                <input type="file"/>
            </div>
            <small class="sub-key">'กรณีนักเขียนต้องการถอนเงินยอดขายออกจากระบบกรุณาใส่หลักฐานให้ครบ หากยังไม่ต้องการใส่สามารถเพิ่มได้ในภายหลัง'</small>
        </div>
        
        <div class="contor-input">
            <div class="from-title">ชื่อนามสกุล/ชื่อนิติบุคคล *</div>
            <input />
        </div>
        <div class="contor-input">
            <div class="from-title">เลขประตัวประชาชน/เลขประจำตัวผู้เสียภาษี *</div>
            <input />
        </div>
        <div class="contor-input">
            <div class="from-title">ที่อยู่ *</div>
            <input />
        </div>
        <div class="contor-input">
            <div class="from-title">เบอร์โทรศัพท์</div>
            <input />
        </div>

      </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "writerinfo",
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
</style>
