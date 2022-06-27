import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import Card from '../../../Card'
import { Pagination } from 'antd';
import './pagination.custom.scss';
import styles from './style.module.scss'
import { NavLink, useNavigate } from 'react-router-dom';

const Section = ({ schema }) => {
  // 从后台获取属性
  const { children = [] } = schema

  // 定义路由
  const navigate = useNavigate()

  const linkToDetail = (id) => {
    // navigate(`/artDetail?id=${id}`)
    navigate(`/artDetail`)
  }


  return (
    <div className={styles.section} >
      {
        children.map((item, index) => {
          const { attributes = {} } = item
          const { title, description, tags, createTime, link } = attributes
          return (
            <NavLink key={index} to={{pathname:`/artDetail?id=${link}`}}>
              <Card className={styles.card} >
                <div className={styles.title}>{title}</div>
                <p className={styles.description}>{description}</p>
                <div className={styles.info}>
                  <span className={styles.date}>{dayjs(createTime).format('YYYY-MM-DD')}</span>
                  <span className={styles.tags}>{tags}</span>
                </div>
              </Card>
            </NavLink>
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