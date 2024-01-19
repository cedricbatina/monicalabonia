import { createStore } from "vuex";
import authModule from "./auth.module";

export default createStore({
  modules: {
    authModule,
    // other modules if any
  },
});
