import React from 'react'
import Card from '../../Card';
import styles from './index.module.scss'



const Aside = ({ schema }) => {
  // 从Aside组件获取属性
  const { imageUrl  } = schema
  console.log(schema);

  return (
    <Card className={styles.card}>
      <p className={styles.text}>
        晚上好<br />欢迎<br/>来到<br />
        <span className={styles.color}>本站</span>。
      </p>
      <img src={imageUrl} className={styles.avatar} alt='' />
    </Card>
  )
}
export default Aside