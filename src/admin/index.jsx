import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, NavLink } from 'react-router-dom'
import { Layout, Menu, Popconfirm } from 'antd';
import { EnterOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { Provider } from 'react-redux';
import store from './store'
import { useSchemaData } from './hook/useSchemaData';
import styles from './style.module.scss'
import 'normalize.css' // 页面样式标准化
import 'antd/dist/antd.min.css';
import './style.scss';
import AdminRouter from './container/AdminRouter';
import request from '../common/request'
import { parseJsonByString } from '../common/utils';
import Login from './container/Login';
import { cleanLoginData, getLoginStatus } from './util/login';
import {
  AuthClientProvider,
  Guard,
  GuardMode,
  User,
} from "@authing/react-ui-components";
import { AuthenticationClient } from "authing-js-sdk";

const { Header, Sider, Content } = Layout;

const authClient = new AuthenticationClient({
  // 替换你的 AppId
  appId: "62d1105847f285f487ca5c97",
});

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
  const { changeSchema } = useSchemaData()

  const login = getLoginStatus()
  const photo = window.localStorage.photo;

  // 请求数据
  useEffect(() => {
    request.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data;
      data && changeSchema(parseJsonByString(data[0].schema))
    })
  }, [])

  const handleLogout = () => {
    authClient.logout();
    cleanLoginData();
    window.location.reload()
  }

  return login ? (
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

            <Menu.Item key="admin-article">
              <NavLink to='/admin/article'>
                <span className='iconfont'>&#xe69b;</span> 文章
              </NavLink>
            </Menu.Item>

            <Menu.Item key="admin-say">
              <NavLink to='/admin/say'>
                <span className='iconfont'>&#xe69b;</span> 记录
              </NavLink>
            </Menu.Item>

            <Menu.Item key="admin-link">
              <NavLink to='/admin/link'>
                <span className='iconfont'>&#xe69b;</span> 友链
              </NavLink>
            </Menu.Item>

            <Menu.Item key="admin-about">
              <NavLink to='/admin/about'>
                <span className='iconfont'>&#xe69b;</span> 关于
              </NavLink>
            </Menu.Item>


            <Menu.Item key="admin-test">
              <NavLink to='/admin/test'>
                <span className='iconfont'>&#xe69b;</span> 测试
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
            {/* <img className={styles.avatar} src={photo} alt="avatar" onClick={handleLogout} /> */}
            <div className={styles.HeaderBox}>
              <div className={styles.blogBtn}>
                <HomeOutlined />
              </div>
              <Popconfirm
                className={styles.logoutBtn}
                placement="bottomRight"
                title="确定要退出登录吗？"
                onConfirm={handleLogout}
                okText="Yes"
                cancelText="No"
              >
                <LoginOutlined />
              </Popconfirm>
            </div>
          </Header>
          <Content className={styles.content}>
            <AdminRouter />
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  ) : <Login />
}

// const root = ReactDOM.render(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <Wrapper />
//   </Provider>
// );

ReactDOM.render(
  <Provider store={store}>
    <Wrapper />
  </Provider>,
  document.getElementById('root')
);