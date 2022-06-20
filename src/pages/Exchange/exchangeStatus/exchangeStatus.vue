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
            <div v-if="profile">{{ this.$store.state.auth.display_name }}</div>
            <div v-if="profile">{{ profile.dragon }}</div>
          </div>
        </div>
        <div class="box-coin">
          <div class="nv-con-coin">
            <img :src="$path.image('diamond.png')" width="25px" height="25px" />
            {{ $filter.NumberToString(profile.diamond_balance) }}
          </div>
          <router-link to="/exchange"
            ><button class="nv-btn-yellow">แลกของ</button></router-link
          >
        </div>
      </div>
    </div>
    <div class="nv-box-white Exchangetable">
      <!-- <table>
        <tr>
          <th class="mobile">วันที่</th>
          <th class="mobile">เพรช</th>
          <th class="mobile">สถานะ</th>
        </tr>
        <tr v-for="item, index in list" :key="index">
          <td>{{item.system_note.name}}</td>
          <td>{{item.system_note.diamond}}</td>
          <td>{{item.delivery_status.name_preview}}</td>
        </tr>
      </table> -->
      <div class="card">
        <div v-for="(item, index) in list.reverse()" :key="index" class="card-content">
          <div>
            {{ $filter.toThaiDateString(item.created_at)}}
          </div>
          <div class="detail-content-name">
            <p class="mobile">ชื่อสินค้า:</p>
            <p>{{ item.system_note.name }}</p>
          </div>
          <div class="detail-content-diamond">
            <p class="mobile">จำนวนเพชร:</p>
            <p>
              {{ item.system_note.diamond }}
              <img
                class="diamond"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAfCAYAAAD9cg1AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPdSURBVHgB3ZVNaFxVFMfPfd/z3kxm4sQkrXQMKK7soqBYBLHV4k4EN6XQblwI4kYRFEFMpCIqWFy4UBRLd1pECsGFaUHdSEFBBFvTD5qUzKTJZDKTmfcx7817957e+6aTyUsyk0m7Kf3Dm3n345zfvfecex7A/aTfTs/lLv2xMrUbG2k3k8MW/qTo8uTKgvvhoDYDA379Zm6SgPQiNlVARj6qlIJXBrEbCHD+2/lXAXEqm8oCUAJBg3dSerpa8gr3DDh/plRglH1haiZIkhz3hV78DEcMfrxnAPODrxRZmUhxwEb5Nv+hcHCl6L1z14CZr28cB4SXM3pmyxgyDqmLFcAHqyXct2vA2bP/aQhwMrXhaDYr8vkmWpBD5p/ZNUBfUKckIk2kVAP6yecBR8TDt641Dw0M+Oy1mb1XLi++LlEVCOkfJhYCOGWEejH8fGAAMOUtFmH+5tUaRCGFfqIhwtoNMYc8PXvBPjwQgCI7rmsGtIIIrs8u84BidxCTzhslKuIANOAdMkzuCPjkxMwJ7mSPLrXP3mn4sLhQ4w4QgiqD1f8pVGcjCF0E5xYFDNt2LTsmPzM74+7tCwAivaHKKs+c7pBXi8CvIERNnjlNBHeJwdLfYdzuiLXi1DVQoW/2BJx6+88Uj+oBTdUTzHwuu2Ud4qjCeve8kL9SH0VSHOkJoGv+S3ymoRBlvS9jWaCrKmwnsRtx4dbb/F4QwKfm/sHctoCI4RFCCMhSFzCSzUIviVWHdncXIti8JbXq3WxKABjDJ5U7zhm3NjQtfvop8hC0NOFH0y4fgsCQPdsZVzZODqlv8UFgtBEDnKYMhfFxvqPel00bkmBsf/sIQw7z6+yk67jVbQFu0Bw1eI+itYNMGeUQD7JWuidg6JEuXDUJGKY6/fhj4391+pJLQ7QRMdFVrq1CPw0VkoVQlmllYzsB4AG+FLEwYVB3Xag79hbHokRlChJIiRCR6vBEaq4nQEL2HWURiEdIVVSwdBMWK6twvVjkMCd2bO0hkN8vg5En0FiM4pLR9s+mNy8kAfj056MX+N9Ft2Xz3NcgbXS/YmEUQbFchmVnBVJjEnSKrFhLvRTxooi8Kg1Qi0JGjymyvLT5GyNiY3suuI0WFP9tJMeouGTU0qTI3BHw5blj82nTOuQF7rwvruYd5w3PEfkdt921EEqXnXUba4RA6iGyYKRIdUeA0Hvfv3BFQnzeC51zbuDAmltfd96RXQ6gMt+EXIHY5qj88e8XfzmQHksvb/ZFYAe9f/SHJ1ikvKur5kFN0Qv7RsetkeFsOZPXl82MNv3wBJ569LlcDR5Y3QYrFsxTN9kflgAAAABJRU5ErkJggg=="
                alt="diamond"
              />
            </p>
          </div>
          <div class="detail-content-status">
            <p class="mobile">สถานะจัดส่ง:</p>
            <p>{{ item.delivery_status.name_preview }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import { shop_type_data_id } from "@/shares/constants/enum";
export default Vue.extend({
  name: "exchangeStatus",
  data() {
    return {
      list: [] as any,
    };
  },
  methods: {
    async getListstiger() {
      let res = await Gatway.getService("/customers/treasure-box-data/index");
      console.log(res);
      let data = [] as any;
      res.data.data.filter((res) => {
        let note = JSON.parse(res.system_note);
        // if (res.address) {
          // console.log(note);
          data.push({ ...res, system_note: note });
        // }
      });
      console.log(data);

      this.list = data;
    },
  },
  mounted() {
    this.getListstiger();
  },
});
</script>
<style lang="scss" scoped>
.card {
  align-items: center;
  margin: 20px 0px;
  gap: 15px;
  border-radius: 12px;
  background-color: white;
  padding: 10px 0px;
}

.card-content {
  width: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: 1px solid rgba(224, 175, 243, 0.977);
  margin: 7px;
  padding: 15px 20px;
  padding-left: 100px;
  background-color: white;
  border-radius: 12px;
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
.diamond {
  position: absolute;
  margin: 1px 0px 0px 3px;
  height: 20px;
  width: 20px;
}
.tap-writer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 5px;
  justify-items: center;
}

.detail-content-diamond {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
}

.detail-content-status {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
}

.detail-content-name {
  display: grid;
  grid-template-columns: 0.3fr 1fr;
}

.Exchangetable {
  padding: 0px;
}

@media (max-width: 768px) {
  .card-content {
    padding-left: 50px;
  }
  .detail-content-diamond {
    display: grid;
    grid-template-columns: 0.8fr 1fr;
  }

  .detail-content-status {
    display: grid;
    grid-template-columns: 0.8fr 1fr;
  }

  .detail-content-name {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
  }
}

@media (max-width: 415px) {
  .card-content {
    padding-left: 10px;
    display: grid;
    grid-template-columns: 1.5fr 0.7fr 1fr;
  }
  .mobile {
    display: none;
  }
  .detail-content-diamond {
    display: grid;
    grid-template-columns: 1fr;
  }

  .detail-content-status {
    display: grid;
    grid-template-columns: 1fr;
  }

  .detail-content-name {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
