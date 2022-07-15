
import { Button, Input } from 'antd';
import styles from './style.module.scss'
import { parseJsonByString } from '../../../common/utils';
import { useCallback } from 'react';
import request from '../../../common/request'
import { useSchemaData } from '../../hook/useSchemaData';

const BasicSetting = () => {

  const { schema = {}, changeSchema, changePageAttribute } = useSchemaData()
  const { attributes = {} } = schema
  const { title = '', poem, backgroundUrl, backgroundUrl02, backgroundUrl03 } = attributes

  // 获取子组件AreaList的children
  const handleSaveBtnClick = () => {
    // ⭐post
    request.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    },{
      headers: {
        'Content-Type': 'application/json;charset=utf8mb4',
      },
    }).then(() => { })
  }

  const handleResetBtnClick = () => {
    // ⭐get
    request.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data;
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
