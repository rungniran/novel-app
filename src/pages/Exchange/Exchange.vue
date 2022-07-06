<template>
  <div class="Exchange">
    <div class="nv-box-white nv-mt-40">
      <div class="add-coin">
        <div class="writer-profile">
          <div
            class="nv-profile-small"
            style="
              background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png)
                center center/cover;
            "
          ></div>
          <div>
            <div v-if="profile">{{ profile.display_name }}</div>
            <div v-if="profile">{{ profile.dragon }}</div>
          </div>
        </div>
        <div class="box-coin">
          <div class="nv-con-coin">
            <img :src="$path.image('diamond.png')" width="25px" height="25px" />
            {{
              $filter.NumberToString(
                this.$store.state.auth.dataset.diamond_balance
              )
            }}
          </div>
          <router-link to="exchange/story"
            ><button class="nv-btn-yellow">ดูประวัติ</button></router-link
          >
        </div>
      </div>
    </div>
    <div class="nv-box-white nv-mt-40 item-Exchange">
      <!-- <div class="nv-title history-title" style="al"> แลกของรางวัล</div> -->
      <div class="item">
        <div class="box-item" v-for="(item, idex) in Exchange" :key="idex">
          <!-- {{item.image_data.url}} -->

          <div
            class="limit-items-s"
            v-if="item.limit_items > 0 && item.limit_items"
          >
            {{ item.limit_items }}
          </div>
          <div class="limit-items" v-else>สินค้าหมด</div>

          <div :class="item.limit_items !== 0 ? 'box-pd' : 'box-pd not-full'">
            <img :src="item.image_data.url" width="50%" />
            <div class="detail-item">
              <div class="item-name line-1">{{ item.name }}</div>
              <small class="color line-1" v-if="item.diamond"
                >ใช้เพชร {{ $filter.NumberToString(item.diamond) }} ดวงแลก
                {{ item.name }}
              </small>
              <div
                class="btn-item"
                @click="
                  profile.diamond_balance >= item.diamond
                    ? Address(item)
                    : notDiamond()
                "
              >
                <img
                  :src="$path.image('diamond.png')"
                  width="25px"
                  height="25px"
                />
                <span v-if="item.diamond">{{
                  $filter.NumberToString(item.diamond)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 class="text-sticker"><i class="fa fa-puzzle-piece"></i> สติกเกอร์</h1>
      <div class="item">
        <div
          class="box-item"
          v-for="(item, idex) in sticker"
          :key="idex"
          @click="sell(item)"
        >
          <!-- {{item.shop_item_datas[0].image_data.url}} -->
          <!-- {{item.limit_status_item}} -->
           <div class="limit-items" v-if="item.limit_status_item === true">{{item.amount}}</div>

          <img class="img-sticker"
            :src="
              item.shop_item_datas[0]
                ? item.shop_item_datas[0].image_data.url
                : $path.image('loading.png')
            "
            onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
            width="50%"
          />
          <div class="detail-item">
            <div class="item-name">{{ item.name }}</div>
            <div class="line-1">
              ใช้เพชร {{ $filter.NumberToString(item.diamond) }} ดวงแลก
              {{ item.name }}
            </div>
            <div class="btn-item" v-if="item.diamond !== '0.00'">
              <img
                :src="$path.image('diamond.png')"
                width="25px"
                height="25px"
              />
              {{ $filter.NumberToString(item.diamond) }}
            </div>
            <div class="btn-item"  v-else>
              ฟรี
            </div>
          </div>
        </div>
      </div>
    </div>
    <NovelModal2
      ID="wallletModal"
      IDCrad="ExchangeModalCard"
      ref="Modal"
      :Close="true"
    >
      <template v-slot:body>
        <div>กรุณากรอกข้อมูลที่อยู่เพื่อจัดส่ง</div>
        <div class="from nv-mt-30">
          <div class="contor-input">
            <div class="title">ชื่อ-นามสกุล</div>
            <input id="title" v-model="data.name" required />
          </div>
          <div class="contor-input">
            <div class="title">ที่อยู่</div>
            <textarea v-model="data.address"></textarea>
          </div>
          <div class="contor-input">
            <div class="title">เบอร์โทรศัพท์</div>
            <input id="title" type="number" v-model="data.phoneNumber" required />
          </div>
        </div>
        <button class="nv-mt-20 nv-btn-yellow" @click="submitAddress()">
          ยืนยัน
        </button>
      </template>
    </NovelModal2>
    <NovelModal2 ref="popup" :IDCrad="ExchangeCrad">
      <template v-slot:body>
        <div v-if="stickerr">
          <div class="name-st">{{ stickerr.name }}</div>
          <div class="con-st">
            <div v-for="(item, index) in stickerr.shop_item_datas" :key="index">
              <img :src="item.image_data.url" width="100%" />
            </div>
          </div>
          <div
            style="
              margin-top: 20px;
              display: flex;
              gap: 10px;
              justify-content: flex-end;
            "
          >
            <button class="nv-btn-yellow" @click="$refs.popup.close()">
              ยกเลิก</button
            ><button class="nv-btn-orange" @click="sellST(stickerr)">
              ซื้อเลย
            </button>
          </div>
        </div>
      </template>
    </NovelModal2>
    <ConfirmDialogue @close="close()" ref="confirmDialogue">
      <!-- <template v-slot:body></template> -->
    </ConfirmDialogue>
  </div>
</template>
<script lang="ts">
import { Gatway } from "@/shares/services";
import Vue from "vue";
import { alert } from "@/shares/modules/alert";
import NovelModal2 from "@/components/widget/NovelModal2.vue";
export default Vue.extend({
  name: "Exchange",
  data() {
    return {
      current: "Coin",
      Exchange: [],
      sticker: [],
      stickerr: null,
      data: {
        name: "",
        address: "",
        phoneNumber: "",
        shop_type_data_id: "",
      },
      itempd: {} as any,
    };
  },
  components: {
    // ConfirmDialogue:()=> import('@/components/widget/NovelConfirm2.vue'),
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
  },
  methods: {
    notDiamond() {
      alert("จำนวนเพรชไม่เพียงพอ", "error");
    },
    changeComponent(component: string): void {
      this.current = component;
    },
    cleckpath(): string {
      return this.$route.hash.slice(1);
    },
    opanmodal(): void {
      document.getElementsByClassName("contai-modal")[0].classList.add("show");
    },
    async gitlist() {
      let res = await Gatway.postService("/guest/shop-data/lists", {
        shop_type_data_id: "7dc9abbc-d3b3-4b48-ac77-29d00a70469e",
      } as any);
      this.Exchange = await this.AllProduct(res.data.data);
      let ressticker = await Gatway.postService("/guest/shop-data/lists", {
        shop_type_data_id: "9c1c64df-3516-4098-8575-1c3470206710",
      } as any);
      console.log(ressticker);
      
      let resstickerdata = await [] as any;
      ressticker.data.data.filter((res: any) => {
        // if (!res.diamond) {
        //   null;
        // } else if (parseInt(res.diamond) !== 0 || parseInt(res.diamond)  === 0 ) {
          resstickerdata.push(res);
        // }
      });
      this.sticker = await resstickerdata;
    },
    Address(item: any) {
      this.itempd = item;
      (this as any).$refs.Modal.open();
    },
    async submitAddress() {

      let res = await Gatway.postService("/customers/shop-data/buy", {
        shop_topic_data_id: this.itempd.shop_topic_data_id,
        shop_type_data_id: "7dc9abbc-d3b3-4b48-ac77-29d00a70469e",
        shop_item_data_id: this.itempd.id,
        address: this.data,
      } as any);
      alert("สำเร็จ", "success");
      this.$store.commit("reset");
      (this as any).$refs.Modal.close();
      this.gitlist()
    },
    AllProduct(item: any) {
      let Product = [] as any;
      item.forEach((element: any) => {
        Product.push(...element.shop_item_datas);
      });
      return Product;
    },
    async sell(item: any) {
      let res = await Gatway.getIDService("admin/shop-data-topic", item.id);
      console.log(item);

      // console.log(res.data.data.shop_item_datas);
      this.stickerr = await res.data.data;
      (this as any).$refs.popup.open();

      // let confirm = await (this as any).$refs.confirmDialogue.show({
      //     title: item.name,
      //     okButton: 'ยืนยัน',
      // })
      // if (confirm === true){
      //   let res = await Gatway.postService('/customers/shop-data/buy', {shop_topic_data_id:item.id,shop_type_data_id:item.id} as any)
      //   console.log(res.data.data);
      //   if(res.data.code === 200){
      //     alert( 'ซื้อสำเร็จ','success')
      //     this.$store.commit("reset");
      //      this.gitlist()
      //   }

      // }
    },

    async sellST(item: any) {
      console.log(item);

      let res = await Gatway.postService("/customers/shop-data/buy", {
        shop_topic_data_id: item.id,
        shop_type_data_id: item.shop_type_data_id,
        shop_item_data_id: item.shop_type_data_id,
      } as any);
      console.log(res.data);
      if (res.data.code === 200) {
        alert("ซื้อสำเร็จ", "success");
        this.$store.commit("reset");
        this.gitlist();
        (this as any).$refs.popup.close();
      }else if (res.data.code === 422){
        alert(res.data.data, "error");
      }
    },
  },
  mounted() {
    this.gitlist();
    this.cleckpath() === ""
      ? this.changeComponent("Coin")
      : this.changeComponent(this.$route.hash.slice(1));
  },
});
</script>
<style lang="scss" scoped>
textarea {
   resize: none;
}

.text-sticker {
  text-align: center;
  font-size: 25px;
  padding: 20px;
  color: #8663ba;
}

.img-exchange{
   top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.add-coin {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-coin {
  display: flex;
  grid-gap: 20px;
}
.tap-writer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 5px;
  justify-items: center;
}
.nv-s1 {
  border-radius: 5px 0px 0px 5px;
  border-right: 0px solid;
}
.nv-s2 {
  border-radius: 0px 5px 5px 0px;
  border-left: 0px solid;
}
.history-title {
  text-align: center;
}
.item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
}
.name-st {
  margin-bottom: 10px;
  font-size: 18px;
}
.box-item {
  background: #f7f8f9;
  padding: 25px;
  border-radius: 10px;
  position: relative;
  display: flex;
  display: grid;
  grid-template-rows: 1fr;
  align-items: center;
  gap: 25px;
  cursor: pointer;
  
}
.box-item:hover {
  background: #f2f3f5;
  border: 1px solid #eadffa;
  box-shadow: rgba(48, 7, 108, 0.12) 0px 2px 4px 0px, rgba(48, 7, 108, 0.32) 0px 2px 16px 0px;
  transition: 0.2s ease-out;
}
.box-item img {
  border-radius: 7px;
}

.img-sticker{
    top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.item-name {
  font-size: 20px;
  text-align: center;
}
.btn-item {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  padding: 5px 20px;
  background: #f1e2ff;
  box-shadow: rgba(94, 57, 148, 0.22) 0px 8px 24px;
  // box-shadow: rgba(94, 57, 148, 0.12) 0px 4px 12px,rgba(94, 57, 148, 0.32) 0px 2px 16px 0px;
  cursor: pointer;
  width: 100%;
  border-radius: 50px;
  
}
.btn-item:hover {
  background: #e8d0fd;
  transition: 0.3s ease-in;
}
.detail-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}
.from {
  width: 300px;
}
.box-pd {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}
.color {
  color: #adadad;
}
.limit-items,
.limit-items-s {
  border-radius: 5px 0px 0px 0px;
  position: absolute;
  position: absolute;
  color: #ffffff;
  z-index: 100;
  left: 0;
  top: 0;
  padding: 0px 20px;
  background: #fc7c7c;
  border-radius: 5px 0px 5px 0px;
}
.limit-items-s {
  background: #8663ba;
  border-radius: 5px 0px 5px 0px;
}
.not-full {
  opacity: 0.3;

  transition: 0.3s;
  pointer-events: none;
}
.con-st {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  position: relative;
  overflow: hidden;
  width: 550px;
  background: #ffffff;
}
@media (max-width: 768px) {
  .item {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
  }
}
@media (max-width: 415px) {
  .item {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  .item-Exchange {
    padding: 20px 10px;
  }
  .con-st {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
    position: relative;
    overflow: hidden;
    width: 320px;
    background: #ffffff;
  }
}
</style>
