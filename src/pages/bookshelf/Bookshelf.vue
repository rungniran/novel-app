/* eslint-disable @typescript-eslint/no-unused-vars */
<template>
  <div class="Bookshelf">
    <div class="nv-box-white nv-mt-40">
        <div class="bookshelf" v-if="bookshelf.length !== 0">
            <!-- {{bookshelf.length}} -->
            <!-- {{$filter.dateThai(new Date("2022-01-15T00:47:24.676Z"))}} -->
            <div  v-for="item,index in bookshelf" :key="index" class="item">
                <router-link :to="'/novel/'+ item.id" class="img">
                    <img 
                    :src="item.image_data ? item.image_data.url : $path.image('loading.png')"
                class="nv-img-novel "
                onerror="this.onerror=null;this.src='https://novelkingdom.co/loading.png';" 
                    width="100%">
                    <div class="count-ep-late">{{item.score}}</div>
                </router-link>
                <div class="detail">
                    <router-link :to="'/novel/'+ index" class="name line-1">{{item.title}}</router-link>
                    <div class="flex-s">
                        บทที่ 11 เริ่มต้นใหม่
                        <div @click="openmodel(item, index); indexBookshelf = index" class="del">
                            <svg width="16" height="20" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.9554 23.5625H16.2946C16.4722 23.5625 16.6426 23.4909 16.7682 23.3634C16.8937 23.236 16.9643 23.0631 16.9643 22.8828V10.6484C16.9643 10.4682 16.8937 10.2953 16.7682 10.1678C16.6426 10.0404 16.4722 9.96875 16.2946 9.96875H14.9554C14.7778 9.96875 14.6074 10.0404 14.4818 10.1678C14.3563 10.2953 14.2857 10.4682 14.2857 10.6484V22.8828C14.2857 23.0631 14.3563 23.236 14.4818 23.3634C14.6074 23.4909 14.7778 23.5625 14.9554 23.5625ZM24.1071 4.53125H19.5084L17.611 1.31973C17.3729 0.917021 17.0361 0.58379 16.6334 0.352507C16.2307 0.121224 15.7758 -0.000223356 15.3131 3.08378e-07H9.68694C9.22441 -2.76842e-05 8.76975 0.121512 8.36724 0.352786C7.96473 0.58406 7.62808 0.917185 7.39007 1.31973L5.49163 4.53125H0.892857C0.656057 4.53125 0.428955 4.62673 0.261512 4.79669C0.0940686 4.96664 0 5.19715 0 5.4375L0 6.34375C0 6.5841 0.0940686 6.81461 0.261512 6.98457C0.428955 7.15452 0.656057 7.25 0.892857 7.25H1.78571V26.2812C1.78571 27.0023 2.06792 27.6938 2.57025 28.2037C3.07258 28.7136 3.75388 29 4.46429 29H20.5357C21.2461 29 21.9274 28.7136 22.4298 28.2037C22.9321 27.6938 23.2143 27.0023 23.2143 26.2812V7.25H24.1071C24.3439 7.25 24.571 7.15452 24.7385 6.98457C24.9059 6.81461 25 6.5841 25 6.34375V5.4375C25 5.19715 24.9059 4.96664 24.7385 4.79669C24.571 4.62673 24.3439 4.53125 24.1071 4.53125ZM9.58929 2.88357C9.61913 2.83316 9.66135 2.79147 9.71182 2.76258C9.76229 2.73369 9.81929 2.71859 9.87723 2.71875H15.1228C15.1806 2.71868 15.2375 2.73383 15.2879 2.76272C15.3382 2.7916 15.3804 2.83324 15.4102 2.88357L16.3845 4.53125H8.61551L9.58929 2.88357ZM20.5357 26.2812H4.46429V7.25H20.5357V26.2812ZM8.70536 23.5625H10.0446C10.2222 23.5625 10.3926 23.4909 10.5182 23.3634C10.6437 23.236 10.7143 23.0631 10.7143 22.8828V10.6484C10.7143 10.4682 10.6437 10.2953 10.5182 10.1678C10.3926 10.0404 10.2222 9.96875 10.0446 9.96875H8.70536C8.52776 9.96875 8.35743 10.0404 8.23185 10.1678C8.10627 10.2953 8.03571 10.4682 8.03571 10.6484V22.8828C8.03571 23.0631 8.10627 23.236 8.23185 23.3634C8.35743 23.4909 8.52776 23.5625 8.70536 23.5625Z" fill="#DF3D0A"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            ไม่มีหนังสือ
        </div>
    </div>
    <NovelModal classlist="Bookshelf-confirm" animation="Bookshelf-confirm-amination">
        <template v-slot:body >
        <div class="Bookshelf-confirm-con">
            <div style="font-size:20px;" >ลบหนังสือ</div>
            <div class="line-1">{{itemBookshelf.title}}</div>
            <div class="bth-grob">
                <button class="nv-btn-yellow" @click="closemodel()">ยกเลิก</button>
                <button class="nv-btn-orange" @click="del(itemBookshelf.id, indexBookshelf)">ยืนยัน</button>
            </div>
        </div>
        </template>
    </NovelModal>

  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import Component  from 'vue-class-component'
