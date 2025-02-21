import axios from "axios";
const NotificationService = {
  async GetUserNotifications(id) {
    const response = await axios.get(
      `https://localhost:44305/api/Notifications/NotificationsWithEmployeeID?EmployeeId=${id}`
    );
    return response.data;
  },
  async UpdateNotification(notificationId, timeSheetId, replay) {
    const response = await axios.post(
      `https://localhost:44305/api/Timesheets/UpdatedTimeSheetForNotification?notificationId=${notificationId}&TimeSheetID=${timeSheetId}&replay=${replay}`
    );
    return response.data;
  },
  async GetNotificationsByTimesheetId(timeSheetId) {
    const response = await axios.get(
      `https://localhost:44305/api/Notifications/GetNotificationWithTimesheetID?timeSheetID=${timeSheetId}`
    );
    return response.data;
  },
};

export default NotificationService;
