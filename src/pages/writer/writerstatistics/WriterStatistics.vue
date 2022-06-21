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
          <option v-for="(item, index) in mywork" :key="index" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <div>สถิติการขายรวม</div>
      <!-- <div class="series"> -->
        <apexchart
          width="100%"
          type="line"
           height="350"
          :options="sellchartOptions"
          :series="sellseries"
           ref="chartSell"
        ></apexchart>
        <!-- <apexchart
          width="100%"
          type="line"
          :options="sellchartOptions"
          :series="sellseries"
        ></apexchart> -->
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
  <div v-else class="not-novel">คุณยังไม่มีนิยาย</div>
</template>

<script lang="ts">
import Vue from "vue";
import NovelStar from "@/components/widget/NovelStar.vue";
import { ListService, Gatway } from "@/shares/services";
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
          data: [...Array(4).keys()]  as any,
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
        xaxis: {
          categories: [] as any,
        },
      },
      viewseries: [
        {
          name: "series-1",
          data: []  as any,
        },
      ],
    //   viewchartOptions: {
    //     chart: {
    //       id: "realtime",
    //       height: 350,
    //       type: "line",
    //       animations: {
    //         enabled: true,
    //         easing: "linear",
    //         dynamicAnimation: {
    //           speed: 500,
    //         },
    //       },
    //       toolbar: {
    //         show: false,
    //       },
    //       zoom: {
    //         enabled: false,
    //       },
    //     },
    //     xaxis: {
    //     //   categories: [] as any,
    //       type: 'datetime',
    //     },
    //   },
      selectedValue: " ",
    };
  },
  components: {
    // NovelStar,
  },
  methods: {
    listNovel() {
      ListService.listNovel().then((res: any) => {
        console.log(res.data.data);

        this.mywork = res.data.data;
      });
    },
    async onChange(event) {
      console.log(event.target.value);
      let res = await Gatway.getService(
        `customers/dashboard/sales-summary-group-by-day?novel_data_id=${event.target.value}`
      );
    //   let resview = await Gatway.getService(
    //     `/customers/dashboard/view-group-by-day?novel_data_id=${event.target.value}`
    //   );
      console.log(res);
      let data = [] as any
      let dataview = [] as any

      this.sellchartOptions.xaxis.categories= await this.timeFrom(30, 'day')
      this.timeFrom(30).filter(element=>{
        this.sellchartOptions.xaxis.categories.push(element.split("-")[2])
        if(res.data.data[element] !== undefined){
          data.push(res.data.data[element] )
        }else{
            data.push(0)
        }
      });
       (this as any).$refs.chartSell.updateSeries([
        {
          data: data as any,
        },
      ]);
    },
    timeFrom(X: any, type?:any) {
      var dates = [] as any;
      for (let I = 0; I < Math.abs(X as any); I++) {
        const dataset = new Date(
          new Date().getTime() - (X >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000
        ).toLocaleString();
        const newfomet = dataset.split(",")[0].split("/");
        newfomet[2] + "-" + this.pad(newfomet[0]) + "-" + this.pad(newfomet[1]);
        if(type === 'day'){
          dates.push(this.pad(newfomet[1]))
        }else{
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
    pad(d) {
      return d < 10 ? "0" + d.toString() : d.toString();
    },
  },
  mounted() {
    this.sellchartOptions.xaxis.categories = this.timeFrom(30, 'day')
    this.listNovel();
    
    // this.timeFrom(30).forEach((Element:any) =>{
    //     this.sellchartOptions.xaxis.categories.push(Element.split("-")[2])
    // })
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
  grid-template-columns: 1fr 1fr ;
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
