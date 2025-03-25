import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../../src/assets/Styles/Notification.css";
import NotificationService from "../../Service/AdminService/NotificationService";
import checkimgae1 from "../../assets/Images/check.png";
import elllips1 from "../../assets/Images/Ellipse.png";
export default function Notifications() {
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
  const [AcceptSuccessMessage, setAcceptSuccessMessage] = useState(false);
  const [declinedPopup, setDeclinedPopup] = useState(false);
  var userID = userDetails.employee.id;
  const [notifications, setNotifications] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [loadingDeclineStates, setLoadingDeclineStates] = useState({});
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetchData();
    getRelativeTime(new Date());
  }, []);
  const fetchData = async () => {
    var result = await NotificationService.GetUserNotifications(userID);
    if (result.isSuccess) {
      setNotifications(result.item);
    }
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
    index,
    notificationId,
    timesheetid,
    acceptOrReject
  ) => {
    if (acceptOrReject === "Accepted") {
      setLoadingStates((prev) => ({ ...prev, [index]: true }));
    } else {
      setLoadingDeclineStates((prev) => ({ ...prev, [index]: true }));
    }

    var response = await NotificationService.UpdateNotification(
      notificationId,
      timesheetid,
      acceptOrReject
    );
    if (response.isSuccess) {
      if (acceptOrReject == "Accepted") {
        setAcceptSuccessMessage(true);
        setLoadingStates((prev) => ({ ...prev, [index]: false }));
        fetchData();
      } else {
        setDeclinedPopup(true);
        setLoadingDeclineStates((prev) => ({
          ...prev,
          [index]: false,
        }));
        fetchData();
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
  const sortedNotifications = notifications
    .filter((notif) => {
      const notifDate = new Date(notif.createdAt);
      const today = new Date();

      return notifDate >= notifDate <= today;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <div className="AllNotificationDiv">
        <span className="notifications-span ">notifications</span>
      </div>
      <div className="Allnotifications">
        {userDetails.employee.role.name == "Indian-finance" ? (
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
              sortedNotifications.map((notif, index) => (
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
                            change request from Project Manager{" "}
                            <span style={{ fontWeight: "1000" }}>
                              {notif.senderDetails.firstName}{" "}
                              {notif.senderDetails.lastName}
                            </span>{" "}
                            for{" "}
                            <span style={{ fontWeight: "1000" }}>
                              {months[notif.selectedMonth - 1]}{" "}
                              {notif.selectedYear}
                            </span>
                            .
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
                          <div>
                            {notif.reply === 1 ? (
                              <div style={{ marginBottom: "20px" }}>
                                <button
                                  type="button"
                                  className="accepted_button"
                                >
                                  Accepted
                                </button>
                              </div>
                            ) : notif.reply === 2 ? (
                              <div style={{ marginBottom: "20px" }}>
                                <button
                                  type="button"
                                  className="rejected_button"
                                >
                                  Rejected
                                </button>
                              </div>
                            ) : (
                              <div
                                className="d-flex"
                                style={{ marginBottom: "20px" }}
                              >
                                <div>
                                  {loadingStates[index] ? (
                                    <button
                                      className="btn btn-primary "
                                      type="button"
                                      disabled
                                      style={{
                                        marginRight: "10px",
                                        height: "36px",
                                      }}
                                    >
                                      <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                      ></span>
                                      Loading...
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="notification-accept-button"
                                      onClick={() =>
                                        AcceptNotificaton(
                                          index,
                                          notif.id,
                                          notif.timesheetId,
                                          "Accepted"
                                        )
                                      }
                                    >
                                      Accept
                                    </button>
                                  )}
                                </div>
                                <div>
                                  {loadingDeclineStates[index] ? (
                                    <button
                                      className="btn btn-danger ms-3"
                                      type="button"
                                      disabled
                                      style={{
                                        marginRight: "10px",
                                        height: "36px",
                                      }}
                                    >
                                      <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                      ></span>
                                      Loading...
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="notification-decline-button ms-3"
                                      onClick={() =>
                                        AcceptNotificaton(
                                          index,
                                          notif.id,
                                          notif.timesheetId,
                                          "Rejected"
                                        )
                                      }
                                    >
                                      Decline
                                    </button>
                                  )}
                                </div>
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
        ) : (
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
              sortedNotifications.map((notif) => (
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
                          {notif.reply === 1 ? (
                            <span className="timesheetApproval-message">
                              Your Timesheet update request for{" "}
                              <span style={{ fontWeight: "1000" }}>
                                {months[notif.selectedMonth - 1]}{" "}
                                {notif.selectedYear}
                              </span>{" "}
                              has been accepted by the indian finance team. You
                              can process with the Timesheet update.
                            </span>
                          ) : (
                            <span className="timesheetApproval-message">
                              Your Timesheet update request for{" "}
                              {months[notif.selectedMonth - 1]}{" "}
                              {notif.selectedYear} has been decline by the
                              indian finance team.
                            </span>
                          )}

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          ></div>
                          <div>
                            {notif.reply === 1 ? (
                              <div style={{ marginBottom: "20px" }}>
                                <button
                                  type="button"
                                  className="accepted_button"
                                >
                                  Accepted
                                </button>
                              </div>
                            ) : (
                              <div style={{ marginBottom: "20px" }}>
                                <button
                                  type="button"
                                  className="rejected_button"
                                >
                                  Rejected
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
