import axios from "axios";
const TimeSheetService = {
  async AddNewTimeSheet(obj, projectManagerid) {
    console.log(projectManagerid, "-------------->");
    console.log(obj, "service obj");
    const response = await axios.post(
      `https://localhost:44305/api/Timesheets/AddtimeSheet?selectedDate=${obj.selectedDate}&projectId=${obj.projectId}&projectManager=${projectManagerid}`,
      obj.employeeData
    );
    console.log(response.data, "service after response");
    return response.data;
  },
};
export default TimeSheetService;
