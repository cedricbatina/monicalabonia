import { createRouter, createWebHistory } from "vue-router";

import ContactPage from "./components/ContactPage";
import UserBoard from "./components/UserBoard";

import WelcomePage from "./components/WelcomePage";
import AdminBoard from "./components/AdminBoard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import MentionsLegales from "./components/MentionsLegales";
import ArticlesList from "./components/ArticlesList";

const routes = [
  {
    path: "/",
    name: "accueil",
    component: WelcomePage,
  },
  {
    path: "/login",
    component: LogIn,
  },
  {
    path: "/admin",
    component: AdminBoard,
  },
  {
    path: "/user",
    component: UserBoard,
  },
  {
    path: "/contact",
    component: ContactPage,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/mentions-legales",
    component: MentionsLegales,
  },
  {
    path: "/les-publications",
    component: ArticlesList,
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
