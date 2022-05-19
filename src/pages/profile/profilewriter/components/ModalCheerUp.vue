<template>
  <div class="ModalCheerUp">
    <CheerUp />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ModalCheerUp",
  components: {
    CheerUp: () => import("@/components/modal/Cheerup.vue"),
  },
});
</script>
