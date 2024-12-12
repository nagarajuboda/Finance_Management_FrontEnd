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
import {
  FaSearch,
  FaUserCircle,
  FaBell,
  FaCog,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
// import { data } from "jquery";
export default function Header({ isOpen }) {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Toggle dropdown visibility
  // const toggleDropdown = () => {
  //   setIsOpen1(!isOpen1);
  // };
  //const [isOpen, setisopen] = useState(false);
  const [isVisibleProfile, setIsVisibleProfile] = useState(false);
  const [sessionData, setSessionDataState] = useState(null);
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
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
  // const [sessionData, setSessionData] = useState(null);
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
      }, 200); // Match the animation duration (0.2s)
    } else {
      setIsOpen1(true);
    }
  };
  function toggleProfileVisibility(e) {
    e.preventDefault();
    setIsVisibleProfile((prevVisibility) => !prevVisibility);
  }

  return (
    <div
      className="maindiv"
      style={{
        width: "100%",
        marginLeft: isOpen ? "" : "",
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <button onClick={toggleDropdown} style={{ cursor: "pointer" }}>
          <div
            className="profilediv"
            style={{ display: "flex", cursor: "pointer" }}
          >
            <span className="vericalline"></span>
            <div style={{ marginTop: "7px", marginLeft: "10px" }}>
              <img src={profile} alt="" />
            </div>
            <div
              style={{ textAlign: "center", justifyContent: "center" }}
              className="mt-1 ms-2"
            >
              <div>
                <span className="username">Shwetha mohan</span>
                <div className="userrole">
                  <span className="me-3">Administator</span>
                </div>
              </div>
            </div>
            <div className="">
              <img src={v} alt="" className="vimage" />
            </div>
          </div>
        </button>
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
              <li style={{ padding: "10px 0", cursor: "pointer" }}>
                <img src={logout} alt="" width="20px" height="20px" />
                <span style={{ fontSize: "12px" }} className="ms-2">
                  Logout
                </span>
              </li>
            </ul>
          </div>
        )}
        {/* {isOpen1 && (
          <div
            className="openprofilediv"
            style={{
              position: "absolute",
              top: "94%",
              right: "20px",
              background: "white",
              border: "1px solid #ccc",
              // borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
              zIndex: 1000,
              width: "228px",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, paddingLeft: "10px" }}>
              <li style={{ padding: "10px 0", cursor: "pointer" }}>
                <img src={myprofile} alt="" width="20px" height="20px" />
                <span style={{ fontSize: "12px" }} className="ms-2">
                  My profile
                </span>
              </li>
              <div
                style={{
                  border: "1px solid #64646430",
                  width: "100%",
                }}
                className=""
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
                className=""
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
                className=""
              ></div>
              <li style={{ padding: "10px 0", cursor: "pointer" }}>
                <img src={logout} alt="" width="20px" height="20px" />
                <span style={{ fontSize: "12px" }} className="ms-2">
                  Logout
                </span>
              </li>
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
}
