import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css' // 页面样式标准化
import 'antd/dist/antd.css'
import HomeManagement from './container/HomeManagement';
import './style.scss';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HomeManagement/>
  </React.StrictMode>
);