<template>
  <div class="Sarabun">
    <div class="in-sarabun">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="box-sarabun"
        :id="'box' + item.id"
        @click="$emit('sarabun-buy', item)"
      >
        <div class="line-1">#{{ item.ep_no }} {{ item.name }}</div>
        <div v-if="item.coin !== '0.00'">
          <div v-if="item.bought === false" class="buy-coin">
            <img :src="$path.image('coin-gold.png')" height="20px" />
            <div>{{ item.coin }}</div>
          </div>
          <div v-else class="buy-coin" style="color: gray">
            <img :src="$path.image('coin-gray.png')" height="20px" />
            <div>{{ item.coin }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
export default Vue.extend({
  data() {
    return {
      data: this.$store.state.sarabun.sarabun
        ? this.$store.state.sarabun.sarabun
        : null,
    };
  },
  props: {
    uuid: String,
  },
  methods: {
    async getSarabun() {
      const resGetNovel = await Gatway.getIDService(
        (this as any).cleck === "true"
          ? "/novel/novel-data"
          : "/guest/novel/novel-data",
        this.uuid
      );
      this.data = await resGetNovel.data.data.novel_episode_datas;
      const sarabun = (await document.getElementsByClassName(
        "Sarabun"
      )[0]) as HTMLElement;
      const box = (await document.getElementById(
        "box" + this.$route.params.slug
      )) as HTMLElement;
      box.style.background = "#fdf8e1";
      sarabun.scrollTo({ top: box.offsetTop - 10, behavior: "smooth" });
      // sarabun.scrollTo(0,  box.offsetTop -10);
    },
    sdsd(item: any) {
      this.$emit("sarabun-buy", item);
    },
  },
  async mounted() {
    this.getSarabun();
  },
});
</script>
<style lang="scss" scoped>
.Sarabun {
  position: absolute;
  margin-top: 44px;
  // display: none;
  // box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  // display: none;
  border: 1px solid #e7e7e7;
  width: 300px;
  background: rgb(255, 255, 255);
  left: -45px;
  border-radius: 7px;
  overflow: auto;
  padding: 10px 0px;
}
.buy-coin {
  display: flex;
  grid-gap: 4px;
  color: #efcf3a;
  width: 60px;
  justify-content: space-between;
  align-items: center;
}
.in-sarabun {
  height: 350px;
}
.box-sarabun {
  display: flex;
  justify-content: space-between;
  color: #000;
  // background: rgb(241, 241, 241);
  padding: 15px 10px;
  border-radius: 5px;
  // margin: 5px 10px;
}
.Sarabun-show {
  display: block;
}
.con-buy-coin {
  width: 70px;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #96969600;
}

::-webkit-scrollbar-thumb {
  background: #bfbfbf7d;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8484849e;
}

@media (max-width: 415px) {
  .Sarabun {
    width: 230px;
  }
  .in-sarabun {
  height: 250px;
}
}
</style>
