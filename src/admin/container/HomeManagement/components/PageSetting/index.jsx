import { Input } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { parseJsonByString } from '../../../../../common/utils';
import styles from './style.module.scss'

const { TextArea } = Input;

// 把json数据转化成字符串
const schema = parseJsonByString(window.localStorage?.schema, {})

function PageSetting(props, ref) {
  const [title, setTitle] = useState(schema?.children?.[0]?.attributes?.title || '')
  const [description, setDescription] = useState(schema?.children?.[0]?.attributes?.title?.description || '')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }
  useImperativeHandle(ref, () => {
    return { title, description }
  })
  return (
    <div>
      <div className={styles.row}>
        <span className={styles.label}>页面标题</span>
        <Input 
            value={title}
            className={styles.content} 
            placeholder='请输入页面标题' 
            onChange={handleTitleChange}
          />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>页面描述</span>
        <TextArea 
            value={description} 
            className={styles.content} 
            rows={2} 
            placeholder='请输入页面描述'
            onChange={handleDescriptionChange}
          />
      </div>
    </div>
  )
}
export default forwardRef(PageSetting)