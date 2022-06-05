import React, { useRef, useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import styles from './style.module.scss'
import AreaList from './components/AreaList';
import { parseJsonByString } from '../../../common/utils';

const { Header, Sider, Content } = Layout;

const schema = parseJsonByString(window.localStorage.schema, {})

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
  const areaListRef = useRef()

  const handleSaveBtnClick = () => {
    const { children } = areaListRef.current;
    // 最外层schema结构
    const schema = {
      name:'Page',
      attributes:{},
      children,
    }
    window.localStorage.schema = JSON.stringify(schema)
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
          <AreaList ref={areaListRef} children={schema.children || []} />
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