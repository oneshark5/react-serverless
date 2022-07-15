
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import styles from './style.module.scss'
import { parseJsonByString } from '../../../common/utils';
import { getChangeSchemaAction, getChangePageAttributeAction } from '../../store/action';
import { useCallback } from 'react';
import axios from 'axios'

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
  const { attributes = {} } = schema
  const { title = '', poem, backgroundUrl, backgroundUrl02, backgroundUrl03 } = attributes

  // 获取子组件AreaList的children
  const handleSaveBtnClick = () => {
    // 获取token
    const { token } = window.localStorage;
    // ⭐post
    axios.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    },{
      headers: {
        'Content-Type': 'application/json;charset=utf8mb4',
        token
      },
    }).then(() => { })
  }

  const handleResetBtnClick = () => {
    // ⭐get
    axios.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data?.data;
      data && changeSchema(parseJsonByString(data[0].schema))
    })
  }

  // 事件处理函数
  // 每次BasicSetting组件重新渲染的时候都会重新生成该方法，浪费性能；采用useCallback优化/useMemo也可以
  const handleTitleChange = useCallback((e) => {
    changePageAttribute('title', e.target.value)
  }, [changePageAttribute])

  const handlePoemChange = useCallback((e) => {
    changePageAttribute('poem', e.target.value)
  }, [changePageAttribute])

  const handleBackgroundChange = useCallback((e) => {
    changePageAttribute('backgroundUrl', e.target.value)
  }, [changePageAttribute])
  const handleBackground02Change = useCallback((e) => {
    changePageAttribute('backgroundUrl02', e.target.value)
  }, [changePageAttribute])
  const handleBackground03Change = useCallback((e) => {
    changePageAttribute('backgroundUrl03', e.target.value)
  }, [changePageAttribute])

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

      <div className={styles.row}>
        <div className={styles.title}>
          每日诗句
        </div>
        <div className={styles.content}>
          <Input value={poem} onChange={handlePoemChange} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.title}>
          背景图片1
        </div>
        <div className={styles.content}>
          <Input value={backgroundUrl} onChange={handleBackgroundChange} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.title}>
          背景图片2
        </div>
        <div className={styles.content}>
          <Input value={backgroundUrl02} onChange={handleBackground02Change} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.title}>
          背景图片3
        </div>
        <div className={styles.content}>
          <Input value={backgroundUrl03} onChange={handleBackground03Change} />
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
