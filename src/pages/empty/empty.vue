<template>
  <div class="image-box">
    <figure class="img-dragon">
      <img class="img-no-data" :src="$path.imageEmpty(pathName)" alt="" />
      <!-- {{$path.imageEmpty(pathName)}} -->
    </figure>

    <div class="talkbubble">
      <div :style="StyleTemp">{{ text }}</div>

      <div v-show="isSearch">
        <div class="input-btn-emtry-bookshelf">
          <input type="text" disabled placeholder="ค้นหานิยายโปลดเล่มใหม่" />
          <router-link to="/category" class="btn-search"> ค้นหา</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyContent",
  props: {
    pathName: {
      type: String,
    },
    text: {
      type: String,
    },
    isSearch:{
      type:Boolean,
      default:false,
    },
    color: {
      type: String,
      default: "#e4803a"
    },
    fontSize:{
        type:String,
        default:"30"
    }
  },
  computed: {
      StyleTemp() {
      return {
        "color": this.color,
        
      };
    }
    },
};
</script>

<style scoped>
.btn-search {
  background: #e4803a;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 300;
  line-height: 23px;
  color: white;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 7px 25px;
}
.input-btn-emtry-bookshelf {
  margin: 20px 0px 0px 0px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
}
.bookshelf {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 100px 20px;
}
.img {
  border-radius: 12px;
}
img.img-no-data {
  width: 50%;
  height: 50%;
}
.img-dragon {
  display: flex;
  justify-content: center;
}
.item {
  border-radius: 13px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px;
}
.text-no {
  color: #fff;
  margin: 30px 50px;
  font-size: 20px;
}
figure {
  width: intrinsic;
}
.talkbubble {
  width: 100%;
  font-size: 30px;
  font-weight: 900;
  line-height: 40px;
  color: #e4803a;
}
input {
  height: 41px;
  border: 1px solid #e4803a;
  display: flex;
  align-items: center;
}
input::placeholder {
  font-size: 18px;
  color: #cfd4df;
}
input:disabled {
    background: white;
}
.name {
  color: #1e2046;
  font-size: 18px;
}
.image-box {
  display: flex;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  justify-content: center;
  align-items: center;
}
.flex-s {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
}
.fa-dumpster {
  color: crimson;
}
.detail {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  padding: 0px 4px;
}
.count-ep-late {
  position: absolute;
  padding: 0px 8px;
  color: #fff;
  background: #fc6f6f;
  border-radius: 5px;
  right: -10px;
  top: -10px;
}
.img {
  position: relative;
}

.bth-grob {
  display: flex;
  grid-gap: 20px;
}
.Bookshelf-confirm-con {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  align-items: center;
}
.del {
  cursor: pointer;
}
@media (max-width: 1024px) {
  .bookshelf {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
}
@media (max-width: 820px) {
  .text-no {
    width: 60%;
    margin: 16px 50px;
  }
}
@media (max-width: 768px) {
  .bookshelf {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }
  .talkbubble {
    font-size: 27px;
  }
  .text-no {
    width: 360px;
    font-size: 18px;
    margin: 25px 50px;
  }
  .flex-s {
    padding-right: 20px;
  }
}
@media (max-width: 550px) {
  .image-box {
    text-align: center;
    grid-template-columns: 1fr;
  }
  img.img-no-data {
    margin-bottom: 10px;
  }
  .talkbubble {
    font-size: 25px;
    font-weight: 900;
    line-height: 40px;
    color: #e4803a;
  }
  .input-btn-emtry-bookshelf {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 10px;
  }
  .flex-s {
    padding-right: 10px;
  }
  .bookshelf {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  .talkbubble:before {
    display: none;
  }
}
</style>
