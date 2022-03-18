<template>
  <q-page class="text-center">
    <div><h2>Nothing here...</h2></div>
    <div>
      <img class="q-my-md" alt="Quasar logo" src="../assets/logo.png" />
      <br />
      <q-btn
        color="primary"
        glossy
        no-caps
        class="q-my-xl"
        text-color="white"
        label="Return Home"
        @click="returnHome()"
      />
    </div>
  </q-page>
</template>

<style></style>

<script>
export default {
  name: "Error404",
  methods: {
    returnHome() {
      this.$router.push("/home");
    },
  },
};
</script>
