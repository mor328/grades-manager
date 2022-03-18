<template>
  <div>
    <div class="q-my-md text-center text-h4" style="font-weight: 700">
      <span v-if="!editedCourseId">Add Course</span>
      <span v-if="editedCourseId">Update Course</span>
    </div>
    <div class="q-mx-xl">
      <q-input
        rounded
        outlined
        bg-color="white"
        class="centered"
        v-model="localEditedCourse.name"
        ref="name"
        label="Course Name"
        lazy-rules
        :rules="[
          (val) => val.length >= 2 || 'Please enter at least 2 characters.',
          (val) =>
            isValidCourseName(val) ||
            'Course name must contain at least one letter',
        ]"
      />
      <q-input
        rounded
        outlined
        bg-color="white"
        class="centered"
        v-model="localEditedCourse.professor"
        ref="professor"
        label="Professor"
        lazy-rules
        :rules="[
          (val) => val.length >= 3 || 'Please enter at least 3 characters.',
          (val) =>
            isValidProfessor(val) ||
            'Professor name can contain letters,hyphens,dots and spaces only',
        ]"
      />
      <div class="q-mb-md">
        <q-select
          rounded
          outlined
          bg-color="white"
          class="centered"
          v-model="localEditedCourse.year"
          :options="yearOptions"
          label="Year"
        />
      </div>
      <div class="q-mb-md">
        <q-select
          rounded
          outlined
          bg-color="white"
          class="centered"
          v-model="localEditedCourse.semester"
          :options="semesterOptions"
          label="Semester"
        />
      </div>
      <q-input
        rounded
        outlined
        bg-color="white"
        class="centered"
        v-model.number="localEditedCourse.creditPoints"
        ref="creditPoints"
        label="Credit Points"
        lazy-rules
        :rules="[
          (val) => val >= 0.5 || 'Credit points must be at least 0.5',
          (val) => val <= 10.5 || 'Credit points must be maximum 10.5',
        ]"
      />
      <q-input
        type="number"
        rounded
        outlined
        bg-color="white"
        class="centered"
        v-model.number="localEditedCourse.grade"
        ref="grade"
        label="Grade"
        lazy-rules
        :rules="[
          (val) => val >= 0 || 'Grade must be at least 0',
          (val) => val <= 100 || 'Grade must be maximum 100',
        ]"
      />
    </div>
    <div class="q-ma-md text-center">
      <q-btn
        v-if="!editedCourseId"
        color="positive"
        text-color="white"
        glossy
        no-caps
        label="Insert"
        @click="insert()"
      />
      <q-btn
        v-if="editedCourseId"
        color="warning"
        text-color="white"
        glossy
        no-caps
        label="Update"
        @click="update()"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "AddOrUpdate",
  computed: mapState("courses", [
    "editedCourse",
    "editedCourseId",
    "currentYear",
    "currentSemester",
    "yearOptions",
    "semesterOptions",
  ]),
  data() {
    return {
      localEditedCourse: {
        name: "",
        professor: "",
        year: "",
        semester: "",
        grade: 0,
        creditPoints: 0,
      },
    };
  },
  methods: {
    ...mapActions("courses", [
      "insertCourse",
      "updateCourse",
      "setEditedCourseById",
    ]),
    ...mapMutations("courses", [
      "initEditedCourse",
      "setEditedCourse",
      "setEditedCourseId",
      "resetEditedCourseId",
    ]),
    isValidCourseName(courseName) {
      const regex = /^(?=.*[a-zA-Z])^/;
      return regex.test(courseName);
    },
    isValidProfessor(professor) {
      const regex = /^[-a-zA-Z\s\.]*$/;
      return regex.test(professor);
    },
    isValidCreditPoints(creditPoints) {
      const regex = /^[0-9]*\.?[0-9]*$/;
      return regex.test(creditPoints);
    },

    resetLocalEditedCourse() {
      this.localEditedCourse = {
        ...this.editedCourse,
      };
    },
    redirectToHomePage() {
      this.$router.push(`/home`);
    },
    insert() {
      if (this.validateFields()) {
        this.setEditedCourse(this.localEditedCourse);
        this.insertCourse().then(() => {
          this.resetLocalEditedCourse();
          this.redirectToHomePage();
        });
      }
    },
    update() {
      if (this.validateFields()) {
        this.setEditedCourse(this.localEditedCourse);
        this.updateCourse();
        this.redirectToHomePage();
      }
    },
    initYearAndSemester() {
      this.localEditedCourse.year = this.currentYear;
      this.localEditedCourse.semester = this.currentSemester;
    },
    validateFields() {
      const refs = this.$refs;
      for (let ref in refs) {
        refs[ref].validate();
        if (refs[ref].hasError) {
          console.error(refs[ref].innerErrorMessage);
          return false;
        }
      }
      return true;
    },
  },
  created() {
    this.initYearAndSemester();
    this.initEditedCourse();
    if (this.$route.params.id) {
      this.setEditedCourseId(this.$route.params.id);
      this.setEditedCourseById().then(() => {
        this.resetLocalEditedCourse();
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.resetEditedCourseId();
    next();
  },
};
</script>

<style></style>
