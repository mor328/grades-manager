import database from "../../middleware/firebase/database";

export default {
  getCourses: async ({ commit }) => {
    const courses = await database.get({ tableName: "courses" });
    commit("setCourses", courses);
  },

  getFilteredCourses: ({ state, commit, getters }) => {
    const filteredCourses = [
      ...getters.getCoursesByYearAndSemester(
        state.currentYear,
        state.currentSemester
      ),
    ];
    commit("setFilteredCourses", filteredCourses);
  },

  updateTableAndAverages({ state, dispatch }, payload) {
    dispatch("getFilteredCourses", {
      year: state.currentYear,
      semester: state.currentSemester,
    });
    if (!payload.semesterOnly) {
      dispatch("calcAverage", {
        averageType: "year",
        params: { year: state.currentYear },
      });
    }
    dispatch("calcAverage", {
      averageType: "semester",
      params: { year: state.currentYear, semester: state.currentSemester },
    });
  },

  deleteCourse: async ({ state, commit }) => {
    await database.remove({ tableName: "courses", id: state.editedCourseId });
    commit("resetEditedCourseId");
  },

  updateCourse: async ({ state, commit }) => {
    const course = {
      ...state.editedCourse,
    };

    course.id = state.editedCourseId;

    await database.update({
      tableName: "courses",
      entity: "course",
      id: state.editedCourseId,
      course,
    });

    commit("initEditedCourse");
    commit("resetEditedCourseId");

    commit("editCourse", course);
  },

  insertCourse: async ({ state, commit }) => {
    const course = {
      ...state.editedCourse,
    };

    course.id = (
      await database.create({
        tableName: "courses",
        entity: "course",
        course,
      })
    ).key;

    commit("initEditedCourse");
  },

  setEditedCourseById: async ({ state, commit }) => {
    let editedCourse =
      state.courses.find((course) => course.id === state.editedCourseId) || {};
    if (state.courses.length && editedCourse) {
      delete editedCourse.id;
    } else {
      editedCourse = await database.getEntityById({
        tableName: "courses",
        id: state.editedCourseId,
      });
    }
    commit("setEditedCourse", editedCourse);
  },

  initCoursesByAverageType({ state, commit, getters }) {
    const coursesByAverageType = {
      degree: function () {
        return [...state.courses];
      },
      year: function (params) {
        return [...getters.getCoursesByYear(params.year)];
      },
      semester: function (params) {
        return [
          ...getters.getCoursesByYearAndSemester(params.year, params.semester),
        ];
      },
    };
    commit("setCoursesByAverageType", coursesByAverageType);
  },

  calcAverage: ({ state, commit }, payload) => {
    const courses =
      state.coursesByAverageType[payload.averageType](payload.params) || [];

    const [sumWeightedGrades, sumCreditPoints] = courses
      .map((course) => {
        return [course.grade, course.creditPoints];
      })
      .reduce(
        ([sumWeightedGrades, sumCreditPoints], [grade, creditPoints]) => [
          sumWeightedGrades + grade * creditPoints,
          sumCreditPoints + creditPoints,
        ],
        [0, 0]
      );

    const average =
      sumWeightedGrades > 0 && sumCreditPoints > 0
        ? (sumWeightedGrades / sumCreditPoints).toFixed(2)
        : "0.0";

    commit("setAverage", { type: payload.averageType, value: average });
  },
};
