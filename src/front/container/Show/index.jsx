import React from 'react'
import Layout from '../Layout'
import ShowItem from './ShowItem'
import s from './index.module.scss';

const Resume = (props) => {
  const { pageSchema } = props
  const { children = [] } = pageSchema;
  const childrenShow = children.filter(element => (element.name === 'Show'))
  const showData = childrenShow[0].children


  return (
    <Layout title='作品' className={s.showBox}>
      {showData.map(({attributes}) => (
        <ShowItem
          key={attributes.id}
          cover={attributes.cover}
          link={attributes.link}
          name={attributes.name}
          descr={attributes.descr}
        />
      ))}
    </Layout>
  )
}
export default Resume