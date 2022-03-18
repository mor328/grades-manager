<template>
  <div class="q-pa-sm">
    <div class="q-gutter-md row items-start" style="justify-content: center">
      <q-select
        outlined
        bg-color="white"
        v-model="year"
        @input="
          setCurrentYearAndSemester({ year, semester });
          updateTableAndAverages({
            semesterOnly: false,
          });
        "
        :options="yearOptions"
        label="Year"
        style="width: 250px"
      />

      <q-select
        outlined
        bg-color="white"
        v-model="semester"
        @input="
          setCurrentYearAndSemester({ year, semester });
          updateTableAndAverages({
            semesterOnly: true,
          });
        "
        :options="semesterOptions"
        label="Semester"
        style="width: 250px"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Pickers",
  data() {
    return {
      year: "",
      semester: "",
    };
  },
  computed: {
    ...mapState("courses", [
      "currentYear",
      "currentSemester",
      "yearOptions",
      "semesterOptions",
    ]),
  },
  methods: {
    ...mapActions("courses", [
      "getFilteredCourses",
      "initCoursesByAverageType",
      "updateTableAndAverages",
    ]),
    ...mapMutations("courses", ["setCurrentYearAndSemester"]),
    initYearAndSemester() {
      this.year = this.currentYear;
      this.semester = this.currentSemester;
    },
  },
  created() {
    this.initCoursesByAverageType();
    this.initYearAndSemester();
  },
};
</script>

<style></style>
