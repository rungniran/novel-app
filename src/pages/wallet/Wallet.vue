<template>
  <div class="Wallet">
    <div class="nv-box-white nv-mt-40">
      <div class="add-coin">
        <div class="writer-profile">
          <!-- <div
            class="nv-profile-small"
            style="
              background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png)
                center center/cover;
            "
          ></div>
          <div class="con-username">
            <div v-if="profile">{{ this.$store.state.auth.display_name }}</div>
            <div v-if="profile">{{ profile.dragon }}</div>
          </div> -->
           <div class="nv-con-coin">
            <img
              :src="$path.image('coin-gold.png')"
              width="25px"
              height="25px"
            />
             {{
          $filter.NumberToString(
            this.$store.state.auth.dataset.coin_balance_sandbox
          )
        }}
          </div>
        </div>
        <div class="box-coin">
          <!-- <div class="nv-con-coin">
            <img
              :src="$path.image('coin-gold.png')"
              width="25px"
              height="25px"
            />
             {{
          $filter.NumberToString(
            this.$store.state.auth.dataset.coin_balance_sandbox
          )
        }}
          </div> -->
          <button class="nv-btn-yellow " @click="$refs.walletModal.open()">
            เติมเหรียญ
          </button>
          <button class="nv-btn-orange">
          <router-link to="/wallet/howtopayment"
            >
            คู่มือเติมเงิน
            </router-link
            >
          </button>
        </div>
      </div>
    </div>
    <Coin/>
    <!-- <div class="nv-box-white Coin nv-mt-40">
      <div class="tap-writer" >
                <router-link @click.native="changeComponent('Coin')" to="#Coin" :class="current === 'Coin' ? 'nv-s nv-s1 nv-s-active' : 'nv-s nv-s1'">
                    ประวัติการเติมเหรียญ
                </router-link>
                <router-link @click.native="changeComponent('Exchange')" to="#Exchange"  :class="current === 'Exchange' ? 'nv-s nv-s2 nv-s-active' : 'nv-s nv-s2'">
                    ประวัติการแลกของ
                </router-link>
            </div>

      
    </div> -->
    <WalletMOdal ref="walletModal" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Wallet",
  data() {
    return {
      current: "Coin",
    };
  },
  components: {
    Coin: () => import("./components/WalletCoin.vue"),
    // Exchange:()=> import('./components/WalletExchange.vue'),
    // NovelModal:()=> import('@/components/widget/NovelModal.vue')
    WalletMOdal: () => import("./WalletModal/walletmodal.vue"),
  },
  methods: {
    changeComponent(component: string): void {
      this.current = component;
    },
    cleckpath(): string {
      return this.$route.hash.slice(1);
    },
    opanmodal(): void {
      document.getElementsByClassName("contai-modal")[0].classList.add("show");
    },
  },
  mounted() {
    this.cleckpath() === ""
      ? this.changeComponent("Coin")
      : this.changeComponent(this.$route.hash.slice(1));
    // eslint-disable-next-line no-undef
  },
});
</script>
<style lang="scss" scoped>
.contai-modal {
  background: #000000c4 !important;
}
.nv-btn-orange a {
  color: #fff;
}
.add-coin {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Coin {
  padding: 0;
  background: #ffffff00;
}
.box-coin {
  display: flex;
  grid-gap: 10px;
}
.tap-writer {
  width: 100%;
  // border: 2px solid rgb(221, 221, 221);
  display: grid;
  grid-template-columns: 1fr 1fr;
  // overflow: hidden;
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

.nv-con-coin{
  // color: #e39829;
  font-size: 18px;
}
@media (max-width: 1024px) {
}
@media (max-width: 768px) {
}
@media (max-width: 500px) {
  // .add-coin{
  //         flex-direction: column;
  //         gap: 10px;
  // }
  // .writer-profile{
  //     flex-direction: column;
  //     grid-gap: 10px;
  // }.con-username{
  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;

  // }


}
</style>