import { Gatway } from '@/shares/services'
import { alert } from '@/shares/modules/alert'
export default Vue.extend({
    name:"Bookshelf",
    data() {
        return {
            bookshelf:[] as any[],
            itemBookshelf:{},
            indexBookshelf:null,
        }
    },
    components:{
         NovelModal: () => import("@/components/widget/NovelModal.vue"),
    },
    methods: {
    openmodel (item:any){
        this.itemBookshelf = item;
        (this as any).$base.openmodal('Bookshelf-confirm', 'Bookshelf-confirm-amination', 0)
    },
    closemodel(){
        (this as any).$base.closemodal('Bookshelf-confirm', 'Bookshelf-confirm-amination', 0)
    },
    async del(uuid:any, i:any){
        let res = await Gatway.DelService(`/customers/novel/remove-bookshelf/${uuid}`)
        alert(res.data.data,'success')
        this.bookshelf.splice(i, 1)
        this.closemodel()
    },
    async  getBookshelf(){
       let res = await Gatway.getService('/customers/novel/fetch-bookshelf')
       this.bookshelf = res.data.data
       
    }
  },
  mounted(){
      this.getBookshelf()
  }

})
</script>
<style lang="scss" scoped>
   .bookshelf{
       display: grid;
       grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
       grid-gap: 100px 20px;
   }
   .img{
       border-radius: 12px;
   }
   .item{
       border-radius: 13px;
       display: flex;
       justify-content: center;
       flex-direction: column;
    //    box-shadow: rgba(99, 99, 99, 0.571) 0px 2px 8px 0px;
       padding: 5px ;
   }
   .name{
    color: #1E2046;
    font-size: 18px;
   }
   .flex-s{
       display: flex;
       justify-content: space-between;
       align-items: center;
   }
   .fa-dumpster{
       color: crimson;
   }
   .detail{
       display: flex;
       flex-direction: column;
       grid-gap: 10px;
       padding: 0px 4px;
   }
   .count-ep-late{
       position: absolute;
    //    width: 30px;
    //    height: 30px;
       padding: 0px 8px;
       color: #fff;
       background: #fc6f6f;
       border-radius: 5px;
       right: -10px;
       top: -10px;

   }
   .img{
       position: relative;
   }
   .bth-grob{
       display: flex;
       grid-gap: 20px;
   }
   .Bookshelf-confirm-con{
       
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    align-items: center;

   }
   .del{
       cursor: pointer;
   }
   @media (max-width: 1024px) {
       .bookshelf{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 20px;
        }
    }
    @media (max-width: 768px) {
        .bookshelf{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr ;
            grid-gap: 20px;
        }
   }
   @media (max-width: 415px) {
        .bookshelf{
            display: grid;
            grid-template-columns: 1fr 1fr ;
            grid-gap: 20px;
        }
   }
</style>
