import axios from "axios";

const AdminDashboardServices = {
  async fcnAddClientAsync(obj) {
    console.log(obj, "service obj");
    const response = await axios.post(
      "https://localhost:44305/api/Clients/Add",
      obj
    );
    console.log(response.data, "service after response");
    return response.data;
  },
  async FcnGetAllClients() {
    var response = await axios.get(
      "https://localhost:44305/api/Clients/GetAllClients"
    );
    console.log(response, "service getallClinets");
    return response.data;
  },
  async fcnAddProject(obj) {
    var response = await axios.post(
      "https://localhost:44305/api/Projects/NewProject",
      obj
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
    console.log("service obj", obj);
    const response = await axios.post(
      "https://localhost:44305/api/Projects/AssignEmployee",
      obj
    );
    console.log(response, "service response");
    return response.data;
  },
};

export default AdminDashboardServices;
