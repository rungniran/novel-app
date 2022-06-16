<template>
  <div class="card"  >
    <div class="card-content">
      <div class="card-layout">
        <h1>วันที่ {{ $filter.toThaiDateString(date) }} น.</h1>
        <h1 class="mobile">เติมเหรียญผ่าน: {{ name }}</h1>

        <h1 class="mobile">
          จำนวนเงิน: {{ $filter.NumberToString(parseInt(price)) }} บาท
        </h1>
        <h1 class="mobile ip">จำนวนเหรียญ: {{ coin }} <img class="coin" src="http://localhost:8080/img/coin-gold.46fed048.png" alt="coin"></h1>
        <h1 class="mobile ip">จำนวนเพชร: {{ diamond }} <img class="diamond" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAfCAYAAAD9cg1AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPdSURBVHgB3ZVNaFxVFMfPfd/z3kxm4sQkrXQMKK7soqBYBLHV4k4EN6XQblwI4kYRFEFMpCIqWFy4UBRLd1pECsGFaUHdSEFBBFvTD5qUzKTJZDKTmfcx7817957e+6aTyUsyk0m7Kf3Dm3n345zfvfecex7A/aTfTs/lLv2xMrUbG2k3k8MW/qTo8uTKgvvhoDYDA379Zm6SgPQiNlVARj6qlIJXBrEbCHD+2/lXAXEqm8oCUAJBg3dSerpa8gr3DDh/plRglH1haiZIkhz3hV78DEcMfrxnAPODrxRZmUhxwEb5Nv+hcHCl6L1z14CZr28cB4SXM3pmyxgyDqmLFcAHqyXct2vA2bP/aQhwMrXhaDYr8vkmWpBD5p/ZNUBfUKckIk2kVAP6yecBR8TDt641Dw0M+Oy1mb1XLi++LlEVCOkfJhYCOGWEejH8fGAAMOUtFmH+5tUaRCGFfqIhwtoNMYc8PXvBPjwQgCI7rmsGtIIIrs8u84BidxCTzhslKuIANOAdMkzuCPjkxMwJ7mSPLrXP3mn4sLhQ4w4QgiqD1f8pVGcjCF0E5xYFDNt2LTsmPzM74+7tCwAivaHKKs+c7pBXi8CvIERNnjlNBHeJwdLfYdzuiLXi1DVQoW/2BJx6+88Uj+oBTdUTzHwuu2Ud4qjCeve8kL9SH0VSHOkJoGv+S3ymoRBlvS9jWaCrKmwnsRtx4dbb/F4QwKfm/sHctoCI4RFCCMhSFzCSzUIviVWHdncXIti8JbXq3WxKABjDJ5U7zhm3NjQtfvop8hC0NOFH0y4fgsCQPdsZVzZODqlv8UFgtBEDnKYMhfFxvqPel00bkmBsf/sIQw7z6+yk67jVbQFu0Bw1eI+itYNMGeUQD7JWuidg6JEuXDUJGKY6/fhj4391+pJLQ7QRMdFVrq1CPw0VkoVQlmllYzsB4AG+FLEwYVB3Xag79hbHokRlChJIiRCR6vBEaq4nQEL2HWURiEdIVVSwdBMWK6twvVjkMCd2bO0hkN8vg5En0FiM4pLR9s+mNy8kAfj056MX+N9Ft2Xz3NcgbXS/YmEUQbFchmVnBVJjEnSKrFhLvRTxooi8Kg1Qi0JGjymyvLT5GyNiY3suuI0WFP9tJMeouGTU0qTI3BHw5blj82nTOuQF7rwvruYd5w3PEfkdt921EEqXnXUba4RA6iGyYKRIdUeA0Hvfv3BFQnzeC51zbuDAmltfd96RXQ6gMt+EXIHY5qj88e8XfzmQHksvb/ZFYAe9f/SHJ1ikvKur5kFN0Qv7RsetkeFsOZPXl82MNv3wBJ569LlcDR5Y3QYrFsxTN9kflgAAAABJRU5ErkJggg==" alt="diamond"></h1>
        <div class="btn-status">
          <div v-if="TypeStatusWallet.pending === statusid" :class="statusname">
            {{ status }}
          </div>
          <div
            v-else-if="TypeStatusWallet.successful === statusid"
            :class="statusname"
          >
            {{ status }}
          </div>
          <div
            v-else-if="TypeStatusWallet.failed === statusid"
            :class="statusname"
          >
            {{ status }}
          </div>
        </div>
      </div>
      <Transition name="fade">
        <div v-show="isVisible">
          <h1 class="toggle-content lt pc">เติมเหรียญผ่าน: {{ name }}</h1>
          <h1 class="toggle-content lt pc">
            จำนวนเงิน: {{ $filter.NumberToString(parseInt(price)) }} บาท
          </h1>
          <h1 class="toggle-content">จำนวนเหรียญ: {{ coin }} <img class="coin" src="http://localhost:8080/img/coin-gold.46fed048.png" alt="coin"></h1>
          <h1 class="toggle-content">จำนวนเพชร: {{ diamond }} <img class="diamond" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAfCAYAAAD9cg1AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPdSURBVHgB3ZVNaFxVFMfPfd/z3kxm4sQkrXQMKK7soqBYBLHV4k4EN6XQblwI4kYRFEFMpCIqWFy4UBRLd1pECsGFaUHdSEFBBFvTD5qUzKTJZDKTmfcx7817957e+6aTyUsyk0m7Kf3Dm3n345zfvfecex7A/aTfTs/lLv2xMrUbG2k3k8MW/qTo8uTKgvvhoDYDA379Zm6SgPQiNlVARj6qlIJXBrEbCHD+2/lXAXEqm8oCUAJBg3dSerpa8gr3DDh/plRglH1haiZIkhz3hV78DEcMfrxnAPODrxRZmUhxwEb5Nv+hcHCl6L1z14CZr28cB4SXM3pmyxgyDqmLFcAHqyXct2vA2bP/aQhwMrXhaDYr8vkmWpBD5p/ZNUBfUKckIk2kVAP6yecBR8TDt641Dw0M+Oy1mb1XLi++LlEVCOkfJhYCOGWEejH8fGAAMOUtFmH+5tUaRCGFfqIhwtoNMYc8PXvBPjwQgCI7rmsGtIIIrs8u84BidxCTzhslKuIANOAdMkzuCPjkxMwJ7mSPLrXP3mn4sLhQ4w4QgiqD1f8pVGcjCF0E5xYFDNt2LTsmPzM74+7tCwAivaHKKs+c7pBXi8CvIERNnjlNBHeJwdLfYdzuiLXi1DVQoW/2BJx6+88Uj+oBTdUTzHwuu2Ud4qjCeve8kL9SH0VSHOkJoGv+S3ymoRBlvS9jWaCrKmwnsRtx4dbb/F4QwKfm/sHctoCI4RFCCMhSFzCSzUIviVWHdncXIti8JbXq3WxKABjDJ5U7zhm3NjQtfvop8hC0NOFH0y4fgsCQPdsZVzZODqlv8UFgtBEDnKYMhfFxvqPel00bkmBsf/sIQw7z6+yk67jVbQFu0Bw1eI+itYNMGeUQD7JWuidg6JEuXDUJGKY6/fhj4391+pJLQ7QRMdFVrq1CPw0VkoVQlmllYzsB4AG+FLEwYVB3Xag79hbHokRlChJIiRCR6vBEaq4nQEL2HWURiEdIVVSwdBMWK6twvVjkMCd2bO0hkN8vg5En0FiM4pLR9s+mNy8kAfj056MX+N9Ft2Xz3NcgbXS/YmEUQbFchmVnBVJjEnSKrFhLvRTxooi8Kg1Qi0JGjymyvLT5GyNiY3suuI0WFP9tJMeouGTU0qTI3BHw5blj82nTOuQF7rwvruYd5w3PEfkdt921EEqXnXUba4RA6iGyYKRIdUeA0Hvfv3BFQnzeC51zbuDAmltfd96RXQ6gMt+EXIHY5qj88e8XfzmQHksvb/ZFYAe9f/SHJ1ikvKur5kFN0Qv7RsetkeFsOZPXl82MNv3wBJ569LlcDR5Y3QYrFsxTN9kflgAAAABJRU5ErkJggg==" alt="diamond"></h1>
        </div>
      </Transition>
      <i disabled @click="showDescription(id)" v-if="isVisible == false" class="fa fa-chevron-down icon-toggle"> </i>
      <i disabled @click="showDescription(id)" v-if="isVisible == true" class="fa fa-chevron-up icon-toggle"></i>
    </div>
  </div>
