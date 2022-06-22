import React from 'react'
import Card from '../../Card';
import styles from './index.scss'



const Aside = ({ schema }) => {
  // 从Aside组件获取属性
  const { title, heightCard,  description, imageUrl, tags, icon, link,  } = schema
  console.log(schema);

  return (
    <Card className={styles.card}>
      <p className={styles.text}>
        晚上好<br />
        我叫<span className={styles.color}>飞鸟</span>，<br />
        欢迎来到
        <br />
        我的<span className={styles.color}>个人博客</span>。
      </p>
      <img src={imageUrl} className={styles.avatar} />
    </Card>
  )
}
export default Aside