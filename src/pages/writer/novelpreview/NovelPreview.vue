<template>
  <div class="NovelPreview">
    <div class="nv-box-white nv-mt-40">
      <div class="box-nove">
        <div class="image-nv ">
          <img
            :src="
              getNover.image_data
                ? getNover.image_data.url
                : $path.svg('imgload.svg')
            "
            class="nv-img-novel"
             onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';"
            width="100%"
          />
        </div>
        <div class="detail">
          <div>
            <div class="nv-title line-1">{{ getNover.title }}</div>
            <div style="color: #fb9750">
              {{ getNover.publisher_novel_data_id }}
            </div>
            <div class="con-review">
              <NovelStar :rating="Math.round(getNover.avg_star)" />
              <span></span>
            </div>
            <div class="nv-mt-10">
              <router-link to="#" class="nv-tag">{{
                getNover.novel_category_data_id
              }}</router-link>
            </div>
            <div class="story-sub" style="margin-top: 15px; line-height: 1.6">
              {{ getNover.detail }}
            </div>
            <div class="view-list nv-mt-10">
              <div class="view">
                <i class="far fa-eye"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(getNover.total_view) }}
                </div>
              </div>
              <div class="list">
                <i class="fas fa-list"></i>
                <div class="count-numble-view">
                  {{ $filter.NumbertoText(EpisodeData.data.length) }}
                </div>
              </div>
            </div>
          </div>
          <div class="grud-btn">
            <button class="nv-btn-orange" @click="Views">
              <i class="fas fa-chart-line"></i> ดูสถิติ
            </button>
            <router-link
              :to="
                '/writer/editnovel/' +
                getNover.menu_order +
                '/' +
                getNover.novel_data_type_id +
                '/' +
                getNover.id
              "
              ><button class="nv-btn-yellow">แก้ไข</button></router-link
            >

            <!-- <button class="nv-btn-light-blue">โปรโมชั่น</button> -->
            <button
              class="nv-btn-blue"
              @click="$base.openalert('deletenovel', 'conDeletenovel')"
            >
              ลบหนังสือ
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="nv-box-white nv-mt-40">
      <div>
        <div class="nv-col-2" style="padding-bottom: 20px">
          <div class="nv-title">สารบัญ</div>
          <div class="grud-btn">
            <router-link :to="'/writer/novelpreview/' + novelUuid + '/novelep'">
              <button class="nv-btn-yellow">เพิ่มตอนใหม่</button>
            </router-link>
            <!-- <button class="nv-btn-light-blue">ช่วงราคา</button> -->
          </div>
        </div>
        <div>
          <!-- <div class="nv-mt-20">
          <div v-for="(item, index) in EpisodeData" :key="index" class="episode">
             <div>#{{index + 1}} {{item.name}}</div>
             <div class="p-con-detail">
               <div v-if="item.coin != 0.00" class="coin">
                 <img :src="$path.image('coin-gold.png')" width="20px" />
                 {{item.coin}}
               </div> 
               <div v-else class="coin">

               </div>
               {{item.timestamp}}
              <div class="grud-btn-manager">
                <router-link :to="'/writer/novelpreview/'+ novelUuid + '/novelep/'+ item.id" class="grud-btn-manager"> 
                  <img :src="$path.svg('edit.svg')"> 
                </router-link>
               
       
                <div @click="$base.openalert('deleteEP', 'conDeleteEp'); epObj = item; epIndex = index" class="grud-btn-manager">
                  <img :src="$path.svg('delete.svg')">  
                </div>  
              </div>
             </div>
          </div>
          </div> -->

          <div v-for="(item, indexmoment) in moment" :key="indexmoment">
            <div v-if="item.ep.length" class="box-price_range" @click="openEp(indexmoment)">
              <div>{{ item.moment }}</div>
              <div>
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
            <div class="container-ep">
              <div
                v-for="(item, index) in item.ep"
                :key="index"
                :class="'episode episode' + index"
              >
                <div class="line-1">#{{ item.ep_no }} {{ item.name }}</div>
                <div class="p-con-detail">
                  <div v-if="item.coin != 0.0" class="coin">
                    <img :src="$path.image('coin-gold.png')" width="20px" />
                    {{ item.coin }}
                  </div>
                  <div v-else class="coin"></div>
                  {{ item.timestamp }}
                  <div class="grud-btn-manager">
                    <router-link
                      :to="
                        '/writer/novelpreview/' +
                        novelUuid +
                        '/novelep/' +
                        item.id
                      "
                      class="grud-btn-manager"
                    >
                      <img :src="$path.svg('edit.svg')" />
                    </router-link>

                    <div
                      @click="
                        $base.openalert('deleteEP', 'conDeleteEp');
                        epObj = item;
                        epIndex = index;
                        momentIndex = indexmoment;
                      "
                      class="grud-btn-manager"
                    >
                      <img :src="$path.svg('delete.svg')" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nv-box-white nv-mt-40" id="series">
      <!-- {{EpisodeData}} -->
      <div class="series">
        <select name="cars" id="cars" @change="test">
          <option value="volvo">รวมทุกตอน</option>
          <option
            v-for="(item, index) in EpisodeData.data"
            :key="index"
            value="volvo"
            
          >
          <span v-if="item.name.length > 50">  {{ item.name.slice(0, 50) }}...</span>
          <span v-else>  {{ item.name }}</span>
          </option>
        </select>
      </div>
      <br />
      <div>
        <div>สถิติการขายรวม</div>
        <div class="series">
          <apexchart
            width="100%"
            type="bar"
            :options="chartOptions"
            :series="series"
            ref="chartSell"
          ></apexchart>
          <apexchart
            width="100%"
            type="line"
            :options="chartOptions"
            :series="series"
            ref="chartSell1"
          ></apexchart>
        </div>
      </div>
      <div>
        <div>สถิติยอดวิวรวม</div>
        <div class="series">
          <apexchart
            width="100%"
            type="bar"
            :options="chartOptions"
            :series="series"
            ref="chartView"
          ></apexchart>
          <apexchart
            width="100%"
            type="line"
            :options="chartOptions"
            :series="series"
            ref="chartView1"
          ></apexchart>
        </div>
      </div>
    </div>
    <NovelConfirm
      color="#ffb900"
      title="ยืนยันการลบนิยาย"
      :button="true"
      @confirm="deleteConfirm($event)"
      id="deletenovel"
      idcon="conDeletenovel"
    >
      <template v-slot:body>
        <div>ข้อควรระวัง การลบหนังสือมีเงื่อนไขต่อไปนี้</div>
        <ul class="confirm-waning">
          <li class="">ไม่สามารถค้นหาหนังสือในระบบได้อีก</li>
          <li class="">ไม่สามารถกู้คืนหนังสือที่ลบแล้วได้</li>
          <li class="">นักอ่านยังสามารถอ่านหนังสือเคยซื้อไปแล้วได้</li>
        </ul>
        <div>พิมพ์คำว่า "ลบนิยาย" ในกล่องด้านล่าง เพื่อ ยืนยันการลบหนังสือ</div>
        <div class="nv-mt-10">
          <input
            v-model="confirm"
            id="confirm"
            placeholder="พิมพ์คำว่า 'ลบนิยาย'"
          />
        </div>
      </template>
    </NovelConfirm>
    <NovelConfirm
      color="#ffb900"
      title="ยืนยันการลบ"
      @confirm="deleteConfirm($event)"
      id="deleteEP"
      idcon="conDeleteEp"
    >
      <template v-slot:body> คุณลบนิยาย {{ epObj.name }} </template>
      <template v-slot:button>
        <button
          @click="deleteEP"
          class="confirm"
          style="background: #ffb900; border: 1px solid #ffb900"
        >
          ยืนยัน
        </button>
      </template>
    </NovelConfirm>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway, GetService } from "../../../shares/services";
