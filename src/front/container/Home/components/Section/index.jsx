import React from 'react'
import dayjs from 'dayjs'
import Card from '../../../Card'
import './pagination.custom.scss';
import styles from './style.module.scss'
import { NavLink } from 'react-router-dom';
import MyPagination from '../../../MyPagination';
import { useState } from 'react';

const Section = ({ schema }) => {
  const [page, setPage] = useState(1);
  // 从后台获取属性
  const { children = [] } = schema
  console.log(schema);

  // 定义路由
  // const navigate = useNavigate()

  // const linkToDetail = (id) => {
  //   // navigate(`/artDetail?id=${id}`)
  //   navigate(`/artDetail`)
  // }

  return (
    <div className={styles.section} >
      {
        children.map((item, index) => {
          const { attributes = {} } = item
          const { title, description, tags, createTime, id } = attributes
          return (
            <NavLink key={index} to={{pathname:`/artDetail?id=${Number(id)}`}}>
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
      {/* <div id='myPagination' className={styles.pageBox}>
        <Pagination defaultCurrent={1} total={10} />
      </div> */}
      <MyPagination
        current={page}
        defaultPageSize={10}
        total={2}
        setPage={setPage}
        autoScroll={true}
        scrollToTop={document.body.clientHeight - 80}
      />

    </div>
  )
}
export default Section