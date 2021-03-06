// reducer两个作用：一是初始化数据怎么存储，二是接收到action动作改变的时候怎么改变数据内容
// 基础数据
import { produce, original } from "immer"
import {
  CHANGE_SCHEMA, ADD_PAGE_CHILDREN, CHANGE_PAGE_CHILD, DELETE_PAGE_CHILD,
  CHANGE_PAGE_CHILD_POSITION, CHANGE_PAGE_ATTRIBUTE, CHANGE_COM_CHILD_ATTRIBUTE,
  DELETE_PAGE_CHILD_CHILDREN, CHANGE_ASIDE_CHILD_POSITION
} from './constant'

// ⭐⭐⭐这就是原始数据
const initialSchema = {
  name: 'Page',
  attributes: {},
  children: []
}
//  初始化数据
const defaultState = {
  schema: initialSchema
}
// 引入redux
// 引入immer接收一个state状态和回调
// draft是当前页面存储的homeManagement的所有数据即defaultSchema的数据
const reducer = (state = defaultState, action) => produce(state, (draft) => {
  switch (action.type) {
    case CHANGE_SCHEMA:
      draft.schema = action.value;
      break;
    case ADD_PAGE_CHILDREN:
      draft.schema.children.push(action.value)
      break;
    case CHANGE_PAGE_CHILD:
      draft.schema.children.splice(action.index, 1, action.value);
      break;
    case DELETE_PAGE_CHILD:
      draft.schema.children.splice(action.index, 1);
      break;
    case CHANGE_PAGE_CHILD_POSITION:
      const copy = original(draft.schema.children);
      console.log(copy);
      draft.schema.children.splice(action.oldIndex, 1);
      draft.schema.children.splice(action.newIndex, 0, copy[action.oldIndex]);
      break;
    case CHANGE_ASIDE_CHILD_POSITION:
      const copy2 = original(draft.schema.children);
      const asidesCopySchema = copy2.filter(item => item.name === 'Asides')
      const changeCopy = asidesCopySchema[0].children

      const asideSchema = draft.schema.children.filter(item => item.name === 'Asides')
      console.log(asideSchema);

      asideSchema.children?.splice(action.oldIndex, 1);
      asideSchema.children?.splice(action.newIndex, 0, changeCopy.children[action.oldIndex]);
      break;
    case CHANGE_PAGE_ATTRIBUTE:
      draft.schema.attributes[action.key] = action.value;
      break;
    case CHANGE_COM_CHILD_ATTRIBUTE:
      draft.schema.children.filter(item => item.name === 'About')[0].children[0].attributes[action.key] = action.value;
      break;
    case DELETE_PAGE_CHILD_CHILDREN:
      draft.schema.children.splice(action.index, 1);
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