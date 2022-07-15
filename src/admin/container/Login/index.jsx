import { Guard } from "@authing/react-ui-components";
import React from "react";
// 引入 css 文件
import "@authing/react-ui-components/lib/index.min.css";

const Login = () => {
  // 替换你的 AppId
  const appId = "62d102ab42d07c930bec0e4b";

  const onLogin = (userInfo) => {
    console.log(userInfo);
  };

  return <Guard appId={appId} onLogin={onLogin} />;
};

export default Login