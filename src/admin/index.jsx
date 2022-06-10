import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { Layout, Menu } from 'antd';
import { Provider } from 'react-redux'
import store from './store'
import HomeManagement from './container/HomeManagement';
import styles from './style.module.scss'

import 'normalize.css' // 页面样式标准化
import 'antd/dist/antd.css'
import './style.scss';



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

  const { collapsed, toggleCollapsed } = useCollapsed()
  const handleHomePageRedirect = () => {window.location.href = "/"}

  return (
    <Layout>
      <Sider className={styles.sidebar} trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="admin-home">
            <span className='iconfont'>&#xe69b;</span> 首页内容管理
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
        <HomeManagement/>
        </Content>
      </Layout>
    </Layout>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <Wrapper/>
    </Provider>
);