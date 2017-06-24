/**
 * Created by LQZ on 2017/6/21.
 */
import * as types from './mutation-types'

export const allTimeCount = ({commit}) => {
  setInterval(() => {
    commit(types.COUNT_ALL_TIME)
    console.log('1')
  }, 1000)
}
