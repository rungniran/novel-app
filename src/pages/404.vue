<template>
    <div class="found">
        <div class="Oop">Oop !</div>
      <div class="SD"><span class="found404"> 404 </span> | ขออภัย เราไม่พบหน้าที่คุณร้องขอ </div><br>
      <div class="back" @click="back">กลับหน้าเดิม</div>
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
    background: #d1b4ff;
    color: #fff;
    padding: 5px 20px;
    border-radius: 100px;
    cursor: pointer;

}
.back:hover{
    background: #ae7efc;
}
.SD{
    font-size: 24px;
}
.Oop{
    font-size: 40px;
    color: #be97fd;
    font-weight: 600;
}
// .found404{
//     font-size: 25px;
// }

</style>