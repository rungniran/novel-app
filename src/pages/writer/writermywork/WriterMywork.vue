<template>
  <div id="Mywork">
    <Work :data="mywork" />
  </div>
</template>

<script  lang="ts">
import { ListService } from "@/shares/services";
import Vue from "vue";
export default Vue.extend({
  name: "Mywork",
  data() {
    return {
      mywork: null,
    };
  },
  components: {
    Work: () => import("@/components/myWork.vue"),
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