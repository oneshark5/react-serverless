import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Button } from 'antd';
import styles from './style.module.scss'
import AreaList from './components/AreaList';
import { parseJsonByString } from '../../../common/utils';


const { Header, Sider, Content } = Layout;

const initialSchema = parseJsonByString(window.localStorage.schema, {})

// 封装hooks函数
const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return { collapsed, toggleCollapsed }
}

const HomeManagement = () => {
  const dispatch = useDispatch()

  const { collapsed, toggleCollapsed } = useCollapsed()
  // 定义状态
  const [schema, setSchema] = useState(initialSchema)
  const handleHomePageRedirect = () => {
    window.location.href = "/"
  }
  const areaListRef = useRef()

  // 使用redux，采用useSelector拿到仓库的数据
  const state = useSelector((state) => {
    console.log(state);
    return {};
  })

  // 获取子组件AreaList的children
  const handleSaveBtnClick = () => {
    const { getSchema } = areaListRef.current;
    // 最外层schema结构
    const schema = {
      name:'Page',
      attributes:{},
      children:getSchema() // 调用getSchema获取子组件的children内容
      // 层层获取子组件中schema对应的内容，最终把schema拼接完成，然后存储起来
    }
    window.localStorage.schema = JSON.stringify(schema)
  }
  // 要重置的是children
  // 改变props，子组件跟着渲染就可以
  const handleResetBtnClick = () => {
    const newSchema = parseJsonByString(window.localStorage.schema, {})
    // setSchema(newSchema)//设置已经保存的schema---未保存的会被重置
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