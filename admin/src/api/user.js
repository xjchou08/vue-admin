// 用户接口
//import { getToken } from "../utils/auth";
import service from "@/utils/service";

//用户登录
export const login = (data) => {
  return service({
    method: "POST",
    url: "/api/user/login",
    data,
  });
};

//获取用户信息
export const getUser = () => {
  return service({
    method: "GET",
    url: "/api/user/user",
    // 设置headers
    /**
     *   headers: {
      Authorization: "Bearer " + getToken(),
    },
     */
  });
};

// 退出用户系统
export const logout = () => {
  return service({
    method: "POST",
    url: "/api/user/logout",
    // 设置headers
  });
};

/**
 *  
import http from "../utils/http";

let userUrl = "/api/user";

//用户登录
export function login(data) {
  return http.post(`${userUrl}/login`, data);
}

//获取用户信息
export function getUser(token) {
  return http.get(`${userUrl}/user`, {
    Headers: { Authorization: "Bearer " + token },
  });
}

//退出用户

export function logout() {
  return http.get(`${userUrl}/logout`);
}
 */
