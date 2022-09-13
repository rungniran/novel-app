<template>
  <!-- <NovelModal classlist="walllet-modal"  animation="create-novel-show"> -->
  <NovelModal2
    ID="wallletModal"
    IDCrad="wallletModalCard"
    ref="Modeal"
    :Close="true"
    width="360px"
  >
    <template v-slot:body>
      <!-- :style="`height: ${Height}px`" -->

      <div class="walllet-conthai">
        <div class="walllet-page" id="page1">
          <div class="walllet-title">ช่องทางการเติมเหรียญ</div>
          <div
            v-for="(item, index) in page1"
            :key="index"
            class="walllet-list"
            @click="leftPage(2, item)"
          >
            <div>
              <div v-if="item.name_preview === 'True Wallet'">
                <img v-lazy="$path.image('truemoney-wallet.png')" class="img-payment-truewallet" alt="">
              </div>
              <div v-else-if="item.name_preview === 'Master Card'">
                <img  v-lazy="$path.image('MasterCard.png')" class="img-payment" alt="">
              </div>
              <div v-if="item.name_preview === 'Rabbit LINE Pay'">
                <img  v-lazy="$path.image('linepay.png')" class="img-payment-rabbitline" alt="">
              </div>
              <div v-if="item.name_preview === 'Prompt Pay'">
                <img  v-lazy="$path.image('prompt-pay.png')" class="img-payment-rabbitline" alt="">
              </div>
            </div>
            <div>{{ item.name_preview }}</div>
          </div>
        </div>

        <div class="walllet-page" id="page2">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: flex-start;
              grid-gap: 20px;
            "
          >
            <i @click="leftPage(1)" class="fas fa-arrow-left"></i>
            {{ titlePage2 }}
          </div>
          <div v-if="dataObj.typeHowto === 'true_wallet'">
            <input
              class="phone"
              placeholder="เบอร์โทรศัพท์"
              type="number"
              v-model="phoneNumber"
            />
            <div
              v-for="(item, index) in page2"
              :key="index"
              @click="
                omise(item);
                dataObj.setCoin = item.wallet;
              "
              class="walllet-list"
            >
              <div class="walllet-con-coin">
                <img :src="$path.image('coin-gold.png')" width="20px" />
                {{ item.coin_amount }}
              </div>
              <div>{{ item.price_amount }} บาท</div>
            </div>
          </div>

          <div v-else>
            <div
              v-for="(item, index) in page2"
              :key="index"
              @click="
                omise(item);
                dataObj.setCoin = item.price_amount;
              "
              class="walllet-list"
            >
              <div class="walllet-con-coin">
                <img :src="$path.image('coin-gold.png')" width="20px" />
                {{ item.coin_amount }}
              </div>
              <div>{{ item.price_amount }} บาท</div>
            </div>
          </div>
        </div>

        <div class="walllet-page" id="page3">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: flex-start;
              grid-gap: 20px;
            "
          >
            <i @click="leftPage(2)" class="fas fa-arrow-left"></i>
            {{ titlePage2 }}
          </div>
          <div v-if="dataObj.typeHowto === 'Bank'">
            <div class="walllet-con-bank">
              <div class="walllet-con-bank-box">05:45</div>
            </div>
            <div class="walllet-con-bank-accout">
              <div>ธนาคาร xxxxxx</div>
              <img
                src="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png"
                width="20%"
                style="margin: 20px 0px"
              />
              <div>กรุณาโอนยอดพร้อมจุดทศนิยม</div>
              <div>{{ dataObj.setCoin }}.77</div>
              <div class="walllet-bank-accout-number">101-1-44XXX-4</div>
              <div>บริษัท คิงด้อมแพลตฟอร์ม จำกัด</div>
              <!-- <img src="https://f.ptcdn.info/189/061/000/pj34e58h1olJiIkOYdl4-o.jpg" width="100%"> -->
            </div>
          </div>
          <div
            v-else-if="dataObj.typeHowto === 'prompt_pay'"
            class="prompt_pay"
          >
            <div class="box-img-pp">
              <!-- {{qrcode}} -->
              <img :src="qrcode" class="PromptPayimg" width="100%" />
            </div>
            <span class="price_amount" v-if="dataPay"
              >{{ dataPay.price_amount.split(".")[0] }} บาท</span
            >
          </div>
          <div v-else class="loader">
            <svg
              version="1.1"
              id="loader-1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="50px"
              height="50px"
              viewBox="0 0 50 50"
              style="enable-background: new 0 0 50 50"
              xml:space="preserve"
            >
              <path
                fill="#d5d5d5"
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
          </div>
        </div>
      </div>
    </template>
  </NovelModal2>
</template>

