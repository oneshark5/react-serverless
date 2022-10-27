import React, { useState } from 'react'
import './index.custom.scss';
import styles from './style.module.scss'
import { Drawer } from 'antd';
import { MenuOutlined, HomeOutlined, SearchOutlined, BgColorsOutlined, SettingOutlined, CheckOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames'
import { useEventListener, useUpdateEffect } from 'ahooks';
import { connect } from 'react-redux';
import { setMode } from '../../../../redux/action';
import { modeMap, modeMapArr } from '../../../utils/modeMap';
import { useLinkList } from './config';

const bodyStyle = window.document.getElementsByTagName('body')[0].style;

const Banner = ({ schema, mode, setMode }) => {
  // 从后台获取属性
  const { children = [] } = schema

  // 获取移动端导航条数据
  const { mobileNavArr } = useLinkList();


  // 路由，编程式导航;只需要在navigate()里添加要跳转的页面即可
  const navigate = useNavigate()
  

  // 移动端按钮
  const [visible, setVisible] = useState(false)
  // 导航栏显示与隐藏
  const [navShow, setNavShow] = useState(true)

  const modeOptions = ['rgb(215, 225, 225)', 'rgb(200, 150, 155)', 'rgb(1, 43, 85)'];

  // 引入ahooks实现导航栏的显示与隐藏
  useEventListener(
    'mousewheel',
    event => {
      event = event || window.event;
      setNavShow(event.wheelDeltaY > 0);
    },
    { target: document.body }
  );

  useUpdateEffect(() => {
    // setLocalMode(mode);
    for (const type of modeMapArr) {
      bodyStyle.setProperty(type, modeMap[type][mode]);
    }
  }, [mode]);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
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

          {/* 模式切换 */}
          <div className={styles.modeBtn} >
            <BgColorsOutlined />
            <div className={styles.modeOptions}>
              {
                modeOptions.map((backgroundColor, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor }}
                    className={classNames(styles.modeItem, styles[`modeItem${index}`])}
                    onClick={() => setMode?.(index)}
                  >
                    <CheckOutlined style={{ display: mode === index ? 'block' : 'none' }} />
                  </div>
                ))
              }
            </div>
          </div>

          {/* 后台管理 */}
          <div className={styles.adminBtn} >
            {/* <NavLink to='/admin.html' /><SettingOutlined /> */}
            <a className={styles.link} href="/admin"><SettingOutlined /></a>
          </div>
        </div>
      </nav>

      {/* 移动端 */}
      {/* <button className={styles.mobileNavBtn} onClick={showDrawer}>
        <MenuOutlined />
      </button> */}

      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div className={styles.mobileNavBox}>
          {
            children.map(({ attributes: { title } }, index) =>
              <div key={index} className={({ isActive }) =>
                isActive ? styles.mobileNavActive : styles.mobileNavItem
              }>
                {title}
              </div>)
          }
        </div>
      </Drawer>
      {/* <Drawer 
        placement="left" 
        onClose={() => setVisible(false)}
        visible={visible} 
        className='mobile-nav-box'
      >
        <div className={styles.mobileNavBox}>
          {
            children.map(({ attributes: { title } }, index) =>
              <div key={index} className={({ isActive }) =>
                isActive ? styles.mobileNavActive : styles.mobileNavItem
              }>
                {title}
              </div>)
          }
        </div>
      </Drawer> */}


      {/*改成导航条吧。。。 */}
      <div className={styles.boboMobileNavBox}>
        <div className={styles.boboMobileNav}>
          {mobileNavArr.map((item, index) => (
            <NavLink
              className={styles.boboMobileNavItem}
              to={item.to}
              key={index}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

    </>
  )
}
export default connect(
  (state) => ({
    mode: state.mode
  }),
  { setMode }
)(Banner)