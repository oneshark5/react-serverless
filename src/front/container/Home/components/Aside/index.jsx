import React from 'react'
import BlogCard from './BlogCard'
import AccountCard from './AccountCard'
import ClockCard from './ClockCard'
import TagCard from './TagCard'
import SiteCard from './SiteCard'
// import MusicCard from './MusicCard'
import styles from './style.module.scss'
import '../styles.scss'


const Aside = ({ schema }) => {
  const map = { BlogCard, AccountCard, ClockCard,TagCard, SiteCard }
  // 从后台获取属性
  const { children = [] } = schema

  // 渲染成组件
  const render = (item, index) => {
    const Component = map[item.title]
    return Component ? <Component key={index} schema={item} /> : null;
  }

  return (
    <div className={styles.aside}>
      {
        children.map(({attributes}, index ) => {
          return render(attributes, index)
        })
      }
    </div>
  )
}
export default Aside