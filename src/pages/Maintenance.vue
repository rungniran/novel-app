<template>
<div class="maintenance">  
   <!-- <div class="sdsd"> ขออภัยครับ ระบบกำลังปิดปรับปรุง  </div> -->
   <img :src="$path.gif('5865F8EB-A25A-47EA-A156-465673B27AE6_AdobeExpress.gif')" class="ccx">
   
</div>
</template>
    <script lang="ts">
    import Vue from 'vue'
   export default Vue.extend({
    name:"Maintenance",
   


})
</script>
<style lang="scss" scoped>
    .maintenance{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    flex-direction: column;
    width: 100%;
    background: #fff9f9;
        
    }
    .sdsd{
          font-family: "Sarabun", sans-serif;
        font-size: 30px;

    }
</style>