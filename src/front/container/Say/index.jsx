import React, { useEffect, useState } from 'react'
import { parseJsonByString } from '../../../common/utils'
import Layout from '../Layout'
import SayPop from './SayPop'
import request from '../../../common/request'

export default function Say() {
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
    const childrenSay = children.filter(element => (element.name === 'Say'))
    var sayContents = childrenSay[0].children
  }

  return (
    <>
      {
        flag &&
        <Layout title='碎碎念'>
          {
            sayContents.map(({ id, sayContent, date }) => (
              <SayPop key={id} content={sayContent} date={date} />
            ))
          }
        </Layout>
      }
    </>
  )
}
