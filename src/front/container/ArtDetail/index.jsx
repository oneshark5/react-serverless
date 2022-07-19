import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import ArtContent from './ArtContent'
import { useSearchParams } from 'react-router-dom'
import { parseJsonByString } from '../../../common/utils'
import request from '../../../common/request'


const ArtDetail = (props) => {
  // 获取id
  const [searchParams, setSearchParams] = useSearchParams()
  let id = searchParams.get('id')


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
    const childrenAbout = children.filter(element => (element.name === 'ArticleDetail'))
    const articleContent = childrenAbout[0].children.filter(item => item.id === Number(id))
    var { content = '', title = ''} = articleContent[0]
  }


  return (
    <Layout title={title}  >
      <ArtContent content={content} />
    </Layout>
  )
}
export default ArtDetail