import React from 'react'
import styles from './style.module.scss'

const Aside = ({ schema }) => {
  // 从后台获取属性
  const { children = [] } = schema

  return (
    <div className='wrapper'>
      <ul className={styles.list}>

        {
          children.map((item, index) => {
            const { attributes = {} } = item
            const { title, description, link } = attributes
            return (
              <li className={styles.item} key={index}>
                <a className={styles.link} href={link} target="_blank" rel='noreferrer'>
                  <h4 className={styles.title}>{title || '暂无标题'}</h4>
                  <p className={styles.desc}>{description || '暂无描述'}</p>
                </a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
export default Aside