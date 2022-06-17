import React, { useState } from 'react'
import './index.custom.scss';
import styles from './style.module.scss'
import { Drawer } from 'antd';
import { MenuOutlined, HomeOutlined, BgColorsOutlined, SettingOutlined } from '@ant-design/icons';

const Banner = ({ schema }) => {
  // 从后台获取属性
  const { children = [] } = schema

    // 移动端按钮
    const [visible, setVisible] = useState(false)

  return (
    <div className='wrapper'>
      <nav className={styles.nav}>
        <div className={styles.navContent}>

          <div className={styles.homeBtn}>
            <HomeOutlined />
          </div>

          {
            children.map(({ attributes: { title, link } }, index) =>
              <div className={styles.navBtn}>{title}</div>
            )
          }

          {/* 黑白模式切换 */}
          <div className={styles.modeBtn}>
            <BgColorsOutlined />
            <div className={styles.modeOptions}>
            </div>
          </div>

          {/* 后台管理 */}
          <a className={styles.adminBtn}>
            <SettingOutlined />
          </a>
        </div>
      </nav>

      {/* 移动端 */}
      <div className={styles.mobileNavBtn} onClick={() => setVisible(true)}>
        <MenuOutlined />
      </div>
      <Drawer placement="left" onClose={() => setVisible(false)}
        visible={visible} className='mobile-nav-box'>
        <div className={styles.mobileNavBox}>
          {
            children.map(({ attributes: { title } }, index) => 
              <div key={index} className={styles.mobileNavItem}> 
              {title} 
            </div>)
          }
        </div>
      </Drawer>
    </div>
  )
}
export default Banner