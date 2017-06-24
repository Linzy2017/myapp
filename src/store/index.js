/**
 * Created by LQZ on 2017/6/21.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import answerPage from './modules/answerPage'
Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    answerPage
  }
})
