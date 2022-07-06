<template>
  <div id="Work">
    <div v-if="data" class="con-mywork">
      <router-link :to="'/writer/novelpreview/'+ item.id" v-for=" item, index in data" :key="index">
        <div class="image loading-img">
                <img
                  :src=" item.image_data ? item.image_data.url : $path.image('loading.png')"
                  alt="novel"
                  class="img-pre"
                  width="100%"
                  onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
                >
                <div  class="type-novel">เผยแพร่</div>
          </div>
           <div class="detail">
                <div class="container-detail">
                  <div class="name-novel line-1">{{item.title}}</div>
                  <!-- <small>{{item.novel_category_data_id}}</small> -->
                </div>
            </div>
      </router-link>
   
    </div>
         <div v-else class=" notdata">
        <EmptyContent
          class="image"
          pathName="1.png"
          text="นักเขียนยังไม่มีนิยาย"
          fontSize="36px"
        ></EmptyContent>
    </div>
      
  
    
  </div>
  
</template>

<script  lang="ts">
import Vue from 'vue'
import EmptyContent from "../pages/empty/empty.vue";
export default Vue.extend({
    name:"Work",
    data(){
      return{
        dataloang: [...Array(5).keys()]
      }
    },
    props:{
      data:[] as any 
    },
  components: {
    EmptyContent,
  }
})
</script>

<style lang="scss" scoped>
    .con-mywork{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 30px;
    }
    .image {
  position: relative;
  // height: 300px;
  // width: 200px;
  // background: #febc2a;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
.type-novel {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 30px;
  background: radial-gradient(circle, rgba(11,173,16,1) 0%, rgba(172,195,34,1) 98%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.type-novel:hover{
  background: radial-gradient(circle, rgba(172,195,34,1) 0%, rgba(11,173,16,1) 98%);
  transition: all 0.5s ease-out;
}
.img-pre {

}
.container-detail {
  margin: 10px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.notdata {
  margin-top: 20px;
}
.name-novel{
  text-align: center;
}
@media (max-width: 1024px){
	
}
@media (max-width: 768px){
	.con-mywork{
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}

@media (max-width: 415px){
	.con-mywork{
      grid-template-columns: 1fr 1fr ;
    }
}
</style>
