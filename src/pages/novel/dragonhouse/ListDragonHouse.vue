<template>
  <div>
    <!-- <pre>
      {{listdragon[0]}}
    </pre> -->
    <div v-if="listdragon">
      <div class="DragonHouse">
        <div class="header-contain">
          <div class="title-dragon">ทำเนียบนักรบโลหิตมังกร</div>
          <input
            class="input-dragonlist"
            placeholder="ค้นหา"
            v-model="wordSearct"
            @keyup="Searct"
          />
        </div>
        <div class="Dragon-con">
          <div class="con-list-dragon">
            <div
              v-for="(item, index) in pageOfItems"
              :key="index"
              class="box-list-dragon"
            >
              <div class="contain-text">
                <span class="glowing-text">
                  {{ item.rank }} &nbsp;
                  {{ item.displayname }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="paginate">
        <jw-pagination
          :items="listdragons"
          @changePage="onChangePage"
          :pageSize="50"
          :maxPages="5"
          :labels="customLabels"
        ></jw-pagination>
      </div>
    </div>
    <div v-else class="loading">Loading...</div>
  </div>
</template>
<script lang="ts">
import { Gatway } from "@/shares/services";
import Vue from "vue";
import JwPagination from "jw-vue-pagination";
Vue.component("jw-pagination", JwPagination);
const customLabels = {
  first: "<<",
  last: ">>",
  previous: "<",
  next: ">",
};
export default Vue.extend({
  name: "ListDragonHouse",
  data() {
    return {
      listdragon: null as any,
      pageOfItems: [] as any,
      customLabels,
      wordSearct: "",
      listdragons: "",
    };
  },
  methods: {
    async get() {
      let getListDragon = await Gatway.getService(
        "/guest/index/dragon-ranking"
      );
      let numRank = [] as any;
      for (var i = 0; i < getListDragon.data.data.length; i++) {
        if (getListDragon.data.data[i].user_profile_datas[0]) {
          numRank.push({
            ...getListDragon.data.data[i],
            rank: i + 1,
            displayname: getListDragon.data.data[i].user_profile_datas[0].user_nickname
              ? getListDragon.data.data[i].user_profile_datas[0].user_nickname
              : getListDragon.data.data[i].user_profile_datas[0].first_name + " " + getListDragon.data.data[i].user_profile_datas[0].last_name,
          });
        } else {
          numRank.push({
            ...getListDragon.data.data[i],
            rank: i + 1,
            displayname: getListDragon.data.data[i].username
          });
        }
      }
      this.listdragon = numRank.slice(0, 300);
    },
    onChangePage(pageOfItems: never[]) {
      this.pageOfItems = pageOfItems;
    },
    Searct() {
      // console.log(this.wordSearct);
      // console.log(this.wordSearct.toLowerCase());
      if (this.wordSearct.length !== 0) {
        var data = this.listdragon.filter((Blob: any) => {
          return Blob.displayname
            .toLowerCase()
            .match(this.wordSearct.toLowerCase());
        });
        this.listdragons = data;
      } else {
        this.listdragons = this.listdragon;
      }
      // this.listdragon = data
      // console.log(data)

      // return data;
    },
  },
  async mounted() {
    // console.log('sdds');
    // if((this as any).$isdrogon.includes(this.$route.params.id) === true){
    //   console.log('sdds');
      
       await this.get();
    // }
    await this.Searct();
  },
});
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "EDMuzazhi";
  src: url(/fonts/EDMuzazhi.ttf);
}
.loading {
  display: flex;
  justify-content: center;
}

