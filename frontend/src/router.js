import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";
import UserBoard from "./components/UserBoard";
import AdminBoard from "./components/AdminBoard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

const routes = [
  {
    path: "/",
    name: "accueil",
    component: HomePage,
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
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
