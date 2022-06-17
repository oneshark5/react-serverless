import React from 'react'
import styles from './style.module.scss'

const Banner = ({ schema }) => {
  // 从后台获取属性
  const { attributes = {} } = schema
  const { title, description, backgroundUrl, backgroundHeight } = attributes

  const wrapperStyleObj = backgroundUrl ? { 
    backgroundImage:`url('${backgroundUrl}')`
   } : {}

  backgroundHeight && (wrapperStyleObj.height = parseInt(backgroundHeight, 10))
  return (
    <div className='wrapper'>
      <div className={styles.banner} style={wrapperStyleObj}>
        <div className={styles.person}>
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Banner