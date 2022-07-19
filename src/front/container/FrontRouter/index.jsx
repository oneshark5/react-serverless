import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import About from '../About';
import ArtDetail from '../ArtDetail';
import Camera from '../Camera';
import Categories from '../Categories';
import Home from '../Home'
import Link from '../Link';
import Show from '../Show';
import Say from '../Say';
import TestArt from '../TestArt';
import styles from './index.module.scss'
import Articles from '../Articles';

const Router = (props) =>  {
  const { pageSchema } = props
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Routes>
          {/* 就这一个最重要 */}
          <Route path='/articles' element={<Articles pageSchema={pageSchema}/>} />
          <Route path='/artDetail' element={<ArtDetail pageSchema={pageSchema}/>} />
          <Route path='/testArt' element={<TestArt pageSchema={pageSchema}/>} />
          <Route path='/categories' element={<Categories pageSchema={pageSchema}/>} />
          <Route path='/say' element={<Say pageSchema={pageSchema}/>} />
          <Route path='/camera' element={<Camera pageSchema={pageSchema}/>} />
          <Route path='/link' element={<Link pageSchema={pageSchema}/>} />
          <Route path='/about' element={<About pageSchema={pageSchema}/>} />
          <Route path='/show' element={<Show pageSchema={pageSchema}/>} />
          <Route path='/' element={<Home pageSchema={pageSchema}/>} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </main>
  )
}
export default Router
