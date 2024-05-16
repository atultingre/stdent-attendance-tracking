const { default: axios } = require("axios");

// Grades
const GetAllGrades = () => axios.get("/api/grade");

// Student
const GetAllStudents = () => axios.get("/api/student");

const CreateNewStudent = (data) => axios.post("/api/student", data);

const DeleteStudentRecord = (id) => axios.delete("/api/student?id=" + id);

// Attendance
const GetAttendanceList = (grade, month) =>
  axios.get("/api/attendance?grade=" + grade + "&month=" + month);

const MarkAttendance = (data) => axios.post("/api/attendance", data);

const MarkAttendanceAsAbsent = (studentId, day, date) =>
  axios.delete(
    "/api/attendance?studentId=" + studentId + "&day=" + day + "&date=" + date
  );

const TotalPresentCountByDay = (date, grade) =>
  axios.get("api/dashboard?date=" + date + "&grade=" + grade);

export default {
  GetAllGrades,
  CreateNewStudent,
  GetAttendanceList,
  GetAllStudents,
  TotalPresentCountByDay,
  DeleteStudentRecord,
  MarkAttendance,
  MarkAttendanceAsAbsent,
};
