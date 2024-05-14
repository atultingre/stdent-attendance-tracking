const { default: axios } = require("axios");

const GetAllGrades = () => axios.get("/api/grade");
const GetAllStudents = () => axios.get("/api/student");
const CreateNewStudent = (data) => axios.post("/api/student", data);
const DeleteStudentRecord = (id) => axios.delete("/api/student?id=" + id);

export default {
  GetAllGrades,
  CreateNewStudent,
  GetAllStudents,
  DeleteStudentRecord,
};
