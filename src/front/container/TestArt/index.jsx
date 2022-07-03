import { parseJsonByString } from "../../../common/utils"

import ArticleDetail from './component/ArticleDetail'
import styles from './index.module.scss'
// import './global.custom.scss'



// import React from 'react'
const Home = (props) => {
  // 获取schema数据
const { pageSchema } = props
const { children = [] } = pageSchema

const map = { ArticleDetail, }
const render = (item, index) => {
  const Component = map[item.name]
  return Component ? <Component key={index} schema={item} /> : null;
}

// 把中间组件取出
const articleComs = children.filter(item => item.name == 'ArticleDetail')
console.log(articleComs);
const { title = '', createTime = '', tags = '' } = articleComs[0].children[0].attributes

  return (
    <>
      <div className={styles.box}>
        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.body}>
        {
          articleComs.map((index, item) => {
            return render(index, item)
          })
        }
      </div>
    </>
  )
}
export default Home