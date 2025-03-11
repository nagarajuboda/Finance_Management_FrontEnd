import axios from "axios";
import { apiurl } from "../createAxiosInstance";
const ProjectService = {
  async FcnGetAllProjects() {
    const response = await apiurl.get("/Projects/GetAllProjects");
    return response;
  },
  async FcnDeleteProject(projectid) {
    const response = await apiurl.put(
      `/Projects/DeleteProject?id=${projectid}`
    );
    return response;
  },
  async FcnDeleteSelectedProject(projectids) {
    const response = await apiurl.put(
      "/Projects/DeleteSelectedProjects",
      projectids
    );
    return response;
  },
  async FcnProjectInfo(ProjectID) {
    const response = await apiurl.get(`/Projects/GetProject?id=${ProjectID}`);
    return response;
  },
  async fcnAssignEmployee(obj) {
    const response = await apiurl.post("/Projects/AssignEmployee", obj);

    return response.data;
  },
  async FcnAddSelectedDept(id) {
    const response = await apiurl.get(`/Projects/DepartmentTeams?deptid=${id}`);
    return response.data;
  },
};
export default ProjectService;
