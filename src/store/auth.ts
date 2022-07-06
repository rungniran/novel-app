
import {Auth} from "../shares/services";
import { alertSystem } from "../shares/modules/alert";
export type statetype = {
    dataset:any,
    display_name?:string| null,
    coin?:string | null,
    loggedIn?:boolean | null
    token?:string
}


const disployName = ()=>{
    if (JSON.parse(localStorage.getItem("dataset") as any)){
        if(JSON.parse(localStorage.getItem("dataset") as any).user_profile_datas.user_nickname ){
           return JSON.parse(localStorage.getItem("dataset") as any).user_profile_datas.user_nickname 
        }else{
            return JSON.parse(localStorage.getItem("dataset") as any).user_profile_datas.first_name +' '+  JSON.parse(localStorage.getItem("dataset") as any).user_profile_datas.last_name
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
    token:localStorage.getItem("token") as string
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
}
const mutations = {
    async login(state:statetype,{token,status}:{token:string,status:string }):Promise<void>{
        const res = await Auth.customer(token)
        // console.log(res.dataemail_verified_at);
        
        if(res.data.email_verified_at){
            const resProfile = await Auth.profile(token, res.data.id)
        //  console.log(JSON.parse(resProfile.data));
            const profile =  resProfile.data.data.user_profile_datas[0]
            const resFetchcookie = await Auth.fetchcookie(token)
            console.log(resFetchcookie.data.data);
            
            if(resFetchcookie.data.data !== 'Success'){
                const cookie = resFetchcookie.data.data.cookie?.item !== undefined
                ? resFetchcookie.data.data.cookie?.item 
                : JSON.parse(resFetchcookie.data.data.cookie)?.item
                localStorage.setItem("StoryRead", JSON.stringify(cookie));
            }
            localStorage.setItem("loggedIn", status);
            localStorage.setItem("token", token);
            const object = {...resProfile.data.data , show_name: `${profile?.first_name}  ${profile?.last_name}` , user_profile_datas: profile}
            localStorage.setItem("dataset", JSON.stringify(object));
            state.dataset = object
            state.display_name = disployName()
            
            window.location.reload() 
        }else{
            alertSystem('คุณต้องยืนยันอีเมลก่อน')
            
        }
        
        
    },
    logout(state:statetype):void{
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("dataset");
        localStorage.removeItem("StoryRead");
        state.loggedIn = false
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
            // const resProfile =  await Auth.customer(key)
            const resProfile = await Auth.profile(key, JSON.parse(localStorage.getItem("dataset") as any).id)
                state.coin = resProfile.data.data.coin_balance_sandbox
                const profile =  resProfile.data.data.user_profile_datas[0]
                const object = {...resProfile.data.data  , show_name: `${profile?.first_name}  ${profile?.last_name}`, user_profile_datas: profile} 
                state.dataset = object
                state.display_name = disployName()
                localStorage.setItem("dataset", JSON.stringify(object));
            
        }
    }
}


export default {state, getters, mutations, ...actions}

