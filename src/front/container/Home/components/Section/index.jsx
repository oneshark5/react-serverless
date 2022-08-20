import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import Card from '../../../Card'
import './pagination.custom.scss';
import styles from './style.module.scss'
import { NavLink } from 'react-router-dom';
import MyPagination from '../../../MyPagination';
import { useState } from 'react';
// import { Pagination } from 'antd';

const Section = ({ schema }) => {
  const [page, setPage] = useState(1);
  // 从后台获取属性
  const pageCount = 8
  const { children = [] } = schema
  const totalArticle = children.length;
  const defaultArt = [...children].splice(0, pageCount).reverse()
  const [selectArticles, setSelectArticles] = useState(defaultArt)


  // 根据page即页数获取响应的文章概述卡片 （根据page截取）
  useEffect(() => {
    let selectArt = [...children].splice((page - 1) * pageCount, pageCount).reverse()
    setSelectArticles(selectArt)
  }, [page])
  // console.log('分页数据为',selectArticles);


  // 定义路由
  // const navigate = useNavigate()

  // const linkToDetail = (id) => {
  //   // navigate(`/artDetail?id=${id}`)
  //   navigate(`/artDetail`)
  // }

  return (
    <div className={styles.section} >
      {
        selectArticles.map((item, index) => {
          const { attributes = {} } = item
          const { title, description, tags, createTime, id } = attributes
          return (
            <NavLink key={index} to={{ pathname: `/artDetail?id=${Number(id)}` }}>
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
        defaultPageSize={pageCount}
        total={totalArticle}
        setPage={setPage}
        autoScroll={true}
        scrollToTop={document.body.clientHeight - 80}
      />

    </div>
  )
}
export default Section