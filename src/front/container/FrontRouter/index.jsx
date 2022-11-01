import React, { createContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import Loading from '../Loading';
import NotFound from '../NotFound';
import styles from './index.module.scss'

export const demoContext = createContext({})
export const { Provider } = demoContext;

const Router = (props) => {
  console.log('路由拿到数据', props);

  return (
    <Provider value={{...props}}>
      <main className={styles.main}>
        <div className={styles.center}>
          <Routes>
            <Route path='/' element={LazyLoad('Home')} />
            <Route path='/articles' element={LazyLoad('Articles')} />
            <Route path='/artDetail' element={LazyLoad('ArtDetail')} />
            <Route path='/categories' element={LazyLoad('Categories')} />
            <Route path='/say' element={LazyLoad('Say')} />
            <Route path='/camera' element={LazyLoad('Camera')} />
            <Route path='/link' element={LazyLoad('Link')} />
            <Route path='/about' element={LazyLoad('About')} />
            <Route path='/show' element={LazyLoad('Show')} />
            {/* 重定向不需要懒加载 */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </Provider>
  )
}
export default Router

// 封装为函数
const LazyLoad = (path) => {
  const Comp = React.lazy(() => import(`../${path}`))
  return (
    <React.Suspense fallback={<><Loading /></>}>
      <Comp />
    </React.Suspense>
  )
}