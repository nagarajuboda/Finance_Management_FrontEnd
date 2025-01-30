import forgotpasswordsideImaage from "../../assets/Images/forgotpasswordimage.png";
import "../../assets/Styles/ForgotPassword.css";
import archetslogo from "../../../src/assets/Images/primary-logo.png";
import { useNavigate } from "react-router-dom";
import { getotpValidation } from "./getotpValidation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
export default function VerifyOtp() {
  var email1 = localStorage.getItem("Email");
  var otp = localStorage.getItem("OTP");

  const [emailvalues, setEmialValuess] = useState({
    email: "",
  });
  const [emailerror, setEmialerror] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const backtoLogin = async () => {
    navigate("/");
  };
  const [otpValues, setOtpValues] = useState({
    Otp: "",
  });
  const [otpErrors, setOtpErrors] = useState({
    Otp: "",
  });

  async function onVerifyOtpClick(e) {
    e.preventDefault();
    const newErrors = {
      Otp: validateOtp("Otp", otpValues.Otp),
    };
    setOtpErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");
    if (!isValid) {
      var obj = { Email: email1, Otp: otpValues.Otp };
      var responses = await axios.post(
        "https://localhost:44305/api/Auth/verify-otp",
        obj
      );
      var result = await responses.data;
      if (result.isSuccess) {
        localStorage.setItem("ValueOTP", otpValues.Otp);
        toast.success("OTP verified successfully.", {
          position: "top-right",
          autoClose: 1000,
          onClose: () => navigate("/user/CreateNewPassword"),
        });
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
          <div className="" style={{ margin: "80px" }}>
            <img src={archetslogo} alt="" />
          </div>
          <div style={{ marginLeft: "80px " }}>
            <div
              className="forgotpasswordcontent"
              style={{ marginTop: " 60px " }}
            >
              Verify your OTP?
            </div>
            <div className="enetremailid">
              Please enter the OTP sent to your email to verify your identity.
            </div>
            <form onSubmit={onVerifyOtpClick}>
              <div className="forgotform">
                <div className="mb-1">
                  <label className="inputlable">Enter OTP</label>
                </div>
                <input
                  type="text"
                  placeholder="enter OTP"
                  className="emailinput form-control"
                  onChange={handleOtpChange}
                  name="Otp"
                  value={otpValues.Otp}
                />
                <div className="backtologin mt-2">
                  <div>
                    {otpErrors.Otp && (
                      <span
                        className="validationError"
                        style={{ color: "red" }}
                      >
                        {otpErrors.Otp}
                      </span>
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
                  <button className="buttonlogin">Submit</button>
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
