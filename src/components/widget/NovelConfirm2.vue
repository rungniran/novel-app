<template>
    <NovelModal2 ID="NovelConfirm" IDCrad="NovelConfirmCead"  ref="popup">
       <template  v-slot:body>
        <h2 style="margin-top: 0; font-size:25px">{{ title }}</h2>
        <div>{{ message }}</div>
        <div class="btns">
          <button class="nv-btn-yellow" @click="_cancel">ยกเลิก</button>
          <button class="nv-btn-orange" @click="_confirm">{{ okButton }}</button>
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
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
        }
    },
    methods: {
        show(opts = {}) {
            console.log(opts);
            this.title = opts.title
            this.message = opts.message
            this.okButton = opts.okButton
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
        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },
        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },
    },
})
</script>
<style lang="scss" scoped>
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
</style>