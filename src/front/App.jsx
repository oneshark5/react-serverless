import { parseJsonByString } from "../common/utils"
import { Helmet } from "react-helmet";
import Banner from './container/Home/components/Banner'
import Footer from './container/Home/components/Footer'
import FrontRouter from './container/FrontRouter'
import styles from './App.module.scss'
import './global.custom.scss'

// 获取schema数据
const pageSchema = parseJsonByString(window.localStorage.schema, {})
const { children = [], attributes = {} } = pageSchema
const { title = '', backgroundUrl = '' } = attributes

// const map = { Banner, Footer }

// const render = (item, index) => {
//   const Component = map[item.name]
//   return Component ? <Component key={index} schema={item} /> : null;
// }

// 要单独生成的两个组件
const navCom = children[0]
const footerCom = children.at(-1)

const App = () => {
  // 背景图片
  const homeBoxStyleObj = {
    backgroundImage: `url('${backgroundUrl}')`
  }
  return (
    <div className={styles.AppBox} style={homeBoxStyleObj}>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {/* 单独生成组件(●'◡'●) */}
      <Banner key='0001' schema={navCom} />
      <FrontRouter />
      <Footer key='1110' schema={footerCom} />
    </div>
  )
}
export default App