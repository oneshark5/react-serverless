// 对axios做一个封装（封装token）
import axios from 'axios'

const instance = axios.create({
  timeout:'60000'//超时处理
});

// mysql的utf8mb4
// const mysqlHeader = {
//   'Content-Type': 'application/json;charset=utf8mb4'
// }

// 拦截器
instance.interceptors.request.use(
  config => {
    // get请求时不需要添加token
    // 判断方法，仅post请求添加token
    if(config.method === 'post'){
      const { token } = window.localStorage;
      token && (config.headers.token = token);
    }
    return config;
  }
);

instance.interceptors.response.use(
  response => {
    return response?.data;
  }
);

export default instance;