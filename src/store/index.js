import { createStore } from 'vuex'

export default createStore({
  getters: {
  },
  mutations: {
    LANG(state,val){
      state.lang = val
    },
    VIDEOURL(state,val){
      state.videoUrl = val
    }
  },
  actions: {
  },
  state: {
    lang:"",
    videoUrl:''

  },
  modules: {
  }
})
