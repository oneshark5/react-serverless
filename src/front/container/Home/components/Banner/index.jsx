import React from 'react'
import styles from './style.module.scss'

const Banner = () => {
  const title = window.localStorage.title || '鲨鱼小站'
  const description = window.localStorage.description || 'this is the description area'
  return (
    <div className='wrapper'>
      <div className={styles.banner}>
        <div className={styles.person}>
          <img className={styles.avatar} src="https://shark-serverless-static-files.oss-cn-beijing.aliyuncs.com/images/avatar.jpeg" alt='oneshark' />
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </div>
  )
}
export default Banner