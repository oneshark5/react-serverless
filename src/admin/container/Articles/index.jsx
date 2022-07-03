import { useState, useEffect, useRef } from 'react';
import { Table, Tag, Space, Button, Popconfirm, Select, message } from 'antd';
import { DeleteOutlined, RedoOutlined } from '@ant-design/icons';
import moment from 'moment';
import { visitorText, adminUid } from '../../../common/constant';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChangePageAttributeAction, getChangePageChildAction } from '../../store/action';

// 给定初始数据，
const articlesData = [
  {
    classes: ["前端基础","基础前端"],
    content: "# 1. 实现效果\n\n点击`点击`按钮，弹出对话框。\n按住对话框顶部并移动，实现拖动效果。",
    date: 1603671734000,
    tags: ["JavaScript","ES6"],
    title: "JavaScript 拖动元素",
    titleEng: "move",
    url: "https://lzxjack.top/post?title=move",
    id: "7323456789",
    _openid: "dbee9976b3c14448a06f2006a4795cf2",
  }
]

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

const { Option } = Select;
const Articles = () => {
  // 获取数据
  // const children = useSelector(state => state.common.schema?.children || [])
  // const childrenAbout = children.filter(element => (element.name === 'ArticleDetail'))
  // const articlesDatas = childrenAbout[0].children.filter(item => !item.attributes)
  // console.log(articlesDatas);


  // 获取数据
  const childrenCom = useSelector(state => state.common.schema?.children || [])
  let index = 0
  for (let i = 0; i < childrenCom.length; i++) {
    if (childrenCom[i].name === 'ArticleDetail') index = i
  }
  const { schema, pageChild = {}, changePageChild } = useStore(index)
  const articlesDatas = pageChild.children?.filter(item => !item.attributes)



  const navigate = useNavigate()

  const { tags=[], classes=[], articles=''} = articlesData?.[0]
  // ——————————————————————搜索框——————————————————————
  const searchWords = useRef();
  const [searchClass, setSearchClass] = useState(null);
  const [searchTag, setSearchTag] = useState([]);
  // 通过输入文字搜索
  const searchByWords = () => {
  };
  // 通过选择分类搜索
  const searchByClass = classesName => {
  };
  // 通过选择标签搜索
  const searchByTag = tagsArr => {

  };
  // 清空搜索内容
  const resetSearch = () => {
    searchWords.current.value = '';
    setSearchClass(null);
    setSearchTag([]);
    setArticlesShow(articles);
  };
  // ————————————————————搜索框end————————————————————————

  // ——————————————————————渲染文章表格——————————————————————
  // 需要展示文章的state
  const [articlesShow, setArticlesShow] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  // 表头
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'id',
      render: text => <strong>{text}</strong>
    },
    {
      title: '发布日期',
      dataIndex: 'date',
      key: 'id',
      sorter: (a, b) => a.date - b.date,
      render: text => <>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</>,
      sortDirections: ['descend'],
      defaultSortOrder: ['ascend']
    },
    {
      title: '分类',
      dataIndex: 'classes',
      key: 'id',
      render: text => (
        <>
          <Tag color='#2db7f5'>{text}</Tag>
        </>
      )
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'id',
      render: tags => (
        <>
          {tags?.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'id',
      render: text => (
        <a href={text} target='_blank' rel='noreferrer'>
          {text}
        </a>
      )
    },
    {
      title: '操作',
      key: 'id',
      render: record => (
        <Space size='middle'>
          <Button type='primary' onClick={() => editArticle(record.id)}>
            修改
          </Button>

          <Popconfirm
            placement='topRight'
            title='确定要删除该文章吗？'
            onConfirm={() => {
              deleteArticle(record.id);
              classMinOne(record.classes);
              deleteMsgs(record.titleEng);
            }}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];
  // 获取最新所有文章，并放入redux
  const getNewArticles = () => {

  };
  // redux中文章数据更新，当前页面的state更新
  useEffect(() => {
    // 用作展示的state
    setArticlesShow(articles);
  }, [articles]);
  // ————————————————————渲染文章表格end——————————————————————————

  // ——————————————————————对文章的操作——————————————————————
  // 删除文章
  const deleteArticle = id => {

  };
  // 向数据库获取所有分类
  const getAllClasses = () => {

  };
  // 相应分类数目-1
  const classMinOne = oldClass => {
  };
  // 修改文章
  const editArticle = id => {
  };
  // 添加文章：转到新建文章页面
  const turnAddPage = () => {
    navigate('/admin/addArticles');
  };
  // ———————————————————————对文章的操作end—————————————————————————

  // 删除相应评论/回复
  const deleteMsgs = titleEng => {
  };

  const getAllMsgs = () => {
  };

  return (
    <>
      <div className='searchBox'>
        <div className='addArticleBtn' onClick={turnAddPage}>
          写文章
        </div>
        <input
          type='text'
          ref={searchWords}
          className='Search'
          placeholder='输入文章标题...'
          onChange={searchByWords}
        />
        <div className='resetBtn' onClick={resetSearch}>
          <RedoOutlined />
        </div>
        <Select
          showSearch
          size='large'
          allowClear
          style={{ width: '360px' }}
          placeholder='请选择文章分类'
          className='searchClass'
          value={searchClass}
          onChange={value => {
            searchByClass(value);
            setSearchClass(value);
          }}
        >
          {classes.map(item => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
        <Select
          mode='multiple'
          showSearch
          showArrow
          size='large'
          allowClear
          style={{ width: '500px' }}
          placeholder='请选择文章标签'
          className='searchTag'
          value={searchTag}
          onChange={value => {
            searchByTag(value);
            setSearchTag(value);
          }}
        >
          {tags?.map(item => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
      </div>
      <Table
        size='middle'
        className='Table'
        bordered
        loading={tableLoading}
        pagination={{
          position: ['bottomCenter'],
          defaultPageSize: 11,
          hideOnSinglePage: true,
          showTitle: false,
          size: ['small']
        }}
        columns={columns}
        dataSource={articlesDatas}
        rowKey={columns => columns.id}
        showSorterTooltip={false}
      />
    </>
  );
};

export default Articles
