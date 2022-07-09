import { Helmet } from "react-helmet";
import Section from './components/Section'
import Aside from './components/Aside'
import styles from './index.module.scss'
import PageTitle from "../PageTitle";


const Home = (props) => {
  const { pageSchema } = props
  const { children = [], attributes = {} } = pageSchema
  const { title = '', poem = '' } = attributes

  const map = { Section, Aside }
  const render = (item, index) => {
    const Component = map[item.name]
    return Component ? <Component key={index} schema={item} /> : null;
  }

  // // 把中间组件取出
  const midComs = children.filter(item => item.name !== 'Banner' && item.name !== 'Footer')

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageTitle title={title} desc={poem} className={styles.homeTitle} />

      {/* 各个组件：筛选组件，把第一个和最后一个去掉===>想渲染特定的组件 */}
      <div className={styles.body}>
        {
          midComs.map((item, index) => {
            return render(item, index)
          })
        }
      </div>
    </>
  )
}
export default Home