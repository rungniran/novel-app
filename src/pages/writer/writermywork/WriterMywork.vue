<template>
<div>
  <div v-if="mywork">
    <div id="Mywork" >
      <Work :data="mywork" />
    </div>
    <div class="wbox" v-if="mywork.length===0">
      <EmptyContent pathName="2.png" text="คุณยังไม่มีผลงานนิยาย..." :isSearch=false ></EmptyContent>
    </div>
  </div>
  <div v-else>
    loading...
  </div>
 </div>
</template>

<script  lang="ts">
import { ListService } from "@/shares/services";
import Vue from "vue";
import  EmptyContent  from "../../empty/empty.vue"
export default Vue.extend({
  name: "Mywork",
  data() {
    return {
      mywork: null,
    };
  },
  components: {
    Work: () => import("@/components/myWork.vue"),
    EmptyContent
  },
  methods: {
    async listNovel() {
      let res = await ListService.listNovel();
      this.mywork = res.data.data;
    },
  },
  mounted() {
    this.listNovel();
  },
});
</script>
<style lang="scss" scoped>
  .wbox {
    margin-top: 30px;
  }
  @media (max-width: 415px) {
  .wbox {
    margin-top: 20px;
  }
}
</style>> 

