<template>
  <div class="contai-modal" @click="onmouse == false ? close() : null" :id="ID">
    <div class="contai-modal-crad" :id="IDCrad">
      <slot name="body" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NovelModal2",
  data() {
    return {
      onmouse: false,
    };
  },
  props: {
    ID: {
      type: String,
      default: "ID",
    },
    IDCrad: {
      type: String,
      default: "IDCrad",
    },
  },
  methods: {
    close(): void {
      document.getElementById(this.$props.ID)?.classList.remove("show");
    },
    open(): void {
      let id = document.getElementById(this.$props.ID) as HTMLElement;
      id?.classList.add("show");
    },
  },
  mounted() {
    let elememt = document.getElementById(this.$props.IDCrad) as HTMLElement;
    elememt.onmouseover = (): void => {
      this.onmouse = true;
    };
    elememt.onmouseout = (): void => {
      this.onmouse = false;
    };
  },
});
</script>
<style lang="scss" scoped>
.contai-modal {
  top: 0;
  left: 0;
  z-index: 3000;
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000c4;
  opacity: 0;
  transition: 0.3s;
  pointer-events: none;
}

.show {
  opacity: 10;
  pointer-events: auto;
}
.contai-modal-crad {
  padding: 30px;
  background: #fff;
  border-radius: 10px;
}
</style>