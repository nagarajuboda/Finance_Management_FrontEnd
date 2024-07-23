import axios from "axios";
const TimeSheetService = {
  async AddNewTimeSheet(obj, projectManagerid, isSubmited) {
    console.log(isSubmited, "-------------->");
    console.log(obj, "service obj");
    const response = await axios.post(
      `https://localhost:44305/api/Timesheets/AddtimeSheet?selectedDate=${obj.selectedDate}&projectId=${obj.projectId}&projectManager=${projectManagerid}&isSubmited=${isSubmited}`,
      obj.employeeData
    );
    console.log(response.data, "service after response");
    return response.data;
  },
  async GetTimeSheetDeatils(month, projectId) {
    const response = await axios.post(
      `https://localhost:44305/api/Timesheets/GetTimeSheetEmployees?month=${month}&projectId=${projectId}`
    );

    console.log(response.data, "getTimeSheet in response");
    return response.data;
  },
};
export default TimeSheetService;
