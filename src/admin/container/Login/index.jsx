import { Guard } from "@authing/react-ui-components";
import React from "react";
// 引入 css 文件
import "@authing/react-ui-components/lib/index.min.css";

const Login = () => {
  // 替换你的 AppId
  const appId = "62d1105847f285f487ca5c97";

  const onLogin = (userInfo) => { 
    // Authing会自动保存_authing_token
    // 自己定义保存token
    window.localStorage.token = userInfo.token;
    window.location.tokenExpiredAt = userInfo.tokenExpiredAt;
    window.location.reload()
  };

  return <Guard appId={appId} onLogin={onLogin} />;
};

export default Login;