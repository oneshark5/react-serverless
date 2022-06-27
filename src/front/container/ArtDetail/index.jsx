import React, { useState } from 'react'
import Layout from '../Layout'
import ArtContent from './ArtContent'
import { parseJsonByString } from '../../../common/utils'
import { useSearchParams } from 'react-router-dom'


export default function ArtDetail() {
  // 获取id
  const [searchParams, setSearchParams] = useSearchParams()
  let id = searchParams.get('id')

  // 根据id获取schema数据
  const pageSchema = parseJsonByString(window.localStorage.schema, {})
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
