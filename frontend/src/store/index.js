import { createApp } from "vue";
import Vuex from "vuex";

import authModule from "./auth.module";

createApp.use(Vuex);

export default new Vuex.Store({
  modules: {
    authModule,
  },
});
