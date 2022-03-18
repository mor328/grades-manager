export default {
  getCoursesByYearAndSemester: (state) => (year, semester) =>
    state.courses.filter(
      (course) => course.year == year && course.semester == semester
    ),
  getCoursesByYear: (state) => (year) =>
    state.courses.filter((course) => course.year == year),
};
