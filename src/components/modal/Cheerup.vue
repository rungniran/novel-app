<template>
    <div class="CheerUp">
        <NovelModal classlist="modal-xl" animation="modal-animation">
            <template v-slot:body>
                <div class="close" @click="$base.closemodal('modal-xl', 'modal-animation', 0)"><i class="fas fa-times-circle"></i></div>
                <div class="title">ส่งกำลังใจ</div>
                <div class="con-cheerup nv-mt-20">
                    <div v-for="item, index in cheerup" :key="index" class="box-cheerup">
                        <!-- {{item.icon}} -->
                        <img :src="$path.cheerup(item.icon)" height="75px">
                        <div class="name">{{item.label}}</div>
                        <div class="sell-cheerup">
                            <img :src="$path.image('coin-gold.png')" width="20%">
                            10
                        </div>
                    </div>
                </div>
            </template>
        </NovelModal>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import  { Cheerup }  from '@/shares/constants'
export default Vue.extend({
 name:"CheerUp",
 data() {
     return {
         cheerup:Cheerup
     };
 },
 components:{
    NovelModal:()=> import('@/components/widget/NovelModal.vue')
 }
})
</script>
<style lang="scss" scoped>
.title{
    text-align: center;
    font-size: 20px;

}
.con-cheerup{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    height: 94%;
    padding: 0px 20px;
    overflow: scroll;
}
.box-cheerup{
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #cfd4d966;
    border-radius: 6px;
    grid-gap: 5px;
}
.sell-cheerup{
    display: flex;
    align-items: center;
    grid-gap: 5px;
    width: 80px;
    padding: 0px 7px;
    background: #61BCBE;
    justify-content: center;
    color: rgb(233, 233, 233);
    border-radius: 4px;
    cursor: pointer;
}
.close{
    position: fixed;
    right: 5px;
    top: 0px;
    font-size: 20px;
    cursor: pointer;
}
.name{
  font-size: 15px;
  text-align: center;
}
@media (max-width: 1024px){
	
}
@media (max-width: 768px){

}

@media (max-width: 415px){
.con-cheerup{
  
    grid-template-columns: 1fr 1fr ;

}
}
</style>
