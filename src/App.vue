<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy bg-primary">
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        <q-toolbar-title class="text-center">
          Grade Manager App
        </q-toolbar-title>
        <div v-if="isLoggedIn">
          <q-btn @click="logout">log out</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Home from "./views/Home.vue";
import firebaseInstance from "./middleware/firebase";
import { mapState } from "vuex";

export default {
  name: "LayoutDefault",

  components: {
    Home,
  },
  computed: mapState("users", ["isLoggedIn"]),
  methods: {
    logout() {
      firebaseInstance.firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
body {
  background: whitesmoke;
}
.centered {
  display: block;
  margin: auto;
  width: 50%;
}
</style>
