import { useState, useEffect } from "react";
import axios from 'axios'
import { parseJsonByString } from "../../../common/utils"
import { Helmet } from "react-helmet";
import Section from './components/Section'
import Aside from './components/Aside'
import styles from './index.module.scss'
import PageTitle from "../PageTitle";
// import './global.custom.scss'

// 获取schema数据
// const pageSchema = parseJsonByString(window.localStorage.schema, {})
// const { children = [], attributes = {} } = pageSchema
// const { title = '', poem = '' } = attributes

const map = { Section, Aside }

const render = (item, index) => {
  const Component = map[item.name]
  return Component ? <Component key={index} schema={item} /> : null;
}

// // 把中间组件取出
// const midComs = children.filter(item => item.name !== 'Banner' && item.name !== 'Footer')

// import React from 'react'
const Home = () => {
  const [pageSchema, setPageSchema] = useState({})
  const { children = [], attributes = {} } = pageSchema
  const { title = '', poem = '' } = attributes
  // 把中间组件取出
  const midComs = children.filter(item => item.name !== 'Banner' && item.name !== 'Footer')

  useEffect(() => {
    axios.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data?.data;
      data && setPageSchema(parseJsonByString(data[0].schema));
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageTitle title={title} desc={poem} className={styles.homeTitle} />

      {/* 各个组件：筛选组件，把第一个和最后一个去掉===>想渲染特定的组件 */}
      <div className={styles.body}>
        {
          midComs.map((index, item) => {
            return render(index, item)
          })
        }
      </div>
    </>
  )
}
export default Home