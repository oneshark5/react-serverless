import React from 'react'
import Layout from '../Layout'
import LinkItem from './LinkItem'
import s from './index.module.scss';
import { parseJsonByString } from '../../../common/utils';

// 获取schema数据
const pageSchema = parseJsonByString(window.localStorage.schema, {})
const { children = [], attributes = {} } = pageSchema
const { name='', avatar='', descr='', link='' } = attributes
let linkArr = []
children.map(item => {item.name === 'Link' && linkArr.push(item)})
const linkData = []
linkArr[0].children.map(item => linkData.push(item.attributes))


export default function Link() {
  return (
    <Layout title='友链' className={s.box}>
      {linkData.map((item) => (
        <LinkItem
          key={item.id}
          link={item.link}
          avatar={item.avatar}
          name={item.name}
          descr={item.descr}
        />
      ))}
    </Layout>
  )
}
