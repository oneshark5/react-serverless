import React, { useState } from 'react'
import './index.custom.scss';
import styles from './style.module.scss'
import { Drawer } from 'antd';
import { MenuOutlined, HomeOutlined, SearchOutlined, BgColorsOutlined, SettingOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames'
import { useEventListener } from 'ahooks';

const Banner = ({ schema }) => {
  // 从后台获取属性
  const { children = [] } = schema
  // 路由，编程式导航;只需要在navigate()里添加要跳转的页面即可
  const navigate = useNavigate()

  // 移动端按钮
  const [visible, setVisible] = useState(false)
  // 导航栏显示与隐藏
  const [navShow, setNavShow] = useState(true)

  // 引入ahooks实现导航栏的显示与隐藏
  useEventListener(
    'mousewheel',
    event => {
      event = event || window.event;
      setNavShow(event.wheelDeltaY > 0);
    },
    { target: document.body }
  );

  return (
    <div className='Nav'>
      <nav className={classNames(styles.nav, { [styles.hiddenNav]: !navShow })}>
        <div className={styles.navContent}>

          <div className={styles.homeBtn} onClick={() => navigate('/')}>
            <HomeOutlined />
          </div>
          

          {/* 中间部分 */}
          {
            children.map(({ attributes: { title, link } }, index) =>
              <NavLink
                className={styles.navBtn}
                to={link}
                key={index}
              >
                {title}
              </NavLink>
            )
          }

          <div className={styles.searchBtn} onClick={() => navigate('/articles')}>
            <SearchOutlined />
          </div>

          {/* 黑白模式切换 */}
          <div className={styles.modeBtn} >
            <BgColorsOutlined />
            <div className={styles.modeOptions}>
            </div>
          </div>

          {/* 后台管理 */}
          <a className={styles.adminBtn} href='#' >
            <NavLink to='/admin.html'/><SettingOutlined />
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