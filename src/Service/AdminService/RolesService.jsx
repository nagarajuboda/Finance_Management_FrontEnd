import axios from "axios";
import { apiurl } from "../createAxiosInstance";
const RolesService = {
  async FcnGetRole(roleId) {
    const response = await apiurl.get(`/Roles/getRole?id=${roleId} `);
    return response;
  },
  async FcnGetRoles() {
    const response = await apiurl.get("/Roles/AllRoles");
    return response;
  },
  async FcnUpdateRole(obj) {
    const response = await apiurl.put("/Roles/UpdateRole", obj);
    return response;
  },
  async FcnDeleteRole(roleId) {
    const response = await apiurl.delete(`/Roles/${roleId}`);
    return response;
  },
  async FcnChangeRoleStatus(obj) {
    const response = await apiurl.put("/Roles/UpdateChangeRole", obj);
    return response;
  },
  async FcnCreateRole(obj) {
    const response = await apiurl.post("/Roles/CreateRole", obj);
    return response;
  },
  async FcnDeleteSelectedRoles(RoleIds) {
    const response = await apiurl.post("/Roles/DeleteSelectedRoles", RoleIds);
    return response;
  },
};
export default RolesService;
