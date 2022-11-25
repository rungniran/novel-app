<template>
  <div class="Exchange">
    <div class="nv-box-white nv-mt-40">
      <div class="add-coin">
        <div class="writer-profile">
          <div class="nv-con-coin">
            <img :src="$path.image('diamond.png')"/>
            {{
              $filter.NumberToString(
                this.$store.state.auth.dataset.diamond_balance
              )
            }}
          </div>
          
        </div>
        <div class="box-coin">
          <!-- <div class="nv-con-coin">
            <img :src="$path.image('diamond.png')" width="25px" height="25px" />
            {{
              $filter.NumberToString(
                this.$store.state.auth.dataset.diamond_balance
              )
            }}
          </div>
           -->
          <router-link to="exchange/story"
            ><button class="nv-btn-yellow">ดูประวัติ</button></router-link
          >
         <button class="nv-btn-orange"   @click="$refs.coupon.open()">เติมคูปอง</button>
        </div>
      </div>
      
    </div>
    
    <div class="nv-box-white nv-mt-40 item-Exchange" v-if="sticker">
      
      <!-- <div class="nv-title history-title" style="al"> แลกของรางวัล</div> -->
      <h1 class="text-sticker" v-if="sticker.length !== 0"><i class="fa fa-puzzle-piece"></i> สติกเกอร์</h1>
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
              item.image_data 
                ? item.image_data.url
                : $path.image('loading.png')
            "
            onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
            width="50%"
          />
          <div class="detail-item">
            <div class="item-name line-1">{{ item.name }}</div>
            <div class="line-1">
              ใช้เพชร {{ $filter.NumberToString(item.diamond) }} ดวงแลก
              {{ item.name }}
            </div>
            <div class="btn-item" v-if="item.diamond !== '0.00' ">
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
      <br>
      <h1 class="text-sticker" v-if="Exchange.length !== 0"> <i class="fa fa-shopping-bag" aria-hidden="true"></i> ของที่ระลึก</h1>
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
            <img :src="item.image_data
                  ? item.image_data.url
                  : $path.image('loading.png')" width="50%" />
            <div class="detail-item">
              <div class="item-name line-1">{{ item.name }}</div>
              <small class="color line-1" v-if="item.diamond"
                >ใช้เพชร {{ $filter.NumberToString(item.diamond) }} ดวงแลก
                {{ item.name }}
              </small>
              <!-- {{ $store.getters._dataset.diamond_balance}} -->
              <div
                class="btn-item"
                @click="
                  $store.getters._dataset.diamond_balance >= item.diamond
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
            <input id="nameAddress" v-model="dataset.name"  />
          </div>
          <div class="contor-input">
            <div class="title">ที่อยู่</div>
            <textarea id="Address" v-model="dataset.address"></textarea>
          </div>
          <div class="contor-input">
            <div class="title">เบอร์โทรศัพท์</div>
            <input id="phoneNumberAddress" type="number" v-model="dataset.phoneNumber"  />
          </div>
        </div>
        <button class="nv-mt-20 nv-btn-yellow" @click="submitAddress()" :disabled="issubmitAddress">
          ยืนยัน
        </button>
      </template>
    </NovelModal2>
    <NovelModal2 ref="popup" ID="ds" IDCrad="ExchangeCrad"  :Close="true">
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
              display: flex;
              gap: 10px;
              justify-content: flex-end;
                  padding: 10px;
            "
          >
            <!-- <button class="nv-btn-yellow" @click="$refs.popup.close()">
              ยกเลิก</button
            > -->
            <button class="nv-btn-orange" @click="sellST(stickerr)" :disabled="issellST">
              ซื้อเลย
            </button>
          </div>
        </div>
        <div v-else>
          londing...
        </div>
      </template>
    </NovelModal2>
    <NovelModal2 ref="cooking" ID="cooking" IDCrad="cookingCrad"  :Close="true" width="350px">
       
      <template v-slot:body>
        <div class="cooking" >
        <h4 >นโยบายเกี่ยวกับคุกกี้</h4>
         เมื่อท่านเข้าใช้เว็บไซต์ของบริษัท บริษัทจะเก็บรวบรวมข้อมูลจากท่านผ่านการใช้คุกกี้ เพื่อช่วยให้บริษัททราบข้อมูลการเข้าใช้บริการของท่าน โดยบริษัทจะนำข้อมูลไปพัฒนาประสิทธิภาพในการเข้าถึงบริการของท่านให้ดียิ่งขึ้น ซึ่งบริษัทจะไม่ใช้ข้อมูลส่วนนี้เพื่อประโยชน์อื่น นอกจากพัฒนาบริการของบริษัทเอง
         <button @click="confrimcooking()" class="nv-btn-yellow">ยอมรับ</button>
        </div>
      </template>
    </NovelModal2>
    <ConfirmDialogue @close="close()" ref="confirmDialogue">
      <!-- <template v-slot:body></template> -->
    </ConfirmDialogue>
    <Coupon
      v-if="this.$store.state.auth.dataset"
      ref="coupon"
    />
  </div>
