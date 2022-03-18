import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import AddOrUpdate from "../views/AddOrUpdate.vue";
import Error404 from "../views/Error404.vue";
import firebaseInstance from "../middleware/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { authNotRequired: true },
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp,
    meta: { authNotRequired: true },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { authNotRequired: false },
  },
  {
    path: "/courses/:id?",
    name: "AddOrUpdate",
    meta: { authNotRequired: false },
    component: AddOrUpdate,
  },
  {
    path: "*",
    name: "Error404",
    meta: { authNotRequired: false },
    component: Error404,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const user = firebaseInstance.firebase.auth().currentUser;
  if (
    (user && to.meta.authNotRequired) ||
    (!user && !to.meta.authNotRequired)
  ) {
    const path = !user ? "/" : "/home";
    return next(path);
  }
  next();
});

export default router;
