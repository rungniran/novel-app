<template>
  <div class="customize">
    <div class="box-cuttom ">
      <div class="con-fonrsize ">
        <div class="con-title">
          <span class="inside-customize">ขนาดตัวอักษร</span> <small class="inside-customize">{{ fonrsize }} px</small>
        </div>
        <div class="font-size inside-customize">
          <li @click="fallsize" class="cuttom-size inside-customize">-</li>
          <li @click="addsize" class="cuttom-size inside-customize">+</li>
        </div>
      </div>
      <div class="con-fonrsize">
        <div>พื้นหลัง</div>
        <div class="con-changback">
          <li class="inside-customize"
            :class=" 
              Theme === 'default'
                ? 'changback default changback-active'
                : 'changback default'
            "
            @click="changback('default')"
          >
            Aa
          </li>
          <li class="inside-customize"
            :class="
              Theme === 'fzooss'
                ? 'changback fzooss changback-active'
                : 'changback fzooss'
            "
            @click="changback('fzooss')"
          >
            Aa
          </li>
          <li class="inside-customize"
            :class="
              Theme === 'dark'
                ? 'changback dark changback-active'
                : 'changback dark'
            "
            @click="changback('dark')"
          >
            Aa
          </li>
        </div>
      </div>
      <div class="con-fonrsize">
        <div>แบบตัวอักษร</div>
        <div class="box-font-style">
          <li class="inside-customize"
            :class="
              fontStyle === 'Sarabun'
                ? 'font-style changback-active'
                : 'font-style'
            "
            @click="fontfamily('Sarabun')"
          >
            แบบที่ 1
          </li>
          <li class="inside-customize"
            :class="
              fontStyle === 'Kodchasan'
                ? 'font-style changback-active'
                : 'font-style'
            "
            @click="fontfamily('Kodchasan')"
          >
            แบบที่ 2
          </li>
          <li class="inside-customize"
            :class="
              fontStyle === 'Kanit'
                ? 'font-style changback-active'
                : 'font-style'
            "
            @click="fontfamily('Kanit')"
          >
            แบบที่ 3
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { changback, fontfamily, setThreme } from "./../ReadCustomize";
import Vue from "vue";
export default Vue.extend({
  name: "customize",
  data() {
    return {
      recommend: [...Array(5).keys()],
      fonrsize: localStorage.getItem("fontSize")
        ? parseInt(localStorage.getItem("fontSize") as string)
        : 20,
      Theme: "",
      fontStyle: "",
      Percen: 0,
    };
  },
  methods: {
    addsize(): void {
      let story = document.getElementsByClassName("story")[0] as HTMLElement;
      let fonrsize = this.fonrsize + 1;
      if (fonrsize < 51) {
        story.style.fontSize = fonrsize + "px";
        this.fonrsize = fonrsize;
         this.$emit('clickFonrSize', fonrsize)
        localStorage.setItem("fontSize", fonrsize.toString());
      }
    },
    fallsize(): void {
      let story = document.getElementsByClassName("story")[0] as HTMLElement;
      let fonrsize = this.fonrsize - 1;
      if (fonrsize > 16) {
        story.style.fontSize = fonrsize + "px";
        
        this.fonrsize = fonrsize;
        this.$emit('clickFonrSize', fonrsize)
        localStorage.setItem("fontSize", fonrsize.toString());
      }
    },
    changback(treme: string): void {
      this.Theme = changback(treme);
    },
    fontfamily(style: string) {
      this.fontStyle = fontfamily(style);
    },
  },
  mounted() {
    localStorage.getItem("Theme")
      ? this.changback(localStorage.getItem("Theme") as string)
      : null;
    localStorage.getItem("fontFamily")
      ? this.fontfamily(localStorage.getItem("fontFamily") as string)
      : this.fontfamily("Sarabun");
    document.addEventListener("click", (event: any) => {
      if (!event.target.matches(".cuttom")) {
        if (!event.target.matches(".inside-customize")) {
          let dropdowns = document.getElementsByClassName("box-cuttom");
          let i = 0;
          for (i; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("box-cuttom-show")) {
              openDropdown.classList.remove("box-cuttom-show");
            }
          }
        }else{
          return "inside";
        }
        var dropdowns = document.getElementsByClassName("box-cuttom");
        var i = 0;
        for (i; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("box-cuttom-show")) {
            openDropdown.classList.remove("box-cuttom-show");
          }
        }
      }
    });
  },
});
</script>

<style lang="scss">
.font-size {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
.box-font-style {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
.cuttom-size {
  padding: 2px;
  font-size: 23px;
  text-align: center;
  background: #9b9b9b;
  border: 1px solid #9b9b9b;
  border-radius: 7px;
  transition: 0.3s;
  cursor: pointer;
}
.cuttom-size:active {
  transform: scale(0.9);
}
hr {
  border: 0px solid;
  height: 0.5px;
  background: #e7e7e7;
  transition: 0.3s;
}
.cuttom {
  position: relative;
}
.box-cuttom {
  // backdrop-filter: blur(10px);
  color: #fdf3e1;
  width: 300px;
  background: #484848;
  padding: 20px;
  top: 60px;
  right: 10px;
  border-radius: 15px;
  position: absolute;
  display: grid;
  grid-gap: 20px;
  opacity: 0;
  transition: 0.3s;
  pointer-events: none;
}
.box-cuttom-show {
  opacity: 10;
  pointer-events: auto;
}
.con-title {
  display: flex;
  justify-content: space-between;
}
.con-fonrsize {
  display: grid;
  grid-gap: 5px;
}
.con-changback {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
.changback {
  text-align: center;
  // border: 1px solid;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
}
.con-changback .default {
  background: #ffffff;
  color: #000;
}
.con-changback .fzooss {
  background: #fdf3e1;
  color: #4d311e;
}
.con-changback .dark {
  background: #000000;
  color: #ffffff;
}
.font-style {
  text-align: center;
  padding: 8px;
  border-radius: 6px;
  background: #9b9b9b;
  font-size: 13px;
  transition: 0.3s;
}
.changback-active {
  //  border: 3px solid #ffb527;
  box-shadow: #ffb527 0px 1px 3px, #ffb527 0px 0px 0px 2px;
}

@media (max-width: 415px) {
  .box-cuttom {
    width: 250px;
  }
}
</style>
