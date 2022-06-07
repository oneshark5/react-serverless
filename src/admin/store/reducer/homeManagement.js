// reducer两个作用：一是初始化数据怎么存储，二是接收到action动作改变的时候怎么改变数据内容
// 基础数据
import produce from "immer"

const defaultSchema = {
  schema: {
    name:'Page',
    attributes:{},
    children:[]
  }
}

// 引入redux
// 引入immer接收一个state状态和回调
const reducer = (state = defaultSchema, action) => produce(state, (draft) => {

})
// 不使用immer
// const reducer = (state = defaultSchema, action) => {
//   return state
// }
export default reducer;