import React from 'react'
import dayjs from 'dayjs'
import Card from '../../../Card'
import { Pagination } from 'antd';
import '../../../Home/components/Section/pagination.custom.scss';
import styles from './style.module.scss'


const ArticleDetail = ({ schema }) => {
  // 从后台获取属性
  const { children = [] } = schema
  const { title = '', detail = '', category = '', createTime = '', tags = '', } = children[0].attributes

  return (
    <div className={styles.section} >
      {
        children.map((item, index) => {
          const { attributes = {} } = item
          const { title, description, tags, createTime, link } = attributes
          return (
            <Card className={styles.articleCard} >
              <div className={styles.articleTitle}>{title}</div>
              <p className={styles.detail}>{detail}</p>
              <div className={styles.info}>
                <span className={styles.time}>{dayjs(createTime).format('YYYY-MM-DD')}</span>
                <span className={styles.articleTags}>{tags}</span>
              </div>
            </Card>
          )
        })
      }

    </div>
  )
}
export default ArticleDetail