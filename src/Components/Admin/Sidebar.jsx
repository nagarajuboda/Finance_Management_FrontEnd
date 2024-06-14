import React, { useState } from "react";
import "../../assets/Styles/Sidebar.css";
import logo from "../../assets/Images/ArchentsLogo.png";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaChevronDown,
  FaChevronCircleRight,
  FaChevronRight,
  FaUser,
  FaTasks,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Header from "./Header";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState([]);

  const toggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setOpenDropdowns([]); // Close all dropdowns when sidebar is minimized
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdowns((prevOpenDropdowns) => {
      if (prevOpenDropdowns.includes(index)) {
        return prevOpenDropdowns.filter((i) => i !== index);
      } else {
        return [...prevOpenDropdowns, index];
      }
    });
  };

  const menuItem = [
    {
      // path: "/dsa",
      name: "Dashboards",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-speedometer"
          viewBox="0 0 16 16"
        >
          <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z" />
          <path
            fill-rule="evenodd"
            d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"
          />
        </svg>
      ),
      submenu: [
        { path: "/list2", name: "-Invoice Management" },
        { path: "/list1", name: "-HR management" },
        { path: "/list2", name: "-Job Hiring Management" },
        { path: "/list1", name: "-Project management1" },
        { path: "/list1", name: "-Project management1" },
      ],
    },
    {
      // path: "/about",
      name: "Hr Management",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-people"
          viewBox="0 0 16 16"
        >
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
        </svg>
      ),
      submenu: [
        { path: "/list2", name: "-Employees" },
        { path: "/list1", name: "-Recruiment" },
        { path: "/list2", name: "-Jobs" },
        { path: "/list1", name: "-Condidates" },
        { path: "/list1", name: "-Attendance" },
        { path: "/list1", name: "-Leaves" },
      ],
    },
    {
      name: "Project Management",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-kanban"
          viewBox="0 0 16 16"
        >
          <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z" />
        </svg>
      ),
      submenu: [
        { path: "/contracts", name: "-Contracts" },
        { path: "/analytics/AllProjects", name: "-Projects" },
        { path: "/Files", name: "-Files" },
        { path: "/Profile", name: "-Profile" },
      ],
    },
    {
      // path: "/comment",
      name: "General",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-speedometer2"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z" />
          <path
            fill-rule="evenodd"
            d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"
          />
        </svg>
      ),
      submenu: [
        { path: "/list2", name: "-Contracts" },
        { path: "/list1", name: "-Profile" },
        { path: "/list2", name: "-Preferences" },
      ],
    },
    {
      // path: "/product",
      name: "Calender",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-calendar-day"
          viewBox="0 0 16 16"
        >
          <path d="M4.684 11.523v-2.3h2.261v-.61H4.684V6.801h2.464v-.61H4v5.332zm3.296 0h.676V8.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a2 2 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98zm2.805-5.093c0 .238.192.425.43.425a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43m.094 5.093h.672V7.418h-.672z" />
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
        </svg>
      ),
      submenu: [
        { path: "/list2", name: "-Inbox" },
        { path: "/list1", name: "-Chat Priview" },
        { path: "/list2", name: "-chat Priview 1" },
      ],
    },
    {
      // path: "/product",
      name: "Email",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-envelope"
          viewBox="0 0 16 16"
        >
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
        </svg>
      ),
      submenu: [
        { path: "/list2", name: "-Inbox" },
        { path: "/list1", name: "-Email Compose" },
        { path: "/list2", name: "-Email Priview " },
      ],
    },
    {
      // path: "/product",
      name: "Chat",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chat"
          viewBox="0 0 16 16"
        >
          <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
        </svg>
      ),
      submenu: [
        { path: "/list2", name: "-Inbox" },
        { path: "/list1", name: "-Chat Priview" },
        { path: "/list2", name: "-chat2 Priview " },
      ],
    },
    {
      // path: "/product",
      name: "Invoices",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-receipt"
          viewBox="0 0 16 16"
        >
          <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z" />
          <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5" />
        </svg>
      ),
      submenu: [
        { path: "/list2", name: "-Invoice List" },
        { path: "/list1", name: "-Invoice Details" },
        { path: "/list2", name: "-Create Invoice" },
      ],
    },

    {
      // path: "/productList",
      name: "Task",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-kanban"
          viewBox="0 0 16 16"
        >
          <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z" />
        </svg>
      ),
      submenu: [
        { path: "/list2", name: "-Task List" },
        { path: "/list1", name: "-Task2" },
      ],
    },
  ];

  return (
    <div className="containers">
      <div style={{ width: isOpen ? "370px" : "80px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            <img src={logo} alt="" width="140px" />
          </h1>
          <div style={{ marginLeft: isOpen ? "80px" : "0px" }} className="bars">
            {/* <FaBars
              onClick={toggle}
              className="openandcloseicon"
              style={{ cursor: "pointer" }}
            /> */}
            <i
              className="bi bi-list openandcloseicon"
              onClick={toggle}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div key={index} className="sidebarmenu">
            {isOpen &&
              (index === 0 ? (
                <div>
                  <p className="Mainmenup ms-4 mb-4 ls-1 text-grey text-uppercase">
                    Main Home
                  </p>
                  <p className="b-2 text-uppercase ms-3 mt-4 mb-2">Home</p>
                </div>
              ) : index === 1 ? (
                <p className="mb-2 text-uppercase ms-3 mt-4 mb-2">SASS</p>
              ) : index === 4 ? (
                <p className="b-2 text-uppercase ms-3 mt-4 mb-2">APPS</p>
              ) : null)}
            <NavLink
              to={item.path}
              className="link"
              activeClassName="active"
              onClick={() => item.submenu && toggleDropdown(index)}
            >
              <div className="icon">
                {item.icon}
                <div
                  style={{
                    display: isOpen ? "block" : "none",
                    fontSize: "16px",
                    margin: "0px 5px",
                  }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </div>

              {item.submenu && (
                <FaChevronRight
                  className={`dropdown-icon ${
                    openDropdowns.includes(index) ? "open" : ""
                  }`}
                  style={{ color: "#9f9f9f" }}
                />
              )}
            </NavLink>
            {item.submenu && (
              <div
                className={`submenu ${
                  openDropdowns.includes(index) ? "open" : ""
                }`}
                style={{
                  padding: isOpen ? "0px 0px" : "8px 0px",
                  backgroundColor: isOpen ? "#fafafa" : "white",
                }}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <div>
                    {/* {console.log(subItem, "subitem", subIndex, "index")} */}
                    {console.log(subItem.path, "path of sub item")}
                    <NavLink
                      to={subItem.path}
                      key={subIndex}
                      className="link submenu_link"
                      activeClassName="active"
                    >
                      <div
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        {subItem.name}
                      </div>
                    </NavLink>
                    {/* {isOpen && subItem.path === "/Projects" && <p>Hello</p>} */}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="renderdiv">
        <Header />
        <main style={{ backgroundColor: "rgb(250, 249, 246)" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
