import React from 'react'
import styles from './index.module.scss'

const Footer = ({ schema }) => {
  // 从后台获取属性
  const { attributes = {}, children = [] } = schema
  const { record } = attributes

  return (
    <footer>
        {
          children.map((item, index) => {
            const { attributes = {} } = item
            const { title, demo, demoLink, tags } = attributes
            const tagsArr = tags.split(',')

            return (
              <div className={styles.footer} key={index}>
                <span>
                  {title}
                  <a href={demoLink} target='_blank' rel='noreferrer' className={styles.text}>
                    {demo}
                  </a>
                </span>
                <span>
                  <a href={demoLink} target='_blank' rel='noreferrer' className={styles.text}>
                    {record}
                  </a>
                </span>
                <span>
                  {tagsArr.map((item, index) => (
                    <span className={styles.siteFrame} key={index}>
                      {item}
                    </span>
                  ))}
                </span>
              </div>
            )
          })
        }
    </footer>
  )
}
export default Footer