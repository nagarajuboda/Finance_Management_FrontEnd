import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "../../assets/Styles/Login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setSessionData } from "../../Service/SharedSessionData";
import { ControlCameraSharp } from "@mui/icons-material";
import { LoginFormValidation } from "../Admin/Pages/LoginFormValidation";
import { getotpValidation } from "./getotpValidation";
import loginLogo from "../../../src/assets/Images/loginbg1.png";
import Login2 from "../../../src/assets/Images/Login2.png";
import archetslogo from "../../../src/assets/Images/primary-logo.png";
import LoginImage from "../../../src/assets/Images/loginbg1.png";
import rememeberme from "../../assets/Images/checkbox.svg";
const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("login");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disibleloginbuttons, setDisibleloginbuttons] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [emailvalues, setEmialValuess] = useState({
    email: "",
  });
  const [emailerror, setEmialerror] = useState({
    email: "",
  });
  const [valuess, setValuess] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigatetoforgotpasswordpage = async () => {
    navigate("/user/forgotpassword");
  };
  const onLoginButtonClick = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: LoginFormValidation("email", valuess.email),
      password: LoginFormValidation("password", valuess.password),
    };

    setError(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");

    if (isValid) {
      var obj = {
        Email: valuess.email,
        Password: valuess.password,
      };

      var responses = await axios.post(
        "https://localhost:44305/api/Login/login",
        obj
      );
      var result = await responses.data;
      localStorage.setItem("sessionData", JSON.stringify(result.item));
      setLoggedIn(true);
      if (result.isSuccess === true) {
        setLoggedIn(true);
        setSessionData(result.item);
        if (result.item.employee.isFirstTimeLogin === true) {
          localStorage.setItem("Email", valuess.email);
          navigate("/user/CreateNewPassword");
        } else {
          if (result.item.employee.role.name === "US-finance") {
            navigate("/Dashboard/FinanceDashboard");
          } else if (result.item.employee.role.name === "Admin") {
            navigate("/dashboard/AdminDashboard");
          } else if (result.item.employee.role.name === "Indian-finance") {
            navigate("/Dashboard/Dashboard");
          } else if (result.item.employee.role.name === "Project Manager") {
            navigate("/dashboard/UnderEmployees");
          }
        }
      } else {
        if (result.error.code === "AUTH001") {
          toast.error("Email not found. Please check your email address.", {
            position: "top-right",
            autoClose: 4000,
          });
        } else if (result.error.code === "AUTH002") {
          toast.error(
            "Incorrect password. Please check your password and try again.",
            { position: "top-right", autoClose: 4000 }
          );
        } else if (result.error.code === "AUTH003") {
          toast.error("Employee has no access to login.", {
            position: "top-right",
            autoClose: 4000,
          });
        } else {
          toast.error("Check your email and password.", {
            position: "top-right",
            autoClose: 4000,
          });
        }
      }
    }
  };

  const [values, setValues] = useState({
    Email: "",
  });

  async function getotpfunction(e) {
    e.preventDefault();
    const newErrors = {
      email: getotpValidation("email", emailvalues.email),
    };
    setEmialerror(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      var obj = {
        Email: emailvalues.email,
      };
      var responses = await axios.post(
        "https://localhost:44305/api/Auth/get-otp",
        obj
      );
      var result = await responses.data;
      if (result.isSuccess) {
        toast.success("OTP sent successfully to Your Email.", {
          position: "top-right",
          autoClose: 4000,
        });
        setView("verifyOtp");
      } else {
        toast.error("Please enter a valid email.", {
          position: "top-right",
          autoClose: 4000,
        });
      }
    }
  }

  const [otpValues, setOtpValues] = useState({
    Otp: "",
  });
  const [otpErrors, setOtpErrors] = useState({
    Otp: "",
  });

  const handleOtpChange = (e) => {
    const { name, value } = e.target;

    setOtpValues({
      ...otpValues,
      [name]: value,
    });
    setOtpErrors({
      ...otpErrors,
      [name]: validateOtp(name, value),
    });
  };

  async function onVerifyOtpClick(e) {
    e.preventDefault();
    const newErrors = {
      Otp: validateOtp("Otp", otpValues.Otp),
    };
    setOtpErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");
    if (!isValid) {
      var obj = { Email: values.Email, Otp: otpValues.Otp };
      var responses = await axios.post(
        "https://localhost:44305/api/Auth/verify-otp",
        obj
      );
      var result = await responses.data;
      if (result.isSuccess) {
        toast.success("OTP verified successfully.", {
          position: "top-right",
          autoClose: 4000,
        });
        setView("setNewPassword");
      } else {
        toast.error("Invalid OTP. Please try again.", {
          position: "top-right",
          autoClose: 4000,
        });
      }
    }
  }

  function validateOtp(name, value) {
    if (name === "Otp") {
      if (!value) return "OTP is required";
    }
  }

  const [passwordValues, setPasswordValues] = useState({
    NewPassword: "",
    ConfirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordValues({
      ...passwordValues,
      [name]: value,
    });
    setPasswordErrors({
      ...passwordErrors,
      [name]: validatePassword(name, value),
    });
  };
  const handleChange22 = async (e) => {
    const { name, value } = e.target;

    setEmialValuess({
      ...emailvalues,
      [name]: value,
    });

    setEmialerror({
      ...error,
      [name]: getotpValidation(name, value),
    });
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setValuess({
      ...valuess,
      [name]: value,
    });

    setError({
      ...error,
      [name]: LoginFormValidation(name, value),
    });
  };
  async function onSetNewPasswordClick(e) {
    e.preventDefault();

    const newErrors = {
      NewPassword: validatePassword("NewPassword", passwordValues.NewPassword),
      ConfirmPassword: validatePassword(
        "ConfirmPassword",
        passwordValues.ConfirmPassword
      ),
    };
    setPasswordErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    if (!isValid) {
      var obj = {
        Email: values.Email,
        Otp: otpValues.Otp,
        NewPassword: passwordValues.NewPassword,
      };

      var responses = await axios.post(
        "https://localhost:44305/api/Auth/update-password",
        obj
      );
      var result = responses.data;
      if (result.isSuccess) {
        toast.success("Password updated successfully.", {
          position: "top-right",
          autoClose: 4000,
        });
        setView("login");
      } else {
        if (result.error.code === "AUTH003") {
          toast.error(
            "New password cannot be the same as the existing password.",
            {
              position: "top-right",
              autoClose: 4000,
            }
          );
        } else {
          toast.error("Failed to update password. Please try again.", {
            position: "top-right",
            autoClose: 4000,
          });
        }
      }
    }
  }

  function validatePassword(name, value) {
    if (name === "NewPassword") {
      if (!value) return "New password is required";
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
      )
        return "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character";
    }
    if (name === "ConfirmPassword") {
      if (!value) return "Confirm password is required";
      if (value !== passwordValues.NewPassword) return "Passwords should match";
    }
  }

  return (
    <div className="row m-0 p-0">
      <div className="imagediv col-6 p-0">
        <img src={LoginImage} alt="" className="Loginimagelogo" />
      </div>
      <div className="formdiv col-6 ">
        <div className="">
          <img src={archetslogo} alt="" className="archentslogo" />
        </div>
        <div className="formdiv1">
          <div className="logincontent">Login</div>
          <div className="financecontent">Welcome to Finance Management !</div>
          <div className="pleaseLoginContent">
            Please login using email id and password
          </div>
          <div className="inputdiv">
            <div>
              <div>
                <label>
                  Email ID <span style={{ color: "red" }}>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="enter your username"
                className="emailandpassword"
                name="email"
                value={valuess.email}
                onChange={handleChange}
              />
              {error.email && (
                <span
                  className="error ms-1 emailrequirederrormessage "
                  style={{ color: "red", textAlign: "start", display: "flex" }}
                >
                  {error.email}
                </span>
              )}
            </div>
            <div className="mt-2">
              <div className="password-container">
                <label>
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="emailandpassword"
                    placeholder="Enter your password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <div
                    className="eyeIcon LogineyeIcon"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer", marginLeft: "-35px" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>
            </div>
            {error.password && (
              <span
                className="ms-1 emailrequirederrormessage"
                style={{ color: "red", textAlign: "start", display: "flex" }}
              >
                {error.password}
              </span>
            )}
          </div>
          <div
            className="forgotpasswordtag mt-1"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex" }} className="ms-1">
              <input type="checkbox" name="" id="" style={{ width: "18px" }} />
              <p className="remembermecontent m-2">Remember me</p>
            </div>
            <div className="mt-1">
              <a
                className="forgotpasswordatag"
                onClick={navigatetoforgotpasswordpage}
                style={{ color: "#0071FF", cursor: "pointer" }}
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="loginbutton">
            <button className="buttonlogin1" onClick={onLoginButtonClick}>
              Login
            </button>
          </div>
          <div className="forcontect">
            if you are a new user, please contact archents support team.
          </div>
        </div>
      </div>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
};

export default Home;
