const { default: axios } = require("axios");

const GetAllGrades = () => axios.get("/api/grade");
const GetAllStudents = () => axios.get("/api/student");
const CreateNewStudent = (data) => axios.post("/api/student", data);

export default { GetAllGrades, CreateNewStudent, GetAllStudents };
