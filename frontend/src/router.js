import { createRouter, createWebHistory } from "vue-router";

import ContactPage from "./components/ContactPage";
import UserBoard from "./components/UserBoard";

import WelcomePage from "./components/WelcomePage";
import AdminBoard from "./components/AdminBoard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import MentionsLegales from "./components/MentionsLegales";
import ArticlesList from "./components/ArticlesList";
import OtherPage from "./components/OtherPage";

const routes = [
  {
    path: "/",
    name: "accueil",
    component: WelcomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
  },
  {
    path: "/admin",
    name: "adminBoard",
    component: AdminBoard,
  },
  {
    path: "/user",
    name: "user",
    component: UserBoard,
  },
  {
    path: "/contact",
    name: ContactPage,
    component: ContactPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/mentions-legales",
    name: "mentions-legales",
    component: MentionsLegales,
  },
  {
    path: "/divers",
    name: "divers",
    component: OtherPage,
  },

  {
    path: "/les-publications",
    name: "les-publications",
    component: ArticlesList,
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/",
    "/login",
    "/les-publications",
    "/contact",
    "/mentions-legales",
    "/divers",
    "/signup",
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  if (authRequired && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
