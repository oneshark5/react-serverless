import React from 'react'
import styles from './style.module.scss'



const Aside = ({ schema }) => {
  // 从Aside组件获取属性
  const { title, heightCard,  description, imageUrl, tags, icon, link,  } = schema
  console.log(schema);

  return (
    <div className={styles.aside}>
    11111111111
      {/* <ul className={styles.list}>
        {
          children.map((item, index) => {
            const { attributes = {} } = item
            const { heightCard, title, description, imageUrl, tags, link, icon } = attributes
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
      </ul> */}
    </div>
  )
}
export default Aside