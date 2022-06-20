import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home'
import styles from './index.scss'

function Router() {
  return (
    <div className={styles.main}>
      <div className={styles.center}>
        <Routes>
          {/* 就这一个最重要 */}
          <Route path='/' element={<Home/>} />
          
        </Routes>
      </div>
    </div>
  )
}
export default Router
