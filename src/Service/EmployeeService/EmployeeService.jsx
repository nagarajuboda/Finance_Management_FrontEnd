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
  async GetProjectInfo(id) {
    const response = await axios.get(
      `https://localhost:44305/api/EmployeeProjects/GetAllProjectInfo?projectManagerid=${id}`
    );

    return response.data;
  },
};
export default EmployeeService;
