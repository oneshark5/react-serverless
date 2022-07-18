import React from 'react'
import Card from '../../Card';
import styles from './index.module.scss'
import { GithubOutlined, IdcardOutlined, WechatOutlined, QqOutlined } from '@ant-design/icons';
import { useState } from 'react';
import IcoBtn from './IcoBtn';

// 配置数据：链接（GitHub、简历、微信、qq二维码）
/**
description: "社交账号",
heightCard: ""
icon: "GithubOutlined,IdcardOutlined,WechatOutlined,QqOutlined"
imageUrl: "https://shark-serverless-static-files.oss-cn-beijing.aliyuncs.com/images/avatarShark200Tm.png"
link: "oneshark.cn,https://github.com/oneshark5,https://shark-serverless-static-files.oss-cn-beijing.aliyuncs.com/images/WeChat.jpg,https://shark-serverless-static-files.oss-cn-beijing.aliyuncs.com/images/QQ.jpg"
tags: ""
title: "AccountCard"
 */

// 飞鸟数据：isLink, link, ico, content 
const imgStyle = { width: '120px', height: '120px' };

const AccountCard = ({ schema }) => {
  // 获取链接和二维码
  const { link } = schema
  const linkArr = link.split(',')
  console.log(linkArr);

  const accountData = [
    {
      isLink: true,
      link: linkArr[0],
      ico: <GithubOutlined />,
      content: null
    },
    {
      isLink: true,
      link: linkArr[1],
      ico: <IdcardOutlined />,
      content: null
    },
    {
      isLink: false,
      link: '',
      ico: <WechatOutlined />,
      content: <img src={linkArr[2]} style={imgStyle} />
    },
    {
      isLink: false,
      link: '',
      ico: <QqOutlined />,
      content: <img src={linkArr[3]} style={imgStyle} />
    },
  ]
  console.log(accountData);



  //--=========== 生成图标 ==========--//


  // 显示二维码
  const [linkShow, setLinkShow] = useState(false)

  return (
    <Card className={styles.card}>
      {
        accountData.map(({ isLink, link, ico, content }, index) => (
          <IcoBtn isLink={isLink} link={link} content={content} key={index}>
            {ico}
          </IcoBtn>
        ))
      }
    </Card>
  )
}
export default AccountCard