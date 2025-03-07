import axios from "axios";
import { apiurl } from "../createAxiosInstance";
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
    const response = await apiurl.get(
      `Employees/GetEmployeeDetails?id=${empId}`
    );

    return response.data;
  },
  async GetprojectEmployees(id, formattedDate) {
    const response = await axios.post(
      `https://localhost:44305/api/Timesheets/GetProjectEmployee?projectID=${id}&date=${formattedDate}`
    );

    return response.data;
  },
  async UpdateProfilefcn(obj) {
    const response = await axios.post(
      `https://localhost:44305/api/Employees/UpdateProfile`,
      obj
    );

    return response.data;
  },
  async GetEmployees() {
    const response = await apiurl.get("/Employees/GetAllEmployees");

    return response.data;
  },
  async DeleteEmployees(id) {
    const response = await apiurl.put(`/Employees/DeleteEmployee?id=${id}`);
    return response.data;
  },
  async DeleteSelectedEmployees(ids) {
    const response = await apiurl.put(
      "/Employees/DeleteSelectedEmployees",
      ids
    );

    return response.data;
  },
  async EmployeeDetailss(EmployeeID) {
    const response = await apiurl.get(
      `/Employees/EmployeeDetails?id=${EmployeeID}`
    );

    return response.data;
  },
  async AddEmployee(obj) {
    const response = await apiurl.post("/Employees/Add", obj);

    return response.data;
  },
  async TotalEmployees() {
    const response = await apiurl.get("/Employees/TotalEmployees");
    return response.data;
  },
  async ProjectProgressPercentage() {
    const response = await apiurl.get("/Projects/ProjectProgressPercentage");
    return response.data;
  },
  async UpdateEmployee(obj) {
    const response = await apiurl.put("/Employees/UpdateEmployee", obj);
    return response.data;
  },
  async GetMangerByEmployees(id) {
    const response = await apiurl.get(
      ` /Employees/GetEmployeesByManager?id=${id}`
    );
    return response.data;
  },
};
export default EmployeeService;
