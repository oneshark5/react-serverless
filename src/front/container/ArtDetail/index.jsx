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
  const content = childrenAbout[0].children.filter(item => item.id === Number(id))
  const articleContent = content.at(-1).articleContent
  
  return (
    <Layout title='Web Workers：在后台线程执行指定脚本'  >
      <ArtContent content={articleContent} />
    </Layout>
  )
}
export default ArtDetail