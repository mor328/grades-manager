<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start" style="justify-content: center">
      <q-card class="my-card bg-accent">
        <q-card-section>
          <div class="text-h6 text-white">Degree Average</div>
          <q-separator color="white" size="2px" />
        </q-card-section>
        <q-card-section
          class="q-pt-none text-h5 text-center text-white"
          style="font-weight: bold"
        >
          {{ averages["degree"] }}
        </q-card-section>
      </q-card>
      <q-card class="my-card bg-primary">
        <q-card-section>
          <div class="text-h6 text-white">{{ currentYear }} Year Average</div>
          <q-separator color="white" size="2px" />
        </q-card-section>
        <q-card-section
          class="q-pt-none text-h5 text-center text-white"
          style="font-weight: bold"
        >
          {{ averages["year"] }}
        </q-card-section>
      </q-card>
      <q-card class="my-card bg-secondary">
        <q-card-section>
          <div class="text-h6 text-white">
            Semester {{ currentSemester }} Average
          </div>
          <q-separator color="white" size="2px" />
        </q-card-section>
        <q-card-section
          class="q-pt-none text-h5 text-center text-white"
          style="font-weight: bold"
        >
          {{ averages["semester"] }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Averages",
  computed: {
    ...mapState("courses", ["averages", "currentYear", "currentSemester"]),
  },
};
</script>

<style></style>
