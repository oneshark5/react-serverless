import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import About from '../About';
import Camera from '../Camera';
import Categories from '../Categories';
import Home from '../Home'
import Link from '../Link';
import Resume from '../Resume';
import Say from '../Say';
import styles from './index.scss'

function Router() {
  return (
    <div className={styles.main}>
      <div className={styles.center}>
        <Routes>
          {/* 就这一个最重要 */}
          <Route path='/' element={<Home/>} />
          <Route path='/categories' element={<Categories/>} />
          <Route path='/say' element={<Say/>} />
          <Route path='/camera' element={<Camera/>} />
          <Route path='/link' element={<Link/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/resume' element={<Resume/>} />
        </Routes>
      </div>
    </div>
  )
}
export default Router
