import { Toast } from 'antd-mobile'
//在index.js中引入axios
import axios from 'axios';
//引入qs模块，用来序列化post类型的数据
import QS from 'qs';

//设置axios基础路径
const service = axios.create({
    baseURL: 'http://121.40.109.208/api/'
})
// // 请求拦截器
// service.interceptors.request.use(config => {
//     // 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
//     // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//     // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
//     const token = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');
//     //在每次的请求中添加token
//     config.data = Object.assign({}, config.data, {
//         // token: token,
//     })
//     //设置请求头
//     config.headers = {
//         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
//     }
//     config.data = QS.stringify(config.data)
//     return config
// }, error => {
//     return error;
// })
// 请求拦截器
service.interceptors.request.use(config => {
    const token = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');

    // 如果 config.data 包含文件 (例如通过 FormData 对象)
    if (config.data instanceof FormData) {
        // 如果需要在表单数据中添加token，可以使用如下方式
        // config.data.append('token', token);

        config.headers = {
            'Content-Type': 'multipart/form-data'
        };
    } else {
        // 其他类型的请求使用默认处理方式
        config.data = Object.assign({}, config.data, {
            // token: token,
        });
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        };
        config.data = QS.stringify(config.data);
    }

    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(
    response => {
        // console.log(response);
        //根据返回不同的状态码做不同的事情
        // 这里一定要和后台开发人员协商好统一的错误状态码
        if (response.status) {
            switch (response.status) {
                case 200:
                    return response.data
                case 201:
                    Toast.show({
                        duration: 1500,
                        icon: 'success',
                        content: response.data.message || '',
                        afterClose: () => {
                            if (response.data.message === '注册成功') {
                                const _user = response.data.user
                                console.log('after')
                                localStorage.setItem("token", "rem432412341324");
                                localStorage.setItem("username", _user.username);
                                localStorage.setItem("id", _user.id);
                                localStorage.setItem("avatar", _user.avatar);
                                window.location.href = '/';
                            }
                        },
                    })

                    return response.data
                default:
                    // Toast.show({
                    //     icon: 'fail',
                    //     content: response.data.error || response.data.message || '网络错误',
                    // })
                    return response?.data
            }
        } else {
            return response;
        }
    },
    error => {
        // 错误处理逻辑
        if (error) {
            switch (error.response.status) {
                case 400:
                    Toast.show({
                        duration: 1000,
                        icon: 'fail',
                        content: error.response.data.error || error.response.data.message || '请求错误',
                    })
                    break;
                case 403:
                    //token过期处理方法
                    break;
                default:
                    Toast.show({
                        content: '网络错误，请稍后再试',
                    })
            }
        } else {
            return Promise.reject(error);
        }
    }
)
export default service 