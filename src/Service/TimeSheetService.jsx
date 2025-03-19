import axios from "axios";
import { apiurl } from "./createAxiosInstance";
const TimeSheetService = {
  async AddNewTimeSheet(obj, projectManagerid, isSubmited) {
    const response = await apiurl.post(
      `/Timesheets/AddtimeSheet?selectedDate=${obj.selectedDate}&projectId=${obj.projectId}&projectManager=${projectManagerid}&isSubmited=${isSubmited}`,
      obj.employeeData
    );

    return response.data;
  },
  async GetTimeSheetDeatils(month, projectId) {
    const response = await apiurl.post(
      `/Timesheets/GetTimeSheetEmployees?month=${month}&projectId=${projectId}`
    );

    return response.data;
  },
};
export default TimeSheetService;
