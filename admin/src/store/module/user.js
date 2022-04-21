// 关于用户的信息存储
import { getToken, setToken, removeToken } from "@/utils/auth.js";
import { login, logout, getUser } from "@/api/user";

const state = {
  username: "",
  avaster: "",
  token: getToken(),
};

const mutations = {
  // 修改state状态

  set_username: (state, username) => {
    state.username = username;
  },

  set_avaster: (state, avaster) => {
    state.avaster = avaster;
  },

  set_token: (state, token) => {
    state.token = token;
  },
};

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { email, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password })
        .then((res) => {
          const token = res.data.token;
          commit("set_token", token);
          setToken(token);

          const username = res.data.username;
          const avaster = res.data.image;

          commit("set_username", username);
          commit("set_avaster", avaster);
          
         // console.log(username);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  //获取个人信息
  getUser({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUser(state.token)
        .then((res) => {
          const { data } = res;

          if (!data) {
            reject("验证失效，请重新登录");
          }
          const { username, avaster } = data;

          commit("set_username", username);
          commit("set_avaster", avaster);

          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("set_token", null)
      removeToken();
      resolve();
    });
  },

  //退出系统
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("set_token",null);
          removeToken();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
