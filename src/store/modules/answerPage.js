/**
 * Created by LQZ on 2017/6/21.
 */
import * as types from '../mutation-types'

// initial state
const state = {
  subjectNum: 1,
  passNum: 0,
  lastType: '',
  nowType: '',
  grade: 0,
  nowKey: '现在的答案',
  rightKey: '真确的答案',
  answerTime: 0,
  resultSelect: '',
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
  [types.ADD_SUBJECT_NUM] (state) {
    state.subjectNum++
  },
  [types.CHANGE_SUBJECT_NOWKEY] (state, mes) {
    state.nowKey = mes
  },
  [types.CHANGE_SUBJECT_RIGHTKEY] (state, mes) {
    state.rightKey = mes
  },
  [types.RECOVERY_SUBJECT_KEY] (state) {
    state.nowKey = '现在的答案'
    state.rightKey = '真确的答案'
  },
  [types.CHANGE_SUBJECT_NOWTYPE] (state, mes) {
    state.nowType = mes
  },
  [types.CHANGE_SUBJECT_LASTTYPE] (state, mes) {
    state.lastType = mes
  },
  [types.CHANGE_RESULT_SELCET] (state, mes) {
    state.resultSelect = mes
  },
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
    state.subjectNum = 1
    state.passNum = 0
    state.lastType = ''
    state.nowType = ''
    state.grade = 0
    state.nowKey = '现在的答案'
    state.rightKey = '真确的答案'
    state.answerTime = 0
    state.resultSelect = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
