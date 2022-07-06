<template>
    <div id="Topbar">
        <div class="topbar">

            <div class="logo">
                <div class="menu-mobile">
                    <i class="fas fa-bars" @click="openLeftmenu()"></i>
                </div>
                <router-link class="in-logo" to="/">
                <img  src="../assets/images/logo-novel.png">
                <span class="text"> Novel Kingdom</span>
                </router-link>
            </div>
            <div  class="sub-menu">
                <ul>
                    <router-link class="list-sub-menu"  active-class="active-submenu"  to="/" exact>หน้าหลัก</router-link>
                    <router-link class="list-sub-menu"  active-class="active-submenu"  to="/category" exact>ประเภท</router-link>
                    <router-link class="list-sub-menu"  active-class="active-submenu"  to="/bookshelf"  exact>ชั้นหนังสือ</router-link>
                    <router-link class="list-sub-menu"  active-class="active-submenu"  to="/writer" exact>นักเขียน
                        <!-- <i class="fas fa-chevron-up"></i>
                        <div class="box-writer">
                            <div class="arrow"></div>
                            <div class="bg-box-writer">
                                <div>เขียนนิยาย</div>
                            </div>
                        </div> -->
                    </router-link>
                </ul>
            </div >
            <div class="menu">
                <ul>
                    <router-link to="/search"><li class="user-active"><i class="fas fa-search"></i></li></router-link>
                    <li class="user-active" ><i class="far fa-bell"></i></li>
                    <li class="user-active" v-if="profile" @click="cleck ? $refs.profilemenu.opanmenu() : $base.openlogin()" 
					style=" background: url(https://cdn-icons-png.flaticon.com/512/149/149071.png) center center/cover;">
                    <profilemenu ref="profilemenu" @closedLeft="closeLeftmenu"/>
                    </li>
					<li class="user-active" v-else   @click="cleck ? $refs.profilemenu.opanmenu() : $base.openlogin()"><i class="far fa-user"></i> </li>
                </ul>
            </div>
            <div class="profile-contai-modal"  @click="profile_onmouse == false ? closemenu() : null ;">
                <div style="position: relative; width: 100%; background: #FFFFFF00;  margin:0px 0px;max-width: 1140px;     height: 100vh;">
                     <div class="profile-menu">
                     </div>
                </div>
            </div>
        </div>
        <div class="leftmenu list-sub-menu" id="leftmenu">
             
            <router-link class="list-sub-menu-mobile"  active-class="active-submenu" @click.native="closeLeftmenu()"  to="/" exact><i class="fas fa-home"></i> หน้าหลัก</router-link>
            <router-link class="list-sub-menu-mobile"  active-class="active-submenu" @click.native="closeLeftmenu()" to="/category" exact><i class="fas fa-list-alt"></i> ประเภท</router-link>
            <router-link class="list-sub-menu-mobile"  active-class="active-submenu" @click.native="closeLeftmenu()" to="/bookshelf"  exact><i class="fas fa-book"></i> ชั้นหนังสือ</router-link>
            <router-link class="list-sub-menu-mobile"  active-class="active-submenu" @click.native="closeLeftmenu()" to="/writer" exact><i class="fa fa-pencil"></i> นักเขียน</router-link>
                
        </div>

    </div>
</template>

