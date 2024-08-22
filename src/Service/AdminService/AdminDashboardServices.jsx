import axios from "axios";

const AdminDashboardServices = {
  async fcnAddClientAsync(obj) {
    const response = await axios.post(
      "https://localhost:44305/api/Clients/Add",
      obj
    );

    return response.data;
  },
  async FcnGetAllClients() {
    var response = await axios.get(
      "https://localhost:44305/api/Clients/GetAllClients"
    );
    return response.data;
  },
  async fcnAddProject(obj) {
    var response = await axios.post(
      "https://localhost:44305/api/Projects/NewProject",
      obj
    );
    return response.data;
  },
  async fcnUpdateProject(project) {
    var response = await axios.post(
      "https://localhost:44305/api/Projects/UpdateProject",
      project
    );
    return response.data;
  },
  async fcngetEmployees() {
    var response = await axios.get(
      "https://localhost:44305/api/Projects/GetEmployees"
    );
    return response.data;
  },
  async fcnAssignEmployee(obj) {
    const response = await axios.post(
      "https://localhost:44305/api/Projects/AssignEmployee",
      obj
    );

    return response.data;
  },
  async DeleteEmployeefcn(id, projectid) {
    const response = await axios.delete(
      `https://localhost:44305/api/Projects/DeleteProjectEmployee?id=${id}&projectID=${projectid}`
    );

    return response.data;
  },
  async GetAllCurrency() {
    const response = await axios.get(
      "https://localhost:44305/api/Projects/GetCurrency"
    );

    return response.data;
  },
  async GetAllDepartments() {
    const response = await axios.get(
      "https://localhost:44305/api/Projects/Departments"
    );

    return response.data;
  },
  async GetDepartmentTeams(deptId) {
    const baseUrl = "https://localhost:44305/api/Projects";
    const response = await axios.get(`${baseUrl}/DepartmentTeams`, {
      params: {
        deptid: deptId,
      },
    });

    return response.data;
  },
};

export default AdminDashboardServices;
