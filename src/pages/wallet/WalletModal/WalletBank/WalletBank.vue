<template>
  <NovelModal classlist="bank-modal"  animation="bank-show">
    <template v-slot:body>
      <div>
        sdsd
      </div>
    </template>
  </NovelModal>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name:'',
  components:{
    NovelModal:()=> import('@/components/widget/NovelModal.vue'),
  }
})
</script>
<style lang="scss" scoped>
  
</style>