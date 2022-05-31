import React from 'react'
import styles from './style.module.scss'

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.person}>
        <img className={styles.avatar} src="https://shark-serverless-static-files.oss-cn-beijing.aliyuncs.com/images/avatar.jpeg" alt='oneshark'/>
        <div className={styles.title}>this is the title area</div>
        <div className={styles.description}>this is the description area</div>
      </div>
    </div>
  )
}
export default Banner