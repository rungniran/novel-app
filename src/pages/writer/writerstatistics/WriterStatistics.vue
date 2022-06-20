<template>
    <div class="Statistics" v-if="wraning === true">
            <div>
            <div>เลือกนิยาย</div>
            <div class="series">
                 <select id="inCategory">	
                            <option v-for="item,index in mywork" :key="index" :value="item.id">{{item.title}}</option>
            </select>
            </div>
        </div>
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
    <div v-else class="not-novel">
            คุณยังไม่มีนิยาย
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import NovelStar from "@/components/widget/NovelStar.vue";
import { ListService} from '@/shares/services'
export default Vue.extend({
    name: "Statistics",
    props:{
        wraning:Boolean
    },
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

@media (max-width: 1024px) {

}
@media (max-width: 768px) {
.series{
 grid-template-columns: 1fr ;
}
}
@media (max-width: 415px) {
.series{
 grid-template-columns: 1fr ;
}
}
</style>
