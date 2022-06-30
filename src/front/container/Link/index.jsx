import React from 'react'
import Layout from '../Layout'
import LinkItem from './LinkItem'
import s from './index.module.scss';

export default function Link(props) {
  const { pageSchema } = props
  const { children = [] } = pageSchema
  let linkArr = []
  children.map(item => { item.name === 'Link' && linkArr.push(item) })
  const linkData = []
  linkArr[0].children.map(item => linkData.push(item.attributes))


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
