<template>
    <div class="found">
     <H1 class="SD"> ท่านไม่มีสิทธิเข้าถึงหน้านี้ ต้อง Login ก่อนครับ </H1><br>
      <div class="back" @click="$login.openlogin()">Login</div>
      <!-- <img :src="$path.image('404.png')" class="found404"> -->
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods:{
        back(){
            window.history.back()
        }
    }
})
</script>

<style lang="scss" scoped>
.found{
   width: 100%;
   height: 80vh;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   grid-gap: 10px;
}
.back{
    // background: #d1b4ff;
    border: 2px solid #a96ff9;
    color: #a96ff9;
     background: #ffffff;
    padding: 5px 20px;
    border-radius:7px;
    cursor: pointer;

}
.back:hover{
    background: #b1cbff00;
}
.SD{
    font-size: 24px;
    color: #a96ff9;
    text-align: center;
    padding: 0px 10px;
}
.Oop{
    font-size: 40px;
    color: #be97fd;
    font-weight: 600;
}
.found404{
    max-width: 400px;
}


</style>