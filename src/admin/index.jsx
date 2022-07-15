import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { Provider, useDispatch } from 'react-redux';
import store from './store'
import styles from './style.module.scss'
import 'normalize.css' // 页面样式标准化
import 'antd/dist/antd.min.css';
import './style.scss';
import AdminRouter from './container/AdminRouter';
import { getChangeSchemaAction } from './store/action';
import axios from 'axios';
import { parseJsonByString } from '../common/utils';
import Login from './container/Login';

const { Header, Sider, Content } = Layout;

// 封装hooks函数
const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return { collapsed, toggleCollapsed }
}


// store中存取数据（把使用store的逻辑放在一起）
const useStore = () => {
  const dispatch = useDispatch()
  // dispatch
  const changeSchema = (schema) => {
    // 调用dispatch
    dispatch(getChangeSchemaAction(schema))
  }
  return { changeSchema }
}

const Wrapper = () => {

  const handleHomePageRedirect = () => { window.location.href = "/" }
  const { collapsed, toggleCollapsed } = useCollapsed()
  const { changeSchema } = useStore()
  const token = window.localStorage.token;

  // 请求数据
  useEffect(() => {
    axios.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data?.data;
      data && changeSchema(parseJsonByString(data[0].schema))
    })
  }, [changeSchema])

  return token ? (
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
          </Header>
          <Content className={styles.content}>
            <AdminRouter />
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  ) : <Login/>
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