import React, { useState, useEffect, useRef } from "react";
import "../../assets/Styles/Header.css";
import profile from "../../assets/Images/profile.jpg";
import { json, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/ArchentsLogo.png";
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
export default function Header() {
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

  useEffect(() => {
    // console.log(result);
    // if (data) {
    //   setSessionData(result);
    // }
  }, []);
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
    <div className="maindiv">
      <div className="row">
        <div className="col-2">
          <h1 className="logo">
            <img src={logo} alt="" width="140px" />
          </h1>
        </div>

        <div className="col-6 position-relative searchinputdiv">
          <input
            type="text"
            className="search form-control w-75"
            placeholder="Search"
            style={{ padding: "8px 5px 8px 35px" }}
          />
          <FaSearch
            className="search-icon position-absolute"
            style={{ top: "40%", left: "26px", transform: "translateY(-50%)" }}
          />
        </div>

        <div className="col-4 d-flex profileicons">
          <FaBell className="NotificationIcon" />
          <FaCog className="SettingsIcon" />
          <div
            className="vertical-line"
            style={{ borderLeftColor: "#9f9f9f" }}
          ></div>

          <div className="d-flex ms-4 profileandrole" ref={profileRef}>
            <div>
              <img src={profile} alt="" className="profileImage" />
            </div>
            <div
              className="nameandrole ms-2 "
              onClick={toggleProfileVisibility}
            >
              <p className="namep" style={{ fontSize: "1rem" }}>
                {/* Franklin Jr. */}
                {`${userDetails?.employee?.firstName} ${userDetails?.employee?.lastName}`}
              </p>
              {/* {console.log("------------>", userDetails.employee.role)} */}
              <p className="superadminp" style={{ fontSize: "1rem" }}>
                {userDetails?.employee?.role.name}
              </p>
            </div>
          </div>
        </div>
        {isVisibleProfile && (
          <div className="profile-popup">
            <div className="card">
              <div className=" text-center">
                <img
                  src={profile}
                  alt=""
                  width="40px"
                  className="cardProfile"
                />
                <div className="mt-2">
                  <h6 className="mb-0">{`${userDetails?.employee?.firstName} ${userDetails?.employee?.lastName}`}</h6>
                  <div className=" fw-normal text-grey">
                    <p style={{ fontSize: "1em" }} className="superadminp">
                      {userDetails?.employee?.role.name}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="hrtag" />
              <div className="cardbody ">
                <div className="Carduser">
                  <FaUserCircle className="cardicons" />
                  <p className="popup-item ms-3 ">
                    {/* <Link to="/Dashboard/Profile">Profile</Link> */}
                    <Link onClick={NavigateProfile}>Profile</Link>
                  </p>
                </div>
                <div className="cardInbox">
                  <FaEnvelope className="cardicons" />
                  <p className="popup-item ms-3">Inbox</p>
                </div>
                <div className="cardSettings">
                  <FaCog className="cardicons" />
                  <p className="popup-item ms-3">Settings & Privacy</p>
                </div>
              </div>
              <hr className="hrtag" />
              <div className="cardfooter position-relative">
                <FaSignOutAlt className="Signouticon position-absolute" />
                <button
                  type="button"
                  className="form-control"
                  onClick={logoutonclick}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
