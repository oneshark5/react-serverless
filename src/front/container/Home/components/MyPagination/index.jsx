import React from 'react'
import { Pagination } from 'antd';
import styles from './style.module.scss'
import '../styles.scss'

const MyPagination = ({ schema }) => {
  // 从后台获取属性
  const { children = [] } = schema

  return (
    <div>
      {
        children.map((item, index) => {
          const { attributes = {} } = item
          const { defaultPageSize, total } = attributes

          return (
            <Pagination defaultCurrent={defaultPageSize} total={total} />
          )
        })
      }
    </div>
  )
}
export default MyPagination