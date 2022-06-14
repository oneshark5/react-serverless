import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { useDispatch, Provider } from 'react-redux';
import { parseJsonByString } from '../common/utils';
import store from './store'
import { getChangeSchemaAction } from './store/action';
import styles from './style.module.scss'
import 'normalize.css' // 页面样式标准化
// import 'antd/dist/antd.css'
import 'antd/dist/antd.min.css';
import './style.scss';
import AdminRouter from './container/AdminRouter';
import axios from 'axios';

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

  const { collapsed, toggleCollapsed } = useCollapsed()
  const handleHomePageRedirect = () => { window.location.href = "/" }
  const { changeSchema } = useStore()

  useEffect(() => {
    axios.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data?.data;
      data && changeSchema(parseJsonByString(data[0].schema))
    })
  }, [changeSchema])

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
                <span className='iconfont'>&#xe69b;</span> 首页内容管理
              </NavLink>
            </Menu.Item>
            <Menu.Item key="admin-setting">
              <NavLink to='/setting'>
              <span className='iconfont'>&#xe69b;</span> 基础内容配置
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="admin-back"
              onClick={handleHomePageRedirect}>
              <span className='iconfont' >&#xe7e5;</span> 返回用户页面
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