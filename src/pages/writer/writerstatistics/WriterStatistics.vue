<template>
  <div class="Statistics" v-if="wraning === true">
    <!-- {{mywork}} -->
    <!-- {{sellchartOptions.xaxis.categories}} -->
    <div>
      <div>เลือกนิยาย</div>
      <div class="series">
        <select
          id="inCategory"
          v-model="selectedValue"
          @change="onChange($event)"
        >
         <option value="AllNovel">รวมทุกเรื่อง</option>
          <option v-for="(item, index) in mywork" :key="index" :value="item.id">
            {{ item.title }}
          </option>
        </select>
        <!-- v-model="selectedValue"
          @change="onChange($event)" -->
        <select
          id="inCategory"
          @change="onChangemonth($event)"
          v-model="monthValue"
        >
          <!-- <option value="" :selected="true">--</option> -->
          <option value="allMonth" :selected="true">รวมทุกเดือน</option>
          <option
            v-for="(item, index) in selectmonth"
            :key="index"
            :value="item"
          >
            {{ item.name }} {{ item.year }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <div>จำนวนเหรียญ ( {{ total }} )</div>
      <!-- <div class="series"> -->
      <apexchart
        width="100%"
        type="line"
        height="350"
        :options="sellchartOptions"
        :series="sellseries"
        ref="chartSell"
      ></apexchart>
      <!-- </div> -->
    </div>
    <div>
      <!-- <div>สถิติยอดวิวรวม</div> -->
      <div class="series">
        <!--   <apexchart
          width="100%"
          type="bar"
          :options="viewchartOptions"
          :series="viewseries"
           ref="chartview"
        ></apexchart>
       <apexchart
          width="100%"
          type="line"
          :options="options"
          :series="series"
        ></apexchart> -->
      </div>
    </div>
  </div>
  <div v-else class="not-novel">
    <EmptyContent pathName="2.png" text="ไม่พบข้อมูลสถิติ..." :isSearch=false ></EmptyContent>
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
};

