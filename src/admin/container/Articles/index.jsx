
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Steps, Button, Form, Input, Select, message, notification } from 'antd';
import styles from './style.module.scss'
import { parseJsonByString } from '../../../common/utils';
import { getChangeSchemaAction, getChangePageAttributeAction } from '../../store/action';

const { Step } = Steps;


// store中存取数据（把使用store的逻辑放在一起）
const useStore = () => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据
  const schema = useSelector((state) => {
    return state.common.schema
  })
  // dispatch
  const changeSchema = (schema) => {
    // 调用dispatch
    dispatch(getChangeSchemaAction(schema))
  }
  const changePageAttribute = (key, value) => {
    dispatch(getChangePageAttributeAction(key, value))
  }
  return { schema, changeSchema, changePageAttribute }
}

const BasicSetting = () => {

  const [current, setCurrent] = useState(0)

  const { schema = {}, changeSchema, changePageAttribute } = useStore()
  const { attributes = {} } = schema
  const { title = '', poem, backgroundUrl } = attributes

  const layout = {
    //label和input在一行所占比例
    labelCol: { span: 2 },
    wrapperCol: { span: 22 }
  }

  const BlogsForm = useRef(null)


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
  }
  const handlePrecious = () => {
    setCurrent(current - 1)
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
              name="title"
              rules={[
                {
                  required: true,
                  message: '请设置你的博客标题!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="文章标签"
              name="tabs"
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

export default BasicSetting