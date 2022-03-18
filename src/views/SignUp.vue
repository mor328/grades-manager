<template>
  <div class="q-ma-xl q-my-md">
    <q-input
      rounded
      outlined
      bg-color="white"
      class="centered"
      v-model="newUser.email"
      label="Email"
      lazy-rules
      :rules="[
        (val) => isValidEmail(val) || 'Please enter a valid email address',
      ]"
    />
    <q-input
      rounded
      outlined
      bg-color="white"
      v-model="newUser.password"
      class="centered"
      type="password"
      label="Password"
      lazy-rules
      :rules="[
        (val) => val.length >= 6 || 'Please enter at least 6 characters.',
        (val) =>
          isValidPassword(val) ||
          'Password must contain at least one digit and one letter',
      ]"
    />
    <div class="q-ma-md text-center">
      <q-btn icon="person_add" color="info" glossy no-caps @click="signUp()"
        >Sign up</q-btn
      >
    </div>
  </div>
</template>

<script>
import firebaseInstance from "../middleware/firebase";

export default {
  name: "SignUp",
  data() {
    return {
      newUser: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    isValidPassword(password) {
      const regex = /^(?=.*\d)(?=.*[a-zA-Z])^/;
      return regex.test(password);
    },
    isValidEmail(email) {
      const regex = /^[a-zA-Z0-9.!#$%&*+=_~-]+@[a-zA-Z0]+(?:\.[a-zA-Z-]+)*$/;
      return regex.test(email);
    },
    signUp() {
      firebaseInstance.firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.newUser.email,
          this.newUser.password
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
  },
};
</script>

<style></style>
