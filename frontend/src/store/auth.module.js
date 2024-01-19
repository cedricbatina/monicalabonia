import authService from "@/servicices/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

const authModule = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return authService
        .login(user)
        .then((user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        })
        .catch((error) => {
          commit("loginFailure");
          return Promise.reject(error);
        });
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
  },
};
export default authModule;
