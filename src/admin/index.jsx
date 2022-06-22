import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { Provider } from 'react-redux';
import store from './store'
import styles from './style.module.scss'
import 'normalize.css' // 页面样式标准化
import 'antd/dist/antd.min.css';
import './style.scss';
import AdminRouter from './container/AdminRouter';

const { Header, Sider, Content } = Layout;

// 封装hooks函数
const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return { collapsed, toggleCollapsed }
}

const Wrapper = () => {

  const handleHomePageRedirect = () => { window.location.href = "/" }
  const { collapsed, toggleCollapsed } = useCollapsed()

  return (
    <HashRouter>
      <Layout>
        <Sider className={styles.sidebar} trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="admin-home">
              <NavLink to='/'>
                <span className='iconfont'>&#xe69b;</span> 首页管理
              </NavLink>
            </Menu.Item>
            <Menu.Item key="admin-setting">
              <NavLink to='/setting'>
              <span className='iconfont'>&#xe69b;</span> 基础配置
              </NavLink>
            </Menu.Item>
            <Menu.Item key="admin-articles">
              <NavLink to='/articles'>
              <span className='iconfont'>&#xe69b;</span> 文章撰写
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="admin-back"
              onClick={handleHomePageRedirect}>
              <span className='iconfont' >&#xe7e5;</span> 返回前台
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className={styles.header}>
            {
              collapsed
                ? <span className='iconfont' onClick={toggleCollapsed} >&#xe62c;</span>
                : <span className='iconfont' onClick={toggleCollapsed} >&#xe629;</span>
            }
          </Header>
          <Content className={styles.content}>
            <AdminRouter />
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Wrapper />
  </Provider>
);