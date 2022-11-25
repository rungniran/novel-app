<template>
    <!-- <pre> {{ opject }}</pre> display: flex; justify-content: center; -->
  <div class="NovelCarousel   margin" style="">
 <router-link
          v-for="(items, index) in opject"
          :key="index"
          :to="'/novel/' + items.id"
          class="nv-box-carousel carousel sd"
        >
          <div class="box-mywork card">
            <img
           
              class="item-banner  psdp"
              :src="
                items.image_data
                  ? items.image_data.url
                  : $path.image('loading.png')
              "
              onerror="this.onerror=null;this.src='https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png';"
              :alt="items.title"
            />
   
            
          </div>

          <div class="grod-detail">
            <div class="name line-1">{{ items.title }}</div>
            <div class="subname">{{ items.novel_category_data_preview }}</div>
            <div>
              <NovelStar
                v-if="star === true"
                :rating="Math.round(items.avg_star)"
              />
            </div>
            <div class="view-list">
              <div class="view">
                <i class="far fa-eye"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(items.ep_total_view) }}
                </div>
              </div>
              <div class="list">
                <i class="fas fa-list"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(items.ep_count) }}
                </div>
              </div>
            </div>
          </div>
        </router-link>
        
    <!-- <carousel
      :items="2"
      :loop="false"
      :margin="10"
      :center="false"
      :lazyLoad="false"
      :autoWidth="false"
      :autoplay="false"
      :singleItem="false"
      :nav="true"
      class="NovelCarousel"
      :dots="false"
      :responsive="responsive"
      :navText="sdds"
    >
      <template>

        <router-link
          v-for="(items, index) in opject"
          :key="index"
          :to="'/novel/' + items.id"
          class="nv-box-carousel carousel"
        >
          <div class="box-mywork">
            <img
              class="item-banner  psdp"
              :src="
                items.image_data
                  ? items.image_data.url
                  : $path.image('loading.png')
              "
              onerror="this.onerror=null;this.src='https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png';"
              :alt="items.title"
            />
   
            
          </div>

          <div class="grod-detail">
            <div class="name line-1">{{ items.title }}</div>
            <div class="subname">{{ items.novel_category_data_preview }}</div>
            <div>
              <NovelStar
                v-if="star === true"
                :rating="Math.round(items.avg_star)"
              />
            </div>
            <div class="view-list">
              <div class="view">
                <i class="far fa-eye"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(items.ep_total_view) }}
                </div>
              </div>
              <div class="list">
                <i class="fas fa-list"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(items.ep_count) }}
                </div>
              </div>
            </div>
          </div>
        </router-link>

      </template>
    </carousel> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";
import NovelStar from "@/components/widget/NovelStar.vue";

export default Vue.extend({
  name: "NovelSale",
  props: {
    loop: Boolean,
    opject: [],
    star: {
      type: Boolean,
      default: true,
    },
    // eslint-disable-next-line no-undef
  },

  components: {
    // carousel:()=> import('../../../node_modules/vue-owl-carousel') ,
    NovelStar,
    // carousel,
  },
  data() {
    return {
      responsive: {
        0: {
          items: 2.5,
        },
        415: {
          items: 2.5,
        },
        768: {
          items: 4,
        },
        1024: {
          items: 5,
        },
        1100: {
          items: 6,
        },
      },
      // sdds: [
      //   '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      //   '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      // ],
    };
  },
  // methods:{
  //   reface(){
  //   var container = document.getElementById("Carousel") as HTMLElement;
  //   console.log( container.innerHTML);
  //   var content = container.innerHTML;
  //   container.innerHTML= content;
  //   }
  // }
  mounted() {
    
    // this.getlastUpdate()
    // this.getNextread()
    // this.getRecommend()
  },
});
</script>
<style lang="scss" scoped>
$second-blue: #1e2046;
$second-gray: #444349;
$second-grayLight: #cfd4d9;


