import React, { useState, useEffect, useRef } from "react";
import "../../assets/Styles/Header.css";
import { json, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/ArchentsLogo.png";
import profile from "../../assets/Images/adminprofile.png";
import v from "../../assets/Images/v.png";
import { getSessionData } from "../../Service/SharedSessionData";
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

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen1(!isOpen1);
  };
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

        {isOpen1 && (
          <div
            style={{
              position: "absolute",
              top: "94%",
              right: "20px",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
              zIndex: 1000,
              width: "228px",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: "10px" }}>
              <li style={{ padding: "10px 0", cursor: "pointer" }}>
                View Profile
              </li>
              <li style={{ padding: "10px 0", cursor: "pointer" }}>Settings</li>
              <li
                style={{ padding: "10px 0", cursor: "pointer", color: "red" }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
