<template>
  <div class="Statistics" v-if="wraning === true">
    <!-- {{mywork}} -->
    <!-- {{sellchartOptions.xaxis.categories}} -->
    <div class="ds">
      <div>
        <div>เลือกนิยาย</div>
        <div>
          <select
            id="inCategory"
            v-model="selectedValue"
            @change="onChange($event)"
          >
            <!-- <option value="AllNovel">--เลือกนิยาย--</option> -->
            <option
              v-for="(item, index) in mywork"
              :key="index"
              :value="item.id"
            >
              {{ item.title }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <div>เลือกเดือน</div>
        <div>
          <select @change="onChangeDate($event)" v-model="onDate" :disabled="dataset.length === 0 ? true : false">
            <option value="Allmoth" >ปี</option>
            <option v-for="(item, index) in dataset" :key="index" :value="item.key">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <!-- ปิดปรับปรุงกราฟสถิติโดยรวมชั่วคราว -->
      <div v-show="isgrab">จำนวนเหรียญ ( {{ $filter.NumberToString(total) }} )</div>
      <!-- <div class="series"> -->
      <!-- <div v-show="isgrab">
      กำลังโหลด....
    </div> -->
      <apexchart
        v-show="isgrab"
        width="100%"
        type="line"
        height="350"
        :options="sellchartOptions"
        :series="sellseries"
        ref="chartSell"
      ></apexchart>
      <div  v-show="!isgrab">
      กำลังโหลด....
      </div>
      <!-- </div> -->
    </div>
    <!-- <div v-else>
      กำลังโหลด....
    </div> -->
    <div>
      <div class="series"></div>
    </div>
  </div>
  <div v-else class="wbox">
    <EmptyContent
      pathName="2.png"
      text="ไม่พบข้อมูลสถิติโดยรวม..."
      :isSearch="false"
    ></EmptyContent>
  </div>
</template>

<script lang="ts">
const monthset = {
  "01": "ม.ค.",
  "02": "ก.พ.",
  "03": "มี.ค.",
  "04": "เม.ย.",
  "05": "พ.ค.",
  "06": "มิ.ย.",
  "07": "ก.ค.",
  "08": "ส.ค.",
  "09": "ก.ย.",
  "10": "ต.ค.",
  "11": "พ.ย.",
  "12": "ธ.ค.",
} as any;
// const monthset = {
//   "01": "มกราคม",
//   "02": "กุมภาพันธ์",
//   "03": "มีนาคม",
//   "04": "เมษายน",
//   "05": "พฤษภาคม",
//   "06": "มิถุนายน",
//   "07": "กรกฎาคม",
//   "08": "สิงหาคม",
//   "09": "กันยายน",
//   "10": "ตุลาคม",
//   "11": "พฤศจิกายน",
//   "12": "ธันวาคม",
// } as any;
import Vue from "vue";
import { ListService, Gatway } from "@/shares/services";
import EmptyContent from "../../empty/empty.vue";
// import api from "@/shares/services/testURL";
export default Vue.extend({
  name: "Statistics",
  props: {
    wraning: Boolean,
  },
  data() {
    return {
      mywork: [] as any,
      sellseries: [
        {
          name: "ยอดขาย",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as any,
        },
      ],
      sellchartOptions: {
        chart: {
          id: "realtime",

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
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: [] as any,
        },
      },
      viewseries: [
        {
          name: "รายได้",
          data: [] as any,
        },
      ],
      selectedValue: "allMonth" as any,
      selectmonth: [],
      total: '',
      dataset: [] as any,
      monthValue: {} as any,
      isgrab: true,
      IDNovel: "",
      onDate:'Allmoth',
      monthset:monthset
    };
  },
  components: {
    // NovelStar,
    EmptyContent,
  },
  methods: {
    async myworks() {
      let res = await Gatway.getService("/customers/novel");
      console.log(res.data.data[0],'dsssssssssssssssss');
      this.mywork = await res.data.data;
      await this.onChange({target:{value:res.data.data[0].id}})
      this.selectedValue =  res.data.data[0].id
    },
    async onChange(event: any) {
      this.dataset = []
      this.isgrab = false
      var d = new Date();
      let lastmonth = [] as any;
      this.onDate ='Allmoth'
      for (let i = 0; i <= 11; i++) {
        lastmonth.push(`01-${this.pad(d.getMonth() + 1)}-${d.getFullYear()}`);
        d.setMonth(d.getMonth() - 1);
      }
      console.log(event.target.value);
      if (event.target.value !== "AllNovel") {
        var test = await Gatway.getService(
          `customers/dashboard/sales-summary-group-by-day?novel_data_id=${
            event.target.value
          }&12month=true&dateStart=${lastmonth[lastmonth.length - 1]}&dateEnd=${
            lastmonth[0]
          }`
        );
      } else {
        // var test1 = await Gatway.getService(
        //   `customers/dashboard/sales-summary-group-by-day?month=09&year=2022`
        // );
        // console.log(test1);
      }
      this.IDNovel = test.data.data[0].id;
      this.setgrap(test.data.data);
    },
    async onChangeDate(event: any) {
      if(event.target.value !== 'Allmoth'){
        this.isgrab = false
        var datetime = event.target.value.split("-");
        console.log(this.pad(datetime[0]), datetime[1]);
        var test = await Gatway.getService(
          `customers/dashboard/sales-summary-group-by-day?novel_data_id=${this.IDNovel}&month=${this.pad(datetime[0])}&year=${datetime[1]}`
        );
        this.setgrapdate(test.data.data);
        // console.log( '>>>>>>>>',test.data.data[0].buy_total.length);
        let sd = [] as any
        for(let i in test.data.data[0].buy_total){
             sd.push(test.data.data[0].buy_total[i])  
            // console.log(i);
            
        }
        console.log(this.sumArray(sd));
        
      }else{
        this.onChange({target:{value:this.IDNovel}})
      }
    },
    async setgrapdate(data){
      let daycount = [] as any;
      let coin = [] as any;
      for (let item in data[0].buy_total) {
        let Ararrydataitem = item.split(" ")
        var Ararrydataitemtime = Ararrydataitem[0].split("-")
        // console.log(Ararrydataitemtime[1]);
        
        if(daycount.includes(`${Ararrydataitemtime[2]} ${monthset[Ararrydataitemtime[1]]}`) === false){
          daycount.unshift(`${Ararrydataitemtime[2]} ${monthset[Ararrydataitemtime[1]]}`);
          coin.unshift( parseFloat(data[0].buy_total[item]));
        }else{
          coin[0] += data[0].buy_total[item] 
        }  
      }
      this.isgrab = await true
      // console.log(coin);
      
      // console.log();
      this.total = this.sumArray(coin);
      (this as any).$refs.chartSell.updateOptions({
        xaxis: {
          categories: daycount.reverse(),
        },
        series: [
          {
            data: coin.reverse(),
          },
        ],
      });
      
    },

    async  setgrap(data, is = true) {
      let daycount = [] as any;
      let coin = [] as any;
      let showdaycount = [] as any
      for (let item in data[0].buy_total) {
        let Ararrydataitem = item.split("-")
        daycount.unshift({ name: `${monthset[this.pad(Ararrydataitem[0])]} ${Ararrydataitem[1]}`, key: item });
        showdaycount.unshift( `${monthset[this.pad(Ararrydataitem[0])]} ${Ararrydataitem[1]}` )
        coin.unshift(data[0].buy_total[item]);
      }
      if(is === true){
        this.dataset = daycount;
      }
      this.isgrab = await true
      this.total = this.sumArray(coin);
      (this as any).$refs.chartSell.updateOptions({
        xaxis: {
          categories: showdaycount.reverse(),
        },
        series: [
          {
            data: coin.reverse(),
          },
        ],
      });
    },
    sumArray(dataset: any){
     console.log(dataset);
     var total = 0;
      for (var i in dataset) {
        total += dataset[i];
      }
      return  total.toFixed(2);
     
    },


    async allMonth() {
      let dataset = [] as any;
      for (let item in this.dataset) {
        dataset.push({ count: this.dataset[item], month: item.split("-")[1] });
      }
      var result = Array.from(
        dataset.reduce(
          (countries, grant) =>
            countries.set(
              grant.month,
              (countries.get(grant.month) || 0) + +grant.count
            ),
          new Map()
        ),
        ([month, sum]) => ({ month, sum })
      );
      var monthName = [
        { name: "ม.ค.", key: "01" },
        { name: "ก.พ.", key: "02" },
        { name: "มี.ค.", key: "03" },
        { name: "เม.ย.", key: "04" },
        { name: "พ.ค.", key: "05" },
        { name: "มิ.ย.", key: "06" },
        { name: "ก.ค.", key: "07" },
        { name: "ส.ค.", key: "08" },
        { name: "ก.ย.", key: "09" },
        { name: "ต.ค.", key: "10" },
        { name: "พ.ย.", key: "11" },
        { name: "ธ.ค.", key: "12" },
      ] as any;
      var d = new Date();
      let lastmonth = [] as any;
      let sales = [] as any;

      d.setDate(1);
      let test = result.reverse();
      for (let i = 0; i <= 11; i++) {
        lastmonth.push(monthName[d.getMonth()]?.name + " " + d.getFullYear());
        d.setMonth(d.getMonth() - 1);
        console.log(test[i]);

        if (test[i] !== undefined) {
          sales.push(test[i].sum);
        } else {
          sales.push(0);
        }
      }
      var totalmo = 0;
      for (let i in sales) {
        totalmo += sales[i];
      }

      await (this as any).$refs.chartSell.updateOptions({
        xaxis: {
          categories: await lastmonth.reverse(),
        },
        series: [
          {
            data: await sales.reverse(),
          },
        ],
      });
    },

    daysInMonth(month: any, year: any) {
      return new Date(year, month, 0).getDate();
    },

    timeFrom(X: any, type?: any) {
      var dates = [] as any;
      for (let I = 0; I < Math.abs(X as any); I++) {
        const dataset = new Date(
          new Date().getTime() - (X >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000
        ).toLocaleString();
        const newfomet = dataset.split(",")[0].split("/");
        newfomet[2] + "-" + this.pad(newfomet[0]) + "-" + this.pad(newfomet[1]);
        if (type === "day") {
          dates.push(
            this.pad(newfomet[1]) + " " + monthset[this.pad(newfomet[0])]
          );
        } else {
          dates.push(
            newfomet[2] +
              "-" +
              this.pad(newfomet[0]) +
              "-" +
              this.pad(newfomet[1])
          );
        }
      }
      return dates;
    },
    pad(d: any) {
      return d < 10 ? "0" + d.toString() : d.toString();
    },
    async AllNovel() {
      var obj = [] as any;
      var total = [] as any;
      this.mywork.forEach((element: any, index: any) => {
        if (element.buy_total.length === undefined) {
          for (var item in element.buy_total) {
            total.push(this.mywork[index].buy_total[item]);
            let hasMagenicVendor = obj.some(
              (vendor: any) => vendor["date"] === item
            );
            if (hasMagenicVendor === false) {
              obj.push({ date: item, coin: element.buy_total[item] });
            } else {
              const index = obj.findIndex((object) => {
                return object.date === item;
              });
              obj[index].coin += element.buy_total[item];
            }
          }
        }
      });
      let totalsum = 0;
      var monthName = [
        { name: "ม.ค.", key: "1" },
        { name: "ก.พ.", key: "2" },
        { name: "มี.ค.", key: "3" },
        { name: "เม.ย.", key: "4" },
        { name: "พ.ค.", key: "5" },
        { name: "มิ.ย.", key: "6" },
        { name: "ก.ค.", key: "7" },
        { name: "ส.ค.", key: "8" },
        { name: "ก.ย.", key: "9" },
        { name: "ต.ค.", key: "10" },
        { name: "พ.ย.", key: "11" },
        { name: "ธ.ค.", key: "12" },
      ] as any;
      var d = new Date();
      let lastmonth = [] as any;
      let saraly = [] as any;
      for (let i = 0; i <= 10; i++) {
        const index = obj.findIndex((object) => {
          return object.date === d.getMonth() + 1 + "-" + d.getFullYear();
        });
        if (index !== -1) {
          saraly.unshift(obj[index].coin);
        } else {
          saraly.unshift(0);
        }
        lastmonth.unshift(
          monthName[d.getMonth()]?.name + " " + d.getFullYear()
        );
        d.setMonth(d.getMonth() - 1);
      }
      this.isgrab = await false;
      await (this as any).$refs.chartSell.updateOptions({
        xaxis: {
          categories: await lastmonth,
        },
        series: [
          {
            data: await saraly,
          },
        ],
      });
    },
    async test(novel) {
      if (novel === "AllNovel") {
        this.AllNovel();
      } else {
        var monthName = [
          { name: "ม.ค.", key: "1" },
          { name: "ก.พ.", key: "2" },
          { name: "มี.ค.", key: "3" },
          { name: "เม.ย.", key: "4" },
          { name: "พ.ค.", key: "5" },
          { name: "มิ.ย.", key: "6" },
          { name: "ก.ค.", key: "7" },
          { name: "ส.ค.", key: "8" },
          { name: "ก.ย.", key: "9" },
          { name: "ต.ค.", key: "10" },
          { name: "พ.ย.", key: "11" },
          { name: "ธ.ค.", key: "12" },
        ] as any;
        var d = new Date();
        let lastmonth = [] as any;
        let saraly = [] as any;
        for (let i = 0; i <= 10; i++) {
          lastmonth.unshift(
            monthName[d.getMonth()]?.name + " " + d.getFullYear()
          );
          if (
            this.selectedValue.buy_total[
              d.getMonth() + 1 + "-" + d.getFullYear()
            ] !== undefined
          ) {
            saraly.unshift(
              this.selectedValue.buy_total[
                d.getMonth() + 1 + "-" + d.getFullYear()
              ]
            );
          } else {
            saraly.unshift(0);
          }
          d.setMonth(d.getMonth() - 1);
        }
        var total = 0;
        for (var i in this.selectedValue.buy_total) {
          total += this.selectedValue.buy_total[i];
        }
        // this.total = total;
        this.isgrab = false;
        await (this as any).$refs.chartSell.updateOptions({
          xaxis: {
            categories: await lastmonth,
          },
          series: [
            {
              data: await saraly,
            },
          ],
        });
      }
    },
  },
  async mounted() {
    await this.myworks();

    this.monthValue = "allMonth";
  },
});
</script>

<style lang="scss" scoped>
.ds {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
.Statistics {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
}
.series {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.con-statistics {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.cover-statistics {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
}

.con-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.nv-btn-orange {
  padding: 5px 10px;
  font-size: 13px;
}
.img-pre {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
.name {
  font-size: 18px;
  color: #1e2046;
}
.wbox {
  margin-top: 85px;
}

@media (max-width: 1024px) {
}
@media (max-width: 768px) {
  .series {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 415px) {
  .series {
    grid-template-columns: 1fr;
  }
  .wbox {
    margin-top: 30px;
  }
}
</style>