<script  lang="ts" >
import Vue from 'vue';
// import NovelModal from "@/components/widgetNovelModal.vue";
export default Vue.extend({
  name: 'TopBar',
  components:{
    //    NovelModal
    // notication:()=>import("../components/Notication.vue"),
    profilemenu:()=>import("../components/Menu.vue")
  },
  data() {
        return {
            prevScrollpos: window.pageYOffset,
            profile_onmouse:false,
            current:"",
						scroll:document.documentElement.scrollTop
        }
    },
    methods: {
        // openmenu(key:string):void{
        //     document.getElementsByClassName("profile-contai-modal")[0].classList.add("profile-show")
        //     this.current = key
        // },
    // closemenu():void{
    //         document.getElementsByClassName("profile-menu")[0].classList.remove("profile-crad-show")
    //         document.getElementsByClassName("profile-contai-modal")[0].classList.remove("profile-show")
    //     },
				onScroll() {
					let Topbar = document.getElementById("Topbar") as HTMLElement
					if(this.$route.fullPath.split("/")[1] === 'read' ){
						if(window.top.scrollY > 12){
							Topbar.style.top = "-100px"
						}
						else{
							Topbar.style.top = "0px"
						}
					// this.scroll = window.top.scrollY 
					}else{
						Topbar.style.top = "0px"
					}
					
					 
					// this.windowTop = window.top.scrollY /* or: e.target.documentElement.scrollTop || this.$route.path === '/search'*/
				},
        search(){

        //   let Topbar = document.getElementById("Topbar") as HTMLElement
        //   let content = document.getElementsByClassName("content")[0] as HTMLElement
        //   Topbar.style.display = "none"
        //   content.style.paddingTop = "0px"
        //   content.style.paddingBottom = "0px"
    
        }, 
        openLeftmenu(){
              let leftmenu = document.getElementById('leftmenu') 
              leftmenu?.classList.toggle('leftmenu-show');
              
        },
        closeLeftmenu(){
            let leftmenu = document.getElementById('leftmenu') 
            leftmenu?.classList.remove('leftmenu-show')
            
        },
    },
    mounted(){
        if(this.$route.path === '/search'){
            this.search()
        }
		window.addEventListener("scroll", this.onScroll)
        let elememt = document.getElementsByClassName("profile-menu")[0] as HTMLElement
        elememt.onmouseover = ():void => {
            this.profile_onmouse = true
            console.log(this.profile_onmouse)
        };
        elememt.onmouseout =  ():void => {
            this.profile_onmouse = false
       };

    }
});
</script>
<style lang="scss" scoped>
$second-blue: #1E2046 ;
$second-gray: #444349 ;
$second-grayLight: #CFD4D9 ;
$primary-yellow:#f4bb40c9;
#Topbar{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1500;
     background: #FFFFFF;
		 transition: 0.3s;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;

}
.topbar{
    transition: .3s;
    display: grid;
    max-width: 1050px;
    // padding: 0px 10px;
    margin: auto;
    margin-top: 0px;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    // padding: 17px 0px;

}
.text{
    color: $second-blue;
}

.in-logo{
    display: flex;
   align-items: center;
    grid-gap: 10px;
}
.menu{
    width: 100%;
    justify-content: flex-end;
    display: flex;
    color: $second-gray;

}
.menu ul{
    width: 140px;
    display: flex;
    justify-content: space-between;
}
.menu ul li{
   cursor: pointer;
   border-radius: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 40px;
   height: 40px;
}
.menu ul li:hover{
   background: #f0f2f5;
}
.fa-search, .fa-bell, .fa-user{
    font-size: 18px;
    color: $second-blue;
}
.sub-menu{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: $second-gray;
    // background: #f3f3f3b4;
    // backdrop-filter: blur(30px);
    // padding: 15px 0px;
}
.sub-menu ul{
    width: 407px;
    display: flex;
    // grid-gap: 10px;
    justify-content: space-around;
    margin: 6px 0px;

}

.list-sub-menu{
   padding: 10px 20px;
   border-radius: 6px;
   color: $second-blue;
   transition: .2s;
   cursor: pointer;
}
.list-sub-menu:hover{
   background: #ebebeb
}
.writer:hover{
   background: #ebebeb
}
.active-submenu{
    background: $primary-yellow;
    color: #ffffff !important;
}
.menu-line{
    display: flex;
    width: 100%;
    justify-content: center;
}
.line{
    width: 500px;
    height: 1px;
    width: 70%;
    background-color: #e0e0e0;
}
.logo{
    font-size: 20px;
    width: 100%;
    // font-family: 'Chela One', cursive;
    font-family: 'Nunito', sans-serif;
    display: flex;
        align-items: flex-start;
    grid-gap: 0px 10px;
    color:#1C1140;;

}

