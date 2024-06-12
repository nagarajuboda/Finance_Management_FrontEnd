import React, { useState, useEffect, useRef } from "react";
import "../../assets/Styles/Header.css";
import profile from "../../assets/Images/profile.jpg";
import {
  FaSearch,
  FaSearchDollar,
  FaUserCircle,
  FaFonticonsFi,
  FaBell,
  FaCog,
  FaInbox,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Header() {
  const [isVisibleProfile, setIsVisibleProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsVisibleProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleProfileVisibility() {
    setIsVisibleProfile(!isVisibleProfile);
  }

  return (
    <div className="maindiv">
      <div className="row">
        <div className="col-8 position-relative searchinputdiv">
          <input
            type="text"
            className="search form-control w-75 "
            placeholder="Search"
          />
          <div>
            <FaSearch className="search-icon position-absolute" />
          </div>
        </div>

        {/* <div className="col-2  settingandnotificationicons">
          <FaBell className="NotificationIcon" />
          <FaCog className="SettingsIcon" />
        </div> */}
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
              <p className="namep">Franklin Jr.</p>
              <p className="superadminp">Super Admin</p>
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
                  <h6 className="mb-0">Franklin Jr.</h6>
                  <div className=" fw-normal text-grey">
                    <p style={{ fontSize: "1em" }} className="superadminp">
                      Super Admin
                    </p>
                  </div>
                </div>
              </div>

              <hr className="hrtag" />
              <div className="cardbody ">
                <div className="Carduser">
                  <FaUserCircle className="cardicons" />

                  <p className="popup-item ms-3"> Profile</p>
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
                <FaSignOutAlt className=" Signouticon position-absolute" />
                <button type="submit" className="form-control">
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
