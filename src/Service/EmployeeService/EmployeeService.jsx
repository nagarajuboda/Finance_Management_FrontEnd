import axios from "axios";
const EmployeeService = {
  async FcnGetProjectMangerProjects(id) {
    console.log(id, "service obj");
    const response = await axios.get(
      `https://localhost:44305/api/EmployeeProjects/GetProjectManagerProjects?id=${id}`
    );
    console.log(response.data, "service after response");
    return response.data;
  },
  async FcnGetProjectMangerProjects(id) {
    console.log(id, "service obj");
    const response = await axios.get(
      `https://localhost:44305/api/EmployeeProjects/GetProjectManagerProjects?id=${id}`
    );
    console.log(response.data, "service after response");
    return response.data;
  },
};
export default EmployeeService;
