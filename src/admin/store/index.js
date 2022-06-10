// store 入口---这里对reducer做了拆分，因为一个工程可能不止一个schema，还有可能存其他共享数据
// 把后台首页管理页面的数据放到HomeManagementReducer去管理
// 拆分reducer，然后在store引入reducer

import { createStore, combineReducers } from 'redux'
import  commonReducer from './reducer'

// 采用combineReducers构建reducer
const reducer = combineReducers({
  common: commonReducer
})

const store = createStore(
  reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
export default store