.loading-listdragon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.header-contain {
  margin: 20px 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.maintain-system {
  display: flex;
  justify-content: center;
  font-size: 25px;
  color: gold;
}
.more-list {
  display: flex;
  justify-content: center;
}
.DragonHouse {
  width: 100%;
  height: 100%;
  padding: 20px 35px;
  padding-bottom: 20px;

  background: linear-gradient(
    181deg,
    rgba(100, 91, 124, 1) 0%,
    rgba(159, 149, 187, 1) 47%,
    #776d92 100%
  );
  margin-bottom: 20px;
}
.input-dragonlist {
  border: 1px solid rgba(230, 230, 230, 1);
  // background: rgba(255, 255, 255, 0.843);
  // max-width: 561px;
  border-radius: 25px;
  width: 35%;
  padding: 15px;
}
.glowing-text {
  overflow: hidden;
  font-size: 25px;
  color: #ffeaa4;
  text-align: center;
  -webkit-animation: glowing-text 1.4s ease-in-out infinite alternate;
  -moz-animation: glowing-text 1.4s ease-in-out infinite alternate;
  animation: glowing-text 1.4s ease-in-out infinite alternate;
}
@-webkit-keyframes glowing-text {
  0% {
    text-shadow: 0 0 2px #fff, 0 0 5px #da7807, 0 0 10px #da7807,
      0 0 15px #ffb24d, 0 0 20px #ffb24d, 0 0 25px #ffb24d, 0 0 30px #ffb24d;
  }

  100% {
    text-shadow: 0 0 2px #fff, 0 0 5px #f81f4e, 0 0 10px #f81f4e,
      0 0 15px #eb8e37, 0 0 20px #da7807, 0 0 25px #ffb24d, 0 0 30px #ffb24d;
  }
}
.img-dragon {
  height: 400px;
}
.title-dragon {
  color: #fff;
  display: flex;
  justify-content: center;
  font-size: 30px;
}
.btn-read-more {
  background: #ffffff;
  border: 2px solid #e4803a;
  border-radius: 40px;
  padding: 10px 30px;
  margin-top: 20px;
  font-weight: 500;
  font-size: 20px;
  line-height: 19px;
  color: #e4803a;
}
.number {
  // text-decoration: underline;

  // text-align: end;
}
// .Dragon-con {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   margin-top: 15px;
// }
.con-list-dragon {
  display: grid;
  //   grid-template-columns: 1fr 1fr;
  //   grid-column: auto;
  //   grid-column: 1 / 3;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
  grid-gap: 10px;
  padding: 10px;
  grid-auto-flow: column;
  grid-gap: 20px;
}

.box-list-dragon {
  // width: 350px;
  padding: 10px 40px;
  border-radius: 40px;
  background: #fff;
  border: 2px solid #f1925b;
}
.con-dragon-img {
  display: flex;
  justify-content: center;
}
@media (max-width: 768px) {
.header-contain{
  margin-top:40px;
}
}
@media (max-width: 600px) {
  .DragonHouse {
    margin-top: 30px;
  }
  .con-dragon-img {
    display: none;
  }
  .input-dragonlist {
    border: 1px solid rgba(230, 230, 230, 1);
    // background: rgba(255, 255, 255, 0.843);
    // max-width: 561px;
    border-radius: 25px;
    // width: 40%;
    height: 45px;
    padding: 15px;
    margin-bottom: 20px;

  }

  .Dragon-con {
    grid-template-columns: 1fr;
  }
  .DragonHouse {
    padding: 20px 5px;
    padding-bottom: 50px;
  }
  .maintain-system {
    display: flex;
    justify-content: center;
    font-size: 17px;
  }
  .box-list-dragon {
    // background: #5f5c7f;
    background-color: white;
  }
  .title-dragon {
    font-size: 25px;
    text-align: center;
  }
  .con-list-dragon {
    display: grid;
    //   grid-template-columns: 1fr 1fr;
    //   grid-column: auto;
    //   grid-column: 1 / 3;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;

    grid-gap: 10px;
    padding: 10px;
    // grid-auto-flow: column;
    grid-gap: 20px;
  }
  .header-contain {
    margin: 0px 20px;
    display: grid;
    grid-template-columns: 1fr;
  }
  .input-dragonlist {
    border: 1px solid rgba(230, 230, 230, 1);
    // background: rgba(255, 255, 255, 0.843);
    // max-width: 561px;
    border-radius: 25px;
    width: 100%;
    padding: 15px;
    height: 45px;

    margin-bottom: 20px;
  }
  .glowing-text {
    font-size: 22px;
  }
}
@media (max-width: 540px) {
  .glowing-text {
    font-size: 18px;
    // width: 10px;
    padding-left: 5px;
  }
  // .contain-text {
  //   width: 250px;
  //   height: 100%;
  //   overflow: hidden;
  // }
}
</style>
