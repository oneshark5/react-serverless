import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import ShowItem from './ShowItem'
import s from './index.module.scss';
import request from '../../../common/request'
import { parseJsonByString } from '../../../common/utils';

const Camera = () => {
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
    const childrenShow = children.filter(element => (element.name === 'Camera'))
    var showData = childrenShow[0].children
  }
  console.log('图片',showData)

  return (
    <>
      {
        flag &&
        <Layout title='图片' className={s.showBox}>
          {showData.map(({ attributes }) => (
            <ShowItem
              key={attributes.id}
              cover={attributes.cover}
            />
          ))}
        </Layout>
      }
    </>

  )
}
export default Camera