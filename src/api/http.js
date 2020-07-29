/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import requestConfig from './config'
import {Message} from 'element-ui';

axios.defaults.baseURL = requestConfig[process.env.NODE_ENV]

// 请求超时时间
axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(
    config => {
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    error => {
      return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        }else{
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
      console.error(error)
      if(error.response && error.response.status === 403) {
        location.href = 'login'
      }
    }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        })
        .then(res => {
            if(res.data.code == 0) {
                resolve(res.data);
            }else{
                Message.warning(res.data.msg);
            }
        })
        .catch(err => {
            reject(err.data)
        })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    url = url + '/'
    return new Promise((resolve, reject) => {
        axios.post(url, params)
        .then(res => {
            if(res.data.code == 0) {
                resolve(res.data);
            }else{
                Message.warning(res.data.msg);
            }
        })
        .catch(err => {
            reject(err.data)
        })
    });
}

export function upload(url, formData) {
    url = url + '/'
    return new Promise((resolve, reject) => {
        axios.post(url, formData)
        .then(res => {
            if(res.data.code == 0) {
                resolve(res.data);
            }else{
                Message.warning(res.data.msg);
            }
        })
        .catch(err => {
            console.log(err)
            reject(err.data)
        })
    });
}