import Vue from "vue";
import { ListService, Gatway } from "@/shares/services";
import  EmptyContent  from "../../empty/empty.vue";
export default Vue.extend({
  name: "Statistics",
  props: {
    wraning: Boolean,
  },
  data() {
    return {
      mywork: [],
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
      selectedValue: "allMonth",
      selectmonth: [],
      total: 0,
      dataset: [] as any,
      monthValue: {} as any,
    };
  },
  components: {
    // NovelStar,
    EmptyContent
  },
  methods: {
    listNovel() {
      ListService.listNovel().then((res: any) => {
        console.log(res.data.data);

        this.mywork = res.data.data;
      });
    },
    async onChange(event: any) {
      this.monthValue = "";
      this.setdata(event.target.value)
      // let res = event.target.value === 'AllNovel'
      // ? await Gatway.getService(`customers/dashboard/sales-summary-group-by-day`)
      // : await Gatway.getService(`customers/dashboard/sales-summary-group-by-day?novel_data_id=${event.target.value}`);
      // this.dataset = res.data.data;
      // let month = [] as any;
      // let dataset = res.data.data;
      // for (let item in dataset) {
      //   month.push({
      //     name: monthset[item.split("-")[1]],
      //     key: item.split("-")[1],
      //     year: item.split("-")[0],
      //   });
      // }
      // let uniqueIds = [] as any;
      // const unique = month.filter((element) => {
      //   const isDuplicate = uniqueIds.includes(element.key);
      //   if (!isDuplicate) {
      //     uniqueIds.push(element.key);
      //     return true;
      //   }
      //   return false;
      // });

      // this.selectmonth = unique;
      // let data = [] as any;
      // this.timeFrom(11).filter((element: any) => {
      //   this.sellchartOptions.xaxis.categories.push(element.split("-")[2]);
      //   if (res.data.data[element] !== undefined) {
      //     data.push(res.data.data[element]);
      //   } else {
      //     data.push(0);
      //   }
      // });
      // var total = 0;
      // for (var i in data) {
      //   total += data[i];
      // }
      // this.total = total;
      // (this as any).$refs.chartSell.updateOptions({
      //   xaxis: {
      //     categories: this.timeFrom(11, "day").reverse(),
      //   },
      //   series: [
      //     {
      //       data: data.reverse() as any,
      //     },
      //   ],
      // });
      // this.allMonth()
       this.monthValue = 'allMonth'
    },

    async setdata(key:any){
      
      let res = key === 'AllNovel'
      ? await Gatway.getService(`customers/dashboard/sales-summary-group-by-day`)
      : await Gatway.getService(`customers/dashboard/sales-summary-group-by-day?novel_data_id=${key}`);
      this.dataset = await res.data.data;
      let month = [] as any;
      console.log(res.data.data);
      
      let dataset = await res.data.data;
      for (let item in dataset) {
        month.push({
          name: monthset[item.split("-")[1]],
          key: item.split("-")[1],
          year: item.split("-")[0],
        });
      }
      console.log(month);
      
      let uniqueIds = [] as any;
      const unique = await month.filter((element) => {
        const isDuplicate = uniqueIds.includes(element.key);
        if (!isDuplicate) {
          uniqueIds.push(element.key);
          return true;
        }
        return false;
      });

      this.selectmonth = await unique;
      let data = [] as any;
      this.timeFrom(11).filter((element: any) => {
        this.sellchartOptions.xaxis.categories.push(element.split("-")[2]);
        if (res.data.data[element] !== undefined) {
          data.push(res.data.data[element]);
        } else {
          data.push(0);
        }
      });
      var total = 0;
      for (var i in data) {
        total += data[i];
      }
      this.total = total;
      this.allMonth()
    },

    onChangemonth(event: any) {
      if (event.target.value === "allMonth") {
        this.allMonth()
      } else {
        this.daysInMonth(1, this.monthValue?.year);
        let count = this.daysInMonth(
          this.monthValue?.key,
          this.monthValue?.year
        );
        let daycount = [] as any;
        let data = [] as any;
        for (let i = 1; i < count + 1; i++) {
          daycount.push(i)
          if (
            this.dataset[
              this.monthValue?.year +
                "-" +
                this.monthValue?.key +
                "-" +
                this.pad(i)
            ] !== undefined
          ) {
            data.push(
              this.dataset[
                this.monthValue?.year +
                  "-" +
                  this.monthValue?.key +
                  "-" +
                  this.pad(i)
              ]
            );
          } else {
            data.push(0);
          }
        }
        // console.log(data);
        
        var total = 0;
        for (let i in data) {
          total += data[i];
        }
        this.total = total;
        (this as any).$refs.chartSell.updateOptions({
          xaxis: {
            categories: daycount,
          },
          series: [
            {
              data: data,
            },
          ],
        });
      }
    },

    allMonth(){
      let dataset = [] as any
        for(let item in this.dataset){
          dataset.push({ count:this.dataset[item], month:item.split('-')[1]})
        }
        // console.log(dataset);
        
        var result = Array.from(
          dataset.reduce( (countries, grant) =>
              countries.set(grant.month, 
                  (countries.get(grant.month) || 0) + +grant.count), 
              new Map() ),
          ([month, sum]) => ({ month, sum })
        );
        // console.log('sss',result);
        var monthName = [
          { name:"ม.ค.",key:'01'},
          { name:"ก.พ.",key:"02"},
          { name:"มี.ค.",key:"03"},
          { name:"เม.ย.",key:"04"},
          { name:"พ.ค.",key:"05"},
          { name:"มิ.ย.",key:"06"},
          { name:"ก.ค.",key:"07"},
          { name:"ส.ค.",key:"08"},
          { name:"ก.ย.",key:"09"},
          { name:"ต.ค.",key:"10"},
          { name:"พ.ย.",key:"11"},
          { name:"ธ.ค.",key:"12"},
        ] as any;
        var d = new Date();
        let lastmonth = [] as any
        let sales = [] as any
      
        d.setDate(1);
        console.log('dsffd',result);
        let test = result.reverse()
        for  ( let i = 0;  i <= 11; i++) {
          lastmonth.push(monthName[d.getMonth()]?.name + " " + d.getFullYear())
          d.setMonth(d.getMonth() - 1);
          console.log(test[i]);
          
          if( test[i] !== undefined){
            sales.push(  test[i].sum)
          }else{
            sales.push(0)
          }
          

          // console.log();

        }
        var totalmo = 0;
        for (let i in sales) {
          // console.log(sales[i]);
          
          totalmo += sales[i];
        }
        // console.log(totalmo);
        console.log(lastmonth);
        console.log(sales)
        
        this.total = totalmo;
        (this as any).$refs.chartSell.updateOptions({
          xaxis: {
            categories: lastmonth.reverse(),
          },
          series: [
            {
              data: sales.reverse(),
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
  },
  mounted() {
    // this.sellchartOptions.xaxis.categories = this.timeFrom(11, "day");
    this.listNovel();
    // setTimeout(() => {
      this.setdata('AllNovel')
      this.selectedValue = 'AllNovel'
      this.monthValue = 'allMonth'
    // }, 2000);
    
  },
});
</script>

<style lang="scss" scoped>
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
.not-novel {
  margin-top: -35px;
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
}
</style>
