import axios from 'axios';


const instance = axios.create({ timeout: 25000 }); // TODO 5s测试环境容易炸了

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * 响应拦截器
 * 拦截响应并统一处理
 */

instance.interceptors.response.use(
    (res) => {
        console.log('res')
        if (res.status && res.status == 200) {
            return Promise.resolve(res.data);
        } else {
            return Promise.reject(res.data);
        }
    },
    (error) => {
        const { response } = error;
        if (response) {
            netErrorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            //断网情况处理
            if (!window.navigator.onLine) {
                //通知断网
            } else {
                return Promise.reject(error);
            }
        }
    }
);


export default instance;
