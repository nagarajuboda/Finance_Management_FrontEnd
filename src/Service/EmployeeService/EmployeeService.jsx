import axios from "axios";
const EmployeeService = {
  async FcnGetProjectMangerProjects(id) {
    const response = await axios.get(
      `https://localhost:44305/api/EmployeeProjects/GetProjectManagerProjects?id=${id}`
    );
    return response.data;
  },
  async GetProjectInfo(id) {
    const response = await axios.get(
      `https://localhost:44305/api/EmployeeProjects/GetAllProjectInfo?projectManagerid=${id}`
    );
    return response.data;
  },
  async GetEmployeefcn(empId) {
    const response = await axios.get(
      `https://localhost:44305/api/Employees/GetEmployeeDetails?id=${empId}`
    );

    return response.data;
  },
};
export default EmployeeService;
