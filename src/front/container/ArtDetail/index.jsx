import React from 'react'
import Layout from '../Layout'
import ArtContent from './ArtContent'
import { useSearchParams } from 'react-router-dom'


const ArtDetail = (props) => {
  // 获取id
  const [searchParams, setSearchParams] = useSearchParams()
  let id = searchParams.get('id')

  // 根据id获取schema数据
  const { pageSchema } = props
  const { children = [] } = pageSchema;
  const childrenAbout = children.filter(element => (element.name === 'ArticleDetail'))
  const articleContent = childrenAbout[0].children.filter(item => item.id === Number(id))
  const {classes=[], content='', date='', tags=[], title='', url=''} = articleContent[0]
  
  return (
    <Layout title={title}  >
      <ArtContent content={content} />
    </Layout>
  )
}
export default ArtDetail