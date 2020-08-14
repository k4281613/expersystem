import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    btnChange: true,
    btnChange2: false,
    tapIndex: 0,
    activeIndex: 0,
    dongtaiMsg: [],
    personMsg:[],
    logintemmes:{
      name:'',
      tel:'',
      sex:'',
      email:'',
      introduce:'',
      num:''
    }
  },
  mutations: {
    dongtaiMsgChange(state, val) {
      state.dongtaiMsg = val;
    },
    tapChange(state, val) {
      state.tapIndex = val;
    },
    activeChange(state, val) {
      state.activeIndex = val;
    },
    personMsgChange(state,val){
      state.personMsg = val;
    }
  }
});
