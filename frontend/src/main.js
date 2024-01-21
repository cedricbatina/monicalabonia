import { createApp } from "vue";
import App from "./App.vue";
import { Form, Field, ErrorMessage } from "vee-validate"; //mport fr from "vee-validate/dist/locale/fr.json";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "./store";
import router from "./router";
//import * as yup from "yup";
//vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
//import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
});

import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faArchive,
  faContactCard,
  faUser,
  faUserAlt,
  faUserPlus,
  faScaleBalanced,
  faLock,
  faLockOpen,
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
  faContactCard,
  faLock,
  faLockOpen,
  faScaleBalanced
);
/*const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
});*/

app.component("LoginForm", Form);
app.component("FieldForm", Field);
app.component("ErrorMessage", ErrorMessage);
//app.use(schema);
app.use(vuetify);

// Register the Font Awesome component globally
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(store);
app.use(router);

app.mount("#app");