</template>
<script lang="ts">
import { Gatway } from "@/shares/services";
import Vue from "vue";
import { alert } from "@/shares/modules/alert";
import { _Exchange, _ExchangesetData } from "./Exchange"
import {Validation} from "@/shares/modules/validation"
const logic = new _Exchange
const setData = new _ExchangesetData
export default Vue.extend({
  name: "Exchange",
  data() {
    return {
    
      current: "Coin",
      Exchange: [] as any[],
      sticker: null as any,
      stickerr: null as any,
      dataset: {
        name: "",
        address: "",
        phoneNumber: "",
        shop_type_data_id: "",
      } as any,
      itempd: {} as any,
      issellST:false,
      issubmitAddress:false
    };
  },
  components: {
    // ConfirmDialogue:()=> import('@/components/widget/NovelConfirm2.vue'),
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
    Coupon: () => import("@/pages/Exchange/coupon/couponcode.vue"),

  },
  methods: {
    notDiamond() {
      alert("จำนวนเพรชไม่เพียงพอ", "wraning");
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
      this.Exchanges()
      let ressticker = await Gatway.postService("/guest/shop-data/lists", {
        shop_type_data_id: "9c1c64df-3516-4098-8575-1c3470206710",
      } as any);
      
      this.sticker = await ressticker.data.data;
      
      
    },

    async Exchanges(){
      await setData._setExchange()
      this.Exchange = setData.getExchange 
      
    },

    async confrimcooking(){
     await this.$store.commit('_setCookingStatus', true),
     await (this as any).$refs.cooking.close()
    },
    Address(item: any) {
      this.itempd = item;
      this.dataset = this.$store.getters._getCooking('address') ? this.$store.getters._getCooking('address') : {
        name: "",
        address: "",
        phoneNumber: "",
        shop_type_data_id: "",
      } ;
      
      //  if (this.$store.getters._getCookingStatus){
      //      this.data = this.$store.getters._getCooking('address');
      //  }
      (this as any).$refs.Modal.open();
    },
    async submitAddress() {
      console.log(this.dataset);
      
      if (!this.$store.getters._getCookingStatus){
        (this as any).$refs.cooking.open()
      }else{
        document.cookie = `address=${JSON.stringify(this.dataset)}`;
      }
       let va = ['nameAddress','Address','phoneNumberAddress'] as any
      if(Validation(va) === true){
        this.issubmitAddress = true
          await Gatway.postService("/customers/shop-data/buy", {
          shop_topic_data_id: this.itempd.shop_topic_data_id,
          shop_type_data_id: "7dc9abbc-d3b3-4b48-ac77-29d00a70469e",
          shop_item_data_id: this.itempd.id,
          address: this.dataset,
        } as any);
        alert("สำเร็จ", "success");
        this.$store.commit("reset");
        (this as any).$refs.Modal.close();
        this.gitlist() 
        this.issubmitAddress = false
      }
    },
    AllProduct(item: any) {
      let Product = [] as any;
      item.forEach((element: any) => {
        Product.push(...element.shop_item_datas);
      });
      return Product;
    },
    async sell(item: any) {
      this.stickerr = null;
      (this as any).$refs.popup.open();
      let res = await Gatway.getIDService("admin/shop-data-topic", item.id);

      // console.log(res.data.data.shop_item_datas);
      this.stickerr = await res.data.data;
      

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
      this.issellST = true
      let res = await Gatway.postService("/customers/shop-data/buy", {
        shop_topic_data_id: item.id,
        shop_type_data_id: item.shop_type_data_id,
        shop_item_data_id: item.shop_type_data_id,
      } as any);
      console.log(res)
      this.issellST = false
      if (res.data.code === 200) {
        alert("ซื้อสำเร็จ", "success");
        this.$store.commit("reset");
        this.gitlist();
        (this as any).$refs.popup.close();
        this.issellST = false
      }else if (res.data.code === 422){
        alert(res.data.data, "error");
        this.issellST = false
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
<style lang="scss" scoped src="./Exchange.scss">

</style>
