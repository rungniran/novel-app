<template>
    <NovelModal2 ID="NovelConfirm"  IDCrad="NovelConfirmCead"  ref="popup">
       <template  v-slot:body>
        <div  :class="'haeder-confirm haeder-confirm'+theme ">
         {{title}}
          <!-- <div></div> -->
        </div>
        <!-- <h2 style="margin-top: 0; font-size:25px">{{ title }}</h2> -->
        <!-- <div>{{ message }}</div> -->
       <div v-if="message" class="mss-confirm" >{{ message }}</div>
         <div class="con-button">
            <div></div>
            <div class="sd">
          <button :class="'cancel cancel' + theme" @click="_cancel">ยกเลิก</button>
          <button :class="'confirm ' + theme" @click="_confirm" :disabled="isConfirm">{{ okButton }}</button>
          </div>
        </div>
       </template>
    </NovelModal2>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
    name: 'ConfirmDialogue',
    components:{
     NovelModal2:()=> import('./NovelModal2.vue')
    },
    data(){
        // Parameters that change depending on the type of dialogue
        return{
        title: undefined,
        message: undefined, // Main text content
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Go Back', // text for cancel button
        isConfirm:false,
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
        theme: ''
        }
    },
    methods: {
        show(opts = {}) {
            this.title = opts.title
            this.message = opts.message
            this.okButton = opts.okButton
            this.theme = opts?.theme
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
            // Once we set our config, we tell the popup modal to open
            this.$refs.popup.open()
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },
        close(){
            this.isConfirm = false
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
$colormain:#9b5afb; 
.delete-btn {
    padding: 0.5em 1em;
    background-color: #eccfc9;
    color: #c5391a;
    border: 2px solid #ea3f1b;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
.btns{
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
// .confirm {
//     background:  $colormain;
//     border: 1px solid  $colormain;
//     color: #fff;
//     padding: 5px 15px;
//     border-radius: 5px;
//     transition: .3s;
//     cursor: pointer;
//     font-size: 16px;
// }
.detail-contain{
    padding: 10px;
    text-align: center;
}
// .cancel {
//     background: #fff;
//     border: 1px solid #b8b8b8;
//     color: #636363;
//     padding: 5px 15px;
//     border-radius: 5px;
//     transition: .3s;
//     cursor: pointer;
//     font-size: 16px;

// }
.haeder-confirm{
    // margin-top: 20px;
    font-family: "Sarabun", sans-serif;
    color: $colormain;
    font-weight: 600;
    padding: 20px;
    font-size: 21px;
    padding-bottom: 10px;
    // width: 100%;
    
    // border-bottom: 1px solid $colormain;

}
.con-button{
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
//   padding-top: 0px;
    //   width: 100%;
}
.mss-confirm{
      font-family: "Sarabun", sans-serif;
        padding: 20px 20px;
        font-size: 16px;
            // width: 100%;
}
.sd{
        display: flex;
    align-items: center;
    gap: 10px;
}
.delete{
   border: 1px solid #ea3f1b;
   background: #ea3f1b;
}
.haeder-confirmdelete{
    color: #ea3f1b;
}
.canceldelete{
     border: 1px solid #ea3f1b;
     color: #ea3f1b;
}
</style>
