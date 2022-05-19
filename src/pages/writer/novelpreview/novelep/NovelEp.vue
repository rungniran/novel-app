<template>
  <div class="NovelEP">
    <div class="nv-box-white nv-mt-40">
      <div  class="from">
        <div class="contor-input">
          <div class="title" >ชื่อตอน <span class="is-valid">*</span></div>
          <input  v-model="data.name" id="TitleEp" required />
          <small :class="data.name.length > 100 ?'texterr' :  'title-v'">{{data.name.length}} / 100</small>
        </div>
        <div class="col-2">
          <div class="contor-input">
            <div class="title">วันที่เผยแพร่ <span class="is-valid">*</span></div>
            <input type="datetime-local" v-model="data.publisher_episode_data.date_time"  id="DateTime" required />
          </div>
          <div class="contor-input">
            <div class="title">สำหรับขาย</div>
          <select v-model="clecksell" >	
              <option value="1" >ฟรี</option>
              <option value="2">ขาย</option>
            </select>
          </div>
        </div>
        <div class="col-2" v-if="clecksell == 2">
          <div class="contor-input">
            <div class="title">ราคา <span class="is-valid">*</span></div>
            <!-- <input type="number" v-model="data.coin"   @change="setTwoNumberDecimal" id="Coin" required /> -->
            <input type="number"  v-model="data.coin" @change="$filter.setTwoNumberDecimal" min="0" max="10" step="0.5" value="0.0" id="Coin"/>
          </div>
        </div>
        <div class="contor-input">
          <div class="title">เนื้อเรื่อง <span class="is-valid">*</span></div>
          <NovelEditor @Editor="func_Editor" :valueWay="this.data.detail" height="30"/>
        </div>
        <div>
          <button class="nv-btn-orange" @click="!idEp ? submit() : updata()">ยืนยัน</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Gatway } from '@/shares/services'
import { alert } from '@/shares/modules/alert'
import { Validation } from '@/shares/modules/validation'
import {  datatime } from '@/shares/modules/datatime'

// interface typeEp {
//   novel_data_id:string;
//   name:string;
//   coin:number;
//   publisher_episode_data : {
//     date_time:string ;
//   } ;
// }

export default Vue.extend({
  name:"NovelEP",
  components:{
    NovelEditor: () => import("@/components/widget/NovelEditor.vue"),
  },
  data(){
    return{
      clecksell:'1',
      idEp: this.$route.params.idEP,
      data: {
        novel_data_id:"",
        name:"",
        coin: 0.0,
        detail:"",
        publisher_episode_data : {
          date_time: datatime(new Date()) ,
        } ,
      } 
    }
  },
  methods:{
    async submit(){
      this.data.novel_data_id = this.$route.params.id
      const arrvalidate = ["TitleEp", "DateTime"];
      if( Validation(arrvalidate as any) === true){
        let res = await Gatway.postService("/customers/episode_data", this.data as any)
        if(res.data.status === true){
          alert(res.data.data, "success")
          history.back()
        }else{
          var result = Object.keys(res.data.data).map((key) => res.data.data[key])
          for(let i= 0; i < result.length; i++){
            alert(result[i], "error")
          }
        }
      }
      
    },
    func_Editor(value:any){
      this.data.detail = value;
		},
    async getEp(){
      let res = await Gatway.getIDService("/customers/episode_data", this.idEp )
      console.log(res);
      this.data.novel_data_id = res.data.data.novel_data_id
      this.data.name = res.data.data.name
      this.data.detail = res.data.data.detail
      this.data.coin = res.data.data.coin
    },
    async updata(){
      this.data.novel_data_id = this.$route.params.id
      this.data = {...this.data, id:this.idEp } as any
      let res = await Gatway.PutService("/customers/episode_data", this.idEp , this.data as any) 
      if(res){
        alert(res.data.data, "success")
      }
    },
  },
  mounted(){
    console.log(datatime(new Date()));
    this.idEp ? this.getEp() : null
  }
  
})
</script>
<style lang="scss" scoped>
.nv-box-white {
    position: relative;
    overflow: hidden;
}
.title {
    margin-left: 3px;
    color: #444349;
    font-size: 13px;
}
.title-v{
  color: #8a8a8a;
    font-size: 13px;
}
.texterr{
  color: red;
}
</style>