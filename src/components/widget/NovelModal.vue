<template>
    <div class="contai-modal"  @click="onmouse == false ? close() : null ;">
        <div :class="classlist">
            <slot name="body" />
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:"NovelModal",
    data() {
        return {
            onmouse:false
        }
    },
    props:{
        classlist:String, 
        animation:String,
        index:{
            type: Number,
             default: 0
        },
        ID:{
            type: String,
            default: 'String' 
        }
    },
    methods:{
        close():void{
            document.getElementsByClassName(this.$props.classlist)[0].classList.remove(this.$props.animation)
            document.getElementsByClassName("contai-modal")[this.$props.index].classList.remove("show")
        }
    },
    mounted(){
        let elememt = document.getElementsByClassName(this.$props.classlist)[0] as HTMLElement
        elememt.onmouseover = ():void => {
            this.onmouse = true
        };
        elememt.onmouseout =  ():void => {
            this.onmouse = false
       };
       window.onclick = function(event){
           if(event.target === elememt){
               elememt.style.display = "none";
           }
       }

    }
})
</script>
<style lang="scss" scoped>
// .contai-modal{
//     top: 0;
//         left: 0;
//         z-index: 3000;
//         position: fixed;
//         width: 100%;
//         height: 100vh;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         background: #000000c4;
//         opacity: 0;
//         transition: .3s;
//         pointer-events: none;
// }

// .show{
//     opacity: 10;
//     pointer-events: auto;
// }
// .profile-menu{
//     position: fixed;
//     top: 65px;
//     padding: 0px 5px;
//     border-radius: 5px;
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
//     // width: 200px;
//     background: #ffffff;
//     right: 10px;
//     margin-top: -40px;
//     transition: .3s;
// }

// .crad-show{
//     margin-top: 0px;


// }
// .create-novel{
//     position: fixed;
//     top: 0px;
//     background: #ffffff;
// 		display: flex;
//     padding: 20px;
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
//     border-radius: 7px;
//     transition: .3s;
// }
// .create-novel-show{
//     top: 70px;
// }


// .modal-xl{
//    height: 83vh;
//    max-width: 750px;
//    background: #ffffff;
//    padding: 20px 0px;
//    border-radius: 10px;
// //    overflow-y: scroll;

//    position: relative;

//    transition: .3s;
//    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
//    transform: scale(1.25);
// }
// .modal-conditions{
//     height: 90vh;
//     border-radius: 15px;
//      transition: .3s;
//     // overflow-y: scroll;
//    max-width: 850px;
//    padding: 40px 0px;
//    background: #ffffff;
//    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
//    transform: scale(1.25);
// }
// .modal-alertdelete{
// font-family: "Sarabun", sans-serif;
//  color: #000;
//   background: #ffffff;
//   box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.2);
//   margin: 20px;
//   // padding: 20px;
//   border-radius: 7px;
//   overflow: hidden;
//   min-width: 30px;
//   opacity: 0;
//   transition: .3s;
//   transform: scale(0.7);
// }

// .modal-alertdelete-show{
// opacity: 10;
//   transform: scale(1.0);
// }
// .modal-animation{
// transform: scale(1);
// }
// .buy-novel-ep-auto{
//     background: #ffffff;
// 	display: flex;
//     grid-gap: 10px;
//     flex-direction: column;
//     justify-items: center;
//     align-items: center;
//     padding: 20px 40px;
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
//     border-radius: 10px;
//     max-width: 470px;
//     transition: .1s; 
//     transform: scale(0.7);
// }
// .buy-novel-ep-auto-amination{
//     transform: scale(1.0);
// }
// .walllet-modal{
//   display: flex;
//   background: #ffffff;
// }
// .Bookshelf-confirm{
//     background: #ffffff;
//     padding: 20px;
//     width: 300px;
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
//     border-radius: 10px;
//     transition: .1s; 
//     transform: scale(0.7);
// }
// .Bookshelf-confirm-amination{
//    transform: scale(1.0); 
// }
// .review-modal{
//     background: #ffffff;
//     padding: 20px;
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
//     border-radius: 10px;
//     transition: .1s; 
//     transform: scale(0.7);
// }
// .review-modal-amination{
//     transform: scale(1.0);
// }
// .comment-modal{
//     background: #ffffff;
//     padding: 20px;
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
//      transition: .1s; 
//     transform: scale(0.7);
// }
// ::-webkit-scrollbar {
//   width: 5px;
// }
// ::-webkit-scrollbar-track {
//   background: #96969600;
// }

// ::-webkit-scrollbar-thumb {
//   background: #bfbfbf7d;
//   border-radius: 5px;
// }

// ::-webkit-scrollbar-thumb:hover {
//   background: #8484849e;
// }
// .ExchangeModal{
//    background: #ffffff;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
// }
</style>
