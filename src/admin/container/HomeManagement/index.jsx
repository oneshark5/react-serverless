import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import styles from './style.module.scss'
import AreaList from './components/AreaList';
import PageSetting from './components/PageSetting';

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

  const handleSaveBtnClick = () => {
    // 把生成的内容放到LocalStorage中存储
    // const listData = JSON.stringify(list)// 转换成字符串
    // window.localStorage.homeData = listData
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
          <PageSetting />
          <AreaList />
          <div className={styles.save}>
          <Button type="primary" onClick={handleSaveBtnClick}>
            保存区块配置
          </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeManagement