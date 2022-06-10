import { parseJsonByString } from "../../../common/utils"
import { Helmet } from "react-helmet";
import Banner from './components/Banner'
import Footer from './components/Footer'
import List from './components/List'

// 获取schema数据
const pageSchema = parseJsonByString(window.localStorage.schema, {})
const { children = [], attributes = {} } = pageSchema // 解构

const map = { Banner, Footer, List }

const render = (item, index) => {
  const Component = map[item.name]
  return Component ? <Component key={index} schema={item} /> : null;
}

// import React from 'react'
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>{attributes?.title || ''}</title>
      </Helmet>
      {
        children.map((index, item) => {
          console.log(index, item)
          return render(index, item)
        })
      }
    </div>
  )
}
export default Home