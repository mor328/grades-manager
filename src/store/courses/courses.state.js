export default {
  courses: [],
  filteredCourses: [],
  coursesByAverageType: {},
  currentYear: "1st",
  currentSemester: "A",
  yearOptions: ["1st", "2nd", "3rd", "4th"],
  semesterOptions: ["A", "B", "Summer"],
  averages: {
    degree: 0,
    year: 0,
    semester: 0,
  },
  editedCourseId: "",
  editedCourse: {},
  initialEditedCourse: {
    name: "",
    professor: "",
    year: "1st",
    semester: "A",
    grade: 0,
    creditPoints: 0,
  },
};
