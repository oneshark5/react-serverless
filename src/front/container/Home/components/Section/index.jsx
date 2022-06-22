import React from 'react'
import dayjs from 'dayjs'
import Card from '../Card'
import { Pagination } from 'antd';
import './pagination.custom.scss';
import styles from './style.module.scss'




const Section = ({ schema }) => {
  // 从后台获取属性
  const { children = [] } = schema

  return (

    <div className={styles.section} >
      {
        children.map((item, index) => {
          const { attributes = {} } = item
          const { title, description, tags, createTime, link } = attributes
          return (
            <Card className={styles.card} key={index} >
              <div className={styles.title}>{title}</div>
              <p className={styles.description}>{description}</p>
              <div className={styles.info}>
                <span className={styles.date}>{dayjs(createTime).format('YYYY-MM-DD')}</span>
                <span className={styles.tags}>{tags}</span>
              </div>
            </Card>
          )
        })
      }

      {/* 分页 */}
      <div id='myPagination' className={styles.pageBox}>
        <Pagination defaultCurrent={1} total={50} />
      </div>

    </div>
  )
}
export default Section