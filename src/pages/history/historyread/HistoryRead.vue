<template>
  <div class="HistoryBuy">
    <router-link
      v-for="(item, index) in 4"
      :key="index"
      to="/read/1"
      class="con-storyBuy"
    >
      <img
        class="img-history-read"
        src="https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/61d58aa01353ba001c779a4d/61dc081cUzBPUw7w.jpeg"
        width="100%"
      />
      <div class="detail-novel">
        <p class="name line-1">Nam sunt pariatur autem ut</p>
        <br />
        <p class="line-1 sub-title">บทที่ 1 กลายเป็นแม่ของวายร้าย</p>
        <div class="date-novel">
          <p>8 เม.ย. 2022</p>
          <p>12:04 น.</p>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
export default Vue.extend({
  methods: {
    async getHistoryRead() {
      let res = await Gatway.getService(
        "/customers/transaction-data/fetch-own-novel"
      );
      console.log(res);
    },
  },
  mounted() {
    // this.getHistoryRead()
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
  align-items: center;
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
  grid-template-columns: 1fr 1fr;
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