.logo img{
    width: 32px;
}
.menu-mobile{
 display: none;
 margin-bottom: 5px;
}
.user-active{
        // background: #eae6f1;
        position: relative;
				background: #ececec;
    // overflow: hidden;
    width: 40px;
    height: 40px;
    }
.writer{
    position: relative;
    display: flex;
    align-items: center;
    grid-gap: 7px;
}
.box-writer{
    position: absolute;
    left: 0px;
    bottom: -54px;
    display: none;

    padding: 10px 0px;


}
.bg-box-writer{
         box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    padding: 5px 20px;
    background: #ffffff;
    border-radius: 5px;
    width: 100px;

}
.writer:hover .box-writer{
    display: block;
}
.arrow{
    border: 1px  solid #cacaca;
    border-bottom: 0px;
    border-right: 0px;
    top: 2px;
    position: absolute;
    width: 13px;
    height: 13px;
    background: #ffffff;
    left: 15px;
    transform: rotate(45deg);
}
.fa-chevron-up{
    font-size: 10px;
    transition: 0.3s;
    transform: rotate(90deg);
    margin-top: 2px;
 }


.writer:hover .fa-chevron-up{
    transform: rotate(180deg);

}

.contai-profile-menu{
    position: fixed;
    width: 100%;
    height: 100vh;

}

.con-profile{
    display: flex;
    grid-gap: 10px;

}
.img-profile{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    // border: 2px solid #1C1140;
}
.coin{
    width: 240px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.gold{
    background: #FDF4CB !important;
}
.diamond{
    background: #ECE6F8 !important;
}
.con-list{
    display: flex;
    align-items: center;
    grid-gap: 10px;
}
.btn{
    display: flex;
    align-items: center;
    padding: 2px 7px;
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
}
.btn-diamond{
     @extend .btn;
    background: #8C6AC7;
}
.btn-gold{
    @extend .btn;
    background: #F4BA40;
}
.profile-contai-modal{
    top: 0;
        left: 0;
        z-index: 3000;
        position: fixed;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff00;
        opacity: 0;
        transition: .3s;
        pointer-events: none;
}
.profile-show{
    opacity: 10;
    pointer-events: auto;
}

.profile-crad-show{
    margin-top: 0px;


}
.leftmenu{
   width: 205px;
   padding: 10px;
   display: flex;
   display: none;
   background: #fff;
   position: fixed;
//    border-radius: 0px 10px 10px 0px;
   height: fit-content;
   margin-left: -250px;
   transition: 0.3s;
   box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
   flex-direction: column;
}
.leftmenu-show{
   margin-left: 0px;
}
.list-sub-menu-mobile{
    color: #000000;
    font-size: 15px;
    // background: #241065;
    display: flex;
    gap: 15px;
    margin: 8px 0px;
    padding: 8px;
    border-radius: 5px;
}

list-sub-menu-mobile,i,list-sub-menu{
    padding-top: 3px;
}
@media (max-width: 1200px){
	.topbar{
		padding: 0px 10px;
	}
}
@media (max-width: 768px){
    .active-submenu{
        background: #f4bb4000 !important;
        color: #8359FF !important;
    }
    .leftmenu{
        display: flex;
    }
    .topbar{

        transition: .3s;
        display: grid;
        margin-top: 0px;
        grid-template-columns: 1fr 1fr ;
        justify-items: center;
        align-items: center;
        padding: 10px 10px;
        background: #FFFFFF;
        // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .sub-menu{
        display: none;
    }
    .logo{
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    .logo .text{
        font-size: 17px;
    }
    .logo img{
        width: 25px;
    }
    .menu-mobile{
        display: flex;
    }
    .user-active{
        background: #eae6f1;
    }
}


</style>


function api(api: any) {
  throw new Error('Function not implemented.');
}

function api(api: any) {
  throw new Error('Function not implemented.');
}
