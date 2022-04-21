
const getters = {
  sidebar: (state) => state.app.sidebar,
  token: (state) => state.user.token,
  avaster: (state) => state.user.avaster,
  username: (state) => state.user.username,
};

export default getters