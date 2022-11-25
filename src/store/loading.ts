const state = {
  isCheckLoading:localStorage.getItem('isCheckLoading') ? localStorage.getItem('isCheckLoading') : false,
}
const getters = {

}


const actions = {

}

const mutations = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async checkLoading(state:any,{status}) {
    console.log(status);
    localStorage.setItem('isCheckLoading', status)
    state.isCheckLoading = status
    // const item =  await Gatway.postService("/customers/query-image", {"table":"user_profile_data_user_img",ref:uuid} as any);
    // console.log(item);
    

    
    
  },
}

export default {state, getters, mutations, ...actions}