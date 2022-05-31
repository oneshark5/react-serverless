import React from 'react'
import styles from './style.module.scss'
import avatarImage from './avatar.jpeg'
const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.person}>
        <img className={styles.avatar} src={avatarImage} alt='oneshark'/>
        <div className={styles.title}>this is the title area</div>
        <div className={styles.description}>this is the description area</div>
      </div>
    </div>
  )
}
export default Banner