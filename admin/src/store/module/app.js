import cookie from "js-cookie";

const state = {
  sidebar: {
    collapse: cookie.get("sidebar") ? !!+cookie.get("sidebar") : true,
    withoutAnimation: false,
  },
};

const mutations = {
  TOGGLE_Collapse: (state) => {
    state.sidebar.collapse = !state.sidebar.collapse;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.collapse) {
      cookie.set("sidebar", 1);
    } else {
      cookie.set("sidebar", 0);
    }
  },
  CLOSE_Collapse: (state, withoutAnimation) => {
    cookie.set("sidebar", 0);
    state.sidebar.collapse = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
};

const actions = {
  toggleCollapse({ commit }) {
    commit("TOGGLE_Collapse");
  },
  closeCollapse({ commit }, withoutAnimation) {
    commit("CLOSE_Collapse", withoutAnimation);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
