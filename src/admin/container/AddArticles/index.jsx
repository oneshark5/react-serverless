import { useSelector } from 'react-redux';
import { useState } from 'react';
import { message, Select, Popconfirm, Button } from 'antd';
import marked from 'marked';
import hljs from 'highlight.js';
import moment from 'moment'

// 代码高亮的主题
import './github-dark.css';
import './index.css';
import { cloneDeep } from 'lodash';
import request from '../../../common/request'
import { useSchemaData } from '../../hook/useSchemaData';

// 初始数据
const articlesData = [
  {
    classes: ["前端基础", "计算机网络"],
    content: "# 1. 实现效果\n\n点击`点击`按钮，弹出对话框。\n按住对话框顶部并移动，实现拖动效果。",
    date: 1603671734000,
    tags: ["JavaScript", "ES6"],
    title: "JavaScript 拖动元素",
    titleEng: "move",
    url: "https://lzxjack.top/post?title=move",
    _id: "9e7190f1619b3245073df098577bd92c",
    _openid: "dbee9976b3c14448a06f2006a4795cf2",
  }
]

const { Option } = Select;
const AddArticles = props => {

  // 获取数据
  const childrenCom = useSelector(state => state.common.schema?.children || [])
  let index = 0
  for (let i = 0; i < childrenCom.length; i++) {
    if (childrenCom[i].name === 'ArticleDetail') index = i
  }
  const { schema, pageChild = {}, changePageChild } = useSchemaData(index)
  const articleData = pageChild.children
  console.log('文章',articleData);

  const { tags=["JavaScript","ES6"], classes=["前端基础","基础前端"], articles, getClasses, getArticles, getMsgs, history } = articleData[0]


  // ————————————————————判断是否是编辑模式、是否是草稿————————————————————————————
  const [isEdit, setIsEdit] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [id, setId] = useState('');
  const [isJudged, setIsJudged] = useState(false);

  // —————————————————————编辑时，获取文章详情———————————————————————
  // 从redux获取文章/草稿详情，参数：redux属性名称、文章/草稿ID
  const getDetailFromRedux = isArticle => {
  };
  // 编辑时，组件挂载，自动填入文章详情

  // —————————————————————编辑时，获取文章详情end———————————————————————

  // ———————————标题、时间———————————————
  let defauletDarte = moment(new Date()).format('YYYY-MM-DD HH:mm:ss').replace(/ /g, ' ');
  const [title, setTitle] = useState('');
  const [titleEng, setTitleEng] = useState('');
  const [date, setDate] = useState(defauletDarte);

  // ———————————标题end———————————————

  // ——————————标签————————————
  // 已选的标签
  const [selectTags, setSelectTags] = useState([]);
  // const [defaultTags, setDefaultTags] = useState([]);
  // ——————————标签end————————————

  // ——————————分类————————————
  // 已选的分类
  const [selectClasses, setSelectClasses] = useState('');
  const [defaultClasses, setDefaultClasses] = useState('');
  // ——————————分类end————————————

  // ————————————正文———————————
  // 编辑区文字
  const [defaultContent, setDefaultContent] = useState('');
  const [content, setContent] = useState('');
  // 配置highlight
  hljs.configure({
    tabReplace: '',
    classPrefix: 'hljs-',
    languages: ['CSS', 'HTML', 'JavaScript', 'Python', 'TypeScript', 'Markdown'],
  });
  // 配置marked
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: code => hljs.highlightAuto(code).value,
    gfm: true, //默认为true。 允许 Git Hub标准的markdown.
    tables: true, //默认为true。 允许支持表格语法。该选项要求 gfm 为true。
    breaks: true, //默认为false。 允许回车换行。该选项要求 gfm 为true。
  });


  // ————————————正文end———————————

  // ——————————————————————⭐预留功能⭐——————————————————————
  // 获取最新所有文章/草稿
  const getArticlesOrDrafts = dbName => {
  };
  // 添加到文章数据库/草稿数据库，参数：数据库名
  const addToDB = dbName => {
  };
  // 从文章数据库/草稿数据库删除，参数：数据库名、文章id
  const removeFromDB = dbName => {
  };
  // 从文章数据库/草稿数据库更新，参数：数据库名、文章id
  const updateFromDB = dbName => {

  };
  // 向数据库获取所有分类
  const getAllClasses = () => {
  };
  // 相应分类数目+1
  const classAddOne = newClass => {
  };
  // 相应分类数目-1
  const classMinOne = oldClass => {
  };
  // 存为草稿 按钮1
  const turnDraft = () => {

  };

  // 保存数据
  // 发布文章 按钮2
  const turnArticle = () => {
    if (!title) {
      message.info('请输入文章标题！');
      return;
    } else {
      const item = cloneDeep(pageChild)
      item.children.unshift({
        id: Math.trunc(Date.now() * Math.random()),
        title,
        titleEng,
        content,
        // tags: selectTags,
        // classes: selectClasses,
        tags: ['JavaScript', 'ES6'],
        classes: ['前端基础'],
        date: new Date(date).getTime(),
        url: `https://oneshark.cn/post?title=${titleEng}`,
      })
      console.log(item);
      changePageChild(item)
      message.info('请再次确认是否发表哦😄')
    }
  };

  const articleOk = () => {
    request.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    },{
      headers: {
        'Content-Type': 'application/json;charset=utf8mb4'
      },
    }).then(() => { })
    message.info('发表成功😄')
  }

  // ——————————————————————两个按钮end——————————————————————

  return (
    <>
      {/* 标题输入区 */}
      <div className="titleBox">
        <input
          className="inputTitle"
          placeholder="请输入文章标题..."
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <input
          className="inputEng"
          placeholder="请输入英文标题..."
          value={titleEng}
          onChange={e => {
            setTitleEng(e.target.value);
          }}
        />
        <Popconfirm
          className="draftBtn"
          placement="bottomRight"
          title="确定保存为草稿吗？"
          onConfirm={turnDraft}
          okText="Yes"
          cancelText="No"
        >
          存为草稿
        </Popconfirm>
        <Popconfirm
          className="pubBtn"
          placement="bottomRight"
          title={`确定${isEdit && !isDraft ? '更新' : '发布'}文章吗？`}
          onConfirm={turnArticle}
          okText="Yes"
          cancelText="No"
        >
          {isEdit && !isDraft ? '更新' : '发布'}
          文章
        </Popconfirm>
        <Button className="pubBtn" onClick={articleOk} >确定发表</Button>
      </div>

      {/* 标签、分类区 */}
      <div className="tagClassBox">
        {/* 分类 */}
        <div className="classBox">
          文章分类：
          <Select
            showSearch
            allowClear
            style={{ width: '330px' }}
            value={selectClasses}
            onChange={value => setSelectClasses(value ? value : '')}
          >
            {classes.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>
        {/* 标签 */}
        <div className="tagBox">
          文章标签：
          <Select
            mode="multiple"
            showSearch
            showArrow
            allowClear
            style={{ width: '740px' }}
            value={selectTags}
            onChange={value => setSelectTags(value)}
          >
            {tags.map(item => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>
        {/* 时间 */}
        <div className="timeBox">
          时间：
          <input
            className="timeInput"
            type="text"
            value={date}
            onChange={e => {
              setDate(e.target.value);
            }}
          />
        </div>
      </div>
      {/* 内容编辑区 */}
      <div className="editBox">
        <div
          className="inputRegion"
          onInput={e => {
            setContent(e.target.innerText);
          }}
          contentEditable="plaintext-only"
          suppressContentEditableWarning
        >
          {defaultContent}
        </div>

        <div
          className="showRegion markdownStyle"
          dangerouslySetInnerHTML={{
            __html: marked(content).replace(/<pre>/g, "<pre id='hljs'>"),
          }}
        ></div>
      </div>
    </>
  );
};

export default AddArticles
