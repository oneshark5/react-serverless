import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import ShowItem from './ShowItem'
import s from './index.module.scss';
import request from '../../../common/request'
import { parseJsonByString } from '../../../common/utils';

const Resume = () => {
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
    const { children = [] } = pageSchema;
    const childrenShow = children.filter(element => (element.name === 'Show'))
    var showData = childrenShow[0].children
  }

  return (
    <>
      {
        flag &&
        <Layout title='作品' className={s.showBox}>
          {showData.map(({ attributes }) => (
            <ShowItem
              key={attributes.id}
              cover={attributes.cover}
              link={attributes.link}
              name={attributes.name}
              descr={attributes.descr}
            />
          ))}
        </Layout>
      }
    </>

  )
}
export default Resume