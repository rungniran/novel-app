<template>
  <div id="Work">
    <div v-if="data" class="con-mywork">
      <router-link
        :to="'/writer/novelpreview/' + item.id"
        v-for="(item, index) in data"
        :key="index"
        class="box-mywork"
      >
        <div class="promotion" v-if="item.novel_promotion_datas.length !== 0">
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
              v-if="item.status_end_novel === true"
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

        <div class="image loading-img">
          <img
            :src="
              item.image_data ? item.image_data.url : $path.image('loading.png')
            "
            alt="novel"
            class="img-pre"
            width="100%"
            onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
          />
          <div class="type-novel">เผยแพร่</div>
        </div>
        <div class="name-novel">
          {{item.title}}
        </div>
      </router-link>
    </div>
    <div v-else class="notdata">
      <EmptyContent
        class="image"
        pathName="1.png"
        text="นักเขียนยังไม่มีนิยาย"
        fontSize="36px"
      ></EmptyContent>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EmptyContent from "../pages/empty/empty.vue";
export default Vue.extend({
  name: "Work",
  data() {
    return {
      dataloang: [...Array(5).keys()],
    };
  },
  props: {
    data: [] as any,
  },
  components: {
    EmptyContent,
  },
});
</script>

<style lang="scss" scoped>
.con-mywork {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
}
.image {
  position: relative;
  // height: 300px;
  // width: 200px;
  // background: #febc2a;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
// .image:hover {
//   box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
// }
.type-novel {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 30px;
  background: radial-gradient(
    circle,
    rgba(11, 173, 16, 1) 0%,
    rgba(172, 195, 34, 1) 98%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.type-novel:hover{
  background: radial-gradient(circle, rgba(172,195,34,1) 0%, rgba(11,173,16,1) 98%);
  transition: all 0.5s linear ease-in-out;
}
.img-pre {
}
.container-detail {
  margin: 10px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.notdata {
  margin-top: 20px;
}
.name-novel {
  text-align: center;
}
.promotion {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 70px;
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

.box-mywork {
  position: relative;
}

// .tag-container {
//     // width: 200px;
//     // height: 300px;
//     margin: 20px;
//     position: relative;
//     -webkit-perspective: 800px;
//     perspective: 800px;
// }

.tag-3-side {
  margin-top: 10px;
  padding-top: 10px;
  display: -webkit-box;
  display: flex;
}

.tag-3-text {
  background: rgba(227, 17, 17, 1);

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

/* Extras */
.rule-shape {
  margin-left: -7px;
  color: #fff;
  font-size: 14px;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  align-self: flex-end;
}

.rule-shape:before,
.rule-shape:after {
  content: " ";
  background: #fff;
  height: 1px;
  margin-bottom: 8px;
  display: block;
  -webkit-box-flex: 2;
  flex-grow: 2;
}

.rule-shape:before {
  margin-right: 6.25px;
}

.rule-shape:after {
  margin-left: 6.25px;
}

.rule-red {
  color: #e44f47;
}

.rule-red:before,
.rule-red:after {
  background: #e44f47;
}

.rule-diagonal {
  background: -webkit-repeating-linear-gradient(
    45deg,
    #e44f47,
    #e44f47 7px,
    transparent 7px,
    transparent 14px,
    #fff 14px,
    #fff 21px,
    transparent 21px,
    transparent 28px
  );
  background: repeating-linear-gradient(
    45deg,
    #e44f47,
    #e44f47 7px,
    transparent 7px,
    transparent 14px,
    #fff 14px,
    #fff 21px,
    transparent 21px,
    transparent 28px
  );
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
}

@media (max-width: 1024px) {
}
@media (max-width: 768px) {
  .con-mywork {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media (max-width: 550px) {
  .con-mywork {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 415px) {
  .con-mywork {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
