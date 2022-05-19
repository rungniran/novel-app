<template>
    <div class="reportproblem">
        <div class="nv-box-white nv-mt-40">
            <div class="report-title text-center">แจ้งปัญหา</div>
            <div class="text-center nv-mt-10"> 
                สวัสดีค่ะ คุณ <span v-if="profile">{{profile.username}}</span> <br>
                ยินดีต้อนรับสู่ฝ่ายสนับสนุนของ Novel Kingdom ค่ะ
            </div>
            <div class="nv-mt-30">
                <div class="textarea">
                  <textarea ></textarea>
                </div>
                <div class="nv-mt-30">
                <div class="nv-btn-orange btn-report  ">แจ้งปัญหา</div>
                </div>
            </div>
        </div>
            
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:"ReportProblem"
})
</script>

<style lang="scss" scoped>
.nv-box-white{
    max-width: 950px;
    position: relative;
    overflow: hidden;
}
.report-title{
    font-size: 28px;
    color: #515151;
    
}
.text-center{
    text-align: center;
}
.textarea{
    display: flex;
    flex-direction: column;
    width: 100%;
    
    
}
textarea{
    padding: 20px 50px;
    height: 220px;
    border: 1px solid #d3d3d3;
    border-radius: 10px;
    font-size: 19px;
    color:  #484848;
}
textarea:focus-visible{
   outline: none;
}
.btn-report{
    width: 120px;
    margin: auto;
    text-align: center;

 }

</style>