import forgotpasswordsideImaage from "../../assets/Images/forgotpasswordimage.png";
import "../../assets/Styles/ForgotPassword.css";
import archetslogo from "../../../src/assets/Images/primary-logo.png";
import { useNavigate } from "react-router-dom";
import { getotpValidation } from "./getotpValidation";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
export default function CreateNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword1, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  var OTP1 = localStorage.getItem("ValueOTP");
  var email1 = localStorage.getItem("Email");
  console.log(OTP1, "otpvalue");
  console.log(email1, "emailvalues");
  const navigate = useNavigate();
  const backtoLogin = async () => {
    navigate("/");
  };
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
        Email: email1,
        Otp: OTP1,
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
          autoClose: 1000,
          onClose: () => navigate("/"),
        });
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
    <div
      className="fogotpasswordpagemaindiv "
      style={{ height: "100vh", display: "flex" }}
    >
      <div className="" style={{ width: "50%" }}>
        <img
          src={forgotpasswordsideImaage}
          alt=""
          className="forgotpasswordImage"
        />
      </div>
      <div
        className="formdiv3"
        style={{ backgroundColor: "#FAFFFB", width: "50%" }}
      >
        <div className="formdiv2">
          <div className="" style={{ margin: "50px" }}>
            <img src={archetslogo} alt="" />
          </div>
          <div style={{ marginLeft: "50px " }}>
            <div
              className="forgotpasswordcontent"
              style={{ marginTop: " 40px " }}
            >
              Set New Password
            </div>
            <div className="enetremailid">
              Enter and confirm your new password to complete the reset process.
            </div>
            <form onSubmit={onSetNewPasswordClick}>
              <div className="forgotform">
                <div className="mb-1">
                  <label className="inputlable">New Password</label>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="emailinput form-control"
                  name="NewPassword"
                  value={passwordValues.NewPassword}
                  onChange={handlePasswordChange}
                />
                <div
                  className="eyeIcon"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    right: "145px",
                    top: "275px",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {passwordErrors.NewPassword && (
                  <p
                    className="validationError"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {passwordErrors.NewPassword}
                  </p>
                )}
                <div className="mb-1">
                  <label className="inputlable">Confirm Password</label>
                </div>

                <input
                  type="text"
                  placeholder="Confirm Password"
                  className="emailinput form-control"
                  name="ConfirmPassword"
                  value={passwordValues.ConfirmPassword}
                  onChange={handlePasswordChange}
                />
                <div
                  className="eyeIcon"
                  onClick={() => setShowConfirmPassword(!confirmPassword1)}
                  style={{
                    cursor: "pointer",
                    right: "145px",
                    top: "350px",
                  }}
                >
                  {confirmPassword1 ? <FaEyeSlash /> : <FaEye />}
                </div>

                <div className="backtologin mt-2">
                  <div>
                    {passwordErrors.ConfirmPassword && (
                      <p
                        className="validationError"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {passwordErrors.ConfirmPassword}
                      </p>
                    )}
                  </div>

                  <a
                    style={{ color: "#0071FF", cursor: "pointer" }}
                    onClick={backtoLogin}
                    className="me-4"
                  >
                    Back to login
                  </a>
                </div>

                <div className="loginbutton">
                  <button className="buttonlogin"> Set New Password</button>
                </div>
                <div className="forcontect1">
                  if you are a new user, please contact archents support team.
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
