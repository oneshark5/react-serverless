
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import styles from './style.module.scss'
import { parseJsonByString } from '../../../common/utils';
import { getChangeSchemaAction, getChangePageAttributeAction } from '../../store/action';
import { useCallback } from 'react';

// store中存取数据（把使用store的逻辑放在一起）
const useStore = () => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据
  const schema = useSelector((state) => {
    return state.common.schema
  })
  // dispatch
  const changeSchema = (schema) => {
    // 调用dispatch
    dispatch(getChangeSchemaAction(schema))
  }
  const changePageAttribute = (key, value) => {
    dispatch(getChangePageAttributeAction(key, value))
  }
  return { schema, changeSchema, changePageAttribute }
}

const BasicSetting = () => {

  const { schema = {}, changeSchema, changePageAttribute } = useStore()
  const { attributes={} } = schema
  const { title = '' } = attributes

  // 获取子组件AreaList的children
  const handleSaveBtnClick = () => {
    window.localStorage.schema = JSON.stringify(schema)
  }
  // 要重置的是children
  // 改变props，子组件跟着渲染就可以
  const handleResetBtnClick = () => {
    const newSchema = parseJsonByString(window.localStorage.schema, {})
    changeSchema(newSchema)//action
  }

  // 每次BasicSetting组件重新渲染的时候都会重新生成该方法，浪费性能；采用useCallback优化/useMemo也可以
  const handleTitleChange = useCallback((e) => {
    changePageAttribute('title', e.target.value)
  },[changePageAttribute])

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.title}>
          页面标题
        </div>
        <div className={styles.content}>
          <Input value={title} onChange={handleTitleChange} />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button type="primary" onClick={handleSaveBtnClick}>
          保存基础配置
        </Button>
        <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>
          重置基础配置
        </Button>
      </div>
    </div>
  );
};

export default BasicSetting
