// 用户接口
import http from '../utils/http'

let userUrl = '/api/user'

//用户登录
export function login(data){
    return http.post(`${userUrl}/login`, data);
}

//获取用户信息
export function getUser() {
    return http.get(`${userUrl}`);
}

//退出用户

export function logout() {
    
}