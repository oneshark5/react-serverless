import React from 'react'
import { Skeleton } from 'antd';
import classNames from 'classnames'
import styles from'./index.module.scss'


// 解构出来的属性，是其他父组件调用该Card组件时，所定义的属性
export default function Card({ children, className, loading, isStatic, onClick }) {
  return (
    <div className={classNames(styles.card,
      // { ['center']: loading },
      // { ['active']: !isStatic },
      className
    )}
      onClick={onClick}
    >
      {/* 加载缓冲？？？ */}
      {loading ? <Skeleton paragraph={{ rows: 1 }} /> : children}
    </div>
  )
}


