const getters = {
  sidebar: (state) => state.app.sidebar,
  collapse: (state) => state.app.sidebar.collapse,
  token: (state) => state.user.token,
  avaster: (state) => state.user.avaster,
  username: (state) => state.user.username,
};

export default getters;
