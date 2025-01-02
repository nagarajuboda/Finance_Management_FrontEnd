import React, { useState, useEffect, useRef } from "react";
import "../../assets/Styles/Header.css";
import { json, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/ArchentsLogo.png";
import profile from "../../assets/Images/adminprofile.png";
import v from "../../assets/Images/v.png";
import { getSessionData } from "../../Service/SharedSessionData";
import myprofile from "../../../src/assets/Images/myprofile.png";
import support from "../../../src/assets/Images/support.png";
import settings from "../../../src/assets/Images/settings.png";
import logout from "../../../src/assets/Images/Logout.png";
import NotificationImage from "../../../src/assets/Images/Notification.png";
import {
  FaSearch,
  FaUserCircle,
  FaBell,
  FaCog,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Header({ isOpen }) {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef(null);
  const popupRef = useRef(null);

  const [isVisibleProfile, setIsVisibleProfile] = useState(false);
  const [sessionData, setSessionDataState] = useState(null);
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState({});
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
  // const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  console.log(userDetails.employee, "user Deatis");
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen1(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDetails]);
  useEffect(() => {
    const subscription = getSessionData().subscribe({
      next: (data) => {
        setSessionDataState(data);
        console.log(data, "Updated sessionData");
      },
      error: (err) => {
        console.error("Error fetching session data: ", err);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  function logoutonclick() {
    console.log("logout clicked");
    var res = localStorage.removeItem("sessionData");
    navigate("");
  }
  function NavigateProfile(e) {
    e.preventDefault();
    setIsVisibleProfile(false);
    navigate("/Dashboard/Profile");
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        event.target.closest(".profile-popup") === null
      ) {
        setIsVisibleProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    if (isOpen1) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen1(false);
        setIsClosing(false);
      }, 200);
    } else {
      setIsOpen1(true);
    }
  };
  function toggleProfileVisibility(e) {
    e.preventDefault();
    setIsVisibleProfile((prevVisibility) => !prevVisibility);
  }
  const Logoutfunction = () => {
    navigate("/user/Login");
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      message: "Timesheet change request approved",
      isRead: false,
      createdAt: "2025-01-01T12:00:00Z",
    },
    {
      id: "2",
      message: "Employee submitted timesheet",
      isRead: false,
      createdAt: "2025-01-01T10:00:00Z",
    },
  ]);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="Headermaindiv"
      style={{
        width: "100%",
        marginLeft: isOpen ? "" : "",
      }}
    >
      <div
        className="me-3"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="notification-wrapper">
          <div
            className="notification-icon"
            style={{ cursor: "pointer" }}
            onClick={togglePopup}
          >
            <img
              src={NotificationImage}
              alt="Notifications"
              height="20"
              width="20"
            />
            {notifications.filter((notif) => !notif.isRead).length > 0 && (
              <span className="badge">
                {notifications.filter((notif) => !notif.isRead).length}
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        style={{ position: "relative", display: "inline-block" }}
        ref={dropdownRef}
      >
        <button onClick={toggleDropdown} style={{ cursor: "pointer" }}>
          <div
            className="profilediv"
            style={{ display: "flex", cursor: "pointer" }}
          >
            <span className="vericalline"></span>
            <div style={{ marginTop: "7px", marginLeft: "10px" }}>
              <img
                className="mt-1"
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                alt=""
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid #ccc",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </div>
            <div
              style={{ textAlign: "center", justifyContent: "center" }}
              className="mt-1 ms-2"
            >
              <div>
                <span className="username">
                  {`${userDetails.employee.firstName}   ${userDetails.employee.lastName}`}
                </span>
                <div className="userrole">
                  <span className="me-3">{userDetails.employee.role.name}</span>
                </div>
              </div>
            </div>
            <div className="">
              <img src={v} alt="" className="vimage" />
            </div>
          </div>
        </button>
        <div>
          {(isOpen1 || isClosing) && (
            <div
              className={`${isClosing ? "closeprofilediv" : "openprofilediv"}`}
              style={{
                position: "absolute",
                top: "94%",
                right: "20px",
                background: "white",
                border: "1px solid #ccc",
                boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                zIndex: 1000,
                width: "228px",
              }}
            >
              <ul style={{ listStyle: "none", margin: 0, paddingLeft: "10px" }}>
                <li style={{ padding: "10px 0", cursor: "pointer" }}>
                  <img src={myprofile} alt="" width="20px" height="20px" />
                  <span style={{ fontSize: "12px" }} className="ms-2">
                    My Profile
                  </span>
                </li>
                <div
                  style={{
                    border: "1px solid #64646430",
                    width: "100%",
                  }}
                ></div>
                <li style={{ padding: "10px 0", cursor: "pointer" }}>
                  <img src={support} alt="" width="20px" height="20px" />
                  <span style={{ fontSize: "12px" }} className="ms-2">
                    Support
                  </span>
                </li>
                <div
                  style={{
                    border: "1px solid #64646430",
                    width: "100%",
                  }}
                ></div>
                <li style={{ padding: "10px 0", cursor: "pointer" }}>
                  <img src={settings} alt="" width="20px" height="20px" />
                  <span style={{ fontSize: "12px" }} className="ms-2">
                    Settings
                  </span>
                </li>
                <div
                  style={{
                    border: "1px solid #64646430",
                    width: "100%",
                  }}
                ></div>
                <li
                  style={{ padding: "10px 0", cursor: "pointer" }}
                  onClick={Logoutfunction}
                >
                  <img src={logout} alt="" width="20px" height="20px" />
                  <span style={{ fontSize: "12px" }} className="ms-2">
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div ref={popupRef} className="notifications-popup">
          <div class="dropdown-arrow"></div>
          <div
            className="RecentNotificationContent ms-3"
            style={{ paddingTop: "20px" }}
          >
            Recent Notifications
          </div>
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="notification-item">
                <div className="notification-content">
                  <div style={{ display: "flex" }}>
                    <div className="boxshowdow"></div>
                    <div className="ms-3">
                      <span className="forwhatrequest">
                        TimeSheet change request approved
                      </span>
                      <p className="meta-info">
                        #RefID0345 |
                        {!notif.isRead ? (
                          <span
                            className="action-link"
                            onClick={() => markAsRead(notif.id)}
                          >
                            {/* Mark as Read */}
                            Accept
                          </span>
                        ) : (
                          "Accepted"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* <p className="time-info">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p> */}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
