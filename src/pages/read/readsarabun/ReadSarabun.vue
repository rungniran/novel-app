<template>
  <div class="Sarabun">
    <div class="in-sarabun">
      <div v-if="data">
      
        <div
        
          v-for="(item, index) in data"
          :key="index"
          class="box-sarabun"
          :id="'box' + item.id"
          @click="$emit('sarabun-buy', item)"
          :style="status_hide(item).style"
        >
        <!-- {{status_hide(item)}} -->
          <div class="line-1 font-content">
            
              #{{ item.ep_no }} {{ item.name }}  <font-awesome-icon v-if="status_hide(item).view" icon="fa-regular fa-eye-slash" />
          </div>
          <div v-if="item.coin !== '0.00'">
            <div v-if="item.bought === false" class="buy-coin">
              <img :src="$path.image('coin-gold.png')" height="20px" />
              <div>{{ item.coin }}</div>
            </div>
            <div v-else class="buy-coin" style="color: gray">
              <img :src="$path.image('coin-gray.png')" height="20px" />
              <div>{{ item.coin }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading-sarabun">
        <div
          class=" "
          style="display: flex; justify-content: center; align-items: center"
        >
          <svg
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 50 50"
            style="enable-background: new 0 0 50 50"
            xml:space="preserve"
          >
            <path
              d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
          กำลังโหลดสารบัญ...
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";

export default Vue.extend({
  name:'ReadSarabun',
  data() {
    return {
      data: null
    };
  },
  props: {
    uuid: String,
  },
  methods: {
    status_hide(item:any){
    if(  item.status_hide_ep){
      return !item.bought 
      ? {
        style:'opacity: 0.2;',
        status: true,
        view: true
        }  
      : {
        style:'opacity: 0.2;',
        status: false,
        view: true
        }  
    } else{
      return {
        style:'',
        status: false,
        view: false
        }

    }
    
  },
    async getSarabun() {
      console.log();
      
      setTimeout(async() => {
        
      
      // const url = (await (this as any).cleck) === "true" ? "/novel/novel-data" : "/guest/novel/novel-data";
      //   {{$store.state.Novel._NovelEp}}
      const res = await this.$store.getters._GetNovelEpSet(this.uuid)

      this.data = await res
      const sarabun = await document.getElementsByClassName("Sarabun")[0] as HTMLElement;
      const box = await document.getElementById("box" + this.$route.params.slug) as HTMLElement;
      await box.classList.add('Sarabun-activate')
      await sarabun.scrollTo({ top: box.offsetTop - 10});
      }, 100);
    },
    async toggle(){
      this.data = await null
      const sarabun =  document.getElementsByClassName("Sarabun")[0] as HTMLElement;
      if(sarabun.classList[1] === undefined){
        sarabun.classList.add('Sarabun-show')
        await this.getSarabun()  
      }else{
        sarabun.classList.remove('Sarabun-show')
      }
       
    },
    closesarabun(){
      const sarabun = ( document.getElementsByClassName(
        "Sarabun"
      )[0]) as HTMLElement;
      sarabun.classList.remove('Sarabun-show')
      // this.cleck = true
    },
    sdsd(item: any) {
      this.$emit("sarabun-buy", item);
    },
  },
  mounted() {
     document.addEventListener('click', (event:any)=>{
        if (!event.target.matches('.contai-sarabun')) {
        var dropdowns = document.getElementsByClassName("Sarabun");
        var i = 0;
        for (i ; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('Sarabun-show')) {
            openDropdown.classList.remove('Sarabun-show');
          }
        }
      }
    })
  },
});
</script>
<style lang="scss" scoped>
.loading-sarabun {
  color: black;
}
.Sarabun {
  position: absolute;
  margin-top: 44px;
  // display: none;
  // box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  // display: none;
  // border: 1px solid #e7e7e7;
  width: 300px;
  background: rgb(255, 255, 255);
  left: -45px;
  border-radius: 7px;
  overflow: auto;
  padding: 10px 0px;
  opacity: 0;
  transition: 0.3s;
  pointer-events: none;
}
.Sarabun-show{
  opacity: 10;
  pointer-events: auto;
}
.Sarabun-activate{
 background: #fdf8e1;
}
.buy-coin {
  display: flex;
  grid-gap: 4px;
  color: #efcf3a;
  width: 60px;
  justify-content: space-between;
  align-items: center;
}
.in-sarabun {
  height: 350px;
    //   display: flex;
    // align-items: center;
    // justify-content: center;
}

.box-sarabun {
  display: flex;
  justify-content: space-between;
  color: #000;
  // background: rgb(241, 241, 241);
  padding: 15px 10px;
  border-radius: 5px;
  // margin: 5px 10px;
  align-items: center;
}
.box-sarabun:hover {
  background: #e4e4e4;
}
.Sarabun-show {
  display: block;
}
.con-buy-coin {
  width: 70px;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #96969600;
}

::-webkit-scrollbar-thumb {
  background: #bfbfbf7d;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8484849e;
}

@media (max-width: 415px) {
  .Sarabun {
    width: 230px;
  }
  .in-sarabun {
    height: 250px;
  }
  .font-content {
    font-size: 13px;
  }
}
</style>
