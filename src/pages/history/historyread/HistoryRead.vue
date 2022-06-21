<template>
  <div class="HistoryBuy">
    <router-link
      v-for="(item, index) in dataitem"
      :key="index"
        :to="'/read/'+ item.id_ep"
      class="con-storyBuy"
    >
     <img
          class="img-history-read"
          :src="'https://119.59.97.111/storage/novel_image/'+ item.id+ '.png'"
          @error="$event.target.src= $path.image('loading.png');"
          alt
        />
      <div class="detail-novel">
        <p class="name line-1">{{item.detail.title}}</p>
        <br />
        <p class="line-1 sub-title">{{item.detail.novel_episode_datas.length !== 0 ? item.detail.novel_episode_datas[0]['name'] : null}} </p>
        <div class="date-novel">
          <p>{{item.detail.timestamp}} น.</p>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
export default Vue.extend({
  data(){
    return{
      dataitem:null
    }
  },
  methods: {
    async getHistoryRead() {
     let res = await Gatway.postService('/customers/remembers/novel-data', this.$store.state.storyread.story_Read as any)
      let data = [] as any
      this.$store.state.storyread.story_Read.forEach((element:any) => {
        res.data.data.forEach((elementres:any)=>{
          if(elementres.id === element.id){
            data.push({...element, detail:elementres})
          }
        })
      });
      console.log(data); 
      this.dataitem = data
    },
  },
  mounted() {
    this.getHistoryRead()
  },
});
</script>
<style lang="scss" scoped>
.HistoryBuy {
  width: 100%;
  height: 50%;
}

.sub-title{
  color: rgb(168, 166, 166);
}

.con-storyBuy {
  display: grid;
  grid-template-columns: 0.7fr 2fr;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 15px;
  border: 1px solid rgba(224, 175, 243, 0.977);
  border-radius: 12px;
  background-color: white;
}
.detail-novel {
  display: flex;
  justify-content: space-between;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.name {
  font-size: 25px;
}

p{
  font-size: 18px;
}

.buy-coin {
  display: flex;
  align-items: center;
  gap: 10px;
}

.img-history-read {
  height: auto;
  width: 50%;
  object-fit: cover;
  border-radius: 12px;
  margin: 15px;
}

.date-novel {
  text-align: center;
  display: grid;
  // grid-template-columns: 1fr 1fr;
}

@media (max-width: 1024px) {
  p{
    font-size: 20px;
  }
}
@media (max-width: 768px) {
  .img-history-read {
    height: auto;
    width: 60%;
    object-fit: cover;
  }
  p{
    font-size: 17px;
  }
}

@media (max-width: 415px) {
  .img-history-read {
    height: auto;
    width: 70%;
    object-fit: cover;
  }
  .name{
    font-size: 13px;
  }

  p{
    font-size: 11px;
  }
}
</style>
