import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Button } from 'antd';
import styles from './style.module.scss'
import AreaList from './components/AreaList';
import { parseJsonByString } from '../../../common/utils';
import { getChangeSchemaAction } from './store/action';

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
  // 使用redux，采用useSelector拿到仓库的数据
  const schema = useSelector((state) => {
    return state.homeManagement.schema
  })
  // dispatch
  const changeSchema = (schema) => {
    // 调用dispatch
    dispatch(getChangeSchemaAction(schema))
  }
  return { schema, changeSchema }
}

const HomeManagement = () => {

  const { collapsed, toggleCollapsed } = useCollapsed()
  const { schema, changeSchema } = useStore()

  const handleHomePageRedirect = () => {
    window.location.href = "/"
  }

  // 获取子组件AreaList的children
  const handleSaveBtnClick = () => {
    window.localStorage.schema = JSON.stringify(schema)
  }
  // 要重置的是children
  // 改变props，子组件跟着渲染就可以
  const handleResetBtnClick = () => {
    const newSchema = parseJsonByString(window.localStorage.schema, {})
    changeSchema(newSchema)//action
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
          <AreaList />
          <div className={styles.button}>
            <Button type="primary" onClick={handleSaveBtnClick}>
              保存区块配置
            </Button>
            <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>
              重置区块配置
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeManagement