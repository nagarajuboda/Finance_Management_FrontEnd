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
  async AddExpenses(obj, isSubmitted) {
    const response = await axios.post(
      `https://localhost:44305/api/Expenses/AddExpenses?isSubmmited=${isSubmitted}`,
      obj
    );
    return response.data;
  },
};
export default IndianFinanceService;
