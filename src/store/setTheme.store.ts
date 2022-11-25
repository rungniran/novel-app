
type statetype = {
  _theme:any|null
}

const state:statetype = {
  _theme: localStorage.getItem("main_theme") ? localStorage.getItem("main_theme") : ''
}
const getters = {
  _GetTheme(state:statetype):statetype{
    return state._theme
  }
}

   
const actions = {

}

const mutations = {
  async _SetTheme(state:statetype,name:string): Promise<any> {
    console.log(name)
    localStorage.setItem("main_theme", name)
    state._theme = name
  }
}

export default {state, getters, mutations, ...actions}