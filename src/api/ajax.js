import axios from 'axios';
import {notification} from 'antd';
import {createHashHistory} from 'history';


axios.defaults.withCredentials = true;

export default function (url, data = {}, method = 'GET') {
    const history = createHashHistory();
    return new Promise(function (resolve, reject) {
        let promise;
        // 执行异步 ajax 请求
        if (method === 'GET') {
            promise = axios.get(url, {params: data, withCredentials: true}); // params 配置指定的是 query 参数
        } else {
            promise = axios.post(url, data, {withCredentials: true});
        }
        promise.then(response => {
            const {code, msg} = response.data;
            if (code === 201) {
                notification['error']({
                    message: code,
                    description: msg,
                });
                history.push('/logout');
            } else if (code !== 0) {
                notification['error']({
                    message: code,
                    description: msg,
                });
            }
            resolve(response.data);// 如果成功了, 调用 resolve(response.data)
        }).catch(error => { // 对所有 ajax 请求出错做统一处理, 外层就不用再处理错误了
            notification['error']({
                message: 'ERROR',
                description: error.message,
            });
        })
    })
}


