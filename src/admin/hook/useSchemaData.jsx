import { 
  getChangeSchemaAction, 
  getChangePageAttributeAction, 
  getDeletePageChildAction,
  getChangePageChildAction } from '../store/action';
import { useDispatch, useSelector } from 'react-redux';

// store中存取数据（把使用store的逻辑放在一起）
export const useSchemaData = (index) => {
  const dispatch = useDispatch()
  const schema = useSelector((state) => { return state.common.schema })
  const changePageAttribute = (key, value) => { dispatch(getChangePageAttributeAction(key, value)) }
  const changeSchema = (schema) => { dispatch(getChangeSchemaAction(schema)) }
  // 使用redux，采用useSelector拿到仓库的数据---获取children里面的内容（子节点）
  const pageChild = useSelector(state => state.common.schema.children?.[index] || {})
  const changePageChild = (tempPageChild) => {dispatch(getChangePageChildAction(index, tempPageChild))}
  const removePageChild = () => { dispatch(getDeletePageChildAction(index)) }
  return { 
    schema, 
    pageChild, 
    changePageChild, 
    removePageChild, 
    changeSchema, 
    changePageAttribute }
}