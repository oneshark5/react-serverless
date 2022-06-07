import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './store'
import HomeManagement from './container/HomeManagement';
import 'normalize.css' // 页面样式标准化
import 'antd/dist/antd.css'
import './style.scss';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <HomeManagement/>
    </Provider>
);