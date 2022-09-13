<template>
  <NovelModal2 ID="Sticker" IDCrad="StickerCard" ref="Sticker" :Close="true">
    <template v-slot:body>
      <carousel :nav="false" :dots="false" :items="5">
        <div
          v-for="(item, index) in sticker"
          :key="index"
          class="title line-1"
          @click="filter(item)"
        >
          {{ item.name }}
        </div>
      </carousel>
    </template>
  </NovelModal2>
</template>
<script lang="ts">
import NovelModal2 from "@/components/widget/NovelModal2.vue";
import Vue from "vue";
import { Gatway } from "@/shares/services";
import carousel from "vue-owl-carousel";
export default Vue.extend({
  name: "Sticker",
  components: {
    NovelModal2,
    carousel,
  },
  data(){
    return{
      sticker:{} as any
    }
  },
  methods: {
    async openmodel(opj = {}) {
      console.log('>>>>>>>>>>',opj);
      
      // let res = await Gatway.getService("/customers/treasure-box-data/sticker");
      // console.log(res.data.data);
      this.sticker = await opj;
      await (this as any).$refs.Sticker.open();
      
    },
  },
});
</script>