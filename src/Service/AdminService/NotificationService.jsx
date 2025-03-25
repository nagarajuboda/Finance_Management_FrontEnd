import axios from "axios";
import { apiurl } from "../createAxiosInstance";
const NotificationService = {
  async GetUserNotifications(id) {
    const response = await apiurl.get(
      `/Notifications/NotificationsWithEmployeeID?EmployeeId=${id}`
    );

    return response.data;
  },
  async UpdateNotification(notificationId, timeSheetId, replay) {
    const response = await apiurl.post(
      `/Timesheets/UpdatedTimeSheetForNotification?notificationId=${notificationId}&TimeSheetID=${timeSheetId}&replay=${replay}`
    );
    return response.data;
  },
  async GetNotificationsByTimesheetId(timeSheetId) {
    const response = await apiurl.get(
      `/Notifications/GetNotificationWithTimesheetID?timeSheetID=${timeSheetId}`
    );
    return response.data;
  },
};

export default NotificationService;
