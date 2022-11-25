<template>
  <div class="modalcreate-novel">
    <NovelModal2 ID="createNovel" IDCrad="createNovelCrad" ref="createNovel" :Close="true">
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
    </NovelModal2>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from '../../../shares/services'
import { CreateNovel } from "@/shares/constants";
import NovelModal2 from "@/components/widget/NovelModal2.vue";
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
    // NovelModal: () => import("@/components/widget/NovelModal.vue"),
    NovelModal2
  },
  methods:{
    novel_data_type_id(){
        Gatway.getService('/miscellaneous/fetch/novel_data/novel_data_type_id').then((res:any) =>{
        this.item = res.data.data
      })
    },
    open(){
      (this as any).$refs.createNovel.open()
    },
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

@media (max-width: 450px){
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
