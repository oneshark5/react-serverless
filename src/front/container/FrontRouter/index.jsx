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

/**
 * 思路：这个大的
 * 
 */
function Router() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Routes>
          {/* 就这一个最重要 */}
          <Route path='/artDetail' element={<ArtDetail/>} />
          <Route path='/testArt' element={<TestArt/>} />
          <Route path='/categories' element={<Categories/>} />
          <Route path='/say' element={<Say/>} />
          <Route path='/camera' element={<Camera/>} />
          <Route path='/link' element={<Link/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/show' element={<Show/>} />
          <Route path='/' element={<Home/>} />
        </Routes>
      </div>
    </main>
  )
}
export default Router
