import { useEffect, useState } from 'react'
import { parseJsonByString } from "../../../common/utils"
import { Helmet } from "react-helmet";
import axios from 'axios'
import Banner from './components/Banner'
import Footer from './components/Footer'
import List from './components/List'

const map = { Banner, Footer, List }

const render = (item, index) => {
  const Component = map[item.name]
  return Component ? <Component key={index} schema={item} /> : null;
}

// import React from 'react'
const Home = () => {
  const [pageSchema, setPageSchema] = useState({})
  const { children = [], attributes = {} } = pageSchema // 解构

  useEffect(() => {
    axios.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data?.data;
      data && setPageSchema(parseJsonByString(data[0].schema))
    })
  },[])

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