import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './index.module.scss'

const Router = () =>  {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Routes>
          {/* 就这一个最重要 */}
          <Route path='/articles' element={LazyLoad('Articles')} />
          <Route path='/artDetail' element={LazyLoad('ArtDetail')} />
          <Route path='/categories' element={LazyLoad('Categories')} />
          <Route path='/say' element={LazyLoad('Say')} />
          <Route path='/camera' element={LazyLoad('Camera')} />
          <Route path='/link' element={LazyLoad('Link')} />
          <Route path='/about' element={LazyLoad('About')} />
          <Route path='/show' element={LazyLoad('Show')} />
          <Route path='/' element={LazyLoad('Home')} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </main>
  )
}
export default Router

const LazyLoad = (path) => {
  const Comp =React.lazy(() => import(`../${path}`))
  return (
    <React.Suspense fallback={<>加载中。。。</>}>
      <Comp/>
    </React.Suspense>
  )
}