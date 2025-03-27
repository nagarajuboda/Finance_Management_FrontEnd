import axios from "axios";
import { apiurl } from "../createAxiosInstance";
const ManagerService = {
  async FcnGetEmployeesByManager(id) {
    const response = await apiurl.get(
      `/Employees/GetEmployeesByManager?id=${id}`
    );
    return response;
  },
  async FcnGetEmployee(id) {
    const response = await axios.get(`/Employees/ViewEmployee?id=${id}`);
    return response.data;
  },
  async FcnExportByManagerEmployees(listtype, filetype, status, id) {
    const response = await apiurl.get(
      `/Export/DownloadProjectManagerEmployees?listType=${listtype}&fileType=${filetype}&TypeOfEmployees=${status}&ManagerId=${id}`,
      { responseType: "blob" }
    );
    return response;
  },
  async FcnGetprojectByManager(id) {
    const response = await apiurl.get(
      `/EmployeeProjects/GetProjectManagerProjects?id=${id}`
    );
    return response;
  },
};
export default ManagerService;
