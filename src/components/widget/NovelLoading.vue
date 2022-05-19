<template>
    <div id="loading">Loading...</div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "Loading",
});
</script>
<style lang="scss">
#loading {
    top: 0;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #fff;
    z-index: 40000;
}
</style>
