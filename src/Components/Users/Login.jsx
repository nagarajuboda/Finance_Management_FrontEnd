import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "../../assets/Styles/Login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons
import { setSessionData } from "../../Service/SharedSessionData";
import { ControlCameraSharp } from "@mui/icons-material";
import { LoginFormValidation } from "../Admin/Pages/LoginFormValidation";
import { getotpValidation } from "./getotpValidation";
const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("login"); // 'login', 'resetPassword', 'verifyOtp', 'setNewPassword'
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
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
      setLoggedIn(true); // Update logged-in state
      if (result.isSuccess === true) {
        setLoggedIn(true); // Update logged-in state
        setSessionData(result.item);

        if (result.item.employee.role.name === "US-Finance") {
          navigate("/USFinance/UsFinaceALlProjects");
        } else if (result.item.employee.role.name === "Admin") {
          navigate("/EmployeeDashboard");
        } else if (result.item.employee.role.name === "Indian finace") {
          navigate("/EmployeeDashboard");
        } else if (result.item.employee.role.name === "Project Manager") {
          navigate("/UnderManagerEmployees");
        } else if (result.item.employee.role.name === "Reporting Manager") {
          navigate("/UnderManagerEmployees");
        } else if (result.item.employee.role.name === "Hr") {
          navigate("/EmployeeDashboard");
        }

        //navigate("/AdminDashboard"); // Navigate to dashboard or another page
      } else {
        // Handle specific error codes
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
        } else {
          // Generic error message for other cases
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
      // if (!/^\d{6}$/.test(value)) return "OTP is invalid";
    }
  }

  // New password validation and handlers
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
    console.log(valuess.password, "=========>values");
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
        // Handle specific error codes
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

  const renderLoginForm = () => (
    <div className="loginForm">
      <form>
        <div>
          <label className="labelField">
            Email Address<span className="asterisk">*</span>
          </label>
          <input
            type="text"
            placeholder="Email Address"
            className="inputField"
            name="email"
            value={valuess.email}
            onChange={handleChange}
          />
          {error.email && (
            <span
              className="error ms-1 "
              style={{ color: "red", textAlign: "start", display: "flex" }}
            >
              {error.email}
            </span>
          )}
        </div>

        <label className="labelField">
          Password<span className="asterisk">*</span>
        </label>
        <div className="passwordContainer">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="inputField"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <div
            className="eyeIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          {error.password && (
            <span
              className="ms-1"
              style={{ color: "red", textAlign: "start", display: "flex" }}
            >
              {error.password}
            </span>
          )}
        </div>

        <button className="loginButton" onClick={onLoginButtonClick}>
          Login
        </button>
      </form>
      <div className="forgotResetContainer">
        <div className="forgotPassword">Forgot your password?</div>
        <div className="resetLink" onClick={() => setView("resetPassword")}>
          Reset Here
        </div>
      </div>
    </div>
  );

  const renderResetPasswordForm = () => (
    <div className="resetPasswordForm">
      <form onSubmit={getotpfunction}>
        <div className="welcomeMessage">
          <h2 className="Welcome">Reset Password</h2>
          <p className="Text">
            Enter your email address to receive an OTP for resetting your
            password.
          </p>
        </div>

        <label className="labelField">
          Email Address<span className="asterisk">*</span>
        </label>
        <input
          type="text"
          placeholder="Email Address"
          className="inputField"
          onChange={handleChange22}
          name="email"
          value={emailvalues.email}
          // {...register('email', { required: 'Email is required' })}
          // onChange={(e) => setEmail(e.target.value)}
        />
        {emailerror.email && (
          <span
            className="validationError ms-1"
            style={{ display: "flex", textAlign: "start" }}
          >
            {emailerror.email}
          </span>
        )}
        {/* {errors.email && <p className="validationError">{errors.email.message}</p>} */}

        <button className="loginButton">Get OTP</button>
        <div className="backToLogin" onClick={() => setView("login")}>
          Back to Login
        </div>
      </form>
    </div>
  );

  const renderVerifyOtpForm = () => (
    <div className="verifyOtpForm">
      <form onSubmit={onVerifyOtpClick}>
        <div className="welcomeMessage">
          <h2 className="Welcome">Verify OTP</h2>
          <p className="Text">
            Please enter the OTP sent to your email to verify your identity.
          </p>
        </div>

        <label className="labelField">
          Enter OTP<span className="asterisk">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter OTP"
          className="inputField"
          onChange={handleOtpChange}
          name="Otp"
          value={otpValues.Otp}
          // {...register('otp', { required: 'OTP is required' })}
          // onChange={(e) => setOtp(e.target.value)}
        />
        {/* {errors.otp && <p className="validationError">{errors.otp.message}</p>} */}
        {otpErrors.Otp && (
          <span className="validationError">{otpErrors.Otp}</span>
        )}

        <button className="loginButton">Verify OTP</button>
        <div className="backToLogin" onClick={() => setView("login")}>
          Back to Login
        </div>
      </form>
    </div>
  );

  const renderSetNewPasswordForm = () => (
    <div className="setNewPasswordForm">
      <form onSubmit={onSetNewPasswordClick}></form>
      <div className="welcomeMessage">
        <h2 className="Welcome">Set New Password</h2>
        <p className="Text">
          Enter and confirm your new password to complete the reset process.
        </p>
      </div>

      <label className="labelField">
        New Password<span className="asterisk">*</span>
      </label>
      <input
        type="password"
        placeholder="New Password"
        className="inputField"
        name="NewPassword"
        value={passwordValues.NewPassword}
        onChange={handlePasswordChange}
      />
      {passwordErrors.NewPassword && (
        <p className="validationError">{passwordErrors.NewPassword}</p>
      )}
      <label className="labelField">
        Confirm Password<span className="asterisk">*</span>
      </label>
      <input
        type="password"
        placeholder="Confirm Password"
        className="inputField"
        name="ConfirmPassword"
        value={passwordValues.ConfirmPassword}
        onChange={handlePasswordChange}
      />
      {passwordErrors.ConfirmPassword && (
        <p className="validationError">{passwordErrors.ConfirmPassword}</p>
      )}

      <button className="loginButton" onClick={onSetNewPasswordClick}>
        Set New Password
      </button>
      <div className="backToLogin" onClick={() => setView("login")}>
        Back to Login
      </div>
    </div>
  );

  return (
    <div className="mainContainer">
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {/* Toast Container for displaying messages */}
      <ToastContainer />

      {/* Logo */}
      <img
        src="src/assets/Images/ArchentsLogo.png"
        alt="Logo"
        className="logo"
      />

      {view === "login" && (
        <div className="welcomeMessage">
          <div className="Welcome">Welcome back!</div>
          <div className="Text">
            Please login using your email and password.
          </div>
        </div>
      )}

      {/* Conditional rendering based on view state */}
      {view === "login" && renderLoginForm()}
      {view === "resetPassword" && renderResetPasswordForm()}
      {view === "verifyOtp" && renderVerifyOtpForm()}
      {view === "setNewPassword" && renderSetNewPasswordForm()}

      {/* Conditional rendering based on login status */}
      {loggedIn ? <div></div> : <div />}
    </div>
  );
};

export default Home;