</template>

<script>
import { TypeStatusWallet } from "@/shares/constants";
export default {
  name: "ListDataWallet",
  props: {
    statusid: {
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    date: {
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
    coin: {
      required: true,
    },
    price: {
      required: true,
    },
    status: {
      required: true,
    },
    diamond: {
      required: true,
    },
    name: {
      required: true,
    },
    statusname: {
      required: true,
    },
  },
  data() {
    return {
      TypeStatusWallet: TypeStatusWallet,
    };
  },
  methods: {
    showDescription(id) {
      this.$emit("show", id);
    },
  },
};
</script>

<style scoped>
.btn-status {
  width: fit-content;
}

.card-layout {
  display: flex;
  justify-content: space-between;
}

.card-content {
  text-align: center;
  border: 1px solid #c3c3c3;
  box-shadow:2px 3px rgb(204, 198, 198);
  background-color: white;
  padding: 10px;
  border-radius: 12px;
  margin: 10px 0px 10px 0px;
}

.pending{
  background-color: sandybrown;
}

.coin{
  position:absolute;
  margin: 2px 0px 0px 3px;
  height: 20px;
  width: 20px;
}

.diamond{
  position:absolute;
  margin: 1px 0px 0px 3px;
  height: 20px;
  width: 20px;
}

.pending {
  background: #f4ba40;
  padding: 0px 5px;
  color: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.successful {
  background: #4a8556;
  padding: 0px 5px;
  color: #ffffff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.failed {
  background: #e15858;
  padding: 0px 5px;
  color: #ffffff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

i {
  display: flex;
  justify-content: end;
  cursor: pointer;
  margin: 10px 0px 0px 0px;
}

.icon-toggle {
  padding: 5px;
  border-radius: 7px;
}

@media (min-width: 1025px) {
  .pc {
    display: none;
  }
  i{
     display: none;
  }
}

@media (max-width: 1024px) {
  .toggle-content {
    padding-left: 43%;
  }
  .ip{
    display: none;
  }
}

@media (max-width: 768px) {
  .toggle-content {
    padding-left: 46%;
  }
  .ip{
    display: none;
  }
}

@media (min-width: 768px) {
  .pc {
    display: none;
  }
}

@media (min-width: 416px) {
  .pc {
    display: none;
  }
}

@media (max-width: 415px) {
  .mobile {
    display: none;
  }
  .toggle-content {
    text-align: left;
    padding-left: 0px;
  }
  .coin{
    content: icon;
  }
  
}
</style>