// .owl-carousel .owl-item img {
//   border-radius: 10px;
// }
// .nv-box-carousel {
//   display: flex;
//   flex-direction: column;
//   grid-gap: 10px;
//   justify-content: center;
//   align-items: center;
// }
// .nv-box-carousel .grod-detail {
//   display: flex;
//   flex-direction: column;
//   grid-gap: 5px;
//   justify-content: center;
//   align-items: center;
// }
// .nv-box-carousel .grod-detail .name {
//   color: #1e2046;
//   font-size: 18px;
// }
.sd{
  // overflow: hidden;
  // width: ;
  // display: grid;
  // grid-template-columns: 1fr 1fr;
}
.subname {
  font-size: 15px;
  color: rgb(182, 182, 182);
}
.box-mywork {
  position: relative;
  // border: 3px solid #e84f47;
  border-image-slice: 1;
  border-radius: 12px;
}

.promotion {
  display: flex;
  align-items: center;
  justify-content: start;
  // width: 70px;
  border-radius: 10%;
  height: 15px;
  position: absolute;
  // background: #fb5353;
  left: -10px;
  font-size: 13px;
  // z-index: 100;
  top: 5px;
  padding: 5px;
  color: #fff;
}
.tag-3-side {
  margin-top: 10px;
  padding-top: 10px;
  display: -webkit-box;
  display: flex;
}
.tag-text {
  align-items: center;
}
// .rule-shape {
//   margin-left: -7px;
//   color: #fff;
//   font-size: 14px;
//   display: -webkit-box;
//   display: flex;
//   -webkit-box-align: center;
//   align-items: center;
//   align-self: flex-end;
// }

// .rule-shape:before,
// .rule-shape:after {
//   content: " ";
//   background: #fff;
//   height: 1px;
//   margin-bottom: 8px;
//   display: block;
//   -webkit-box-flex: 2;
//   flex-grow: 2;
// }

// .rule-shape:before {
//   margin-right: 6.25px;
// }

// .rule-shape:after {
//   margin-left: 6.25px;
// }

.tag-3-text {
  background: rgba(227, 17, 17, 1) ;

  width: 100%;
  border-radius: 9px;
  // padding-top: 9px;
  padding-left: 7px;
  width: 40px;
  // height: 50px;
  font-size: 14px;
  color: #fff;
  z-index: 1;
  transform: translate(5px, -12px);
}
.psdp{
  height: 230px;
  // border: 4px solid #e84f47;
  // width: 200px;
   border-radius: 10px;
}
.margin{
  // width: 100vw;
  display: flex;
  z-index: 100;
  // gap: 10px;
    display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
      // width: 400px;
    margin: auto;
}
.tag-3-side.is-back .tag-3-text {
  background: #b6dfde;
  color: #222;
}
@media (max-width: 415px) {
  .psdp{
  height: 200px;
}
// .margin{
//   width: auto;
// }
}
// .owl-stage-outer {
//   padding: 15px 0px;
// }
// .nv-box-carousel img {
//   transition: 0.3s;
// }
// .nv-box-carousel img:hover {
//   transform: scale(1.07);
// 	-webkit-transform: scale(1.07);
// }






@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}

:root {
  --card-height: 65vh;
  --card-width: calc(var(--card-height) / 1.5);
}





.card {
  // background: #191c29;
  width: var(--card-width);
  height: var(--card-height);
  padding: 3px;
  position: relative;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  font-size: 1.5em;
  color: rgb(88 199 250 / 0%);
  cursor: pointer;
  font-family: cursive;
}


// .card:hover:before, .card:hover:after {
//   animation: none;
//   opacity: 0;
// }


.card::before {
  content: "";
  width: 104%;
  height: 102%;
  border-radius: 12px;
  background-image: linear-gradient(
    var(--rotate)
    , #b4baf2, #7d89f6 43%, #b800fb);
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -2%;
    animation: spin 5.5s linear infinite;
}

.card::after {
  position: absolute;
  content: "";
  top: calc(var(--card-height) / 6);
  left: 0;
  right: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  transform: scale(0.8);
  filter: blur(calc(var(--card-height) / 6));
  background-image: linear-gradient(
    var(--rotate)
    , #5ddcff, #3c67e3 43%, #4e00c2);
    opacity: 1;
  transition: opacity .5s;
  animation: spin 2.5s linear infinite;
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}

</style>
