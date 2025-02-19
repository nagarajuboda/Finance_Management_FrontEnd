import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../../src/assets/Styles/Notification.css";
import NotificationService from "../../Service/NotificationService";
import checkimgae1 from "../../assets/Images/check.png";
import elllips1 from "../../assets/Images/Ellipse.png";
export default function Notifications() {
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
  const [AcceptSuccessMessage, setAcceptSuccessMessage] = useState(false);
  const [declinedPopup, setDeclinedPopup] = useState(false);
  var userID = userDetails.employee.id;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    var result = await NotificationService.GetUserNotifications(userID);
    setNotifications(result);
  };
  const getRelativeTime = (timestamp) => {
    const parsedDate = Date.parse(timestamp);
    if (isNaN(parsedDate)) {
      return "Invalid date";
    }

    const date = new Date(parsedDate);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) {
      return "Just now";
    }
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };
  const AcceptNotificaton = async (
    notificationId,
    timesheetid,
    acceptOrReject
  ) => {
    console.log(notificationId, timesheetid, acceptOrReject);
    var response = await NotificationService.UpdateNotification(
      notificationId,
      timesheetid,
      acceptOrReject
    );
    console.log(response);
    if (response.isSuccess) {
      if (acceptOrReject == "Accepted") {
        setAcceptSuccessMessage(true);
      } else {
        setDeclinedPopup(true);
      }
    }
  };
  const closeAcceptedorRejectedPopup = () => {
    fetchData();
    setAcceptSuccessMessage(false);
  };
  const CloseRejectedPopup = () => {
    fetchData();
    setDeclinedPopup(false);
  };
  console.log(notifications, "=======>");
  return (
    <div>
      <div className="AllNotificationDiv">
        <span className="notifications-span ">notifications</span>
      </div>
      <div className="Allnotifications">
        {userDetails.employee.role.name === "Admin" && (
          <div className="m-3">
            <span className="All-notification-span ms-2">All Notification</span>
            {notifications.length === 0 ? (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                No notifications
              </span>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="notification-item mt-2 pb-2"
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <div className="notification-content">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex" }} className="">
                        <div className="boxshowdow"></div>
                        <div className="ms-3">
                          <span className="timesheetApproval-message">
                            This is a reminder regarding a timesheet approval
                            change request from Project Manager Nagaraju Boda
                            for May 2024.
                          </span>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p
                              className="meta-info"
                              style={{ display: "flex" }}
                            >
                              <span className="approval-please-message">
                                could you please review the timesheet and do the
                                approval please
                              </span>
                            </p>
                          </div>
                          {/* <div className="">
                            <button
                              type="button"
                              className="notification-accept-button"
                              onClick={() =>
                                AcceptNotificaton(
                                  notif.id,
                                  notif.timesheetId,
                                  "Accepted"
                                )
                              }
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className="notification-decline-button ms-3"
                              onClick={() =>
                                AcceptNotificaton(
                                  notif.id,
                                  notif.timesheetId,
                                  "Rejected"
                                )
                              }
                            >
                              Decline
                            </button>
                          </div> */}
                          <div>
                            {notif.reply === 1 ? (
                              <div>
                                <button type="button">Accepted</button>
                              </div>
                            ) : notif.reply === 2 ? (
                              <div>
                                <button type="button">Rejected</button>
                              </div>
                            ) : (
                              <div className="">
                                <button
                                  type="button"
                                  className="notification-accept-button"
                                  onClick={() =>
                                    AcceptNotificaton(
                                      notif.id,
                                      notif.timesheetId,
                                      "Accepted"
                                    )
                                  }
                                >
                                  Accept
                                </button>
                                <button
                                  type="button"
                                  className="notification-decline-button ms-3"
                                  onClick={() =>
                                    AcceptNotificaton(
                                      notif.id,
                                      notif.timesheetId,
                                      "Rejected"
                                    )
                                  }
                                >
                                  Decline
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="meta-infoo">
                        {getRelativeTime(notif.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {AcceptSuccessMessage && (
        <div className="unique-popup-overlay">
          <div className="unique-popup-container">
            <div className="unique-popup-icon">
              <div className="ellipse-container">
                <img
                  src={checkimgae1}
                  alt="Check"
                  className="check-image"
                  height="40px"
                  width="40px"
                />
                <img
                  src={elllips1}
                  alt="Ellipse"
                  className="ellipse-image"
                  height="65px"
                  width="65px"
                />
              </div>
            </div>
            <h2 className="unique-popup-title">
              TimeSheet Accepted Successfully!
            </h2>
            <p className="unique-popup-message">Click OK to view result</p>
            <button
              className="unique-popup-button"
              onClick={closeAcceptedorRejectedPopup}
            >
              OK
            </button>
          </div>
        </div>
      )}
      {declinedPopup && (
        <div className="unique-popup-overlay">
          <div className="unique-popup-container">
            <div className="unique-popup-icon">
              <div className="ellipse-container">
                <img
                  src={checkimgae1}
                  alt="Check"
                  className="check-image"
                  height="40px"
                  width="40px"
                />
                <img
                  src={elllips1}
                  alt="Ellipse"
                  className="ellipse-image"
                  height="65px"
                  width="65px"
                />
              </div>
            </div>
            <h2 className="unique-popup-title">
              TimeSheet Rejected Successfully!
            </h2>
            <p className="unique-popup-message">Click OK to view result</p>
            <button
              className="unique-popup-button"
              onClick={CloseRejectedPopup}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
