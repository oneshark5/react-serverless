
import React, { useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Steps, Button, Form, Input } from 'antd';
import styles from './style.module.scss'
import { parseJsonByString } from '../../../common/utils';
import { getChangePageChildAction, getChangeSchemaAction, getChangePageAttributeAction } from '../../store/action';
import { cloneDeep } from 'lodash' 
import axios from 'axios';

const { Step } = Steps;


// ⭐store中存取数据（把使用store的逻辑放在一起）
const useStore = () => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据
  const pageChild = useSelector(state => state.common.schema.children || {})
  const schema = useSelector((state) => {
    return state.common.schema
  })
  // dispatch
  const changeSchema = (schema) => {
    // 调用dispatch
    dispatch(getChangeSchemaAction(schema))
  }

  const changePageChild = (tempPageChild) => {
    dispatch(getChangePageChildAction(tempPageChild))
  }

  const changePageAttribute = (key, value) => {
    dispatch(getChangePageAttributeAction(key, value))
  }

  return { schema, pageChild, changePageChild, changeSchema, changePageAttribute }
}


// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
const Articles = () => {
  const { pageChild, schema = {}, changeSchema, changePageChild, changePageAttribute } = useStore()

  const [current, setCurrent] = useState(0)
  const [tempPageChild, setTempPageChild] = useState(cloneDeep(pageChild))//临时变量控制着内部弹窗组件选择框的内容

  
  const { attributes = {} } = schema
  const { title = '', poem, backgroundUrl } = attributes

  const layout = {
    //label和input在一行所占比例
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  }

  const BlogsForm = useRef(null)


  // ⭐事件处理函数
  const handleNext = () => {
    // 校验后才能下一步
    if (current === 0) {
      BlogsForm.current.validateFields().then(res => {
        // 分类信息
        console.log(res);
        setCurrent(current + 1)
      }).catch(error => {
        console.log(error);
      })
    } else {
      setCurrent(current + 1)
    }
    // 临时保存
    changePageChild(tempPageChild)
  }
  const handlePrecious = () => {
    setCurrent(current - 1)
  }

  // 获取子组件AreaList的children
  const handleSaveBtnClick = () => {
    axios.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    },{
      headers: {
        'Content-Type': 'application/json;charset=utf8mb4'
      },
    }).then(() => { })
  }
  // 要重置的是children
  // 改变props，子组件跟着渲染就可以
  const handleResetBtnClick = () => {
    axios.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data?.data;
      data && changeSchema(parseJsonByString(data[0].schema))
    })
  }

  // 事件处理函数
  // 每次BasicSetting组件重新渲染的时候都会重新生成该方法，浪费性能；采用useCallback优化/useMemo也可以
  const handleTitleChange = useCallback((e) => {
    changePageAttribute('title', e.target.value)
  }, [changePageAttribute])

  const handlePoemChange = useCallback((e) => {
    changePageAttribute('poem', e.target.value)
  }, [changePageAttribute])

  const handleBackgroundChange = useCallback((e) => {
    changePageAttribute('backgroundUrl', e.target.value)
  }, [changePageAttribute])

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="撰写博客"
      />

      <Steps current={current}>
        <Step title="基本信息" description="博客标题，博客分类" />
        <Step title="博客内容" description="博客主题内容" />
        <Step title="博客提交" description="保存草稿或者提交审核" />
      </Steps>

      {/* 表单 */}
      <div style={{ marginTop: '50px' }}>
        <div className={current === 0 ? '' : styles.active}>
          <Form
            {...layout} ref={BlogsForm} name="basic"
          >
            <Form.Item
              ref={BlogsForm}
              label="文章标题"
              name="articleTitle"
              rules={[
                {
                  required: true,
                  message: '请设置你的博客标题!',
                },
              ]}
            >
              <Input  />
            </Form.Item>

            <Form.Item
              label="文章标签"
              name="articleTabs"
              rules={[
                {
                  required: true,
                  message: '请设置相关标签!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="创建时间"
              name="createTime"
              rules={[
                {
                  required: true,
                  message: '请设置相关标签!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </div>

      <div style={{ marginTop: '50px' }}>
        {
          current === 2 && <span>
            <Button type='primary' >保存草稿箱</Button>
            <Button danger >提交审核</Button>
          </span>
        }
        {
          current < 2 && <Button onClick={() => handleNext()}>下一步</Button>
        }
        {
          current > 0 && <Button onClick={() => handlePrecious()}>上一步</Button>
        }
      </div>
    </div>
  )
};

export default Articles