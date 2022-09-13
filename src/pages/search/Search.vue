<template>
  <div class="search">
    <!-- 
      <div class="nv-box-search nv-mt-40">
      </div>      -->
    <!-- <div class="menu"></div> -->
    <div class="nv-box-white">
      <h1 class="text-search">ค้นหา</h1>
      <!-- <input class="input-searct" placeholder="ค้นหา" v-model="wordSearct"><br><br> -->
      <!-- <h1><span style="opacity:0.6">ผลลัพธ์สำหรับ&nbsp;</span></h1><br> -->
      <div class="tach">
        <div class="list-s a">นิยาย</div>
        <div class="list-s">ผู้แต่ง</div>
        <div class="list-s">แท็ก</div>
      </div>
      <div class="b-mo">
        <input
          class="input-searct"
          placeholder="ค้นหา"
          v-model="wordSearct"
        /><br /><br />
      </div>
      <div class="con-resouth" v-if="wordSearct">
        <router-link
          v-for="(item, index) in Searct()"
          :key="index"
          :to="'/novel/' + item.id"
        >
          <div class="nv-img">
            <img
              :src="item.image_data.url"
              class="nv-img-novel loading-img"
              width="100%"
              onerror="this.onerror=null;this.src='https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png';"
            />
            <div class="line-1">{{ item.title }}</div>
          </div>
        </router-link>
      </div>
      <div v-else class="wordSearct">
        <EmptyContent
          class="image"
          pathName="2.png"
          text="ค้นหานิยายที่น่าสนใจมากมาย..."
          fontSize="36px"
        ></EmptyContent>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Gatway } from "@/shares/services";
import EmptyContent from "../../pages/empty/empty.vue";
export default Vue.extend({
  name: "Search",
  data() {
    return {
      data: [],
      wordSearct: "",
    };
  },
  components: {
    EmptyContent,
  },
  methods: {
    async getNovelType() {
      let res = await Gatway.getService("/guest/novel/group-type");
      this.novelAll(res.data.data);
    },

    novelAll(ojb: any) {
      let NovelAll = [] as any;
      ojb.forEach((element: any) => {
        NovelAll.push(...element.novel_datas);
      });
      let data = [] as any;
      NovelAll.forEach((element: any, index: any) => {
        setTimeout(() => {
          data.push(element);
        }, index * 10);
      });
      this.data = data;
    },
    Searct() {
      var data = [] as any;
      this.data.filter((Blob: any) => {
        if (Blob.title.toLowerCase().match(this.wordSearct.toLowerCase())) {
          // setTimeout(()=> {
          data.push(Blob);
          this.$router.push(`/search#${this.wordSearct.toLowerCase()}`);
          // }, index * 100);
        }
      });

      return data;
    },
  },
  mounted() {
    this.getNovelType();
    this.wordSearct = this.$route.hash.split("#")[1];
  },
});
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  // max-width: 1150px;
  // display: grid;
  // grid-template-columns: 1fr ;
  // background: #fff;
  border-radius: 12px;
  margin-top: 15px;
}
.mian {
  padding: 40px 105px;
  flex: 1 1 auto;
}
.con-search {
  min-height: 100vh;
  padding: 40px 20px;

  border-left: 1px solid rgba(230, 230, 230, 1);
}
.menu {
  width: 80px;
}
h1 {
  font-size: 30px;
}
.content {
  // background-color: white;
}

.input-searct {
  border: 1px solid rgba(230, 230, 230, 1);
  background: rgba(255, 255, 255, 0.843);
  // max-width: 561px;
  border-radius: 10px;
  padding: 15px;
}
.tach {
  display: flex;
  grid-gap: 30px;
  box-shadow: inset 0 -1px 0 rgb(230 230 230);
}
.list-s {
  padding: 10px 0px;
  color: #ababab;
  font-size: 14px;
}
.a {
  box-shadow: inset 0px -1px 0px #9456fb;
  color: #9456fb;
}
.con-resouth {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding-top: 20px;
  grid-gap: 20px;
}

.dfdf {
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 5%,
    rgba(255, 255, 255, 0.6) 5%,
    rgb(255, 255, 255) 65%
  );
}
.b-mo {
  // background:  #f6c334c7;
  width: 100%;
  height: 80px;
  margin-top: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #fff;
  font-size: 20px;
}
.list-s-con {
  max-width: 1050px;
  margin: auto;
  background-color: white;
  padding: 12px;
  border-radius: 12px;
}
.wordSearct {
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: rgb(171, 171, 171);
  border-radius: 0px 0px 12px 12px;
}
.image-box {
  // margin-right: 80px;
}

@media (max-width: 768px) {
  .con-resouth {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .search {
    margin-top: 50px;
  }
}
@media (max-width: 415px) {
  .con-resouth {
    grid-template-columns: 1fr 1fr;
  }
  .item-Exchange {
    padding: 20px 0px;
  }
  .search {
    margin-top: 50px;
  }
}
  input[type="color"],
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"],
input,
select:focus,
textarea {
  font-size: 16px;
}
</style>
