import axios from "axios";
const IndianFinanceService = {
  async GetRevenue(month, year) {
    const response = await axios.get(
      `https://localhost:44305/api/Revenue/GetRevenue?month=${month}&year=${year}`
    );
    return response.data;
  },
};
export default IndianFinanceService;
