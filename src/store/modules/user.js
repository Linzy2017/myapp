/**
 * Created by LQZ on 2017/6/23.
 */
import * as types from '../mutation-types'
// initial state
const state = {
  passNum: 0,
  grade: 0,
  answerTime: 0,
  loginType: false
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.CHANGE_LOGIN_TYPE] (state) {
    state.loginType = true
  },
  [types.COUNT_ALL_TIME] (state, mes) {
    state.answerTime = mes
  },
  [types.COUNT_PASS_NUM] (state) {
    state.passNum ++
  },
  [types.CLEAR_STATE] (state) {
    state.passNum = 0
    state.grade = 0
    state.answerTime = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
