import { useState } from 'react';
import { useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { Modal, Table, Space, Button, Popconfirm, message } from 'antd';
import { useSchemaData } from '../../hook/useSchemaData';
import './index.css';

const linkData = [
  {
    avatar: "https://img.lzxjack.top/img/202203311655126.webp",
    descr: "青石落晚巷 故人未还乡",
    link: "https://www.nesxc.com/",
    name: "小N同学",
    id: "14139e12611f4027060f9f3c611eb99c",
    _openid: "9bf44da2dbb8473da1fcf4f591cb82ff",
  }
]

const Link = props => {

  // 获取数据
  const childrenCom = useSelector(state => state.common.schema?.children || [])
  let index = 0
  for (let i = 0; i < childrenCom.length; i++) {
    if (childrenCom[i].name === 'Link') index = i
  }
  const { pageChild = {}, changePageChild } = useSchemaData(index)
  const linkArr = pageChild.children
  const linkData = []
  linkArr.map(item => linkData.push(item.attributes))

  // ——————————————————————————————渲染友链表格————————————————————————————
  const [tableLoading, setTableLoading] = useState(false);
  // 表头
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
      render: text => <strong>{text}</strong>,
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'id',
      render: text => (
        <a href={text} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'id',
    },
    {
      title: 'Descr',
      dataIndex: 'descr',
      key: 'id',
    },
    {
      title: '操作',
      key: 'id',
      render: record => (
        <Space size="middle">
          <Button type="primary" onClick={() => editLink(record.id)}>
            修改
          </Button>

          <Popconfirm
            placement="topRight"
            title="确定要删除该友链吗？"
            onConfirm={() => deleteLink(record.id)}
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
  // 获取所有友链数据，放入redux
  // const getLinksData = () => {
  // };
  // ——————————————————————————————渲染友链表格end————————————————————————————

  // ————————————————————————————添加/编辑友链对话框————————————————————————————
  const [addLinkVisible, setAddLinkVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // 某条友链的详细数据
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [avatar, setAvatar] = useState('');
  const [descr, setDescr] = useState('');
  // 展示添加友链的页面
  const showAddLink = () => {
    setAddLinkVisible(true);
  };
  // 对话框确认
  const addLinkOK = () => {
    if (!name || !link || !avatar || !descr) {
      message.info('信息填写不完整哦😄');
      return;
    }
    if (isEdit) {
      // 更新友链
      updateLink();
    } else {
      // 添加友链
      addLink();
    }
  };
  // 清空所有输入框
  const clearLinkInput = () => {
    setId('');
    setName('');
    setLink('');
    setAvatar('');
    setDescr('');
  };
  // 对话框取消
  const addLinkCancel = () => {
    setAddLinkVisible(false);
    clearLinkInput();
    setIsEdit(false);
  };
  // ————————————————————————————添加/编辑友链对话框end————————————————————————————

  // ——————————————————————————————对友链的操作————————————————————————————

  // 友链添加或更新后的操作
  // const afterLinkChange = isEdit => {
  // };
  // 发送添加友链请求
  const addLink = () => {
    // 更改内容
    const item = cloneDeep(pageChild)
    changePageChild(item)
    message.info('请再次确认是否发表哦😄')
    setAddLinkVisible(false)
  };
  // 发送更新友链请求
  const updateLink = () => {
  };
  // 点击编辑友链，获取该友链信息
  const editLink = ID => {
    setId(ID);
    setIsEdit(true);
    setAddLinkVisible(true);
    const linkObj = props.links.filter(item => item.id === ID)[0];
    const { name, link, avatar, descr } = linkObj;
    setName(name);
    setLink(link);
    setAvatar(avatar);
    setDescr(descr);
  };
  // 删除友链
  const deleteLink = id => {
  };
  // ——————————————————————————————对友链的操作end————————————————————————————

  return (
    <>
      <div className="searchBox">
        <div type="primary" className="addLinkBtn" onClick={showAddLink}>
          添加友链
        </div>
        <Modal
          title={isEdit ? '修改友链' : '添加友链'}
          visible={addLinkVisible}
          onOk={addLinkOK}
          onCancel={addLinkCancel}
        >
          <div className="linkInputBox">
            <div className="modalInputBox">
              <div className="modalInputKey">name：</div>
              <input
                className="modalInputValue"
                type="text"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="modalInputBox">
              <div className="modalInputKey">link：</div>
              <input
                className="modalInputValue"
                type="text"
                value={link}
                onChange={e => {
                  setLink(e.target.value);
                }}
              />
            </div>
            <div className="modalInputBox">
              <div className="modalInputKey">avatar：</div>
              <input
                className="modalInputValue"
                type="text"
                value={avatar}
                onChange={e => {
                  setAvatar(e.target.value);
                }}
              />
            </div>
            <div className="modalInputBox">
              <div className="modalInputKey">descr：</div>
              <input
                className="modalInputValue"
                type="text"
                value={descr}
                onChange={e => {
                  setDescr(e.target.value);
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
      <Table
        size="middle"
        className="Table"
        bordered
        loading={tableLoading}
        pagination={{
          position: ['bottomCenter'],
          defaultPageSize: 11,
          hideOnSinglePage: true,
          showTitle: false,
          size: ['small'],
        }}
        columns={columns}
        dataSource={linkData}
        rowKey={columns => columns.id}
        showSorterTooltip={false}
      />
    </>
  );
};

export default Link
