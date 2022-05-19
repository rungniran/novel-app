<template>
    <div class="Statistics">
        <!-- <div
            v-for="(item, index) in mywork"
            :key="index"
            class="con-statistics"
        >
            <div class="cover-statistics">
                <div>
                    <img
                        :src="item.image_data.url"
                        class="img-pre nv-img-novel"
                        width="100%"
                    />
                </div>
                <div class="detail">
                    <div class="name line-1">
                        {{item.title}}
                    </div>
                    <div class="gray">แฟนตาซี</div>
                    <div>
                        <NovelStar :rating="Math.round (item.avg_star)"/>
                    </div>
                    <div class="view-list">
                        <div class="view">
                            <i class="far fa-eye"></i>
                            <div class="count-numble-view">
                                {{ $filter.NumbertoText(4000) }}
                            </div>
                        </div>
                        <div class="list">
                            <i class="fas fa-list"></i>
                            <div class="count-numble-view">
                                {{ $filter.NumbertoText(20320) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="con-btn">
                <div class="nv-btn-orange">
                    <i class="fas fa-chart-line"></i> ดูสถิติ
                </div>
            </div>
        </div> -->
        <div>
            <div>สถิติการขายรวม</div>
            <div class="series">
                <apexchart width="100%" type="bar" :options="options" :series="series"></apexchart>
                <apexchart width="100%" type="line" :options="options" :series="series"></apexchart>
            </div>
        </div>
         <div>
            <div>สถิติยอดวิวรวม</div>
            <div class="series">
                <apexchart width="100%" type="bar" :options="options" :series="series"></apexchart>
                <apexchart width="100%" type="line" :options="options" :series="series"></apexchart>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import NovelStar from "@/components/widget/NovelStar.vue";
import { ListService} from '@/shares/services'
export default Vue.extend({
    name: "Statistics",
    data() {
        return {
            mywork: [],
            options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
        };
    },
    components: {
        // NovelStar,
    },
    methods:{
       listNovel(){
        ListService.listNovel().then((res:any)=>{
            console.log(res.data.data);
            
          this.mywork = res.data.data
        })
      }
    },
    mounted(){
      this.listNovel()
    }
});
</script>

<style lang="scss" scoped>
.Statistics {
    display: grid;
    grid-template-columns: 1fr ;
    grid-gap: 20px;
}
.series{
    display: grid;
 grid-template-columns: 1fr 1fr;
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
</style>
