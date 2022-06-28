import { useCallback, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { Modal, notification, Table, Space, Button, Popconfirm, message, Popover } from 'antd';
import { FormOutlined, MessageOutlined, DeleteOutlined } from '@ant-design/icons';
import { getChangeSchemaAction, getChangePageAttributeAction, getChangePageChildAction } from '../../store/action';
import moment from 'moment';

import {
  emojiPeople,
  emojiNature,
  emojiObj,
  emojiPlace,
  emojiSymbol,
  visitorText,
  adminUid,
} from '../.././../common/constant';
import './index.css';
import '../index.css'


// store中存取数据（把使用store的逻辑放在一起）
const useStore = (index) => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据
  const schema = useSelector((state) => {
    return state.common.schema
  })
  const pageChild = useSelector(state => state.common.schema.children?.[index] || {})
  const changePageChild = (tempPageChild) => { dispatch(getChangePageChildAction(index, tempPageChild)) }
  const changePageAttribute = (key, value) => {
    dispatch(getChangePageAttributeAction(key, value))
  }
  return { schema, pageChild, changePageAttribute, changePageChild }
}


const data = [
  {
    content: "根据 GitHub 仓库上每次提交的的 commit 记录，编写建站日志...✔️",
    date: 1629726026409,
    id: "2d44d6c26123a54b069aaa0f651448e2",
    _openid: "9bf44da2dbb8473da1fcf4f591cb82ff",
  },
  {
    content: "移动端适配这两天写好📱",
    date: 1630628115571,
    id: "2d44d6c26131691309305f475a8b1e83",
    _openid: "9bf44da2dbb8473da1fcf4f591cb82ff",
  }
]

const Say = props => {
  // 获取数据
  const childrenCom = useSelector(state => state.common.schema?.children || [])
  let index = 0
  for (let i = 0; i < childrenCom.length; i++) {
    if (childrenCom[i].name === 'Say') index = i
  }
  const { schema, changePageAttribute, pageChild = {}, changePageChild } = useStore(index)
  console.log(pageChild.children);
  console.log(schema);


  // ————————————————————渲染说说表格————————————————————
  const [tableLoading, setTableLoading] = useState(false);
  // 表头
  const columns = [
    {
      title: '说说内容',
      dataIndex: 'articleContent',
      key: 'id',
      width: '1200px',
      render: text => <p className="msgs-content">{text}</p>,
    },
    {
      title: '发布日期',
      dataIndex: 'date',
      key: 'id',
      sorter: (a, b) => a.date - b.date,
      render: text => <>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</>,
      sortDirections: ['descend'],
      defaultSortOrder: ['ascend'],
    },
    {
      title: '操作',
      key: 'id',
      render: record => (
        <Space size="middle">
          <Button type="primary" onClick={() => editSay(record.id)}>
            修改
          </Button>

          <Popconfirm
            placement="topRight"
            title="确定要删除该说说吗？"
            onConfirm={() => deleteSay(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // 获得所有说说

  // ————————————————————渲染说说表格end————————————————————

  // ————————————————————————————添加/编辑说说对话框————————————————————————————
  const [addSayVisible, setAddSayVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // 某条说说的详细数据
  const [id, setId] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  console.log(content);


  // 事件处理函数
  // 采用防抖，当一段时间内，输入内容，我们重新及时，不做更新

  const handleContentChange = useCallback((e) => {
    setContent(e.target.value)
  },[changePageChild])


  // 显示对话框
  const showAddSay = () => {
    setAddSayVisible(true);
  };
  // 清空输入框
  const clearSayInput = () => {

  };
  // 对话框确认
  const addSayOK = () => {
    if (!content) {
      message.info('今天发生了什么呢？')
    } else {
      // 更改内容
      const item = cloneDeep(pageChild)
      item.children.push({
        id: Math.trunc(Date.now() * Math.random()),
        date: Date.now(),
        articleContent: content
      })
      // item.children.splice(0, 1, {
      //   id: Math.trunc(Date.now() * Math.random()),
      //   date: Date.now(),
      //   articleContent: content
      // })
      changePageChild(item)
      message.info('请再次确认是否发表哦😄')
      setAddSayVisible(false)
    }
  };
  const addOk = () => {
    window.localStorage.schema = JSON.stringify(schema)
    message.info('发表成功😄')
  }
  // 对话框取消
  const addSayCancel = () => {
    setAddSayVisible(false)
  };
  // ————————————————————————————添加/编辑说说对话框end————————————————————————————

  // ——————————————————————————————对说说的操作————————————————————————————
  // 说说添加或更新后的操作
  const afterSayChange = isEdit => {
  };
  // 发送添加说说请求
  const addSay = () => {
  };
  // 发送更新说说请求
  const updateSay = () => {
  };
  // 点击编辑，根据ID获得说说详情
  const editSay = ID => {

  };
  // 删除说说
  const deleteSay = ID => {
    console.log(ID);
  };
  // ——————————————————————————————对说说的操作end————————————————————————————

  return (
    <>
      <div className="searchBox">
        <div type="primary" className="addLinkBtn" onClick={showAddSay}>
          发表说说
        </div>
        <div type="primary" className='okBtn' onClick={addOk}>确认发表</div>
        <Modal
          title={isEdit ? '更新说说' : '发表说说'}
          visible={addSayVisible}
          // style={{ top: 60 }}
          // width={900}
          onOk={addSayOK}
          onCancel={addSayCancel}
        >
          <div className="sayInputBox">
            <textarea
              className="sayInputText"
              type="text"
              value={content}
              onChange={handleContentChange}
            />

            <Popover
              className="emojiBtn"
              overlayClassName="emojiContent"
              placement="bottom"
              content={emojiPeople}
              trigger="click"
            >
              <Button>😄</Button>
            </Popover>
            <Popover
              className="emojiBtn"
              overlayClassName="emojiContent"
              placement="bottom"
              content={emojiNature}
              trigger="click"
            >
              <Button>☀️</Button>
            </Popover>
            <Popover
              className="emojiBtn"
              overlayClassName="emojiContent"
              placement="bottom"
              content={emojiObj}
              trigger="click"
            >
              <Button>🏀</Button>
            </Popover>
            <Popover
              className="emojiBtn"
              overlayClassName="emojiContent"
              placement="bottom"
              content={emojiPlace}
              trigger="click"
            >
              <Button>⛪</Button>
            </Popover>
            <Popover
              className="emojiBtn"
              overlayClassName="emojiContent"
              placement="bottom"
              content={emojiSymbol}
              trigger="click"
            >
              <Button>🆗</Button>
            </Popover>

          </div>
        </Modal>
      </div>

      <Table
        size="middle"
        className="Table"
        bordered
        pagination={{
          position: ['bottomCenter'],
          defaultPageSize: 11,
          hideOnSinglePage: true,
          showTitle: false,
          size: ['small'],
        }}
        columns={columns}
        // 数据是一个数组的形式
        dataSource={pageChild.children}
        rowKey={columns => columns.id}
        showSorterTooltip={false}
      />
    </>
  );
};

export default Say