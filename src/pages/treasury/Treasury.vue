<template>
  <div>
    <div>
      <div class="nv-box-white nv-mt-40 Treasury">
        <div class="img-cover">
          <div
            class="img-profile"
            style="
              background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png) center center/cover;
            "
          ></div>
        </div>
        <div class="contant">
          <div class="box-username">
            <div v-if="profile" class="line-1 display_name">
              {{ this.$store.state.auth.display_name }}
            </div>
            <div v-if="profile">#นักรบมังกร</div>
            <div class="nv-mt-40"></div>
          </div>
        </div>
        <div class="con-sd">
          <h1>คลังสมบัติ</h1>
          <div class="con-treasury" v-if="treasury">
            <div
              v-for="(item, index) in treasury"
              :key="index"
              class="box-treasury"
            >
              <div v-if="!item.bought" style="height: 230px">
                <div
                  :class="'h-t-treasury ' + item.sticker_ranking_data_preview"
                >
                  {{ item.sticker_ranking_data_preview }}
                </div>
                <div
                  :class="
                    'contan-treasury contan-treasury' +
                    item.sticker_ranking_data_preview
                  "
                >
                  <img
                    v-if="item.sticker_ranking_data_preview === 'Mystery'"
                    src="https://stickershop.line-scdn.net/stickershop/v1/sticker/286369950/android/sticker.png;compress=true"
                    width="80%"
                  />
                  <div
                    class="image-legendaey"
                    v-else-if="
                      item.sticker_ranking_data_preview === 'Legendary'
                    "
                  >
                    <img  v-lazy="item.image_data.url" width="80%" />
                    <img class="img-keylock" :src="$path.image('unlock.png')" />
                  </div>

                  <img
                    v-else-if="item.sticker_ranking_data_preview === 'Common'"
                    v-lazy="item.image_data.url"
                    width="80%"
                  />
                  <img
                    v-else-if="item.sticker_ranking_data_preview === 'Uncommon'"
                    v-lazy="item.image_data.url"
                    width="80%"
                  />
                  <img
                    v-else-if="item.sticker_ranking_data_preview === 'Rare'"
                    v-lazy="item.image_data.url"
                    width="80%"
                  />
                </div>
              </div>
              <div
                v-else
                :class="
                  'open-treasury open-treasury' +
                  item.sticker_ranking_data_preview
                "
                @click="openStiker(item)"
              >
                <img :src="item.image_data.url" width="80%" />
              </div>
            </div>
          </div>
          <div v-else>
            loading...
          </div>
        </div>
      </div>
    </div>
    <NovelModal2
      ID="treasuryStiker"
      IDCrad="treasuryStikerCard"
      ref="treasuryStikerCard"
      :Close="true"
      width="450px"
    >
      <template v-slot:body>
        <div class="con-sti">
          <div v-for="(item, index) in showStiker.shop_item_datas" :key="index">
            <img :src="item.image_data.url" width="100%" />
          </div>
          <!-- {{item}} -->
        </div>
      </template>
    </NovelModal2>
  </div>
</template>
<script lang="ts">
import { Gatway } from "@/shares/services";
import Vue from "vue";
import { test } from "./Treasury";
import EmptyContent from "../empty/empty.vue";
export default Vue.extend({
  name: "treasury",
  data() {
    return {
      treasury: null as any,
      gatitemProfile: {},
      showStiker: {} as any,
    };
  },
  components: {
    // EmptyContent,
    // cover: () => import("@/components/Cover.vue"),
  },
  methods: {
    async get() {
      let res = await Gatway.getService("/guest/sticker-lists");
      console.log(res.data.data);
      const data = [] as any;
      const type = ["Common", "Uncommon", "Rare", "Legendary", "Mystery"];
      type.forEach((elementtype) => {
        res.data.data[elementtype].forEach((element) => {
          data.push(element);
        });
      });
      console.log(data);
      this.treasury = data;
    },
    openStiker(item: any) {
      console.log(item);
      this.showStiker = item;
      (this as any).$refs.treasuryStikerCard.open();
    },
  },
  mounted() {
    this.get();
  },
});
</script>
<style lang="scss" src="./Treasury.scss" scoped></style>
