import React, { useState } from "react";
import "../../assets/Styles/Sidebar.css";
import logo from "../../assets/Images/ArchentsLogo.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import { IoPeopleOutline } from "react-icons/io5";
import { VscProject } from "react-icons/vsc";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsCalendarDay } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { useEffect } from "react";
import { VscTasklist } from "react-icons/vsc";

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
import { RiDashboard3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Header from "./Header";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [sessionData, setSessionData] = useState(null);
  const toggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setOpenDropdowns([]); // Close all dropdowns when sidebar is minimized
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("sessionData");
    //console.log(data, "sesson data in sidebar");
    if (data) {
      setSessionData(JSON.parse(data));
      //   setSessionData(data);
    }
  }, []);
  // console.log(sessionData, "sidebar session data");
  const toggleDropdown = (index) => {
    setOpenDropdowns((prevOpenDropdowns) => {
      if (prevOpenDropdowns.includes(index)) {
        return prevOpenDropdowns.filter((i) => i !== index);
      } else {
        return [...prevOpenDropdowns, index];
      }
    });
  };

  const adminMenuItems = [
    {
      // path: "/dsa",
      name: "Dashboards",
      icon: <RiDashboard3Line />,
      submenu: [
        { path: "/list2", name: "- Invoice Management" },
        { path: "/list1", name: "- HR management" },
        { path: "/list2", name: "- Job Hiring Management" },
        { path: "/list1", name: "- Project management1" },
        { path: "/list1", name: "- Project management1" },
      ],
    },
    {
      // path: "/about",
      name: "Hr Management",
      icon: <IoPeopleOutline />,
      submenu: [
        { path: "/EmployeeDashboard", name: "- Employees" },
        { path: "/list1", name: "- Recruiment" },
        { path: "/list2", name: "- Jobs" },
        { path: "/list1", name: "- Condidates" },
        { path: "/list1", name: "- Attendance" },
        { path: "/list1", name: "- Leaves" },
      ],
    },
    {
      name: "Project Management",
      icon: <VscProject />,
      submenu: [
        { path: "/contracts", name: "- Contracts" },
        { path: "/Dashboard/AllProjects", name: "- Projects" },
        // { path: "/analytics/AddProject", name: "-AddProject" },
        { path: "/Files", name: "- Files" },
        { path: "/Profile", name: "- Profile" },
      ],
    },
    {
      // path: "/comment",
      name: "General",
      icon: <AiOutlineDashboard />,
      submenu: [
        { path: "/list2", name: "- Contracts" },
        { path: "/list1", name: "- Profile" },
        { path: "/list2", name: "- Preferences" },
      ],
    },
    {
      // path: "/product",
      name: "Calender",
      icon: <BsCalendarDay />,
      submenu: [
        { path: "/list2", name: "- Inbox" },
        { path: "/list1", name: "- Chat Priview" },
        { path: "/list2", name: "- chat Priview 1" },
      ],
    },
    {
      // path: "/product",
      name: "Email",
      icon: <MdOutlineMailOutline />,
      submenu: [
        { path: "/list2", name: "- Inbox" },
        { path: "/list1", name: "- Email Compose" },
        { path: "/list2", name: "- Email Priview " },
      ],
    },
    {
      // path: "/product",
      name: "Chat",
      icon: <IoChatbubbleOutline />,
      submenu: [
        { path: "/list2", name: "- Inbox" },
        { path: "/list1", name: "- Chat Priview" },
        { path: "/list2", name: "- chat2 Priview " },
      ],
    },
    {
      // path: "/product",
      name: "Invoices",
      icon: <LiaFileInvoiceSolid />,
      submenu: [
        { path: "/list2", name: "- Invoice List" },
        { path: "/list1", name: "- Invoice Details" },
        { path: "/list2", name: "- Create Invoice" },
      ],
    },

    {
      // path: "/productList",
      name: "Task",
      icon: <VscTasklist />,
      submenu: [
        { path: "/list2", name: "- Task List" },
        { path: "/list1", name: "- Task2" },
      ],
    },
  ];
  const employeeMenuItems = [
    {
      name: "Dashboards",
      icon: <RiDashboard3Line />,
      submenu: [{ path: "/list2", name: "- Projects" }],
    },
  ];
  const ProjectManagerMenuItems = [
    {
      // path: "/dsa",
      name: "Dashboards",
      icon: <RiDashboard3Line />,
      submenu: [
        { path: "/list2", name: "- Invoice Management" },
        { path: "/list1", name: "- HR management" },
        { path: "/list2", name: "- Job Hiring Management" },
        { path: "/list1", name: "- Project management1" },
        { path: "/list1", name: "- Project management1" },
      ],
    },
    {
      // path: "/about",
      name: "Hr Management",
      icon: <IoPeopleOutline />,
      submenu: [{ path: "/list2", name: "- Employees" }],
    },
    {
      name: "Project Management",
      icon: <VscProject />,
      submenu: [
        { path: "/Employee/Projects", name: "- All projects" },
        { path: "/Employee/TimeSheet", name: "- Timesheet" },
      ],
    },
  ];
  // const menuItems =
  //   sessionData?.employee?.role?.name === "Admin"
  //     ? adminMenuItems
  //     : employeeMenuItems;

  const menuItems =
    sessionData?.employee?.role?.name === "Admin"
      ? adminMenuItems
      : sessionData?.employee?.role?.name === "Project Manger"
      ? ProjectManagerMenuItems
      : employeeMenuItems;
  return (
    <div className="containers" style={{ width: "100vw" }}>
      <div style={{ width: isOpen ? "370px" : "80px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            <img src={logo} alt="" width="140px" />
          </h1>
          <div style={{ marginLeft: isOpen ? "80px" : "0px" }} className="bars">
            <i
              className="bi bi-list openandcloseicon"
              onClick={toggle}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
        {menuItems.map((item, index) => (
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
                  backgroundColor: isOpen ? "#DEEFF5" : "white",
                }}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <div key={subIndex}>
                    {console.log(subItem.path, "path of sub item")}
                    <NavLink
                      to={subItem.path}
                      key={subIndex}
                      className="link submenu_link"
                    >
                      <div
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        {subItem.name}
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="renderdiv">
        <Header />
        <main
          style={{ backgroundColor: "#DEEFF5" }}
          className="childercomponents"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
