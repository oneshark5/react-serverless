import { parseJsonByString } from "../../../common/utils"
import { Helmet } from "react-helmet";
import Banner from './components/Banner'
import Section from './components/Section'
import Aside from './components/Aside'
import styles from './index.module.scss'
import PageTitle from "../PageTitle";
// import './global.custom.scss'

// 获取schema数据
const pageSchema = parseJsonByString(window.localStorage.schema, {})
const { children = [], attributes = {} } = pageSchema
const { title = '', poem = '', backgroundUrl = '' } = attributes


const map = { Section, Aside }

const render = (item, index) => {
  const Component = map[item.name]
  return Component ? <Component key={index} schema={item} /> : null;
}

// 把中间组件取出
const midComs = children.filter(item => item.name != 'Banner' && item.name != 'Footer')

// import React from 'react'
const Home = () => {

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {/* <div className={styles.box}>
        <div className={styles.title}>{title}</div>
        <div className={styles.poem}>{poem}</div>
      </div> */}
      <PageTitle title={title} desc={poem} className={styles.homeTitle}/>

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