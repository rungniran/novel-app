<template>
  <div class="LoadingNovel">
    <div class="nv-box-white cover-novel nv-mt-40">
        <div class="box-nove">
           <div class="image-nv loading-img">
              <img
              :src="$path.svg('imgload.svg')"
              class="nv-img-novel"
              width="100%"
            />
           </div>
           <div class="detail">
              <div class="detail-on">
						    <div class="nv-title loading-img"></div>
                <div class="nv-title-star loading-img"></div>
                <div class="nv-title-catigary loading-img"></div><br>
                <div class="nv-title-dst loading-img"></div>
                <div class="nv-title-dst loading-img"></div>
                <div class="nv-title-dst loading-img"></div>
                <div class="nv-title-dst loading-img"></div>
                <div class="nv-title-dst loading-img"></div>
              </div>
              <div class="grud-btn"> 
                <div class="nv-btn loading-img"></div>
                <div class="nv-btn loading-img"></div>
                <div class="nv-btn loading-img"></div>
              </div>

           </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name:'LoadingNovel',
  
})
</script>
<style lang="scss" scoped>
.box-nove {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  grid-gap: 30px;
	/* background: linear-gradient(rgb(0,0,0), yellow); */
}
.image-nv{
  border-radius: 15px;
}
.nv-title{
  width: 50%;
  height: 35px;
  border-radius: 5px;
}
.nv-title-dst{
  width: 100%;
  height: 20px;
  border-radius: 5px;
}
.nv-title-star{
   width: 30%;
  height: 20px;
  border-radius: 5px;
}
.nv-title-catigary{
  width: 40%;
  height: 20px;
  border-radius: 5px;
}
.detail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.detail-on{
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  align-items: flex-start;
}
.nv-btn{
  width: 80px;
  height: 37px;
  border-radius: 5px;
}
.grud-btn{
  display: flex;
  grid-gap: 10px;
}
</style>