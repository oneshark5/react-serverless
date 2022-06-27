import React from 'react'
import { parseJsonByString } from '../../../common/utils'
import Layout from '../Layout'
import AboutMe from './AboutMe'
// 获取schema数据
const pageSchema = parseJsonByString(window.localStorage.schema, {})
const { children = [] } = pageSchema;
const childrenAbout = children.filter(element => (element.name === 'About'))
const aboutContent = childrenAbout[0].children[0].aboutContent

export default function About() {
  return (
    <Layout title='关于'>
      <AboutMe content={aboutContent} />
    </Layout>
  )
}
