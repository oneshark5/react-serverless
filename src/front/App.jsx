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


  // 看性能用的
  // // MutationObserver 给我们提供了监听页面DOM树变化的能力
  // // 注册监听函数
  // const observer = new MutationObserver((mutations) => {
  //   console.log('时间：', performance.now(), 'ms', '，DOM树发生变化啦！增加了这些节点:');
  //   for (let i = 0; i < mutations.length; i++) {
  //     console.log(mutations[0].addedNodes);
  //   }
  // })
  // // 开始监听document的节点变化
  // observer.observe(document, {
  //   childList: true,
  //   subtree: true
  // });

  // // performance
  // console.log('页面加载了这些图片：');
  // performance.getEntriesByType('resource').forEach((resource) => {
  //   if (resource.initiatorType === 'img') {
  //     console.log(resource.name);
  //   }
  // })

  return (
    <div className={styles.AppBox} style={selectBackground[mode]}>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {/* 单独生成组件(●'◡'●) */}
      <Banner key='0001' schema={navCom} />
      <FrontRouter pageSchema={pageSchema} />
      <Footer key='1110' schema={footerCom} />
      <BackToTop />
    </div>
  )
}
export default connect(
  (state) => ({
    mode: state.mode
  }),
  { setMode }
)(App)