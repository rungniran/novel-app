<template>
  <div class="NovelCarousel">
    <!-- <pre> {{ opject }}</pre> -->
    <carousel
      :items="1"
      :loop="true"
      :margin="10"
      :center="false"
      :lazyLoad="false"
      :autoplay="true"
      :singleItem="false"
      :nav="true"
      class="NovelCarousel"
      :dots="false"
      :responsive="responsive"
      :navText="sdds"
    >
      <template>
        <!-- <pre>{{opject}}</pre> -->

        <router-link
          v-for="(items, index) in opject"
          :key="index"
          :to="'/novel/' + items.id"
          class="nv-box-carousel carousel"
        >
          <div class="box-mywork">
            <img
              class="item-banner"
              :src="
                items.image_data
                  ? items.image_data.url
                  : $path.image('loading.png')
              "
              onerror="this.onerror=null;this.src='https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png';"
              :alt="items.title"
            />
            <div
              class="promotion"
              v-if="items.novel_promotion_datas.length !== 0"
            >
              <div>
                <div class="tag">
                  <div class="tag-side tag-3-side">
                    <div class="tag-text tag-3-text">
                      Sale
                      <!-- <div class="rule-shape">&#10052;</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tags-end"
              v-if="items.status_end_novel === true"
            >
              <div>
                <div class="tag">
                  <div class="tag-side tag-3-side">
                    <div class="tag-text tag-3-text">
                      จบ
                      <!-- <div class="rule-shape">&#10052;</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    </carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";
import NovelStar from "@/components/widget/NovelStar.vue";

export default Vue.extend({
  name: "NovelCarousel",
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
    carousel,
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
      sdds: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
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
});
</script>
<style lang="scss" scoped>
$second-blue: #1e2046;
$second-gray: #444349;
$second-grayLight: #cfd4d9;
.owl-carousel .owl-item img {
  border-radius: 10px;
}
.nv-box-carousel {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
}
.nv-box-carousel .grod-detail {
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  justify-content: center;
  align-items: center;
}
.nv-box-carousel .grod-detail .name {
  color: #1e2046;
  font-size: 18px;
}
.subname {
  font-size: 15px;
  color: rgb(182, 182, 182);
}
.box-mywork {
  position: relative;
  border: 3px solid #e84f47;
  border-image-slice: 1;
  border-radius: 12px;
}
.item-banner{
  // border-radius: 10px;
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

.tag-3-side.is-back .tag-3-text {
  background: #b6dfde;
  color: #222;
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
</style>