<script>
import Vue from "vue";
import { Howto } from "./WalletHowto.data";
import { coin } from "./WalletCoin.data";
import { alert } from "@/shares/modules/alert";
import { Gatway } from "@/shares/services";
import { omise_public_key } from "@/shares/constants";
/* eslint-disable no-undef */
export default Vue.extend({
  components: {
    // NovelModal:()=> import('@/components/widget/NovelModal2.vue'),
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
  },
  data() {
    return {
      qrcode: "londing",
      titlePage2: "",
      Height: "",
      page1: Howto,
      page2: coin,
      page3: coin,
      phoneNumber: "",
      dataObj: {
        typeHowto: "",
        setCoin: "",
      },
      dataPay: null,
    };
  },
  methods: {
    async leftPage(page, item) {
      let w = -360;
      let wallletConthai =
        document.getElementsByClassName("walllet-conthai")[0];
      if (page === 1) {
        wallletConthai.style.marginLeft = w * 0 + "px";
        this.Height = 433;
      } else if (page === 2) {
        wallletConthai.style.marginLeft = w * 1 + "px";
      } else if (page === 3) {
        wallletConthai.style.marginLeft = w * 2 + "px";
      }
      let res = await Gatway.getIDService("/admin/topic-coin-data", item.id);
      this.page2 = res.data.data.sort((a, b) => {
        return a.price_amount - b.price_amount;
      });

      // this.page2 = await res.data.data;
      this.titlePage2 = await item.name_preview;
      this.dataObj.typeHowto = await item.name;
      await this.heightBox(page);
    },

    async getadd() {
      let res = await Gatway.getService("/admin/topic-coin-data ");
      this.page1 = res.data.data;
    },
    async heightBox(page) {
      let Height = await document.getElementById("page" + page);

      this.Height = await Height.clientHeight;
    },

    configure() {
      let configure = OmiseCard.configure({
        publicKey: omise_public_key,
        image: "https://novelkingdom.co/apple-touch-icon.png",
        frameLabel: "Novel kingdom",
      });
      return configure;
    },

    setKey() {
      return Omise.setPublicKey(omise_public_key);
    },

    omise(item) {
      if (this.dataObj.typeHowto === "master_card") {
        this.credit_card(item);
      } else if (this.dataObj.typeHowto === "prompt_pay") {
        this.qrcode = this.$path.svg("loading.svg");
        this.promptpay(item);
      } else if (this.dataObj.typeHowto === "true_wallet") {
        this.phoneNumber.length === 10
          ? this.truemoney(item)
          : this.errorPhone();
      } else if (this.dataObj.typeHowto === "rabbit_line_pay") {
        this.rabbit_linepay(item);
      }
    },

    errorPhone() {
      let phone = document.getElementsByClassName("phone")[0];
      phone.classList.add("err");
    },

    async credit_card(item) {
      this.configure();
      var price = parseInt(item.price_amount.split(".")[0] + "00");
      OmiseCard.open({
        amount: price,
        buttonLabel: `Pay ${price} THB`,
        currency: "THB",
        defaultPaymentMethod: "credit_card",
        onCreateTokenSuccess: (nonce) => {
          if (nonce.startsWith("tokn_")) {
            this.omiseToken = nonce;
            var pay = {
              amount: price,
              id: item.id,
              outside_token: nonce,
              topic_coin_data_id: item.id,
              type_way: "credit_card",
            };
            Gatway.postService("/customers/payment-gateway/payment", pay).then(
              (res) => {
                alert(
                  `เติมเหรียญสำเร็จ +${item.coin_amount} เหรียญ`,
                  "success"
                );
                this.$store.commit("reset");
                window.location.href = res.data.data[0].authorize_uri;
              }
            );
          }
        },
      });
    },

    promptpay(item) {
      Omise.setPublicKey(omise_public_key);
      var price = parseInt(item.price_amount.split(".")[0] + "00");
      this.leftPage(3);
      Omise.createSource(
        "promptpay",
        {
          amount: price,
          currency: "THB",
        },
        (statusCode, response) => {
          var pay = {
            amount: price,
            id: item.id,
            outside_token: response.id,
            topic_coin_data_id: item.id,
            type_way: "promptpay",
          };
          this.dataPay = item;
          Gatway.postService("/customers/payment-gateway/payment", pay).then(
            (res) => {
              this.qrcode = res.data.data[0]["qr-code"];
              this.cleckpp(res);
            }
          );
        }
      );
    },

    cleckpp(res) {

      if (this.$route.name === "Wallet") {
        setTimeout(() => {
          Gatway.postService("/customers/payment-gateway/prompt-pay/check", {
            id: res.data.data[0].id,
          }).then((rescheck) => {
            if (rescheck.data.data.status === true) {
              this.$store.commit("reset");
              this.$router.push(`/wallet/walletconfirm/${res.data.data.id}`);
            } else {
              this.cleckpp(res);
            }
          });
        }, 5000);
      }
    },

    open() {
      this.$refs.Modeal.open();
    },

    truemoney(item) {
      Omise.setPublicKey(omise_public_key);
      var price = parseInt(item.price_amount.split(".")[0] + "00");
      this.leftPage(3);
      Omise.createSource(
        "truemoney",
        {
          amount: price,
          currency: "THB",
          phone_number: this.phoneNumber,
        },
        (statusCode, response) => {
          var pay = {
            amount: price,
            id: item.id,
            outside_token: response.id,
            topic_coin_data_id: item.id,
            type_way: "truemoney",
          };
          Gatway.postService("/customers/payment-gateway/payment", pay).then(
            (res) => {
              this.$store.commit("reset");
              window.location.href = res.data.data[0].authorize_uri;
              // window.open(res.data.data[0].authorize_uri, "MsgWindow", "width=200,height=100")
            }
          );
        }
      );
    },
    rabbit_linepay(item) {
      Omise.setPublicKey(omise_public_key);
      var price = parseInt(item.price_amount.split(".")[0] + "00");
      this.leftPage(3);
      Omise.createSource(
        "rabbit_linepay",
        {
          amount: price,
          currency: "THB",
          phone_number: this.phoneNumber,
        },
        (statusCode, response) => {
          var pay = {
            amount: price,
            id: item.id,
            outside_token: response.id,
            topic_coin_data_id: item.id,
            type_way: "rabbit_linepay",
          };
          Gatway.postService("/customers/payment-gateway/payment", pay).then(
            (res) => {
              this.$store.commit("reset");
              window.location.href = res.data.data[0].authorize_uri;
            }
          );
        }
      );
    },
  },
  mounted() {
    this.getadd();
    this.heightBox(1);
  },
});
</script>
<style lang="scss">
$sizePage: 360px;
#wallletModalCard {
  // padding: 15px;
  border-radius: 10px;
  display: flex;
  background: #ffffff;
  align-items: center;
  flex-direction: column;
  align-items: stretch;
  overflow-y: scroll;
  height: 500px;
  width: $sizePage;
  padding: 0px;
}
.walllet-title{
  font-size: 18px;
  text-align: center;
}
.walllet-list {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  margin: 7px 0px;
  border-radius: 7px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  background: white;
  cursor: pointer;
  transition: 0.3s;
}
.walllet-list:hover {
  background: #d6d6d6;
}
.walllet-conthai {
  margin-left: 0px;
  display: grid;
  grid-template-columns: $sizePage $sizePage $sizePage $sizePage;
  overflow: hidden;
  transition: 0.3s;
  align-items: start;
}
.walllet-page {
  padding: 15px;
  width: $sizePage;
  height: 100%;
  overflow-y: scroll;
}
.img-payment{
   position: absolute;
  width: 20%;
  object-fit: cover;
  transform: translate(0px,-10px);
}
.img-payment-truewallet{
     position: absolute;
  width: 20%;
  object-fit: cover;
  transform: translate(0px,-15px);
  
}
.img-payment-rabbitline{
       position: absolute;
  width: 30%;
  object-fit: cover;
  transform: translate(0px,-5px);
  
}
.walllet-page::-webkit-scrollbar {
  display: none;
}

