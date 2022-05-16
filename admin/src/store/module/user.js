// 关于用户的信息存储
import { getToken, setToken, removeToken } from "@/utils/auth.js";
import { login, logout, getUser } from "@/api/user";

const state = {
  username: "",
  image: "",
  token: getToken(),
};

const mutations = {
  // 修改state状态
  set_username: (state, username) => {
    state.username = username;
  },

  set_image: (state, image) => {
    state.image = image;
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
          let token = res.data.token;

          commit("set_token", token);
          setToken(token);

          const image = res.data.avaster;
          const username = res.data.username;

          commit("set_username", username);
          commit("set_image", image);

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
          console.log(res);
          if (!data) {
            reject("验证失效，请重新登录");
          }
          //const { username, avaster } = data;

          commit("set_username", data.username);
          commit("set_image", data.image);

          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //退出系统
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("set_token", "");
          removeToken();

          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("set_token", null);
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