import { alert, loadbtn, closealert } from "@/shares/modules/alert";
export default Vue.extend({
  name: "NovelPreview",
  components: {
    NovelStar: () => import("@/components/widget/NovelStar.vue"),
    NovelConfirm: () => import("@/components/widget/NovelConfirm.vue"),
    // eslint-disable-next-line vue/no-unused-components
    NovelModal: () => import("@/components/widget/NovelModal.vue"),
  },
  data() {
    return {
      review: [...Array(6).keys()],
      price_range: [...Array(6).keys()],
      img: "https://pbs.twimg.com/media/EsBPBp1XEAMVZxC.jpg",
      getNover: {} as any,
      novelUuid: this.$route.params.id,
      EpisodeData: [],
      confirm: "",
      confirmEp: null,
      nameEP: "" as string,
      epObj: {} as any,
      epIndex: 0,
      moment: [] as any[],
      momentIndex: 0,
      eplength: "",
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60],
        },
      ],
      chartOptions: {
        chart: {
          id: "realtime",
          height: 350,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 500,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
    };
  },
  methods: {
    async getnNovel() {
      const resGetNovel = await GetService.getNovel(this.$route.params.id);
      console.log(resGetNovel.data.data);

      this.getNover = await resGetNovel.data.data;
    },
    async getListEp() {
      const resEpisodeData = await Gatway.getService(
        `/customers/episode_data/index/${this.$route.params.id}`
      );
      this.EpisodeData = await resEpisodeData.data.data;
      this.eplength = resEpisodeData.data.data.data.length;
      this.momentEp(resEpisodeData.data.data.data);
    },
    confirmDelete() {
      this.confirm === "ลบนิยาย"
        ? this.delete()
        : document.getElementById("confirm")?.classList.add("err");
    },
    deleteConfirm(value: any) {
      value.value === true
        ? this.confirmDelete()
        : document.getElementById("confirm")?.classList.remove("err");
    },
    async delete() {
      loadbtn("add");
      const res = await Gatway.DelService(
        `/customers/novel/${this.$route.params.id}`
      );
      if (res) {
        loadbtn("remove");
        alert(res.data.data, "success");
        this.$router.push("/writer");
      }
    },
    // ConfirmdeleteEp(value?:any, uuid?:string){
    //   value.value === true
    //   ? this.deleteEP(value.uuid, value.index)
    //   : closealert('deleteEp', 'conDeleteEp')

    // },
    async deleteEP() {
      // let moment:any[] = this.moment[0]
      // console.log(moment);
      this.moment[this.momentIndex].ep.splice(this.epIndex, 1);
      const res = await Gatway.DelService(
        `/customers/episode_data/${this.epObj.id}`
      );
      if (res) {
        this.moment[this.momentIndex];
        this.moment[this.momentIndex].ep.splice(this.epIndex, 1);
        // this.EpisodeData.splice(this.epIndex, 1);
        alert(res.data.data, "success");
        closealert("deleteEp", "conDeleteEp");
      }
    },

    filterEp(key: any) {
      return this.EpisodeData.filter((item: any) => {
        console.log(item.id);
        return item.id.match(key);
      });
    },
    momentEp(countEp: any) {
      let arraymoment = [] as any;
      let count = countEp.length / 50;
      let momentCount = count + 0.0;
       let ep = 0;
      let [eplast, eplastStas]  = [50,50] as any[];
      if (countEp.length > 0) {
        for (let i = 0; i < ~~momentCount + 1; i++) {
          if (countEp.length <= eplast) {
            arraymoment.push({
              moment: `บทที่ ${ep + 1} - ${countEp.length}`,
              ep: countEp.slice(ep, eplast),
            });
              ep = +eplast;
            eplast = eplast + eplast;
          } else {
            arraymoment.push({
              moment: `บทที่ ${ep + 1} - ${eplast}`,
              ep: countEp.slice(ep, eplast),
            });
            ep =+ eplast;
            eplast = eplast + eplastStas;
          }
        }
      }
      this.moment = arraymoment;
    },
    openEp(key: any) {
      let containerEP = document.getElementsByClassName("container-ep")[
        key
      ] as HTMLElement;
      // containerEP.style.display = "block"
      if (containerEP.style.display === "block") {
        containerEP.style.display = "none";
      } else {
        containerEP.style.display = "block";
      }
    },
    Views() {
      let series = document.getElementById("series") as HTMLElement;
      console.log(series.offsetHeight);
      window.scrollTo({ top: series.offsetHeight, behavior: "smooth" });
    },
    test() {
      const limit = 100
      let Sell = [
        Math.floor(Math.random() * limit),
        Math.floor(Math.random() * limit),
        Math.floor(Math.random() * limit),
        Math.floor(Math.random() * limit),
        Math.floor(Math.random() * limit),
        Math.floor(Math.random() * limit),
      ];
      let View = [
        Math.floor(Math.random() * limit),
        Math.floor(Math.random() * limit),
        Math.floor(Math.random() * limit),
        Math.floor(Math.random() * limit),
        Math.floor(Math.random() * limit),
        Math.floor(Math.random() * limit),
      ];
      (this as any).$refs.chartSell.updateSeries([
        {
          data: Sell as any,
        },
      ]);
      (this as any).$refs.chartSell1.updateSeries([
        {
          data: Sell as any,
        },
      ]);
      (this as any).$refs.chartView.updateSeries([
        {
          data: View as any,
        },
      ]);
      (this as any).$refs.chartView1.updateSeries([
        {
          data: View as any,
        },
      ]);
    },
  },
  mounted() {
    this.getnNovel();
    this.getListEp();
  },
});
</script>
<style lang="scss" scoped>
.box-nove {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  grid-gap: 30px;
}
.detail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.grud-btn {
  display: flex;
  align-items: center;
  grid-gap: 10px;
}
.story {
  margin: 10px 0px;
  font-family: "Sarabun", sans-serif;
  font-weight: 500;
  color: #4e4e4e;
}
.story-sub {
  font-family: "Sarabun", sans-serif;
}
.image-nv {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-price_range {
  background: #61bcbe;
  display: flex;
  color: #fff;
  justify-content: space-between;
  padding: 20px 20px;
  border-radius: 5px;
  margin: 5px 0px;
  transition: 0.3s;
  cursor: pointer;
}
// .box-price_range:hover {
//   transform: scale(1.01);
//   background: #61bcbed2;
// }
.ep {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  padding: 20px;
  border-top: 1px solid #bbbbbb;
}
.ep0 {
  border-top: 0px solid #61bcbe80;
}
.detail-ed {
  display: flex;
  justify-content: space-between;
}
.count-coin {
  margin-left: 5px;
  color: #febc2a;
}
.con-coin {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-ep {
  display: none;
  margin: 0px 15px;
}
.fa-chevron-right {
  transition: 0.3s;
}
.writer-sarabun {
  display: flex;
  justify-content: space-between;
}
.writer-detail {
  display: flex;
  align-items: center;
  grid-gap: 30px;
}
.con-review {
  display: flex;
  align-items: center;
}
.confirm-waning {
  padding: 10px;
  border: 2px solid #febc2a;
  margin: 20px 0px;
  line-height: 1.6;
  font-size: 12px;
  border-radius: 5px;
}
.episode {
  padding: 20px 0px;
  border-top: 1px solid rgb(209, 209, 209);
  display: grid;
  grid-template-columns: 1.8fr 1fr;
}
.p-con-detail {
  display: flex;
  grid-gap: 40px;
  align-items: center;
  justify-content: space-between;
}
.grud-btn-manager {
  display: flex;
  grid-gap: 20px;
  align-items: center;
}
#deleteEP {
  width: 200px !important;
}
.coin {
  width: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #febc2a;
}
.episode0 {
  border-top: 0px solid;
}
.series {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
// .nv-img-novel{
//   border-radius: 5px;
// }
@media (max-width: 1024px) {
  .box-nove {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
  .image-nv img {
    width: 40%;
  }
}
@media (max-width: 768px) {
  .box-nove {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
  .image-nv img {
    width: 40%;
  }
}
@media (max-width: 415px) {
  .box-nove {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
  .image-nv img {
    width: 70%;
  }
}
</style>
