export default {
  setCourses: (state, courses) => (state.courses = [...courses]),

  setFilteredCourses: (state, courses) =>
    (state.filteredCourses = [...courses]),

  setCoursesByAverageType: (state, courses) => {
    state.coursesByAverageType = { ...courses };
  },

  setAverage: (state, averageCalc) => {
    state.averages[averageCalc.type] = averageCalc.value;
  },

  setCurrentYearAndSemester: (state, payload) => {
    state.currentYear = payload.year;
    state.currentSemester = payload.semester;
  },

  setEditedCourseId: (state, id) => (state.editedCourseId = id),

  setEditedCourse: (state, course) => {
    state.editedCourse = {
      ...course,
    };
  },

  resetEditedCourseId: (state) => (state.editedCourseId = ""),

  initEditedCourse: (state) => {
    state.editedCourse = {
      ...state.initialEditedCourse,
    };
    delete state.editedCourse.id;
  },

  editCourse: (state, course) => {
    const index = state.courses.findIndex((p) => p.id === course.id);
    state.courses.splice(index, 1, course);
  },

  deleteCourse: (state, courseId) => {
    const index = state.courses.findIndex((p) => p.id === courseId);
    state.courses.splice(index, 1);
  },

  insertCourse: (state, course) => {
    state.courses.push(course);
  },
};
