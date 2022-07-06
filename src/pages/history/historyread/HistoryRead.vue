<template>
  <div class="HistoryBuy">
    <div v-if="dataitem">
      <router-link
        v-for="(item, index) in dataitem"
        :key="index"
        :to="'/read/' + item.novel_episode_datas[0]['id']"
        class="con-storyBuy"
      >
        <img
          class="img-history-read"
          :src="'https://119.59.97.111/storage/novel_image/' + item.id + '.png'"
          @error="$event.target.src = $path.image('loading.png')"
          alt
        />
        <div class="detail-novel">
          <p class="name line-1">{{ item.detail.title }}</p>
          <br />
          <p class="line-1 sub-title">
            {{ item.novel_episode_datas[0]["name"] }}
          </p>
          <div class="date-novel">
            <p>{{ item.timestamp }} น.</p>
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
      console.log(res);
      if (res.data.data.length === 0) {
        this.dataitem = res.data.data;
      } else {
        let data = [] as any;
        this.$store.state.storyread.story_Read.forEach((element: any) => {
          res.data.data.forEach((elementres: any) => {
            if (elementres) {
              if (elementres.id === element.id) {
                data.push({ ...elementres, datail: elementres });
              }
            }
          });
        });
        console.log(data);
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
.HistoryBuy {
  width: 100%;
  height: 50%;
}

.sub-title {
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

p {
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
  p {
    font-size: 20px;
  }
}
@media (max-width: 768px) {
  .img-history-read {
    height: auto;
    width: 60%;
    object-fit: cover;
  }
  p {
    font-size: 17px;
  }
}

@media (max-width: 415px) {
  .img-history-read {
    height: auto;
    width: 70%;
    object-fit: cover;
  }
  .name {
    font-size: 13px;
  }

  p {
    font-size: 11px;
  }
}
</style>
