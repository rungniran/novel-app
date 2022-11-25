
import {Auth, Gatway} from "../shares/services";
import { alertSystem } from "../shares/modules/alert";
import  router  from "../router";
import  profile_writer  from "@/shares/modules/image";
export type statetype = {
    dataset?:any| null,
    display_name?:string| null,
    coin?:string | null,
    loggedIn?:boolean | null
    token?:string|null
    penname_preview?:string,
    image_data?:string
}


const disployName = ()=>{
    if (JSON.parse(localStorage.getItem("dataset") as any)){
        
        if(JSON.parse(localStorage.getItem("dataset") as any)?.user_profile_datas.user_nickname ){
           return JSON.parse(localStorage.getItem("dataset") as any)?.user_profile_datas.user_nickname 
        }else{
            return JSON.parse(localStorage.getItem("dataset") as any)?.user_profile_datas.first_name +' '+  JSON.parse(localStorage.getItem("dataset") as any)?.user_profile_datas.last_name
        }
    }else{
        return null
    }
}


const state:statetype = {
    dataset: localStorage.getItem("dataset") ? JSON.parse(localStorage.getItem("dataset") as string) : null, 
    display_name: disployName(),
    coin: localStorage.getItem("coin") ? JSON.parse(localStorage.getItem("coin") as string ) as string : null,
    loggedIn: localStorage.getItem("loggedIn") ? localStorage.getItem("loggedIn") as boolean | null : null,
    token:localStorage.getItem("token") as string | null,
    // image_data:
    // penname_preview:'string'

}
const actions = {

}
const getters ={
    loggedIn:():boolean=>{
        const loggedIn = localStorage.getItem("loggedIn")
        if(!loggedIn){
            return false
        }else{
            return true
        }
    },
    _dataset:(state:statetype):any=>{
        return state.dataset
    },
    _token:(state:statetype):any=>{
        return state.token
    }
    
}
const mutations = {
    async login(state:statetype,{token,status}:{token:string,status:string }):Promise<void>{
        state.token = token
        const resProfile = await Auth.customer(token)
        if(resProfile.data.email_verified_at){
            const profile =  resProfile.data.user_profile_datas[0]
            
            const profilewriter = resProfile.data.user_profile_datas[1] !== undefined 
            ? resProfile.data.user_profile_datas[1]
            : null
            const resFetchcookie = await Auth.fetchcookie(token)
            if(profilewriter){
                if(profilewriter.image_data){
                    profilewriter.image_data.url = await profile_writer(profilewriter.id, 0);
                }    
            }
            if(resFetchcookie.data.data !== 'Success'){
                const cookie = resFetchcookie.data.data.cookie?.item !== undefined
                ? resFetchcookie.data.data.cookie?.item 
                : JSON.parse(resFetchcookie.data.data.cookie)?.item
                localStorage.setItem("StoryRead", JSON.stringify(cookie));
            }
            localStorage.setItem("loggedIn", status);
            localStorage.setItem("token", token);
            const object = {
                ...resProfile.data , 
                show_name: `${profile?.first_name}  ${profile?.last_name}` , 
                image_url: profilewriter ? await profile_writer(profilewriter.id, 0): 'https://cdn-icons-png.flaticon.com/512/149/149071.png', 
                user_profile_datas: profile !== undefined
                ? profile 
                :{
                    user_nickname:'e9eb971e-70bc-4e4e-bfd6-38046e326e29',
                    first_name:'test',
                    last_name:'test',
                    count_novel_data:'0',
                    follower:'0'
                },
                profile_writer: profilewriter
            }
            localStorage.setItem("dataset", JSON.stringify(object));
            state.dataset = object
            state.display_name = disployName()
            const routers= router as any
            console.log( routers.history.current?.hash=== "#login");
            setTimeout(() => {
                routers.history.current?.hash !== "#login" ? window.location.reload() : window.location.href = '/'
            }, 500);
        }else{
            alertSystem('คุณต้องยืนยันอีเมลก่อน')
            
        }
        
        
    },
    async logout(state:statetype):Promise<void>{
        await Gatway.getService("/logout");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("dataset");
        localStorage.removeItem("StoryRead");
        state.token =  null
        state.dataset = null
        state.display_name = null
        state.loggedIn = false
        window.location.href = "/";
    },
    countCoin(state:statetype,{buy}:{buy:any}):void{
        const int = parseInt(state.coin as any)
        const toFloat = parseFloat(int.toFixed(2)).toFixed(2)
        const count = Number(toFloat) - buy
        state.coin = count.toFixed(2) as any
        
        localStorage.setItem("coin",  count.toFixed(2) as any)
    },
    async reset(state:statetype):Promise<void>{
        const  key = localStorage.getItem("token") as string
        if(key){
            const resProfile =  await Auth.customer(key)
                state.coin = resProfile.data.coin_balance_sandbox
                const profile =  resProfile.data.user_profile_datas[0]
                const profilewriter = resProfile.data.user_profile_datas[1] !== undefined 
                ? resProfile.data.user_profile_datas[1]
                : null
                if(profilewriter){
                    if(profilewriter.image_data){
                        console.log(await profile_writer(profilewriter.id, 0));
                        profilewriter.image_data.url = await '';
                    }    
                }
                const object = {
                    ...resProfile.data  , 
                    show_name: `${profile?.first_name}  ${profile?.last_name}`, 
                    // user_profile_datas: profile,
                    image_url: profilewriter ? await profile_writer(profilewriter.id, 0) : 'https://cdn-icons-png.flaticon.com/512/149/149071.png', 
                    user_profile_datas: profile !== undefined 
                        ? profile 
                        : {
                            user_nickname:'e9eb971e-70bc-4e4e-bfd6-38046e326e29',
                            first_name:'test',
                            last_name:'test',
                            count_novel_data:'0',
                            follower:'0'
                        },
                    profile_writer: profilewriter
                } 
                state.dataset = object
                state.display_name = disployName()
                // console.log(encode(JSON.stringify(object)));
                
                localStorage.setItem("dataset", JSON.stringify(object));
            
        }
    }
}


export default {state, getters, mutations, ...actions}

