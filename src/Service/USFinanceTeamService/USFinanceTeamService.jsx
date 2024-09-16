import axios from "axios";
const USFinanceTeamService = {
  async FcnGetProjectDetails(id) {
    const response = await axios.get(
      `https://localhost:44305/api/Projects/GetProject?id=${id}`
    );
    return response.data;
  },
  async FcnGetRevenue(Projectid, month, year) {
    // const response = await axios.get(
    //   `https://localhost:44305/api/Projects/GetProject?id=${id}`
    // );
    // return response.data;
    return null;
  },
  async FcnAddRevenue(id) {
    const response = await axios.get(
      `https://localhost:44305/api/Projects/GetProject?id=${id}`
    );
    return response.data;
  },
};
export default USFinanceTeamService;
