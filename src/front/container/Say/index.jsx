import React from 'react'
import { parseJsonByString } from '../../../common/utils'
import Layout from '../Layout'
import SayPop from './SayPop'
// 获取数据
// 获取schema数据
const pageSchema = parseJsonByString(window.localStorage.schema, {})
const { children = [] } = pageSchema;
const childrenSay = children.filter(element => (element.name === 'Say'))
const sayContents = childrenSay[0].children

export default function Say() {
  return (
    <Layout title='记录'>
      {
        sayContents.map(({ id, sayContent, date }) => (
        <SayPop key={id} content={sayContent} date={date} />
      ))
      }
    </Layout>
  )
}
