import { useSafeState } from 'ahooks';
import React, { useEffect, useState } from 'react'
import { parseJsonByString } from '../../../common/utils';
import Layout from '../Layout';
import MyPagination from '../MyPagination';
import ArtList from './ArtList';
import Search from './Search';
import request from '../../../common/request'

// const data = [
//   {
//     temp:'628611202788',
//     classes: "前端基础",
//     content: "## Proxy\n\n### Proxy 是什么\n\n通过调用`new Proxy()`",
//     date: 1650115718000,
//     tags: ["ES6", "JavaScript"],
//     title: "ES6：Proxy与Reflect学习笔记",
//     titleEng: "proxy-reflect",
//     url: "https://lzxjack.top/post?title=proxy-reflect",
//     _id: "6f49505e625ac4ef004cf1f16e137f9f",
//     _openid: "dbee9976b3c14448a06f2006a4795cf2",
//   },
//   {
//     classes: "前端基础",
//     content: "## 第二条测试`",
//     date: 1649660525000,
//     tags: ["JavaScript", "HTML"],
//     title: "Web Workers：在后台线程执行指定脚本",
//     titleEng: "web-worker",
//     url: "https://lzxjack.top/post?title=web-worker",
//     _id: "d4107ab16253d33a06664d9a7137c70f",
//     _openid: "dbee9976b3c14448a06f2006a4795cf2",
//   }
// ]


function Articles() {
  const [pageSchema, setPageSchema] = useState({})
  const [flag, setFlag] = useState(false)
  const [page, setPage] = useState(1);
  // 设置状态，初始时是全部数据，等待点击
  const [where, setWhere] = useSafeState(sectionData)

  useEffect(() => {
    request.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data;
      if (data) {
        setPageSchema(parseJsonByString(data[0].schema))
        setFlag(true)
      }
    })
  }, [])
  if (flag) {
    const { children = [] } = pageSchema;
    const childrenSection = children.filter(element => (element.name === 'Section'))
    var sectionData = childrenSection[0].children
  }

  return (
    <>
      {
        flag && 
        <Layout titlt="所有文章">
          <Search
            page={page}
            setPage={setPage}
            where={where}
            setWhere={setWhere}
          >
          </Search >
          <ArtList articles={where}></ArtList>
          {/* <MyPagination></MyPagination> */}
        </Layout>
      }
    </>
  )
}
export default Articles;