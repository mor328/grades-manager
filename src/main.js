import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./quasar";
import firebaseInstance from "./middleware/firebase";

Vue.config.productionTip = false;

firebaseInstance.firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.user = user;
    store.commit("users/setLoggedIn", true);
  } else {
    window.user = null;
    store.commit("users/setLoggedIn", false);
  }

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
