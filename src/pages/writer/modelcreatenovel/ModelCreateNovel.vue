<template>
  <div class="modalcreate-novel">
    <NovelModal classlist="create-novel" animation="create-novel-show">
      <template v-slot:body>
        <div class="box-create-novel">
          <router-link
             v-if="item[0]"
            :to="'/writer/createnovel/' + item[0].name + '/' +  item[0].id"
            class="create-item create-my"
            >นิยายแต่งเอง</router-link
          >
          <router-link
             v-if="item[1]"
            :to="'/writer/createnovel/' + item[1].name + '/' +  item[1].id"
            class="create-item create-tra"
            >นิยายแปล</router-link
          >
        </div>
      </template>
    </NovelModal>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from '../../../shares/services'
import { CreateNovel } from "@/shares/constants";
export default Vue.extend({
  name: "NodalCreateNovel",
  data() {
    return {
      current: "Mywork",
      type: CreateNovel,
      item: [] as any
    };
  },
  components: {
    NovelModal: () => import("@/components/widget/NovelModal.vue"),
  },
  methods:{
    novel_data_type_id(){
      // ListService.listNoveltype().then((res:any) =>{
      //   this.item = res.data.data
      //   console.log(res.data.data);
        
      // })
        Gatway.getService('/miscellaneous/fetch/novel_data/novel_data_type_id').then((res:any) =>{
        console.log(res.data.data);
        
        this.item = res.data.data
      })
    }
  },
  mounted(){
    this.novel_data_type_id()
    
  }
});
</script>
<style lang="scss" scoped>
.box-create-novel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
.create-item {
  padding: 20px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}
.create-my {
  border: 2px solid #f4ba40;
  background: #f4ba40;
  color: #ffffff;
}
.create-tra {
  border: 2px solid #e4803a;
  background: #fff3ea;
  color: #e4803a;
}
.create-item:hover {
  transform: scale(1.05);
}
.create-item:active {
  transform: scale(0.9);
  opacity: 0.5;
}

@media (max-width: 1024px){
	
}
@media (max-width: 768px){
	
}

@media (max-width: 415px){
.box-create-novel {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
}
.create-item{
	
    width: 270px !important;
}
}
</style>
