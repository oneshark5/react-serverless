import React from 'react'
import Card from '../../Card';
import styles from './index.module.scss'
import { GithubOutlined,IdcardOutlined,WechatOutlined,QqOutlined } from '@ant-design/icons';

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

const AccountCard = ({ schema }) => {
  // 显示二维码
  const 
  const { icon, link} = schema
  const iconArr = icon.split(',')
  console.log(iconArr);
  
  // 从Aside组件获取属性
  const { imageUrl  } = schema

  return (
    <Card className={styles.card}>
      <GithubOutlined/>
      <IdcardOutlined/>
      <WechatOutlined/>
      <QqOutlined/>
    </Card>
  )
}
export default AccountCard