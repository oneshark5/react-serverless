import { Input } from 'antd'
import React from 'react'
import styles from './style.module.scss'

const { TextArea } = Input;

export default function PageSetting() {
  return (
    <div>
      <div className={styles.row}>
        <span className={styles.label}>页面标题</span>
        <Input className={styles.content} placeholder='请输入页面标题' />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>页面描述</span>
        <TextArea className={styles.content} rows={2} placeholder='请输入页面描述' />
      </div>
    </div>
  )
}
