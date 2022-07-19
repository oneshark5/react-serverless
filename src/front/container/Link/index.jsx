import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import LinkItem from './LinkItem'
import s from './index.module.scss';
import { parseJsonByString } from '../../../common/utils';
import request from '../../../common/request'

export default function Link() {

  const [pageSchema, setPageSchema] = useState({})
  const [flag, setFlag] = useState(false)
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
    const { children = [] } = pageSchema
    let linkArr = []
    children.map(item => { item.name === 'Link' && linkArr.push(item) })
    var linkData = []
    linkArr[0].children.map(item => linkData.push(item.attributes))
  }

  return (
    <>
      {
        flag &&
        <Layout title='友链' className={s.box}>
        {linkData.map((item) => (
          <LinkItem
            key={item.id}
            link={item.link}
            avatar={item.avatar}
            name={item.name}
            descr={item.descr}
          />
        ))}
      </Layout>
      }
    </>
  )
}
