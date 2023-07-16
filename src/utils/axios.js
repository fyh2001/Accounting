import axios from "axios";
import config from "../config/config";

const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 5000, // 请求超时时间
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1
    ) {
      // 请求超时错误
      window.$message.warning('网路超时，请稍后重试！')
    }
    return Promise.reject(error);
  }
);

export default instance;
