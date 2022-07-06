<template>
  <div class="Exchange">
    <div v-if="list">
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
              <img
                :src="$path.image('diamond.png')"
                width="25px"
                height="25px"
              />
              {{ $filter.NumberToString(profile.diamond_balance) }}
            </div>
            <router-link to="/exchange"
              ><button class="nv-btn-yellow">แลกของ</button></router-link
            >
          </div>
        </div>
      </div>
      <div class="nv-box-white Exchangetable">
        <div class="card">
          <div v-for="(item, index) in list" :key="index" class="card-content">
            <div>
              {{ $filter.toThaiDateString(item.created_at) }}
            </div>
            <div class="detail-content-name">
              <p class="mobile">ชื่อสินค้า:</p>
              <p>{{ item.system_note.name }}</p>
            </div>
            <div class="detail-content-diamond">
              <p class="mobile">จำนวนเพชร:</p>
              <p class="mobile">
                {{ item.system_note.diamond }}
                <img
                  class="diamond"
                  :src="$path.image('diamond.png')"
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
        <div v-if="list.length === 0" class="boxno">
          <EmptyContent
            class="image"
            pathName="1.png"
            text="คุณยังไม่มีประวัติการเเลกของ"
            fontSize="36px"
          ></EmptyContent>
        </div>
        <div v-else>loading...</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import EmptyContent from "../../empty/empty.vue";
export default Vue.extend({
  name: "exchangeStatus",
  data() {
    return {
      list: null,
    };
  },
  methods: {
    async getListstiger() {
      let res = await Gatway.getService("/customers/treasure-box-data/index");
      if (res.data.data.length === 0) {
        this.list = res.data.data;
      } else {
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
      }
      console.log(res);
    },
  },
  components: {
    EmptyContent,
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
  grid-template-columns: 1fr 1.5fr 1fr 1fr;
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
  display: flex;
  justify-content: start;
  gap: 5px;
  grid-template-columns: auto auto;
}

.detail-content-status {
  display: grid;
  display: flex;
  justify-content: start;
  gap: 5px;
  grid-template-columns: auto auto;
}

.detail-content-name {
  display: grid;
  display: flex;
  justify-content: start;
  gap: 5px;
  grid-template-columns: auto auto;
}
.boxno {
  padding-bottom: 20px;
}
.Exchangetable {
  padding: 0px;
}
@media (max-width: 1024px) {
  .card-content {
    padding-left: 20px;
    grid-template-columns: 1fr 1.2fr 1fr 1fr;
  }
}

@media (max-width: 768px) {
}

@media (max-width: 415px) {
  .card-content {
    padding-left: 10px;
    display: grid;
    display: flex;
    justify-content: space-between;
    grid-template-columns: 1.5fr 1fr 1fr;
  }
  .mobile {
    display: none;
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
