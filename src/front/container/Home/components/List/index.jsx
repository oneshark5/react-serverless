import React from 'react'
import styles from './style.module.scss'
import listImage from './vue3.png'

const List = ({ schema }) => {
  // 从后台获取属性
  const { children = [] } = schema
  console.log(children);
  return (
    <div className='wrapper'>
      <ul className={styles.list}>

        {
          children.map(({attributes: {title, description, imageUrl, link} }, index) => (
            <li className={styles.item}>
              <a href={link} target="_blank" rel='noreferrer'>
                <img className={styles.img} src={imageUrl} alt={title} />
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.desc}>{description}</p>
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
export default List