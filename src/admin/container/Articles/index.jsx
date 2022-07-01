import { useState, useEffect, useRef } from 'react';
import { Table,Tag,Space,Button,Popconfirm,Select,message} from 'antd';
import { DeleteOutlined, RedoOutlined } from '@ant-design/icons';
import moment from 'moment';
import { visitorText, adminUid } from '../../../common/constant';
import './index.css';


const articlesData = [
  {
    classes: ["前端基础"],
    content: "# 1. 实现效果\n\n点击`点击`按钮，弹出对话框。\n按住对话框顶部并移动，实现拖动效果。",
    date: 1603671734000,
    tags: ["JavaScript"],
    title: "JavaScript 拖动元素",
    titleEng: "move",
    url: "https://lzxjack.top/post?title=move",
    _id: "9e7190f1619b3245073df098577bd92c",
    _openid: "dbee9976b3c14448a06f2006a4795cf2",
  }
]

const { Option } = Select;
const Articles = () => {
  const {tags,classes,articles,getClasses,getArticles,getMsgs,history} = articlesData[0]
  // ——————————————————————搜索框——————————————————————
  const searchWords = useRef();
  const [searchClass, setSearchClass] = useState(null);
  const [searchTag, setSearchTag] = useState([]);
  // 通过输入文字搜索
  const searchByWords = () => {
    setSearchClass(null);
    setSearchTag([]);
    const keyWords = searchWords.current.value.toLowerCase();
    // 如果输入框内容为空，则展示所有文章
    if (!keyWords) {
      setArticlesShow(articles);
      return;
    }
    // 过滤出搜索到的文章
    const newArticlesShow = articles.filter(
      item => item.title.toLowerCase().indexOf(keyWords) !== -1
    );
    // 将搜索到的文章，放入要显示的state
    setArticlesShow(newArticlesShow);
  };
  // 通过选择分类搜索
  const searchByClass = classesName => {
    searchWords.current.value = '';
    setSearchTag([]);
    if (!classesName) {
      setArticlesShow(articles);
      return;
    }
    const newArticlesShow = articles.filter(item => item.classes === classesName);
    setArticlesShow(newArticlesShow);
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
      key: '_id',
      render: text => <strong>{text}</strong>
    },
    {
      title: '发布日期',
      dataIndex: 'date',
      key: '_id',
      sorter: (a, b) => a.date - b.date,
      render: text => <>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</>,
      sortDirections: ['descend'],
      defaultSortOrder: ['ascend']
    },
    {
      title: '分类',
      dataIndex: 'classes',
      key: '_id',
      render: text => (
        <>
          <Tag color='#2db7f5'>{text}</Tag>
        </>
      )
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: '_id',
      render: tags => (
        <>
          {tags.map(tag => {
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
      key: '_id',
      render: text => (
        <a href={text} target='_blank' rel='noreferrer'>
          {text}
        </a>
      )
    },
    {
      title: '操作',
      key: '_id',
      render: record => (
        <Space size='middle'>
          <Button type='primary' onClick={() => editArticle(record._id)}>
            修改
          </Button>

          <Popconfirm
            placement='topRight'
            title='确定要删除该文章吗？'
            onConfirm={() => {
              deleteArticle(record._id);
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
    history.push('/admin/addArticle');
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
            <Option key={item.class}>{item.class}</Option>
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
          {tags.map(item => (
            <Option key={item.tag}>{item.tag}</Option>
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
        dataSource={articlesShow}
        rowKey={columns => columns._id}
        showSorterTooltip={false}
      />
    </>
  );
};

export default Articles
