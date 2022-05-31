import React from 'react'
import styles from './style.module.scss'
const Banner = () => {
  return (
    <div className={styles.courses}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <img src="./vue3.png" alt="Vue3 系统入门与项目实战123" />
          <h4>Vue3 系统入门与项目实战123</h4>
          <p>课程从 Vue3 基础语法，到组件原理、动画、代码设计，再到新语法扩展，全面系统地梳理 Vue 知识点。学习过程中，老师将倾囊相授多年的“避坑经验” ，带你以企业级代码质量和工程开发流程完成“京东到家”应用，实现对框架的彻底掌握。</p>
        </li>
      </ul>
    </div>
  )
}
export default Banner