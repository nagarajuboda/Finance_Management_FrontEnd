import axios from "axios";
import { apiurl } from "../createAxiosInstance";
const IndianFinanceService = {
  async GetRevenue(month, year) {
    const response = await axios.get(
      `https://localhost:44305/api/Revenue/GetRevenue?month=${month}&year=${year}`
    );
    return response.data;
  },
  async GetExpenses(month, year) {
    const response = await apiurl.get(
      `/Expenses/GetExpenses?month=${month}&year=${year}`
    );
    return response.data;
  },
  async AddExpenses(requestBody, isSubmitted) {
    debugger;
    const response = await axios.post(
      `https://localhost:44305/api/Expenses/AddExpenses?isSubmmited=${isSubmitted}`,
      requestBody
    );
    return response.data;
  },
};
export default IndianFinanceService;
