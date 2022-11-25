<template>
  <div class="Exchange">
    <div>
      <div class="nv-box-white nv-mt-40">
        <div class="add-coin">
          <div class="writer-profile">
            <!-- <div
              class="nv-profile-small"
              style="
                background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png)
                  center center/cover;
              "
            ></div>
            <div>
              <div v-if="profile">{{ profile.display_name }}</div>
              <div v-if="profile">{{ profile.dragon }}</div>
            </div> -->
            <div class="nv-con-coin">
            
              <img
                :src="$path.image('diamond.png')"
                
              />
              {{ $filter.NumberToString(profile.diamond_balance) }}
            </div>
          </div>
          <div class="box-coin">
            <!-- <div class="nv-con-coin">
              <img
                :src="$path.image('diamond.png')"
                width="25px"
                height="25px"
              />
              {{ $filter.NumberToString(profile.diamond_balance) }}
            </div> -->
            <router-link to="/exchange"
              ><button class="nv-btn-yellow">แลกของ</button></router-link
            >
          </div>
        </div>
      </div>
      <!-- <pre> {{list}} </pre> -->
      <div class="nv-box-white Exchangetable" v-if="list">
        <p class="title"> ประวัตการแลกของ </p>
        <div class="card">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="card-content"
          >
            <img
              v-lazy="
                item.image_url ? item.image_url : item.system_note.image_preview
              "
              class="img-exchange"
            />

            <div class="box-detail">
           
            <div class="detail-content-name">
              <!-- <p class="mobile">ชื่อ:</p> -->
              <p class="line-1">{{ item.system_note.name }}</p>
            </div>
            <div class="detail-content-diamond">
              <img
                  class="diamond"
                  :src="$path.image('diamond.png')"
                  alt="diamond"
                />
              <p>
                
                {{ item.system_note.diamond }}
                
              </p>
            </div>  
            <div>
              {{ $filter.toThaiDateString(item.created_at) }}
            
            </div>
            <div>
              <!-- <div v-if="item.delivery_status.name_preview === 'ไม่จัดส่ง'">
                <p class="nonedisplay"></p>
              </div> v-else -->
              <div class="detail-content-status">

                <p class="tags-ls"  v-if="item.delivery_status.name_preview === 'รอการจัดส่ง'">{{ item.delivery_status.name_preview }}</p>
                <p class="tags-g"  v-else-if="item.delivery_status.name_preview === 'ไม่จัดส่ง'">{{ item.delivery_status.name_preview }}</p>
                <p class="tags-d">{{$filter.Ago(item.created_at)}}</p>
              </div>
            </div>
            
            
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
      </div>
    </div>
    <!-- <div v-else>loading...</div> -->
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

        this.list = data.reverse();
      }
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
  // margin: 20px 0px;
  gap: 10px;
  border-radius: 12px;
  // padding: 10px 0px;
}

.card-content {
      padding: 10px;
    border: 2px solid #d6d6d6;
    border-radius: 10px;
    background: #fff;
}
.nonedisplay {
  display: none;
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
.img-exchange {
  width: 100%;
      background: antiquewhite;
  // height: 30%;
  object-fit: cover;
  border-radius: 10px;
}
.diamond {
  // position: absolute;
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
.box-detail{
  display: grid;
  gap: 1px;
}
.detail-content-diamond {
  display: grid;
  display: flex;
  justify-content: start;
  gap: 5px;
  grid-template-columns: auto auto;
}
.nonedisplay {
  display: none;
}

.detail-content-status {
  margin-top: 10px;
  display: grid;
  display: flex;
  // margin-right: 10px;
  // justify-content: start;
  gap: 5px;
  grid-template-columns: auto auto;
}

.detail-content-name {
  display: grid;
  display: flex;
  // justify-content: center;
  font-size: 18px;
  font-weight: 700;
  gap: 5px;
  grid-template-columns: auto auto;
}
.card{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.boxno {
  padding-bottom: 20px;
}
.nv-con-coin{
  font-size: 18px;
}
// .Exchangetable {
//   background: #ffffff00;
//   padding: 0px;
//   // border-radius: 10px;
// }
.mobile-view {
  display: none;
}
.tags, .tags-g, .tags-d, .tags-ls{
  padding: 0px 10px;
  background: rgb(255, 150, 150);
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
}
.tags-g{
  background: #b2b2b2;
}
.tags-d{

  background: #b2b2b2;

}
.title{
  font-size: 25px;
  padding-bottom: 30px;
  width: 100%;
  text-align: center;
}
.tags-ls{
  background: #f4ba40;
}
@media (max-width: 1024px) {
//   .Exchangetable[data-v-2a0afc87] {
//     padding: 10px;
// }
  // .card-content {#f4ba40
  //   padding-left: 20px;
  //   grid-template-columns: 1fr 1.2fr 1fr 1fr;
  // }
}

@media (max-width: 820px) {
  // .detail-content-diamond {
  //   display: none;
  // }
  // .detail-content-status {
  //   margin-left: 0px;
  //   // justify-content: start;
  // }
  // .img-exchange {
  //   width: 15%;
  //   height: 35%;
  //   object-fit: cover;
  //   border-radius: 10px;
  // }
  // .mobile {
  //   display: none;
  // }
}

@media (max-width: 550px) {
  .detail-content-status {
    flex-direction: column;
    align-items: flex-start;
}
  .card{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
  // .mobile-view {
  //   display: inline-flex;
  // }
  // .card-content {
  //   display: flex;
  //   justify-content: flex-start;
  // }
  // .detail-content-diamond {
  //   display: inline-flex !important;
  // }
  // .mobile {
  //   display: contents;
  // }
  // .pc-view {
  //   display: none;
  // }
  // .img-exchange {
  //   width: 20%;
  //   height: 40%;
  //   object-fit: cover;
  //   border-radius: 10px;
  // }
  .Exchangetable {
    margin-top: 0px;
  }
}

@media (max-width: 415px) {
  // .card-content {
  //   padding-left: 10px;
  //   display: grid;
  //   display: flex;
  //   justify-content: space-between;
  //   grid-template-columns: 1.5fr 1fr 1fr;
  // }
  // .mobile {
  //   display: none;
  // }
  .detail-content-diamond {
    display: inline-flex !important;
  }

  // .detail-content-status {
  //   display: grid;
  //   grid-template-columns: 1fr;
  // }

  // .detail-content-name {
  //   display: grid;
  //   grid-template-columns: 1fr;
  // }
}
</style>
