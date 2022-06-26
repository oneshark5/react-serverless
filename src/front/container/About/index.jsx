import React from 'react'
import { parseJsonByString } from '../../../common/utils'
import Layout from '../Layout'
import AboutMe from './AboutMe'
// 获取schema数据
const pageSchema = parseJsonByString(window.localStorage.schema, {})
const { attributes = {} } = pageSchema;
const { aboutContent = '' } = attributes

export default function About() {
  return (
    <Layout title='关于'>
      <AboutMe content={aboutContent} />
    </Layout>
  )
}
