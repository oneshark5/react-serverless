import React from 'react'
import BlogCard from './BlogCard'
import AccountCard from './AccountCard'
import ClockCard from './ClockCard'
import TagCard from './TagCard'
import SiteCard from './SiteCard'
import MusicCard from './MusicCard'
import styles from './style.module.scss'
import '../styles.scss'


const Aside = ({ schema }) => {
  const map = { BlogCard, AccountCard, ClockCard, TagCard, SiteCard, MusicCard }
  
  // 从后台获取属性
  const { children = [] } = schema
  // 存放拖拽元素
  let dragElement = null;
  const onDragStart = (e) => {
    // 获取当前拖拽元素
    dragElement = e.currentTarget;
  }

  const onDragOver = (e) => {
    // 阻止默认drop以启用drop
    e.preventDefault()
  }

  const onDrop = (e) => {
    // 当拖动结束的时候，给拖动div所在的位置下面的div做drop事件
    let dropElement = e.currentTarget;
    if(dragElement !== null && dragElement !== dropElement){
      let asideBox = document.querySelector('#aside');
      // 临时 div 存储box
      let temp = document.createElement('div');
      // 将temp添加到父元素中
      asideBox.appendChild(temp)
      // 交换
      asideBox.replaceChild(temp, dropElement)
      asideBox.replaceChild(dropElement, dragElement)
      asideBox.replaceChild(dragElement, temp)
    }
  }


  // 渲染成组件
  const render = (item, index) => {
    const Component = map[item.title]
    return Component ?
      <div
        draggable='true'
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        key={index}
      >
        <Component key={item} schema={item}/>
      </div> : null;
  }

  return (
    <div className={styles.aside} id='aside'>
      {
        children.map(({ attributes }, index) => {
          return render(attributes, index)
        })
      }
    </div>
  )
}
export default Aside