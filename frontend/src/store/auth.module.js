import authService from "@/services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

const authModule = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      try {
        const user_2 = await authService.login(user);
        commit("loginSuccess", user_2);
        return await Promise.resolve(user_2);
      } catch (error) {
        commit("loginFailure");
        return await Promise.reject(error);
      }
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
