import axios from "axios";
const ManagerService = {
  async FcnUnderManagerEmployees(id) {
    const response = await axios.get(
      `https://localhost:44305/api/Employees/UnderManagerEmployees?id=${id}`
    );
    return response.data;
  },
  async FcnGetEmployee(id) {
    const response = await axios.get(
      `https://localhost:44305/api/Employees/ViewEmployee?id=${id}`
    );
    return response.data;
  },
};
export default ManagerService;
