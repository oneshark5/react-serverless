// reducer两个作用：一是初始化数据怎么存储，二是接收到action动作改变的时候怎么改变数据内容
// 基础数据
import produce from "immer"
import { parseJsonByString } from '../../../common/utils';

const initialSchema = parseJsonByString(window.localStorage.schema, {
  name:'Page',
  attributes:{},
  children:[]
})
//  初始化数据
const defaultState = {
  schema: initialSchema
}

// 引入redux
// 引入immer接收一个state状态和回调
// draft是当前页面存储的homeManagement的所有数据即defaultSchema的数据
const reducer = (state = defaultState, action) => produce(state, (draft) => {
  switch(action.type){
    case 'CHANGE_SCHEMA':
      draft.schema = action.value;
      break;
    default:
      break;
  }
})
// 不使用immer
// const reducer = (state = defaultSchema, action) => {
//   return state
// }
export default reducer;