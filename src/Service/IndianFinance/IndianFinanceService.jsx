import { apiurl } from "../createAxiosInstance";
const IndianFinanceService = {
  async GetRevenue(month, year) {
    const response = await apiurl.get(
      `/Revenue/GetRevenue?month=${month}&year=${year}`
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
    const response = await apiurl.post(
      `/Expenses/AddExpenses?isSubmmited=${isSubmitted}`,
      obj
    );
    return response.data;
  },
};
export default IndianFinanceService;
