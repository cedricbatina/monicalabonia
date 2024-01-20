import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Field } from "vee-validate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "./store";
import router from "./router";
import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faArchive,
  faContactCard,
  faUser,
  faUserAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
const app = createApp(App);

library.add(
  faUser,
  faUserAlt,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faHome,
  faArchive,
  faContactCard
);
//dom.watch();
// Register the Font Awesome component globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Register the ValidationProvider globally
app.component("ValidationProvider", Field);

app.use(store);
app.use(router);

app.mount("#app");
