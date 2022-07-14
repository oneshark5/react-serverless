import { Helmet } from "react-helmet";
import Banner from './container/Home/components/Banner'
import Footer from './container/Home/components/Footer'
import FrontRouter from './container/FrontRouter'
import styles from './App.module.scss'
import './global.custom.scss'
import { connect } from "react-redux";
import { setMode } from './redux/action'
import BackToTop from "./container/BackToTop";

const App = (props) => {
  const { pageSchema = {}, mode } = props
  console.log(mode);
  const { children = [], attributes = {} } = pageSchema
  const { title = '', backgroundUrl = '', backgroundUrl02 = '', backgroundUrl03 = '' } = attributes

  const navCom = children[0]
  const footerCom = children.at(-1)

  // 背景图片
  // const homeBoxStyleObj = {
  //   backgroundImage: `url('${backgroundUrl}')`
  // }

  const selectBackground = [
    {
      backgroundImage: `url('${backgroundUrl}')`
    },
    {
      backgroundImage: `url('${backgroundUrl02}')`
    },
    {
      backgroundImage: `url('${backgroundUrl03}')`
    },

  ]

  return (
    <div className={styles.AppBox} style={selectBackground[mode]}>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {/* 单独生成组件(●'◡'●) */}
      <Banner key='0001' schema={navCom} />
      <FrontRouter pageSchema={pageSchema}/>
      <Footer key='1110' schema={footerCom} />
      <BackToTop/>
    </div>
  )
}
export default connect(
  (state) => ({
    mode:state.mode
  }),
  { setMode }
)(App)