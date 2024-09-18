import axios from "axios";
const USFinanceTeamService = {
  async FcnGetProjectDetails(id) {
    const response = await axios.get(
      `https://localhost:44305/api/Projects/GetProject?id=${id}`
    );
    return response.data;
  },
  async FcnGetRevenue(Projectid, month, year) {
    const response = await axios.get(
      `https://localhost:44305/api/Revenue/GetSubmittedRevenuesByProjectIdAndDate?projectId=${Projectid}&month=${month}&year=${year}`
    );
    return response.data;
  },
  async AddRevenue(obj, isSubmitted) {
    console.log(isSubmitted, "000000000000000000000000");
    const response = await axios.post(
      `https://localhost:44305/api/Revenue/AddRevenue?isSubmitted=${isSubmitted}`,
      obj
    );
    return response.data;
  },
};
export default USFinanceTeamService;
