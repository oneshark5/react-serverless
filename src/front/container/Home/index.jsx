import { parseJsonByString } from "../../../common/utils"
import { Helmet } from "react-helmet";
import Banner from './components/Banner'
import Section from './components/Section'
import Aside from './components/Aside'
import Footer from './components/Footer'
import styles from './styles.module.scss'
import './global.custom.scss'

// 获取schema数据
const pageSchema = parseJsonByString(window.localStorage.schema, {})
const { children = [], attributes = {} } = pageSchema
const { title = '', poem = '', backgroundUrl = '' } = attributes

const map = { Banner, Footer, Section, Aside }

const render = (item, index) => {
  const Component = map[item.name]
  return Component ? <Component key={index} schema={item} /> : null;
}

// import React from 'react'
const Home = () => {
  const homeBoxStyleObj = {
    backgroundImage: `url('${backgroundUrl}')`
  }
  return (
    <div className={styles.HomeBox} style={homeBoxStyleObj}>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className={styles.box}>
        <div className={styles.title}>{title}</div>
        <div className={styles.poem}>{poem}</div>
      </div>

      {/* 各个组件 */}
      {
        children.map((index, item) => {
          return render(index, item)
        })
      }
    </div>
  )
}
export default Home