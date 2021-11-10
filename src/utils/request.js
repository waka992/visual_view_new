import axios from 'axios'
import { Message, MessageBox, Notification, Loading } from 'element-ui'
import store from '@/store'
// import { setToken, getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API,  // api 的 base_url
    timeout: 10000,                  // 请求超时时间
})

//加载实例
let loadingInstance
let opt = {
    lock: true,
    text: '拼命加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
}

// 请求拦截器
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        loadingInstance = Loading.service(opt);

        // TOKEN
        // if (store.getters.token) {
        //     config.headers['Authorization'] = 'Bearer ' + getToken()
        // }
        // AJAX 请求头
        config.headers['X-Requested-With'] = 'XMLHttpRequest'

        // HTTP 响应状态码
        config.validateStatus = function (status) {
            return status >= 200 && status < 501; 
        }

        return config
    },
    error => {
        // Do something with request error
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        loadingInstance.close();

        // http statusCode
        if(response.status !== 200){
            switch (process.env.NODE_ENV) {
                case 'development':
                    // 开发环境 测试
                    try {
                        delete response.data.trace;
                        var errorMessage = JSON.stringify(response.data, null, 2);
                    } catch (e) {
                        var errorMessage = response.data;
                    }
                    MessageBox.alert(
                        '<strong>'+response.config.url+'</strong></br><pre>'+errorMessage+'</pre>',
                        response.status+' '+response.statusText,
                        {
                            dangerouslyUseHTMLString: true,
                            type: 'error',
                            customClass: 'dev-message-box'
                        }
                    );
                break;
            
                case 'production':
                    // Message.warning({
                    //     dangerouslyUseHTMLString: true,
                    //     message: response.status +"&nbsp;"+ response.statusText
                    // });
                    try {
                        delete response.data.trace;
                        var errorMessage = JSON.stringify(response.data, null, 2);
                    } catch (e) {
                        var errorMessage = response.data;
                    }
                    MessageBox.alert(
                        '<strong>'+response.config.url+'</strong></br><pre>'+errorMessage+'</pre>',
                        response.status+' '+response.statusText,
                        {
                            dangerouslyUseHTMLString: true,
                            type: 'error',
                            customClass: 'dev-message-box'
                        }
                    );
                break;
            }
            return Promise.reject({info: response.statusText})
        }

        //服务器响应
        const serverRes = response.data
        // 公共异常处理
        if (serverRes.code !== 1000) {
            if(serverRes.code === 3020 ){
                Message.warning('修改失败，提交的数据无更改');
                return Promise.reject(serverRes)
            }

            // TODO 更多公共异常处理
        }

        // 返回服务器响应
        //return Promise.resolve(serverRes)
        return serverRes;
    },
    error => {
        loadingInstance.close();
        Notification.error({
            title: '请求出错',
            Notification: '错误',
            message: '网络错误，请稍后再试</br>' + (error.message ? error.message : ''),
            duration: 6 * 1000,
            dangerouslyUseHTMLString: true
        });
        return Promise.reject({info: error.message})
    }
)

export default service

