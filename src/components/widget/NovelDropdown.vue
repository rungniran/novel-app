<template>
  <div class="NovelDropdown">
    <!-- <input v-model="name" :id="idInput" disabled/>
    <div @click="open" class="open">
      {{filter}}
      <i class="fas fa-angle-down"></i>
    </div>
    <ul class="item" :id="id">
      <li v-for="item, index in data" :key="index" :class="'Dropdown-list t'+ index" @click="select(item.id, item.name)">{{item.name}}</li>
    </ul> v-model="value"-->
      <select  :id="id" v-model="value">	
          <option v-for="item,index in data" :key="index" :value="item.id">{{item.name}}</option>
      </select>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NovelDropdown",
  props:{
    data:[],
    id:String,
    value:String || null,
  },
  //  methods: {
  //   // `visible(value) => this.isVisible = value` could work too
  //   valuei() {
  //     this.valuedata = this.value
  //   },
  // },
  // mounted(){
  //   this.valuei()
  // }
 
});
</script>
<style lang="scss">
.NovelDropdown{
  position: relative;
}
.NovelDropdown ul{
  position: absolute;
  background: rgb(255, 252, 252);
  width: 100%;
  margin-top: 5px;
  z-index: 1000;
  display: none;
  background: #efefef;
  // padding: 0px 5px;
  border: 1px solid #cacaca;
  border-radius: 5px;
}
.NovelDropdown li{
  padding: 10px;
  border-top: 1px solid #cacaca;
  
}
.t0{
  border-top: 0px solid #cacaca !important;
}
.open{
      position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
}
.NovelDropdown .Dropdown-list:hover{
  background: #ffffff;
}
</style>
