<template>
    <div class="Debug" id="Debug">
        <!-- <div class="Debug-C" id="Debug-C"> -->
          <i class="fas fa-times-circle" @click="close()"></i>
           
        <!-- </div> -->
    </div>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
    name: 'NovelDebug',
    components:{
    //  NovelModal2:()=> import('../NovelModal2.vue')
    },
    data(){
        // Parameters that change depending on the type of dialogue
        return{
          title: undefined,
          message: '', // Main text content
          okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
          cancelButton: 'Go Back', // text for cancel button
          isConfirm:false,
          // Private variables
          resolvePromise: undefined,
          rejectPromise: undefined,
        }
    },
    methods: {
        async show(opts = {}) {
            console.log(opts,">>>>>>>>>>>");
            this.message = await opts.code
            console.log(this.message );
            let debug = document.getElementById("Debug") 
             debug.classList.add('Debug-show')
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },
        close(){
           let debug = document.getElementById("Debug") 
            debug.classList.remove('Debug-show')
        },
        async _confirm() {
            this.isConfirm = true
            this.$refs.popup.close()
              
            await this.resolvePromise(true)
            // this.isConfirm =  false
        },
        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },
    },
})
</script>
<style lang="scss" scoped>
.Debug{
    display: none;
    height: 100vh;
    z-index: 7000;
    top: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: #ddddddc0;
    position: fixed;
}
.Debug-show{
  display: flex;
}
.Debug-C{
  position: relative;
  padding: 20px;
  background: #fff;
  width: 500px;
}

.wraning-d{
   position: relative;
  padding: 20px;
  background: #fff;
  width: 500px;
  background: #ffc822;
  color: #000000;
}
.fa-times-circle{
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
