// export function  img(uuid, number) {

//   const item =  await Gatway.postService("/customers/query-image", {"table":"user_profile_data_user_img",ref:uuid} as any);
//   console.log(item);
  

import { Gatway } from '@/shares/services'
  
// },
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  const  profile_writer = async (uuid:string, number:number)=> {
  // status(error.response.status)
  const item =  await Gatway.postService("/guest/query-image", {"table":"user_profile_data_user_img",ref:uuid} as any);
  if (item.data.code ===422) {
    return 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  }else{
    if( item.data.data.length !== 0){
      // console.log('>>>>>', item.data.data[number].url);
      
      return item.data.data[number].url
    }else{
      return 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    }
  }
  
  
  
}
export default  profile_writer