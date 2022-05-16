const getters = {
  sidebar: (state) => state.app.sidebar,
  collapse: (state) => state.app.sidebar.collapse,
  token: (state) => state.user.token,
  image: (state) => state.user.image,
  username: (state) => state.user.username,
};

export default getters;
