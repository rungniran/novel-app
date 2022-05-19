
<template>
  <div class="nv-tp-40">
    <button class="button" @click="logingoogle()"> Login with Facebook</button>
  </div>
</template>
<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default {
  name:"facebookLogin",
  methods: {
    async logingoogle() {
     let g = await this.$gAuth.signIn()
     console.log(g);
    }

  }
};
</script>
<style>
.button{
  color:white;
  min-width: 150px;
  background-color: #000000a1;
  height: 2.5rem;
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
}
</style>