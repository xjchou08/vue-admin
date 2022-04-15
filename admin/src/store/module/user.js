// 关于用户的信息存储
import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { login, logout, getUser } from '@/api/user'


const state = {
  name: "",
  avaster: "",
  token: getToken(),
};

const mutations = {// 修改state状态

    set_name: ( state, name ) => {
        state.name = name
    },
    
    set_avaster: (state, avaster) => {
        state.avaster = avaster
    },

    set_token: (state, token) => {
        state.token = token
    },

    set_roles: (state, roles) => {
        state.roles = roles
    }
}


const actions = {
    // 登录
  login({ commit }, userInfo) {
    const { email, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password })
          .then((res) => {
            
          const data = res.data;
           // console.log(data)
            
            commit("set_token", data.token);
            //console.log(data.token);
             
            setToken(data.token);

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
          const { userData } = res;

          if (!userData) {
            reject("验证失效，请重新登录");
          }
          const { username, image } = userData;

          commit("set_name", username);
          commit("set_avaster", image);

          resolve(userData);
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
      commit("set_token", "");
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