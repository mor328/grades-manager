<template>
  <div class="q-ma-xl">
    <div class="q-mb-sm">
      <q-input
        rounded
        outlined
        class="centered"
        bg-color="white"
        v-model="loginCreditentials.email"
        type="email"
        label="Email"
      />
    </div>
    <div class="q-my-md">
      <q-input
        rounded
        outlined
        class="centered"
        bg-color="white"
        v-model="loginCreditentials.password"
        type="password"
        label="Password"
      />
    </div>
    <div class="q-ma-md text-center">
      <q-btn
        class="q-mr-md"
        icon="login"
        color="primary"
        glossy
        @click="passwordLogin()"
        >Login</q-btn
      >
      <div class="q-mt-xl">
        You can also:
        <div class="q-mt-xs">
          <q-btn
            @click="googleLogin()"
            icon="person_pin"
            color="secondary"
            glossy
            >Login with Google Account</q-btn
          >
        </div>
      </div>
    </div>
    <div class="q-ma-md">
      Not registered yet?
      <q-btn
        icon="person_add"
        class="q-ma-sm"
        color="info"
        glossy
        no-caps
        @click="signUp()"
        >Sign Up</q-btn
      >
    </div>
  </div>
</template>

<script>
import firebaseInstance from "../middleware/firebase";

export default {
  name: "Login",
  data() {
    return {
      loginCreditentials: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    passwordLogin() {
      firebaseInstance.firebase
        .auth()
        .signInWithEmailAndPassword(
          this.loginCreditentials.email,
          this.loginCreditentials.password
        )
        .then((result) => {
          window.user = result.user;

          this.$router.push("/home");
        })
        .catch((error) => {
          alert(`Error ${error.code}: ${error.message}`);
          console.error(error);
        });
    },
    googleLogin() {
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      firebaseInstance.firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          window.user = result.user;
          this.$router.push("/home");
        })
        .catch((error) => {
          alert(`Error ${error.code}: ${error.message}`);
          console.error(error);
        });
    },
    signUp() {
      this.$router.push("/signUp");
    },
  },
};
</script>

<style></style>
