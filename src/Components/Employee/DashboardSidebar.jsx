import { AnimatePresence, motion, transform } from "framer-motion";
import { FaHome, FaUser, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import "../../assets/Styles/test.css";
import { PiAddressBook } from "react-icons/pi";
export default function DashboardSidebar({ children }) {
  const [isOpen, setisOpen] = useState(false);
  const toggle = () => setisOpen(!isOpen);
  const routes = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/Setting",
      name: "Settings",
      icon: <BiAnalyse />,
    },
  ];
  const inputAnimation = {
    hidden: {
      with: 0,
      padding: 0,
      opacity: 0,
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };
  const ShowAnimation = {
    hidden: {
      with: 0,
      opacity: 0,
      transition: {
        duration: 0.7,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="main-container" style={{ display: "flex" }}>
      <motion.div
        animate={{ width: isOpen ? "200px" : "50px" }}
        className="sidebar"
      >
        <div className="top-section">
          {isOpen && (
            <motion.div
              className="logo"
              variants={ShowAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              Archents
            </motion.div>
          )}
          <div>
            <FaBars
              onClick={toggle}
              style={{ cursor: "pointer", fontSize: "1.5em" }}
            />
          </div>
        </div>
        <section className="routes">
          {routes.map((route) => (
            <NavLink
              activeClassName="active"
              to={route.path}
              key={route.name}
              className="link"
            >
              <div className="icon">{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={ShowAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link-text"
                  >
                    {route.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  );
}
