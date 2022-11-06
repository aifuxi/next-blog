import axios from 'axios';

const request = axios.create({
  baseURL: process.env.BASE_URL,
});

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default request;
