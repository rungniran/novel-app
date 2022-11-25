<template>
  <div class="nv-box-white nv-mt-40">
    <h1 class="center-text font-title">จัดการอุปกรณ์</h1>
    <div class="center-text">
      <p>
        คุณสามารถจัดการอุปกรณ์ที่เข้าใช้งานบนเว็บไซต์ได้
        เนื่องจากการเข้าใช้งานบัญชีของคุณถูกจำกัดให้ใช้งานได้ 5 อุปกรณ์เท่านั้น
      </p>
      <p>
        ดังนั้น อุปกรณ์ใดของคุณที่ไม่ได้ใช้งานเเล้วสามารถ "ออกจากระบบ"
        เพื่อไม่ให้เสียสิทธิ์การเข้าใช้งานระบบขอบคุณครับ
      </p>
    </div>

    <table class="pc">
      <tr class="header-table">
        <th>Device</th>
        <th>Device name</th>
        <th>Platform</th>
        <th>วันที่ใช้งานล่าสุด</th>
        <th>ลบอุปกรณ์</th>
      </tr>
      <tr v-for="(item, index) in deviceData" :key="index">
        <td class="center-text">
          {{ item.abilities.device }}
        </td>
        <td class="center-text">
          {{ item.abilities.device_name }}
        </td>
        <td class="center-text">
          {{ item.abilities.platform }}
        </td>
        <td class="center-text">
          {{ $filter.toThaiDateString(item.last_used_at) }} น.
        </td>
        <td class="contain-icon">
          <div class="icon-delete">
            <div v-if="!item.status_current_device">
              <div @click="deleteDevice(item)" class="contain-content">
                <img class="icon-delete" :src="$path.svg('delete.svg')" />
              </div>
            </div>
            <div v-else>
              <div class="current-device">กำลังใช้งาน</div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table class="mobile">
      <tr class="header-table">
        <th>Platform</th>
        <th>ลบอุปกรณ์</th>
      </tr>
      <tr v-for="(item, index) in deviceData" :key="index">
        <td>
          <div class="mobile-layout">
            {{ item.abilities.device }}
          </div>
          <div class="mobile-layout">
            {{ item.abilities.device_name }}
          </div>
          <div class="mobile-layout">
            {{ item.abilities.platform }}
          </div>
          <div class="mobile-layout">
            {{ $filter.toThaiDateString(item.last_used_at) }} น.
          </div>
        </td>
        <td class="contain-icon">
          <div class="icon-delete">
            <div v-if="!item.status_current_device">
              <div @click="deleteDevice(item)" class="contain-content">
                <img class="icon-delete" :src="$path.svg('delete.svg')" />
              </div>
            </div>
            <div v-else>
              <div class="current-device">กำลังใช้งาน</div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <ConfirmDialogue ref="DeleteDevice" @close="close()"></ConfirmDialogue>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import { alert, closealert } from "@/shares/modules/alert";

export default Vue.extend({
  name: "Device",
  // el:'#app',
  components: {
    // NovelConfirm: () => import("@/components/widget/NovelConfirm.vue"),
  },
  data() {
    return {
      current: "userinfo",
      file: null,
      deviceData: null,
      messages: "",
    };
  },

  methods: {
    testnoti(data:any){
      console.log(data)
    },
    async gotDevice() {
      let res = await Gatway.getService("/customers/my-device");
      // console.log(res.data.data);
      this.deviceData = res.data.data;
    },
    async deleteDevice(item: any) {
      console.log(item);
      let confirm = await (this as any).$refs.DeleteDevice.show({
        title: "ลบอุปกรณ์",
        message: `คุณต้องการ Logout ออกจากอุปกรณ์นี้หรือไม่?`,
        okButton: "ยืนยัน",
      });
      if (confirm === true) {
        const res = await Gatway.DelService(
          `/customers/delete-device/${item.id}`
        );
        await (this as any).$refs.DeleteDevice.close();
        if (res) {
          this.gotDevice();
          // this.moment[index.indexmoment].ep.splice(index.index, 1);
          alert("ลบอุปกรณ์สำเร็จ", "success");
          closealert("deleteEp", "conDeleteEp");
        }
      }
    },
  },
  mounted() {
    this.gotDevice();
  },
});
</script>

<style scoped>
.content {
  min-height: 10vh !important;
  background: linear-gradient(
    180deg,
    rgba(230, 222, 255, 0.433) 2.72%,
    rgba(175, 151, 249, 0.432) 100%
  );
  padding-bottom: 0px !important;
}
.contain-content {
  display: flex;
  justify-content: center;
  align-items: end;
}
.current-device {
  display: flex;
  justify-content: center;
  align-items: end;
  margin-top: 7px;
  color: #0bad10;
  font-weight: 300;
}
.center-text {
  text-align: center;
  padding: 8px;
}
.icon-delete {
  cursor: pointer;
}
table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  padding: 8px;
}

th {
  border-bottom: #9b5afb 1px solid;
}

td {
  border-bottom: #e6e6e6 1px solid;
}

.header-table {
  color: #9b5afb;
  font-weight: 600;
}
.font-title {
  font-size: 20px;
}
.mobile {
  display: none;
}
.icon-delete {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
}
.contain-icon {
  position: relative;
}
.current-device {
  white-space: nowrap;
}
.line-cut {
  width: 100%;
  border-bottom: #9b5afb 1px solid;
}
@media (max-width: 540px) {
  table {
    width: 100%;
    font-family: arial, sans-serif;
  }
  .mobile {
    display: table;
  }
  .mobile-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pc {
    display: none;
  }
}
</style>
