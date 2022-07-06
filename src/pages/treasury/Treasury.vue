<template>
  <div>
    <div class="nv-box-white nv-mt-40">
      <!-- <cover /> -->
      <!-- <div class="btn-c">ภารกิจประจำวัน!</div> -->
      <div class="" v-if="treasury.length !== 0" >
        <!-- <pre>{{JSON.parse(treasury[0].system_note)}}</pre> -->
        <div class="title">คลังสมบัติ</div>
        <div class="con-tsry nv-mt-10">
          <div v-for="(item, index) in treasury" :key="index" class="box-tsry">
            <!-- {{item}} -->
            <div class="title-tsry">
              <pre>  {{ item.name }}</pre>
            </div>
            <img
              src="https://novelkingdom.co/images/dragon/dragon-level-3.png"
              width="90%"
            />
            <div class="cover"></div>
          </div>
        </div>
      </div>
      <div v-else>
        <EmptyContent
          class="image"
          pathName="7.png"
          text="คลังสมบัติของคุณว่างเปล่า"
          fontSize="36px"
        ></EmptyContent>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Gatway } from "@/shares/services";
import Vue from "vue";
import EmptyContent from "../empty/empty.vue";
export default Vue.extend({
  name: "treasury",
  data() {
    return {
      treasury: [...Array(10).keys()],
    };
  },
  components: {
    EmptyContent,
    // cover: () => import("@/components/Cover.vue"),
  },
  methods: {
    async get() {
      let res = await Gatway.getService("/customers/treasure-box-data/index");
      let data = [] as any;
      res.data.data.filter((item: any) => {
        console.log(JSON.parse(item.system_note));

        data.push(JSON.parse(item.system_note));
      });
      this.treasury = data;
    },
  },
  mounted() {
    this.get();
  },
});
</script>
<style lang="scss" scoped>
.nv-box-white {
  position: relative;
  overflow: hidden;
}
.title {
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
}
.con-tsry {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 25px 30px;
}
.box-tsry {
  display: flex;
  justify-content: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 60px 0px;
  position: relative;
  // overflow: hidden;
  border-radius: 10px;
}
.title-tsry {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0px;
  height: 35px;
  background: #01070780;
  color: #fff;
  left: 0px;
  z-index: 200px;
  border-radius: 12px 12px 0px 0px;
}

.cover {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: #07070780;
  z-index: 100px;
  border-radius: 12px;
}
img {
  opacity: 0.2;
}
// .image{
//   width: 120% !important;
// }
.btn-c {
  background: #ee7809;
  box-shadow: #eeb909e1 0px 10px 36px 0px, #ee7809 0px 0px 0px 1px;
  width: 150px;
  padding: 5px 10px;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
@media (max-width: 1024px) {
  .con-tsry {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .con-tsry {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 415px) {
  .con-tsry {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
