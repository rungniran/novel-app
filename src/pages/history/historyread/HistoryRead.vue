<template>
  <div class="HistoryBuy">
    <!-- <pre>{{dataitem}}</pre> -->
    <div v-if="dataitem">
      <router-link
        v-for="(item, index) in dataitem"
        :key="index"
        :to="item.novel_episode_datas[0]  ? '/read/' + item.novel_episode_datas[0].id :  '/novel/' +item.id"
        class="con-storyBuy"
      >
        <img
          class="img-history-read"
          :src="item.image_data? item.image_data.url:  $path.image('loading.png')"
          @error="$event.target.src = $path.image('loading.png')"
          alt
        />
         <div class="detail-novel">
          <p class="name line-1">{{ item.title }}</p>
          <br  class="pc"/>
          <p class="line-1 sub-title">
            <span v-if="item.novel_episode_datas[0]"> {{ item.novel_episode_datas[0]["name"] }} </span>
            <span v-else>นิยายตอนนี้ถูกลบไปแล้ว</span>
          </p>
          <div class="date-novel">
            <!-- {{item}} -->
            <p v-if="item.timestamp_update">{{ $filter.toThaiDateString(item.timestamp_update) }}</p>
          </div>
        </div>
       
      </router-link>
      <div v-if="dataitem.length === 0">
        <EmptyContent
          class="image"
          pathName="6.png"
          text="คุณยังไม่มีประวัติการอ่านนิยาย"
        ></EmptyContent>
      </div>
    </div>
    <div v-else>londing...</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import EmptyContent from "../../empty/empty.vue";

export default Vue.extend({
  data() {
    return {
      dataitem: null as any,
    };
  },
  components: {
    EmptyContent,
  },
  methods: {
    async getHistoryRead() {
      let res = await Gatway.postService(
        "/customers/remembers/novel-data",
        this.$store.state.storyread.story_Read as any
      );
      if (res.data.data.length === 0) {
        this.dataitem = res.data.data;
      } else {
        let data = [] as any;
        this.$store.state.storyread.story_Read.forEach((element: any) => {
          res.data.data.forEach((elementres: any) => {
            if (elementres) {
              if (elementres.id === element.id) {
                data.push({ ...elementres, datail: elementres, timestamp_update:element.timestamp_update });
              }
            }
          });
        });
        this.dataitem = data;
      }
    },
  },
  mounted() {
    this.getHistoryRead();
  },
});
</script>
<style lang="scss" scoped>
.img-history-read {
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

.HistoryBuy {
  width: 100%;
  height: 50%;
}

.sub-title {
  color: rgb(168, 166, 166);
}

.con-storyBuy {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
  border-radius: 12px;
  background-color: white;
}
.detail-novel {
  display: flex;
  justify-content: space-between;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}
.name {
  font-size: 25px;
}

p {
  font-size: 20px;
}

.buy-coin {
  display: flex;
  align-items: center;
  gap: 10px;
}



.date-novel {
  text-align: end;
  display: grid;
  // grid-template-columns: 1fr 1fr;
}
  .name {
    width: 200%;    
  }
    .img-history-read {
    height: auto;
    width: 15%;
    object-fit: cover;
    border-radius: 10px;

  }

@media (max-width: 1024px) {

}
@media (max-width: 768px) {
  .img-history-read {
    height: auto;
    width: 15%;
    object-fit: cover;
  }
  p {
    font-size: 17px;
  }
  .name {
  font-size: 20px;
}
}

@media (max-width: 520px) {
  
  .name {
    font-size: 17px;
    line-height: 1.6;
    width: 100%;
  }
      .img-history-read {
    height: auto;
    width: 26%;
    object-fit: cover;
  }
  .pc{
    display: none;
  }

  p {
    font-size: 15px;
    text-align: start;
  }
  .con-storyBuy {
 
  // gap: 30px;
 
}
  .detail-novel {
  display: grid;
  grid-template-columns: 1fr;
}
}
</style>
