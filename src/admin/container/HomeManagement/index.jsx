import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import styles from './style.module.scss'
import AreaList from './components/AreaList';

const { Header, Sider, Content } = Layout;
// 封装hooks函数
const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return { collapsed, toggleCollapsed }
}

const HomeManagement = () => {
  const { collapsed, toggleCollapsed } = useCollapsed()
  const handleHomePageRedirect = () => {
    window.location.href = "/"
  }

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
          <AreaList/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeManagement