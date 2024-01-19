import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ValidationProvider } from "vee-validate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/free-solid-svg-icons";

import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
const app = createApp(App);

library.add(faUser, faUserAlt, faUserPlus, faSignInAlt, faSignOutAlt, faHome);
//dom.watch();
app.component(ValidationProvider);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