.walllet-con-coin {
  display: flex;
  grid-gap: 10px;
  align-items: center;
  color: #e7a82f;
}
.PromptPay {
  text-align: center;
  padding: 20px 0px;
}
.phone {
  margin: 10px 0px;
}
.walllet-con-bank {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
}
.walllet-con-bank-box {
  padding: 20px 0px;
  margin: 10px 0px;
  justify-content: center;
  text-align: center;
  border: 1px solid #d6d6d6;
}
.walllet-con-bank-accout {
  border: 1px solid #d6d6d6;
  height: 360px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.walllet-bank-accout-number {
  font-size: 20px;
}
.PromptPayimg {
  margin-top: 10px;
  border-radius: 10px;
}
.fa-arrow-left {
  cursor: pointer;
}
.loader {
  display: flex;
  width: 100%;
  height: 440px;
  justify-content: center;
  align-items: center;
}
.prompt_pay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.err {
  border: 2px solid red;
}
.box-img-pp {
  min-height: 450px;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}
.price_amount {
  font-size: 23px;
  margin-top: -15px;
  z-index: 1;
}
@media (max-width: 1024px) {
}
@media (max-width: 768px) {
}
@media (max-width: 415px) {
  // .walllet-conthai{
  //    grid-template-columns: $sizePage $sizePage $sizePage $sizePage;
  // }
}
</style>
